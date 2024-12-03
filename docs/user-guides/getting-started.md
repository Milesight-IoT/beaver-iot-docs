---
sidebar_position: 3
---

# 快速入门

Beaver IoT默认内置星纵物联开放平台集成，本章节将以该集成为例提供主要操作步骤以帮助您快速熟悉Beaver IoT的功能。使用前请确保Beaver IoT已安装且注册了新账号。

## 步骤1：星纵物联开放平台集成

1. 打开 [注册页面](https://account.milesight.com/register) 注册一个星纵物联开放平台账号。

2. 登录星纵物联开放平台，创建一个[应用](https://www.milesight.com/docs/zh-cn/development-platform/user-guide/create-an-application.html)。

3. 打开Beaver IoT的**Setting**页面选择星纵物联开放平台集成插件，并粘贴星纵物联开放平台里应用的认证信息（服务器地址，客户端ID和客户端密钥），然后点击**Connect**。

   ![Integration-1](/img/zh/integration-1.png)

4. 启用两个平台的**Webhook**功能，将星纵物联开放平台的Webhook密钥粘贴到Beaver IoT, 然后将Beaver IoT的Webhook URL粘贴到星纵物联开放平台，然后保存以上设置。

   ![Integration-2](/img/zh/integration-2.png)


## 步骤2：添加设备

1. 打开**Device**页面, 点击**Add**添加设备。

2. 选择集成Milesight Development Platform并输入自定义的设备名称，保存设置。

:::note
当使用星纵物联开放平台集成时， Beaver IoT支持输入设备SN号将真实设备同时添加到Beaver IoT和星纵物联开放平台。

Beaver IoT不支持添加演示设备。
:::

   ![Add-device](/img/add-device-1.png)

   

## 步骤3：添加仪表盘

1. 打开**Dashboard**页面，点击"+"添加仪表盘。

2. 输入自定义的仪表盘名称，点击**Confirm**保存设置。

![Add-dashboard](/img/add-dashboard.png)

3. 点击需要添加的部件按钮或点击**Edit**按钮，然后点击 **+Add widget**添加部件。

![Add-widget](/img/add-widget.png)

4. 选择部件需要显示的实体并输入自定义的部件名称和其它参数，点击 **Confirm**保存设置。

![Add-widget-2](/img/add-widget-2.png)

5. 点击**Save**保存该仪表盘的所有部件设置。