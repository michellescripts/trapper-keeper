package com.trapper.keeper.note

import com.trapper.keeper.seed.AssignedNoteScenarios
import com.trapper.keeper.testMakers.make
import io.mockk.*
import org.assertj.core.api.Assertions.assertThat
import org.junit.jupiter.api.Test
import java.util.UUID


internal class NoteServiceTest {
    private val noteRepository = mockk<NoteRepository>()
    private val subject = NoteService(noteRepository)

    @Test
    fun `getNotes should return a list of not deleted notes`() {
        val note = make<Note>().copy(deleted = false)
        val noteEntity = note.toNoteEntity()

        every { noteRepository.findAllByDeletedIsFalse() } returns listOf(noteEntity)
        val result = subject.getNotes()

        val expected = listOf(note)
        assertThat(result).isEqualTo(expected)
        verify { noteRepository.findAllByDeletedIsFalse() }
    }

    @Test
    fun `getNotesDeleted should return a list of deleted notes`() {
        val note = make<Note>().copy(deleted = true)
        val noteEntity = note.toNoteEntity()

        every { noteRepository.findAllByDeletedIsTrue() } returns listOf(noteEntity)
        val result = subject.getNotesDeleted()

        val expected = listOf(note)
        assertThat(result).isEqualTo(expected)
        verify { noteRepository.findAllByDeletedIsTrue() }
    }

    @Test
    fun `seed should create notes`() {
        val assignedNoteScenarios: AssignedNoteScenarios = mockk()
        val id = UUID.fromString("10000000-0000-0000-0000-000000000000")
        val notes = listOf(make<Note>().copy(id = id))
        val noteEntities = listOf(make<NoteEntity>().copy(id = id))

        every { assignedNoteScenarios.notes } returns notes
        every { noteRepository.saveAll(any<List<NoteEntity>>()) } returns noteEntities

        val result = subject.seed(assignedNoteScenarios)

        assertThat(result).contains(id)
        verify { noteRepository.saveAll(noteEntities) }
    }

    @Test
    fun `clean should delete all notes`() {
        every { noteRepository.deleteAll() } just runs

        subject.clean()

        verify { noteRepository.deleteAll() }
    }
}
