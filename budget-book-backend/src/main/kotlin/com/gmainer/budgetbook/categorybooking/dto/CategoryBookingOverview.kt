package com.gmainer.budgetbook.categorybooking.dto

import com.gmainer.budgetbook.category.dto.CategoryResponse
import java.math.BigDecimal

data class CategoryBookingOverview(
    val category: CategoryResponse,
    val amount: BigDecimal,
    val percentage: Double,
    val children: List<CategoryBookingOverview>
)
