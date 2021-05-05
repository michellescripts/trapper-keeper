package com.trapper.keeper.seed

import org.springframework.stereotype.Component

@Component
class SeedConfig(
    val seedTitles: SeedTitles,
) {
    fun getNoteTitles(): List<String> {
        return seedTitles.TITLES
    }
}
