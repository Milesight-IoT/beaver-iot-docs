---
sidebar_position: 4
toc_min_heading_level: 2
toc_max_heading_level: 3
---

import { ProjectName } from '/src/consts';

# 服务开放

## 概述
{ProjectName} 平台提供了一些通用的服务接口，用于集成开发者实现集成的业务逻辑。包括集成服务、设备服务、实体服务、实体值服务等。

## IntegrationServiceProvider 接口文档

`IntegrationServiceProvider` 接口定义了与集成配置相关的操作方法。

### save 
保存集成
#### 方法签名
```java
void save(Integration integrationConfig);
```

### batchSave 
批量保存集成
#### 方法签名
```java
void save(Integration integrationConfig);
```

### getIntegration 
根据集成id获取集成实例（包含未启用）
#### 方法签名
```java
Integration getIntegration(String integrationId);
```

### getActiveIntegration 
根据集成id获取启用的集成实例
#### 方法签名
```java
Integration getActiveIntegration(String integrationId);
```

### findIntegrations 
查找所有集成列表
#### 方法签名
```java
Collection<Integration> findIntegrations();
```
#### 代码示例

### findActiveIntegrations 
查找所有启用的集成列表
#### 方法签名
```java
List<Integration> findActiveIntegrations();
```
#### 代码示例

### findIntegrationsWithPredicate 
根据条件查找集成列表
#### 方法签名
```java
List<Integration> findIntegrations(Predicate<Integration> predicate);
```
#### 代码示例
```java
//查找所有集成中包含entityKeyAddDevice字段的集成
List<Integration> integrations = integrationServiceProvider.findIntegrations(f -> StringUtils.hasText(f.getEntityKeyAddDevice()));
```

## DeviceServiceProvider 接口文档
{ProjectName} 平台提供了`DeviceServiceProvider`接口，提供常用的设备操作方法。

### save 
保存设备
#### 方法签名
```java
void save(Device device);
```

### deleteById 
根据设备id删除设备
#### 方法签名
```java
void deleteById(Long id);
```

### findById 
根据设备ID查找设备
#### 方法签名
```java
Device findById(Long id);
```

### findByKey 
根据设备key查找设备
#### 方法签名
```java
Device findByKey(String deviceKey);
```

### findByIdentifier 
根据设备标识查找设备
#### 方法签名
```java
Device findByIdentifier(String identifier, String integrationId);
```

### findAll 
根据集成ID查找所有设备
#### 方法签名
```java
    List<Device> findAll(String integrationId);
```

### findByIdentifier 
根据设备标识、集成ID查找设备
#### 方法签名
```java
   Device findByIdentifier(String identifier, String integrationId);
```

### findAll 
根据集成ID查找设备列表
#### 方法签名
```java
   List<Device> findAll(String integrationId);
```

### countByIntegrationIds 
根据集成ID集合统计设备数量
#### 方法签名
```java
    Map<String, Long> countByIntegrationIds(List<String> integrationIds);
```

### countByIntegrationIds 
根据集成ID统计设备数量
#### 方法签名
```java
   Long countByIntegrationId(String integrationId);
```

## EntityServiceProvider 接口文档
{ProjectName} 平台提供了`EntityServiceProvider`接口，提供常用的entity操作方法。

### findByTargetId
根据目标类型和目标ID获取实体列表
#### 方法签名
```java
    List<Entity> findByTargetId(AttachTargetType targetType, String targetId);
```

### findByTargetIds
根据目标类型和目标ID集合获取实体列表
#### 方法签名
```java
    List<Entity> findByTargetIds(AttachTargetType targetType, List<String> targetIds);
```

### save
保存实体
#### 方法签名
```java
    void save(Entity entity);
```

### batchSave
 批量保存实体
#### 方法签名
```java
    void batchSave(List<Entity> entityList);
```

### deleteByTargetId
根据目标ID删除实体
#### 方法签名
```java
    void deleteByTargetId(String targetId);
```

### countAllEntitiesByIntegrationId
根据集成ID统计所有实体数量（包含集成下设备的实体）
#### 方法签名
```java
    long countAllEntitiesByIntegrationId(String integrationId);
```

### countIntegrationEntitiesByIntegrationId
根据集成ID集合统计集成实体数量（包含集成下设备的实体）
#### 方法签名
```java
    Map<String, Long> countAllEntitiesByIntegrationIds(List<String> integrationIds);
```

### countIntegrationEntitiesByIntegrationId
根据集成ID统计集成实体数量（不包含集成下设备的实体）
#### 方法签名
```java
    long countIntegrationEntitiesByIntegrationId(String integrationId);
```

### countIntegrationEntitiesByIntegrationIds
根据集成ID集合统计集成实体数量（不包含集成下设备的实体）
#### 方法签名
```java
    Map<String, Long> countIntegrationEntitiesByIntegrationIds(List<String> integrationIds);
```

### findByKey
根据实体key查找实体
#### 方法签名
```java
    Entity findByKey(String entityKey);
```

### findByKeys
根据实体key集合查找实体
#### 方法签名
```java
    Map<String, Entity> findByKeys(String... entityKeys);
```

## EntityValueServiceProvider 接口文档
{ProjectName} 平台提供了`EntityValueServiceProvider`接口，提供常用的entity最新值和历史值的操作方法。

### saveValues
保存实体最新值
#### 方法签名
```java
    void saveValues(Map<String, Object> values, long timestamp);
```

### saveValues
保存实体最新值（上报时间为当前时间）
#### 方法签名
```java
    void saveValues(Map<String, Object> values);
```

### saveHistoryRecord
保存实体历史值
#### 方法签名
```java
    void saveHistoryRecord(Map<String, Object> recordValues, long timestamp);
```

### saveHistoryRecord
保存实体历史值（上报时间为当前时间）
#### 方法签名
```java
    void saveHistoryRecord(Map<String, Object> recordValues);
```

### findValueByKey
根据实体key查找最新值
#### 方法签名
```java
    JsonNode findValueByKey(String key);
```

### findValuesByKeys
根据实体key集合查找最新值
#### 方法签名
```java
    Map<String, JsonNode> findValuesByKeys(List<String> keys);
```

### findValuesByKeys
根据实体key集合查找最新值
#### 方法签名
```java
    @NonNull <T extends ExchangePayload> T findValuesByKey(String key, Class<T> entitiesClazz);
```


