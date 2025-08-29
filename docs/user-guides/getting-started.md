---
sidebar_position: 3
---

# 快速入门

本章节将以星纵物联开放平台集成为例提供主要操作步骤以帮助您在没有真实设备的情况下快速熟悉Beaver IoT的功能。使用前请确保Beaver IoT已安装且注册了新账号。

## 步骤1：星纵物联开放平台集成

1. 打开 [注册页面](https://account.milesight.com/register) 注册一个星纵物联开放平台账号。

2. 登录星纵物联开放平台，创建一个[应用](https://www.milesight.com/docs/zh-cn/development-platform/user-guide/create-an-application.html)。

3. 打开Beaver IoT的**集成**页面选择星纵物联开放平台集成插件，并粘贴星纵物联开放平台里应用的认证信息（服务器地址，客户端ID和客户端密钥），然后点击**Connect**。

   ![Integration-1](/img/zh/integration-1.png)

4. 启用两个平台的**Webhook**功能，将星纵物联开放平台的Webhook密钥粘贴到Beaver IoT, 然后将Beaver IoT的Webhook URL粘贴到星纵物联开放平台，然后保存以上设置。

   :::note

   - 配置前请确保Beaver IoT支持外网访问。
     :::

   ![Integration-2](/img/zh/integration-2.png)


## 步骤2：添加设备

1. 在星纵物联开放平台的**应用**页面里添加[演示设备](https://www.milesight.com/development-platform/docs/zh-cn/user-guide/add-device-to-application.html#add-device-to-application__section_ift_kpq_zcc)，并使用[设备调试面板](https://www.milesight.com/development-platform/docs/zh-cn/user-guide/device-simulate-and-debug.html)模拟上报和下发数据。

2. 启用星纵物联开放平台的设备数据存储功能。

3. 打开Beaver IoT的**集成**页面，选择Milesight Development Platform, 点击**数据同步**将开发平台的设备和数据同步到Beaver IoT。同步后的设备将自动添加到**设备**页面。

![Manually-Sync](/img/zh/manually-sync-data.png)



## 步骤3：添加仪表板

1. 打开**仪表板**页面，点击"+"添加仪表板。

2. 输入自定义的仪表板名称，点击**确认**保存设置。

![Add-dashboard](/img/zh/add-dashboard.png)

3. 点击需要添加的组件按钮或点击**编辑**按钮，然后点击 **+添加组件**。

![Add-widget](/img/zh/add-widget.png)

4. 选择组件需要显示的实体并输入自定义的组件名称和其它参数，点击 **确认**保存设置。

![Add-widget-2](/img/zh/add-widget-2.png)

5. 点击**保存**按钮保存该仪表板的所有组件设置。