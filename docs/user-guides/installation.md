---
sidebar_position: 2
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import {
    CodeShellName,
    CodeWinCmdName,
} from '/src/consts';

# 安装说明

1. 安装[docker](https://docs.docker.com/engine/install/)(20.10版本或更高)。
2. 下载并推送镜像：

<Tabs>
  <TabItem value={CodeShellName} default>
    ```shell
    docker run -d --name beaver-iot -v $(pwd):/root -p 80:80 -p 1883:1883 milesight/beaver-iot
    ```
  </TabItem>
  <TabItem value={CodeWinCmdName}>

    ```shell
    docker run -d --name beaver-iot -v %cd%:/root -p 80:80 -p 1883:1883 milesight/beaver-iot
    ```
  </TabItem>
</Tabs>

安装过程将持续 2 分钟左右。

3. 打开浏览器输入IP地址[http://localhost](http://localhost)进入注册界面注册账号。
4.  使用新注册的账号登录Beaver IoT平台。
5. 使用如下指令查看日志确认服务运行状态：

    ```shell
    docker logs -f beaver-iot
    ```

:::tip
在Linux系统中，请使用root权限运行上述指令。如果您是非root用户，请使用sudo命令来执行上述指令。
:::

