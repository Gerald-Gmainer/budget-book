package com.gmainer.budgetbook.common.model

import java.time.LocalDate
import java.time.YearMonth

enum class Period {
    DAY, MONTH, YEAR, ALL;

    fun dateRange(referenceDate: LocalDate = LocalDate.now()): Pair<LocalDate, LocalDate> {
        return when (this) {
            DAY -> referenceDate to referenceDate
            
            MONTH -> {
                val startOfMonth = YearMonth.from(referenceDate).atDay(1)
                val endOfMonth = YearMonth.from(referenceDate).atEndOfMonth()
                startOfMonth to endOfMonth
            }

            YEAR -> {
                val startOfYear = referenceDate.withDayOfYear(1)
                val endOfYear = referenceDate.withDayOfYear(referenceDate.lengthOfYear())
                startOfYear to endOfYear
            }

            ALL -> LocalDate.MIN to LocalDate.MAX
        }
    }
}