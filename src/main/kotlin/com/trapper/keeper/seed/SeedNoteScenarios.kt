package com.trapper.keeper.seed

import com.trapper.keeper.note.NoteType
import com.trapper.keeper.multiplyList
import org.springframework.stereotype.Component

@Component
class SeedNoteScenarios(
    seedNotes: SeedNotes,
) {
    val noteScenarios: List<NoteScenario> = multiplyList(
        listOf(
            NoteType.BLOB,
        ).map { type ->
            listOf(
                3 to NoteScenario()
                    .forNote(note = seedNotes.defaultNote, type = type),
                1 to NoteScenario()
                    .forNote(note = seedNotes.defaultNote, type = type),
                2 to NoteScenario()
                    .forNote(note = seedNotes.defaultNote, type = type),
                1 to NoteScenario()
                    .forNote(note = seedNotes.defaultNote, type = type),
            )
        }.flatten()
    )
}
