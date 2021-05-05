package com.trapper.keeper.seed

import io.mockk.every
import io.mockk.mockk
import io.mockk.verify
import org.junit.jupiter.api.Assertions.assertEquals
import org.junit.jupiter.api.Test

internal class ScenarioAssignmentServiceTest {
    private val seedConfig = mockk<SeedConfig>()
    private val seedNoteScenarios = mockk<SeedNoteScenarios>()

    private val subject = ScenarioAssignmentService(
        seedConfig,
        seedNoteScenarios
    )

    @Test
    fun `assignNoteScenarios builds scenarios with data`() {
        val noteScenarioBuilder = mockk<NoteScenario>()
        val assignedNoteScenario = mockk<AssignedNoteScenario>()

        every { seedConfig.getNoteTitles() } returns listOf("title-1", "title-2")
        every { noteScenarioBuilder.title(any()) } returns noteScenarioBuilder
        every { noteScenarioBuilder.assign() } returns assignedNoteScenario
        every { seedNoteScenarios.noteScenarios } returns listOf(noteScenarioBuilder)

        val result = subject.assignNoteScenarios()

        verify(exactly = 1) { noteScenarioBuilder.title("title-1") }
        verify(exactly = 1) { noteScenarioBuilder.title("title-2") }
        assertEquals(listOf(assignedNoteScenario, assignedNoteScenario), result.noteScenarios)
    }
}
