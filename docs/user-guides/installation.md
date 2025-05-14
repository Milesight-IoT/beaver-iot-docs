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
2. 检查`80`端口和`1883`端口是否被本机的其它服务占用，如果有，请暂停它们。
3. 下载并推送镜像：

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

4. 打开浏览器输入IP地址[http://localhost](http://localhost)进入注册界面注册账号。

:::info
建议将这里的*localhost*替换为当前计算机的IP地址，如果是云服务，请使用公网IP地址。使用*localhost*可能会导致某些页面的信息不准确。
:::

5.  使用新注册的账号登录Beaver IoT平台。
6. 使用如下指令查看日志确认服务运行状态：

    ```shell
    docker logs -f beaver-iot
    ```

:::tip
在Linux系统中，请使用root权限运行上述指令。如果您是非root用户，请使用sudo命令来执行上述指令。

使用前，请检查防火墙设置，确保其它计算机可以访问本机的`80`端口和`1883`端口。
:::

