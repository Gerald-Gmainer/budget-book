package com.gmainer.budgetbook.booking.repository

import com.gmainer.budgetbook.booking.model.Booking
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository
import java.time.LocalDate

@Repository
interface BookingRepository : JpaRepository<Booking, Long> {
    fun findAllByOrderByBookingDateAsc(): List<Booking>
    fun findByBookingDateBetweenOrderByBookingDateDesc(from: LocalDate, to: LocalDate): List<Booking>
    fun findByBookingDateBetweenAndAccountIdOrderByBookingDateDesc(dateFrom: LocalDate, dateTo: LocalDate, accountId: Long): List<Booking>
}
