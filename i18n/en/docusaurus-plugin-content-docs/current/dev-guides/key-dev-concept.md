---
sidebar_position: 4
---

import { ProjectName } from '/src/consts';

# Introduction to Key Coding Concepts

## Concepts

### Identifier
An `identifier` refers to the unique name of an object, which must be distinct within the same **namespace**.

It can only contain the following characters: `A-Z`, `a-z`, `0-9`, `_`, `@`, `#`, `-`, `/`, `[`, `]`, `:`, and it is recommended to use **Snake Case (lowercase letters with underscores, such as `foo_bar`)** for naming.

* For **integrations** the namespace is **global**, meaning that different integrations within a single {ProjectName} application instance cannot have duplicate integration `identifiers`. Generally, all {ProjectName} integration `identifiers` should be unique.
* For **devices**, the namespace is the **integration to which the device belongs**, meaning that each device within an integration should have a unique `identifier`, but device `identifiers` can be duplicated across different integrations. If integrating with third-party platforms, it is recommended to use the third-party platform's device identifier as the `identifier` to facilitate mapping between the integration and the corresponding device on that platform.
* For **entities**:
    * The namespace of an **integration's entity** is **its integration**.
    * The namespace of a **device's entity** is **its device**. Entity `identifiers` can be duplicated across different integrations/devices.
    * The namespace of a **child entity** is **its parent entity**. Child entity `identifiers` can be duplicated across different parent entities.

:::tip Full Identifier
In addition to the `identifier`, a child entity also has a `fullIdentifier`, which includes the identifier of its parent entity.

For example, if a child entity's `identifier` is `bar` and its parent entity's `identifier` is `foo`, then the child entity's `fullIdentifier` would be `foo.bar`.
:::

### Key

The concept of a key is primarily significant for **entities**.

The key format for an **integration's entity** is:
```
{integration_identifier}.integration.{entity_identifier}[.{child_entity_identifier}]
```
The key format for a **device's entity** is:
```
{integration_identifier}.device.{device_identifier}.{entity_identifier}[.{child_entity_identifier}]
```