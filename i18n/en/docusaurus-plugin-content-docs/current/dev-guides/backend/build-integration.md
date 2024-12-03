---
sidebar_position: 3
---

import CodeBlock from '@theme/CodeBlock';
import { DevProjectRepoSSH, DevProjectRepoHttps } from '/src/consts';
import { ProjectName } from '/src/consts';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Quick Start

Quickly implement the backend part of a custom integration.

## Prerequisites

Before developing the backend part of the integration, you may need to know:
* Basic concepts and terminology of {ProjectName}
* Basic knowledge of Java
* Basic knowledge of SpringFramework

If you have some understanding of the above, please continue reading to complete a simple demo step by step.

## Environment Setup

Before starting development, prepare the following environment:
* Java IDE  (recommended: [IntelliJ IDEA](https://www.jetbrains.com/idea/))
* Java Version 17 SDK
* Maven
* Git CLI

Once these are ready, run the following git command to get the integration development project:
<Tabs>
  <TabItem value="SSH" label="SSH" default>
    <CodeBlock language="bash">git clone {DevProjectRepoSSH}</CodeBlock>
  </TabItem>
  <TabItem value="Https" label="Https">
    <CodeBlock language="bash">git clone {DevProjectRepoHttps}</CodeBlock>
  </TabItem>
</Tabs>

After fetching the code, open the project folder *beaver-iot-integrations* in the IDE. You will find two modules: `application-dev` and `integrations`.

## Writing a Hello World

### Creating Integration Metadata
Create a new module under the `integrations` module for this integration, named
> **my-integration**

Create the pom file `pom.xml` in this module:

```xml title="beaver-iot-integrations/integrations/my-integration/pom.xml"
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
    <modelVersion>4.0.0</modelVersion>
    <parent>
        <groupId>com.milesight.beaveriot</groupId>
        <artifactId>integrations</artifactId>
        <version>1.0-SNAPSHOT</version>
        <relativePath>../pom.xml</relativePath>
    </parent>

<!-- highlight-next-line -->
    <artifactId>my-integration</artifactId>

    <properties>
        <maven.compiler.source>17</maven.compiler.source>
        <maven.compiler.target>17</maven.compiler.target>
        <project.build.sourceEncoding>UTF-8</project.build.sourceEncoding>
    </properties>

    <dependencies>
        <dependency>
            <groupId>com.milesight.beaveriot</groupId>
            <artifactId>context</artifactId>
            <version>${project.version}</version>
            <scope>provided</scope>
        </dependency>
    </dependencies>
    <build>
        <plugins>
            <!-- in case you have your own dependencies to be packaged -->
            <plugin>
                <groupId>org.apache.maven.plugins</groupId>
                <artifactId>maven-shade-plugin</artifactId>
                <executions>
                    <execution>
                        <phase>package</phase>
                        <goals>
                            <goal>shade</goal>
                        </goals>
                    </execution>
                </executions>
            </plugin>
        </plugins>
    </build>
</project>
```

:::warning
Dependencies with `scope` set to `provided` will not be packaged into the integration but will be provided by {ProjectName}. The `maven-shade-plugin` plugin packages dependencies into a single jar.

The `context` module is the core module of {ProjectName}, providing basic functionalities for integration development.
:::


Create a resource file `integration.yaml` in the new module:
```yaml title="beaver-iot-integrations/integrations/my-integration/src/main/resources/integration.yaml"
integration:
   my-integration: # integration identifier
      name: My Integration Name # integration name
      description: "My Demo Integration" # integration description
      enabled: true # whether enable this integration. Must be "true" for now
```

### Creating the Bootstrap Class
Create a package `com.milesight.beaveriot.myintegration`

Create a Java class file `MyIntegrationBootstrap.java` in this package:
```java title="beaver-iot-integrations/integrations/my-integration/src/main/java/com/milesight/beaveriot/myintegration/MyIntegrationBootstrap.java"
package com.milesight.beaveriot.myintegration;

import com.milesight.beaveriot.context.integration.bootstrap.IntegrationBootstrap;
import com.milesight.beaveriot.context.integration.model.Integration;
import org.springframework.stereotype.Component;

@Component
public class MyIntegrationBootstrap implements IntegrationBootstrap {
    @Override
    public void onPrepared(Integration integration) {
        
    }

    @Override
    public void onStarted(Integration integrationConfig) {
        // highlight-next-line
        System.out.println("Hello, world!");
    }

    @Override
    public void onDestroy(Integration integration) {

    }
}
```

### Starting Your First Integration

In the `application-dev` module, add your integration to the dependencies list in the `pom.xml`:
```xml title="beaver-iot-integrations/application/application-dev/pom.xml"

<!-- ... -->
    <dependencies>
        <!-- ... -->
        <dependency>
            <groupId>com.milesight.beaveriot</groupId>
            <!-- highlight-next-line -->
            <artifactId>my-integration</artifactId>
            <version>${project.version}</version>
        </dependency>
        <!-- ... -->
    </dependencies>
<!-- ... -->
</project>
```

Then start the *beaver-iot-integrations/application-dev/src/main/java/com/milesight/beaveriot/DevelopApplication.java*

You should see the console output:
> Hello, world!

## Implementing a Useful Integration

You have now implemented the simplest integration, but it only prints text to the console. Next, we will implement a useful integration.

This new integration will detect whether devices at specific IP addresses are online, with the following functionalities:
* Localhost as the **default device**
* Support for **triggering detection** of all devices' online status
* **Send report events** after each detection
* Support for **adding** devices to be monitored
* Support for **deleting** devices
* Support for returning the number of online devices via **Http**

### Defining Entities

Based on the above requirements, we can determine that this integration needs the following entities:
* A service entity `benchmark` to execute the detection of all devices' online status
* A property entity `detect_status` to indicate the detection status (detecting/standby)
* An event entity `detect_report` for the detection report (including the number of devices detected and detection time)

Additionally, adding and deleting devices are also service entities:
* Add device service `add_device`
* Delete device service `delete_device`

:::info
If you have questions about the definition of these entities based on the requirements, please refer to the [Concept Introduction](../../user-guides/introduction/concepts.md)
:::

Create a Java class file `MyIntegrationEntities.java` to define the above 5 entities and their sub-entities using annotations:

```java title="beaver-iot-integrations/integrations/sample-integrations/my-integration/src/main/java/com/milesight/beaveriot/myintegration/MyIntegrationEntities.java"
package com.milesight.beaveriot.myintegration;

import com.milesight.beaveriot.context.integration.entity.annotation.Attribute;
import com.milesight.beaveriot.context.integration.entity.annotation.Entities;
import com.milesight.beaveriot.context.integration.entity.annotation.Entity;
import com.milesight.beaveriot.context.integration.entity.annotation.IntegrationEntities;
import com.milesight.beaveriot.context.integration.enums.AccessMod;
import com.milesight.beaveriot.context.integration.enums.EntityType;
import com.milesight.beaveriot.context.integration.model.ExchangePayload;
import lombok.Data;
import lombok.EqualsAndHashCode;

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

    @Entity(type = EntityType.EVENT, name = "Detect Report", identifier = "detect_report")
    // highlight-next-line
    private DetectReport detectReport;

    @Entity(type = EntityType.SERVICE, identifier = "add_device")
    // highlight-next-line
    private AddDevice addDevice;

    @Entity(type = EntityType.SERVICE, identifier = "delete_device")
    // highlight-next-line
    private DeleteDevice deleteDevice;


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
    @Entities
    public static class AddDevice extends ExchangePayload implements AddDeviceAware {
        @Entity
        private String ip;
    }

    @Data
    @EqualsAndHashCode(callSuper = true)
    @Entities
    public static class DeleteDevice extends ExchangePayload implements DeleteDeviceAware {
    }
  
    public enum DetectStatus {
        STANDBY, DETECTING;
    }
}

```

This class defines the entities for adding and deleting devices. We need to synchronize their `identifier` with the metadata to let {ProjectName} know that this integration supports adding and deleting devices.

Update the resource file `integration.yaml`:
```yaml title="beaver-iot-integrations/integrations/sample-integrations/my-integration/src/main/resources/integration.yaml"
integration:
   my-integration: # integration identifier
      # ...
      # highlight-next-line
      entity-identifier-add-device: add_device
      # the same to deleteDevice identifier
      # highlight-next-line
      entity-identifier-delete-device: delete_device
```

:::warning
The delete device service entity cannot have sub-entities.

Adding and deleting devices are common functionalities, and each integration needs to explicitly define them to inform users and {ProjectName} that the integration supports dynamically adding or deleting devices.
:::

### Defining Devices

Here, we define a local device as the default initial device for the integration, which includes a property entity for the device status.

Create a Java class file `MyDeviceEntities.java` to define the device and its entities using annotations:

```java title="beaver-iot-integrations/integrations/sample-integrations/my-integration/src/main/java/com/milesight/beaveriot/myintegration/MyDeviceEntities.java"
package com.milesight.beaveriot.myintegration;

import com.milesight.beaveriot.context.integration.entity.annotation.Attribute;
import com.milesight.beaveriot.context.integration.entity.annotation.DeviceEntities;
import com.milesight.beaveriot.context.integration.entity.annotation.Entity;
import com.milesight.beaveriot.context.integration.entity.annotation.KeyValue;
import com.milesight.beaveriot.context.integration.enums.AccessMod;
import com.milesight.beaveriot.context.integration.enums.EntityType;
import com.milesight.beaveriot.context.integration.model.ExchangePayload;
import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@EqualsAndHashCode(callSuper = true)
@DeviceEntities(name="Default Device", identifier = "localhost", additional = {@KeyValue(key = "ip", value = "localhost")})
public class MyDeviceEntities extends ExchangePayload {
    @Entity(type = EntityType.PROPERTY, name = "Device Connection Status", accessMod = AccessMod.R, attributes = @Attribute(enumClass = DeviceStatus.class))
    // highlight-next-line
    private Long status;

    public enum DeviceStatus {
        ONLINE, OFFLINE;
    }
}
```

:::warning
Devices added in this static way will revert to their default name and properties after each restart. If the user deletes this device, it will reappear after the next restart, but the entity values will be lost.
:::

### Listening for Events - Adding/Deleting Devices

The above example shows how to create a default device using annotations, which is straightforward. However, many times we need to dynamically create or delete devices based on user needs.

We have defined the add/delete device service entities. When the user calls these services, corresponding events are sent. We only need to listen for these events using [key](../key-dev-concept.md#key) and implement the corresponding functionality in the handler method.

The context of the add device event contains the user-specified device name `device_name` (in the example, we use the AddDeviceAware interface to get the added device name). The code for adding a device is equivalent to dynamically implementing the annotated device definition. Since we restrict the `identifier` [characters](../key-dev-concept.md#identifier) to not include the `.` in IP addresses, we add a layer of conversion(`.` -> `_`).

The context of the delete device event contains the device instance `device` (in the example, we use the DeleteDeviceAware interface to get the deleted device).

Create a Java class file `MyDeviceService.java` to implement the methods for adding and deleting devices:
```java title="beaver-iot-integrations/integrations/sample-integrations/my-integration/src/main/java/com/milesight/beaveriot/myintegration/MyDeviceService.java"
package com.milesight.beaveriot.myintegration;

import com.milesight.beaveriot.context.api.DeviceServiceProvider;
import com.milesight.beaveriot.context.api.ExchangeFlowExecutor;
import com.milesight.beaveriot.context.integration.enums.AccessMod;
import com.milesight.beaveriot.context.integration.enums.EntityValueType;
import com.milesight.beaveriot.context.integration.model.*;
import com.milesight.beaveriot.context.integration.model.event.ExchangeEvent;
import com.milesight.beaveriot.eventbus.annotations.EventSubscribe;
import com.milesight.beaveriot.eventbus.api.Event;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.net.InetAddress;
import java.util.Collections;
import java.util.List;
import java.util.Map;
import java.util.concurrent.atomic.AtomicReference;

@Service
public class MyDeviceService {
    @Autowired
    private DeviceServiceProvider deviceServiceProvider;

    @Autowired
    private ExchangeFlowExecutor exchangeFlowExecutor;

    @EventSubscribe(payloadKeyExpression = "my-integration.integration.add_device.*", eventType = ExchangeEvent.EventType.DOWN)
    // highlight-next-line
    public void onAddDevice(Event<MyIntegrationEntities.AddDevice> event) {
        MyIntegrationEntities.AddDevice addDevice = event.getPayload();
        String deviceName = addDevice.getAddDeviceName();
        final String integrationId = "my-integration";
        Device device = new DeviceBuilder(integrationId)
              .name(deviceName)
              .identifier(ip.replace(".", "_"))
              .additional(Map.of("ip", ip))
              .entity(()->{
                return new EntityBuilder(integrationId)
                        .identifier("status")
                        .property("Device Status", AccessMod.R)
                        .valueType(EntityValueType.LONG)
                        .attributes(new AttributeBuilder().enums(MyDeviceEntities.DeviceStatus.class).build())
                        .build();
              })
              .build();

        deviceServiceProvider.save(device);
    }

    @EventSubscribe(payloadKeyExpression = "my-integration.integration.delete_device", eventType = ExchangeEvent.EventType.DOWN)
    // highlight-next-line
    public void onDeleteDevice(Event<MyIntegrationEntities.DeleteDevice> event) {
      Device device = event.getPayload().getDeletedDevice();
      deviceServiceProvider.deleteById(device.getId());
    }
}

```

### Listening for Events - Benchmark

Next, we create a method to listen for the Benchmark service entity and implement this method.
Update the Java class file `MyDeviceService.java` to add the implementation for the Benchmark service entity method.

After detecting all devices, an [upstream event](./advanced/eventbus.md#exchangeevent) is sent with the `detect_report` report.

```java title="beaver-iot-integrations/integrations/sample-integrations/my-integration/src/main/java/com/milesight/beaveriot/myintegration/MyDeviceService.java"
@Service
public class MyDeviceService {
    // ...
    @EventSubscribe(payloadKeyExpression = "my-integration.integration.benchmark", eventType = ExchangeEvent.EventType.DOWN)
    // highlight-next-line
    public void doBenchmark(Event<MyIntegrationEntities> event) {
        // mark benchmark starting
        exchangeFlowExecutor.syncExchangeDown(new ExchangePayload(Map.of("my-integration.integration.detect_status", MyIntegrationEntities.DetectStatus.DETECTING.ordinal())));
        int timeout = 5000;

        // start pinging
        List<Device> devices = deviceServiceProvider.findAll("my-integration");
        AtomicReference<Long> activeCount = new AtomicReference<>(0L);
        AtomicReference<Long> inactiveCount = new AtomicReference<>(0L);
        Long startTimestamp = System.currentTimeMillis();
        devices.forEach(device -> {
            boolean isSuccess = false;
            try {
                String ip = (String) device.getAdditional().get("ip");
                InetAddress inet = InetAddress.getByName(ip);
                if (inet.isReachable(timeout)) {
                    isSuccess = true;
                }
            } catch (Exception e) {
                e.printStackTrace();
            }

            int deviceStatus = MyDeviceEntities.DeviceStatus.OFFLINE.ordinal();
            if (isSuccess) {
                activeCount.updateAndGet(v -> v + 1);
                deviceStatus = MyDeviceEntities.DeviceStatus.ONLINE.ordinal();
            } else {
                inactiveCount.updateAndGet(v -> v + 1);
            }

            // Device have only one entity
            String deviceStatusKey = device.getEntities().get(0).getKey();
            exchangeFlowExecutor.asyncExchangeDown(new ExchangePayload(Map.of(deviceStatusKey, (long) deviceStatus)));
        });
        Long endTimestamp = System.currentTimeMillis();

        // mark benchmark done
        MyIntegrationEntities myIntegrationEntities = ExchangePayload.createProxy(MyIntegrationEntities.class);
        myIntegrationEntities.setDetectStatus(MyIntegrationEntities.DetectStatus.STANDBY.ordinal());
        myIntegrationEntities.setDetectReport(null);
        MyIntegrationEntities.DetectReport detectReport = myIntegrationEntities.getDetectReport();
        detectReport.setConsumedTime(endTimestamp - startTimestamp);
        detectReport.setOnlineCount(activeCount.get());
        detectReport.setOfflineCount(inactiveCount.get());
        exchangeFlowExecutor.syncExchangeUp(donePayload);
    }
// ...
}
```

:::tip
In the example above, we can use the annotated entity object to receive ExchangePayload data or use `ExchangePayload.createProxy(...)` to create a proxy object of the annotated entity. This allows us to directly manipulate the entity object's properties to construct the ExchangePayload object.
:::

### Listening for Events - Detection Report

We can listen for the report event sent after the detection is complete.

Update the Java class file `MyDeviceService.java` to add the method for listening to the report and printing it.

```java title="beaver-iot-integrations/integrations/sample-integrations/my-integration/src/main/java/com/milesight/beaveriot/myintegration/MyDeviceService.java"
@Service
public class MyDeviceService {
    // ...
    @EventSubscribe(payloadKeyExpression = "my-integration.integration.detect_report.*", eventType = ExchangeEvent.EventType.UP)
    // highlight-next-line
    public void listenDetectReport(Event<MyIntegrationEntities.DetectReport> event) {
        System.out.println("[Get-Report] " + event.getPayload()); // do something with this report
    }
// ...
}
```
### Creating an HTTP API

We allow integrations to set up their own HTTP routes for custom frontend calls or as webhook entry points.

Here, we will implement an HTTP interface that returns the count of online devices: `GET /my-integration/active-count`.

:::warning
To prevent routing conflicts between different integrations and the system, the URL for an integration should start with the integration name, such as:
* **/my-integration**/foo
* **/my-integration**/foo/bar
* **/my-integration**/bar
:::


Create a Java class `MyIntegrationController.java` and add a Controller to handle the requests.

```java title="beaver-iot-integrations/integrations/sample-integrations/my-integration/src/main/java/com/milesight/beaveriot/myintegration/MyIntegrationController.java"
package com.milesight.beaveriot.myintegration;

import com.fasterxml.jackson.databind.JsonNode;
import com.milesight.beaveriot.base.response.ResponseBody;
import com.milesight.beaveriot.base.response.ResponseBuilder;
import com.milesight.beaveriot.context.api.DeviceServiceProvider;
import com.milesight.beaveriot.context.api.EntityValueServiceProvider;
import lombok.Data;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/my-integration") // Should use integration identifier
public class MyIntegrationController {
    @Autowired
    private DeviceServiceProvider deviceServiceProvider;

    @Autowired
    private EntityValueServiceProvider entityValueServiceProvider;

    @GetMapping("/active-count")
    // highlight-next-line
    public ResponseBody<CountResponse> getActiveDeviceCount() {
        List<String> statusEntityKeys = new ArrayList<>();
        deviceServiceProvider.findAll("my-integration").forEach(device -> statusEntityKeys.add(device.getEntities().get(0).getKey()));
        Long count = entityValueServiceProvider
                .findValuesByKeys(statusEntityKeys)
                .values()
                .stream()
                .map(JsonNode::asInt)
                .filter(status -> status == MyDeviceEntities.DeviceStatus.ONLINE.ordinal())
                .count();
        CountResponse resp = new CountResponse();
        resp.setCount(count);
        return ResponseBuilder.success(resp);
    }

    @Data
    public class CountResponse {
        private Long count;
    }
}

```



## Testing Your Integration

Since {ProjectName} has a user authentication module, requests will require a login token in the request header, which can be inconvenient for debugging. Therefore, we recommend commenting out the user authentication module during development if the integration is unrelated to user data.

In the `application-dev` module, comment out the `authentication-service` dependency in the `pom.xml` file.
```xml title="beaver-iot-integrations/application/application-dev/pom.xml"

<!-- ... -->
    <dependencies>
        <!-- ... -->
        <!-- highlight-start -->
<!--        <dependency>-->
<!--            <groupId>com.milesight.beaveriot</groupId>-->
<!--            <artifactId>authentication-service</artifactId>-->
<!--        </dependency>-->
        <!-- highlight-end -->
        <!-- ... -->
    <dependencies>
<!-- ... -->
```

Then refresh Maven and restart the project.

### Fetch Integration Information
```shell
curl --location --request GET 'http://localhost:9200/integration/my-integration' \
--header 'Content-Type: application/json'
```

### Add a Device

Add a device with IP `8.8.8.8` and name `Test Device`.

```shell
curl --location 'http://localhost:9200/device' \
--header 'Content-Type: application/json' \
--data '{
    "name": "Test Device",
    "integration": "my-integration",
    "param_entities": {
        "my-integration.integration.add_device.ip": "8.8.8.8"
    }
}'
```

### Search Devices
```shell
curl --location 'http://localhost:9200/device/search' \
--header 'Content-Type: application/json' \
--data '{
    "name": ""
}'
```

### Call the Benchmark Service
```shell
curl --location 'http://localhost:9200/entity/service/call' \
--header 'Content-Type: application/json' \
--data '{
    "exchange": {
        "my-integration.integration.benchmark": ""
    }
}'
```

You should see console log output:
```
[Get-Report] {my-integration.integration.detect_report.offline_count=1, my-integration.integration.detect_report.consumed_time=5099, my-integration.integration.detect_report.online_count=1}
```

### Search Entities
```shell
curl --location 'http://localhost:9200/entity/search' \
--header 'Content-Type: application/json' \
--data '{
    "keyword": "",
    "page_size": 100
}'
```

### Get Entity Value

For example, if the entity key `my-integration.device.8_8_8_8.status` has an ID of `1853700374977695745`, fetch the value of this entity:

例如，搜索实体获取到列表，其中`entity_key`为`my-integration.device.8_8_8_8.status`的id为`1853700374977695745`。

获取这个实体的值：
```shell
curl --location --request GET 'http://localhost:9200/entity/1853700374977695745/status' \
--header 'Content-Type: application/json'
```


### Delete a Device

For example, if the device ID of the device added earlier is `1853676674098151426`, delete this device:

```shell
curl --location 'http://localhost:9200/device/batch-delete' \
--header 'Content-Type: application/json' \
--data '{
    "device_id_list": ["1853676674098151426"]
}'
```

You can search for devices again to check if the device has been successfully deleted.
