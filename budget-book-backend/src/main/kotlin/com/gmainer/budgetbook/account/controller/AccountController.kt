package com.gmainer.budgetbook.account.controller

import com.gmainer.budgetbook.account.dto.AccountResponse
import com.gmainer.budgetbook.account.service.AccountService
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*

@RestController
@RequestMapping("/accounts")
@CrossOrigin(origins = ["http://localhost:3000"], maxAge = 3600, allowCredentials = "true")
class AccountController(private val accountService: AccountService) {

    @GetMapping
    fun getAllAccounts(): ResponseEntity<List<AccountResponse>> {
        val accounts = accountService.findAll()
        return ResponseEntity.ok(accounts)
    }

    @GetMapping("/{id}")
    fun getAccountById(@PathVariable id: Long): ResponseEntity<AccountResponse> {
        val accountResponse = accountService.findById(id)
        return ResponseEntity.ok(accountResponse)
    }
}
