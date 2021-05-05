import org.jetbrains.kotlin.gradle.tasks.KotlinCompile

plugins {
    kotlin("jvm") version "1.4.32"
    kotlin("plugin.spring") version "1.4.32"

    id("io.spring.dependency-management") version "1.0.11.RELEASE"
    id("org.springframework.boot") version "2.4.5"
    id("org.flywaydb.flyway") version "7.8.2"
    id("org.jetbrains.kotlin.plugin.jpa") version "1.4.10"
}

group = "com.trapper"
version = "0.0.1-SNAPSHOT"
java.sourceCompatibility = JavaVersion.VERSION_11

repositories {
    mavenCentral()
}

dependencies {
    implementation("org.jetbrains.kotlin:kotlin-reflect")
    implementation("org.jetbrains.kotlin:kotlin-stdlib-jdk8")
    implementation("org.springframework.boot:spring-boot-starter")
    implementation("org.springframework.boot:spring-boot-starter-web")
    implementation("org.flywaydb:flyway-core:7.8.2")
    implementation("org.springframework.boot:spring-boot-starter-data-jpa:2.4.5")

    runtimeOnly("org.postgresql:postgresql:42.2.16")

    testImplementation("io.mockk:mockk:1.10.0")
    testImplementation("com.nhaarman.mockitokotlin2:mockito-kotlin:2.2.0")
    testImplementation("org.junit.jupiter:junit-jupiter:5.4.2")
    testImplementation("org.springframework.boot:spring-boot-starter-test")
    testImplementation("org.springframework.security:spring-security-test")
}

tasks.withType<KotlinCompile> {
    kotlinOptions {
        freeCompilerArgs = listOf("-Xjsr305=strict")
        jvmTarget = "11"
    }
}

tasks.withType<Test> {
    useJUnitPlatform()
    systemProperty("junit.jupiter.execution.parallel.enabled", true)

    testLogging {
        // set options for log level LIFECYCLE
        events(
            org.gradle.api.tasks.testing.logging.TestLogEvent.FAILED,
            org.gradle.api.tasks.testing.logging.TestLogEvent.PASSED,
            org.gradle.api.tasks.testing.logging.TestLogEvent.SKIPPED,
            org.gradle.api.tasks.testing.logging.TestLogEvent.STANDARD_ERROR
        )
        exceptionFormat = org.gradle.api.tasks.testing.logging.TestExceptionFormat.FULL
        showExceptions = true
        showCauses = true
        showStackTraces = true

        // set options for log level DEBUG and INFO
        debug {
            events(
                org.gradle.api.tasks.testing.logging.TestLogEvent.STARTED,
                org.gradle.api.tasks.testing.logging.TestLogEvent.FAILED,
                org.gradle.api.tasks.testing.logging.TestLogEvent.PASSED,
                org.gradle.api.tasks.testing.logging.TestLogEvent.SKIPPED,
                org.gradle.api.tasks.testing.logging.TestLogEvent.STANDARD_ERROR,
                org.gradle.api.tasks.testing.logging.TestLogEvent.STANDARD_OUT
            )
            exceptionFormat = org.gradle.api.tasks.testing.logging.TestExceptionFormat.FULL
        }
        info.events = debug.events
        info.exceptionFormat = debug.exceptionFormat
    }

    var failures = ""

    addTestListener(object : TestListener {
        override fun beforeSuite(suite: TestDescriptor) {}
        override fun beforeTest(testDescriptor: TestDescriptor) {}
        override fun afterTest(testDescriptor: TestDescriptor, result: TestResult) {
            if (result.resultType === TestResult.ResultType.FAILURE) {
                failures += " * ${testDescriptor.className} > \n\t${testDescriptor.name}\n"
            }
        }

        override fun afterSuite(suite: TestDescriptor, result: TestResult) {
            if (suite.parent === null) { // will match the outermost suite
                val purple = "\u001B[35m"
                val red = "\u001B[31m"
                val reset = "\u001B[0m"
                val output =
                    "Results: ${result.resultType} (${result.testCount} tests, ${result.successfulTestCount} successes, ${result.failedTestCount} failures, ${result.skippedTestCount} skipped)"
                val divider = "\n**********************************************************************************\n"

                println(divider)
                if (failures === "") {
                    print(purple)
                    println("SUCCESS")
                    print(reset)
                }

                if (failures !== "") {
                    println(red)
                    println("FAILURES:")
                    println("\n")
                    println(failures + reset)
                }

                println("RESULTS:")
                println(output)
                println(divider)
            }
        }
    })
}
