---
sidebar_position: 4
toc_min_heading_level: 2
toc_max_heading_level: 3
---

import { ProjectName } from '/src/consts';

# 服务开放

## 概述
{ProjectName} 平台为**集成开发者**提供了一系列通用的服务接口，支持设备、模板、蓝图、凭据、MQTT等多种业务场景。

---

## DeviceServiceProvider 接口文档

`DeviceServiceProvider` 提供常用的设备操作方法。

### save <a id="device-service-provider-save"></a>
保存设备（包括设备下的实体）
```java
void save(Device device);
```

### deleteById
根据设备ID删除设备
```java
void deleteById(Long id);
```

### findById
根据设备ID查找设备
```java
Device findById(Long id);
```

### findByKey
根据设备Key查找设备
```java
Device findByKey(String deviceKey);
```

### findByKeys
根据设备Key集合查找设备
```java
List<Device> findByKeys(List<String> deviceKey);
```

### findByIdentifier
根据设备标识和集成ID查找设备
```java
Device findByIdentifier(String identifier, String integrationId);
```

### findByIdentifiers
根据设备标识集合和集成ID查找设备
```java
List<Device> findByIdentifiers(List<String> identifier, String integrationId);
```

### findAll
根据集成ID查找所有设备
```java
List<Device> findAll(String integrationId);
```

### countByDeviceTemplateKey
根据设备模板Key统计设备数量
```java
long countByDeviceTemplateKey(String deviceTemplateKey);
```

### deleteByDeviceTemplateKey
根据设备模板Key删除设备
```java
void deleteByDeviceTemplateKey(String deviceTemplateKey);
```

### clearTemplate
清空指定设备模板Key下的模板内容
```java
void clearTemplate(String deviceTemplateKey);
```

---

## DeviceStatusServiceProvider 接口文档

`DeviceStatusServiceProvider` 提供设备在线/离线状态管理。

### register
注册集成到设备状态管理器
```java
void register(String integrationId, DeviceStatusConfig config);
```

### online
将设备状态更新为“在线”
```java
void online(Device device);
```

### offline
将设备状态更新为“离线”
```java
void offline(Device device);
```

### status
获取设备当前状态
```java
DeviceStatus status(Device device);
```

---

## DeviceTemplateServiceProvider 接口文档

`DeviceTemplateServiceProvider` 提供设备模板的管理操作。

### save
保存设备模板
```java
void save(DeviceTemplate deviceTemplate);
```

### deleteById
根据ID删除设备模板
```java
void deleteById(Long id);
```

### deleteByKey
根据Key删除设备模板
```java
void deleteByKey(String key);
```

### findById
根据ID查找设备模板
```java
DeviceTemplate findById(Long id);
```

### findByIds
根据ID集合查找设备模板
```java
List<DeviceTemplate> findByIds(List<Long> ids);
```

### findByKey
根据Key查找设备模板
```java
DeviceTemplate findByKey(String deviceTemplateKey);
```

### findByKeys
根据Key集合查找设备模板
```java
List<DeviceTemplate> findByKeys(List<String> deviceTemplateKey);
```

### findByIdentifier
根据标识和集成ID查找设备模板
```java
DeviceTemplate findByIdentifier(String identifier, String integrationId);
```

### findByIdentifiers
根据标识集合和集成ID查找设备模板
```java
List<DeviceTemplate> findByIdentifiers(List<String> identifier, String integrationId);
```

### findAll
根据集成ID查找所有设备模板
```java
List<DeviceTemplate> findAll(String integrationId);
```

### findAllCustom
根据集成ID查找所有自定义设备模板
```java
List<DeviceTemplate> findAllCustom(String integrationId);
```

### batchDelete
批量删除设备模板
```java
void batchDelete(List<Long> ids);
```

### search
分页搜索设备模板
```java
Page<DeviceTemplateResponseData> search(SearchDeviceTemplateRequest searchDeviceTemplateRequest);
```

---

## DeviceTemplateParserProvider 接口文档

`DeviceTemplateParserProvider` 提供设备模板内容解析与校验。

### validate
校验模板内容格式
```java
boolean validate(String deviceTemplateContent);
```

### defaultContent
获取默认模板内容
```java
String defaultContent();
```

### parse
解析模板内容
```java
DeviceTemplateModel parse(String deviceTemplateContent);
```

### input
使用模板处理输入数据（多种重载方式）
```java
DeviceTemplateInputResult input(String integration, Long deviceTemplateId, Object data);
DeviceTemplateInputResult input(String integration, Long deviceTemplateId, String deviceIdentifier, String deviceName, Object data);
DeviceTemplateInputResult input(String integration, Long deviceTemplateId, Object data, Map<String, Object> codecArgContext);
DeviceTemplateInputResult input(String integration, Long deviceTemplateId, String deviceIdentifier, String deviceName, Object data, Map<String, Object> codecArgContext);
DeviceTemplateInputResult input(String deviceKey, Object data, Map<String, Object> codecArgContext);
```

### output
使用模板处理输出数据（多种重载方式）
```java
DeviceTemplateOutputResult output(String deviceKey, ExchangePayload payload);
DeviceTemplateOutputResult output(String deviceKey, ExchangePayload payload, Map<String, Object> codecArgContext);
```

### createDevice
通过模板创建设备（多种重载方式）
```java
Device createDevice(String integration, Long deviceTemplateId, String deviceId, String deviceName);
Device createDevice(String integration, String vendor, String model, String deviceIdentifier, String deviceName, BiFunction<Device, Map<String, Object>, Boolean> beforeSaveDevice, BlueprintCreationStrategy strategy);
Device createDevice(String integration, String vendor, String model, String deviceIdentifier, String deviceName, BiFunction<Device, Map<String, Object>, Boolean> beforeSaveDevice);
```

### getLatestDeviceTemplate
获取最新的设备模板
```java
DeviceTemplate getLatestDeviceTemplate(String vendor, String model);
```

---

## DeviceBlueprintMappingServiceProvider 接口文档

`DeviceBlueprintMappingServiceProvider` 提供设备ID与蓝图ID的映射。

### getBlueprintIdByDeviceIds
根据设备ID列表获取蓝图ID映射
```java
List<DeviceBlueprintMappingDTO> getBlueprintIdByDeviceIds(List<Long> deviceIdList);
```

---

## BlueprintLibraryResourceResolverProvider 接口文档

`BlueprintLibraryResourceResolverProvider` 提供蓝图库资源的访问。

### getDeviceVendors
获取所有设备厂商
```java
List<BlueprintDeviceVendor> getDeviceVendors();
```

### getDeviceVendor
根据厂商ID获取厂商信息
```java
BlueprintDeviceVendor getDeviceVendor(String vendorId);
```

### getDeviceModels
获取指定厂商下的所有设备型号
```java
List<BlueprintDeviceModel> getDeviceModels(String vendorId);
```

### getDeviceModel
根据厂商ID和型号ID获取设备型号信息
```java
BlueprintDeviceModel getDeviceModel(String vendorId, String modelId);
```

### getDeviceTemplateContent
根据厂商ID和型号ID获取设备模板内容
```java
String getDeviceTemplateContent(String vendorId, String modelId);
```

---

## BlueprintLibrarySyncerProvider 接口文档

`BlueprintLibrarySyncerProvider` 提供蓝图库监听能力。

### addListener
添加蓝图库变更监听器
```java
void addListener(Consumer<BlueprintLibrary> listener);
```

---

## CredentialsServiceProvider 接口文档

`CredentialsServiceProvider` 提供凭据管理能力。

### addCredentials
添加凭据
```java
void addCredentials(Credentials credentials);
```

### batchDeleteCredentials
批量删除凭据
```java
void batchDeleteCredentials(List<Long> ids);
```

### getCredentials
根据凭据类型或ID获取凭据
```java
Optional<Credentials> getCredentials(String credentialType);
Optional<Credentials> getCredentials(CredentialsType credentialType);
Optional<Credentials> getCredentials(Long id);
Optional<Credentials> getCredentials(String credentialType, String accessKey);
Optional<Credentials> getCredentials(CredentialsType credentialType, String accessKey);
```

### getOrCreateCredentials
获取或创建凭据（多种重载方式）
```java
Credentials getOrCreateCredentials(String credentialType);
Credentials getOrCreateCredentials(String credentialType, String password);
Credentials getOrCreateCredentials(CredentialsType credentialType);
Credentials getOrCreateCredentials(CredentialsType credentialType, String password);
Credentials getOrCreateCredentials(String credentialType, String username, String password);
Credentials getOrCreateCredentials(CredentialsType credentialType, String username, String password);
```

---

## EntityServiceProvider 接口文档

`EntityServiceProvider` 提供实体管理能力。

### findByTargetId <a id="entity-target"></a>
根据目标类型和目标ID获取实体列表  
:::info  
**目标类型**包括**设备**`AttachTargetType.DEVICE` 和**集成**`AttachTargetType.INTEGRATION`  
:::
```java
@NonNull List<Entity> findByTargetId(AttachTargetType targetType, String targetId);
```

### findByTargetIds
根据目标类型和目标ID集合获取实体列表
```java
@NonNull List<Entity> findByTargetIds(AttachTargetType targetType, List<String> targetIds);
```

### save <a id="entity-service-provider-save"></a>
保存实体
```java
void save(Entity entity);
```

### batchSave
批量保存实体
```java
void batchSave(List<Entity> entityList);
```

### deleteByTargetId
根据目标ID删除实体
```java
void deleteByTargetId(String targetId);
```

### deleteByKey
根据实体Key删除实体
```java
void deleteByKey(String entityKey);
```

### findByKey
根据实体Key查找实体
```java
Entity findByKey(String entityKey);
```

### findByKeys
根据实体Key集合查找实体
```java
Map<String, Entity> findByKeys(Collection<String> entityKeys);
```

### findById
根据实体ID查找实体
```java
Entity findById(Long entityId);
```

### findByIds
根据实体ID集合查找实体
```java
List<Entity> findByIds(List<Long> ids);
```

### findTagsByIds
根据实体ID集合查找标签
```java
Map<Long, List<EntityTag>> findTagsByIds(List<Long> entityIds);
```

---

## EntityTemplateServiceProvider 接口文档

`EntityTemplateServiceProvider` 提供实体模板管理能力。

### findAll
获取所有实体模板
```java
List<EntityTemplate> findAll();
```

### findByKeys
根据Key集合获取实体模板
```java
List<EntityTemplate> findByKeys(List<String> keys);
```

### findByKey
根据Key获取实体模板
```java
EntityTemplate findByKey(String key);
```

---

## EntityValueServiceProvider 接口文档

`EntityValueServiceProvider` 提供实体值的读写与事件发布。

### saveValuesAndPublishSync
保存实体值并同步发布事件  
- 默认事件类型：
```java
EventResponse saveValuesAndPublishSync(ExchangePayload exchangePayload);
```
- 指定事件类型：
```java
EventResponse saveValuesAndPublishSync(ExchangePayload exchangePayload, String eventType);
```

### saveValuesAndPublishAsync
保存实体值并异步发布事件  
- 默认事件类型：
```java
void saveValuesAndPublishAsync(ExchangePayload exchangePayload);
```
- 指定事件类型：
```java
void saveValuesAndPublishAsync(ExchangePayload exchangePayload, String eventType);
```

### saveLatestValues
保存实体最新值
```java
void saveLatestValues(ExchangePayload exchangePayload);
```

### saveValues
保存实体值（指定时间戳）
```java
void saveValues(ExchangePayload exchangePayload, long timestamp);
```

### saveValues
保存实体值（当前时间）
```java
void saveValues(ExchangePayload exchangePayload);
```

### saveHistoryRecord
保存实体历史值（指定时间戳）
```java
void saveHistoryRecord(Map<String, Object> recordValues, long timestamp);
```

### saveHistoryRecord
保存实体历史值（当前时间）
```java
void saveHistoryRecord(Map<String, Object> recordValues);
```

### mergeHistoryRecord
合并实体历史值（指定时间戳）
```java
void mergeHistoryRecord(Map<String, Object> recordValues, long timestamp);
```

### existHistoryRecord
检查实体历史记录是否存在
- 多Key校验：
```java
Set<String> existHistoryRecord(Set<String> keys, long timestamp);
```
- 单Key校验：
```java
boolean existHistoryRecord(String key, long timestamp);
```

### findValueByKey
根据实体Key查找当前值
```java
Object findValueByKey(String key);
```

### findValuesByKeys
根据实体Key集合查找当前值
```java
Map<String, Object> findValuesByKeys(List<String> keys);
```

### findValuesByKey
根据实体Key及类型查找父实体下子实体的当前值
```java
@NonNull <T extends ExchangePayload> T findValuesByKey(String key, Class<T> entitiesClazz);
```

---

## IntegrationServiceProvider 抽象类文档

`IntegrationServiceProvider` 抽象类定义集成相关操作。

### save
保存集成（包括集成下的实体）
```java
void save(Integration integrationConfig);
```

### batchSave
批量保存集成
```java
void batchSave(Collection<Integration> integrationConfig);
```

### getIntegration
根据集成ID获取集成实例（包含未启用）
```java
Integration getIntegration(String integrationId);
```

### getActiveIntegration
根据集成ID获取启用的集成实例
```java
Integration getActiveIntegration(String integrationId);
```

### findIntegrations
查找所有集成列表
```java
Collection<Integration> findIntegrations();
```

### findVisibleIntegrations
查找所有可见的集成列表
```java
List<Integration> findVisibleIntegrations();
```

### findActiveIntegrations
查找所有启用的集成列表
```java
List<Integration> findActiveIntegrations();
```

### findIntegrations（带条件）
根据条件查找集成列表
```java
List<Integration> findIntegrations(Predicate<Integration> predicate);
```
**示例：** 查找所有可添加设备的集成
```java
List<Integration> integrations = integrationServiceProvider.findIntegrations(f -> StringUtils.hasText(f.getEntityKeyAddDevice()));
```

---

## MqttPubSubServiceProvider 接口文档

`MqttPubSubServiceProvider` 提供 MQTT 消息发布与订阅能力。

### publish
发布消息到指定Topic
- 指定用户名
```java
void publish(String username, String topicSubPath, byte[] payload, MqttQos qos, boolean retained);
```
- 指定租户
```java
void publish(String topicSubPath, byte[] payload, MqttQos qos, boolean retained);
```

### subscribe
订阅指定Topic消息
- 指定用户名和共享模式
```java
void subscribe(String username, String topicSubPath, MqttMessageListener onMessage, boolean shared);
```
- 指定租户和共享模式
```java
void subscribe(String topicSubPath, MqttMessageListener onMessage, boolean shared);
```
- 指定用户名
```java
void subscribe(String username, String topicSubPath, MqttMessageListener onMessage);
```
- 指定租户
```java
void subscribe(String topicSubPath, MqttMessageListener onMessage);
```

### unsubscribe
取消订阅
- 指定监听器
```java
void unsubscribe(MqttPubSubServiceListener onMessage);
```
- 指定用户名和Topic
```java
void unsubscribe(String username, String topicSubPath);
```
- 指定Topic
```java
void unsubscribe(String topicSubPath);
```

### onConnect
MQTT连接事件监听
```java
void onConnect(MqttConnectEventListener listener);
```

### onDisconnect
MQTT断开事件监听
```java
void onDisconnect(MqttDisconnectEventListener listener);
```

### getFullTopicName
获取完整Topic名称
- 指定用户名
```java
String getFullTopicName(String username, String topicSubPath);
```
- 指定租户
```java
String getFullTopicName(String topicSubPath);
```

### getMqttBrokerInfo
获取MQTT Broker信息
```java
MqttBrokerInfo getMqttBrokerInfo();
```