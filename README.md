# Roberts Family Network

## Architecture

### Use Cases

RFN is built using `use-cases`. Each piece of functionality is created in isolation
as a use-case. Things that are common such as Logging or Database Connections are
pulled into their own modules.

For each _thing_ that the _system_ can do, it should be have a single use-case
that does it. You can use that use-case _elsewhere_ to drive higher level
logic such as mapping requests or interacting at a Domain level.

### Buses

#### System Wide

_**Events**_

- INIT
  - **Cause**: When the system first starts up
  - **Payload**: `none`
- EXIT
  - **Cause**: When the system has been requested to shut down
  - **Payload**: `{ reason: string }`
