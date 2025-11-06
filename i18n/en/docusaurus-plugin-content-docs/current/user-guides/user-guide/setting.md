---
sidebar_position: 8
---

# Setting
## Enterprise Settings

Beaver IoT supports configuring a SMTP server, enabling the use of this email account to send alerts or notification emails.

![SMTP-server-setting](/img/en/smtp-server-setting.png)



## Credential

Beaver IoT supports configuring credentials for external clients to connect when set up as an MQTT broker or HTTP server.

![MQTT-HTTP-credential](/img/en/mqtt-http-credential.png)



## Device Blueprint Source Management

Beaver IoT supports automatic updates to the official blueprint repository or the import of custom repositories for encoding and decoding on Milesight or third-party node devices.

![Device-blueprint-source-management](/img/en/device-blueprint-source-management.png)

Click **Edit** to select source：

| Source                                   | Description                                                  |
| ---------------------------------------- | ------------------------------------------------------------ |
| Beaver IoT Official Blueprint Repository | Regularly check and update the official blueprint repository for Milesight products. This source must ensure that Beaver IoT can access the GitHub website without any block. |
| Local Upload                             | If Beaver IoT lack access to the GitHub website, please download the repository files from the [official blueprint repository](https://github.com/Milesight-IoT/beaver-iot-blueprint) and upload them locally to the platform. When managing third-party devices, you may also customize repository files and upload them locally to the platform. Locally uploaded repository files must be in ZIP format. |

![Edit-blueprint-source](/img/en/edit-blueprint-source.png)

### Custom Blueprint Repository

Beaver IoT supports importing custom device repository files for encoding and decoding third-party node devices. After importing the repository, when adding or synchronising node devices via the gateway's embedded NS, the custom model may be selected.

1. Download the files from the [official blueprint repository](https://github.com/Milesight-IoT/beaver-iot-blueprint) to a local computer, or fork it to your own repository (GitHub, GitLab, etc.). The basic file structure of the repository is as follows:

   ![Blueprint-path](/img/blueprint-path.png)

2. Open the manifest.yaml file within the official blueprint repository and amend the *minimum_required_beaver_iot_version* to the current Beaver IoT version in use. This ensures the custom repository can be successfully uploaded locally to the Beaver IoT platform.

   ![Manifest-file](/img/manifest-file.png)

3. Create a folder for the third-party vendor (e.g., vendor2) under the <b>devices</b> path in the repository. After creation, open the vendors.yaml file in the same directory and enter the folder path for the third-party vendor. Example: 

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

4. Create separate folders for different product models (e.g., model1, model2) within the third-party vendor folder. Then create a *model.yaml* file containing the product model id, name, and corresponding device template file path. Example:

   ```yaml
   models:
     - id: model1
       name: Model 1
       template: model1/device-template.yaml
     - id: model2
       name: Model 2
       template: model2/device-template.yaml
   ```

5. Within the folder corresponding to the product model, create a device template file named *device-template.yaml* to define the device's data and map it to the entity.

   Example:

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

   Device template parameter:

   | Parameter                                                    | Required | Description                                                  |
   | ------------------------------------------------------------ | -------- | ------------------------------------------------------------ |
   | metadata                                                     | Yes      |                                                              |
   | &nbsp;&nbsp;&nbsp;&nbsp;lora_device_profile_class            | Yes      | Define LoRaWAN device join type and class type               |
   | definition                                                   | Yes      |                                                              |
   | &nbsp;&nbsp;&nbsp;&nbsp;input                                | Yes      | Define the JSON format of the uplink content                 |
   | &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;type         | Yes      | The value is fixed as object                                 |
   | &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;properties   | Yes      |                                                              |
   | &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;key | Yes      | JSON data item name                                          |
   | &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;type | Yes      | JSON data type，Options: object, long, double, boolean, string |
   | &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;required | No       | Whether is key definitely be reported，Options: true, false  |
   | &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;entity_mapping | No       | The identifier value mapped to the entity                    |
   | &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;is_device_id | No       | Whether this key value is device id, Options:：true, false   |
   | &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;is_device_name | No       | Whether this key value is device name Options: true, false   |
   | &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;properties | No       | When the key type is object, the define the next level parameters |
   | &nbsp;&nbsp;&nbsp;&nbsp;output                               | No       | Define the JSON format of the downlink content               |
   | &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;type         | Yes      | The value is fixed as object                                 |
   | &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;properties   | Yes      |                                                              |
   | &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;key | Yes      | JSON data item name                                          |
   | &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;type | Yes      | JSON data type，Options: object, long, double, boolean, string |
   | &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;entity_mapping | No       | The identifier value mapped to the entity                    |
   | &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;value | No       | The fixed value of this key                                  |
   | &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;properties | No       | When the key type is object, the define the next level parameters |
   | initial_entities                                             | Yes      | Define the format of device entities                         |
   | &nbsp;&nbsp;&nbsp;&nbsp;identifier                           | Yes      | Entity unique identifier                                     |
   | &nbsp;&nbsp;&nbsp;&nbsp;name                                 | Yes      | Entity name                                                  |
   | &nbsp;&nbsp;&nbsp;&nbsp;value_type                           | Yes      | Entity data type，Options: object, long, double, boolean, string |
   | &nbsp;&nbsp;&nbsp;&nbsp;type                                 | Yes      | Entity type，Options: property, service, event               |
   | &nbsp;&nbsp;&nbsp;&nbsp;access_mod                           | Yes      | Type of access，Options: R，W，RW                            |
   | &nbsp;&nbsp;&nbsp;&nbsp;attributes                           | No       | Entity attributes                                            |
   | &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;unit         | No       | Unit                                                         |
   | &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;fraction_digits | No       | Decimal places, double type use only                         |
   | &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;max          | No       | Maximum value, long or double type use only                  |
   | &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;min          | No       | Minimum value, long or double type use only                  |
   | &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;max_length   | No       | Maximum length, string type use only                         |
   | &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;min_length   | No       | Minimum length, string type use only                         |
   | &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;enum         | No       | Enumeration values，the value is a list which the format is `key: value` |
   | &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;format       | No       | When the value is `HEX`, the content is HEX characters; when the value is `IMAGE: BASE64` or `IMAGE: URL`, the content is picture |
   | &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;default_value | No       | default value                                                |
   | &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;optional     | No       | Options: true, false                                         |
   | &nbsp;&nbsp;&nbsp;&nbsp;children                             | No       | Children entity list                                         |
   | codec                                                        | Yes      |                                                              |
   | &nbsp;&nbsp;&nbsp;&nbsp;id                                   | Yes      | The value is fixed as default                                |
   | &nbsp;&nbsp;ref                                              | Yes      | device-codec.yaml file path                                  |

   

6. If the third-party devices require encoding/decoding, a *codec* folder must be created within the corresponding product model's directory to store the relevant encoding/decoding files. Additionally, a *device-codec.yaml* file must be created to declare the configuration for the device's encoding/decoding operations, supporting chained invocation. Example:

   ```yaml
   codecs:
     - id: default
       decoder:
         chain:
           - script: am102/codec/decoder.js  #file path
             entry: Decode    #decoder function name
             args:            #decoder function in parameter
               - id: fPort
               - id: bytes
                 is_payload: true  #Whether this parameter is payload
       encoder:
         chain:
           - script: am102/codec/encoder.js  #file path
             entry: Encode    #encoder function name
             args:            #encoder function in parameter
               - id: fPort
               - id: obj
                 is_payload: true   #Whether this parameter is payload
   ```

7. After completing the custom repository files according to the above steps and saving it, package it into a ZIP file and upload it locally to Beaver IoT.
