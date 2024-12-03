---
sidebar_position: 3
---

# Getting Started

Beaver IoT has equipped the Milesight Development Platform integration, this topic will take this integration as example to describes the major steps to help you get things up and running quickly. Before using, ensure the Beaver IoT is installed and you have registered a new account for this platform.

## Step 1: Add Integration with Milesight Development Platform

1. Go to the sign up page of [Milesight Development Platform](https://account.milesight.com/register) to register your account. 

2. Log in the Milesight Development Platform and [create an application](https://www.milesight.com/docs/en/development-platform/user-guide/create-an-application.html). 

3. Go to **Integration** page of Beaver IoT platform and select Milesight Development Platform integration, paste the Authentication information (Server Address, Client ID and Client Secret) from the application of Milesight Development Platform and click **Connect**.

   ![Integration-1](/img/en/integration-1.png)

4. Enable the **Webhook** option of both platforms, paste the Secret key from the application of Milesight Development Platform to Beaver IoT, and paste the Webhook URL from Beaver IoT to Milesight Development Platform, then save the settings.

   ![Integration-2](/img/en/integration-2.png)


## Step 2: Add Devices

1. Go to **Device** page, click **Add** to add a device.

2. Select the Integration as Milesight Development Platform, customize the name of the device, and save the settings.

:::note
For Milesight Development Platform integration, Beaver IoT supports to type device SN to add real physical devices to both Milesight Development Platform and Beaver IoT platform together. 

Beaver IoT does not support to add demo devices.
:::

   ![Add-device](/img/add-device-1.png)

## Step 3: Add Dashboard

1. Go to **Dashboard** page, click "+" to add a dashboard.
2. Customize the name of dashboard, click **Confirm** to save the setting.

![Add-dashboard](/img/add-dashboard.png)

3. Click **Edit** and then click **+Add widget** to add widgets.

![Add-widget](/img/add-widget.png)

4. Select the entity which needs to show and customize the name and other parameters of the widget, click **Confirm** to save the setting.

![Add-widget-2](/img/add-widget-2.png)

5. Click **Save** to save all widgets to this dashboard.