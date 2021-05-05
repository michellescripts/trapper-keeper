# trapper keeper

my favorite code patterns, helpers, implementation details, etc.

## bin

### scripts
- [x] push

## kotlin

### patterns
- [x] maker

#### maker
- the intention is to set up fake-data for tests quickly, and to only set the fields you care about for testing >> this leads to slimmer test implementation, with a focus on the test subject
- see `keeper/src/test/kotlin/com/trapper/keeper/testmakers/make.kt` for implementation
- search `keeper/src/test/kotlin/com/trapper/keeper` with `make<` for usage examples
