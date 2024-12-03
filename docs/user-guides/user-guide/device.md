---
sidebar_position: 2
---

# 设备
## 添加设备

添加设备前，请确保Beaver IoT至少连接了一个集成。

1. 打开**Device**页面, 点击**Add**添加设备。

2. 选择对应的集成并输入自定义的设备名称。

:::note
- 当使用星纵物联开放平台集成时， Beaver IoT支持输入设备SN号将真实设备同时添加到Beaver IoT和星纵物联开放平台。
- Beaver IoT不支持添加演示设备。
:::

3. 点击**Confirm**保存上述设置。

   ![Add-device](/img/add-device-1.png)


## 查看设备信息

点击需要查看的设备的**Detail**图标查看设备的具体信息。

![View-device-detail](/img/view-device-detail.png)

查看设备信息可进入以下菜单：

| 菜单              | 描述                               |
| ----------------- | ---------------------------------- |
| Basic Information | 显示设备的基础信息，修改设备名称。 |
| Entity Data       | 显示设备支持的属性、事件和服务。   |

## 删除设备

选择需要删除设备，点击**Delete**图标。

:::note
如果该设备所属的集成不支持手动删除设备，Delete图标不会显示。
:::

![Delete-device](/img/delete-device.png)