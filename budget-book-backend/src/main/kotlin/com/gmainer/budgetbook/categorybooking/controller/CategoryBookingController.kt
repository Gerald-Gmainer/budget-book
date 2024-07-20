package com.gmainer.budgetbook.categorybooking.controller

import com.gmainer.budgetbook.categorybooking.dto.BudgetSummary
import com.gmainer.budgetbook.categorybooking.dto.BudgetSummaryFilter
import com.gmainer.budgetbook.categorybooking.service.BudgetSummaryService
import org.springframework.format.annotation.DateTimeFormat
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*
import java.time.LocalDate

@RestController
@RequestMapping("/category-bookings")
class CategoryBookingController(private val summaryService: BudgetSummaryService) {

    // With account ID filter: /category-bookings/summary/20240501/20240530?accountId=1
    // Without account ID filter: /category-bookings/summary/20240501/20240530
    @GetMapping("summary/{dateFrom}/{dateTo}")
    fun getBudgetSummary(
        @PathVariable @DateTimeFormat(pattern = "yyyyMMdd") dateFrom: LocalDate,
        @PathVariable @DateTimeFormat(pattern = "yyyyMMdd") dateTo: LocalDate,
        @RequestParam(required = false) accountId: Long?
    ): ResponseEntity<BudgetSummary> {
        val filter = BudgetSummaryFilter(dateFrom, dateTo, accountId)
        val summary = summaryService.determineBudgetSummary(filter)
        return ResponseEntity.ok(summary)
    }
}