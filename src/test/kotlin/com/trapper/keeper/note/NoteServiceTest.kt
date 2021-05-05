package com.trapper.keeper.note

import org.assertj.core.api.Assertions.assertThat
import org.junit.jupiter.api.Test


internal class NoteServiceTest {
    private val subject = NoteService()

    @Test
    fun `getNotes should return a list of notes`() {
        assertThat(subject.getNotes()).isEqualTo(TEMP_NOTES)
    }
}
