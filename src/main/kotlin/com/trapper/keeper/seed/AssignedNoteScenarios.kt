package com.trapper.keeper.seed

import com.trapper.keeper.note.Note

class AssignedNoteScenarios(
    val noteScenarios: List<AssignedNoteScenario>,
) {
    val notes: List<Note>
        get() = noteScenarios.map { it.note }
}
