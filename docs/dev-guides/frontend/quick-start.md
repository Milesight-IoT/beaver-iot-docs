---
sidebar_position: 1
---

import CodeBlock from '@theme/CodeBlock';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import { DevFrontEndRepoSSH, DevFrontEndRepoHttps } from '/src/consts';

# 快速开始

## 前置准备

- Pnpm 8 及以上版本；
- Node.js 20 及以上版本；

:::tip 提示
若本地 Pnpm, Node.js 已满足要求，则以下 1, 2 步骤可跳过。
:::

### 1. 安装 Pnpm

```bash
curl -fsSL https://get.pnpm.io/install.sh | sh -
```

参考 [Pnpm 安装文档](https://pnpm.io/installation)。

### 2. 安装 Node

```bash
# 安装 Node.js 的 LTS 版本
pnpm env use --global lts
```

参考 [Pnpm Node.js 环境管理文档](https://pnpm.io/cli/env)。

### 3. 克隆仓库

生成 SSH Key（如果本地已有，可跳过）：

```bash
# 一路「回车」即可
ssh-keygen -t rsa -C "your_email@milesight.com"

# 拷贝公钥
# Git Bash on Windows
cat ~/.ssh/id_rsa.pub | clip

# Mac
cat ~/.ssh/id_rsa.pub | pbcopy
```

将生成并拷贝的 SSH 公钥，添加到 Github 的 `Settings -> SSH and GPG keys -> SSH Keys` 中。然后，即可免密克隆项目到本地：

# 克隆仓库
<Tabs>
  <TabItem value="SSH" label="SSH" default>
    <CodeBlock language="bash">git clone {DevFrontEndRepoSSH}</CodeBlock>
  </TabItem>
  <TabItem value="Https" label="Https">
    <CodeBlock language="bash">git clone {DevFrontEndRepoHttps}</CodeBlock>
  </TabItem>
</Tabs>

# 进入项目目录
cd beaver-iot-web

# 配置提交的用户名及邮箱
# 若本地已配置，可跳过
# 若需全局修改，可增加 --global 参数
git config user.name xxx
git config user.email xxx@milesight.com
```

## 启动运行

执行命令：

```bash
# 进入项目目录
cd beaver-iot-web

# 安装依赖
pnpm install

# 启动项目
pnpm run start
```

:::warning 注意
项目默认配置了 Demo 环境的接口代理，启动后可使用 Demo 账号登录操作。若需切换其他环境（如：连接本地后端服务）可以参考 [环境变量](./development/env.md) 文档进行调整修改。
:::
