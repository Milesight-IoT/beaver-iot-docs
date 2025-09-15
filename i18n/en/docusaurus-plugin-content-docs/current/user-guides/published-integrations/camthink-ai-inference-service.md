---
sidebar_position: 4
---

# CamThink AI Inference Service

Beaver IoT supports the integration of CamThink AI inference services to enable image analysis for CamThink devices and model validation on the CamThink platform.



## Integration Steps

1. Ensure the CamThink AI Inference Platform is already deployed.

:::note

- Ensure the Beaver IoT platform is able to access CamThink AI Inference platform.
- It is not recommended to deploy the Beaver IoT platform and the CamThink AI Inference platform on the same server.
  :::

2. Login the CamThink AI Inference platform，go to **Token Management** page to create a Token for external services to call the models within the platform.

:::note
This platform only supports saving the token once during creation. If the token value is lost, it must be recreated.
:::

3. Go to **Integration** page of Beaver IoT platform to select CamThink AI Inference Service integration，fill in the server address of CamThink AI Inference platform and paste the Token，then click **Save**.

4. If the connection status shows connected, Beaver IoT is connected to the CamThink AI Inference platform.

:::note

If connection failure, please check whether the CamThink AI Inference platform address is correct or reachable,  whether the token is enabled, or whether the remaining request times of the token is already 0.


:::

![camthink-integration-configuration.png](/img/en/camthink-integration-configuration.png)



## Model Real-time Inference Service

Beaver IoT supports uploading images manually to test the model's inference performance.

1. Go to **Integration** page of Beaver IoT platform to select CamThink AI Inference Service integration, then go to **Service management** tab to check all models under this token's permission.

2. Select a desired model, upload an image and click **Generate Inference Result**, the inference result will display on the right.

   ![model-inference-service](/img/en/model-inference-service.png)




## Binding Devices

Beaver IoT supports binding CamThink devices to get images and invoke the AI Inference platform service to analyze the data within the images. 

1. Add CamThink devices to the Beaver IoT platform via MQTT Devices Integrated integration.
2. Go to **Integration** page of Beaver IoT platform to select CamThink AI Inference Service integration, then go to **Binding devices** tab to click <b>+Bind Device</b>.
3. Select a CamThink device and an image entity, then select a model, the inference result preview and settings will display on the right.
4. Click **Save** to save the settings.

![bind-camthink-device](/img/en/bind-camthink-device.png)

5. Select a desired device and click **Log** icon to check the historical images and inference results. 

![inference-log](/img/en/inference-log.png)

