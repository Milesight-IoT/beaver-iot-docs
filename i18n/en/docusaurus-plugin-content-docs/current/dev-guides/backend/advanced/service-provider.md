---
sidebar_position: 4
toc_min_heading_level: 2
toc_max_heading_level: 3
---

import { ProjectName } from '/src/consts';

# API Reference

## Overview

The {ProjectName} platform provides a set of common service interfaces for integration developers to implement their business logic. These services include integration services, device services, entity services, and entity value services.

## DeviceServiceProvider API Documentation

The {ProjectName} platform offers the `DeviceServiceProvider` interface, which provides common methods for device operations.

### save <a id="device-service-provider-save"></a>

Save a device (including the entities under the device).

#### Method Signature
```java
void save(Device device);
```

### deleteById

Delete a device by its ID.

#### Method Signature
```java
void deleteById(Long id);
```

### findById

Find a device by its ID.

#### Method Signature
```java
Device findById(Long id);
```

### findByKey

Find a device by its key.

#### Method Signature
```java
Device findByKey(String deviceKey);
```

### findByIdentifier

Find a device by its identifier.

#### Method Signature
```java
Device findByIdentifier(String identifier, String integrationId);
```

### findAll

Find all devices by integration ID.

#### Method Signature
```java
List<Device> findAll(String integrationId);
```

### countByIntegrationIds

Count the number of devices by a list of integration IDs.

#### Method Signature
```java
Map<String, Long> countByIntegrationIds(List<String> integrationIds);
```

### countByIntegrationId

Count the number of devices by integration ID.

#### Method Signature
```java
Long countByIntegrationId(String integrationId);
```

## EntityServiceProvider API Documentation

The {ProjectName} platform offers the `EntityServiceProvider` interface, which provides common methods for entity operations.

### findByTargetId <a id="entity-target"></a>

Find a list of entities by target type and target ID.

:::info **Target**
**Target** includes **Device** `AttachTargetType.DEVICE` and **Integration** `AttachTargetType.INTEGRATION`.
:::

#### Method Signature
```java
List<Entity> findByTargetId(AttachTargetType targetType, String targetId);
```

### findByTargetIds

Find a list of entities by target type and a list of target IDs.

#### Method Signature
```java
List<Entity> findByTargetIds(AttachTargetType targetType, List<String> targetIds);
```

### save <a id="entity-service-provider-save"></a>

Save an entity.

#### Method Signature
```java
void save(Entity entity);
```

### batchSave

Save a list of entities in batch.

#### Method Signature
```java
void batchSave(List<Entity> entityList);
```

### deleteByTargetId

Delete entities by [target](#entity-target) ID.

#### Method Signature
```java
void deleteByTargetId(String targetId);
```

### countAllEntitiesByIntegrationId

Count all entities by integration ID (including entities under the devices of the integration).

#### Method Signature
```java
long countAllEntitiesByIntegrationId(String integrationId);
```

### countAllEntitiesByIntegrationIds

Count all entities by a list of integration IDs (including entities under the devices of the integrations).

#### Method Signature
```java
Map<String, Long> countAllEntitiesByIntegrationIds(List<String> integrationIds);
```

### countIntegrationEntitiesByIntegrationId

Count integration entities by integration ID (excluding entities under the devices of the integration).

#### Method Signature
```java
long countIntegrationEntitiesByIntegrationId(String integrationId);
```

### countIntegrationEntitiesByIntegrationIds

Count integration entities by a list of integration IDs (excluding entities under the devices of the integrations).

#### Method Signature
```java
Map<String, Long> countIntegrationEntitiesByIntegrationIds(List<String> integrationIds);
```

### findByKey

Find an entity by its key.

#### Method Signature
```java
Entity findByKey(String entityKey);
```

### findByKeys

Find entities by a list of keys.

#### Method Signature
```java
Map<String, Entity> findByKeys(String... entityKeys);
```

### findById

Find an entity by its ID.

#### Method Signature
```java
Entity findById(Long entityId);
```

### findByIds

Find entities by a list of IDs.

#### Method Signature
```java
List<Entity> findByIds(List<Long> ids);
```

## EntityValueServiceProvider API Documentation

The {ProjectName} platform offers the `EntityValueServiceProvider` interface, which provides common methods for operating on the latest and historical values of entities.

### saveValuesAndPublishSync

Save entity values and publish events synchronously.

#### Method Signature
Using [default event type](./eventbus.md#exchange-event):
```java
EventResponse saveValuesAndPublishSync(ExchangePayload exchangePayload);
```
Custom event type:
```java
EventResponse saveValuesAndPublishSync(ExchangePayload exchangePayload, String eventType);
```

### saveValuesAndPublishAsync

Save entity values and publish events asynchronously.

#### Method Signature
Using [default event type](./eventbus.md#exchange-event):
```java
EventResponse saveValuesAndPublishAsync(ExchangePayload exchangePayload);
```
Custom event type:
```java
EventResponse saveValuesAndPublishAsync(ExchangePayload exchangePayload, String eventType);
```

### saveValues

Save the latest values of entities.

#### Method Signature
```java
void saveValues(Map<String, Object> values, long timestamp);
```

### saveValues

Save the latest values of entities (with the current time as the reporting time).

#### Method Signature
```java
void saveValues(Map<String, Object> values);
```

### saveHistoryRecord

Save historical values of entities.

#### Method Signature
```java
void saveHistoryRecord(Map<String, Object> recordValues, long timestamp);
```

### saveHistoryRecord

Save historical values of entities (with the current time as the reporting time).

#### Method Signature
```java
void saveHistoryRecord(Map<String, Object> recordValues);
```

### findValueByKey

Find the latest value of an entity by its key.

#### Method Signature
```java
JsonNode findValueByKey(String key);
```

### findValuesByKeys

Find the latest values of entities by a list of keys.

#### Method Signature
```java
Map<String, JsonNode> findValuesByKeys(List<String> keys);
```

### findValuesByKey

Find the latest values of entities by a list of keys.

#### Method Signature
```java
@NonNull <T extends ExchangePayload> T findValuesByKey(String key, Class<T> entitiesClazz);
```

## IntegrationServiceProvider API Documentation

The `IntegrationServiceProvider` interface defines operations related to integration configurations.

### save

Save an integration (including the entities under the integration).

#### Method Signature
```java
void save(Integration integrationConfig);
```

### batchSave

Save integrations in batch.

#### Method Signature
```java
void batchSave(Collection<Integration> integrationConfig);
```

### getIntegration

Get an integration instance by its ID (including disabled instances).

#### Method Signature
```java
Integration getIntegration(String integrationId);
```

### getActiveIntegration

Get an active integration instance by its ID.

#### Method Signature
```java
Integration getActiveIntegration(String integrationId);
```

### findIntegrations

Find all integration instances.

#### Method Signature
```java
Collection<Integration> findIntegrations();
```

### findActiveIntegrations

Find all active integration instances.

#### Method Signature
```java
List<Integration> findActiveIntegrations();
```

### findIntegrationsWithPredicate

Find integration instances based on a condition.

#### Method Signature
```java
List<Integration> findIntegrations(Predicate<Integration> predicate);
```

#### Code Example

Find all integrations that can add devices:
```java
List<Integration> integrations = integrationServiceProvider.findIntegrations(f -> StringUtils.hasText(f.getEntityKeyAddDevice()));
```