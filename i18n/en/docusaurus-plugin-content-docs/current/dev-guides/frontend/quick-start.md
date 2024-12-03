---
sidebar_position: 1
---

import CodeBlock from '@theme/CodeBlock';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import { DevFrontEndRepoSSH, DevFrontEndRepoHttps } from '/src/consts';


# Quick Start

## Online Experience

Demo URL: [Beaver IoT Demo](https://demo.beaver-iot.com/)

## Prerequisites

- Pnpm version 8 or above;
- Node.js version 20 or above;

:::tip Tip
If your local Pnpm and Node.js versions meet the requirements, you can skip steps 1 and 2.
:::

### 1. Install Pnpm

```bash
curl -fsSL https://get.pnpm.io/install.sh | sh -
```

Refer to the [Pnpm Installation Documentation](https://pnpm.io/installation).

### 2. Install Node

```bash
# Install the LTS version of Node.js
pnpm env use --global lts
```

Refer to the [Pnpm Node.js Environment Management Documentation](https://pnpm.io/cli/env).

### 3. Clone the Repository

Generate an SSH Key (skip if you already have one):

```bash
# Press "Enter" for all prompts
ssh-keygen -t rsa -C "your_email@milesight.com"

# Copy the public key
# Git Bash on Windows
cat ~/.ssh/id_rsa.pub | clip

# Mac
cat ~/.ssh/id_rsa.pub | pbcopy
```

Add the generated and copied SSH public key to Github under `Settings -> SSH and GPG keys -> SSH Keys`. Then, you can clone the project to your local machine without a password:

# Clone the repository
<Tabs>
  <TabItem value="SSH" label="SSH" default>
    <CodeBlock language="bash">git clone {DevFrontEndRepoSSH}</CodeBlock>
  </TabItem>
  <TabItem value="Https" label="Https">
    <CodeBlock language="bash">git clone {DevFrontEndRepoHttps}</CodeBlock>
  </TabItem>
</Tabs>

# Navigate to the project directory
cd beaver-iot-web

# Configure the commit username and email
# Skip if already configured locally
# Add --global parameter to modify globally
git config user.name xxx
git config user.email xxx@milesight.com
```

## Start and Run

Execute the following commands:

```bash
# Navigate to the project directory
cd beaver-iot-web

# Install dependencies
pnpm install

# Start the project
pnpm run start
```

:::warning Note
The project is configured with a demo environment interface proxy by default. After starting, you can log in and operate using the demo account. If you need to switch to another environment (e.g., connecting to a local backend service), refer to the [Environment Variables](./development/env.md) documentation for adjustments.
:::
