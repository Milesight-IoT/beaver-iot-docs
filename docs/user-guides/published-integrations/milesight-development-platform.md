---
sidebar_position: 1
---

# 星纵物联开放平台集成

Beaver IoT默认内置星纵物联开放平台集成便于快速对接平台获取设备信息以及实现设备控制。

## 集成步骤

1. 打开 [注册页面](https://account.milesight.com/register) 注册一个星纵物联开放平台账号。

2. 登录星纵物联开放平台，创建一个[应用](https://www.milesight.com/docs/zh-cn/development-platform/user-guide/create-an-application.html)。

3. 打开Beaver IoT的**集成**页面选择Milesight Development Platform集成，并粘贴星纵物联开放平台里应用的认证信息（服务器地址，客户端ID和客户端密钥），然后点击**连接**。

   ![Integration-1](/img/zh/integration-1.png)

4. 启用两个平台的**Webhook**功能，将星纵物联开放平台的Webhook密钥粘贴到Beaver IoT, 然后将Beaver IoT的Webhook URL粘贴到星纵物联开放平台，然后保存以上设置。

   :::note

   - 配置前请确保Beaver IoT支持外网访问。
     :::

   ![Integration-2](/img/zh/integration-2.png)




## 添加设备

Beaver IoT支持添加节点设备时同步添加到星纵物联开放平台。

1. 打开**设备**页面, 点击<b>+添加</b>按钮添加设备。

2. 选择集成为Milesight Development Platform后，输入自定义的设备名称和设备的SN号。

:::note

- Beaver IoT不支持添加演示设备。
  :::

3. 点击**确认**保存上述设置。

![Add-platform-device](/img/zh/integration-platform-add-end-device.png)



## 同步平台数据

Beaver IoT支持从星纵物联开放平台定时或手动同步设备和数据。同步前请确保星纵物联开放平台的设备数据存储功能已启用。

**定时同步:** 启用OpenAPI选项并设置请求频率。

![Timely-Sync](/img/zh/timely-sync-data.png)

**手动同步:** 点击**数据同步**立即同步。

![Manually-Sync](/img/zh/manually-sync-data.png)

