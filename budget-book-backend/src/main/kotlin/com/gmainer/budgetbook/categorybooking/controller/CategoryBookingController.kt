package com.gmainer.budgetbook.categorybooking.controller

import com.gmainer.budgetbook.categorybooking.dto.BudgetSummary
import com.gmainer.budgetbook.categorybooking.dto.CategoryBookingResponse
import com.gmainer.budgetbook.categorybooking.service.BudgetSummaryService
import com.gmainer.budgetbook.categorybooking.service.CategoryBookingService
import com.gmainer.budgetbook.common.model.BookingFilter
import org.springframework.format.annotation.DateTimeFormat
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*
import java.time.LocalDate

@RestController
@RequestMapping("/category-bookings")
class CategoryBookingController(private val summaryService: BudgetSummaryService, private val categoryBookingService: CategoryBookingService) {

    // With account ID filter: /category-bookings/summary/20240501/20240530?accountId=1
    // Without account ID filter: /category-bookings/summary/20240501/20240530
    @GetMapping("summary/{period}/{date}")
    fun getBudgetSummary(
        @PathVariable period: String,
        @PathVariable @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) date: LocalDate,
        @RequestParam(required = false) accountId: Long?
    ): ResponseEntity<BudgetSummary> {
        val filter = BookingFilter(period, date, accountId)
        val summary = summaryService.determineBudgetSummary(filter)
        return ResponseEntity.ok(summary)
    }

    @GetMapping("{period}/{date}")
    fun getCategoryBookings(
        @PathVariable period: String,
        @PathVariable @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) date: LocalDate,
        @RequestParam(required = false) accountId: Long?
    ): ResponseEntity<List<CategoryBookingResponse>> {
        val filter = BookingFilter(period, date, accountId)
        val bookings = categoryBookingService.determineCategoryBookings(filter)
        return ResponseEntity.ok(bookings)
    }
}
