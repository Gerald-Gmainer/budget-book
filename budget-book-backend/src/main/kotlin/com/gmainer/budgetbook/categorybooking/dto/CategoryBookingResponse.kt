package com.gmainer.budgetbook.categorybooking.dto

import com.gmainer.budgetbook.booking.dto.BookingResponse
import com.gmainer.budgetbook.category.dto.CategoryResponse

data class CategoryBookingResponse(
    val category: CategoryResponse,
    val bookings: List<BookingResponse>,
    val children: MutableList<CategoryBookingResponse> = mutableListOf()
)