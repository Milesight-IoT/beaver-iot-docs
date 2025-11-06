---
sidebar_position: 2
---

# Milesight Gateway Embedded NS Integration

Beaver IoT supports the integration with Milesight LoRaWAN gateway embedded network server via MQTT transmission. This enables various features, including adding end devices to gateways, obtaining device information and data, and sending downlinks to control devices.

## Compatibility

- UG56：v56.0.0.3 or later
- UG65/UG67：v60.0.0.42 or later



## Integration Steps

1. Go to **Integration** page of Beaver IoT platform and select Milesight Gateway Embedded NS integration, click **+Add** to customize a gateway, and type the gateway EUI (this can be found on the web GUI of gateway), then click **Next**.

   ![Add-gateway](/img/integration-add-gateway.png)

2. Log in to the web GUI of Milesight gateway to enable embedded NS feature.

   ![Gateway-ns-enable-1](/img/en/gateway-embedded-ns-enable-1.png)

   ![Gateway-ns-enable-2](/img/en/gateway-embedded-ns-enable-2.png)

3. Create a new application on the **Network Server > Application** page of the gateway.

4. Select the application created, set the data transmission type as MQTT, paste the Authentication information from Beaver IoT, and then save the gateway settings.

   ![Gateway-ns-mqtt-config](/img/en/integration-setup-an-app-1.png)

   ![Gateway-ns-mqtt-config-2](/img/en/integration-setup-an-app-2.png)

5. Go back to Beaver IoT page, click **Next** to try to connect to the gateway. If connected, go to step **Choose an App** to select the application ID, then click **Confirm** to save the settings.

   ![Choose-an-app](/img/integration-choose-an-app.png)

6. The gateway will show the status as Online on the Beaver IoT.



## Add End Devices

Beaver IoT supports adding devices to gateway embedded NS while adding devices.

1. Go to **Device** page of Beaver IoT platform, click **+Add** to add a device.

2. Select the integration as **Milesight Gateway Embedded NS**, and fill in a customized device name.

3. Fill in the parameters of the end device, then select the corresponding gateway and the model (to define the payload codec).

4. Click **Confirm** to save the above settings.

   ![Choose-an-app](/img/integration-gateway-add-end-device.png)



## Sync Devices From Gateway

Beaver IoT supports syncing devices from gateway embedded network server.

1. Go to **Integration** page of Beaver IoT platform, click **SubDevice** icon of the target gateway.

2. Click **Synable Devices** tab to check the devices that can be synced.

   :::note

   - Ensure the devices are under the selected application when adding the gateway integration. 
   - When syncing the devices, the payload codec of the corresponding devices on the gateway will be cleared, which will affect the feature of decoding, encoding, and protocol integration. 
     :::

3. Select the model for the target devices to define the payload codec.

4. Check the boxes of target devices, and click **Synchronize**. After synchronization, these devices will display on the **Device** page of Beaver IoT.

   ![Choose-an-app](/img/integration-sync-device-to-gateway.png)



## Custom Codec

:::note
This feature is only available in Beaver IoT versions prior to V1.3.0. For V1.3.0 and later versions, please refer to **Setting > Device Blueprint Source Management** for custom Codec functionality.
:::

Beaver IoT supports importing custom codecs for decoding and encoding of third-party end devices. After import, users can select the customized model when adding or syncing devices. 

1. Fork the [Milesight Codec Repository](https://github.com/Milesight-IoT/codec) to your own repository (Github, Gitlab, etc.).

2. Open the Command Prompt of the computer, use git clone command to copy the forked repository to local path. Take Github as example：

   ![codec-copy](/img/integration-codec-clone-copy.png)

   ![codec-git-clone](/img/integration-codec-git-clone.png)

3. Go to the local repository path <b>codec > vendors</b> to create a vendor folder (example name: vendor2) for the codec of the third-party end devices. Under this folder, create the folders for every product model and add decoder, encoder, and codec files for every model. 

   ![add-codec-vender](/img/integration-add-codec-vender.png)

4. Create a device.json file under the vendor folder to define the decoder, encoder, and codec file paths of every product model.

   ![add-device-file](/img/integration-add-devices-file.png)

5. Go to the local repository path **codec** to open the file **vendors.json** to add the information of the third-party vendor.

   ![add-vendor-info](/img/integration-add-vender-info.png)

6. After the above files are completed and saved, commit and push these contents to your own forked codec repository. 

7. Get the Raw link of the release branch of your own repository, and paste it into **Custom Codec Repo** of the integration.

   ![custom-codec-repo](/img/integration-custom-codec-repo.png)

   Github Raw URL example：

   ```
   https://raw.githubusercontent.com/{username}/{repoName}/{branchName}/
   ```

   Gitlab Raw URL example：

   ```
   https://{gitlabDomain}/{username}/{repoName}/-/raw/{branchName}/
   ```

   Default Raw URL example：

   ```
   https://raw.githubusercontent.com/Milesight-IoT/codec/refs/heads/release/
   ```

   

8. Click **Update Codec corresponding to the product** to update the custom codec. After the update, check if you can select the custom model options when adding or syncing devices.

   ![update-codec](/img/integration-update-codec.png)

