---
sidebar_position: 4
toc_min_heading_level: 2
toc_max_heading_level: 3
---

import { ProjectName } from '/src/consts';

# API Reference

## Overview
The {ProjectName} platform provides a series of general service interfaces for **integration developers**, supporting multiple business scenarios such as devices, templates, blueprints, credentials, MQTT, and more.

---

## DeviceServiceProvider Interface Documentation

`DeviceServiceProvider` provides common device operation methods.

### save <a id="device-service-provider-save"></a>
Save a device (including entities under the device)
```java
void save(Device device);
```

### deleteById
Delete a device by device ID
```java
void deleteById(Long id);
```

### findById
Find a device by device ID
```java
Device findById(Long id);
```

### findByKey
Find a device by device key
```java
Device findByKey(String deviceKey);
```

### findByKeys
Find devices by a list of device keys
```java
List<Device> findByKeys(List<String> deviceKey);
```

### findByIdentifier
Find a device by identifier and integration ID
```java
Device findByIdentifier(String identifier, String integrationId);
```

### findByIdentifiers
Find devices by a list of identifiers and integration ID
```java
List<Device> findByIdentifiers(List<String> identifier, String integrationId);
```

### findAll
Find all devices by integration ID
```java
List<Device> findAll(String integrationId);
```

### countByDeviceTemplateKey
Count devices by device template key
```java
long countByDeviceTemplateKey(String deviceTemplateKey);
```

### deleteByDeviceTemplateKey
Delete devices by device template key
```java
void deleteByDeviceTemplateKey(String deviceTemplateKey);
```

### clearTemplate
Clear template content under the specified device template key
```java
void clearTemplate(String deviceTemplateKey);
```

---

## DeviceStatusServiceProvider Interface Documentation

`DeviceStatusServiceProvider` provides device online/offline status management.

### register
Register integration to the device status manager
```java
void register(String integrationId, DeviceStatusConfig config);
```

### online
Set device status to "online"
```java
void online(Device device);
```

### offline
Set device status to "offline"
```java
void offline(Device device);
```

### status
Get the current status of a device
```java
DeviceStatus status(Device device);
```

---

## DeviceTemplateServiceProvider Interface Documentation

`DeviceTemplateServiceProvider` provides management operations for device templates.

### save
Save a device template
```java
void save(DeviceTemplate deviceTemplate);
```

### deleteById
Delete a device template by ID
```java
void deleteById(Long id);
```

### deleteByKey
Delete a device template by key
```java
void deleteByKey(String key);
```

### findById
Find a device template by ID
```java
DeviceTemplate findById(Long id);
```

### findByIds
Find device templates by a list of IDs
```java
List<DeviceTemplate> findByIds(List<Long> ids);
```

### findByKey
Find a device template by key
```java
DeviceTemplate findByKey(String deviceTemplateKey);
```

### findByKeys
Find device templates by a list of keys
```java
List<DeviceTemplate> findByKeys(List<String> deviceTemplateKey);
```

### findByIdentifier
Find a device template by identifier and integration ID
```java
DeviceTemplate findByIdentifier(String identifier, String integrationId);
```

### findByIdentifiers
Find device templates by a list of identifiers and integration ID
```java
List<DeviceTemplate> findByIdentifiers(List<String> identifier, String integrationId);
```

### findAll
Find all device templates by integration ID
```java
List<DeviceTemplate> findAll(String integrationId);
```

### findAllCustom
Find all custom device templates by integration ID
```java
List<DeviceTemplate> findAllCustom(String integrationId);
```

### batchDelete
Batch delete device templates
```java
void batchDelete(List<Long> ids);
```

### search
Paginated search for device templates
```java
Page<DeviceTemplateResponseData> search(SearchDeviceTemplateRequest searchDeviceTemplateRequest);
```

---

## DeviceTemplateParserProvider Interface Documentation

`DeviceTemplateParserProvider` provides parsing and validation for device template content.

### validate
Validate the format of template content
```java
boolean validate(String deviceTemplateContent);
```

### defaultContent
Get the default template content
```java
String defaultContent();
```

### parse
Parse template content
```java
DeviceTemplateModel parse(String deviceTemplateContent);
```

### input
Process input data using the template (multiple overloads)
```java
DeviceTemplateInputResult input(String integration, Long deviceTemplateId, Object data);
DeviceTemplateInputResult input(String integration, Long deviceTemplateId, String deviceIdentifier, String deviceName, Object data);
DeviceTemplateInputResult input(String integration, Long deviceTemplateId, Object data, Map<String, Object> codecArgContext);
DeviceTemplateInputResult input(String integration, Long deviceTemplateId, String deviceIdentifier, String deviceName, Object data, Map<String, Object> codecArgContext);
DeviceTemplateInputResult input(String deviceKey, Object data, Map<String, Object> codecArgContext);
```

### output
Process output data using the template (multiple overloads)
```java
DeviceTemplateOutputResult output(String deviceKey, ExchangePayload payload);
DeviceTemplateOutputResult output(String deviceKey, ExchangePayload payload, Map<String, Object> codecArgContext);
```

### createDevice
Create a device using the template (multiple overloads)
```java
Device createDevice(String integration, Long deviceTemplateId, String deviceId, String deviceName);
Device createDevice(String integration, String vendor, String model, String deviceIdentifier, String deviceName, BiFunction<Device, Map<String, Object>, Boolean> beforeSaveDevice, BlueprintCreationStrategy strategy);
Device createDevice(String integration, String vendor, String model, String deviceIdentifier, String deviceName, BiFunction<Device, Map<String, Object>, Boolean> beforeSaveDevice);
```

### getLatestDeviceTemplate
Get the latest device template
```java
DeviceTemplate getLatestDeviceTemplate(String vendor, String model);
```

---

## DeviceBlueprintMappingServiceProvider Interface Documentation

`DeviceBlueprintMappingServiceProvider` provides mapping between device IDs and blueprint IDs.

### getBlueprintIdByDeviceIds
Get blueprint ID mappings by a list of device IDs
```java
List<DeviceBlueprintMappingDTO> getBlueprintIdByDeviceIds(List<Long> deviceIdList);
```

---

## BlueprintLibraryResourceResolverProvider Interface Documentation

`BlueprintLibraryResourceResolverProvider` provides access to blueprint library resources.

### getDeviceVendors
Get all device vendors
```java
List<BlueprintDeviceVendor> getDeviceVendors();
```

### getDeviceVendor
Get vendor information by vendor ID
```java
BlueprintDeviceVendor getDeviceVendor(String vendorId);
```

### getDeviceModels
Get all device models under the specified vendor
```java
List<BlueprintDeviceModel> getDeviceModels(String vendorId);
```

### getDeviceModel
Get device model information by vendor ID and model ID
```java
BlueprintDeviceModel getDeviceModel(String vendorId, String modelId);
```

### getDeviceTemplateContent
Get device template content by vendor ID and model ID
```java
String getDeviceTemplateContent(String vendorId, String modelId);
```

---

## BlueprintLibrarySyncerProvider Interface Documentation

`BlueprintLibrarySyncerProvider` provides blueprint library change listening capability.

### addListener
Add a blueprint library change listener
```java
void addListener(Consumer<BlueprintLibrary> listener);
```

---

## CredentialsServiceProvider Interface Documentation

`CredentialsServiceProvider` provides credential management capabilities.

### addCredentials
Add credentials
```java
void addCredentials(Credentials credentials);
```

### batchDeleteCredentials
Batch delete credentials
```java
void batchDeleteCredentials(List<Long> ids);
```

### getCredentials
Get credentials by credential type or ID
```java
Optional<Credentials> getCredentials(String credentialType);
Optional<Credentials> getCredentials(CredentialsType credentialType);
Optional<Credentials> getCredentials(Long id);
Optional<Credentials> getCredentials(String credentialType, String accessKey);
Optional<Credentials> getCredentials(CredentialsType credentialType, String accessKey);
```

### getOrCreateCredentials
Get or create credentials (multiple overloads)
```java
Credentials getOrCreateCredentials(String credentialType);
Credentials getOrCreateCredentials(String credentialType, String password);
Credentials getOrCreateCredentials(CredentialsType credentialType);
Credentials getOrCreateCredentials(CredentialsType credentialType, String password);
Credentials getOrCreateCredentials(String credentialType, String username, String password);
Credentials getOrCreateCredentials(CredentialsType credentialType, String username, String password);
```

---

## EntityServiceProvider Interface Documentation

`EntityServiceProvider` provides entity management capabilities.

### findByTargetId <a id="entity-target"></a>
Get a list of entities by target type and target ID  
:::info  
**Target types** include **Device** (`AttachTargetType.DEVICE`) and **Integration** (`AttachTargetType.INTEGRATION`)  
:::
```java
@NonNull List<Entity> findByTargetId(AttachTargetType targetType, String targetId);
```

### findByTargetIds
Get a list of entities by target type and a list of target IDs
```java
@NonNull List<Entity> findByTargetIds(AttachTargetType targetType, List<String> targetIds);
```

### save <a id="entity-service-provider-save"></a>
Save an entity
```java
void save(Entity entity);
```

### batchSave
Batch save entities
```java
void batchSave(List<Entity> entityList);
```

### deleteByTargetId
Delete entities by target ID
```java
void deleteByTargetId(String targetId);
```

### deleteByKey
Delete an entity by entity key
```java
void deleteByKey(String entityKey);
```

### findByKey
Find an entity by entity key
```java
Entity findByKey(String entityKey);
```

### findByKeys
Find entities by a collection of entity keys
```java
Map<String, Entity> findByKeys(Collection<String> entityKeys);
```

### findById
Find an entity by entity ID
```java
Entity findById(Long entityId);
```

### findByIds
Find entities by a list of entity IDs
```java
List<Entity> findByIds(List<Long> ids);
```

### findTagsByIds
Find tags by a list of entity IDs
```java
Map<Long, List<EntityTag>> findTagsByIds(List<Long> entityIds);
```

---

## EntityTemplateServiceProvider Interface Documentation

`EntityTemplateServiceProvider` provides entity template management capabilities.

### findAll
Get all entity templates
```java
List<EntityTemplate> findAll();
```

### findByKeys
Get entity templates by a list of keys
```java
List<EntityTemplate> findByKeys(List<String> keys);
```

### findByKey
Get an entity template by key
```java
EntityTemplate findByKey(String key);
```

---

## EntityValueServiceProvider Interface Documentation

`EntityValueServiceProvider` provides reading/writing of entity values and event publishing.

### saveValuesAndPublishSync
Save entity values and synchronously publish events  
- Default event type:
```java
EventResponse saveValuesAndPublishSync(ExchangePayload exchangePayload);
```
- Specified event type:
```java
EventResponse saveValuesAndPublishSync(ExchangePayload exchangePayload, String eventType);
```

### saveValuesAndPublishAsync
Save entity values and asynchronously publish events  
- Default event type:
```java
void saveValuesAndPublishAsync(ExchangePayload exchangePayload);
```
- Specified event type:
```java
void saveValuesAndPublishAsync(ExchangePayload exchangePayload, String eventType);
```

### saveLatestValues
Save the latest entity values
```java
Map<String, Long> saveLatestValues(ExchangePayload exchangePayload);
```

### saveValues
Save entity values (with specified timestamp)
```java
Map<String, Pair<Long, Long>> saveValues(ExchangePayload exchangePayload, long timestamp);
```

### saveValues
Save entity values (current time)
```java
Map<String, Pair<Long, Long>> saveValues(ExchangePayload exchangePayload);
```

### saveHistoryRecord
Save entity historical values (with specified timestamp)
```java
Map<String, Long> saveHistoryRecord(Map<String, Object> recordValues, long timestamp);
```

### saveHistoryRecord
Save entity historical values (current time)
```java
Map<String, Long> saveHistoryRecord(Map<String, Object> recordValues);
```

### mergeHistoryRecord
Merge entity historical values (with specified timestamp)
```java
Map<String, Long> mergeHistoryRecord(Map<String, Object> recordValues, long timestamp);
```

### existHistoryRecord
Check if entity historical records exist
- Multiple key check:
```java
Set<String> existHistoryRecord(Set<String> keys, long timestamp);
```
- Single key check:
```java
boolean existHistoryRecord(String key, long timestamp);
```

### findValueByKey
Find the current value by entity key
```java
Object findValueByKey(String key);
```

### findValuesByKeys
Find current values by a list of entity keys
```java
Map<String, Object> findValuesByKeys(List<String> keys);
```

### findValuesByKey
Find current values of child entities under the parent entity by entity key and type
```java
@NonNull <T extends ExchangePayload> T findValuesByKey(String key, Class<T> entitiesClazz);
```

---

## IntegrationServiceProvider Abstract Class Documentation

`IntegrationServiceProvider` abstract class defines integration-related operations.

### save
Save an integration (including entities under the integration)
```java
void save(Integration integrationConfig);
```

### batchSave
Batch save integrations
```java
void batchSave(Collection<Integration> integrationConfig);
```

### getIntegration
Get an integration instance by integration ID (including disabled ones)
```java
Integration getIntegration(String integrationId);
```

### getActiveIntegration
Get the enabled integration instance by integration ID
```java
Integration getActiveIntegration(String integrationId);
```

### findIntegrations
Find all integrations
```java
Collection<Integration> findIntegrations();
```

### findVisibleIntegrations
Find all visible integrations
```java
List<Integration> findVisibleIntegrations();
```

### findActiveIntegrations
Find all enabled integrations
```java
List<Integration> findActiveIntegrations();
```

### findIntegrations (with condition)
Find integrations by condition
```java
List<Integration> findIntegrations(Predicate<Integration> predicate);
```
**Example:** Find all integrations that can add devices
```java
List<Integration> integrations = integrationServiceProvider.findIntegrations(f -> StringUtils.hasText(f.getEntityKeyAddDevice()));
```

---

## MqttPubSubServiceProvider Interface Documentation

`MqttPubSubServiceProvider` provides MQTT message publishing and subscription capabilities.

### publish
Publish message to specified topic
- Specify username
```java
void publish(String username, String topicSubPath, byte[] payload, MqttQos qos, boolean retained);
```
- Specify tenant
```java
void publish(String topicSubPath, byte[] payload, MqttQos qos, boolean retained);
```

### subscribe
Subscribe to messages of specified topic
- Specify username and shared mode
```java
void subscribe(String username, String topicSubPath, MqttMessageListener onMessage, boolean shared);
```
- Specify tenant and shared mode
```java
void subscribe(String topicSubPath, MqttMessageListener onMessage, boolean shared);
```
- Specify username
```java
void subscribe(String username, String topicSubPath, MqttMessageListener onMessage);
```
- Specify tenant
```java
void subscribe(String topicSubPath, MqttMessageListener onMessage);
```

### unsubscribe
Unsubscribe
- Specify listener
```java
void unsubscribe(MqttPubSubServiceListener onMessage);
```
- Specify username and topic
```java
void unsubscribe(String username, String topicSubPath);
```
- Specify topic
```java
void unsubscribe(String topicSubPath);
```

### onConnect
MQTT connection event listener
```java
void onConnect(MqttConnectEventListener listener);
```

### onDisconnect
MQTT disconnection event listener
```java
void onDisconnect(MqttDisconnectEventListener listener);
```

### getFullTopicName
Get the full topic name
- Specify username
```java
String getFullTopicName(String username, String topicSubPath);
```
- Specify tenant
```java
String getFullTopicName(String topicSubPath);
```

### getMqttBrokerInfo
Get MQTT Broker information
```java
MqttBrokerInfo getMqttBrokerInfo();
```

---

## ResourceServiceProvider Interface Documentation

`ResourceServiceProvider` interface provides capabilities for interacting with the Resource Center.

### linkByUrl
Links a resource URL to a specified resource reference (reference ID and reference type).
```java
void linkByUrl(String url, ResourceRefDTO resourceRefDTO);
```

### unlinkRef
Unlinks the resource associated with the specified resource reference (reference ID and reference type).
```java
void unlinkRef(ResourceRefDTO resourceRefDTO);
```

### putTempResource
Uploads a temporary resource to the Resource Center and returns its URL. (To persist the resource, it must be linked to a resource reference by calling the `linkByUrl` method.)
```java
String putTempResource(String fileName, String contentType, byte[] data);
```

---

## DelayedQueueServiceProvider Interface Documentation

`DelayedQueueServiceProvider` provides management of delayed queues.

### getDelayedQueue
Retrieves a delayed queue by name. `T` represents the payload type of the delayed tasks.
```java
<T> DelayedQueue<T> getDelayedQueue(String queueName);
```