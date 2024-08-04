package com.gmainer.budgetbook.categorybooking.service

import com.gmainer.budgetbook.booking.model.Booking
import com.gmainer.budgetbook.booking.repository.BookingRepository
import com.gmainer.budgetbook.category.model.Category
import com.gmainer.budgetbook.category.model.CategoryType
import com.gmainer.budgetbook.category.model.toResponse
import com.gmainer.budgetbook.categorybooking.dto.BudgetSummary
import com.gmainer.budgetbook.categorybooking.dto.CategoryBookingOverview
import com.gmainer.budgetbook.common.model.BookingFilter
import org.springframework.stereotype.Service
import java.math.BigDecimal

@Service
class BudgetSummaryService(private val bookingRepository: BookingRepository) {

    fun determineBudgetSummary(filter: BookingFilter): BudgetSummary {
        val bookings = fetchBookings(filter)
        val overviews = determineOverviews(bookings)
        val income = bookings.filter { it.category.categoryType == CategoryType.INCOME }.sumOf { it.amount }
        val outcome = bookings.filter { it.category.categoryType == CategoryType.OUTCOME }.sumOf { it.amount }
        val balance = income - outcome

        return BudgetSummary(
            income = income,
            outcome = outcome,
            balance = balance,
            overviews = overviews
        )
    }

    private fun fetchBookings(filter: BookingFilter): List<Booking> {
        return if (filter.accountId != null) {
            bookingRepository.findByBookingDateBetweenAndAccountIdOrderByBookingDateDesc(filter.dateFrom, filter.dateTo, filter.accountId)
        } else {
            bookingRepository.findByBookingDateBetweenOrderByBookingDateDesc(filter.dateFrom, filter.dateTo)
        }
    }

    private fun determineOverviews(bookings: List<Booking>): List<CategoryBookingOverview> {
        val allCategories = bookings.map { it.category }.flatMap { listOf(it) + getParentCategories(it) }.distinct()
        val rootCategories = allCategories.filter { it.parent == null }
        val overviews = rootCategories.map { rootCategory ->
            buildCategoryOverview(rootCategory, bookings)
        }
        return overviews.filter { it.amount > BigDecimal.ZERO || it.children.isNotEmpty() }
            .sortedWith(compareByDescending<CategoryBookingOverview> { it.category.type == CategoryType.INCOME }
                .thenByDescending { it.amount })
    }

    private fun getParentCategories(category: Category): List<Category> {
        val parents = mutableListOf<Category>()
        var currentCategory: Category? = category.parent
        while (currentCategory != null) {
            parents.add(currentCategory)
            currentCategory = currentCategory.parent
        }
        return parents
    }

    private fun buildCategoryOverview(category: Category, allBookings: List<Booking>): CategoryBookingOverview {
        val directBookings = allBookings.filter { it.category == category }
        val childCategories = allBookings.map { it.category }.filter { it.parent == category }.distinct()
        val childOverviews = childCategories.map { childCategory ->
            buildCategoryOverview(childCategory, allBookings)
        }.sortedByDescending { it.amount }
        val amount = directBookings.sumOf { it.amount } + childOverviews.sumOf { it.amount }
        val percentage = calculatePercentage(category, allBookings, amount.toDouble())

        return CategoryBookingOverview(
            category = category.toResponse(),
            amount,
            percentage,
            children = childOverviews
        )
    }

    private fun calculatePercentage(category: Category, allBookings: List<Booking>, categoryAmount: Double): Double {
        val totalAmount = when (category.categoryType) {
            CategoryType.INCOME -> allBookings.filter { it.category.categoryType == CategoryType.INCOME }.sumOf { it.amount }
            CategoryType.OUTCOME -> allBookings.filter { it.category.categoryType == CategoryType.OUTCOME }.sumOf { it.amount }
        }.toDouble()

        return if (totalAmount > 0) (categoryAmount / totalAmount) * 100 else 0.0
    }

}
