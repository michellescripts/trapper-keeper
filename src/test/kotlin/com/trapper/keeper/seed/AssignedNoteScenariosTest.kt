package com.trapper.keeper.seed

import com.trapper.keeper.note.Note
import com.trapper.keeper.testMakers.make
import io.mockk.every
import io.mockk.mockk
import org.junit.jupiter.api.Assertions.*
import org.junit.jupiter.api.Test

internal class AssignedNoteScenariosTest {
    @Test
    fun `notes returns a list of notes`() {
        val assignedNoteScenario = mockk<AssignedNoteScenario>()

        val note = make<Note>()
        every { assignedNoteScenario.note } returns note
        val result = AssignedNoteScenarios(listOf(assignedNoteScenario, assignedNoteScenario))

        assertEquals(listOf(note, note), result.notes)
    }
}
