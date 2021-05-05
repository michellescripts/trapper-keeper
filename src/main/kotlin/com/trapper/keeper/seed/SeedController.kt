package com.trapper.keeper.seed

import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.DeleteMapping
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

@RestController
@RequestMapping("/api/v1/")
class SeedController(
    private val seedService: SeedService
) {
    @PostMapping("/seed")
    fun seed(): ResponseEntity<Void> {
        seedService.seed()
        return ResponseEntity.status(HttpStatus.CREATED).build()
    }

    @DeleteMapping("/clean")
    fun clean(): ResponseEntity<Void> {
        seedService.clean()
        return ResponseEntity.status(HttpStatus.OK).build()
    }
}
