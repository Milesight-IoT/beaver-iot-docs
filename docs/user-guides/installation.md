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
2. 检查`80`端口和`1883`端口是否被本机的其它服务占用，如果有，请暂停这些服务。
3. <a id="working-dir"></a> 打开命令行，进入一个*工作目录* ，执行以下命令： 

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

安装过程将持续 2 分钟左右。

4. 打开浏览器输入IP地址[http://[Your-IP-Address]](http://localhost)进入注册界面注册账号。

:::info
建议将这里的<b>[Your-IP-Address]</b>替换为当前服务器的IP地址，如果是云服务，请使用公网IP地址。使用*localhost*可能会导致某些页面的信息不准确。
:::

5.  使用新注册的账号登录Beaver IoT平台。
6. 使用如下指令查看日志确认服务运行状态：

    ```shell
    docker logs -f beaver-iot
    ```

:::tip
在Linux系统中，请使用root权限运行这些指令。如果您是非root用户，请使用sudo命令来执行上述指令。

使用前，请检查防火墙设置，确保其它计算机可以访问本机的`80`端口和`1883`端口。
:::

# 更新升级

如需升级到最新版本且<b>保留原来的应用数据</b>，请参照以下步骤：

1. 停止并删除运行中的Beaver IoT docker。

```shell
docker stop beaver-iot
docker rm beaver-iot
```

2. 拉取最新的Beaver IoT版本。

```shell
docker pull milesight/beaver-iot
```

3. 参考安装的[第3步](#working-dir)，进入原来的*工作目录*，并执行相同的启动指令。
