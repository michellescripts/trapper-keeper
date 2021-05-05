package com.trapper.keeper.seed

import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

@RestController
@RequestMapping("/api/v1/")
class SeedController {
    @PostMapping("/seed")
    fun seed(): ResponseEntity<Void> = ResponseEntity.status(HttpStatus.CREATED).build()
}
