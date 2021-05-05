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
                5 to NoteScenario()
                    .forNote(note = seedNotes.defaultNote, type = type, data="euismod elementum nisi quis"),
                5 to NoteScenario()
                    .forNote(note = seedNotes.defaultNote, type = type, data="eleifend quam adipiscing at"),
                5 to NoteScenario()
                    .forNote(note = seedNotes.defaultNote, type = type, data="in tellus integer faucibus"),
                5 to NoteScenario()
                    .forNote(note = seedNotes.defaultNote, type = type, data="turpis in eu mi"),
            )
        }.flatten()
    )
}
