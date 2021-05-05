package com.trapper.keeper.seed

import io.mockk.every
import io.mockk.mockk
import org.junit.jupiter.api.Assertions.assertEquals
import org.junit.jupiter.api.Test

internal class SeedConfigTest {
    private val seedTitles = mockk<SeedTitles>()
    private val subject: SeedConfig = SeedConfig(seedTitles)

    @Test
    fun `getUserTitles list of titles`() {
        val titles = listOf("a", "b", "c")
        every { seedTitles.TITLES } returns titles
        val result = subject.getNoteTitles()

        assertEquals(titles, result)
    }
}
