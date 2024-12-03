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

The {ProjectName} provides an event bus for communication between various services and integrations within the system. Developers can subscribe to events to implement their business logic. The platform's event bus supports key expression-based event subscriptions for more granular control.

Currently supported event types include device events, entity events, and entity value data exchange events (Exchange). Developers can also define custom event types.

## Event Definition
### Event

When certain resources on the {ProjectName} platform change, related **events** (`Event`) are triggered, and the methods subscribed to these events are activated. This forms the foundation of the system's operation.

Events are categorized into: **Device Events** (`DeviceEvent`), **Entity Events** (`EntityEvent`), and **Entity Value Data Exchange Events** (`ExchangeEvent`).

#### DeviceEvent
Represents events related to **device metadata**, with types (`DeviceEvent.EventType`) such as: create (`CREATED`), update (`UPDATED`), and delete (`DELETED`). These events carry the device that has changed. *These events are automatically triggered when device metadata is saved, and generally do not require integration developers to send events.*

The payload for `DeviceEvent` is a `Device` object.

#### EntityEvent

Represents events related to **entity metadata**, with types (`EntityEvent.EventType`) such as: create (`CREATED`), update (`UPDATED`), and delete (`DELETED`). These events carry the entity that has changed. *These events are automatically triggered when entity metadata is saved, and generally do not require integration developers to send events.*

The payload for `EntityEvent` is an `Entity` object.

#### ExchangeEvent
Represents events related to **entity value data**, with types (`ExchangeEvent.EventType`) such as: downlink (`DOWN`) and uplink (`UP`).

The payload for `ExchangeEvent` is an `ExchangePayload` object. If the payload is defined using [annotated entities](./entity-definition.md#build-with-annotation), the entity class must extend `ExchangePayload`.

:::tip
The {ProjectName} platform provides an event bus, allowing developers to define custom event types by implementing custom Event and Payload classes. The Event class must implement the `Event` interface, and the Payload class must implement the `IdentityKey` interface.
:::

### Event Payload

#### ExchangePayload

`ExchangePayload` is the payload for `ExchangeEvent` events, used to carry data for entities moving uplink or downlink. It is widely used in the {ProjectName}. `ExchangePayload` is a Map structure containing **key-value data** for Exchange events, where the key is a string and the value is an object. It also includes a **Context object** for carrying additional parameters needed during the exchange process.

##### Constructing ExchangePayload

```java
// Method 1: Construct a single-value ExchangePayload
ExchangePayload payload = ExchangePayload.create(key, value);

// Method 2: Construct a multi-value ExchangePayload (passing a Map)
ExchangePayload payload = ExchangePayload.create(Map.of("key1", value1));

// Method 3: Construct an ExchangePayload from an existing ExchangePayload (copies both values and context)
ExchangePayload payload = ExchangePayload.createFrom(exchangePayload);

// Method 4: Construct an empty ExchangePayload
ExchangePayload payload = ExchangePayload.empty();
```

##### Common Methods for ExchangePayload

- **Payload-related methods**
```java
    // Get value by specified key
    Object getPayload(String key);

    // Get all payloads
    Map<String, Object> getAllPayloads();

    // Get payloads by specified EntityType
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
##### Extending ExchangePayload to Implement Custom Annotated Entities
In the previous sections, we introduced how to [build entities based on annotations](entity-definition.md).

In entity definitions, we can extend ExchangePayload to implement custom annotated entity objects. These objects can be used to **receive ExchangePayload data** and create a proxy object using `ExchangePayload.createProxy(...)`, allowing direct manipulation of entity properties to **construct ExchangePayload objects**.

- Example of receiving ExchangePayload data
```java
    @EventSubscribe(payloadKeyExpression = "my-integration.integration.*", eventType = ExchangeEvent.EventType.DOWN)
    public void onAddDevice(Event<MyIntegrationEntities> event) {
        MyIntegrationEntities myIntegrationEntities = event.getPayload();
        // Child entity
        String ip = myIntegrationEntities.getAddDevice().getIp();
        ...
    }
```

- Example of constructing ExchangePayload objects
```java

    @EventSubscribe(payloadKeyExpression = "my-integration.integration.*", eventType = ExchangeEvent.EventType.DOWN)
    public void onAddDevice(Event<MyIntegrationEntities> event) {

      // mark benchmark done
      MyIntegrationEntities myIntegrationEntities = ExchangePayload.createProxy(MyIntegrationEntities.class);
      myIntegrationEntities.setDetectStatus(MyIntegrationEntities.DetectStatus.STANDBY.ordinal());
      myIntegrationEntities.setDetectReport(null);
      // Child entity
      MyIntegrationEntities.DetectReport detectReport = myIntegrationEntities.getDetectReport();
      detectReport.setConsumedTime(endTimestamp - startTimestamp);
      detectReport.setOnlineCount(activeCount.get());
      detectReport.setOfflineCount(inactiveCount.get());
      exchangeFlowExecutor.syncExchangeUp(donePayload);
      ...
    }

```

:::warning
When constructing ExchangePayload objects, use `ExchangePayload.createProxy(MyIntegrationEntities.class)` to create a proxy object. The proxy object's properties will be mapped to the ExchangePayload object.
:::

## Event Publishing
The {ProjectName} provides an ExchangePayload event publishing flow executor. Developers can use the `ExchangeFlowExecutor` service to publish `ExchangeEvent` events, supporting both synchronous and asynchronous publishing, as well as specifying EventType (uplink or downlink).


### Event Publishing Flow
:::info
Entity data **downlink** and **uplink** refer to the entity's owner. **Downlink** indicates data flowing towards the owner, while **uplink** indicates data flowing out from the owner. *When the owner of the data flow in and out is the same, it is treated as uplink.*

##### Downlink Examples
* A user updates a device or integration's properties or service entity from the frontend.
* An integration's scheduled task triggers a device's service entity.

##### Uplink Examples
* A device uploads updated property entity values.
* A device uploads an event.
* *An integration updates its own entity.*
:::

The `ExchangeEvent` triggers a **general built-in flow** that includes entity **data validation**, **current value saving** (for property entities), and **historical value saving**, followed by triggering the relevant subscription methods.

![Exchange Event Flow](/img/en/exchange-flow.svg)

Both synchronous and asynchronous requests will invoke the relevant listeners.

For synchronous requests, if any listener throws an exception, it will be captured and collected, then thrown after all synchronous listeners have executed. If no exceptions are thrown, the results of all synchronous listeners are returned.

### Code Examples

<Tabs>
<TabItem value="Synchronous" label="Synchronous" default>

```java
    @Service
    public class ExchangeDemoService {
    
        @Autowired
        private ExchangeFlowExecutor exchangeFlowExecutor;
        
        public EventResponse exchangeUp(ExchangePayload payload){
            // Uplink
            //highlight-next-line
            return exchangeFlowExecutor.syncExchangeUp(payload);
        }
    
        public EventResponse exchangeDown(ExchangePayload payload){
            // Downlink
            //highlight-next-line
            return exchangeFlowExecutor.syncExchangeDown(payload);
         }
}
```
  </TabItem>
 <TabItem value="Asynchronous" label="Asynchronous" default>

```java
    @Service
    public class ExchangeDemoService {
    
        @Autowired
        private ExchangeFlowExecutor exchangeFlowExecutor;
        
        public void exchangeUp(ExchangePayload payload){
            // Uplink
            //highlight-next-line
            exchangeFlowExecutor.asyncExchangeUp(payload);
    }
    
        public void exchangeDown(ExchangePayload payload){
            // Downlink
            //highlight-next-line
            exchangeFlowExecutor.asyncExchangeDown(payload);
    }
}
```

</TabItem>
</Tabs>

:::info
{ProjectName} supports synchronous calls with response returns and multiple listener executions, returning an `EventResponse` object.
:::

## Event Subscription
The platform provides the @**EventSubscribe annotation** for subscribing to events. Currently supported event types include device events, entity events, and entity value data exchange events (Exchange). Key wildcard expressions are also supported.
### Annotation Description
- @EventSubscribe annotation
    - eventType: Event type, refer to the event definition section.
    - payloadKeyExpression: Key expression for matching the event's Payload object, supporting wildcards, e.g., `my-integration.*` matches all keys starting with `my-integration.`.


### Event Subscription
#### Subscribing to ExchangeEvent

```java
@Service
public class MyDeviceService {
    
    @EventSubscribe(payloadKeyExpression = "my-integration.integration.add_device.*", eventType = ExchangeEvent.EventType.DOWN)
    // highlight-next-line
    public void onAddDevice(Event<MyIntegrationEntities.AddDevice> event) {
        MyIntegrationEntities.AddDevice addDevice = event.getPayload();
        String ip = addDevice.getIp();
        // ...
    }

    @EventSubscribe(payloadKeyExpression = "my-integration.integration.delete_device", eventType = ExchangeEvent.EventType.DOWN)
    // highlight-next-line
    public EventResponse onDeleteDevice(ExchangeEvent event) {
        Device device = (Device) event.getPayload().getContext("device");
        deviceServiceProvider.deleteById(device.getId());
        // Return the response status synchronously
        return EventResponse.of("connectResult", device.getId());
    }
}

```

:::info
- Annotated entity objects can be used to receive ExchangePayload requests, such as MyIntegrationEntities.AddDevice.
- The `@EventSubscribe` annotation subscribes to events, where eventType is the event type (optional). If empty, it subscribes to all event types.
- The {ProjectName} platform executes asynchronous subscriptions asynchronously and synchronous subscriptions synchronously. Developers can add the @Async annotation for asynchronous execution to isolate business logic in an asynchronous thread pool.
:::

#### Subscribing to DeviceEvent

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
The {ProjectName} exposes events for adding, deleting, and modifying devices. Developers can subscribe to these events to implement their business logic. Generally, developers do not need to focus on these events.
:::

#### Subscribing to EntityEvent

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
The {ProjectName} platform exposes events for adding, deleting, and modifying entities. Developers can subscribe to these events to implement their business logic. Generally, developers do not need to focus on these events.
:::
