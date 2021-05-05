package com.trapper.keeper.seed

import com.trapper.keeper.note.Note
import com.trapper.keeper.note.NoteType
import com.trapper.keeper.testMakers.make
import org.junit.jupiter.api.Assertions.assertEquals
import org.junit.jupiter.api.Test

internal class NoteScenarioTest {

    private fun baseNoteScenario(): NoteScenario = NoteScenario()
        .title("title")
        .forNote(make(), NoteType.BLOB)

    @Test
    fun `static properties are passed to the assigned note scenario`() {
        val actual = baseNoteScenario()
            .title("some-title")
            .assign()

        assertEquals("some-title", actual.title)
    }

    @Test
    @Throws
    fun `required fields for a scenario`() {
        assertEquals(
            "title required",
            org.junit.jupiter.api.assertThrows<Exception> {
                NoteScenario()
                    .forNote(make<Note>(), NoteType.BLOB)
                    .assign()
            }.message
        )
    }
}
