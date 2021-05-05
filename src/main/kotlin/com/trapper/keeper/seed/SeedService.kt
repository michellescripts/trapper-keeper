package com.trapper.keeper.seed

import com.trapper.keeper.note.NoteService
import org.springframework.stereotype.Service

@Service
class SeedService(
    private val noteService: NoteService,
    private val scenarioAssignmentService: ScenarioAssignmentService,
) {
    fun seed(): SeedResult? {
        val assignedNoteScenarios = scenarioAssignmentService.assignNoteScenarios()
        val serviceCreated = noteService.seed(assignedNoteScenarios)
        val createdAll = serviceCreated.size == assignedNoteScenarios.noteScenarios.size

        return SeedResult(notes = createdAll)
    }

    fun clean() {
        noteService.clean()
    }
}
