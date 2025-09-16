---
sidebar_position: 4
---

# CamThink AI推理平台服务集成

Beaver IoT支持CamThink AI推理平台服务集成实现CamThink设备的图像解析、CamThink平台模型验证等功能。



## 集成步骤

1. 确保CamThink AI推理平台已部署完成。

:::note

- 请确保Beaver IoT平台能够正常访问到CamThink AI推理平台。
- 不建议将Beaver IoT平台和CamThink AI推理平台部署在同一个服务器。
  :::

2. 登录CamThink AI推理平台，在**Token管理**页面中创建一个Token用于外部服务调用推理平台内的模型。

:::note
该平台仅支持在创建时保存一次Token。如果该Token值丢失，需重新创建。
:::

3. 打开Beaver IoT的**集成**页面选择CamThink AI Inference Service集成，并填写CamThink AI推理平台地址和Token，然后点击**保存**。

4. 如显示已连接，说明Beaver IoT平台已成功对接到CamThink AI推理平台。

:::note

如果连接失败，请确认CamThink AI服务IP地址是否正确或可达，使用的Token是否未启用，Token的可调用API次数是否为0。


:::

![camthink-integration-configuration.png](/img/zh/camthink-integration-configuration.png)



## 模型实时推理服务

Beaver IoT支持手动上传图片来检测模型的推理效果。

1. 打开CamThink AI Inference Service集成的**服务管理**页面，查看该Token权限下所有的模型。

2. 选择一个目标模型，上传一张图片后点击**生成推理结果**，即可在右边显示推理的结果。

   ![model-inference-service](/img/zh/model-inference-service.png)




## 绑定设备

Beaver IoT支持绑定CamThink设备获取图片并调用AI推理平台服务解析图片里的数据。

1. 通过MQTT Devices Integrated集成将CamThink设备添加到Beaver IoT平台。
2. 打开CamThink AI Inference Service集成的**绑定设备**页面，点击 <b>+绑定设备</b>。
3. 选择一个CamThink设备和需要解析的图片实体，然后选择一个模型后，即可在右边显示推理结果预览和参数。
4. 保存上述设置。

![bind-camthink-device](/img/zh/bind-camthink-device.png)

5. 点击目标设备的**日志**图标，即可查看历史上报图片以及推理结果。

![inference-log](/img/zh/inference-log.png)

