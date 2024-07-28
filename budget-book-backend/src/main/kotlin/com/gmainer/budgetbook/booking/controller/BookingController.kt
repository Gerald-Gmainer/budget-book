package com.gmainer.budgetbook.booking.controller

import com.gmainer.budgetbook.booking.dto.BookingCreateRequest
import com.gmainer.budgetbook.booking.dto.BookingResponse
import com.gmainer.budgetbook.booking.service.BookingService
import com.gmainer.budgetbook.common.config.logger
import com.gmainer.budgetbook.common.model.BookingFilter
import org.springframework.format.annotation.DateTimeFormat
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*
import java.net.URI
import java.time.LocalDate

@RestController
@RequestMapping("/bookings")
class BookingController(private val bookingService: BookingService) {
    private val log by logger()

    @GetMapping
    fun getAllBookings(): ResponseEntity<List<BookingResponse>> {
        return ResponseEntity.ok(bookingService.getAllBookings())
    }

    @GetMapping("/{id}")
    fun getBookingById(@PathVariable id: Long): ResponseEntity<BookingResponse> {
        val booking = bookingService.findById(id)
        return ResponseEntity.ok(booking)
    }

    @GetMapping("/{period}/{date}")
    fun getBookingsByPeriod(
        @PathVariable period: String,
        @PathVariable @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) date: LocalDate,
        @RequestParam(required = false) accountId: Long?
    ): ResponseEntity<List<BookingResponse>> {
        val filter = BookingFilter(period, date, accountId)
        val bookings = bookingService.getBookingsByFilter(filter)
        return ResponseEntity.ok(bookings)
    }

    @PostMapping
    fun createBooking(@RequestBody bookingDto: BookingCreateRequest): ResponseEntity<BookingResponse> {
        log.debug("create booking: $bookingDto")
        val response = bookingService.createBooking(bookingDto)
        return ResponseEntity.created(URI.create("/bookings/${response.id}")).body(response)
    }
}
