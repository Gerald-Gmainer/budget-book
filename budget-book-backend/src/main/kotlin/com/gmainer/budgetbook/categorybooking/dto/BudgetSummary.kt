package com.gmainer.budgetbook.categorybooking.dto

import java.math.BigDecimal

data class BudgetSummary(
    val income: BigDecimal,
    val outcome: BigDecimal,
    val balance: BigDecimal,
    val overviews: List<CategoryBookingOverview>
)
