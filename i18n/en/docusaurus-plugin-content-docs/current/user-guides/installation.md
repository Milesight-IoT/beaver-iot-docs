---
sidebar_position: 2
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Installation

1. Install [docker](https://docs.docker.com/engine/install/)(version 20.10 or later).
2. Download and push image:

<Tabs>
  <TabItem value="shell" label="Shell" default>
    ```shell
    docker run -d --name beaver-iot -v $(pwd):/root -p 80:80 -p 1883:1883 milesight/beaver-iot
    ```
  </TabItem>
  <TabItem value="cmd" label="Windows Command Line (CMD)">

    ```shell
    docker run -d --name beaver-iot -v %cd%:/root -p 80:80 -p 1883:1883 milesight/beaver-iot
    ```
  </TabItem>
</Tabs>

It will take about 2 minutes to complete the installation and start the program.

3. Type [http://localhost](http://localhost) in your browser to visit the sign up page to register an account.
4.  Sign in the Beaver IoT platform with your account.
5. Execute below command to check service running status via logs:

    ```shell
    docker logs -f beaver-iot
    ```

:::tip
Please use root account to execute above commands in Linux system. If you do not have root access authority, please use sudo command.
:::

