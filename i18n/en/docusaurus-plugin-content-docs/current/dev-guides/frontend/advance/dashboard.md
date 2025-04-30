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

The plugin directory is located in the `apps/web/src/plugin` directory of the project. The internal structure of the plugin is as follows:

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

- Create a new Dashboard plugin directory under `apps/web/src/plugin/plugins`.

- After creating your plugin directory, **the first thing to do is to create `config.json`. You can skip `configure` and `view`, but you must have `config.json`. A `config.json` alone can complete the plugin's form configuration and preview configuration.**

- After creating `config.json`, configure the `config.json` file's `type`. The `type` serves as the unique identifier for the plugin and must not be duplicated. Avoid simple names to prevent conflicts with other plugins.

- Configure the `config.json` file's `name` attribute and the icon path. The `name` will be displayed as the plugin name in the Dashboard configuration dialog, and the icon will be displayed as the plugin icon in the Dashboard configuration dialog.

- After completing the above steps, you will see your plugin on the Dashboard. However, it will not be usable yet. You need to configure the `configProps` and `view` attributes to make the plugin configurable and displayable. For detailed configuration instructions, refer to [config.json Configuration Item Description](#configjson-configuration-item-description).

- Configure other items in `config.json`. All required types in `typings.d.ts` must be filled out, otherwise, it will affect the final plugin effect.

## config.json Configuration Item Description

### Detailed Explanation of config.json Configuration Items

| Attribute       | Description                                                                                                                                                                                       | Required                                                                                    | Default |
| --------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------- | ------- |
| **name**        | Plugin name, used to display the plugin name in the form                                                                                                                                          | Yes                                                                                         | -       |
| **type**        | Plugin type, used as the unique identifier for the plugin. It must not be duplicated. It is used to find the corresponding configuration file in actual use.                                      | Yes                                                                                         | -       |
| **class**       | Plugin category, used to categorize the plugin. When adding a plugin on the dashboard, it will be displayed based on the category. If not filled, it defaults to the "other" category.            | No                                                                                          | -       |
| **icon**        | Plugin icon, optional. The value can only be `icon.png` or left blank. It is used to display the plugin icon when adding a plugin on the dashboard. If not filled, the default icon is displayed. | No                                                                                          | -       |
| **defaultCol**  | Default number of columns occupied by the plugin on the dashboard                                                                                                                                 | Yes                                                                                         | -       |
| **defaultRow**  | Default number of rows occupied by the plugin on the dashboard                                                                                                                                    | Yes                                                                                         | -       |
| **minCol**      | Minimum number of columns occupied by the plugin on the dashboard                                                                                                                                 | Yes                                                                                         | -       |
| **minRow**      | Minimum number of rows occupied by the plugin on the dashboard                                                                                                                                    | Yes                                                                                         | -       |
| **configProps** | Configurable properties of the plugin                                                                                                                                                             | Yes                                                                                         | -       |
| **view**        | Display configuration of the plugin on the dashboard                                                                                                                                              | If the `view` file under the plugin has custom configuration, this attribute can be omitted | -       |

**Description of configProps Attributes**

| Attribute      | Description                                                | Type                                      | Required | Default |
| -------------- | ---------------------------------------------------------- | ----------------------------------------- | -------- | ------- |
| **title**      | Title of the form plugin                                   | string                                    | No       |         |
| **style**      | Direct style of the plugin, using CSS string configuration | string                                    | No       |         |
| **class**      | Class name of the plugin                                   | string                                    | No       |         |
| **theme**      | Style of the plugin                                        | Record\<'default' \| 'dark', ThemeProps\> | No       |         |
| **components** | Collection of plugins                                      | ComponentProps[]                          | No       |         |

**Description of configProps.component Attributes**

| Attribute          | Description                                                                                                                                                                                                                                                                                                                                                           | Type                                                     | Required | Default  |
| ------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------- | -------- | -------- |
| **type**           | Supports MUI form plugins. The value is consistent with the MUI form plugin name; supports plugins in the components directory. The value is consistent with the plugin name exposed in `index.ts`. If there is a conflict between an MUI plugin name and a plugin name defined in the components directory, the plugin in the components directory takes precedence. | string                                                   | Yes      |          |
| **key**            | Bound field of the plugin                                                                                                                                                                                                                                                                                                                                             | string                                                   | Yes      |          |
| **title**          | Title of the form plugin                                                                                                                                                                                                                                                                                                                                              | string                                                   | No       |          |
| **valueType**      | Value type. Optional types are: string \| number \| boolean \| array \| object                                                                                                                                                                                                                                                                                        | string                                                   | No       | 'string' |
| **defaultValue**   | Default value                                                                                                                                                                                                                                                                                                                                                         | string \| number \| boolean \| Array\<string \| number\> | No       |          |
| **style**          | Style of the plugin                                                                                                                                                                                                                                                                                                                                                   | string                                                   | No       |          |
| **styleDepended**  | Style dependent on other plugin values. Refer to the configuration example for details.                                                                                                                                                                                                                                                                               | Record\<string, string\>                                 | No       |          |
| **componentProps** | Built-in properties of the plugin. The specific configuration depends on the filled type.                                                                                                                                                                                                                                                                             | Record\<string, any\>                                    | No       |          |
| **options**        | Dropdown options configuration                                                                                                                                                                                                                                                                                                                                        | OptionsProps[]                                           | No       |          |
| **rules**          | Validation rules. Refer to the react-hook-form plugin validation rules configuration for details.                                                                                                                                                                                                                                                                     | rulesType                                                | No       |          |

**Description of configProps.theme Attributes**

| Attribute | Description          | Type   | Required | Default |
| --------- | -------------------- | ------ | -------- | ------- |
| **class** | Class name setting   | string | No       | -       |
| **style** | Direct style setting | string | No       | -       |

**Description of configProps.component.options Attributes**

| Attribute   | Description    | Type                | Required | Default |
| ----------- | -------------- | ------------------- | -------- | ------- |
| **label**   | Label          | string              | Yes      | -       |
| **value**   | Value          | string \| number    | No       | -       |
| **options** | Nested options | OptionsProps\<T\>[] | No       | -       |

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

### config.json Configuration Example

```
{
    "type": "trigger",      // Unique identifier for the plugin
    "name": "Trigger",      // Plugin name
    "class": "operate",     // Plugin type
    "icon": "./icon.png",   // Plugin icon
    "defaultRow": 4,        // Default width occupied by the plugin on the Dashboard, 24 divisions
    "defaultCol": 4,        // Default height occupied by the plugin on the Dashboard, 24 divisions
    "minRow": 3,            // Minimum width occupied by the plugin on the Dashboard, 24 divisions
    "minCol": 3,            // Minimum height occupied by the plugin on the Dashboard, 24 divisions
    "configProps": [
        {
            "style": "width: 100%",     // Form style, indicating full width
            "components": [
                {
                    "type": "entitySelect",     // `entitySelect` indicates the entity single selection plugin in components
                    "title": "Entity",          // Title displayed on the form for the plugin
                    "key": "entity",            // Key value of the plugin in the form, used as the form key
                    "style": "width: 100%",     // Style of the current plugin, indicating full width
                    "valueType": "object",      // Value type of the current plugin, `object` indicates the value of the current plugin is an object
                    "componentProps": {         // Properties passed to the plugin, only properties supported by the plugin will take effect
                        "size": "small",        // Property of the current plugin, `small` indicates the plugin uses small size
                        "entityType": ["SERVICE"],          // The entity single selection plugin filters only SERVICE type entities
                        "accessMods": ["W", "RW"],          // The entity single selection plugin filters only entities with W, RW permissions
                        "entityExcludeChildren": true       // The entity single selection plugin filters out parent entities
                    },
                    "rules": {              // Validation rules for the current plugin, only rules supported by react-hook-form will take effect
                        "required": true    // Indicates the current form item is required
                    }
                }
            ]
        },
        {
            "components": [
                {
                    "type": "input",            // `input` indicates the input plugin in components
                    "title": "Title",          // Title displayed on the form for the plugin
                    "key": "title",            // Key value of the plugin in the form, used as the form key
                    "defaultValue": "Title",    // Default value of the plugin in the form
                    "componentProps": {
                        "size": "small",
                        "inputProps": {
                            "maxLength": 15        // Property of the current plugin, `maxLength` indicates the maximum input length for the plugin is 15
                        }
                    }
                }
            ]
        },
        {
            "components": [
                {
                    "type": "input",
                    "title": "Label",
                    "key": "label",
                    "defaultValue": "Label",
                    "componentProps": {
                        "size": "small",
                        "inputProps": {
                            "maxLength": 15
                        }
                    }
                }
            ]
        },
        {
            "title": "Appearance of status",
            "style": "display: flex;",
            "components": [
                {
                    "type": "iconSelect",
                    "key": "icon",
                    "style": "flex: 1;padding-right: 12px;",
                    "defaultValue": "WifiTetheringIcon",
                    "componentProps": {
                        "size": "small"
                    },
                    "rules": {
                        "required": true
                    }
                },
                {
                    "type": "iconColorSelect",
                    "key": "iconColor",
                    "style": "flex: 1;",
                    "defaultValue": "#A9AEB8",
                    "componentProps": {
                        "size": "small"
                    }
                }
            ]
        }
    ],
    "view": [
        {
            "tag": "div",
            "themes": {
                "default": {
                    "class": "trigger-view",
                    "style": "background: #fff"
                }
            },
            "children": [
                {
                    "tag": "Tooltip",
                    "class": "trigger-view-title",
                    "style": "white-space: nowrap;overflow: hidden;text-overflow: ellipsis;font-weight: 600;",
                    "params": [
                        "title"
                    ],
                    "themes": {
                        "default": {
                            "style": "color: #272E3B"
                        },
                        "dark": {
                            "style": "color: rgba(247, 248, 250, 0.86)"
                        }
                    },
                    "props": {
                        "autoEllipsis": true
                    }
                },
                {
                    "tag": "div",
                    "style": "display: flex;justify-content: center;flex: 1;align-items: center;flex-direction: column;",
                    "children": [
                        {
                            "tag": "icon",
                            "style": "font-size: 56px",
                            "class": "trigger-view-icon",
                            "styleDepended": {
                                "color": "iconColor"        // Color style depends on the value of the `iconColor` field in the form
                            },
                            "params": [
                                "icon"                      // Value displayed comes from the `icon` field in the form
                            ]
                        },
                        {
                            "tag": "Tooltip",       // Use the Tooltip plugin from view-components
                            "class": "trigger-view-title",
                            "style": "white-space: nowrap;overflow: hidden;text-overflow: ellipsis;;text-align: center;margin-top: 8px;",
                            "params": [
                                "label"                // Value displayed comes from the `label` field in the form
                            ],
                            "themes": {
                                "default": {
                                    "style": "color: #6B7785"  // Text color in the default theme is #6B7785
                                },
                                "dark": {
                                    "style": "color: rgba(247, 248, 250, 0.62)"         // Text color in the dark theme is rgba(247, 248, 250, 0.62)
                                }
                            },
                            "props": {      // Configure properties of the Tooltip plugin
                                "autoEllipsis": true    // This property indicates that text is automatically truncated when it exceeds the display range
                            }
                        }
                    ]
                }
            ]
        }
    ]
}
```
