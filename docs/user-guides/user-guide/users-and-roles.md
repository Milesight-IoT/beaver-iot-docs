---
sidebar_position: 7
---

# 用户和角色
## 用户

Beaver IoT的超级管理员账号支持创建和管理子用户账号。

### 添加用户

1. 打开<b>用户与角色 > 用户</b>页面, 点击<b>+添加</b>添加账号。
2. 输入用户名、邮箱并为该账号设置密码。

3. 点击<b>确认</b>保存上述设置。

   ![Add-user](/img/zh/add-user.png)

### 编辑用户

1. 选择需要编辑的用户，点击<b>编辑</b>图标修改用户名和邮箱。

![Edit-user](/img/zh/edit-user.png)

2. 选择需要编辑的用户，点击<b>重置密码</b>图标修改密码。

![Reset-password](/img/zh/reset-user-password.png)

### 删除用户

<b>删除单个用户：</b>选择需要删除的用户，点击<b>删除</b>图标。

![Delete-single-user](/img/zh/delete-single-user.png)

<b>删除批量用户：</b>勾选需要删除的用户，点击上方的<b>删除</b>按钮。

![Delete-user](/img/zh/delete-user.png)



## 角色

Beaver IoT支持创建不同的角色，为子用户分配不同的资源权限。

### 添加角色

1. 打开<b>用户与角色 > 角色</b>页面, 点击<b>+添加</b>按钮添加新角色。
2. 输入自定义的角色名称，点击<b>确认</b>保存设置。

![Add-role](/img/zh/add-role.png)

### 重命名或删除角色

在左边的角色列表选择需要修改的角色，点击如下图标后选择<b>重命名</b>角色名称，或选择<b>删除</b>角色。

![Edit-role](/img/zh/edit-role.png)

### 添加角色成员

1. 在角色列表中选择对应角色, 在<b>成员</b>页面点击<b>+添加</b>按钮添加用户。

![Add-role-member](/img/zh/add-role-member.png)

2. 勾选左边列表的用户添加到右边的选择框，点击<b>确认</b>保存设置。

![Add-member](/img/zh/add-member.png)

### 移除角色用户

<b>移除单个用户：</b>选择需要移除的用户，点击<b>移除</b>图标。

![Remove-single-user](/img/zh/remove-single-user.png)

<b>移除批量用户：</b>勾选需要移除的用户，点击上方的<b>移除</b>按钮。

![Remove-user](/img/zh/remove-user.png)

### 编辑功能权限

Beaver IoT支持管理该角色下成员用户可查看的页面和各个页面能使用的功能。

1. 在角色列表中选择对应角色, 在<b>功能权限</b>页面点击<b>编辑</b>按钮。

2. 在<b>功能页面</b>列表勾选或取消该角色可使用页面的全部权限，或者在<b>权限</b>列表勾选或取消该角色对各个页面的部分权限。

3. 点击<b>保存</b>按钮保存上述设置。可通过登录该角色的成员用户来查看页面权限结果。

   ![Edit-role-permission](/img/zh/edit-role-permission.png)

### 编辑资源权限

Beaver IoT支持管理该角色下成员用户在各个页面可以查看和使用的资源。

1. 在角色列表中选择对应角色, 在<b>资源</b>页面选择对应的资源页面，点击<b>+添加</b>。

![Add-resource](/img/zh/add-resource.png)

2. 勾选左边列表的资源添加到右边的选择框，点击<b>确认</b>保存设置。

:::note

- 添加集成权限时，该集成下的所有设备会自动添加到<b>设备权限</b>列表下，且对应的实体数据会显示在成员用户的<b>实体 > 实体数据</b>界面。
  :::

![Add-resource-permission](/img/zh/add-resource-permission.png)

3. 选择需要移除的资源，点击对应的<b>移除</b>图标移除资源或勾选需要移除的资源，点击上方的<b>移除</b>按钮。

   :::note

   - 在<b>设备权限</b>列表下通过添加集成自动添加的设备无法单独删除，必须删除整个集成才行。
     :::

   ![Remove-resource](/img/zh/remove-resource.png)

