---
sidebar_position: 2
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import {
    CodeShellName,
    CodeWinCmdName,
} from '/src/consts';

# Installation

1. Install [docker](https://docs.docker.com/engine/install/)(version 20.10 or later).
2. Check if ports `80` and `1883` are occupied by other services on your server. If yes, please pause these services.
3. <a id="working-dir"></a> Open the command line, navigate to a *working directory*, and execute the following command:

<Tabs>
  <TabItem value={CodeShellName} default>
    ```shell
    docker run -d --name beaver-iot -v $(pwd):/root -p 80:80 -p 1883:1883 milesight/beaver-iot
    ```
  </TabItem>
  <TabItem value={CodeWinCmdName}>

    ```batch
    docker run -d --name beaver-iot -v %cd%:/root -p 80:80 -p 1883:1883 milesight/beaver-iot
    ```
  </TabItem>
</Tabs>

It will take about 2 minutes to complete the installation and start the program.

4. Type [http://[Your-IP-Address]](http://localhost) in your browser to visit the sign  up page to register an account.

:::info
It is recommended to replace **[Your-IP-Address]** with the current server's IP address. If the cloud service is used, please type the public IP address. Using *localhost* may result in inaccurate information on some pages.
:::

5. Log in to the Beaver IoT platform using the newly registered account.
6. Execute below command to check service running status via logs:

    ```shell
    docker logs -f beaver-iot
    ```

:::tip
Please use root account to execute these commands in Linux system. If you do not have root access authority, please use sudo command.

Please check the firewall settings to ensure that other computers can access ports `80` and `1883` on this machine.
:::


# Upgrade

Follow below steps to upgrade the Beaver IoT while **retaining the original application data**:

1. Stop and remove the running Beaver IoT docker.

```shell
docker stop beaver-iot
docker rm beaver-iot
```

2. Pull the latest version of Beaver IoT.

```shell
docker pull milesight/beaver-iot
```

3. Refer to [Step 3](#working-dir) of the installation process, navigate to the original *working directory*, and execute the same startup command.