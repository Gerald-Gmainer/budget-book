package com.gmainer.budgetbook.common.model

import java.time.LocalDate

data class BookingFilter(
    val period: Period,
    val dateFrom: LocalDate,
    val dateTo: LocalDate,
    val accountId: Long? = null
) {
    constructor(period: String, date: LocalDate, accountId: Long? = null) : this(
        Period.valueOf(period.uppercase()),
        Period.valueOf(period.uppercase()).dateRange(date).first,
        Period.valueOf(period.uppercase()).dateRange(date).second,
        accountId
    )
}