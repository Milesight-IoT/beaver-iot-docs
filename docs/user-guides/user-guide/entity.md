---
sidebar_position: 4
---

# 实体
## 自定义实体

Beaver IoT支持新增和管理属性类型的自定义实体用于工作流。

### 新增实体

1. 打开<b>Entity > Custom Entity</b>页面, 点击<b>Add</b>添加实体。

2. 输入自定义的实体名称并填写相关信息。

| 参数           | 描述                                                         |
| -------------- | ------------------------------------------------------------ |
| Entity Name    | 实体的名称。                                                 |
| Key            | 实体的唯一标识，添加时系统随机生成默认值，支持修改。         |
| Type of Access | 实体的访问类型。支持选项：R（只读），W（只写），RW（可读可写）。 |
| Data Type      | 实体的数据类型。支持选项：LONG, DOUBLE, BOOLEAN, STRING。    |

3. 点击<b>Save</b>保存上述设置。

   ![Add-entitiy](/img/add-entity.png)

4. 点击<b>Edit</b>图标修改实体的名称。



### 删除实体

删除单个实体：选择需要删除的实体，点击对应设备的<b>Delete</b>图标。

![Delete-single-entity](/img/delete-single-entity.png)

删除批量实体：勾选需要删除的实体，点击上方的<b>Delete</b>按钮。

![Delete-entity](/img/delete-entity.png)




## 实体数据

Beaver IoT支持查看平台内所有实体的历史数据并导出CSV格式文件。

### 查看实体数据

点击需要查看的实体的<b>Detail</b>图标查看历史数据。

![View-entity-data](/img/view-entity-data.png)



### 导出实体数据

1. 勾选需要导出的实体，点击<b>Export</b>图标。

   ![Export-entity-data](/img/export-entity-data.png)

2. 选择数据的时间范围，点击<b>Confirm</b>导出数据。

   ![Export-entity-data-range](/img/export-entity-data-range.png)

