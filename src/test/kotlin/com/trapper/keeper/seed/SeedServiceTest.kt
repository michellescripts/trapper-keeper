package com.trapper.keeper.seed

import com.trapper.keeper.note.NoteService
import com.trapper.keeper.testMakers.make
import io.mockk.*
import org.junit.jupiter.api.Assertions.assertEquals
import org.junit.jupiter.api.Test
import java.util.UUID

internal class SeedServiceTest {
    private val scenarioAssignmentService = mockk<ScenarioAssignmentService>()
    private val noteService = mockk<NoteService>()

    private val subject: SeedService = SeedService(
        noteService,
        scenarioAssignmentService,
    )

    @Test
    fun `seed assigns notes and calls the note service and returns true when successful`() {
        val assignedNoteScenarios: AssignedNoteScenarios = mockk()

        every { assignedNoteScenarios.notes } returns listOf(make())
        every { assignedNoteScenarios.noteScenarios } returns listOf(make())
        every { scenarioAssignmentService.assignNoteScenarios() } returns assignedNoteScenarios
        every { noteService.seed(any()) } returns listOf(UUID.randomUUID())

        val result = subject.seed()

        verify { noteService.seed(assignedNoteScenarios) }
        assertEquals(true, result!!.notes)
    }

    @Test
    fun `seed assigns notes and calls the note service and returns false when creation fails`() {
        val assignedNoteScenarios: AssignedNoteScenarios = mockk()

        every { assignedNoteScenarios.notes } returns listOf(make())
        every { assignedNoteScenarios.noteScenarios } returns emptyList()
        every { scenarioAssignmentService.assignNoteScenarios() } returns assignedNoteScenarios
        every { noteService.seed(any()) } returns listOf(UUID.randomUUID())

        val result = subject.seed()

        verify { noteService.seed(assignedNoteScenarios) }
        assertEquals(false, result!!.notes)
    }


    @Test
    fun `clean calls the note service`() {
        every { noteService.clean() } just runs

        subject.clean()

        verify { noteService.clean() }
    }
}
