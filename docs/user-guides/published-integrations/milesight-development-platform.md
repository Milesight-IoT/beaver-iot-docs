# 星纵物联开放平台集成

Beaver IoT默认内置星纵物联开放平台集成便于快速对接平台获取设备信息以及实现设备控制。

## 集成步骤

1. 打开 [注册页面](https://account.milesight.com/register) 注册一个星纵物联开放平台账号。

2. 登录星纵物联开放平台，创建一个[应用](https://www.milesight.com/docs/zh-cn/development-platform/user-guide/create-an-application.html)。

3. 打开Beaver IoT的**Setting**页面选择星纵物联开放平台集成插件，并粘贴星纵物联开放平台里应用的认证信息（服务器地址，客户端ID和客户端密钥），然后点击**Connect**。

   ![Integration-1](/img/zh/integration-1.png)

4. 启用两个平台的**Webhook**功能，将星纵物联开放平台的Webhook密钥粘贴到Beaver IoT, 然后将Beaver IoT的Webhook URL粘贴到星纵物联开放平台，然后保存以上设置。

   ![Integration-2](/img/zh/integration-2.png)

   

## 同步平台数据

Beaver IoT支持从星纵物联开放平台定时或手动同步数据。同步前请确保星纵物联开放平台的 [设备数据存储](https://www.milesight.com/docs/zh-cn/development-platform/user-guide/data-storage-setting.html)功能已启用。

**定时同步:** 启用OpenAPI选项并设置请求频率。

![Timely-Sync](/img/timely-sync-data.png)

**手动同步:** 点击**Data synchronization**立即同步数据。

![Manually-Sync](/img/manually-sync-data.png)
