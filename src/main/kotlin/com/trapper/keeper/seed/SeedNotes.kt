package com.trapper.keeper.seed

import com.trapper.keeper.note.Note
import com.trapper.keeper.note.NoteType
import org.springframework.stereotype.Component
import java.util.UUID

@Component
class SeedNotes {
    final val defaultNote: Note = Note(
        id = UUID.fromString("00000000-0000-0000-0000-000000000000"),
        title = "",
        data = "",
        type = NoteType.BLOB,
        pinned = false,
        deleted = false,
    )

    val deletedNote: Note = defaultNote.copy(deleted = true)
}
