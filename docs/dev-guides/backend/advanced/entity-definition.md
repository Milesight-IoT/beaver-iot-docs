---
sidebar_position: 2
toc_min_heading_level: 2
toc_max_heading_level: 5
---

import { ProjectName } from '/src/consts';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';


# 设备/实体

## 概述
本章节主要介绍{ProjectName}平台关键对象: 设备、实体。以及如何基于注解、编程式、YAML构建它们。

## 关键对象

### Device

`Device`是设备的实例，里面有：
* **id**
* **所属集成的id**
* **名称**
* **额外数据**: 采用Map结构存储设备的额外信息，如设备的序列号或者生产日期等其它自定义信息
* **key**：设备key, key规则详见[关键编码概念介绍](../../key-dev-concept.md)章节
* **identifier**: 设备identifier, identifier规则详见[关键编码概念介绍](../../key-dev-concept.md)章节
* **包含的实体**

:::tip
设备在保存后，除了**名称**和**额外数据**都不建议再改变其它元数据。
:::

### Entity

`Entity`是实体的实例，对象内容是实体的元数据(不包含实体的值)，包括：
* **id**
* **设备key**: 如果是设备的实体，那么会含有设备的key，规则详见[关键编码概念介绍](../../key-dev-concept.md)章节
* **集成ID** 
* **实体名称**
* **访问权限**: 只对Property类型的实体有意义，只读/只写/读写
* **identifier**：实体identifier, identifier规则详见[关键编码概念介绍](../../key-dev-concept.md)章节
* **实体值类型**：包括：STRING, LONG, DOUBLE, BOOLEAN, BINARY, OBJECT
* **实体类型**: 包括：属性实体, 事件实体, 服务实体
* **实体属性**: 实体的属性，如单位, 精度, 最大值, 最小值, 最大长度, 最小长度, 枚举等
* **子实体**：实体的子实体，当前最多支持两层关系
* **key**: 实体key, key规则详见[关键编码概念介绍](../../key-dev-concept.md)章节

:::tip
实体在保存后，除了**名称**和**实体属性**都不建议再改变其它元数据。
:::

## 对象构建 <a id="build-with-annotation"></a>
本节将会介绍设备和实体的构建方法。

### 基于注解构建

#### 注解说明
##### 类注解
- `@IntegrationEntities`：标识当前类为集成实体类
- `@DeviceTemplateEntities`：标识当前类为设备实体模板类
    - `name`：设备模板名称
- `@DeviceEntities`：标识当前类为设备实体类
    - `identifier`：设备identifier
    - `name`：设备名称
    - `additional`：设备额外数据，通过@KeyValue注解声明
- `@Entities`：标识当前类为子实体类

##### 字段注解
- `@Entity`：标识当前属性为实体
    - `type`：实体类型`EntityType`，包括：属性实体, 事件实体, 服务实体
    - `name`：实体名称
    - `identifier`：实体identifier
    - `attributes`：`@Attribute`注解声明实体属性，包括如单位, 精度, 最大值, 最小值, 最大长度, 最小长度, 枚举格式等
    - `accessMod`：实体访问方式`AccessMod`，只对Property类型的实体有意义，包括：只读, 只写, 读写
    - `visible`：实体是否对用户可见`visible`。部分集成内部管理使用的实体，包括添加和删除设备的服务实体等，不需要对用户可见
- `@Attribute`：实体属性注解
  - `enumClass`：枚举类
  - `unit`：单位
  - `fractionDigits`：精度
  - `max`：最大值
  - `min`：最小值
  - `maxLength`：最大长度
  - `minLength`：最小长度
  - `format`：格式

#### 构建集成实体
 
- **定义集成实体**
```java
@Data
@EqualsAndHashCode(callSuper = true)
@IntegrationEntities
public class MyIntegrationEntities extends ExchangePayload {
    @Entity(type = EntityType.EVENT, name = "Event Entity Name", identifier = "event_entity")
    // highlight-next-line
    private String eventEntity;

    @Entity(type = EntityType.PROPERTY, name = "Property Entity Name", identifier = "property_entity", accessMod = AccessMod.R)
    // highlight-next-line
    private Boolean propertyEntity;
    
    @Entity(type = EntityType.SERVICE, identifier = "service_entity", attributes = @Attribute(enumClass = SampleEnum.class))
    // highlight-next-line
    private Long serviceEntity;

    public enum SampleEnum {
        SAMPLE_ENUM_1, SAMPLE_ENUM_2;
    }
}
```

:::tip
- 默认情况下，@Entity实体注解采用对象字段(驼峰转下划线)名作为实体name、identifier,开发者可通过name、identifier属性自定义实体名称、identifier
- 当订阅实体事件时，注解的实体对象同时可用于接收ExchangePayload事件数据，即可通过Getter方法获取到属性值，从而简化代码开发，可参见[事件订阅](eventbus.md)章节。
需注意当用于接收事件数据时，实体对象需继承ExchangePayload类，并且实体属性包含对应的Getter方法

:::
- **定义集成子实体**
```java
@Data
@EqualsAndHashCode(callSuper = true)
@IntegrationEntities
public class MyIntegrationEntities extends ExchangePayload {
    
    @Entity(type = EntityType.EVENT, name = "Parent Entity Name", identifier = "parent_entity")
    // highlight-next-line
    private ParentEntity parentEntity;

    @Data
    @EqualsAndHashCode(callSuper = true)
    @Entities
    public static class ParentEntity extends ExchangePayload {
        // Entity type EVENT inherits from ParentEntity
        @Entity(name = "Child 1 Name", identifier = "child_1")
        private Long childEntity1;

        @Entity(name = "Child 2 Name", identifier = "child_2")
        private Long childEntity2;
    }
}
```

:::tip
设备的子实体定义方式相同，需在子实体类上添加@Entities注解，即可完成子实体的构建，**子实体不能再包含子实体**。子实体默认继承父实体的属性,即子实体不需要设置type类型。父实体的数据类型为`OBJECT`。
:::


#### 定义设备实体模板
在实际场景中，集成下可能会有很多相同类型的设备，因此每个设备都含有相同种类的实体，如：一个集成可以对接多个环境传感器，每个传感器都有属于自己的温度和湿度实体。
```java
@Data
@EqualsAndHashCode(callSuper = true)
@DeviceTemplateEntities(name="Environment Device Template")
public class EnvironmentDeviceEntities extends ExchangePayload {
  @Entity(name = "temperature", identifier = "temperature", accessMod = AccessMod.RW, type = EntityType.PROPERTY)
  // highlight-next-line
  private Double temperature;

  @Entity
  // highlight-next-line
  private Long humidity;
}
```

#### 定义设备实体
```java
@Data
@EqualsAndHashCode(callSuper = true)
@DeviceEntities(name="Default Device Name", additional = {@KeyValue(key = "seriesNumber", value = "sample_number")}, identifier = "default_device")
public class MyDeviceEntities extends ExchangePayload {
  @Entity(name = "temperature", identifier = "temperature", accessMod = AccessMod.RW, type = EntityType.PROPERTY)
  // highlight-next-line
  private Double temperature;

  @Entity
  // highlight-next-line
  private Long humidity;
}
```

:::tip
当实体类为设备实体，{ProjectName}平台会初始化这个设备并添加到数据库中。
:::

### 编程式构建
{ProjectName} 平台提供了`DeviceBuilder`、`EntityBuilder`等Builder类，开发者可通过编程式构建设备、实体等对象。

#### 构建集成实体
- **不包含子实体**
```java
  // highlight-next-line
  Entity entityConfig = new EntityBuilder(integrationId)    //设置集成标识
          .identifier("webhookStatus")        //设置实体标识
          .property("webhookStatus", AccessMod.R) //设置作为属性实体
//          .service("accessKey")             //设置作为服务实体
//          .event("accessKey")               //设置作为事件实体
          .attributes(new AttributeBuilder().maxLength(300).enums(IntegrationStatus.class).build())      //设置实体属性,也可以使用attributes(Supplier<Map<String, Object>> supplier)方法进行构建
          .valueType(EntityValueType.STRING)    //设置实体值类型
          .build();
```
- **包含子实体**
<Tabs>
  <TabItem value="示例1" label="示例1" default>
```java
   // highlight-next-line
  //示例1： 通过EntityBuilder的children()方法构建子实体
  Entity entityConfig = new EntityBuilder(integrationId)
          .identifier("settings")
          .property("settings", AccessMod.RW)
          .valueType(EntityValueType.STRING)
          // highlight-next-line
          .children()           //设置子实体
              .valueType(EntityValueType.STRING).property("accessKey", AccessMod.RW).end()
          // highlight-next-line
          .children()
              .valueType(EntityValueType.STRING).property("secretKey", AccessMod.RW).end()
          .build();
```
  </TabItem>
  <TabItem value="示例2" label="示例2">

```java
  // highlight-next-line
  //示例2： 通过EntityBuilder的children(Supplier<List<Entity>> supplier)方法设置子实体
  // highlight-next-line
  Entity parentEntity = new EntityBuilder(integrationId)
        .identifier("settings")
        .property("settings", AccessMod.RW)
        .valueType(EntityValueType.STRING)
        // highlight-next-line
        .children(()->{
            Entity childEntity = new EntityBuilder()  //定义子实体
                    .identifier("accessKey")
                    .property("accessKey", AccessMod.RW)
                    .valueType(EntityValueType.STRING)
                    .build();
            return List.of(childEntity);
        })  //设置子实体，可以是List<Entity>或是单个实体
        .build();
```
  </TabItem>
  <TabItem value="示例3" label="示例3">

```java
  //示例3： 通过EntityBuilder的children(List<Entity> entities)方法设置子实体
  // highlight-next-line
  Entity childEntity = new EntityBuilder()  //定义子实体
        .identifier("accessKey")
        .property("accessKey", AccessMod.RW)
        .valueType(EntityValueType.STRING)
        .build();
  // highlight-next-line
  Entity parentEntity = new EntityBuilder(integrationId)
        .identifier("settings")
        .property("settings", AccessMod.RW)
        .valueType(EntityValueType.STRING)
        // highlight-next-line
        .children(childEntity)  //设置子实体，可以是List<Entity>或是单个实体
        .build();
```
  </TabItem>
</Tabs>

#### 构建设备及实体
- **构建设备**
```java
// highlight-next-line
Device device = new DeviceBuilder(integrationConfig.getId())
        .name("deviceDemo")
        .identifier("deviceDemoIdentifier")
        .additional(Map.of("sn", "demoSN"))
        .build();
```
- **构建设备实体**

<Tabs>
  <TabItem value="示例1" label="示例1(推荐)" default>

```java
Device device = new DeviceBuilder(integrationConfig.getId())
    .name("deviceDemo")
    .identifier("deviceDemoIdentifier")
    .entity(entity)
    .additional(Map.of("sn", "demoSN"))
    .entity(()->{
        return new EntityBuilder(integrationId)
              .identifier("temperature")
              .property("temperature", AccessMod.R)
              .valueType(EntityValueType.STRING) 
              .build();
      })
    .build();
```
  </TabItem>
  <TabItem value="示例2" label="示例2">

```java
//highlight-next-line 
Entity entity = new EntityBuilder(integrationId)
      .identifier("temperature")
      .property("temperature", AccessMod.R)
      .valueType(EntityValueType.STRING)
      .build();
// highlight-next-line
Device device = new DeviceBuilder(integrationConfig.getId())
        .name("deviceDemo")
        .identifier("deviceDemoIdentifier")
        .entity(entity)
        .additional(Map.of("sn", "demoSN"))
        .build();
```
  </TabItem>
  <TabItem value="示例3" label="示例3">

```java
// highlight-next-line
Device device = new DeviceBuilder(integrationConfig.getId())
    .name("deviceDemo")
    .identifier("deviceDemoIdentifier")
    .entity(entityConfig)
    .additional(Map.of("sn", "demoSN"))
    .build();
s    //highlight-next-line
Entity entity = new EntityBuilder(integrationId, device.getKey()) 
    .identifier("temperature")
    .property("temperature", AccessMod.R) 
    .valueType(EntityValueType.STRING)
    .build();
device.setEntities(Collections.singletonList(entity));
```
  </TabItem>
  <TabItem value="示例4" label="示例4(@DeviceTemplateEntities)">
```java
Device device = new DeviceBuilder(INTEGRATION_ID)
    .name(deviceName)
    .identifier("deviceDemoIdentifier")
    .additional(Map.of("sn", "demoSN"))
    .entities(()-> new AnnotatedTemplateEntityBuilder(INTEGRATION_ID, "deviceDemoIdentifier")
      .build(MyDeviceEntities.class))
    .build();
```
  </TabItem>
</Tabs>

#### 构建实体属性
 
  {ProjectName} 平台提供了AttributeBuilder类，开发者可通过编程式构建实体属性。当前平台支持的属性包括：单位、精度、最大值、最小值、最大长度、最小长度、枚举格式等，也可以支持开发者自定义属性，例如：

```java
  // highlight-next-line
    Map<String, Object> build = new AttributeBuilder()
        .unit("s") // 单位为秒
        .fractionDigits(0) // 小数位数为0，表示精确到秒
        .min(0.0) // 设定合理的最小值（根据实际需求调整）
        .maxLength(10) // 设定合理的最大长度（根据实际需求调整）
        .minLength(1) // 设定合理的最小长度（根据实际需求调整）
        .format("yyyy-MM-dd HH:mm:ss") // 时间格式精确到秒
        .build();
```

#### 添加/删除设备实体

添加或者删除设备在{ProjectName}中是集成的两个特殊的服务类型的实体。集成如果需要支持添加或者删除设备，需要定义这两个实体，并且处理他们的调用事件，最后将这两个实体显式地放到[集成定义](./integration-introduce.md)中。

##### 新增设备

新增设备事件，平台将会在ExchangePayload上下文中携带设备名称`device_name`,开发者可以从ExchangePayload的上下文中获取，或实现`AddDeviceAware`接口获取新增的设备信息。

<Tabs>
  <TabItem value="方式1" label="方式1(推荐)" default>

- 定义实体
```java
    @Data
    @EqualsAndHashCode(callSuper = true)
    @Entities
    public static class AddDevice extends ExchangePayload implements AddDeviceAware {
      @Entity
      private String ip;
    }
```
- 获取设备名
```java
  @EventSubscribe(payloadKeyExpression = "my-integration.integration.add_device.*")
  // highlight-next-line
  public void onAddDevice(Event<MyIntegrationEntities.AddDevice> event) {
      String deviceName = event.getPayload().getAddDeviceName();
      ...
  }
```
  </TabItem>
  <TabItem value="方式2" label="方式2">
- 获取设备名
```java
  @EventSubscribe(payloadKeyExpression = "my-integration.integration.add_device.*")
  // highlight-next-line
  public void onAddDevice(Event<MyIntegrationEntities.AddDevice> event) {
      String deviceName = event.getPayload().getContext().get(ExchangeContextKeys.DEVICE_NAME_ON_ADD);
      ...
  }
```
  </TabItem>
</Tabs>

##### 删除设备

删除设备事件，平台将会在ExchangePayload上下文中携带删除的设备`device`,开发者可以从ExchangePayload的上下文中获取，或实现`DeleteDeviceAware`接口获取新增的设备信息。


<Tabs>
<TabItem value="方式1" label="方式1(推荐)" default>

- 定义设备删除的实体
```java
  @Data
  @EqualsAndHashCode(callSuper = true)
  @Entities
  public static class DeleteDevice extends ExchangePayload implements DeleteDeviceAware {
    // 应当为空
  }
```

:::danger 注意
设备删除的实体不应该包含任何实体，即这个类应该为空。
:::
- 获取删除的设备
```java
  @EventSubscribe(payloadKeyExpression = "my-integration.integration.delete_device")
  // highlight-next-line
  public void onDeleteDevice(Event<MyIntegrationEntities.DeleteDevice> event) {
      Device device = event.getPayload().getDeletedDevice();
      ...
  }
```
  </TabItem>
  <TabItem value="方式2" label="方式2">
- 获取删除的设备
```java
  @EventSubscribe(payloadKeyExpression = "my-integration.integration.delete_device")
  // highlight-next-line
  public void onDeleteDevice(Event<MyIntegrationEntities.DeleteDevice> event) {
      Device device = event.getPayload().getContext().get(ExchangeContextKeys.DEVICE_ON_DELETE);
      ...
  }
```
  </TabItem>
</Tabs>


### 基于YAML构建
 为方便开发，{ProjectName}平台也提供了基于YAML的方式构建设备、实体等对象。开发者只需在集成的yaml文件中定义设备、实体等对象即可完成设备、实体的构建。平台将会在集成启动时加载对应的实体、集成并初始化。

```yaml
integration:
  my-integration: # integration identifier
    # ...
    initial-entities: # initial entities
      - identifier: 'connect' # entity identifier
        name: connect         # entity name
        value_type: string    # entity value type
        type: service         # entity type
        access_mod: RW        # entity access mode
        children:             # children entities
          - identifier: 'url'
            name: connectUrl    
            value_type: string
            type: service
    initial-devices: # initial devices
      - identifier: 'demoDevice' # device identifier
        name: demoDevice         # device name
        entities:             # device entities
          - identifier: 'temperature'
            name: temperature
            value_type: long
            access_mod: RW
            type: property
```

:::info
如果场景十分简单则可以选择基于YAML构建，一般情况下不推荐这种方式。逻辑比较复杂时，YAML定义的设备和实体难以和业务代码结合。
:::

## 选择合适的构建方式

有的构建方式会在{ProjectName}装载这个集成的时候**自动保存**到数据库中，有的构建方式则需要**手动保存**构建完成的设备和实体。

### 构建设备及其实体的方式

| 设备数量 | 设备类型* | 装载时自动保存 | 选择的构建方式 |
| --- | --- | --- | --- |
| 有限的 | 有限的 | 是 | @DeviceEntities / YAML |
| 动态的 | 有限的 | 否 | @DeviceTemplateEntities |
| 动态的 | 动态的 | 否 | 编程式构建 |
:::tip
*设备类型包括设备的基本定义（如设备名称、设备额外数据等），以及设备的实体定义。
:::

### 构建集成实体的方式

| 当前集成的实体 | 装载时自动保存 | 选择的构建方式 |
| --- | --- | --- |
| 有限的 | 是 |  @IntegrationEntities / YAML |
| 动态的 | 否 | 编程式构建 |

## 设备/实体保存


### 保存设备或者实体

#### 保存设备

* 方法见[文档](./service-provider.md#device-service-provider-save)
* 保存设备会保存**设备**本身的数据和属于这台设备的**实体**的数据

#### 保存实体

* 方法见[文档](./service-provider.md#entity-service-provider-save)
* 保存实体会保存**实体**本身的数据和其**子实体**的数据
* 保存实体并不会保存实体的值，只保存实体的元数据

### 保存/获取实体的值

#### 通过实体Wrapper保存

##### 普通实体类
* `@IntegrationEntities`定义的集成实体类
* `@DeviceEntities`定义的设备实体类
* 以上两种方式定义下，用`@Entities`定义的子实体类

可以通过`AnnotatedEntityWrapper`来更新相应实体的值

比如，我们定义了集成的实体`MyIntegrationEntities`如下所示
```java
@Data
@EqualsAndHashCode(callSuper = true)
@IntegrationEntities
public class MyIntegrationEntities extends ExchangePayload {
    @Entity
    private String entity1;

    @Entity
    private String entity2;
}
```
然后就可以创建相应的Wrapper
```java
AnnotatedEntityWrapper<MyIntegrationEntities> wrapper = new AnnotatedEntityWrapper<>();
```

如果要更新实体`entity1`的值为`sample`，可以使用`saveValue`方法
```java
wrapper.saveValue(MyIntegrationEntities::getEntity1, "sample").publishSync();
```

如果要更新实体`entity1`和`entity2`的值为`sample`，可以使用`saveValues`方法
```java
wrapper.saveValues(Map.of(
                MyIntegrationEntities::getEntity1, "sample",
                MyIntegrationEntities::getEntity2, "sample"
        )).publishSync();
```

:::info
`saveValue`和`saveValues`会返回`ExchangeEventPublisher`类。一般情况下，保存一个值都需要发布相应的**事件**，来通知其它订阅者（其它集成、{ProjectName}内部的方法等）实体值的改变。

`ExchangeEventPublisher.publishSync`和`ExchangeEventPublisher.publishAsync`对应事件发布的同步和异步两种方式，具体区别可以[参考文档](./eventbus.md#exchange-event-publish)。
:::

如果要获取`entity1`的值，可以使用`getValue`方法
```java
String value = (String) wrapper.getValue(MyIntegrationEntities::getEntity1);
```

如果要获取`entity1`和`entity2`的值，可以使用`getValues`方法
```java
Map<String, Object> values = wrapper.getValues(MyIntegrationEntities::getEntity1, MyIntegrationEntities::getEntity2);
```

##### 设备模板实体类
* `@DeviceTemplateEntities`定义的集成实体类

比如，我们定义了一个设备实体模板
```java
@Data
@EqualsAndHashCode(callSuper = true)
@DeviceTemplateEntities(name = "Template Device")
public class MyDeviceEntities extends ExchangePayload {
    @Entity
    private String entity1;
}
```

可以创建相应的Wrapper
```java
AnnotatedTemplateEntityWrapper<MyDeviceEntities> wrapper = new AnnotatedEntityWrapper<>(device.getIdentifier());
```

如果要更新设备实体`entity1`的值为`sample`，可以使用`saveValue`方法
```java
wrapper
        .saveValue(MyDeviceEntities::getEntity1, "sample")
        .publishSync();
```
和`AnnotatedEntityWrapper`相似：
* 同时更新多个值可以使用`saveValues`方法
* 获取单个或者多个值可以使用`getValue`和`getValues`方法

##### 实体类实例
如果要更新实体的实例`entity`的值为`sample`，做法是
```java
new EntityWrapper(entity)
        .saveValue("sample")
        .publishSync();
```

#### 通过实体key构建Exchange

另一种更加灵活的方式是直接根据实体的key来构建[ExchangePayload](./eventbus.md#build-exchange-payload)最后保存，`ExchangePayload`提供了`create`方法，可以从一个Map对象中直接创建实例。

构建更新单个实体的的payload
```java
ExchangePayload exchangePayload = ExchangePayload.create("<entityKey>", "<entityValue>");
```

构建更新多个实体的payload
```java
ExchangePayload exchangePayload = ExchangePayload.create(Map.of(
  "<entityKey1>", "<entityValue1>",
  "<entityKey2>", "<entityValue2>",
  "<entityKey3>", "<entityValue3>"
  // ...
));
```

最后保存
```java
entityValueServiceProvider.saveValuesAndPublishSync(exchangePayload)
```

#### 通过实体key获取值

获取单个实体的值
```java
entityValueServiceProvider.findValueByKey("<entityKey>")
```

获取多个实体的值
```java
entityValueServiceProvider.findValuesByKeys(List.of("<entityKey1>", "<entityKey2>"))
```

:::warning
`findValueByKey`和`findValuesByKeys`这两个方法只会获取当前实体的值，如果有子实体并不会获取子实体的值
:::

获取父实体的子实体的值
```java
entityValueServiceProvider.findValuesByKey("<parentEntityKey>", ParentEntity.class)
```