---
sidebar_position: 24
---

# Dashboard Plugin

## Plugin Introduction

The Dashboard plugin is used to display data of device entities, including historical data, latest data, and entity data operations. The Dashboard plugin allows for customizable display content, supporting various data presentation methods such as tables, charts, and cards.

## Overall Process

1. Log in to the open-source project.
2. Create and develop your own plugin.
3. Connect integration on the settings page.
4. Add your own entity on the device page.
5. Add your plugin on the dashboard page.

## Dashboard Plugin Directory Structure

The plugin directory is located in the `apps\web\src\components\drawing-board\plugin` directory of the project. The internal structure of the plugin is as follows:

```
plugin
├── components              # Base components directory for plugins
│ ├── chart-metrics-select  # Chart metrics selection component
│ ├── chart-time-select     # Chart time selection component
│ ├── entity-select         # Entity single selection component
│ ├── icon-color-select     # Icon color selector component
│ ├── icon-select           # Icon selector component
| ├── input                 # Input box component
| ├── multi-entity-select   # Multi-entity selection component
| ├── select                # Selector component
| ├── switch                # Switch component
| └── index.ts              # Entry file for base components
├── config-plugin           # General plugin configuration dialog, no need to focus on it during plugin development
├── plugins                 # Plugin directory
│ ├── area-chart            # Area chart plugin
| ├── configure             # Plugin form configuration file
| ├── view                  # Plugin preview file
| ├── config.json           # Plugin configuration file
| ├── icon.png              # Plugin icon
│ ├── bar-chart             # Bar chart plugin
│ ├── data-card             # Data card plugin
│ ├── gauge-chart           # Gauge chart plugin
│ ├── horizon-bar-chart     # Horizontal bar chart plugin
│ ├── icon-remaining        # Remaining icon plugin
│ ├── line-chart            # Line chart plugin
│ └── pie-chart             # Pie chart plugin
│ └── radar-chart           # Radar chart plugin
│ └── switch                # Switch plugin
│ └── trigger               # Event trigger plugin
├── render                  # Plugin rendering engine, no need to focus on it during plugin development
├── view-components         # Common UI display components for plugins
├── typings.d.ts            # Plugin type definition file
├── utils.ts                # Plugin utility functions
```

## Development Steps

- Create a new Dashboard plugin directory under `apps\web\src\components\drawing-board\plugin\plugins`.

- After creating your own plugin directory, **the first step is to create a `control-panel` directory and establish an index.ts file within it as the unified entry point. You may omit configure and view components, but `control-panel\index.ts` is mandatory**. A single `control-panel\index.ts` file suffices for both plugin form configuration and configuration preview.

- In extremely exceptional circumstances (not recommended), it is only advised to create a `configure` directory within the project and establish an `index.tsx` file as the unified entry point within this directory when complete customization of the plugin's control panel configuration rendering is required. Under normal circumstances, please refrain from employing this approach.

- After creating `control-panel\index.ts`, configure the `control-panel\index.ts` file's `type`. The `type` serves as the unique identifier for the plugin and must not be duplicated. Avoid simple names to prevent conflicts with other plugins.

- Configure the `control-panel\index.ts` file's `name` attribute and the icon path. The `name` will be displayed as the plugin name in the Dashboard configuration dialog, and the icon will be displayed as the plugin icon in the Dashboard configuration dialog.

- After completing the above steps, you will see your plugin on the Dashboard. However, it will not be usable yet. You need to configure the `configProps` and `view` attributes to make the plugin configurable and displayable. For specific configuration details, please refer to the following instructions.

- Configure other items in `control-panel\index.ts`. All required types in `types.ts` must be filled out, otherwise, it will affect the final plugin effect.

## `Control-panel\index.ts` Configuration Item Description

### Detailed Explanation of `control-panel\index.ts` Configuration Items

| Attribute            | Description                                                                                                                                                                                       | Required                                                                                    | Default | Stored |
| -------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------- | ------- | ------ |
| **name**             | Plugin name, used to display the plugin name in the form                                                                                                                                          | Yes                                                                                         | -       | No     |
| **type**             | Plugin type, used as the unique identifier for the plugin. It must not be duplicated. It is used to find the corresponding configuration file in actual use.                                      | Yes                                                                                         | -       | Yes    |
| **class**            | Plugin category, used to categorize the plugin. When adding a plugin on the dashboard, it will be displayed based on the category. If not filled, it defaults to the "other" category.            | Yes                                                                                         | -       | No     |
| **icon**             | Plugin icon, optional. The value can only be `icon.png` or left blank. It is used to display the plugin icon when adding a plugin on the dashboard. If not filled, the default icon is displayed. | No                                                                                          | -       | No     |
| **defaultCol**       | Default number of columns occupied by the plugin on the dashboard                                                                                                                                 | Yes                                                                                         | -       | No     |
| **defaultRow**       | Default number of rows occupied by the plugin on the dashboard                                                                                                                                    | Yes                                                                                         | -       | No     |
| **minCol**           | Minimum number of columns occupied by the plugin on the dashboard                                                                                                                                 | Yes                                                                                         | -       | No     |
| **minRow**           | Minimum number of rows occupied by the plugin on the dashboard                                                                                                                                    | Yes                                                                                         | -       | No     |
| **maxCol**           | Maximum number of columns occupied by the plugin on the dashboard                                                                                                                                 | Yes                                                                                         | -       | No     |
| **maxRow**           | Maximum number of rows occupied by the plugin on the dashboard                                                                                                                                    | Yes                                                                                         | -       | No     |
| **configProps**      | Configurable properties of the plugin                                                                                                                                                             | Yes                                                                                         | -       | No     |
| **view**             | Display configuration of the plugin on the dashboard                                                                                                                                              | If the `view` file under the plugin has custom configuration, this attribute can be omitted | -       | No     |
| **config**           | The current component has configured value                                                                                                                                                        | No                                                                                          | -       | Yes    |
| **fullscreenable**   | Can it be displayed in fullscreen                                                                                                                                                                 | No                                                                                          | -       | No     |
| **fullscreenIconSx** | Plugin fullscreen icon sx custom style                                                                                                                                                            | No                                                                                          | -       | No     |
| **pos**              | Current plugin position information within the layout                                                                                                                                             | No                                                                                          | -       | Yes    |

**Description of configProps Attributes**

| Attribute           | Description                                  | Type             | Required | Default |
| ------------------- | -------------------------------------------- | ---------------- | -------- | ------- |
| **label**           | Configured tab label                         | ReactNode        | Yes      |         |
| **description**     | Configured tab description                   | ReactNode        | No       |         |
| **controlSetItems** | Configuration items under the configured tab | ControlSetItem[] | Yes      |         |

**Description of configProps.ControlSetItem Attributes**
| Attribute | Description | Type | Required | Default |
| ------------------- | -------------------------------------------- | ---------------- | -------- | ------- |
| **name** | Configuration item name | ReactNode | Yes | |
| **groupName** | Name of the group to which the configuration item belongs | ReactNode | No | |
| **config** | Configuration data for configuration items | BaseControlConfig[] | Yes | |

**Description of ControlSetItem.config.BaseControlConfig Attributes**

| Attribute                 | Description                                    | Type            | Required | Default |
| ------------------------- | ---------------------------------------------- | --------------- | -------- | ------- |
| **type**                  | Configuration form type                        | string          | No       | -       |
| **label**                 | Configuration form label                       | ReactNode       | No       | -       |
| **description**           | Configuration form description                 | ReactNode       | No       | -       |
| **controllerProps**       | Configuration react form hook controller props | ControllerProps | No       | -       |
| **componentProps**        | Configuration form component props             | ComponentProps  | No       | -       |
| **visibility**            | Configuration form should be visible           | Function        | No       | -       |
| **mapStateToProps**       | Configuration form map state to props          | Function        | No       | -       |
| **setValuesToFormConfig** | Configuration form update config data          | Function        | No       | -       |

**Description of view Attributes**

| Attribute         | Description                                                                    | Type                                          | Required | Default |
| ----------------- | ------------------------------------------------------------------------------ | --------------------------------------------- | -------- | ------- |
| **tag**           | HTML tag name                                                                  | string                                        | Yes      |         |
| **props**         | HTML tag attributes                                                            | Record\<string, any\>                         | No       |         |
| **id**            | HTML tag id                                                                    | string                                        | No       |         |
| **content**       | HTML tag content                                                               | string                                        | No       |         |
| **params**        | Parameters bound to the HTML content                                           | string[]                                      | No       |         |
| **showDepended**  | HTML tag display dependencies. Refer to the configuration example for details. | Record\<string, any\>                         | No       |         |
| **children**      | HTML child nodes                                                               | ViewProps[](self-nesting view attributes)     | No       |         |
| **class**         | General class name                                                             | string                                        | No       |         |
| **style**         | General style                                                                  | string                                        | No       |         |
| **styleDepended** | Style dependent on other plugin values                                         | Record\<string, string\>                      | No       |         |
| **themes**        | HTML tag styles                                                                | Record\<'default' \| 'dark', ViewThemeProps\> | No       |         |

### `control-panel\index.ts` Configuration Example

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
