---
sidebar_position: 4
---

import { ProjectName } from '/src/consts';

# Introduction to Key Coding Concepts

## Concepts

### identifier
An `identifier` refers to the unique identifier of an object, which must not be duplicated within the same **namespace**.

It can only contain the following characters: `A-Z` `a-z` `0-9` `_` `@` `#` `-` `/` `[` `]` `:`, and it is recommended to use **snake_case** (lowercase letters with underscores, such as `foo_bar`) for naming.

#### Integration Identifier
The namespace is **global**, meaning that different integrations within a single {ProjectName} application instance cannot have duplicate integration `identifier`s. In general, all integration `identifier`s in {ProjectName} should be unique.

#### Device Identifier
The namespace is **within the integration**, meaning that each device's `identifier` within an integration must be unique. Device `identifier`s can be duplicated across different integrations. If integrating with a third-party platform, we recommend using the device identifier from the third-party platform as the `identifier` for easier mapping between the integration and corresponding devices on that platform.

#### Entity Identifier
* The namespace for **integration entities** is **their integration**.
* The namespace for **device entities** is **their device**. Entity `identifier`s may be duplicated across different integrations/devices.
* The namespace for **child entities of a parent entity** is **their parent entity**. Child entity `identifier`s may be duplicated across different parent entities.

:::tip Full Identifier
Child entities also have the concept of a `fullIdentifier`, which includes the identifier of the parent entity.

For example: If a child entity's `identifier` is `bar` and its parent entity's `identifier` is `foo`, then the child entity's `fullIdentifier` would be `foo.bar`.
:::


### key

The concept of a key is typically only meaningful for **entities**.

The key format for **integration entities** is like:
```
{integration identifier}.integration.{entity identifier}[.{child entity identifier}]
```
The key format for **device entities** is like:
```
{integration identifier}.device.{device identifier}.{entity identifier}[.{child entity identifier}]
```