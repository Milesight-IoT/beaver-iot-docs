---
sidebar_position: 1
toc_min_heading_level: 2
toc_max_heading_level: 5
---

import { IntegrationProjectRepoHttps } from '/src/consts';
import { ProjectName } from '/src/consts';

# Building Integration

## Overview

**Integration** is the primary means by which {ProjectName} achieves device connectivity, device control, and functionality extension. It enables {ProjectName} to interact with other software, devices, and third-party platforms. {ProjectName} integrations fostering community co-creation and promoting system expansion and integration.
<p>In this chapter, we will introduce the entire process of using our provided integration development repository and environment for project construction, development, debugging, and release.</p>

## Project Construction

### Code Repository

We provide an integration development repository that includes all released integrations, sample code, and debugging environments. You can download the <a href={IntegrationProjectRepoHttps} target="_blank" rel="noopener noreferrer">beaver-iot-integrations code repository</a> to experience integration development.

### pom.xml Configuration
- **Dependency References**

For integration development, we provide the `context` dependency package for basic integration development functions. Typically, we do not need to package `context` into the integration, so we set its `scope` to `provided`. Developers can introduce other dependency packages (not included in the {ProjectName}) as needed for integration development.

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
Please note, to avoid dependency conflicts and duplicate package imports, we recommend developers choose dependency packages already included in the {ProjectName} platform. For packages already included in the platform, developers can set the `scope` to `provided`.
:::
- **Unified Dependency Versions**
To unify dependency versions, the {ProjectName} platform defines a `beaver-iot-parent` POM dependency. Developers can define dependency versions in `dependencyManagement`.
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
In the beaver-iot-integrations project, we have already defined the version number of `beaver-iot-parent`, so developers do not need to define it specifically during integration development.
:::
- **Integration Packaging**
  The integration needs to be packaged into jar packages to be deployed for use at {ProjectName}. We recommend that developers use the `maven-assembly-plugin` plugin for packaging.
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
## Integration Development
### Integration Configuration
#### Parameter Description
Integration configuration is the foundation of the integration, containing basic information, devices, entities, and other metadata. Developers need to create an `integration.yaml` file in the `resources` directory to define the integration configuration.
|Parameter Name               |Default Value   |Required  |Description          |
|---                          |---             |---       |---                  |
|id                           |None            |Yes       |Integration ID       |
|name                         |None            |Yes       |Integration Name     |
|icon-url                     |None            |No        |Integration Icon URL, supports relative and absolute paths|
|description                  |None            |No        |Integration Description|
|enabled                      |true            |No        |Whether Enabled      |
|entity-identifier-add-device |None            |No        |Entity Identifier for adding devices, indicating the integration supports adding devices|
|entity-identifier-delete-device |None         |No        |Entity Identifier for deleting devices, indicating the integration supports deleting devices|
|initial-devices              |None            |No        |Initial device entities, see [Device/Entity Construction Chapter](entity-definition.md)|
|initial-entities             |None            |No        |Initial integration entities, see [Device/Entity Construction Chapter](entity-definition.md)|

:::warning
Please note, the `id` field in the integration configuration file is the unique identifier of the integration and cannot be duplicated.
:::

#### `icon-url` Configuration
The icon-url supports **relative paths** and **absolute paths**. **Relative paths** are relative to the root directory of the integration, while **absolute paths** refer to external image URLs.
- **Relative Path** Example: `icon-url: /public/my-integration.png`
- **Absolute Path** Example: `icon-url: https://www.example.com/my-integration.png`

When using a **relative path**, developers need to place the image file in the `/resources/static/public` directory of the integration, for example:
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
To avoid resource file conflicts, it is recommended that developers use image file names that include the `integration-id`.
:::

#### Code Example
- **Simple Integration Configuration Example**
```yaml
integration:
  my-integration: # integration identifier
    name: My Integration Name # integration name
    description: "My Demo Integration" # integration description
```

- **Complete Integration Configuration Example**
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

### Integration Lifecycle
#### Lifecycle Description
The {ProjectName} platform provides the `IntegrationBootstrap` interface for managing the lifecycle of platform integrations. Developers need to implement the `IntegrationBootstrap` interface and override the `onPrepared`, `onStarted`, `onDestroyed`, and `onEnabled` methods to manage the integration lifecycle.

![General Architecture](/img/en/integration-lifecycle.svg)

* After {ProjectName} starts, it first initializes the application environment
  * Loads all integration configurations into memory
  * Calls the `onPrepared` function for each integration

* Persists the devices and entities of the integration
  * Calls the `onStarted` function for each integration
  * The {ProjectName} program then officially starts running.
* The `onDestroyed` function is called when the integration is destroyed

:::tip
When the application starts, each integration's `onPrepared` and `onStarted` will only execute once.

The `onEnabled` and `onDisabled` functions are reserved and not fully implemented yet. Currently, the behavior is that after `onStarted`, the integration will execute `onEnabled` once for each tenant. The `onDisabled` function is not called in any scenarios for now. In the future, { ProjectName } will allow each tenant to customize the enablement or disablement of certain integrations, at which point the scenarios for calling these two functions will become more defined.
:::

#### Code Example

- **A Simple Integration Lifecycle Example**
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
The {ProjectName} platform discovers platform integrations based on the implementation of the `IntegrationBootstrap` interface. Therefore, integration developers must implement the `IntegrationBootstrap` interface and inject it into the Spring container.
The integration package path should be under the `com.milesight.beaveriot.integrations` directory to ensure that the integration can be discovered by the {ProjectName} platform. It is strongly recommended that developers use the `com.milesight.beaveriot.integrations.{integration-identifier}` package path.
:::

- **Complete Integration Lifecycle Example**
  
The following example demonstrates adding an initial device in the `onPrepared` method, enabling a timer in the `onStarted` method to periodically fetch device status data from the integration platform, and stopping the timer in the `onDestroyed` method.
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
The above example uses the Builder pattern to construct devices and entities, which will be described in detail in the [Device/Entity Construction](entity-definition.md) chapter.
:::
## Integration Debugging

### Running the Debug Application

Refer to [Test Integration Startup](../build-integration.md#start-app-with-dev-integration)

### Further Customization
- **Custom Database Configuration**

  By default, {ProjectName} utilizes H2 as the embedded database. Developers can configure a PostgreSQL database via environment variables (or directly modify the `application.yml` resource file), for example:
```shell
DB_TYPE=postgres;
SPRING_DATASOURCE_URL=jdbc:postgresql://<DB_SERVER_HOSTNAME>:<DB_SERVER_PORT>/<DB_NAME>;
SPRING_DATASOURCE_PASSWORD=postgres;
SPRING_DATASOURCE_USERNAME=postgres;
SPRING_DATASOURCE_DRIVER_CLASS_NAME=org.postgresql.Driver
```

:::tip
By default, the platform uses H2 as the embedded database. For convenience during development, you can set `SPRING_H2_CONSOLE_ENABLED` to `true`. Developers can then access the H2 console via the `/public/h2-console` path for database operations.
:::

## Customizing Integration Frontend Pages

After introducing an integration, the frontend will use the default integration page. This page includes basic data display and management functionalities:
* Displaying the current entity data of the integration
* Allowing users to modify writable entity attributes
* Allowing users to invoke the service entities of the integration

If you need to customize the integration page, please refer to the frontend [Integration Customization](../../frontend/advance/integration.md).
