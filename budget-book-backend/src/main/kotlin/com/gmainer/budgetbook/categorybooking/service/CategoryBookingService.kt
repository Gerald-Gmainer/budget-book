package com.gmainer.budgetbook.categorybooking.service

import com.gmainer.budgetbook.booking.model.toResponse
import com.gmainer.budgetbook.booking.repository.BookingRepository
import com.gmainer.budgetbook.category.model.Category
import com.gmainer.budgetbook.category.model.toResponse
import com.gmainer.budgetbook.category.repository.CategoryRepository
import com.gmainer.budgetbook.categorybooking.dto.CategoryBookingResponse
import com.gmainer.budgetbook.common.model.BookingFilter
import org.springframework.stereotype.Service

@Service
class CategoryBookingService(
    private val bookingRepository: BookingRepository,
    private val categoryRepository: CategoryRepository
) {
    fun determineCategoryBookings(filter: BookingFilter): List<CategoryBookingResponse> {
        val bookings = if (filter.accountId != null) {
            bookingRepository.findByBookingDateBetweenAndAccountIdOrderByBookingDateDesc(
                filter.dateFrom, filter.dateTo, filter.accountId
            )
        } else {
            bookingRepository.findByBookingDateBetweenOrderByBookingDateDesc(filter.dateFrom, filter.dateTo)
        }

        val categories = categoryRepository.findAll()
        val categoryMap = categories.associateBy { it.id }

        val bookingsByCategory = bookings.groupBy { it.category.id }

        val categoryBookings = categories.mapNotNull { category ->
            val categoryBookings = bookingsByCategory[category.id]?.map { it.toResponse() } ?: emptyList()
            if (categoryBookings.isNotEmpty() || categoryMap.values.any { it.parent?.id == category.id }) {
                CategoryBookingResponse(
                    category = category.toResponse(),
                    bookings = categoryBookings,
                    children = mutableListOf()
                )
            } else {
                null
            }
        }.associateBy { it.category.id }

        val nestedCategories = buildNestedCategoryResponse(categoryBookings, categoryMap)

        return nestedCategories.sortedByDescending { calculateTotalAmount(it) }
    }

    private fun buildNestedCategoryResponse(
        categoryBookings: Map<Long, CategoryBookingResponse>,
        categoryMap: Map<Long, Category>
    ): List<CategoryBookingResponse> {
        val topCategories = mutableListOf<CategoryBookingResponse>()

        categoryBookings.values.forEach { categoryBooking ->
            val parentCategory = categoryBooking.category.parentId?.let { categoryBookings[it] }
            if (parentCategory != null) {
                parentCategory.children.add(categoryBooking)
            } else {
                topCategories.add(categoryBooking)
            }
        }

        return topCategories.filter { it.bookings.isNotEmpty() || it.children.isNotEmpty() }
    }

    private fun calculateTotalAmount(categoryBooking: CategoryBookingResponse): Double {
        val directTotal = categoryBooking.bookings.sumOf { it.amount.toDouble() }
        val childrenTotal = categoryBooking.children.sumOf { calculateTotalAmount(it) }
        return directTotal + childrenTotal
    }
}
