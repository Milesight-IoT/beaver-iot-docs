---
sidebar_position: 24
---

# Dashboard 插件

## 插件介绍

Dashboard 插件用于展示设备实体的数据，其中包括历史数据、最新数据、实体数据操作等。Dashboard 插件可以自定义展示内容，支持多种数据展示方式，例如表格、图表、卡片等。

## 整体流程

1. 登录开源项目
2. 创建并开发自己的插件
3. 到 setting 页面连接集成
4. 到设备页面添加自己的实体
5. 到 dashboard 页面添加自己的插件

## Dashboard 插件目录结构

插件目录位于工程的 `apps\web\src\components\drawing-board\plugin` 目录中，具体插件内部目录结构如下：

```
plugin
├── components                  # 插件基础组件目录
│   ├── chart-metrics-select    # 图表指标选择组件
│   ├── chart-time-select       # 图表查询时间选择组件
│   ├── entity-select           # 实体单择组件
│   ├── icon-color-select       # icon颜色选择器组件
│   ├── icon-select             # icon选择器组件
|   ├── input                   # 输入框组件
|   ├── multi-entity-select     # 多实体选择组件
|   ├── select                  # 选择器组件
|   ├── switch                  # 开关组件
|   └── index.ts                # 插件基础组件入口文件
├── config-plugin               # 通用插件配置弹框，开发插件无需关注
├── plugins                     # 插件目录
│   ├── area-chart              # 面积图表插件
|       ├── configure           # 插件表单配置文件
|       ├── view                # 插件预览文件
|       ├── config.json         # 插件配置文件
|       ├── icon.png            # 插件图标
│   ├── bar-chart               # 柱状图表插件
│   ├── data-card               # 数据卡片插件
│   ├── gauge-chart             # 仪表盘插件
│   ├── horizon-bar-chart       # 横向柱状图插件
│   ├── icon-remaining          # 余量插件
│   ├── line-chart              # 折线图表插件
│   └── pie-chart               # 饼图图表插件
│   └── radar-chart             # 雷达图图表插件
│   └── switch                  # 开关插件
│   └── trigger                 # 事件触发插件
├──render                       # 插件渲染引擎，开发插件无需关注
├──view-components              # 插件UI显示通用插件
├──typings.d.ts                 # 插件类型定义文件
├──utils.ts                     # 插件工具函数
```

## 开发步骤

- 在 `apps\web\src\components\drawing-board\plugin\plugins` 下创建一个新的 Dashboard 插件目录。

- 在创建了自己的插件目录后，**第一件事是创建 `control-panel` 目录，并在 `control-panel` 目录下创建 index.ts 文件作为统一入口，可以没有 configure，没有 view，但一定要有 `control-panel\index.ts`**，一个 `control-panel\index.ts` 就能够完成插件的表单配置 + 配置预览。

- 在极特殊情况下（不推荐），仅当需要完全自定义插件（plugin）的控制面板的配置渲染时，才建议在项目中创建 `configure` 目录，并在 `configure` 目录下创建 `index.tsx` 作为统一入口文件。通常情况下，请避免使用该方式。

- 创建 `control-panel\index.ts` 后，配置 `control-panel\index.ts` 文件的 type，type 作为插件的唯一标识使用，不能与其他插件重复，命名上尽量不要太简单，避免跟其他重复。

- 配置 `control-panel\index.ts` 的 name 属性以及 icon 路径，name 作为显示在 Dashboard 配置弹框中的插件名称，icon 作为显示在 Dashboard 配置弹框中的插件图标。

- 完成以上步骤后就可以在 Dashboard 上看到自己才插件了，但只是看到，还无法使用，还需要配置 configProps 以及 view 属性，才能使插件能够进行配置以及显示，具体配置参考以下说明。

- 配置 `control-panel\index.ts` 其他配置项，types.ts 必填类型的必须都要填写，否则会影响最终的插件效果。

## `control-panel\index.ts` 配置项说明

### `control-panel\index.ts` 配置项详解

| 属性名               | 描述                                                                                                                   | 必填项                                       | 默认值 | 必存储 |
| -------------------- | ---------------------------------------------------------------------------------------------------------------------- | -------------------------------------------- | ------ | ------ |
| **name**             | 插件名，用于在表单中展示插件名                                                                                         | 是                                           | -      | 否     |
| **type**             | 插件类型，作为插件的唯一标识，不可重复，在实际使用中通过该 type 值来找到对应的配置文件。                               | 是                                           | -      | 是     |
| **class**            | 插件分类，作为插件的分类，用于在 dashboard 点击添加插件时，根据分类展示插件显示的位置，未填写时候默认显示在 other 类别 | 否                                           | -      | 否     |
| **icon**             | 插件图标，非必填，值只能为 icon.png，或者不填，用于在 dashboard 点击添加插件时，展示插件的图标，未填写时显示默认图标   | 否                                           | -      | 否     |
| **defaultCol**       | 插件在 dashboard 中默认占用的列数                                                                                      | 是                                           | -      | 否     |
| **defaultRow**       | 插件在 dashboard 中默认占用的行数                                                                                      | 是                                           | -      | 否     |
| **minCol**           | 插件在 dashboard 中最小占用的列数                                                                                      | 是                                           | -      | 否     |
| **minRow**           | 插件在 dashboard 中最小占用的行数                                                                                      | 是                                           | -      | 否     |
| **maxCol**           | 插件在 dashboard 中最大占用的列数                                                                                      | 是                                           | -      | 否     |
| **maxRow**           | 插件在 dashboard 中最大占用的行数                                                                                      | 是                                           | -      | 否     |
| **configProps**      | 配置插件可配置项                                                                                                       | 是                                           | -      | 否     |
| **view**             | 配置插件在 dashboard 上的展示配置                                                                                      | 插件下的 view 文件有自定义配置该配置项可不填 | -      |
| **config**           | 插件表单配置值                                                                                                         | 否                                           | -      | 是     |
| **fullscreenable**   | 是否可全屏                                                                                                             | 否                                           | -      | 否     |
| **fullscreenIconSx** | 全屏图标样式类型                                                                                                       | 否                                           | -      | 否     |
| **pos**              | 插件在布局中的位置信息                                                                                                 | 否                                           | -      | 是     |

**ConfigProps 配置说明**

| 属性名              | 描述                 | 类型             | 必填项 | 默认值 |
| ------------------- | -------------------- | ---------------- | ------ | ------ |
| **label**           | 配置标签页的名称     | ReactNode        | 是     |        |
| **description**     | 配置标签页的描述信息 | ReactNode        | 否     |        |
| **controlSetItems** | 配置标签页下的配置项 | ControlSetItem[] | 是     |        |

**ConfigProps.ControlSetItem 配置说明**
| 属性名 | 描述 | 类型 | 必填项 | 默认值 |
| ------------------- | -------------------------------------------- | ---------------- | -------- | ------- |
| **name** | 配置项名称 | ReactNode | 是 | |
| **groupName** | 配置项所属分组名称 | ReactNode | 否 | |
| **config** | 配置表单项详细配置数据 | BaseControlConfig[] | 是 | |

**Description of ControlSetItem.config.BaseControlConfig Attributes**

| 属性名                    | 描述                                               | 类型            | 必填项 | 默认值 |
| ------------------------- | -------------------------------------------------- | --------------- | ------ | ------ |
| **type**                  | 配置表单项类型                                     | string          | 否     | -      |
| **label**                 | 配置表单项类型名称                                 | ReactNode       | 否     | -      |
| **description**           | 配置表单项类型的描述                               | ReactNode       | 否     | -      |
| **controllerProps**       | 配置表单项 react form hook 控制属性                | ControllerProps | 否     | -      |
| **componentProps**        | 配置表单项组件属性                                 | ComponentProps  | 否     | -      |
| **visibility**            | 配置表单项是否显示                                 | Function        | 否     | -      |
| **mapStateToProps**       | 配置表单项属性状态映射，根据当前表单值动态更新配置 | Function        | 否     | -      |
| **setValuesToFormConfig** | 配置表单项更新表单值                               | Function        | 否     | -      |

**view 配置说明**

| 属性名            | 描述                              | 类型                                         | 必填项 | 默认值 |
| ----------------- | --------------------------------- | -------------------------------------------- | ------ | ------ |
| **tag**           | html 标签名称                     | string                                       | 是     |        |
| **props**         | html 标签属性                     | Record\<string, any\>                        | 否     |        |
| **id**            | html 标签 id                      | string                                       | 否     |        |
| **content**       | html 标签内容                     | string                                       | 否     |        |
| **params**        | html 内容绑定的参数变量           | string[]                                     | 否     |        |
| **showDepended**  | html 标签显示依赖，可参考配置示例 | Record\<string, any\>                        | 否     |        |
| **children**      | html 子节点                       | ViewProps[](view 属性自身嵌套)               | 否     |        |
| **class**         | 通用类名                          | string                                       | 否     |        |
| **style**         | 通用样式                          | string                                       | 否     |        |
| **styleDepended** | 依赖其他插件值的样式              | Record\<string, string\>                     | 否     |        |
| **themes**        | html 标签风格                     | Record\<'default' \| 'dark, ViewThemeProps\> | 否     |        |

### `control-panel\index.ts` 配置示例

```
/**
 * The Image Control Panel Config
 */
const imageControlPanelConfig = (): ControlPanelConfig<ImageConfigType> => {
    return {
        class: 'data_card',
        type: 'image',
        name: 'image',
        icon: ImageIcon,
        defaultRow: 4,
        defaultCol: 4,
        minRow: 1,
        minCol: 2,
        maxRow: 12,
        maxCol: 12,
        configProps: [
            {
                label: 'image config',
                controlSetItems: [
                    {
                        name: 'input',
                        config: {
                            type: 'Input',
                            label: t('common.label.title'),
                            controllerProps: {
                                name: 'label',
                                defaultValue: 'Title',
                                rules: {
                                    maxLength: 35,
                                },
                            },
                        },
                    },
                    {
                        name: 'radio',
                        config: {
                            type: 'ToggleRadio',
                            controllerProps: {
                                name: 'dataType',
                                defaultValue: 'entity',
                            },
                            componentProps: {
                                options: [
                                    {
                                        label: t('common.label.select_entity'),
                                        value: 'entity',
                                    },
                                    {
                                        label: t('common.label.local_upload'),
                                        value: 'upload',
                                    },
                                    {
                                        label: t('common.label.url'),
                                        value: 'url',
                                    },
                                ],
                            },
                        },
                    },
                    {
                        name: 'entitySelect',
                        config: {
                            type: 'EntitySelect',
                            label: t('common.label.entity'),
                            controllerProps: {
                                name: 'entity',
                                rules: {
                                    required: true,
                                },
                            },
                            componentProps: {
                                required: true,
                                entityType: ['PROPERTY'],
                                entityValueType: ['STRING', 'LONG', 'DOUBLE', 'BOOLEAN'],
                                entityAccessMod: ['R', 'RW'],
                            },
                            visibility(formData) {
                                return (
                                    !formData?.dataType || Boolean(formData?.dataType === 'entity')
                                );
                            },
                        },
                    },
                    {
                        name: 'upload',
                        config: {
                            type: 'Upload',
                            controllerProps: {
                                name: 'file',
                                rules: {
                                    required: true,
                                },
                            },
                            componentProps: {
                                label: t('common.label.upload_image'),
                                multiple: false,
                                required: true,
                                matchExt: true,
                            },
                            visibility(formData) {
                                return Boolean(formData?.dataType === 'upload');
                            },
                        },
                    },
                    {
                        name: 'input',
                        config: {
                            type: 'Input',
                            label: t('common.label.url'),
                            controllerProps: {
                                name: 'url',
                                rules: {
                                    required: true,
                                    pattern: {
                                        value: /^https?:\/\//,
                                        message: t('valid.input.url'),
                                    },
                                },
                            },
                            componentProps: {
                                required: true,
                                placeholder: t('common.placeholder.input'),
                            },
                            visibility(formData) {
                                return Boolean(formData?.dataType === 'url');
                            },
                        },
                    },
                ],
            },
        ],
    };
};

```
