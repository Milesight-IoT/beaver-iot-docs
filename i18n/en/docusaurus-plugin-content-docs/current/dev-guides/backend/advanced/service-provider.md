---
sidebar_position: 4
toc_min_heading_level: 2
toc_max_heading_level: 3
---

import { ProjectName } from '/src/consts';

# API Reference

## Overview
{ProjectName} offers a range of versatile service interfaces for developers to integrate and implement their business logic. These include integration services, device services, entity services, and entity value services.

## IntegrationServiceProvider Interface Documentation

The `IntegrationServiceProvider` interface defines methods related to integration configuration operations.

### save 
Save Integration
#### Method Signature
```java
void save(Integration integrationConfig);
```

### batchSave 
Save Integrations in Bulk
#### Method Signature
```java
void save(Integration integrationConfig);
```

### getIntegration 
Retrieve Integration Instance by ID (Including Disabled)
#### Method Signature
```java
Integration getIntegration(String integrationId);
```

### getActiveIntegration 
Retrieve Active Integration Instance by ID
#### Method Signature
```java
Integration getActiveIntegration(String integrationId);
```

### findIntegrations 
Find All Integrations
#### Method Signature
```java
Collection<Integration> findIntegrations();
```
#### Code Example

### findActiveIntegrations 
Find All Active Integrations
#### Method Signature
```java
List<Integration> findActiveIntegrations();
```
#### Code Example

### findIntegrationsWithPredicate 
Find Integrations by Condition
#### Method Signature
```java
List<Integration> findIntegrations(Predicate<Integration> predicate);
```
#### Code Example
```java
// Find all integrations that include the entityKeyAddDevice field
List<Integration> integrations = integrationServiceProvider.findIntegrations(f -> StringUtils.hasText(f.getEntityKeyAddDevice()));
```

## DeviceServiceProvider Interface Documentation
{ProjectName} provides the `DeviceServiceProvider` interface, offering common device operation methods.

### save 
Save Device
#### Method Signature
```java
void save(Device device);
```

### deleteById 
Delete Device by ID
#### Method Signature
```java
void deleteById(Long id);
```

### findById 
Find Device by ID
#### Method Signature
```java
Device findById(Long id);
```

### findByKey 
Find Device by Key
#### Method Signature
```java
Device findByKey(String deviceKey);
```

### findByIdentifier 
Find Device by Identifier
#### Method Signature
```java
Device findByIdentifier(String identifier, String integrationId);
```

### findAll 
Find All Devices by Integration ID
#### Method Signature
```java
    List<Device> findAll(String integrationId);
```

### findByIdentifier 
Find Device by Identifier and Integration ID
#### Method Signature
```java
   Device findByIdentifier(String identifier, String integrationId);
```

### findAll 
Find Device List by Integration ID
#### Method Signature
```java
   List<Device> findAll(String integrationId);
```

### countByIntegrationIds 
Count Devices by Integration ID List
#### Method Signature
```java
    Map<String, Long> countByIntegrationIds(List<String> integrationIds);
```

### countByIntegrationIds 
Count Devices by Integration ID
#### Method Signature
```java
   Long countByIntegrationId(String integrationId);
```

## EntityServiceProvider Interface Documentation
{ProjectName} provides the `EntityServiceProvider` interface, offering common entity operation methods.

### findByTargetId
Retrieve Entity List by Target Type and Target ID
#### Method Signature
```java
    List<Entity> findByTargetId(AttachTargetType targetType, String targetId);
```

### findByTargetIds
Retrieve Entity List by Target Type and Target ID List
#### Method Signature
```java
    List<Entity> findByTargetIds(AttachTargetType targetType, List<String> targetIds);
```

### save
Save Entity
#### Method Signature
```java
    void save(Entity entity);
```

### batchSave
Save Entities in Bulk
#### Method Signature
```java
    void batchSave(List<Entity> entityList);
```

### deleteByTargetId
Delete Entity by Target ID
#### Method Signature
```java
    void deleteByTargetId(String targetId);
```

### countAllEntitiesByIntegrationId
Count All Entities by Integration ID (Including Device Entities)
#### Method Signature
```java
    long countAllEntitiesByIntegrationId(String integrationId);
```

### countIntegrationEntitiesByIntegrationId
Count Integration Entities by Integration ID List (Including Device Entities)
#### Method Signature
```java
    Map<String, Long> countAllEntitiesByIntegrationIds(List<String> integrationIds);
```

### countIntegrationEntitiesByIntegrationId
Count Integration Entities by Integration ID (Excluding Device Entities)
#### Method Signature
```java
    long countIntegrationEntitiesByIntegrationId(String integrationId);
```

### countIntegrationEntitiesByIntegrationIds
Count Integration Entities by Integration ID List (Excluding Device Entities)
#### Method Signature
```java
    Map<String, Long> countIntegrationEntitiesByIntegrationIds(List<String> integrationIds);
```

### findByKey
Find Entity by Key
#### Method Signature
```java
    Entity findByKey(String entityKey);
```

### findByKeys
Find Entities by Key Collection
#### Method Signature
```java
    Map<String, Entity> findByKeys(String... entityKeys);
```

## EntityValueServiceProvider Interface Documentation
{ProjectName} provides the `EntityValueServiceProvider` interface, offering common methods for the latest and historical entity values.

### saveValues
Save Latest Entity Values
#### Method Signature
```java
    void saveValues(Map<String, Object> values, long timestamp);
```

### saveValues
Save Latest Entity Values (Current Time)
#### Method Signature
```java
    void saveValues(Map<String, Object> values);
```

### saveHistoryRecord
Save Historical Entity Values
#### Method Signature
```java
    void saveHistoryRecord(Map<String, Object> recordValues, long timestamp);
```

### saveHistoryRecord
Save Historical Entity Values (Current Time)
#### Method Signature
```java
    void saveHistoryRecord(Map<String, Object> recordValues);
```

### findValueByKey
Find Latest Value by Entity Key
#### Method Signature
```java
    JsonNode findValueByKey(String key);
```

### findValuesByKeys
Find Latest Values by Entity Key List
#### Method Signature
```java
    Map<String, JsonNode> findValuesByKeys(List<String> keys);
```

### findValuesByKeys
Find Latest Values by Entity Key List
#### Method Signature
```java
    @NonNull <T extends ExchangePayload> T findValuesByKey(String key, Class<T> entitiesClazz);
```


