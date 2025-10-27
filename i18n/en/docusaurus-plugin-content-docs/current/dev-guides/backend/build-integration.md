---
sidebar_position: 3
---

import CodeBlock from '@theme/CodeBlock';
import {
    IntegrationProjectRepoSSH,
    IntegrationProjectRepoHttps,
    ProjectRepoSSH,
    ProjectRepoHttps,
    CodeShellName,
    CodeWinCmdName,
} from '/src/consts';
import { ProjectName, SampleBackendIntegration } from '/src/consts';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Quick Start

Swiftly implement the backend portion of a custom integration with this <a href={SampleBackendIntegration} target="_blank" rel="noopener noreferrer">code example</a>.

## Prerequisites

Before developing the backend part of the integration, you might need to be familiar with:
* The fundamental concepts and terminology of {ProjectName}
* Basic Java syntax
* Core knowledge of the Spring Framework

If you are acquainted with the above subjects, please proceed to follow along and create a simple demo step by step.

## Environment Setup

Before starting development, ensure you have the following environment set up:
* Java IDE ([IntelliJ IDEA](https://www.jetbrains.com/idea/download/) recommended)
* Java Version 17 SDK
* Maven
* Git CLI

Once these are ready, execute the following git command to obtain the source code for the integration project `beaver-iot-integrations`:
<Tabs>
  <TabItem value="SSH" label="SSH" default>
    <CodeBlock language="bash">git clone {IntegrationProjectRepoSSH}</CodeBlock>
  </TabItem>
  <TabItem value="Https" label="Https">
    <CodeBlock language="bash">git clone {IntegrationProjectRepoHttps}</CodeBlock>
  </TabItem>
</Tabs>


```
  beaver-iot-integrations/
  ├── integrations/                             # integration directory
  │ ├── sample-integrations/                    # Sample integration directory
  │ │   └── ...                                 # Sample integrations
  │ ├── msc-integration
  │ └── ...                                     # All other integrations
```

*(Optional)* Obtain the {ProjectName} backend project source code `beaver-iot` for testing after integration development:
<Tabs>
  <TabItem value="SSH" label="SSH" default>
    <CodeBlock language="bash">git clone {ProjectRepoSSH}</CodeBlock>
  </TabItem>
  <TabItem value="Https" label="Https">
    <CodeBlock language="bash">git clone {ProjectRepoHttps}</CodeBlock>
  </TabItem>
</Tabs>

Once you open these projects in your Java IDE, you can begin developing an integration.

## Writing a Hello World

First of all, **go to the `beaver-iot-integrations` project**

### Create Integration Metadata
Create a new module under the `integrations` module of the project and name it as the integration ID.
> **[integration-id]**

:::tip
Replace `[integration-id]` with the ID you just generated in all the following example codes.
:::

The `pom.xml` file for the module should be as follows:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
    <modelVersion>4.0.0</modelVersion>
    <parent>
        <groupId>com.milesight.beaveriot.integrations</groupId>
        <artifactId>integrations</artifactId>
        <version>${revision}</version>
    </parent>

    <!-- highlight-next-line -->
    <artifactId>[integration-id]</artifactId>
    <name>[integration-name]</name>
    <description>[integration-description]</description>

    <properties>
        <maven.compiler.source>17</maven.compiler.source>
        <maven.compiler.target>17</maven.compiler.target>
        <project.build.sourceEncoding>UTF-8</project.build.sourceEncoding>
    </properties>

    <dependencies>
        <dependency>
            <groupId>com.milesight.beaveriot</groupId>
            <artifactId>context</artifactId>
            <scope>provided</scope>
        </dependency>
    </dependencies>
    <build>
        <plugins>
            <!-- in case you have your own dependencies to be packaged -->
            <plugin>
                <groupId>org.apache.maven.plugins</groupId>
                <artifactId>maven-shade-plugin</artifactId>
            </plugin>
        </plugins>
    </build>
</project>
```

:::warning
Dependencies with `scope` set to `provided` will not be packaged into the integration; they are provided by {ProjectName}. The `maven-shade-plugin` bundles dependencies into a single JAR. The `context` module is the core module of {ProjectName}, offering essential functionalities for integration development.
:::

Create a new resource file `integration.yaml`:

```yaml
integration:
    <!-- highlight-next-line -->
   [integration-id]: # integration identifier
      name: My Integration Name # integration name
      description: "My Demo Integration" # integration description
      enabled: true # whether to enable this integration. Must be "true" for now
```

### Create Bootstrap Class

Create a new package `com.milesight.beaveriot.integrations.[integration-id]` containing a Java class file `MyIntegrationBootstrap.java`:

```java
package com.milesight.beaveriot.integrations.[integration-id];

import com.milesight.beaveriot.context.integration.bootstrap.IntegrationBootstrap;
import com.milesight.beaveriot.context.integration.model.Integration;
import org.springframework.stereotype.Component;

@Component
public class MyIntegrationBootstrap implements IntegrationBootstrap {
    @Override
    public void onPrepared(Integration integration) {
        // NO tenant context
    }

    @Override
    public void onStarted(Integration integrationConfig) {
        // NO tenant context
    }

    @Override
    public void onEnabled(Integration integrationConfig) {
        // WITH tenant context
        // highlight-next-line
        System.out.println("Hello, world!");
    }

    @Override
    public void onDestroy(Integration integration) {
        // NO tenant context
    }
}
```

Thus, you have completed your first and simplest integration, which will print
> Hello, world!

when {ProjectName} initializes the integration at startup.

### (Optional) Launch Your First Integration <a id="start-app-with-dev-integration"></a>

**In the `beaver-iot-integrations` project**, install your integration module locally:.
```shell
mvn install -DskipTests -Ddeploy.skip
```

**Go to the `beaver-iot` project** and add your integration to the dependencies list of `application/application-standard`.

```xml
<!-- ... -->
    <artifactId>application-standard</artifactId>
    <name>application-standard</name>
    <!-- ... -->

    <dependencies>
        <!-- ... -->

        <!-- default integrations -->
        <!-- ... -->

        <!-- highlight-start -->
        <dependency>
            <groupId>com.milesight.beaveriot.integrations</groupId>
            <artifactId>[integration-id]</artifactId>
            <version>${revision}</version>
        </dependency>
        <!-- highlight-end -->
        <!-- ... -->
    </dependencies>
<!-- ... -->
</project>
```

Upon starting `application-standard`, you can observe the console output:
> Hello, world!

## Implementing a Useful Integration

You have now created a basic integration that prints a message to the console. Next, let's develop a more functional integration.

This new integration will **detect whether devices at specific IP addresses are online**. It includes the following features:
* Support for **triggering a check** to see if all devices are online
* **Sending a report event** each time a check is completed
* Support for **adding** devices to be monitored
* Support for **removing** devices
* Returning the number of online devices via **HTTP**

### Defining Entities

Based on the above requirements, the integration needs the following entities:
* A service entity `benchmark` to check if all devices are online
* A property entity `detect_status` to indicate the detection status (detecting/pending)
* An event entity `detect_report` to report the results of the check (including the number of devices checked and the time taken)

Additionally, adding and removing devices are also service entities:
* Add device service `add_device`
* Remove device service `delete_device`

:::info
If you have any questions about the definitions of these entities based on the above requirements, please refer to the [Concepts Introduction](../../user-guides/introduction/concepts.md).
:::

First, **go to the `beaver-iot-integrations` project** and find the module you just created

Create a new Java class file `MyIntegrationEntities.java` to define the above five entities and their sub-entities using annotations:

```java
package com.milesight.beaveriot.integrations.[integration-id].entity;

import com.milesight.beaveriot.context.integration.context.AddDeviceAware;
import com.milesight.beaveriot.context.integration.context.DeleteDeviceAware;
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
    private Benchmark benchmark;

    @Entity(type = EntityType.PROPERTY, name = "Detect Status", identifier = "detect_status", attributes = @Attribute(enumClass = DetectStatus.class), accessMod = AccessMod.R)
    private Long detectStatus;

    @Entity(type = EntityType.EVENT, name = "Detect Report", identifier = "detect_report")
    private DetectReport detectReport;

    @Entity(type = EntityType.SERVICE, identifier = "add_device", visible = false)
    private AddDevice addDevice;

    @Entity(type = EntityType.SERVICE, identifier = "delete_device", visible = false)
    private DeleteDevice deleteDevice;

    @Data
    @EqualsAndHashCode(callSuper = true)
    @Entities
    public static class DetectReport extends ExchangePayload {
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

    @Data
    @EqualsAndHashCode(callSuper = true)
    @Entities
    public static class Benchmark extends ExchangePayload {
    }

    public enum DetectStatus {
        STANDBY, DETECTING;
    }
}
```

:::warning

The delete device service entity cannot have sub-entities.

Adding and removing devices are common functionalities that represent internal interactions between the integration and {ProjectName}, and are not directly accessible to users. Therefore, in the `MyIntegrationEntities` class, the `visible` attribute for these entities is set to `false`.

:::

In this class, we define the entities for **adding devices** and **removing devices**. We need to sync their `identifier` to the metadata to indicate to {ProjectName} that this integration supports adding and removing devices.

Update the resource file `integration.yaml`:

```yaml
integration:
   [integration-id]: # integration identifier
      # ...
      # highlight-next-line
      entity-identifier-add-device: add_device
      # the same for deleteDevice identifier
      # highlight-next-line
      entity-identifier-delete-device: delete_device
```

### Define the Device

Let's define the device template for this integration. Each device will include a single entity representing the device status.

Create a new Java class file `MyDeviceEntities.java` to define the device `MyDeviceEntities` and its entity `status` using annotations:

```java
package com.milesight.beaveriot.integrations.[integration-id].entity;

import com.milesight.beaveriot.context.integration.entity.annotation.*;
import com.milesight.beaveriot.context.integration.enums.AccessMod;
import com.milesight.beaveriot.context.integration.enums.EntityType;
import com.milesight.beaveriot.context.integration.model.ExchangePayload;
import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@EqualsAndHashCode(callSuper = true)
@DeviceTemplateEntities(name = "Ping Device")
public class MyDeviceEntities extends ExchangePayload {
    @Entity(type = EntityType.PROPERTY, name = "Device Connection Status", accessMod = AccessMod.R, attributes = @Attribute(enumClass = DeviceStatus.class))
    private Long status;

    public enum DeviceStatus {
        ONLINE, OFFLINE;
    }
}
```

### Listen to Events - Add Device / Remove Device

We have defined the add/remove device service entities. When a user calls these services, corresponding events are sent. We can listen to these events and implement the corresponding functionality.

The context of the add device event includes the device name specified by the user (in this example, we use the `AddDeviceAware` interface to get the new device name). Since the `identifier` cannot contain the dot character from the IP address, we perform a conversion.

The context of the remove device event includes the device instance (in this example, we use the `DeleteDeviceAware` interface to get the device to be removed).

Create a new Java class file `MyDeviceService.java` to implement the methods for adding and removing devices:

```java
package com.milesight.beaveriot.integrations.[integration-id].service;

import com.milesight.beaveriot.context.api.DeviceServiceProvider;
import com.milesight.beaveriot.context.api.EntityValueServiceProvider;
import com.milesight.beaveriot.context.integration.model.*;
import com.milesight.beaveriot.context.integration.model.event.ExchangeEvent;
import com.milesight.beaveriot.context.integration.wrapper.AnnotatedEntityWrapper;
import com.milesight.beaveriot.context.integration.wrapper.AnnotatedTemplateEntityWrapper;
import com.milesight.beaveriot.eventbus.annotations.EventSubscribe;
import com.milesight.beaveriot.eventbus.api.Event;
import com.milesight.beaveriot.integrations.[integration-id].entity.MyDeviceEntities;
import com.milesight.beaveriot.integrations.[integration-id].entity.MyIntegrationEntities;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.net.InetAddress;
import java.util.List;
import java.util.Map;
import java.util.concurrent.atomic.AtomicReference;

@Service
public class MyDeviceService {
    @Autowired
    private DeviceServiceProvider deviceServiceProvider;

    @Autowired
    private EntityValueServiceProvider entityValueServiceProvider;

    public static final String INTEGRATION_ID = "[integration-id]";

    @EventSubscribe(payloadKeyExpression = INTEGRATION_ID + ".integration.add_device.*", eventType = ExchangeEvent.EventType.CALL_SERVICE)
    public void onAddDevice(Event<MyIntegrationEntities.AddDevice> event) {
        MyIntegrationEntities.AddDevice addDevice = event.getPayload();
        String deviceName = addDevice.getAddDeviceName();
        String ip = event.getPayload().getIp();
        Device device = new DeviceBuilder(INTEGRATION_ID)
                .name(deviceName)
                .identifier(ip.replace(".", "_"))
                .additional(Map.of("ip", ip))
                .entities(()-> new AnnotatedTemplateEntityBuilder(INTEGRATION_ID, ip.replace(".", "_")).build(MyDeviceEntities.class))
                .build();

        deviceServiceProvider.save(device);
    }

    @EventSubscribe(payloadKeyExpression = INTEGRATION_ID + ".integration.delete_device", eventType = ExchangeEvent.EventType.CALL_SERVICE)
    public void onDeleteDevice(Event<MyIntegrationEntities.DeleteDevice> event) {
        Device device = event.getPayload().getDeletedDevice();
        deviceServiceProvider.deleteById(device.getId());
    }
}
```

### Listen to Events - Benchmark

Next, we create a method to listen to the Benchmark service entity and implement this method. Once all devices have been checked, a `detect_report` event will be sent.

Update the `MyDeviceService.java` class to add the implementation of the Benchmark service entity method:

```java
@Service
public class MyDeviceService {
    // ...
    @EventSubscribe(payloadKeyExpression = INTEGRATION_ID + ".integration.benchmark", eventType = ExchangeEvent.EventType.CALL_SERVICE)
    public void doBenchmark(Event<MyIntegrationEntities> event) {
        // Mark benchmark starting
        new AnnotatedEntityWrapper<MyIntegrationEntities>()
                .saveValue(MyIntegrationEntities::getDetectStatus, (long) MyIntegrationEntities.DetectStatus.DETECTING.ordinal())
                .publishSync();

        // Start pinging
        final int timeout = 5000;
        List<Device> devices = deviceServiceProvider.findAll(INTEGRATION_ID);
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

            // Device has only one entity
            new AnnotatedTemplateEntityWrapper<MyDeviceEntities>(device.getIdentifier()).saveValue(MyDeviceEntities::getStatus, (long) deviceStatus);
        });
        Long endTimestamp = System.currentTimeMillis();

        // Mark benchmark done
        new AnnotatedEntityWrapper<MyIntegrationEntities>()
                .saveValue(MyIntegrationEntities::getDetectStatus, (long) MyIntegrationEntities.DetectStatus.STANDBY.ordinal())
                .publishSync();

        // Send report event
        new AnnotatedEntityWrapper<MyIntegrationEntities.DetectReport>().saveValues(Map.of(
                MyIntegrationEntities.DetectReport::getConsumedTime, endTimestamp - startTimestamp,
                MyIntegrationEntities.DetectReport::getOnlineCount, activeCount.get(),
                MyIntegrationEntities.DetectReport::getOfflineCount, inactiveCount.get()
        )).publishSync();
    }
    // ...
}
```

### Listen to Events - Detect Report

We can listen to the report event sent after the detection is completed.

Update the `MyDeviceService.java` class to add a method to listen to the report and print it:

```java
@Service
public class MyDeviceService {
    // ...
    @EventSubscribe(payloadKeyExpression = INTEGRATION_ID + ".integration.detect_report.*", eventType = ExchangeEvent.EventType.REPORT_EVENT)
    public void listenDetectReport(Event<MyIntegrationEntities.DetectReport> event) {
        System.out.println("[Get-Report] " + event.getPayload()); // Do something with this report
    }
    // ...
}
```

### Create HTTP API

We will allow the integration to set up its own HTTP routes for custom frontend calls or as a webhook entry point.

Here, we will implement an HTTP interface that returns the count of online devices with the endpoint `GET /[integration-id]/active-count`.

:::warning
To prevent route conflicts between different integrations and the system, the URL address of the integration should start with the integration name, such as:
* **/[integration-id]**/foo
* **/[integration-id]**/foo/bar
* **/[integration-id]**/bar
:::

Create a Java class `MyIntegrationController.java` to add a controller that handles the request.

```java
package com.milesight.beaveriot.integrations.[integration-id].controller;

import com.milesight.beaveriot.base.response.ResponseBody;
import com.milesight.beaveriot.base.response.ResponseBuilder;
import com.milesight.beaveriot.context.api.DeviceServiceProvider;
import com.milesight.beaveriot.context.api.EntityValueServiceProvider;
import com.milesight.beaveriot.integrations.[integration-id].entity.MyDeviceEntities;
import com.milesight.beaveriot.integrations.[integration-id].service.MyDeviceService;
import lombok.Data;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/" + MyDeviceService.INTEGRATION_ID) // Should use integration identifier
public class MyIntegrationController {
    @Autowired
    private DeviceServiceProvider deviceServiceProvider;

    @Autowired
    private EntityValueServiceProvider entityValueServiceProvider;

    @GetMapping("/active-count")
    public ResponseBody<CountResponse> getActiveDeviceCount() {
        List<String> statusEntityKeys = new ArrayList<>();
        deviceServiceProvider.findAll(MyDeviceService.INTEGRATION_ID).forEach(device -> statusEntityKeys.add(device.getEntities().get(0).getKey()));
        Long count = entityValueServiceProvider
                .findValuesByKeys(statusEntityKeys)
                .values()
                .stream()
                .map(n -> (long) n)
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

## (Optional) Test Your Integration

**In the `beaver-iot-integrations` project**, reinstall your integration:
```shell
mvn install -DskipTests -Ddeploy.skip
```

**Go to the `beaver-iot` project** and make sure your integration has been added to the dependencies list of `application/application-standard` and restart it.

### Register User

<Tabs>
  <TabItem value={CodeShellName} default>
```shell
curl --location 'http://localhost:9200/user/register' \
--header 'Content-Type: application/json' \
--data-raw '{
    "email": "john.doe@example.com",
    "nickname": "JohnDoe",
    "password": "12#$qwER"
}'
```
  </TabItem>
  <TabItem value={CodeWinCmdName}>
```batch
curl --location "http://localhost:9200/user/register" ^
--header "Content-Type: application/json" ^
--data-raw "{\"email\": \"john.doe@example.com\", \"nickname\": \"JohnDoe\", \"password\": \"12#$qwER\"}"
```
  </TabItem>
</Tabs>

### Login User

<Tabs>
  <TabItem value={CodeShellName} default>
```shell
curl --location 'http://192.168.43.46:9200/oauth2/token' \
--header 'Content-Type: application/x-www-form-urlencoded' \
--data-urlencode 'username=john.doe@example.com' \
--data-urlencode 'password=12#$qwER' \
--data-urlencode 'grant_type=password' \
--data-urlencode 'client_id=iab' \
--data-urlencode 'client_secret=milesight*iab'
```
  </TabItem>
  <TabItem value={CodeWinCmdName}>
```batch
curl --location "http://localhost:9200/oauth2/token" ^
--header "Content-Type: application/x-www-form-urlencoded" ^
--data-urlencode "username=john.doe@example.com" ^
--data-urlencode "password=12#$qwER" ^
--data-urlencode "grant_type=password" ^
--data-urlencode "client_id=iab" ^
--data-urlencode "client_secret=milesight*iab"
```
  </TabItem>
</Tabs>

The response data should look like this:

```json
{
    "data": {
        "access_token":"***.****.***",
        "refresh_token":"***",
        "token_type":"Bearer",
        "expires_in":86399
    },
    "status":"Success"
}
```

Record the `access_token`:

```shell
access_token=***.****.***
```

### Get Integration Information

<Tabs>
  <TabItem value={CodeShellName} default>
```shell
curl --location --request GET 'http://localhost:9200/integration/[integration-id]' \
--header 'Content-Type: application/json' \
--header "Authorization: Bearer $access_token" \
--data '{
}'
```
  </TabItem>
  <TabItem value={CodeWinCmdName}>
```batch
curl --location --request GET "http://localhost:9200/integration/[integration-id]" ^
--header "Content-Type: application/json" ^
--header "Authorization: Bearer %access_token%" ^
--data "{}"
```
  </TabItem>
</Tabs>

### Add Device

For a device with IP `8.8.8.8` and name `Test Device`:

<Tabs>
  <TabItem value={CodeShellName} default>
```shell
curl --location 'http://localhost:9200/device' \
--header 'Content-Type: application/json' \
--header "Authorization: Bearer $access_token" \
--data '{
    "name": "Test Device",
    "integration": "[integration-id]",
    "param_entities": {
        "[integration-id].integration.add_device.ip": "8.8.8.8"
    }
}'
```
  </TabItem>
  <TabItem value={CodeWinCmdName}>
```batch
curl --location "http://localhost:9200/device" ^
--header "Content-Type: application/json" ^
--header "Authorization: Bearer %access_token%" ^
--data "{\"name\": \"Test Device\", \"integration\": \"[integration-id]\", \"param_entities\": {\"[integration-id].integration.add_device.ip\": \"8.8.8.8\"}}"
```
  </TabItem>
</Tabs>

### Search Devices

<Tabs>
  <TabItem value={CodeShellName} default>
```shell
curl --location 'http://localhost:9200/device/search' \
--header 'Content-Type: application/json' \
--header "Authorization: Bearer $access_token" \
--data '{
    "name": ""
}'
```
  </TabItem>
  <TabItem value={CodeWinCmdName}>
```batch
curl --location "http://localhost:9200/device/search" ^
--header "Content-Type: application/json" ^
--header "Authorization: Bearer %access_token%" ^
--data "{\"name\": \"\"}"
```
  </TabItem>
</Tabs>

### Call Benchmark Service

<Tabs>
  <TabItem value={CodeShellName} default>
```shell
curl --location 'http://localhost:9200/entity/service/call' \
--header 'Content-Type: application/json' \
--header "Authorization: Bearer $access_token" \
--data '{
    "exchange": {
        "[integration-id].integration.benchmark": ""
    }
}'
```
  </TabItem>
  <TabItem value={CodeWinCmdName}>
```batch
curl --location "http://localhost:9200/entity/service/call" ^
--header "Content-Type: application/json" ^
--header "Authorization: Bearer %access_token%" ^
--data "{\"exchange\": {\"[integration-id].integration.benchmark\": \"\"}}"
```
  </TabItem>
</Tabs>

You should see logs in the console:

```
[Get-Report] {[integration-id].integration.detect_report.offline_count=1, [integration-id].integration.detect_report.consumed_time=5099, [integration-id].integration.detect_report.online_count=1}
```

### Search Entities

<Tabs>
  <TabItem value={CodeShellName} default>
```shell
curl --location 'http://localhost:9200/entity/search' \
--header 'Content-Type: application/json' \
--header "Authorization: Bearer $access_token" \
--data '{
    "keyword": "",
    "page_size": 100
}'
```
  </TabItem>
  <TabItem value={CodeWinCmdName}>
```batch
curl --location "http://localhost:9200/entity/search" ^
--header "Content-Type: application/json" ^
--header "Authorization: Bearer %access_token%" ^
--data "{\"keyword\": \"\", \"page_size\": 100}"
```
  </TabItem>
</Tabs>

### Get Entity Value

For example, if the `entity_key` for the entity `[integration-id].device.8_8_8_8.status` has the ID `1879410769126817793`, get this entity's value:

<Tabs>
  <TabItem value={CodeShellName} default>
```shell
curl --location --request GET 'http://localhost:9200/entity/1879410769126817793/status' \
--header "Authorization: Bearer $access_token" \
--header 'Content-Type: application/json'
```
  </TabItem>
  <TabItem value={CodeWinCmdName}>
```batch
curl --location --request GET "http://localhost:9200/entity/1879410769126817793/status" ^
--header "Authorization: Bearer %access_token%" ^
--header "Content-Type: application/json"
```
  </TabItem>
</Tabs>

### Delete Device

For example, if the device ID is `1879410769026154498`, delete this device:

<Tabs>
  <TabItem value={CodeShellName} default>
```shell
curl --location 'http://localhost:9200/device/batch-delete' \
--header 'Content-Type: application/json' \
--header "Authorization: Bearer $access_token" \
--data '{
    "device_id_list": ["1879410769026154498"]
}'
```
  </TabItem>
  <TabItem value={CodeWinCmdName}>
```batch
curl --location "http://localhost:9200/device/batch-delete" ^
--header "Content-Type: application/json" ^
--header "Authorization: Bearer %access_token%" ^
--data "{\"device_id_list\": [\"1879410769026154498\"]}"
```
  </TabItem>
</Tabs>

You can search for devices again to verify if the deletion was successful.