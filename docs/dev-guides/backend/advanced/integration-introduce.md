---
sidebar_position: 1
toc_min_heading_level: 2
toc_max_heading_level: 5
---

import { IntegrationProjectRepoHttps } from '/src/consts';
import { ProjectName } from '/src/consts';

# 集成构建

## 概述
**集成**是{ProjectName}实现设备连接、设备控制、功能拓展的主要途径，它能够使{ProjectName}和其它软件、设备、第三方平台等交互。
{ ProjectName }平台的集成面向社区共建，促进系统的扩展和集成。
<p>在本章节中，我们将介绍如何使用我们提供的集成开发仓库和环境进行工程构建、开发、调试以及发布的整个过程。</p>

## 工程构建

### 代码仓库

我们提供了一个集成开发的仓库，包含所有已经发布的集成、示例代码以及调试环境，
你可以通过下载<a href={IntegrationProjectRepoHttps} target="_blank" rel="noopener noreferrer">beaver-iot-integrations代码仓库</a>来体验集成开发。

### pom.xml配置 
- **依赖包引入**

  对于集成开发，我们提供了`context`依赖包，用于集成开发的基础功能。通常情况下，我们不需要将`context`打包到集成中，所以我们将其`scope`设置为`provided`。
开发者可引入其他依赖包（{ ProjectName } 平台未引入的包），以满足集成开发的需求。
```xml
    <dependencies>
        <dependency>
            <groupId>com.milesight.beaveriot</groupId>
            <artifactId>context</artifactId>
            <version>${project.version}</version>
            // highlight-next-line
            <scope>provided</scope>
        </dependency>
    </dependencies>
```
:::warning
请注意，为避免依赖冲突和导致包过大，我们建议开发者在引入依赖包时，尽量选择{ ProjectName } 平台已引入的包。对于平台已经引入的包，开发者可设置`scope`设置为`provided`。
:::
- **依赖包版本统一**
  为统一依赖包的版本，{ProjectName} 平台定义了一个`beaver-iot-parent` POM依赖，开发者可在`dependencyManagement`中定义依赖包的版本。
```xml
    <dependencyManagement>
        <dependencies>
          <dependency>
              <groupId>com.milesight.beaveriot</groupId>
              <artifactId>beaver-iot-parent</artifactId>
              <version>${beaver-iot.version}</version>
              <type>pom</type>
              <scope>import</scope>
          </dependency>
        </dependencies>
    </dependencyManagement>
```
:::info
在beaver-iot-integrations工程中，我们已经定义了`beaver-iot-parent`的版本号，因此开发者在集成开发过程中无需特别定义。
:::
- **集成打包**
  需要将集成打包成jar包，以便在{ProjectName}使用。我们建议开发者使用`maven-assembly-plugin`插件进行打包。
```xml
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
```
## 集成开发
### 集成配置
#### 参数说明
集成配置是集成的基础，它包含了集成的基本信息、设备、实体等元数据信息。开发者需要在`resources`目录下创建`integration.yaml`文件，定义集成的配置信息。
|参数名                        |默认值           |是否必填            |描述                |
|---                          |---             |---      |---                |
|id                         |无                 |是    |集成ID                  |
|name                         |无               |是     |集成名称                  |
|icon-url                      |无               |否     |集成图标地址，支持相对路径和绝对路径地址                  |
|description                  |无               |否     |集成描述                 |
|enabled                      |true             |否      |是否启用               |
|entity-identifier-add-device  |无               |否     |添加设备的Entity Identifier,当配置此值则说明当前集成支持设备添加|
|entity-identifier-delete-device |无            |否      |删除设备的Entity Identifier,当配置此值则说明当前集成支持设备删除|
|initial-devices              |无                |否    |初始化的设备实体，具体参见[设备/实体构建章节](entity-definition.md)       |
|initial-entities              |无               |否     |初始化的集成实体，具体参见[设备/实体构建章节](entity-definition.md)            |

:::warning
请注意，集成配置文件中的`id`字段是集成的唯一标识，不可重复。
:::
#### icon-url配置
icon-url支持**相对路径**和**绝对路径**，**相对路径**是相对于集成的根目录的路径，**绝对路径**是引用外部的图片地址。
- **相对路径**示例：`icon-url: /public/my-integration.png`
- **绝对路径**示例：`icon-url: https://www.example.com/my-integration.png`

当使用**相对路径**，开发者需要将图片文件放置在集成的`/resources/static/public`目录下，例如：
```yaml
  my-integration/
  ├── src/
  │ ├── main/
  │ │ └── resources/
  │ │ └──── static/
  │ │ └────── public/
  │ │ └──────── my-integration.png
```
:::tip
为避免资源文件冲突，建议开发者使用包含`integration-id`的名称作为图片文件名
:::

#### 代码示例
- **简单的集成配置示例**
```yaml
integration:
  my-integration: # integration identifier
    name: My Integration Name # integration name
    description: "My Demo Integration" # integration description
```

- **完整的集成配置示例**
```yaml
integration:
  my-integration: # integration identifier
    name: My Integration Name # integration name
    icon-url: /public/my-integration.png # integration icon url
    description: "My Demo Integration" # integration description
    enabled: true # whether enable this integration. Must be "true" for now
    entity-identifier-add-device: add_device # entity identifier for adding device
    entity-identifier-delete-device: delete_device # entity identifier for deleting device
    initial-entities: # initial entities
      - identifier: 'connect' # entity identifier
        name: connect         # entity name
        value_type: object    # entity value type
        type: service         # entity type
        children:             # children entities
          - identifier: 'url'
            name: connectUrl    
            value_type: string
            type: service
```

### 集成生命周期
#### 生命周期说明
{ProjectName}平台提供了`IntegrationBootstrap`接口，用于平台集成的生命周期管理。开发者需要实现`IntegrationBootstrap`接口，重写`onPrepared`、`onStarted`、`onDestroyed`、`onEnabled`方法，以实现集成的生命周期管理。

![General Architecture](/img/zh/integration-lifecycle.svg)

* {ProjectName}启动后首先会初始化应用程序环境
  * 加载所有集成的配置，存入内存中
  * 调用每个集成的`onPrepared`函数

* 将集成的设备和实体持久化
  * 调用每个集成的`onStarted`函数
  * 接下来{ProjectName}程序正式启动运行。
* 集成销毁会调用`onDestroyed`函数

:::tip
应用启动时，每个集成插件的`onPrepared`和`onStarted`都只会执行一遍。

`onEnabled`和`onDisabled`函数是预留的，没有完全实现其功能。目前的行为是，集成在`onStarted`之后会为每一个租户都执行用一遍`onEnabled`。`onDisabled`暂时没有场景会调用。未来{ ProjectName }会让每个租户能够自定义启用或者禁用某些集成，这两个函数的调用场景就会更加明确。
:::

#### 代码示例

- **一个最简单的集成生命周期示例**
```java
@Component
public class MyIntegrationBootstrap implements IntegrationBootstrap {
    @Override
    public void onPrepared(Integration integration) {
      // todo: actions when prepared
    }

    @Override
    public void onStarted(Integration integrationConfig) {
      // todo: actions when started
    }

    @Override
    public void onEnabled(String tenantId, Integration integrationConfig) {
      // todo: actions when enabled
    }

    @Override
    public void onDestroy(Integration integration) {
      // todo: actions when destroyed
    }
}
```
:::tip
{ProjectName}平台根据`IntegrationBootstrap`接口的实现类来发现平台的集成，因此集成开发者必须要实现`IntegrationBootstrap`接口，并将其注入到Spring容器中。
集成包路径需在`com.milesight.beaveriot.integrations`目录下，以确保集成能够被{ProjectName}平台发现，强烈建议开发者使用`com.milesight.beaveriot.integrations.集成标识`作为包路径。
:::

- **完整的集成生命周期示例**
  
  如下示例中，演示在`onPrepared`方法中添加初始化设备，`onStarted`方法中启用定时器，定时从集成平台获取设备状态数据，`onDestroyed`方法中停止定时器
```java
@Component
public class MyIntegrationBootstrap implements IntegrationBootstrap {

    // in this example, we use MyIntegrationDataSyncService to sync data
    @Autowired
    private MyIntegrationDataSyncService myIntegrationDataSyncService;
    
    @Override
    public void onPrepared(Integration integrationConfig) {
        // add initial device
        // highlight-next-line
        Device device = new DeviceBuilder(integrationConfig.getId())
            .name("demoDevice")
            .identifier("demoDeviceIdentifier")
            // highlight-next-line
            .entity(() -> new EntityBuilder()
                .property("parentProperty", AccessMod.W)
                .valueType(EntityValueType.OBJECT)
                .children()
                  .valueType(EntityValueType.STRING)
                  .property("childrenProperty", AccessMod.W)
                  .end()
                .build())
            .build();
      // highlight-next-line
        integrationConfig.addInitialDevice(device);
    }

    @Override
    public void onStarted(Integration integrationConfig) {
        // start the timer for periodic tasks
        myIntegrationDataSyncService.startTimer();
    }

    @Override
    public void onDestroy(Integration integrationConfig) {
        // stop the timer
        myIntegrationDataSyncService.stopTimer();
    }
}
```
:::tip
如上示例采用Builder方式构建设备和实体，这部分内容我们将在[设备/实体构建](entity-definition.md)章节中详细描述
:::
## 集成调试

### 运行调试应用

见[测试集成启动](../build-integration.md#start-app-with-dev-integration)

### 更多自定义
- **自定义数据库**

  默认情况下，{ProjectName}使用H2作为内置数据库，开发者可以在环境变量中配置postgres数据库（或直接修改资源文件`application.yml`），例如：
```shell
DB_TYPE=postgres;
SPRING_DATASOURCE_URL=jdbc:postgresql://<DB_SERVER_HOSTNAME>:<DB_SERVER_PORT>/<DB_NAME>;
SPRING_DATASOURCE_PASSWORD=postgres;
SPRING_DATASOURCE_USERNAME=postgres;
SPRING_DATASOURCE_DRIVER_CLASS_NAME=org.postgresql.Driver
```

:::tip
默认情况下平台采用H2作为内置数据库。为方便开发，可以将`SPRING_H2_CONSOLE_ENABLED`设置为`true`。然后开发者就可以通过`/public/h2-console`路径来访问h2-console进行数据库操作。
:::

## 定制集成前端页面

引入集成后，前端会使用默认的集成页面。页面包括基础的数据展示和管理功能：
* 集成当前实体数据展示
* 允许用户修改可写的属性实体
* 允许用户调用集成的服务实体

如果需要定制集成页面，请移步前端[集成定制](../../frontend/advance/integration.md)
