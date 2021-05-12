package com.trapper.keeper.note

import com.fasterxml.jackson.annotation.JsonCreator
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RequestParam
import org.springframework.web.bind.annotation.RestController

@RestController
@RequestMapping("/api/v1/")
class NotesController(
    private val noteService: NoteService
) {
    @GetMapping("/note")
    fun getNotes(
        @RequestParam(required = false) showDeleted: Boolean?
    ): ResponseEntity<Notes> {
        if (showDeleted == true) {
            return ResponseEntity.ok(Notes(notes = noteService.getNotesDeleted()))
        }
        return ResponseEntity.ok(Notes(notes = noteService.getNotes()))
    }
}

data class Notes @JsonCreator constructor(
    val notes: List<Note>
)
