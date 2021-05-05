package com.trapper.keeper.testMakers

import com.trapper.keeper.note.NoteType
import java.time.LocalDate
import java.time.LocalDateTime
import java.util.UUID
import kotlin.reflect.KClass

inline fun <reified T> make(): T {
    return makeInstanceOfClass(T::class) as T
}

fun makeInstanceOfClass(clazz: KClass<*>): Any? {
    val primitive = makePrimitiveOrNull(clazz)
    if (primitive != null) {
        return primitive
    }

    val constructors = clazz.constructors
        .sortedBy { it.parameters.size }

    for (constructor in constructors) {
        val arguments = constructor.parameters
            .map { param ->
                param.takeUnless { it.type.isMarkedNullable }
                    ?.let { makeInstanceOfClass(it.type.classifier as KClass<*>) }
            }
            .toTypedArray()

        try {
            return constructor.call(*arguments)
        } catch (e: Throwable) {
        }
    }

    throw NoUsableConstructor(clazz)
}

private fun makePrimitiveOrNull(clazz: KClass<*>): Any? = when (clazz) {
    Int::class -> 0
    Long::class -> 0L
    Double::class -> 0.0
    String::class -> ""
    Boolean::class -> false
    UUID::class -> UUID.randomUUID()
    List::class -> emptyList<Any>()
    Set::class -> emptySet<Any>()
    Map::class -> emptyMap<Any, Any>()
    LocalDate::class -> LocalDate.now()
    LocalDateTime::class -> LocalDateTime.now()

    NoteType::class -> NoteType.BLOB
    else -> null
}

class NoUsableConstructor(clazz: KClass<*>) : Error("Could not find a constructor for class: ${clazz.simpleName}")
