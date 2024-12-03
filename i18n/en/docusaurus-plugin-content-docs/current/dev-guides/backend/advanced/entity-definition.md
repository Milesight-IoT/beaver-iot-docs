---
sidebar_position: 2
toc_min_heading_level: 2
toc_max_heading_level: 4
---

import { ProjectName } from '/src/consts';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';


# Device/Entity Construction

## Overview
This chapter mainly introduces the key objects of the {ProjectName}: devices and entities, as well as how to construct them using annotations, programmatic methods, and YAML.

## Key Objects

### Device

`Device` is an instance of a device, containing:
* **id**
* **integration id**
* **name**
* **additional data**: Extra information stored in a Map structure, such as the device's serial number (SN)
* **key**: Device key, refer to [Key Coding Concepts](../../key-dev-concept.md) for key rules
* **identifier**: Device identifier, refer to [Key Coding Concepts](../../key-dev-concept.md) for identifier rules
* **contained entities**

:::tip
After saving a device, it is recommended not to change any metadata except **name** and **additional data**.
:::

### Entity

`Entity` is an instance of an entity, containing the entity's metadata (excluding the entity's value), including:
* **id**
* **device key**: If it is a device entity, it will contain the device's key. Refer to [Key Coding Concepts](../../key-dev-concept.md) for key rules
* **integration ID**
* **entity name**
* **access permissions**: Read-only/Write-only/Read-Write
* **identifier**: Entity identifier, refer to [Key Coding Concepts](../../key-dev-concept.md) for identifier rules
* **entity value type**: Includes: STRING, LONG, DOUBLE, BOOLEAN, BINARY, OBJECT
* **entity type**: Includes: Property entity, Event entity, Service entity
* **entity attributes**: Attributes of the entity, such as unit, precision, maximum value, minimum value, maximum length, minimum length, enum, etc.
* **child entities**: Child entities of the entity, currently supporting up to two levels of relationships
* **key**: Entity key, refer to [Key Coding Concepts](../../key-dev-concept.md) for key rules

:::tip
After saving an entity, it is recommended not to change any metadata except **name** and **entity attributes**.
:::


## Object Construction<a id="build-with-annotation"></a>

###  Annotation-Based Construction
The {ProjectName} platform provides an annotation-based method for constructing devices and entities. Developers only need to add corresponding annotations to the device class and entity class to complete the construction. The platform will load and initialize the corresponding entities and integrations at startup.

### Annotation Explanation
#### Class Annotations
- `@IntegrationEntities`: Marks the current class as an integration entity class
- `@DeviceEntities`: Marks the current class as a device entity class
    - `identifier`: Device identifier
    - `name`: Device name
    - `additional`: Additional device data, declared via the @KeyValue annotation
- `@Entities`: Marks the current class as a child entity class

##### Field Annotations
- `@Entity`: Marks the current attribute as an entity attribute
    - `type`: Entity type, including: Property entity, Event entity, Service entity
    - `name`: Entity name
    - `identifier`: Entity identifier
    - `attributes`: Declares entity attributes via the @Attribute annotation, including unit, precision, maximum value, minimum value, maximum length, minimum length, enum, etc.
    - `accessMod`: Entity access permissions, including: Read-only, Write-only, Read-Write
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
    @Entity(type = EntityType.SERVICE, name = "Device Connection Benchmark", identifier = "benchmark")
    // highlight-next-line
    private String benchmark;

    @Entity(type = EntityType.PROPERTY, name = "Detect Status", identifier = "detect_status", attributes = @Attribute(enumClass = DetectStatus.class), accessMod = AccessMod.R)
    // highlight-next-line
    private Long detectStatus;
    
    @Entity(type = EntityType.SERVICE, identifier = "delete_device")
    // highlight-next-line
    private String deleteDevice;
    
    public enum DetectStatus {
        STANDBY, DETECTING;
    }
}
```

:::tip
By default, the @Entity annotation uses the object field name (camelCase to snake_case) as the entity name and identifier. Developers can customize the entity name and identifier via the name and identifier properties.
When subscribing to entities on the consumer side, the annotated entity object can also be used to receive ExchangePayload event data, simplifying code development. Refer to the [Event Subscription](eventbus.md) chapter.
Note that when receiving event data, the entity object should extend the ExchangePayload class and the entity attributes should include corresponding Getter methods.
:::

- **Defining Integration Child Entities**
```java
@Data
@EqualsAndHashCode(callSuper = true)
@IntegrationEntities
public class MyIntegrationEntities extends ExchangePayload {
    
    @Entity(type = EntityType.EVENT, name = "Detect Report", identifier = "detect_report")
    // highlight-next-line
    private DetectReport detectReport;

    @Entity(type = EntityType.SERVICE, identifier = "add_device")
    // highlight-next-line
    private AddDevice addDevice;

    @Data
    @EqualsAndHashCode(callSuper = true)
    @Entities
    public static class DetectReport extends ExchangePayload {
        // Entity type inherits from parent entity (DetectReport)
        @Entity
        private Long consumedTime;

        @Entity
        private Long onlineCount;

        @Entity
        private Long offlineCount;
    }

    @Data
    @EqualsAndHashCode(callSuper = true)
    // highlight-next-line
    @Entities
    public static class AddDevice extends ExchangePayload {
        @Entity
        private String ip;
    }
}
```

:::tip
When the entity class is a child entity, add the @Entities annotation to the child entity class to complete the construction. Child entities inherit the attributes of the parent entity by default, so there is no need to set the type for child entities.
:::

#### Defining Device Entities
```java
@Data
@EqualsAndHashCode(callSuper = true)
@DeviceEntities(name="demoDevice", additional = {@KeyValue(key = "sn", value = "demoSN")}, identifier = "demoSN")
public class MyDeviceEntities extends ExchangePayload {
    
  @Entity(name = "temperature", identifier = "temperature", accessMod = AccessMod.RW, type = EntityType.PROPERTY)
  // highlight-next-line
  public Double temperature;
  
  @Entity
  // highlight-next-line
  private String humidity;
}
```
:::tip
When the entity class is a device entity, simply add the @DeviceEntities annotation. The {ProjectName} platform will complete the device initialization and construction.
:::

### Programmatic Construction
The {ProjectName} platform provides the `DeviceBuilder` and `EntityBuilder` classes, allowing developers to construct devices and entities programmatically.

#### Constructing Integration Entities
- **Without Child Entities**
```java
  // highlight-next-line
  Entity entityConfig = new EntityBuilder(integrationId)    // the integration identifier
          .identifier("webhookStatus")        // Setting the entity identifier
          .property("webhookStatus", AccessMod.R) // Set the entity as a property entity and set its access mod
//          .service("accessKey")             // Set the entity as a service entity
//          .event("accessKey")               // Set the entity as an event entity
          .attributes(new AttributeBuilder().maxLength(300).enums(IntegrationStatus.class).build()) // Setting entity attributes. It can also be constructed using the attributes(Supplier<Map<String, Object>> supplier) method
          .valueType(EntityValueType.STRING)    // Setting the entity value type
          .build();
```
- **With Child Entities**
<Tabs>
  <TabItem value="Example 1" label="Example 1" default>
```java
   // highlight-next-line
  Entity entityConfig = new EntityBuilder(integrationId)
          .identifier("settings")
          .property("settings", AccessMod.RW)
          .valueType(EntityValueType.STRING)
          // highlight-next-line
          .children()
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
  Entity parentEntity = new EntityBuilder(integrationId)
        .identifier("settings")
        .property("settings", AccessMod.RW)
        .valueType(EntityValueType.STRING)
        // highlight-next-line
        .children(()->{
            Entity childEntity = new EntityBuilder()
                    .identifier("accessKey")
                    .property("accessKey", AccessMod.RW)
                    .valueType(EntityValueType.STRING)
                    .build();
            return List.of(childEntity);
        })
        .build();
```
  </TabItem>
  <TabItem value="Example 3" label="Example 3">

```java
  // highlight-next-line
  Entity childEntity = new EntityBuilder()
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
        .children(childEntity) // or children list
        .build();
```
  </TabItem>
</Tabs>

#### Constructing Devices and Entities
- **Constructing Devices**
```java
  // highlight-next-line
  Device device = new DeviceBuilder(integrationConfig.getId())
          .name("deviceDemo")                   // Device name
          .identifier("deviceDemoIdentifier")   // Device identifier
          .additional(Map.of("sn", "demoSN"))  // Additional data of the device 
          .build();
```
- **Constructing Device Entities**

<Tabs>
  <TabItem value="Example 1" label="Example 1 (Recommended)" default>
```java
  // highlight-next-line
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
  <TabItem value="Example 2" label="Example 2" default>
```java
  // Define Entity
  //highlight-next-line 
  Entity entity = new EntityBuilder(integrationId)
        .identifier("temperature")
        .property("temperature", AccessMod.R)
        .valueType(EntityValueType.STRING)
        .build();
  // Define Device
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
    //highlight-next-line
    Entity entity = new EntityBuilder(integrationId, device.getKey())
        .identifier("temperature")
        .property("temperature", AccessMod.R)
        .valueType(EntityValueType.STRING)
        .build();
    device.setEntities(Collections.singletonList(entity));
```
  </TabItem>
</Tabs>

#### Constructing Entity Attributes

{ProjectName} provides the AttributeBuilder class, allowing developers to construct entity attributes programmatically. {ProjectName} currently supports attributes such as unit, precision, maximum value, minimum value, maximum length, minimum length, enumeration format, etc. Developers can also define custom attributes, for example:


```java
  // highlight-next-line
    Map<String, Object> build = new AttributeBuilder()
        .unit("s") // set unit
        .fractionDigits(0) // set number of fraction digits
        .min(0.0) // set min value
        .maxLength(10) // set max length
        .minLength(1) // set min length
        .format("yyyy-MM-dd HH:mm:ss") // set display format
        .build();
```
#### Adding/Deleting Device

Adding or removing devices in {ProjectName} are two special service entities of the integration. Integration that needs to support adding or removing devices needs to define these two entities and handle their invocation events, and finally put these two entities explicitly in [definition of this integration](./integration-introduce.md).

##### **Adding Devices**

For events of adding devices, the platform will carry the device name `device_name` in the ExchangePayload context. Developers can obtain this from the ExchangePayload context or implement the `AddDeviceAware` interface to get the device information for adding.

<Tabs>
  <TabItem value="Method 1" label="Method 1 (Recommended)" default>

- Define the entity for adding devices
```java
    @Data
    @EqualsAndHashCode(callSuper = true)
    @Entities
    // highlight-next-line
    public static class AddDevice extends ExchangePayload implements AddDeviceAware {
      @Entity
      private String ip;
    }
```
- Get the device name
```java
  @EventSubscribe(payloadKeyExpression = "my-integration.integration.add_device.*", eventType = ExchangeEvent.EventType.DOWN)
  public void onAddDevice(Event<MyIntegrationEntities.AddDevice> event) {
      String deviceName = event.getPayload().getAddDeviceName();
      ...
  }
```
  </TabItem>
  <TabItem value="Method 2" label="Method 2" default>
```java
  @EventSubscribe(payloadKeyExpression = "my-integration.integration.add_device.*", eventType = ExchangeEvent.EventType.DOWN)
  public void onAddDevice(Event<MyIntegrationEntities.AddDevice> event) {
      String deviceName = event.getPayload().getContext().get(ExchangeContextKeys.DEVICE_NAME_ON_ADD);
      ...
  }
```
  </TabItem>
</Tabs>

##### Deleting Devices

For events of deleting devices, the platform will carry the device instance `device` in the ExchangePayload context. Developers can obtain this from the ExchangePayload context or implement the `DeleteDeviceAware` interface to get the device information for deleting.


<Tabs>
<TabItem value="Method 1" label="Method 1 (Recommended)" default>

- Define the entity for deleting devices
```java
  @Data
  @EqualsAndHashCode(callSuper = true)
  @Entities
  public static class DeleteDevice extends ExchangePayload implements DeleteDeviceAware {
    // should be empty
  }
```

:::danger Note
The entity for deleting devices should not contain any attributes; this class should be empty.
:::

```java
  @EventSubscribe(payloadKeyExpression = "my-integration.integration.delete_device", eventType = ExchangeEvent.EventType.DOWN)
  // highlight-next-line
  public void onDeleteDevice(Event<MyIntegrationEntities.DeleteDevice> event) {
      Device device = event.getPayload().getDeletedDevice();
      ...
  }
```
  </TabItem>
  <TabItem value="Method 2" label="Method 2" default>
```java
  @EventSubscribe(payloadKeyExpression = "my-integration.integration.delete_device", eventType = ExchangeEvent.EventType.DOWN)
  // highlight-next-line
  public void onDeleteDevice(Event<MyIntegrationEntities.DeleteDevice> event) {
      Device device = event.getPayload().getContext().get(ExchangeContextKeys.DEVICE_ON_DELETE);
      ...
  }
```
  </TabItem>
</Tabs>


### YAML-Based Construction

To facilitate development, {ProjectName} also provides a YAML-based method for constructing devices and entities. Developers can define devices and entities in the integration YAML file to complete the construction. The platform will load and initialize the corresponding entities and integrations at startup.


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

:::tip
Generally, annotation-based and programmatic construction methods for devices and entities are more flexible and can meet most requirement scenarios. YAML-based construction aims to provide multiple means to facilitate rapid construction of devices and entities for developers.
:::
