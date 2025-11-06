---
sidebar_position: 2
---
# Device
## Add Device

Before adding devices, ensure the Beaver IoT is integrated at least one Integration.

### Add a Device

1. Go to **Device** page, click **+Add**.

2. Select the Integration and enter the device name, then configure the parameters according to the integration type (refer to the corresponding integration documentation in details) . 

:::note

- Beaver IoT does not support to add demo devices.
  :::

3. (Optional) Select the device group to add.

3. Click **Confirm** to save the settings.

   ![Add-device](/img/en/add-device-single.png)

### Add Devices in Bulk

1. Go to **Device** page, click **+Batch Add**.
2. Select the Integration, click **Download Template** to get the template file.
3. Type and save the template file.

:::note

- Beaver IoT does not support to add demo devices.
- The template file supports creating new device groups directly by filling in device group parameters.
  :::

4. Upload the template file, click **Confirm** to add devices in bulk.

![Add-device-in-bulk](/img/en/add-device-in-bulk.png)

5. After adding devices in bulk, the addition results will be displayed. If any devices fail to add, you can download a file containing error information to investigate the cause of failure.

## View Device Details

Click **Detail** icon of desired device to view details.

![View-device-detail](/img/en/view-device-detail.png)

To view device details, go to the following tabs:

| Tab               | Description                                                  |
| ----------------- | ------------------------------------------------------------ |
| Basic Information | This tab contains the basic information of this device and supports to modify the device name. |
| Entity Data       | This tab displays the supported property, event and service of this device. |
| Device Canvas     | Add this device or custom entity widget to generate a dedicated dashboard for the device. |

### Device Canvas

1. Click the desired widget button or click **Edit** and then click **+Add widget** to add widgets.

   ![Device-carve](/img/en/device-carve.png)

2. Select the entity which needs to show and customize the name and other parameters of the widget, click **Confirm** to save the setting.

   ![Add-widget-2](/img/add-widget-2.png)

3. Click **Edit** button to achieve below operations of widgets:

   **Edit the widget:** edit the entity, name and other parameters of the widget.

   ![Edit-widget](/img/edit-widget.png)

   **Delete the widget:** delete the widgets.

   ![Delete-widget](/img/delete-widget.png)

   **Adjust the size:** Zoom up or down the widget.

   ![Zoom-widget](/img/zoom-widget.png)

   **Adjust location:** drag the widgets to adjust the layouts of dashboard.

4. Click **Save** to save all settings.

   

## Delete Device

**Delete a device:** Click **Delete** icon of desired device to delete this device.

:::note
If the integration defines the device not support to delete manually, the icon will not display.
:::

![Delete-device](/img/delete-device.png)

**Delete devices in bulk:** check the boxes of desired devices, click **Delete** button at the top to delete these devices. 

![Delete-device-in-bulk](/img/en/delete-device-in-bulk.png)



## Device Group Management

**Add a Device Group**：Click **+** icon to add a new group, enter the group and click **Confirm** to save the settings.

![Add-device-group](/img/en/add-device-group.png)

**Rename and Delete Group**：Select target group, click below icon to rename or delete this group.

![Delete-device-group](/img/en/rename-delete-device-group.png)



## Change Device Group

1. Click **Change Group** icon of desired device, or check the boxes of desired devices, click **Change Group** button at the top. 
2. Select the device group to move, or mark the device as ungrouped. 

![Change-device-group](/img/en/change-device-group.png)