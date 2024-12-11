# Milesight Development Platform Integration

Beaver IoT has equipped with Milesight Development Platform integration to get device information and achieve the device control quickly.

## Integration Steps

1. Go to the sign up page of [Milesight Development Platform](https://account.milesight.com/register) to register your account. 

2. Log in the Milesight Development Platform and [create an application](https://www.milesight.com/docs/en/development-platform/user-guide/create-an-application.html). 

3. Go to **Setting** page of Beaver IoT platform and select Milesight Development Platform integration, paste the Authentication information (Server Address, Client ID and Client Secret) from the application of Milesight Development Platform and click **Connect**.

   ![Integration-1](/img/en/integration-1.png)

4. Enable the **Webhook** option of both platforms, paste the Secret key from the application of Milesight Development Platform to Beaver IoT, and paste the Webhook URL from Beaver IoT to Milesight Development Platform, then save the settings.

   ![Integration-2](/img/en/integration-2.png)

## Sync Data

Beaver IoT supports to sync data from Milesight Development Platform timely or manually. Before syncing, ensure the [device data storage](https://www.milesight.com/docs/en/development-platform/user-guide/data-storage-setting.html) option is enabled in Milesight Development Platform.

**Timely Sync:** enable the OpenAPI option and set the sync frequency.

![Timely-Sync](/img/timely-sync-data.png)

**Manually Sync:** click **Data synchronization** to sync the data immediately.

![Manually-Sync](/img/manually-sync-data.png)
