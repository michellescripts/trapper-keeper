package com.trapper.keeper

import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.runApplication

@SpringBootApplication
class KeeperApplication

fun main(args: Array<String>) {
    runApplication<KeeperApplication>(*args)
}
