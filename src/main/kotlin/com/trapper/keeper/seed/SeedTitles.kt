package com.trapper.keeper.seed

import org.springframework.stereotype.Component

@Component
class SeedTitles {
    // In this example codebase, TITLES represents the amount of data
    // that will be seeded into the application.
    // Scenarios will be randomly assigned to titles until all titles have data.
    // Use this to throttle your seeding of data,
    // or to seed different data based on needs (ex: environment, user, date, etc)
    // *also helpful for fields that need to be unique
    val TITLES: List<String> = listOf(
        "lorem ipsum dolor",
        "sit amet consectetur",
        "adipiscing elit sed",
        "do eiusmod tempor",
        "incididunt ut labore",
        "et dolore magna",
        "aliqua consectetur adipiscing",
        "elit pellentesque habitant",
        "morbi tristique senectus",
        "et lorem mollis",
        "aliquam ut porttitor",
        "arcu risus quis",
        "varius quam quisque",
        "id diam vel",
        "maecenas ultricies mi",
        "eget mauris pharetra",
        "ultrices mi tempus",
        "imperdiet nulla malesuada",
        "pellentesque massa tincidunt",
        "nunc pulvinar sapien",
    )
}
