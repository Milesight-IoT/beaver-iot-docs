---
sidebar_position: 2
---

# 星纵物联网关内置NS集成

Beaver IoT支持通过MQTT与星纵物联LoRaWAN网关内置NS的集成，实现添加设备到网关，获取网关节点设备信息和数据，下行控制节点设备等功能。

## 兼容性

- UG56：v56.0.0.3及以上
- UG65/UG67：v60.0.0.42及以上



## 集成步骤

1. 打开Beaver IoT的**集成**页面选择Milesight Gateway Embedded NS集成插件，点击<b>+添加</b>后自定义网关名称并填写网关的EUI（登录网关配置页面获取），然后点击**下一步**。

   ![Add-gateway](/img/zh/integration-add-gateway.png)

2. 登录网关配置页面，启用内置NS功能。

   ![Gateway-ns-enable-1](/img/zh/gateway-embedded-ns-enable-1.png)

   ![Gateway-ns-enable-2](/img/zh/gateway-embedded-ns-enable-2.png)

3. 在网关的内置NS界面创建一个新应用并保存。

4. 选择上一步创建的应用，将数据传输类型设置为MQTT后将Beaver IoT的信息粘贴到网关后保存。

   ![Gateway-ns-mqtt-config](/img/zh/integration-setup-an-app-1.png)

   ![Gateway-ns-mqtt-config-2](/img/zh/integration-setup-an-app-2.png)

5. 在Beaver IoT点击**下一步**尝试连接网关，如连接成功，进入**选择应用**步骤选择在网关创建的应用ID，然后点击**确认**保存设置。

   ![Choose-an-app](/img/zh/integration-choose-an-app.png)

6. 添加的网关在Beaver IoT显示且状态为在线。



## 添加节点设备

Beaver IoT支持在配置页面添加节点设备时同步添加到网关内置NS。

1. 打开**设备**页面, 点击<b>+添加</b>按钮添加设备。

2. 选择集成为Milesight Gateway Embedded NS并输入自定义的设备名称。

3. 配置节点的相关信息后，选择对应的网关和model（用于指定Codec）。

4. 点击**确认**保存上述设置。

   ![Choose-an-app](/img/zh/integration-gateway-add-end-device.png)



## 同步网关节点设备

Beaver IoT支持从网关内置NS同步节点设备。

1. 在集成配置界面选择对应的网关点击**子设备**图标。

2. 点击**可同步的设备**页签显示可同步的设备。

   :::note

   - 同步前确保节点设备已添加到集成时选择的应用下。
   - 同步时，网关上该设备对应的payload codec会清空，可能会影响网关的数据上报内容和协议集成功能。
     :::

3. 为设备选择对应的model用于指定Codec。

4. 勾选需要同步的设备，点击**同步**。同步后的设备信息会显示在**设备**页面。

   ![Sync-device](/img/zh/integration-sync-device-to-gateway.png)



## 自定义Codec

:::note

该功能仅适用于Beaver IoT V1.3.0之前的版本。如使用V1.3.0以及后续版本，自定义Codec功能请参见**设置>设备蓝图来源管理**。
:::

Beaver IoT支持导入自定义Codec用于第三方节点设备的编码和解码。导入该Codec后，在添加或同步节点设备时，可选择自定义的model。

1. 将Milesight的[Codec仓库](https://github.com/Milesight-IoT/codec)fork至自己的仓库（github, gitlab等）。

2. 打开电脑的命令提示符，使用git clone指令将fork后的仓库复制到本地。以github为例：

   ![codec-copy](/img/integration-codec-clone-copy.png)

   ![codec-git-clone](/img/integration-codec-git-clone.png)

3. 在本地仓库的<b>codec > vendors</b>路径下创建一个第三方供应商的文件夹（示例：vender2）用于存储第三方节点的codec。在该文件夹下，可为每个节点型号单独创建文件夹并增加decoder、encoder和codec文件。

   ![add-codec-vender](/img/integration-add-codec-vender.png)

4. 在第三方供应商文件夹下创建一个device.json文件用于定义产品型号对应的decoder、encoder和codec的文件路径。

   ![add-device-file](/img/integration-add-devices-file.png)

5. 在本地仓库的**codec**路径下打开vendors.json文件，增加自定义的第三方供应商信息。

   ![add-vendor-info](/img/integration-add-vender-info.png)

6. 将上述内容完成并保存后，将代码提交到自己fork的codec仓库。

7. 获取新仓库的release分支的raw地址链接并粘贴到集成的**自定义文件地址**中。

   ![custom-codec-repo](/img/zh/integration-custom-codec-repo.png)

   Github Raw地址示例：

   ```
   https://raw.githubusercontent.com/{username}/{repoName}/{branchName}/
   ```

   Gitlab Raw地址示例：

   ```
   https://{gitlabDomain}/{username}/{repoName}/-/raw/{branchName}/
   ```

   默认地址：

   ```
   https://raw.githubusercontent.com/Milesight-IoT/codec/refs/heads/release/
   ```

   

8. 点击**更新编解码文件**更新该集成使用的codec文件。更新后，即可在添加或同步节点设备时选择自定义的model。

   ![update-codec](/img/zh/integration-update-codec.png)

