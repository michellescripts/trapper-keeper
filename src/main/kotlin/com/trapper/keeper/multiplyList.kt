package com.trapper.keeper

fun <T> multiplyList(quantityToUserScenario: List<Pair<Int, T>>): List<T> =
    quantityToUserScenario.map { (size, scenario) ->
        List(size) { scenario }
    }.flatten()
