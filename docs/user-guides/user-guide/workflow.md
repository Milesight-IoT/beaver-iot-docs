---
sidebar_position: 6
---

# 工作流
工作流（Workflow）指的是一种用于定义、管理和自动化设备、数据和服务之间交互的逻辑流程。工作流可以将多个预定义的规则或任务串联起来，实现丰富灵活的功能，如阈值告警，定时开关等。

## 新增工作流

1. 打开<b>Workflow</b>页面, 点击<b>+Add</b>添加工作流。

2. 根据需要实现的功能，选择工作流的起始节点，点击<b>Create</b>。

| 起始节点        | 描述                                                         |
| --------------- | ------------------------------------------------------------ |
| Timer           | 定时执行工作流，支持单次定时执行、周期定时执行或间隔执行。示例应用：定时开关 |
| Trigger         | 通过仪表盘的Trigger组件引用触发工作流。示例：按钮开关        |
| Entity Listener | 实体任一数据变化时执行工作流。示例应用：阈值告警             |
| MQTT Listener   | 作为服务器监听MQTT消息来触发工作流的运行。                   |
| HTTP Listener   | 作为服务器监听HTTP请求来触发工作流的运行。                   |

3. 在起始节点后添加其它节点并连接各个节点。
4. 双击编辑各个节点。如需删除节点，可右键需要删除的节点后点击<b>Delete</b>。
5. 点击右上角的<b>Save</b>保存工作流。

![Add-workflow](/img/add-workflow.png)



## 测试和日志

### 测试

<b>工作流测试：</b>点击<b>Test</b>按钮测试节点是否有效以及工作流能否正常运行。

![Workflow-test](/img/workflow-test.png)

<b>节点测试：</b>Webhook, Code和Email Notification节点支持配置后点击<b>Test the Node</b>按钮测试能否正常运行。

![Node-test](/img/node-test.png)



### 日志

<b>运行日志：</b>工作流每次触发时，会自动生成一条运行日志记录运行情况和输入、输出参数等信息。

<b>测试日志：</b>点击<b>Test</b>按钮测试工作流时会显示测试日志记录运行情况和输入、输出参数等信息。

![Workflow-log](/img/workflow-log.png)



## 导出和导入工作流

<b>导出：</b>选择需要导出的工作流，点击<b>Export</b>导出JSON格式的工作流文件。

![Export-workflow](/img/export-workflow.png)

<b>导入：</b>点击<b>Import from DSL</b>后上传工作流文件，点击<b>Confirm</b>保存设置。

![Import-workflow](/img/import-workflow.png)



## 删除工作流

删除单个工作流：选择需要删除的工作流，在<b>Operation</b>菜单点击<b>Delete</b>。

![Delete-single-workflow](/img/delete-single-workflow.png)

删除批量工作流：勾选需要删除的工作流，点击上方的<b>Delete</b>按钮。

![Delete-workflow](/img/delete-workflow.png)

:::note

- 已启用的工作流不可删除。
  :::


## 节点介绍

节点（Node）是构成工作流的基本单元。Beaver IoT支持串联以下节点搭建工作流来实现灵活的应用。

起始类节点：

| 节点            | 描述                                                         |
| --------------- | ------------------------------------------------------------ |
| Timer           | 定时执行工作流，支持单次定时执行、周期定时执行或间隔执行。示例应用：定时开关 |
| Trigger         | 通过仪表盘的Trigger组件引用触发工作流。示例：按钮开关        |
| Entity Listener | 实体任一数据变化时执行工作流。示例应用：阈值告警             |
| MQTT Listener   | 作为服务器监听MQTT消息来触发工作流的运行。                   |
| HTTP Listener   | 作为服务器监听HTTP请求来触发工作流的运行。                   |

外部类节点：

| 节点               | 描述                                                         |
| ------------------ | ------------------------------------------------------------ |
| Email Notification | 基于SMTP协议向指定的邮箱发送邮件通知，邮件标题和内容自定义且支持插入该工作流的变量。发送邮件前，必须配置对应的发送邮箱信息。配置完成后可点击标题旁的Test this Node按钮测试邮件能否正常发送。 |
| Webhook Push       | 推送指定的Payload信息到配置的Webhook URL地址。如Payload为空，则默认推送上个节点的所有输出内容。配置完成后可点击标题旁的Test this Node按钮测试能否正常发送数据。 |
| HTTP Request       | 调用外部的HTTP API。                                         |
| Output             | 输出工作流中的变量值。仅起始节点为Trigger时可用。            |

:::info
如果在<b>Webhook Push</b>节点填写了`SecretKey`，那么在请求头中就会包含以下字段，用于校验此请求来源是否合法：

* `Signature`
* `Timestamp`
* `Nonce`

校验方法: 
* 步骤一： `Payload` = ```Timestamp字符串 + Nonce字符串 + 请求体字符串```
* 步骤二： 使用`SecretKey`和**Hmac256**算法，计算`Payload`的结果，并转为Hex字符串。
* 步骤三： 比较计算结果是否和`Signature`相同，如果相同，就是合法的请求。

:::

动作类节点：

| 节点               | 描述                                                         |
| ------------------ | ------------------------------------------------------------ |
| Entity Assigner    | 将该工作流前面节点的输出参数结果赋值到指定实体上。           |
| Entity Selection   | 选择实体的当前值作为参数传入工作流，用于后面节点的使用。     |
| Service Invocation | 调用实体的服务或其它工作流。                                 |
| Code               | 编写代码实现灵活的数据处理功能， Beaver IoT支持JavaScript (ES6), Python(2.7), Groovy(4.0.26)和MVEL(2.5.2)编程语言。编写代码前，需要定义代码中会使用到的输入参数；如需将代码结果传递到工作流的后续节点，则需定义输出参数。配置完成后可点击标题旁的Test this Node按钮测试代码能否正常运行并输出正确结果。 |

控制类节点：

| 节点    | 描述                                                         |
| ------- | ------------------------------------------------------------ |
| IF/ELSE | 当逻辑条件满足（IF）或不满足（ELSE）时，执行工作流后续节点内容。一个节点支持添加最多5个逻辑条件，一个逻辑条件内支持配置多个子条件并支持“逻辑且”或“逻辑或”关系连接。此外，Beaver IoT支持使用编程语言JavaScript (ES6), Python(2.7), Groovy(4.0.26)和MVEL(2.5.2)来编写逻辑条件。 |

