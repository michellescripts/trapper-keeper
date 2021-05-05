package com.trapper.keeper.seed

import com.trapper.keeper.note.Note
import com.trapper.keeper.note.NoteType


class NoteScenario {
    var title: String? = null
        private set
    var note: Note? = null
        private set

    fun forNote(
        note: Note,
        type: NoteType,
        data: String,
    ) = apply {
        this.note = note.copy(
            type = type,
            data = data,
        )
    }

    fun title(title: String) = apply { this.title = title }

    fun assign(): AssignedNoteScenario = AssignedNoteScenario(
        title = this.title ?: throw Exception("title required"),
        ansNote = this.note ?: throw Exception("note required")
    )
}
