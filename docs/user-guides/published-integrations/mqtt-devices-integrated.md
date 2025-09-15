---
sidebar_position: 3
---

# MQTT设备集成

Beaver IoT支持作为MQTT服务器对接星纵物联或第三方MQTT设备，获取设备上报的信息和数据。



## 兼容性

- 任意MQTT设备：上报内容为JSON格式，且支持配置上行主题



## 设备模板管理

Beaver IoT可通过设备模板将不同设备上报的数据格式解析为实体，便于后续的数据可视化或管理。

### 添加模板

1. 打开Beaver IoT的**集成**页面选择MQTT Device Integrated集成插件，进入**设备模板管理**页面后点击<b>+添加</b>。

2. 为该模板定义唯一的名称后，设置一个设备主题用于接收设备的上行数据并点击复制图标保存该主题。

3. 配置设备模板和备注等信息后，点击**确认**保存模板。

   ![add-mqtt-device-template](/img/zh/add-mqtt-device-template.png)

   | 参数         | 描述                                                         |
   | ------------ | ------------------------------------------------------------ |
   | 设备模板名称 | 模板名称不能重复，仅支持以下字符：A-Z，a-z，0-9，“_”，“@”，“#”，“$”，“-”，“/”，“[”，“]”。 |
   | 设备主题     | 填写时必须以“/”开头，该主题的前面部分为固定内容不可修改，使用时请完整复制。 |
   | 设备实体定义 | 将MQTT上报的数据解析为不同的实体。                           |
   | 备注         | 可选填写。                                                   |

   上报示例：

   ```json
   {
       "device_id": "24E124710E338704",
       "device_name": "Device 1",
       "temperature": 26.8,
       "humidity": 15.2,
       "status": 1,
       "time": "2025-07-02 15:19:35"
   }
   ```

   对应设备模板：

   ```yaml
   definition:
     input:
       type: object
       properties:
         - key: device_id                 # json key
           type: string                   # data type
           required: true
           is_device_id: true
           entity_mapping: 'device_id'    # entity identifier
         - key: device_name               # json key
           type: string                   # data type
           is_device_name: true
         - key: temperature               # json key
           type: double                   # data type
           entity_mapping: 'temperature'  # entity identifier
         - key: humidity                  # json key
           type: double                   # data type
           entity_mapping: 'humidity'     # entity identifier
         - key: status                    # json key
           type: long                     # data type
           entity_mapping: 'status'       # entity identifier
         - key: time                      # json key
           type: string                   # data type
           entity_mapping: 'time'         # entity identifier
     output:
       type: object
       properties:
         - key: device_id                 # json key
           type: string                   # data type
           entity_mapping: 'device_id'    # entity identifier
         - key: temperature               # json key
           type: double                   # data type
           entity_mapping: 'temperature'  # entity identifier
         - key: humidity                  # json key
           type: double                   # data type
           entity_mapping: 'humidity'     # entity identifier
         - key: status                    # json key
           type: long                     # data type
           entity_mapping: 'status'       # entity identifier
         - key: time                      # json key
           type: string                   # data type
           entity_mapping: 'time'         # entity identifier
   initial_entities:
     - identifier: 'device_id'  # entity identifier
       name: 'device_id'        # entity name
       value_type: string       # entity value type
       type: property           # entity type
       access_mod: R
     - identifier: 'temperature'   # entity identifier
       name: 'temperature'         # entity name
       value_type: double          # entity value type
       type: property              # entity type
       access_mod: R
       attributes:
         unit: '℃'
     - identifier: 'humidity'     # entity identifier
       name: 'humidity'           # entity name
       value_type: double           # entity value type
       type: property             # entity type
       access_mod: R
       attributes:
         unit: '%'
     - identifier: 'status'      # entity identifier
       name: 'status'            # entity name
       value_type: long          # entity value type
       type: property            # entity type
       access_mod: R
       attributes:
         enum:
           0: 'Offline'
           1: 'Online'
     - identifier: 'time'     # entity identifier
       name: 'time'           # entity name
       value_type: string     # entity value type
       type: property         # entity type
       access_mod: R
   ```

   模板参数说明：

   | 参数             | 是否必选 | 描述                                                         |
   | ---------------- | -------- | ------------------------------------------------------------ |
   | definition       | 是       |                                                              |
   | input            | 是       | 定义上行数据的JSON格式                                       |
   | type             | 是       | 固定为object                                                 |
   | properties       | 是       |                                                              |
   | key              | 是       | JSON数据项名称                                               |
   | type             | 是       | JSON数据类型，可选项：object, long, double, boolean, string  |
   | required         | 否       | 是否一定会上报，可选项：true, false                          |
   | entity_mappingg  | 否       | 映射到实体的identifier值                                     |
   | is_device_id     | 否       | 表示这个key是device id, 可选项：true, false                  |
   | is_device_name   | 否       | 表示这个key是device name 可选项：true, false                 |
   | properties       | 否       | 当这个key的数据类型是object时，定义下一级参数                |
   | output           | 否       | 定义下行数据的JSON格式                                       |
   | type             | 是       | 固定为object                                                 |
   | properties       | 是       |                                                              |
   | key              | 是       | JSON数据项名称                                               |
   | type             | 是       | JSON数据类型，可选项：object, long, double, boolean, string  |
   | entity_mappingg  | 否       | 映射到实体的identifier值                                     |
   | value            | 否       | 这个key固定的值                                              |
   | properties       | 否       | 当这个key的数据类型是object时，定义下一级参数                |
   | initial_entities | 是       | 定义设备实体的格式                                           |
   | identifier       | 是       | 实体的标识符                                                 |
   | name             | 是       | 实体的名称                                                   |
   | value_type       | 是       | 实体数据类型，可选项：object, long, double, boolean, string  |
   | type             | 是       | 实体类型，可选项：property, service, event                   |
   | access_mod       | 是       | 实体的访问类型，可选项：R，W，RW                             |
   | attributes       | 否       | 实体属性值                                                   |
   | unit             | 否       | 单位                                                         |
   | fraction_digits  | 否       | 小数位数，仅double类型使用                                   |
   | max              | 否       | 最大值，仅long或double类型使用                               |
   | min              | 否       | 最小值，仅long或double类型使用                               |
   | max_length       | 否       | 最大长度，仅string类型使用                                   |
   | min_length       | 否       | 最小长度，仅string类型使用                                   |
   | enum             | 否       | 枚举映射，值为`key: value`形式的列表                         |
   | format           | 否       | 该值为`HEX`时，内容为Hex字符；该值为`IMAGE: BASE64`或`IMAGE: URL`时，内容为图片 |
   | default_value    | 否       | 默认值                                                       |
   | optional         | 否       | 可选项：true, false                                          |
   | children         | 否       | 子实体列表                                                   |

   


### 测试模板

1. 选择目标设备模板，点击**测试数据**图标。
2. 在左边输入JSON格式的上报数据，或点击**生成模拟数据**。
3. 点击**模拟上报**，模板的解析结果即可显示在右边。

![mqtt-device-template-test](/img/zh/mqtt-template-test.png)



### 修改模板

选择目标模板，点击对应模板的**编辑**图标。

:::note
创建模板后，不建议修改模板内容，否则可能导致平台无法正常解析以及原有的实体异常。
:::

![edit-mqtt-device-template](/img/zh/edit-mqtt-template.png)



### 删除模板

:::note
删除模板时，会同时删除该模板关联的设备和其所有数据。
:::

**删除单个模板**：选择目标模板，点击对应模板的**编辑**图标。

![delete-mqtt-device-template](/img/zh/delete-mqtt-template.png)

**删除批量模板**：勾选目标模板，点击上方的**删除**按钮。

![delete-mqtt-device-template-in-bulk](/img/zh/delete-mqtt-template-in-bulk.png)



## 集成步骤

1. 打开Beaver IoT的**集成**页面选择MQTT Device Integrated集成插件获取MQTT代理服务信息。

   ![mqtt-integration-configuration](/img/zh/mqtt-integration-configuration.png)

2. 登录MQTT设备配置页面，配置MQTT代理服务信息，并将数据上报主题配置为设备模板设置的主题（参见**添加模板**的步骤2）。

   :::note

   配置前，请确保MQTT设备可以访问到Beaver IoT的服务地址。


   :::

3. 保存设备配置并确认设备连接到Beaver IoT后，Beaver IoT会通过模板自动创建对应的设备或实体，可在对应的页面查找。

   

