package com.trapper.keeper.seed

import com.nhaarman.mockitokotlin2.verify
import org.junit.jupiter.api.Test
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest
import org.springframework.boot.test.mock.mockito.MockBean
import org.springframework.test.web.servlet.MockMvc
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders
import org.springframework.test.web.servlet.result.MockMvcResultMatchers

@WebMvcTest(SeedController::class)
internal class SeedControllerTest {
    @Autowired
    private lateinit var mockMvc: MockMvc

    @MockBean
    private lateinit var seedService: SeedService

    @Test
    fun `SEED should call the seed service`() {
        mockMvc.perform(
            MockMvcRequestBuilders.post("/api/v1/seed")
        ).andExpect(MockMvcResultMatchers.status().isCreated)

        verify(seedService).seed()
    }

    @Test
    fun `Clean should call the seed service`() {
        mockMvc.perform(
            MockMvcRequestBuilders.delete("/api/v1/clean")
        ).andExpect(MockMvcResultMatchers.status().isOk)

        verify(seedService).clean()
    }
}
