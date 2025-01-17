---
sidebar_position: 3
toc_min_heading_level: 2
toc_max_heading_level: 4
---

import { ProjectName } from '/src/consts';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Event Bus

## Overview

The {ProjectName} platform provides an event bus for communication between various services and integrations within the system. Developers can subscribe to events to implement their business logic. The platform's event bus supports key expression-based event subscriptions for finer-grained subscriptions.

The current platform supports the following event types: Device Events, Entity Events, and Entity Value Data Exchange Events (Exchange). The first two types are generally not sent by developers, as the system automatically sends them when devices or entities are updated. If an integration is interested in these events, it can directly subscribe to the relevant events.

## Event Definitions

### Event

When certain resources in {ProjectName} change, related **events** `Event` are triggered. The methods that subscribe to these events are then executed, forming the basis of the system's operation.

Events are classified into: **Device Events** `DeviceEvent`, **Entity Events** `EntityEvent`, and **Entity Value Data Exchange Events** `ExchangeEvent`.

#### DeviceEvent

Represents events related to **device metadata**. The event types (`DeviceEvent.EventType`) include: Created `CREATED`, Updated `UPDATED`, and Deleted `DELETED`. This event carries the device that has changed. *This event is automatically triggered when device metadata is saved, and generally, integration developers do not need to send this event.*

The payload for `DeviceEvent` is a `Device` object.

#### EntityEvent

Represents events related to **entity metadata**. The event types (`EntityEvent.EventType`) include: Created `CREATED`, Updated `UPDATED`, and Deleted `DELETED`. This event carries the entity that has changed. *This event is automatically triggered when entity metadata is saved, and generally, integration developers do not need to send this event.*

The payload for `EntityEvent` is an `Entity` object.

#### ExchangeEvent <a id="exchange-event"></a>

Represents events related to **entity value data**. The event types (`ExchangeEvent.EventType`) include:
* Service Call `CALL_SERVICE`
* Property Update `UPDATE_PROPERTY`
* Event Report `REPORT_EVENT`
* Custom types defined by other senders

The payload for `ExchangeEvent` is an `ExchangePayload` object. If the payload is an [annotation-defined entity](./entity-definition.md#build-with-annotation), the entity class needs to inherit from `ExchangePayload`.

### ExchangeEvent Payload

#### ExchangePayload <a id="build-exchange-payload"></a>

`ExchangePayload` is the payload for `ExchangeEvent`, used to carry up and down data for entities. `ExchangePayload` is widely used in the {ProjectName} platform. It is a Map structure that contains **key-value data for Exchange events**, where the key is a string and the value is an object. It also contains a **context object** for carrying additional parameters needed during the Exchange process.

##### Constructing ExchangePayload

<Tabs>
  <TabItem value="Method 1" label="Method 1" default>
Constructing a single-value `ExchangePayload`
```java
ExchangePayload payload = ExchangePayload.create(key, value);
```
</TabItem>
<TabItem value="Method 2" label="Method 2">
Constructing a multi-value `ExchangePayload` (passing a Map)
```java
ExchangePayload payload = ExchangePayload.create(Map.of("key1", value1));
```
</TabItem>
<TabItem value="Method 3" label="Method 3">
Constructing `ExchangePayload` from an existing `ExchangePayload` (copying both values and context)
```java
ExchangePayload payload = ExchangePayload.createFrom(exchangePayload);
```
</TabItem>
<TabItem value="Method 4" label="Method 4">
Constructing an empty `ExchangePayload`
```java
ExchangePayload payload = ExchangePayload.empty();
```
</TabItem>
</Tabs>

##### Common Methods for ExchangePayload

- **Payload-related methods**
```java
    // Get value by specified key
    Object getPayload(String key);

    // Get all payloads
    Map<String, Object> getAllPayloads();

    // Get payloads by specified entity type
    Map<String, Object> getPayloadsByEntityType(EntityType entityType);

    // Get corresponding entities
    Map<String, Entity> getExchangeEntities();
```

- **Context-related methods**
```java
    // Get context
    Map<String, Object> getContext();

    // Set context
    void setContext(Map<String, Object> context);

    // Get context by specified key
    Object getContext(String key);

    // Get context by specified key, return default value if not present
    <T> T getContext(String key, T defaultValue);

    // Set context
    void putContext(String key, Object value);
```

##### Extending ExchangePayload to Implement Custom Entity Annotation Objects

In previous sections, we introduced how to [build entities based on annotations](entity-definition.md). In entity definitions, we can extend `ExchangePayload` to implement custom entity annotation objects, which can **receive ExchangePayload data**.

- Example of receiving ExchangePayload data
```java
    @EventSubscribe(payloadKeyExpression = "my-integration.integration.*")
    public void onAddDevice(Event<MyIntegrationEntities> event) {
        // highlight-next-line
        MyIntegrationEntities myIntegrationEntities = event.getPayload();
        // highlight-next-line
        // Can also get sub-entity objects
        String ip = myIntegrationEntities.getAddDevice().getIp();
        ...
    }
```

## Publishing Entity ExchangePayload Events

The {ProjectName} platform provides a process executor for publishing `ExchangePayload` events. Developers can publish `ExchangeEvent` events by calling the `EntityValueServiceProvider` service. Both synchronous and asynchronous publishing are supported.
* Synchronous events generally end with `Sync`, such as `saveValuesAndPublishSync`.
* Asynchronous events generally end with `Async`, such as `saveValuesAndPublishAsync`.

### Event Publishing Process

`ExchangeEvent` events trigger a **general built-in process** that includes **data validation**, **current value saving** (for property entities), and **historical value saving** before triggering the related subscription methods.

![Exchange Event Flow](/img/en/exchange-flow.svg)

Whether it is a synchronous or asynchronous request, the relevant listeners will be called.

For synchronous requests, if any listener throws an exception, the exception will be caught and collected, and then an exception will be thrown after all synchronous listeners have been executed. If no exception is thrown, the results of all synchronous listeners will be returned.

:::info
The {ProjectName} platform supports returning responses for synchronous calls and executing multiple listeners, returning an `EventResponse` response object.
:::

## Event Subscription

The platform provides the `@EventSubscribe` annotation for subscribing to events. The currently supported event types are Device Events, Entity Events, and Entity Value Data Exchange Events (Exchange). Wildcard expressions are also supported for key matching.

### Annotation Description

- `@EventSubscribe` annotation
    - `eventType`: Event type, refer to the event definitions section.
    - `payloadKeyExpression`: Key expression for matching the event's payload object, supports wildcards, e.g., `my-integration.*` matches all keys starting with `my-integration.`

### Event Subscription

#### Subscribing to ExchangeEvent Events

```java
@Service
public class MyDeviceService {
    
    @EventSubscribe(payloadKeyExpression = "my-integration.integration.add_device.*", eventType = ExchangeEvent.EventType.CALL_SERVICE)
    // highlight-next-line
    public void onAddDevice(Event<MyIntegrationEntities.AddDevice> event) {
        MyIntegrationEntities.AddDevice addDevice = event.getPayload();  // Can use entity annotation objects to receive ExchangePayload requests
        String ip = addDevice.getIp(); 
        // ...
    }

    @EventSubscribe(payloadKeyExpression = "my-integration.integration.xxxx", eventType = ExchangeEvent.EventType.CALL_SERVICE)
    // highlight-next-line
    public EventResponse onDeleteDevice(ExchangeEvent event) {
        Object ctxValue = event.getPayload().getContext("<Something in context>");
        // Return response status synchronously
        return EventResponse.of("<responseKey>", "<responseValue>");
    }
}
```

:::info
- Entity annotation objects can be used as parameters to receive ExchangePayload requests, such as `MyIntegrationEntities.AddDevice`.
- The `@EventSubscribe` annotation subscribes to events, where `eventType` is the event type. It is optional, and if not specified, it subscribes to all event types.
- The {ProjectName} platform executes asynchronous subscriptions asynchronously and synchronous subscriptions synchronously. Developers can add the `@Async` annotation to execute asynchronously, implementing business logic with isolated asynchronous thread pools.
:::

#### Subscribing to DeviceEvent Events

```java
@Service
public class MyDeviceService {
    
    @EventSubscribe(payloadKeyExpression = "my-integration.device.*", eventType = DeviceEvent.EventType.CREATED)
    // highlight-next-line
    public void onSaveDevice(DeviceEvent event) {
        ...
    }
}
```

:::tip
The {ProjectName} platform exposes events for adding, deleting, and updating devices. Developers can subscribe to these events to implement their business logic. Generally, developers do not need to focus on these events.
:::

#### Subscribing to EntityEvent Events

```java
@Service
public class MyEntityService {
    
    @EventSubscribe(payloadKeyExpression = "my-integration.device.*", eventType = DeviceEvent.EventType.CREATED)
    // highlight-next-line
    public void onSaveEntity(EntityEvent event) {
        ...
    }
}
```

:::tip
The {ProjectName} platform exposes events for adding, deleting, and updating entities. Developers can subscribe to these events to implement their business logic. Generally, developers do not need to focus on these events.
:::
