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

# 快速入门

快速实现一个自定义集成的后端部分，<a href={SampleBackendIntegration} target="_blank" rel="noopener noreferrer">代码示例</a>

## 前置条件

在开发集成的后端部分之前，您可能需要知道：
* {ProjectName} 的基本概念以及术语
* Java 的基本语法
* SpringFramework 的基础知识

如果您对以上的知识有一定的了解，那么请继续往下阅读，一步一步完成一个最简单的 Demo。

## 环境准备

在进行开发前，需要准备以下环境：
* Java IDE (推荐[IntelliJ IDEA](https://www.jetbrains.com/idea/download/))
* Java Version 17 SDK
* Maven
* Git CLI

在准备这些完成后，运行以下git命令，获取集成开发的项目源码 `beaver-iot-integrations`
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
  ├── integrations/                             # 集成目录
  │ ├── sample-integrations/                    # 示例集成目录
  │ │   └── ...                                 # 示例集成
  │ ├── msc-integration
  │ └── ...                                     # 所有其它集成
```

*(可选)* 接下来，获取 {ProjectName} 后端项目源码 `beaver-iot` ，用于集成开发完成后的测试
<Tabs>
  <TabItem value="SSH" label="SSH" default>
    <CodeBlock language="bash">git clone {ProjectRepoSSH}</CodeBlock>
  </TabItem>
  <TabItem value="Https" label="Https">
    <CodeBlock language="bash">git clone {ProjectRepoHttps}</CodeBlock>
  </TabItem>
</Tabs>

使用Java IDE打开这两个项目后就可以开始尝试开发一个集成了。

## 写一个Hello world

首先，**进入`beaver-iot-integrations`项目**

### 创建集成元数据
在项目的`integrations`模块下新建一个作为这个集成的模块，并为这个模块起一个名字，作为集成的id
> **[integration-id]**

:::tip
请用你刚刚生成的id替换以下所有示例代码中的`[integration-id]`
:::

在模块的pom文件如下

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
`scope`为`provided`的依赖不会被打包到集成中，而是由{ProjectName}提供，通过`maven-shade-plugin`插件将依赖包打包至一个jar包中。
`context`模块是{ProjectName}的核心模块，提供了集成开发的基础功能。
:::


新建一个资源文件`integration.yaml`

```yaml
integration:
    <!-- highlight-next-line -->
   [integration-id]: # integration identifier
      name: My Integration Name # integration name
      description: "My Demo Integration" # integration description
      enabled: true # whether enable this integration. Must be "true" for now
```

### 创建Bootstrap类
新建包`com.milesight.beaveriot.integrations.[integration-id]`

内含一个Java类文件`MyIntegrationBootstrap.java`
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

这样，你就完成了你的第一个最简单的集成，他可以在{ProjectName}启动初始化集成时打印
> Hello, world!

### (可选) 启动你的第一个集成<a id="start-app-with-dev-integration"></a>

**在`beaver-iot-integrations`项目中**，将你的集成模块安装到本地:
```shell
mvn install -DskipTests -Ddeploy.skip
```

**进入`beaver-iot`项目**，将你的集成加入`application/application-standard`依赖列表dependencies中

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
            <version>${project.version}</version>
        </dependency>
        <!-- highlight-end -->
        <!-- ... -->
    </dependencies>
<!-- ... -->
</project>
```

从`application-standard`启动，程序加载完成后可以看到控制台输出
> Hello, world!

## 实现一个有用的集成

你现在已经实现了一个最简单的集成，但是它的功能只有控制台输出文字，我们接下来将实现一个有用的集成。

这个新的集成能够**检测某个ip地址的设备是否在线**，其功能包括：
* 支持**触发检测**所有设备是否在线功能
* 每次检测完成时**发送报告事件**
* 支持**添加**需要被监控的设备
* 支持**删除**设备
* 支持通过**Http**返回在线设备的数量

### 约定实体

通过分析以上需求，我们能够知道，这个这个集成需要以下实体：
* 一个服务(Service)类型的实体 `benchmark` ：执行检测所有设备是否在线
* 一个属性(Property)类型的实体 `detect_status` ：检测状态（检测中/待检测）
* 一个事件(Event)类型的实体 `detect_report` ：检测完毕的报告(包括检测数量、检测耗时)

特别的，添加和删除设备也是服务类型的实体：
* 添加设备服务 `add_device` 
* 删除设备服务 `delete_device` 

:::info
如果您对以上需求分析几种实体的定义有疑问，请看[概念介绍](../../user-guides/introduction/concepts.md)
:::

首先，**进入`beaver-iot-integrations`项目**，找到你刚刚创建的模块

新建一个Java类文件`MyIntegrationEntities.java`，以注解的方式定义集成的以上5个实体以及其子实体

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

删除设备服务实体不能有子实体。

添加设备和删除设备是通用功能是属于集成和{ProjectName}交互的内部功能，无法让用户直接使用，因此在`MyIntegrationEntities`类中，将`visible`设置为`false`。

:::

这个类中，我们定义了**增加设备**和**删除设备**的实体，我们需要将这个他们的`identifier`同步到元数据中，用于指示{ProjectName}：这个集成支持添加和删除设备。

更新资源文件`integration.yaml`

```yaml
integration:
   [integration-id]: # integration identifier
      # ...
      # highlight-next-line
      entity-identifier-add-device: add_device
      # the same to deleteDevice identifier
      # highlight-next-line
      entity-identifier-delete-device: delete_device
```

### 约定设备

我们这里定义这个集成的设备模板，模板内容是，每台设备包含一个实体——设备状态。

新建一个Java类文件`MyDeviceEntities.java`，以注解的方式定义设备`MyDeviceEntities`和其实体`status`。

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

### 监听事件 - 新增设备 / 删除设备
我们定义了添加/删除设备服务实体。当用户调用添加/删除设备服务，会发送相应事件，因此我们只需要通过[key](../key-dev-concept.md#key)监听这个事件，然后在处理方法中实现对应功能即可。

新增设备事件的上下文中有用户指定的设备名称（示例中采用实现`AddDeviceAware`接口方式来获取新增设备名）。我们限定`identifier`的[字符](../key-dev-concept.md#identifier)不能包含ip地址中的`.`，因此我们做了一层转换。

删除设备事件的上下文中有设备的实例`device`（示例中采用实现`DeleteDeviceAware`接口方式来获取删除的设备）。

新建一个Java类文件`MyDeviceService.java`，在这个类中实现添加和删除设备的方法
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

    public static final String INTEGRATION_ID = [integration-id];

    @EventSubscribe(payloadKeyExpression = INTEGRATION_ID + ".integration.add_device.*", eventType = ExchangeEvent.EventType.CALL_SERVICE)
    // highlight-next-line
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
    // highlight-next-line
    public void onDeleteDevice(Event<MyIntegrationEntities.DeleteDevice> event) {
        Device device = event.getPayload().getDeletedDevice();
        deviceServiceProvider.deleteById(device.getId());
    }
}
```

### 监听事件 - Benchmark

接下来我们创建方法，监听Benchmark服务实体，并且实现这个方法。
更新Java类文件`MyDeviceService.java`，在这个类中添加Benchmark服务实体的方法实现。

检测所有设备完成后，会发送一个`detect_report`报告事件。
```java
@Service
public class MyDeviceService {
    // ...
    @EventSubscribe(payloadKeyExpression = INTEGRATION_ID + ".integration.benchmark", eventType = ExchangeEvent.EventType.CALL_SERVICE)
    // highlight-next-line
    public void doBenchmark(Event<MyIntegrationEntities> event) {
        // mark benchmark starting
        new AnnotatedEntityWrapper<MyIntegrationEntities>()
                .saveValue(MyIntegrationEntities::getDetectStatus, (long) MyIntegrationEntities.DetectStatus.DETECTING.ordinal())
                .publishSync();

        // start pinging
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

            // Device have only one entity
            new AnnotatedTemplateEntityWrapper<MyDeviceEntities>(device.getIdentifier()).saveValue(MyDeviceEntities::getStatus, (long) deviceStatus);
        });
        Long endTimestamp = System.currentTimeMillis();

        // mark benchmark done
        new AnnotatedEntityWrapper<MyIntegrationEntities>()
                .saveValue(MyIntegrationEntities::getDetectStatus, (long) MyIntegrationEntities.DetectStatus.STANDBY.ordinal())
                .publishSync();

        // send report event
        new AnnotatedEntityWrapper<MyIntegrationEntities.DetectReport>().saveValues(Map.of(
                MyIntegrationEntities.DetectReport::getConsumedTime, endTimestamp - startTimestamp,
                MyIntegrationEntities.DetectReport::getOnlineCount, activeCount.get(),
                MyIntegrationEntities.DetectReport::getOfflineCount, inactiveCount.get()
        )).publishSync();
    }
    // ...
}
```

### 监听事件 - 检测报告事件

我们可以监听检测完成后发送的报告事件。

更新Java类文件`MyDeviceService.java`，在这个类中添加报告的监听方法，并且打印。

```java
@Service
public class MyDeviceService {
    // ...
    @EventSubscribe(payloadKeyExpression = INTEGRATION_ID + ".integration.detect_report.*", eventType = ExchangeEvent.EventType.REPORT_EVENT)
    public void listenDetectReport(Event<MyIntegrationEntities.DetectReport> event) {
        System.out.println("[Get-Report] " + event.getPayload()); // do something with this report
    }
    // ...
}
```
### 创建Http API

我们允许集成设置自己的Http路由，用于自定义的前端调用，或者作为Webhook的入口。

这里我们实现一个返回在线设备数量的Http接口 `GET /[integration-id]/active-count`。


:::warning
为了防止不同集成和系统的路由冲突，集成的URL地址应该以集成名开头，如：
* **/[integration-id]**/foo
* **/[integration-id]**/foo/bar
* **/[integration-id]**/bar
:::


创建一个Java类`MyIntegrationController.java`，在这个类中添加Controller，接收请求。

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


## （可选）测试你的集成

**在`beaver-iot-integrations`项目中**，将你的集成模块重新install:
```shell
mvn install -DskipTests -Ddeploy.skip
```


**进入`beaver-iot`项目**，确保你的集成已经加入到`application/application-standard`的依赖列表dependencies中，并且重新启动它。

### 注册用户
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


### 登陆用户

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

返回的数据如下
```json
{
    "data": {
        // highlight-next-line
        "access_token":"***.****.***",
        "refresh_token":"***",
        "token_type":"Bearer",
        "expires_in":86399
    },
    "status":"Success"
}
```

将其中的`access_token`记录下来
```shell
access_token=***.****.***
```

### 获取集成信息

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

### 添加设备

设备的ip为`8.8.8.8`，名称为`Test Device`

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

### 搜索设备
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

### 调用Benchmark服务
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

看到控制台有日志输出
```
[Get-Report] {[integration-id].integration.detect_report.offline_count=1, [integration-id].integration.detect_report.consumed_time=5099, [integration-id].integration.detect_report.online_count=1}
```

### 搜索实体
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

### 获取实体值

例如，搜索实体获取到列表，其中`entity_key`为`[integration-id].device.8_8_8_8.status`的id为`1879410769126817793`。

获取这个实体的值：
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

### 删除设备

例如，搜索设备获取到列表，其中刚刚添加的设备id为`1879410769026154498`

删除这个设备
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

可以再次调用设备搜索，检查是否成功删除。
