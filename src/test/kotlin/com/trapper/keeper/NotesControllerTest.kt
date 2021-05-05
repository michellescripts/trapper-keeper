package com.trapper.keeper

import com.nhaarman.mockitokotlin2.verify
import com.nhaarman.mockitokotlin2.whenever
import com.trapper.keeper.note.Note
import com.trapper.keeper.note.NoteService
import com.trapper.keeper.note.NotesController
import com.trapper.keeper.testMakers.make
import org.junit.jupiter.api.Test
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest
import org.springframework.boot.test.mock.mockito.MockBean
import org.springframework.test.web.servlet.MockMvc
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get
import org.springframework.test.web.servlet.result.MockMvcResultMatchers.status

@WebMvcTest(NotesController::class)
internal class NotesControllerTest {
    @Autowired
    private lateinit var mockMvc: MockMvc

    @MockBean
    private lateinit var noteService: NoteService

    @Test
    fun `GET notes should call the notes service`() {
        val data = listOf(make<Note>(), make<Note>())
        whenever(noteService.getNotes()).thenReturn(data)

        mockMvc.perform(
            get("/api/v1/note")
        ).andExpect(status().isOk)

        verify(noteService).getNotes()
    }
}
