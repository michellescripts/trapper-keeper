package com.trapper.keeper.seed

import org.springframework.stereotype.Service

@Service
class ScenarioAssignmentService(
    val seedConfig: SeedConfig,
    val seedNoteScenarios: SeedNoteScenarios,
) {
    fun assignNoteScenarios(): AssignedNoteScenarios = AssignedNoteScenarios(
        seedConfig.getNoteTitles().shuffled().mapIndexed { i, title ->
            seedNoteScenarios.noteScenarios[i % seedNoteScenarios.noteScenarios.size]
                .title(title)
                .assign()
        }
    )
}
