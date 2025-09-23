---
sidebar_position: 3
---

# MQTT Device Integrated

Beaver IoT supports working as an MQTT broker to connect with Milesight devices or third-party devices, to get the device information and data. 



## Compatibility

- Any MQTT device: the report content is in JSON format, and supports configuring the uplink topic.



## Device Template Management

Beaver IoT supports parsing data formats from devices with different reporting formats into entities using device templates, facilitating subsequent data visualization or management.

### Add Template

1. Go to **Integration** page of Beaver IoT platform to select MQTT Device Integrated integration, then go to **Device template management** tab and click <b>+Add</b> to add a new template.

2. Fill in a unique template name and a uplink topic for device to report, then click the copy icon to save this topic.

3. Configure the device entity definition and remark, click **Confirm** to save this template.

   ![add-mqtt-device-template](/img/en/add-mqtt-device-template.png)

   | Parameter                | Description                                                  |
   | ------------------------ | ------------------------------------------------------------ |
   | Device template name     | This name must be unique and may only contain these characters: A-Z, a-z, 0-9, “_”, “@”, “#”, “$”, “-”, “/”, “[”, “]” |
   | Device topic             | When filling in this topic, it must begin with “/”. The preceding part of this topic is fixed content and cannot be modified, please copy it  in its entirety. |
   | Device entity definition | Parse the reported data into distinct entities.              |
   | Remark                   | Optional field.                                              |

   Report example：

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

   Corresponding device template：

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

   Template parameter：

   | Parameter        | Required | Description                                                  |
   | ---------------- | -------- | ------------------------------------------------------------ |
   | definition       | Yes      |                                                              |
   | &nbsp;&nbsp;&nbsp;&nbsp;input            | Yes      | Define the JSON format of the uplink content                 |
   | &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;type             | Yes      | The value is fixed as object                                 |
   | &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;properties       | Yes      |                                                              |
   | &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;key              | Yes      | JSON data item name                                          |
   | &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;type             | Yes      | JSON data type，Options: object, long, double, boolean, string |
   | &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;required         | No       | Whether is key definitely be reported，Options: true, false  |
   | &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;entity_mapping   | No       | The identifier value mapped to the entity                    |
   | &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;is_device_id     | No       | Whether this key value is device id, Options:：true, false   |
   | &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;is_device_name   | No       | Whether this key value is device name Options: true, false   |
   | &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;properties       | No       | When the key type is object, the define the next level parameters |
   | &nbsp;&nbsp;&nbsp;&nbsp;output           | No       | Define the JSON format of the downlink content               |
   | &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;type             | Yes      | The value is fixed as object                                 |
   | &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;properties       | Yes      |                                                              |
   | &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;key              | Yes      | JSON data item name                                          |
   | &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;type             | Yes      | JSON data type，Options: object, long, double, boolean, string |
   | &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;entity_mapping   | No       | The identifier value mapped to the entity                    |
   | &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;value            | No       | The fixed value of this key                                  |
   | &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;properties       | No       | When the key type is object, the define the next level parameters |
   | initial_entities | Yes      | Define the format of device entities                         |
   | &nbsp;&nbsp;&nbsp;&nbsp;identifier       | Yes      | Entity unique identifier                                     |
   | &nbsp;&nbsp;&nbsp;&nbsp;name             | Yes      | Entity name                                                  |
   | &nbsp;&nbsp;&nbsp;&nbsp;value_type       | Yes      | Entity data type，Options: object, long, double, boolean, string |
   | &nbsp;&nbsp;&nbsp;&nbsp;type             | Yes      | Entity type，Options: property, service, event               |
   | &nbsp;&nbsp;&nbsp;&nbsp;access_mod       | Yes      | Type of access，Options: R，W，RW                            |
   | &nbsp;&nbsp;&nbsp;&nbsp;attributes       | No       | Entity attributes                                            |
   | &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;unit             | No       | Unit                                                         |
   | &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;fraction_digits  | No       | Decimal places, double type use only                         |
   | &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;max              | No       | Maximum value, long or double type use only                  |
   | &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;min              | No       | Minimum value, long or double type use only                  |
   | &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;max_length       | No       | Maximum length, string type use only                         |
   | &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;min_length       | No       | Minimum length, string type use only                         |
   | &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;enum             | No       | Enumeration values，the value is a list which the format is `key: value` |
   | &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;format           | No       | When the value is `HEX`, the content is HEX characters; when the value is `IMAGE: BASE64` or `IMAGE: URL`, the content is picture |
   | &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;default_value    | No       | default value                                                |
   | &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;optional         | No       | Options: true, false                                         |
   | &nbsp;&nbsp;&nbsp;&nbsp;children         | No       | Children entity list                                         |

   


### Test Template

1. Select the desired template, click **Test Data** icon.
2. Enter the JSON format report data example on the left, or click **Generate simulated data**.
3. Click **Simulation report**, the test result will display on the right.

![mqtt-device-template-test](/img/en/mqtt-template-test.png)



### Edit Template

Select the desired template, click **Edit** icon to edit the template.

:::note
After adding the template, it is not suggested to modify the entity definition content, as this may cause the Beaver IoT to fail to parse it correctly and result in anomalies in existing entities.
:::

![edit-mqtt-device-template](/img/en/edit-mqtt-template.png)



### Delete Template

:::note
When deleting templates, the associated device and all its data will be deleted simultaneously. 
:::

**Delete a template**：Click **Delete** icon of desired template to delete this template.

![delete-mqtt-device-template](/img/en/delete-mqtt-template.png)

**Delete template in bulk**: Check the boxes of desired templates, click **Delete** button at the top to delete these templates.

![delete-mqtt-device-template-in-bulk](/img/en/delete-mqtt-template-in-bulk.png)



## Integration Steps

1. Go to **Integration** page of Beaver IoT platform and select MQTT Device Integrated integration to get MQTT broker information.

   ![mqtt-integration-configuration](/img/en/mqtt-integration-configuration.png)

2. Go to configuration page of the MQTT device to configure the MQTT broker information, and paste the device uplink topic from device template (refer to step 2 of **Add Template**) .

   :::note

   Before configuration, ensure the MQTT device is able access the MQTT broker address of the Beaver IoT platform.


   :::

3. Save the settings and ensure the device is connected to Beaver IoT. After connected, Beaver IoT will create the device and corresponding entities automatically, which can be found on the relevant pages. 

   

