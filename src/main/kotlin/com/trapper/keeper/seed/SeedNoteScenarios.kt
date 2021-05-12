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
            NoteType.CHECK,
        ).map { type ->
            listOf(
                3 to NoteScenario()
                    .forNote(note = seedNotes.defaultNote, type = type, data="euismod elementum nisi quis"),
                2 to NoteScenario()
                    .forNote(note = seedNotes.defaultNote, type = type, data="eleifend quam adipiscing at euismod elementum nisi quis"),
                2 to NoteScenario()
                    .forNote(note = seedNotes.defaultNote, type = type, data="in tellus integer faucibus eleifend quam adipiscing at euismod elementum nisi quis"),
                1 to NoteScenario()
                    .forNote(note = seedNotes.defaultNote, type = type, data="turpis in eu mi in tellus integer faucibus eleifend quam adipiscing at euismod elementum nisi quis"),
                1 to NoteScenario()
                    .forNote(note = seedNotes.defaultNote, type = type, data="lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua ut enim ad minim veniam quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat duis aute irure dolor in"),
                1 to NoteScenario()
                    .forNote(note = seedNotes.deletedNote, type = type, data="lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua ut enim ad minim veniam quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat duis aute irure dolor in"),
            )
        }.flatten()
    )
}
