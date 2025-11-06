---
sidebar_position: 8
---

# 设置
## 企业设置

Beaver IoT的支持设置邮箱服务器，可使用该邮箱发送各类告警或通知邮件。

![SMTP-server-setting](/img/zh/smtp-server-setting.png)



## 凭证

Beaver IoT支持设置作为MQTT或HTTP服务器时，供外部客户端连接的凭证信息。

![MQTT-HTTP-credential](/img/zh/mqtt-http-credential.png)



## 设备蓝图来源管理

Beaver IoT支持自动更新官方蓝图仓库或导入自定义的仓库用于星纵或第三方节点设备的编码和解码。

![Device-blueprint-source-management](/img/zh/device-blueprint-source-management.png)

点击**编辑**选择来源：

| 来源                   | 描述                                                         |
| ---------------------- | ------------------------------------------------------------ |
| Beaver IoT官方蓝图仓库 | 定期检查并更新星纵产品的官方蓝图仓库，该来源需确保Beaver IoT能正常访问github网站。 |
| 本地上传               | 如Beaver IoT不支持访问到github网站，请在[官方蓝图仓库](https://github.com/Milesight-IoT/beaver-iot-blueprint)下载仓库文件后本地上传到该平台；如需要管理第三方设备时，也可自定义仓库文件并本地上传到该平台。本地上传仓库文件必须为zip格式。 |

![Edit-blueprint-source](/img/zh/edit-blueprint-source.png)

### 自定义蓝图仓库

Beaver IoT支持导入自定义设备仓库文件用于第三方节点设备的编码和解码。导入该仓库后，在通过网关内置NS添加或同步节点设备时，可选择自定义的model。

1. 下载[官方蓝图仓库](https://github.com/Milesight-IoT/beaver-iot-blueprint)文件到本地，或将其fork至自己的仓库（github, gitlab等）。仓库的基本文件结构如下：

   ![Blueprint-path](/img/blueprint-path.png)

2. 打开官方蓝图仓库里的manifest.yaml文件，将最小支持版本修改为当前使用的Beaver IoT版本号，确保自定义仓库能正常本地上传到Beaver IoT平台。

   ![Manifest-file](/img/manifest-file.png)

3. 在仓库的<b>devices</b>路径下创建一个第三方供应商的文件夹（示例：vendor2）用于存储第三方节点的设备模板文件。创建后在相同路径下打开vendors.yaml文件，写入第三方供应商的文件夹路径。示例：

   ```yaml
   vendors:
     - id: milesight-iot
       name: Milesight IoT
       work_dir: devices/milesight-iot
       model_index: models.yaml
     - id: vendor2
       name: Vendor 2  
       work_dir: devices/vendor2  
       model_index: models.yaml
   ```

4. 在第三方供应商文件夹下为不同产品型号分别创建文件夹（如model1, model2），然后创建一个model.yaml文件写入产品型号id, 名称和对应的设备模板文件路径。示例：

   ```yaml
   models:
     - id: model1
       name: Model 1
       template: model1/device-template.yaml
     - id: model2
       name: Model 2
       template: model2/device-template.yaml
   ```

5. 在对应产品型号的文件夹下，创建一个设备模板device-template.yaml文件用于完成设备的数据定义和与实体的映射。

   示例：

   ```yaml
   metadata:
     lora_device_profile_class: ClassA-OTAA   #device class type
   definition:
     input:
       type: object
       properties:
         - key: device_id
           type: string
           required: true
           is_device_id: true
         - key: battery
           type: long
           entity_mapping: battery
         - key: temperature
           type: double
           entity_mapping: temperature
         - key: humidity
           type: double
           entity_mapping: humidity
     output:
       type: object
       properties:
         - key: reboot
           type: boolean
           entity_mapping: reboot
         - key: report_interval
           type: long
           entity_mapping: report_interval
   initial_entities:
     - name: Battery
       type: property
       access_mod: R
       value_type: long
       attributes:
         unit: '%'
       identifier: battery
     - name: Temperature
       type: property
       access_mod: R
       value_type: double
       attributes:
         unit: °C
       identifier: temperature
     - name: Humidity
       type: property
       access_mod: R
       value_type: double
       attributes:
         unit: '%r.h.'
       identifier: humidity
     - name: Reboot
       type: service
       access_mod: W
       value_type: boolean
       attributes:
         enum:
           'false': 'no'
           'true': 'yes'
       identifier: reboot
     - name: Report Interval
       type: property
       access_mod: RW
       value_type: long
       attributes:
         unit: s
       identifier: report_interval
   codec:
     id: default
     ref: am102/codec/device-codec.yaml
   ```

   设备模板参数说明：

   | 参数                                                         | 是否必选 | 描述                                                         |
   | ------------------------------------------------------------ | -------- | ------------------------------------------------------------ |
   | metadata                                                     | 是       |                                                              |
   | &nbsp;&nbsp;&nbsp;&nbsp;lora_device_profile_class            | 是       | 定义LoRaWAN设备入网模式和设备类型                            |
   | definition                                                   | 是       |                                                              |
   | &nbsp;&nbsp;&nbsp;&nbsp;input                                | 是       | 定义上行数据的JSON格式                                       |
   | &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;type         | 是       | 固定为object                                                 |
   | &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;properties   | 是       |                                                              |
   | &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;key | 是       | JSON数据项名称                                               |
   | &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;type | 是       | JSON数据类型，可选项：object, long, double, boolean, string  |
   | &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;required | 否       | 是否一定会上报，可选项：true, false                          |
   | &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;entity_mappingg | 否       | 映射到实体的identifier值                                     |
   | &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;is_device_id | 否       | 表示这个key是device id, 可选项：true, false                  |
   | &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;is_device_name | 否       | 表示这个key是device name 可选项：true, false                 |
   | &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;properties | 否       | 当这个key的数据类型是object时，定义下一级参数                |
   | &nbsp;&nbsp;&nbsp;&nbsp;output                               | 否       | 定义下行数据的JSON格式                                       |
   | &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;type         | 是       | 固定为object                                                 |
   | &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;properties   | 是       |                                                              |
   | &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;key | 是       | JSON数据项名称                                               |
   | &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;type | 是       | JSON数据类型，可选项：object, long, double, boolean, string  |
   | &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;entity_mappingg | 否       | 映射到实体的identifier值                                     |
   | &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;value | 否       | 这个key固定的值                                              |
   | &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;properties | 否       | 当这个key的数据类型是object时，定义下一级参数                |
   | initial_entities                                             | 是       | 定义设备实体的格式                                           |
   | &nbsp;&nbsp;&nbsp;&nbsp;identifier                           | 是       | 实体的标识符                                                 |
   | &nbsp;&nbsp;&nbsp;&nbsp;name                                 | 是       | 实体的名称                                                   |
   | &nbsp;&nbsp;&nbsp;&nbsp;value_type                           | 是       | 实体数据类型，可选项：object, long, double, boolean, string  |
   | &nbsp;&nbsp;&nbsp;&nbsp;type                                 | 是       | 实体类型，可选项：property, service, event                   |
   | &nbsp;&nbsp;&nbsp;&nbsp;access_mod                           | 是       | 实体的访问类型，可选项：R，W，RW                             |
   | &nbsp;&nbsp;&nbsp;&nbsp;attributes                           | 否       | 实体属性值                                                   |
   | &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;unit         | 否       | 单位                                                         |
   | &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;fraction_digits | 否       | 小数位数，仅double类型使用                                   |
   | &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;max          | 否       | 最大值，仅long或double类型使用                               |
   | &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;min          | 否       | 最小值，仅long或double类型使用                               |
   | &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;max_length   | 否       | 最大长度，仅string类型使用                                   |
   | &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;min_length   | 否       | 最小长度，仅string类型使用                                   |
   | &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;enum         | 否       | 枚举映射，值为`key: value`形式的列表                         |
   | &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;format       | 否       | 该值为`HEX`时，内容为Hex字符；该值为`IMAGE: BASE64`或`IMAGE: URL`时，内容为图片 |
   | &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;default_value | 否       | 默认值                                                       |
   | &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;optional     | 否       | 可选项：true, false                                          |
   | &nbsp;&nbsp;&nbsp;&nbsp;children                             | 否       | 子实体列表                                                   |
   | codec                                                        | 是       |                                                              |
   | &nbsp;&nbsp;&nbsp;&nbsp;id                                   | 是       | 固定为default                                                |
   | &nbsp;&nbsp;  ref                                            | 是       | device-codec.yaml文件路径                                    |

   

6. 如第三方设备需要编解码，则需要在对应产品型号的文件夹下创建一个codec文件夹存放该产品对应的编解码文件，并创建一个device-codec.yaml文件声明该设备编解码的流程的调度配置，支持书写链式调用。示例：

   ```yaml
   codecs:
     - id: default
       decoder:
         chain:
           - script: am102/codec/decoder.js  #脚本文件路径
             entry: Decode    #解码函数名称
             args:            #解码函数入参
               - id: fPort
               - id: bytes
                 is_payload: true  #该入参是否为负载
       encoder:
         chain:
           - script: am102/codec/encoder.js  #脚本文件路径
             entry: Encode    #编码函数名称
             args:            #编码函数入参
               - id: fPort
               - id: obj
                 is_payload: true   #该入参是否为负载
   ```

7. 根据上述步骤完成自定义仓库文件并保存后，打包为zip格式的文件本地上传到Beaver IoT上。
