package com.trapper.keeper.note

import com.trapper.keeper.seed.AssignedNoteScenarios
import org.springframework.stereotype.Service
import java.util.UUID

@Service
class NoteService(
    private val noteRepository: NoteRepository,
) {
    fun getNotes(): List<Note> =
        noteRepository.findAllByDeletedIsFalse().map { ne -> ne.toNote() }.toList()

    fun getNotesDeleted(): List<Note> =
        noteRepository.findAllByDeletedIsTrue().map { ne -> ne.toNote() }.toList()

    fun seed(assignedNotes: AssignedNoteScenarios): List<UUID?> =
        noteRepository.saveAll(assignedNotes.notes.map { n -> n.toNoteEntity() })
            .map { s -> s.id }.toList()

    fun clean() = noteRepository.deleteAll()
}
