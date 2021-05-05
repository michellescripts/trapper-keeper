package com.trapper.keeper.note

import org.springframework.stereotype.Service

@Service
class NoteService {
    fun getNotes(): List<Note> = TEMP_NOTES
}
