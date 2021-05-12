package com.trapper.keeper.note

import org.hibernate.annotations.CreationTimestamp
import org.springframework.data.annotation.CreatedDate
import java.time.Instant
import java.util.UUID
import javax.persistence.*


@Entity(name = "note")
data class NoteEntity(
    @Id
    @Column
    @GeneratedValue(strategy = GenerationType.AUTO)
    var id: UUID? = null,

    @Column
    @Enumerated(EnumType.STRING)
    val type: NoteType,

    @Column
    val title: String,

    @Column
    val data: String,

    @Column
    val pinned: Boolean = false,

    @Column
    val deleted: Boolean = false,
) {
    @CreatedDate
    @CreationTimestamp
    @Column(updatable = false, nullable = false)
    lateinit var createdAt: Instant
}

fun NoteEntity.toNote() = Note(
    id = id,
    title = title,
    data = data,
    type = type,
    pinned = pinned,
    deleted = deleted,
)
