package com.gmainer.budgetbook.booking.dto

import com.gmainer.budgetbook.account.dto.AccountResponse
import com.gmainer.budgetbook.category.dto.CategoryResponse
import java.math.BigDecimal
import java.time.LocalDate

data class BookingResponse(
    val id: Long = 0,
    val bookingDate: LocalDate,
    val amount: BigDecimal,
    val description: String?,
    val category: CategoryResponse,
    val account: AccountResponse,
)
