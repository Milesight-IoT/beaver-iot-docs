---
sidebar_position: 4
---

# 实体
## 自定义实体

Beaver IoT支持新增和管理属性类型的自定义实体用于工作流。

### 新增实体

1. 打开<b>实体 > 自定义实体</b>页面, 点击<b>+添加</b>按钮，或者选择一个已存在的实体点击**复制**图标。

2. 输入自定义的实体名称并填写相关信息。

| 参数     | 描述                                                         |
| -------- | ------------------------------------------------------------ |
| 实体名称 | 实体的名称。                                                 |
| 键       | 实体的唯一标识，添加时系统随机生成默认值，支持修改。         |
| 访问类型 | 实体的访问类型。支持选项：只读，只写，可读可写。             |
| 类型     | 实体的数据类型。支持选项：LONG, DOUBLE, BOOLEAN, STRING, ENUM。 |

3. 点击<b>保存</b>按钮保存上述设置。

   ![Add-entitiy](/img/zh/add-entity.png)

4. 点击<b>编辑</b>图标修改实体的名称。



### 删除实体

**删除单个实体**：选择需要删除的实体，点击对应设备的<b>删除</b>图标。

![Delete-single-entity](/img/zh/delete-single-entity.png)

**删除批量实体**：勾选需要删除的实体，点击上方的<b>删除</b>按钮。

![Delete-entity](/img/zh/delete-entity.png)




## 实体数据

Beaver IoT支持查看平台内所有实体的历史数据并导出CSV格式文件。

### 查看实体数据

点击需要查看的实体的<b>详情</b>图标查看历史数据。

![View-entity-data](/img/zh/view-entity-data.png)



### 导出实体数据

1. 勾选需要导出的实体，点击<b>导出</b>图标。

   ![Export-entity-data](/img/zh/export-entity-data.png)

2. 选择数据的时间范围，点击<b>确认</b>按钮导出数据。

   ![Export-entity-data-range](/img/zh/export-entity-data-range.png)



### 标签管理

1. 勾选目标实体，点击上方的**标签**按钮。
2. 选择给目标实体追加、覆盖、移除或替换标签。
3. 点击<b>确认</b>按钮保存设置。

![entity-tag](/img/zh/add-tag-to-entity.png)
