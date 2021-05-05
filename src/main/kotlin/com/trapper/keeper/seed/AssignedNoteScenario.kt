package com.trapper.keeper.seed

import com.trapper.keeper.note.Note

class AssignedNoteScenario(
    val title: String,
    val ansNote: Note
) {
    val note: Note
        get() = ansNote.copy(
            title = title
        )
}
