package com.trapper.keeper.note

import java.util.UUID

data class Note(
    val id: UUID?,
    val title: String,
    val data: String,
    val type: NoteType,
    val pinned: Boolean,
    val deleted: Boolean,
)

enum class NoteType {
    BLOB,
    CHECK,
}

fun Note.toNoteEntity() = NoteEntity(
    id = id,
    title = title,
    data = data,
    type = type,
    pinned = pinned,
    deleted = deleted,
)
