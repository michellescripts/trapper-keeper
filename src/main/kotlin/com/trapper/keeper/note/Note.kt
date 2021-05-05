package com.trapper.keeper.note

import java.util.UUID

data class Note(
    val id: UUID,
    val title: String,
    val data: String,
    val type: NoteType,
    val pinned: Boolean,
)

enum class NoteType {
    BLOB,
}

val TEMP_NOTES: List<Note> = listOf(
    Note(
        id = UUID.fromString("00000000-0000-0000-0000-000000000000"),
        title = "first note",
        data = "this is a temp note",
        type = NoteType.BLOB,
        pinned = false,
    ),
    Note(
        id = UUID.fromString("00000000-0000-0000-0000-000000000001"),
        title = "second note",
        data = "they will be removed",
        type = NoteType.BLOB,
        pinned = false,
    ),
)
