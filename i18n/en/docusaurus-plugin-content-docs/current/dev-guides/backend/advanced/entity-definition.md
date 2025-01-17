---
sidebar_position: 2
toc_min_heading_level: 2
toc_max_heading_level: 5
---

import { ProjectName } from '/src/consts';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';


# Devices/Entities

## Overview
This chapter primarily introduces the key objects of the {ProjectName} platform: Devices and Entities, and explains how to construct them using annotations, programming, or YAML.

## Key Objects

### Device

A `Device` is an instance of a device, which includes:
* **id**
* **integration id**
* **name**
* **additional data**: Stores extra information about the device in a Map structure, such as the device's serial number or production date, among other custom data.
* **key**: Device key, with key rules detailed in the [Key Coding Concept Introduction](../../key-dev-concept.md) chapter.
* **identifier**: Device identifier, with identifier rules detailed in the [Key Coding Concept Introduction](../../key-dev-concept.md) chapter.
* **contained entities**

:::tip
Once a device is saved, it is not recommended to change any metadata except for the **name** and **additional data**.
:::

### Entity

An `Entity` is an instance of an entity, containing the entity's metadata (excluding the entity's value), which includes:
* **id**
* **device key**: If it is an entity of a device, it will include the device's key, with rules detailed in the [Key Coding Concept Introduction](../../key-dev-concept.md) chapter.
* **integration ID**
* **entity name**
* **access permissions**: Relevant only for Property type entities, with options for read-only, write-only, or read-write access.
* **identifier**: Entity identifier, with identifier rules detailed in the [Key Coding Concept Introduction](../../key-dev-concept.md) chapter.
* **entity value type**: Includes: STRING, LONG, DOUBLE, BOOLEAN, BINARY, OBJECT
* **entity type**: Includes: Property entity, Event entity, Service entity
* **entity attributes**: Attributes of the entity, such as unit, precision, maximum value, minimum value, maximum length, minimum length, enumeration, etc.
* **sub-entities**: Sub-entities of the entity, currently supporting up to two layers of relationships.
* **key**: Entity key, with key rules detailed in the [Key Coding Concept Introduction](../../key-dev-concept.md) chapter.

:::tip
Once an entity is saved, it is not recommended to change any metadata except for the **name** and **entity attributes**.
:::

## Object Construction <a id="build-with-annotation"></a>
This section will introduce methods for constructing devices and entities.

### Construction Using Annotations

#### Annotation Description
##### Class Annotations
- `@IntegrationEntities`: Indicates that the current class is an integration entity class.
- `@DeviceTemplateEntities`: Indicates that the current class is a device entity template class.
    - `name`: Device template name
- `@DeviceEntities`: Indicates that the current class is a device entity class.
    - `identifier`: Device identifier
    - `name`: Device name
    - `additional`: Additional device data, declared through the @KeyValue annotation
- `@Entities`: Indicates that the current class is a sub-entity class.

##### Field Annotations
- `@Entity`: Indicates that the current attribute is an entity attribute.
    - `type`: Entity type `EntityType`, including: Property entity, Event entity, Service entity
    - `name`: Entity name
    - `identifier`: Entity identifier
    - `attributes`: Declares entity attributes through the `@Attribute` annotation, including unit, precision, maximum value, minimum value, maximum length, minimum length, enumeration format, etc.
    - `accessMod`: Entity access mode `AccessMod`, relevant only for Property type entities, including: read-only, write-only, read-write
- `@Attribute`: Entity attribute annotation
  - `enumClass`: Enumeration class
  - `unit`: Unit
  - `fractionDigits`: Precision
  - `max`: Maximum value
  - `min`: Minimum value
  - `maxLength`: Maximum length
  - `minLength`: Minimum length
  - `format`: Format

#### Constructing Integration Entities

- **Defining Integration Entities**
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
- By default, the @Entity annotation uses the object field name (converted from camelCase to snake_case) as the entity name and identifier. Developers can customize the entity name and identifier using the name and identifier attributes.
- When subscribing to entity events, the annotated entity object can also be used to receive ExchangePayload event data. This allows developers to access attribute values through Getter methods, thereby simplifying code development. Refer to the [Event Subscription](eventbus.md) chapter for more details. Note that when receiving event data, the entity object must extend the ExchangePayload class and include corresponding Getter methods for entity attributes.
:::

- **Defining Integration Sub-Entities**
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
The definition method for device sub-entities is the same as for integration sub-entities. Add the @Entities annotation to the sub-entity class to complete the construction. **Sub-entities cannot contain further sub-entities.** Sub-entities inherit the attributes of the parent entity by default, meaning that the type does not need to be set for sub-entities. The data type of the parent entity is `OBJECT`.
:::

#### Defining Device Entity Templates
In practical scenarios, an integration may include many devices of the same type, each containing the same kinds of entities. For example, an integration might interface with multiple environmental sensors, each having its own temperature and humidity entities.
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

#### Defining Device Entities
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
When the entity class is a device entity, the {ProjectName} platform will initialize this device and add it to the database.
:::
### Programmatic Construction

The {ProjectName} platform provides `DeviceBuilder` and `EntityBuilder` classes, allowing developers to programmatically construct devices, entities, and other objects.

#### Constructing Integration Entities

- **Without Sub-Entities**
```java
// highlight-next-line
Entity entityConfig = new EntityBuilder(integrationId)    // Set integration identifier
        .identifier("webhookStatus")                     // Set entity identifier
        .property("webhookStatus", AccessMod.R)          // as property entity
//      .service("accessKey")                            // as service entity
//      .event("accessKey")                              // as event entity
        .attributes(new AttributeBuilder().maxLength(300).enums(IntegrationStatus.class).build()) // Set entity attributes, or use attributes(Supplier<Map<String, Object>> supplier) method
        .valueType(EntityValueType.STRING)               // Set entity value type
        .build();
```

- **With Sub-Entities**
<Tabs>
  <TabItem value="Example 1" label="Example 1" default>
```java
// highlight-next-line
// Example 1: Construct sub-entities using EntityBuilder's children() method
Entity entityConfig = new EntityBuilder(integrationId)
        .identifier("settings")
        .property("settings", AccessMod.RW)
        .valueType(EntityValueType.STRING)
        // highlight-next-line
        .children()           // Set sub-entity
            .valueType(EntityValueType.STRING).property("accessKey", AccessMod.RW).end()
        // highlight-next-line
        .children()
            .valueType(EntityValueType.STRING).property("secretKey", AccessMod.RW).end()
        .build();
```
  </TabItem>
  <TabItem value="Example 2" label="Example 2">

```java
// highlight-next-line
// Example 2: Set sub-entities using EntityBuilder's children(Supplier<List<Entity>> supplier) method
// highlight-next-line
Entity parentEntity = new EntityBuilder(integrationId)
      .identifier("settings")
      .property("settings", AccessMod.RW)
      .valueType(EntityValueType.STRING)
      // highlight-next-line
      .children(() -> {
          Entity childEntity = new EntityBuilder()  // Define sub-entity
                  .identifier("accessKey")
                  .property("accessKey", AccessMod.RW)
                  .valueType(EntityValueType.STRING)
                  .build();
          return List.of(childEntity);
      })  // Set sub-entity, can be List<Entity> or a single entity
      .build();
```
  </TabItem>
  <TabItem value="Example 3" label="Example 3">

```java
// Example 3: Set sub-entities using EntityBuilder's children(List<Entity> entities) method
// highlight-next-line
Entity childEntity = new EntityBuilder()  // Define sub-entity
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
      .children(childEntity)  // Set sub-entity, can be List<Entity> or a single entity
      .build();
```
  </TabItem>
</Tabs>

#### Constructing Devices and Entities

- **Constructing a Device**
```java
// highlight-next-line
Device device = new DeviceBuilder(integrationConfig.getId())
      .name("deviceDemo")
      .identifier("deviceDemoIdentifier")
      .additional(Map.of("sn", "demoSN"))
      .build();
```

- **Constructing Device Entities**

<Tabs>
  <TabItem value="Example 1" label="Example 1 (Recommended)" default>

```java
Device device = new DeviceBuilder(integrationConfig.getId())
    .name("deviceDemo")
    .identifier("deviceDemoIdentifier")
    .entity(entity)
    .additional(Map.of("sn", "demoSN"))
    .entity(() -> {
        return new EntityBuilder(integrationId)
              .identifier("temperature")
              .property("temperature", AccessMod.R)
              .valueType(EntityValueType.STRING) 
              .build();
      })
    .build();
```
  </TabItem>
  <TabItem value="Example 2" label="Example 2">

```java
// highlight-next-line 
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
  <TabItem value="Example 3" label="Example 3">

```java
// highlight-next-line
Device device = new DeviceBuilder(integrationConfig.getId())
    .name("deviceDemo")
    .identifier("deviceDemoIdentifier")
    .entity(entityConfig)
    .additional(Map.of("sn", "demoSN"))
    .build();
// highlight-next-line
Entity entity = new EntityBuilder(integrationId, device.getKey()) 
    .identifier("temperature")
    .property("temperature", AccessMod.R) 
    .valueType(EntityValueType.STRING)
    .build();
device.setEntities(Collections.singletonList(entity));
```
  </TabItem>
  <TabItem value="Example 4" label="Example 4 (@DeviceTemplateEntities)">
```java
Device device = new DeviceBuilder(INTEGRATION_ID)
    .name(deviceName)
    .identifier("deviceDemoIdentifier")
    .additional(Map.of("sn", "demoSN"))
    .entities(() -> new AnnotatedTemplateEntityBuilder(INTEGRATION_ID, "deviceDemoIdentifier")
      .build(MyDeviceEntities.class))
    .build();
```
  </TabItem>
</Tabs>

#### Constructing Entity Attributes

The {ProjectName} platform provides the `AttributeBuilder` class, allowing developers to programmatically construct entity attributes. The platform currently supports attributes such as unit, precision, maximum value, minimum value, maximum length, minimum length, enumeration format, etc., and also allows developers to define custom attributes. For example:

```java
// highlight-next-line
Map<String, Object> attributes = new AttributeBuilder()
    .unit("s") // Unit in seconds
    .fractionDigits(0) // Precision to 0 decimal places, indicating seconds
    .min(0.0) // Set a reasonable minimum value (adjust as needed)
    .maxLength(10) // Set a reasonable maximum length (adjust as needed)
    .minLength(1) // Set a reasonable minimum length (adjust as needed)
    .format("yyyy-MM-dd HH:mm:ss") // Time format precise to seconds
    .build();
```

#### Adding/Removing Device Entities

Adding or removing devices in the {ProjectName} platform involves two special service-type entities. To support adding or removing devices, you need to define these entities and handle their event calls, then explicitly include these entities in the [Integration Definition](./integration-introduce.md).

##### Adding a Device

For the add device event, the platform will carry the device name `device_name` in the ExchangePayload context. Developers can retrieve this from the ExchangePayload context or implement the `AddDeviceAware` interface to obtain the new device information.

<Tabs>
  <TabItem value="Method 1" label="Method 1 (Recommended)" default>

- Define Entity
```java
@Data
@EqualsAndHashCode(callSuper = true)
@Entities
public static class AddDevice extends ExchangePayload implements AddDeviceAware {
  @Entity
  private String ip;
}
```
- Retrieve Device Name
```java
@EventSubscribe(payloadKeyExpression = "my-integration.integration.add_device.*")
// highlight-next-line
public void onAddDevice(Event<MyIntegrationEntities.AddDevice> event) {
    String deviceName = event.getPayload().getAddDeviceName();
    ...
}
```
  </TabItem>
  <TabItem value="Method 2" label="Method 2">
- Retrieve Device Name
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

##### Removing a Device

For the remove device event, the platform will carry the deleted device `device` in the ExchangePayload context. Developers can retrieve this from the ExchangePayload context or implement the `DeleteDeviceAware` interface to obtain the deleted device information.

<Tabs>
<TabItem value="Method 1" label="Method 1 (Recommended)" default>

- Define Device Deletion Entity
```java
@Data
@EqualsAndHashCode(callSuper = true)
@Entities
public static class DeleteDevice extends ExchangePayload implements DeleteDeviceAware {
  // Should be empty
}
```

:::danger Note
The device deletion entity should not contain any entities, meaning this class should be empty.
:::
- Retrieve Deleted Device
```java
@EventSubscribe(payloadKeyExpression = "my-integration.integration.delete_device")
// highlight-next-line
public void onDeleteDevice(Event<MyIntegrationEntities.DeleteDevice> event) {
    Device device = event.getPayload().getDeletedDevice();
    ...
}
```
  </TabItem>
  <TabItem value="Method 2" label="Method 2">
- Retrieve Deleted Device
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

### YAML-Based Construction

To facilitate development, the {ProjectName} platform also supports constructing devices and entities using YAML. Developers can define devices, entities, and other objects in the integration's YAML file, and the platform will load and initialize the corresponding entities and integrations upon startup.

```yaml
integration:
  my-integration: # Integration identifier
    # ...
    initial-entities: # Initial entities
      - identifier: 'connect' # Entity identifier
        name: connect         # Entity name
        value_type: string    # Entity value type
        type: service         # Entity type
        access_mod: RW        # Entity access mode
        children:             # Children entities
          - identifier: 'url'
            name: connectUrl    
            value_type: string
            type: service
    initial-devices: # Initial devices
      - identifier: 'demoDevice' # Device identifier
        name: demoDevice         # Device name
        entities:                # Device entities
          - identifier: 'temperature'
            name: temperature
            value_type: long
            access_mod: RW
            type: property
```

:::info
YAML-based construction is suitable for simple scenarios. In general, it is not recommended for complex logic as YAML-defined devices and entities can be difficult to integrate with business code.
:::

## Choosing the Appropriate Construction Method

Some construction methods will **automatically save** to the database when {ProjectName} loads the integration, while others require **manual saving** of the constructed devices and entities.

### Methods for Constructing Devices and Their Entities

| Device Quantity | Device Type* | Auto Save on Load | Recommended Method |
| --- | --- | --- | --- |
| Limited | Limited | Yes | @DeviceEntities / YAML |
| Dynamic | Limited | No | @DeviceTemplateEntities |
| Dynamic | Dynamic | No | Programmatic Construction |
:::tip
*Device type includes the basic definition of the device (e.g., device name, additional data) as well as the entity definition of the device.
:::

### Methods for Constructing Integration Entities

| Current Integration Entities | Auto Save on Load | Recommended Method |
| --- | --- | --- |
| Limited | Yes | @IntegrationEntities / YAML |
| Dynamic | No | Programmatic Construction |

## Saving Devices/Entities

### Saving Devices or Entities

#### Saving Devices

* Refer to the [documentation](./service-provider.md#device-service-provider-save) for methods.
* Saving a device will save both the device's own data and the data of the entities belonging to the device.

#### Saving Entities

* Refer to the [documentation](./service-provider.md#entity-service-provider-save) for methods.
* Saving an entity will save both the entity's own data and its sub-entities' data.
* Saving an entity does not save the entity's value, only the entity's metadata.

### Saving Entity Values

#### Saving via Entity Wrapper

##### Regular Entity Classes
* Integration entities defined with `@IntegrationEntities`.
* Device entities defined with `@DeviceEntities`.
* Sub-entities defined with `@Entities` under the above two methods.

Entity values can be updated using `AnnotatedEntityWrapper`.

For example, if we have defined an integration entity `MyIntegrationEntities` containing an entity `entity1` of type `String`:
```java
@Data
@EqualsAndHashCode(callSuper = true)
@IntegrationEntities
public class MyIntegrationEntities extends ExchangePayload {
    @Entity
    private String entity1;
}
```
To update the value of `entity1` to `beaver-iot`, use:
```java
new AnnotatedEntityWrapper<MyIntegrationEntities>()
        .saveValue(MyIntegrationEntities::getEntity1, "beaver-iot")
        .publishSync();
```

##### Device Template Entity Classes
* Integration entities defined with `@DeviceTemplateEntities`.

For example, if we have defined a device entity template:
```java
@Data
@EqualsAndHashCode(callSuper = true)
@DeviceTemplateEntities(name = "Template Device")
public class MyDeviceEntities extends ExchangePayload {
    @Entity
    private String entity1;
}
```
To update the value of the device entity `entity1` to `sample`, use:
```java
new AnnotatedTemplateEntityWrapper<MyDeviceEntities>(device.getIdentifier())
        .saveValue(MyDeviceEntities::getEntity1, "sample")
        .publishSync();
```

##### Entity Class Instances
To update the value of an entity instance `entity` to `sample`, use:
```java
new EntityWrapper(entity)
        .saveValue("sample")
        .publishSync();
```

#### Saving via Entity Key in Exchange

Another flexible way is to directly construct the [ExchangePayload](./eventbus.md#build-exchange-payload) based on the entity key and then save it. `ExchangePayload` provides a `create` method that can create an instance from a Map object.

To construct a payload for updating a single entity:
```java
ExchangePayload exchangePayload = ExchangePayload.create("<entityKey>", "<entityValue>");
```

To construct a payload for updating multiple entities:
```java
ExchangePayload exchangePayload = ExchangePayload.create(Map.of(
  "<entityKey1>", "<entityValue1>",
  "<entityKey2>", "<entityValue2>",
  "<entityKey3>", "<entityValue3>"
  // ...
));
```

Finally, save it:
```java
entityValueServiceProvider.saveValuesAndPublishSync(exchangePayload);
```