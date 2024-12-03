---
sidebar_position: 15
---

# Common Components

The project includes some built-in common components that developers can use directly and extend as needed. Below is a brief introduction to the API of some common components. For detailed information, please refer to the component source code.

## Modal

The dialog component, implemented based on `@mui/material`, supports custom content.

### Example

```tsx
import { Modal } from "@milesight/shared/src/components";

const Service: React.FC<Props> = () => {
  // ...

  return (
    <div className="ms-tab-panel-service">
      <Modal
        visible={!!targetService}
        title={targetService?.name}
        onCancel={() => setTargetService(undefined)}
        onOk={handleSubmit(onSubmit)}
      >
        {formItems.map((props) => (
          <Controller<EntityFormDataProps>
            {...props}
            key={props.name}
            control={control}
          />
        ))}
      </Modal>
    </div>
  );
};
```

### API

| Parameter               | Description                                                    | Type                                     | Default   |
| ----------------------- | -------------------------------------------------------------- | ---------------------------------------- | --------- |
| `title`                 | Title                                                          | `string`                                 | -         |
| `visible`               | Whether the dialog is visible                                  | `boolean`                                | `false`   |
| `size`                  | Dialog size                                                    | `'sm' \| 'md' \| 'lg' \| 'xl' \| 'full'` | `md`      |
| `width`                 | Dialog width (if set, `size` is ignored)                       | `string`                                 | -         |
| `className`             | Custom class name                                              | `string`                                 | -         |
| `disabledBackdropClose` | Whether to disable closing the dialog by clicking the backdrop | `boolean`                                | `false`   |
| `onOkText`              | Confirm button text                                            | `string`                                 | `Confirm` |
| `onCancelText`          | Cancel button text                                             | `string`                                 | `Cancel`  |
| `container`             | Dialog mount node                                              | `HTMLElement`                            | -         |
| `children`              | Dialog content                                                 | `ReactNode`                              | -         |
| `onOk`                  | Confirm callback                                               | `() => void`                             | -         |
| `onCancel`              | Cancel callback                                                | `() => void`                             | -         |

## Confirm

The confirmation dialog component, implemented based on `Modal`, supports imperative calling.

### Example

```tsx
import { Breadcrumbs } from "@/components";

// ...

const confirm = useConfirm();
const handleDeleteConfirm = useCallback(
  (ids?: ApiKey[]) => {
    const idsToDelete = ids || [...selectedIds];

    // Note: The `confirm()` call returns a Promise, you can use `await` to wait for the confirmation callback to complete before executing subsequent logic.
    confirm({
      title: getIntlText("common.label.delete"),
      description: getIntlText("device.message.delete_tip"),
      confirmButtonText: getIntlText("common.label.delete"),
      confirmButtonProps: {
        color: "error",
      },
      onConfirm: async () => {
        const [error, resp] = await awaitWrap(
          deviceAPI.deleteDevices({ device_id_list: idsToDelete })
        );

        if (error || !isRequestSuccess(resp)) return;

        getDeviceList();
        setSelectedIds([]);
        toast.success(getIntlText("common.message.delete_success"));
      },
    });
  },
  [confirm, getIntlText, getDeviceList, selectedIds]
);
```

### API

| Parameter                | Description                                                                                    | Type                     | Default   |
| ------------------------ | ---------------------------------------------------------------------------------------------- | ------------------------ | --------- |
| `title`                  | Title                                                                                          | `string`                 | -         |
| `description`            | Description                                                                                    | `string`                 | -         |
| `icon`                   | Icon                                                                                           | `ReactNode`              | -         |
| `cancelButtonText`       | Cancel button text                                                                             | `string`                 | `Cancel`  |
| `confirmButtonText`      | Confirm button text                                                                            | `string`                 | `Confirm` |
| `rejectOnCancel`         | Whether to reject on cancel button click                                                       | `boolean`                | `false`   |
| `confirmText`            | Confirmation text input, when not empty, confirmation text input mode is enabled automatically | `string`                 | -         |
| `timer`                  | Auto-close countdown in ms, when not empty, countdown mode is enabled automatically            | `number`                 | -         |
| `disabledBackdropClose`  | Whether to disable closing by clicking the backdrop                                            | `boolean`                | `false`   |
| `dialogProps`            | MUI Dialog component properties                                                                | `DialogProps`            | -         |
| `dialogTitleProps`       | MUI DialogTitle component properties                                                           | `DialogTitleProps`       | -         |
| `dialogContentProps`     | MUI DialogContent component properties                                                         | `DialogContentProps`     | -         |
| `dialogContentTextProps` | MUI DialogContentText component properties                                                     | `DialogContentTextProps` | -         |
| `dialogActionsProps`     | MUI DialogActions component properties                                                         | `DialogActionsProps`     | -         |
| `confirmTextFieldProps`  | MUI TextField component properties                                                             | `TextFieldProps`         | -         |
| `timerProgressProps`     | MUI LinearProgress component properties                                                        | `LinearProgressProps`    | -         |

## Toast

The global notification component, implemented based on `@mui/material`, can be used for success, warning, error, and informational messages. It is displayed in the center of the page, and automatically closes after 3 seconds by default, providing a lightweight way to notify users without interrupting their operations.

### Example

```ts
// web/src/services/http/client/error-handler.ts
import { toast } from "@milesight/shared/src/components";

//...

const handlerConfigs: ErrorHandlerConfig[] = [
  // Unified Message popup notification
  {
    errCodes: ["authentication_failed"],
    handler(errCode, resp) {
      const intlKey = getHttpErrorKey(errCode);
      const message = intl.get(intlKey) || intl.get(serverErrorKey);
      const target = iotLocalStorage.getItem(REGISTERED_KEY)
        ? "/auth/login"
        : "/auth/register";

      // highlight-start
      toast.error({
        key: errCode,
        content: message,
        duration: 1000,
        onClose: () => {
          const { pathname } = window.location;

          if (target === pathname) return;
          location.replace(target);
        },
      });
      // highlight-end

      iotLocalStorage.removeItem(TOKEN_CACHE_KEY);
    },
  },
];
```

### API

The component provides some static methods with the following usage and parameters:

- `toast.info(options)`: Informational notification
- `toast.success(options)`: Success notification
- `toast.error(options)`: Error notification
- `toast.warning(options)`: Warning notification

The `options` parameter type is as follows:

| Parameter  | Description                                                                             | Type         | Default |
| ---------- | --------------------------------------------------------------------------------------- | ------------ | ------- |
| `key`      | Unique identifier, only one toast with the same identifier will be rendered on the page | `string`     | -       |
| `content`  | Notification content                                                                    | `ReactNode`  | -       |
| `duration` | Auto-close time in ms                                                                   | `number`     | 3000    |
| `onClose`  | Close callback                                                                          | `() => void` | -       |

## Empty

The empty state placeholder component is used to explicitly notify users when there is no data.

### Example

```tsx
import { Empty, Descriptions, Tooltip } from "@/components";

const Property: React.FC<Props> = ({ loading, entities, onUpdateSuccess }) => {
  // ...

  return !readOnlyProps?.length && !writableProps?.length ? (
    <Empty
      loading={loading}
      type="nodata"
      text={getIntlText("common.label.empty")}
      className="ms-empty"
    />
  ) : (
    <div
      className={cls("ms-entity-property", { loading: formState.isSubmitting })}
    >
      {/* ... */}
    </div>
  );
};

export default Property;
```

### API

| Parameter   | Description                                                        | Type                             | Required | Default  |
| ----------- | ------------------------------------------------------------------ | -------------------------------- | -------- | -------- |
| `type`      | Empty state type                                                   | `'nodata'`                       | No       | `nodata` |
| `size`      | Empty state size                                                   | `'small' \| 'middle' \| 'large'` | No       | `middle` |
| `text`      | Empty state text                                                   | `React.ReactNode`                | No       | -        |
| `image`     | Empty state placeholder image, if set, `type` attribute is ignored | `React.ReactNode`                | No       | -        |
| `extra`     | Extra content for the empty state                                  | `React.ReactNode`                | No       | -        |
| `loading`   | Whether to show the loading state                                  | `boolean`                        | No       | -        |
| `className` | Custom class name                                                  | `string`                         | No       | -        |

## Tooltip

The tooltip component, implemented based on the @mui/material `Tooltip` component, supports automatic handling of text ellipsis and tooltip activation based on content and container width while retaining the original functionality.

### Example

```tsx
import { Tooltip } from "@/components";

// ...

const Integration = () => {
  // ...
  return (
    <>
      <Grid2 container spacing={2}>
        {intList?.map((item) => (
          <Grid2 key={item.id} size={{ xs: 12, sm: 6, md: 4, xl: 3 }}>
            <div
              className="ms-int-card"
              onClick={() => handleCardClick(item.id, item)}
            >
              <div className="icon">
                {!!item.icon && (
                  <img src={genInteIconUrl(item.icon)} alt={item.name} />
                )}
              </div>
              {/* highlight-start */}
              <Tooltip autoEllipsis className="title" title={item.name} />
              <Tooltip autoEllipsis className="desc" title={item.description} />
              {/* highlight-end */}
              <div className="meta">
                <span className="meta-item">
                  <DevicesOtherIcon />
                  <span>{thousandSeparate(item.deviceCount) || "-"}</span>
                </span>
                <span className="meta-item">
                  <EntityIcon />
                  <span>{thousandSeparate(item.entityCount) || "-"}</span>
                </span>
              </div>
            </div>
          </Grid2>
        ))}
      </Grid2>
    </>
  );
};

export default Integration;
```

### API

The Tooltip component supports all @mui/material [Tooltip component API](https://mui.com/material-ui/api/tooltip/) and adds the following attribute:

| Parameter      | Description                                                                     | Type      | Required | Default |
| -------------- | ------------------------------------------------------------------------------- | --------- | -------- | ------- |
| `autoEllipsis` | Whether to automatically add text ellipsis based on content and container width | `boolean` | No       | `false` |

## Breadcrumbs

The breadcrumbs navigation component, implemented based on the @mui/material `Breadcrumbs` component, supports automatic generation of breadcrumb navigation based on the routing hierarchy and allows customization of the navigation menu.

### Example

```tsx
import { Breadcrumbs } from "@/components";
// ...

function Setting() {
  // ...

  return (
    <div className="ms-main">
      <Breadcrumbs />
      {/* ... */}
    </div>
  );
}

export default Setting;
```

### API

```ts
type NavsType = {
  path?: string;
  title: string;
  state?: any;
}[];
```

| Parameter | Description                                                                                                        | Type                           | Required | Default |
| --------- | ------------------------------------------------------------------------------------------------------------------ | ------------------------------ | -------- | ------- |
| `navs`    | Custom navigation set, if not provided, the navigation menu is calculated automatically based on the current route | `NavsType`                     | No       | -       |
| `rewrite` | Navigation rewrite function                                                                                        | `(navs: NavsType) => NavsType` | No       | -       |

## Descriptions

The description list component, implemented based on the @mui/material `Table` component, is often used to display detailed information of data.

### Example

```tsx
import { Descriptions, Tooltip } from "@/components";

const BasicTable = (
  { data, loading, onEditSuccess }: Props,
  ref?: React.ForwardedRef<BasicTableInstance>
) => {
  const { getIntlText } = useI18n();
  const { getTimeFormat } = useTime();
  const descList = useMemo(() => {
    return [
      {
        key: "name",
        label: getIntlText("common.label.name"),
        content: (
          <Stack
            direction="row"
            sx={{ alignItems: "center", justifyContent: "space-between" }}
          >
            <Tooltip autoEllipsis title={data?.name} />
            <IconButton
              sx={{ width: 22, height: 22 }}
              onClick={() => {
                setDialogOpen(true);
              }}
            >
              <EditIcon sx={{ fontSize: 16 }} />
            </IconButton>
          </Stack>
        ),
      },
      {
        key: "externalId",
        label: getIntlText("device.label.param_external_id"),
        content: data?.identifier,
      },
      {
        key: "source",
        label: getIntlText("device.label.param_source"),
        content: <Tooltip autoEllipsis title={data?.integrationName} />,
      },
      {
        key: "createTime",
        label: getIntlText("common.label.create_time"),
        content: getTimeFormat(data?.createdAt),
      },
      {
        key: "founder",
        label: getIntlText("device.label.param_founder"),
        content: data?.integrationName,
      },
      {
        key: "id",
        label: getIntlText("device.label.param_device_id"),
        content: data?.id,
      },
    ];
  }, [data, getIntlText, getTimeFormat]);

  return (
    <div className="ms-com-device-basic">
      <Descriptions data={descList} loading={loading} />
      {/* ... */}
    </div>
  );
};

export default BasicTable;
```

### API

```ts
interface DescriptionDataType {
  key: ApiKey;
  label: React.ReactNode;
  content: React.ReactNode;
}
```

| Parameter | Description                           | Type                    | Required | Default |
| --------- | ------------------------------------- | ----------------------- | -------- | ------- |
| `data`    | Description list data                 | `DescriptionDataType[]` | No       | -       |
| `loading` | Whether to show the loading state     | `boolean`               | No       | -       |
| `columns` | Number of data pairs rendered per row | `number`                | No       | 2       |

## TablePro

The table component, implemented based on the @mui/x-data-grid `DataGrid` component, comes with a lot of common configurations built-in. It retains the original functionality while allowing customization of the table.

### Example

```tsx
import { TablePro, type ColumnType } from "@/components";
// ...

const EntityTable: React.FC<Props> = ({ data, onRefresh }) => {
  const { getIntlText } = useI18n();
  const columns = useMemo(() => {
    const entityTypeFilterOptions: { label: EntityType; value: EntityType }[] =
      [
        {
          label: "PROPERTY",
          value: "PROPERTY",
        },
        {
          label: "SERVICE",
          value: "SERVICE",
        },
        {
          label: "EVENT",
          value: "EVENT",
        },
      ];
    const result: ColumnType<TableRowDataType>[] = [
      {
        field: "name",
        headerName: getIntlText("device.label.param_entity_name"),
        flex: 1,
        minWidth: 150,
        ellipsis: true,
        filterable: true,
        disableColumnMenu: false,
        filterOperators: getGridStringOperators().filter(
          (item) => item.value === "contains"
        ),
      },
      {
        field: "id",
        headerName: getIntlText("device.label.param_entity_id"),
        flex: 1,
        minWidth: 150,
        ellipsis: true,
      },
      {
        field: "type",
        headerName: getIntlText("common.label.type"),
        flex: 1,
        minWidth: 150,
        filterable: true,
        disableColumnMenu: false,
        type: "singleSelect",
        valueOptions: entityTypeFilterOptions,
        filterOperators: getGridSingleSelectOperators().filter(
          (item) => item.value === "is"
        ),
        renderCell({ value }) {
          return (
            <Chip
              size="small"
              color={entityTypeColorMap[(value || "").toLocaleLowerCase()]}
              label={value}
              sx={{ borderRadius: 1, lineHeight: "24px" }}
            />
          );
        },
      },
      {
        field: "valueType",
        headerName: getIntlText("common.label.data_type"),
        align: "left",
        headerAlign: "left",
        flex: 1,
        minWidth: 150,
        ellipsis: true,
      },
    ];

    return result;
  }, [getIntlText]);

  return (
    <Stack className="ms-com-device-entity" sx={{ height: "100%" }}>
      <TablePro<TableRowDataType>
        paginationMode="client"
        loading={false}
        columns={columns}
        rows={data?.entities}
        onRefreshButtonClick={onRefresh}
      />
    </Stack>
  );
};

export default EntityTable;
```

### API

The TablePro component supports all @mui/x-data-grid [DataGrid component API](https://mui.com/x/react-data-grid/) and adds the following attributes:

| Parameter              | Description                                                                                  | Type                      | Required | Default |
| ---------------------- | -------------------------------------------------------------------------------------------- | ------------------------- | -------- | ------- |
| `toolbarRender`        | Custom rendering on the left side of the toolbar                                             | `React.ReactNode`         | No       | -       |
| `onSearch`             | Search callback on the right side of the toolbar (if not provided, the search box is hidden) | `(value: string) => void` | No       | -       |
| `onRefreshButtonClick` | Refresh button click callback                                                                | `() => void`              | No       | -       |

Additional Column Props:

| Parameter  | Description                                                                | Type      | Required | Default |
| ---------- | -------------------------------------------------------------------------- | --------- | -------- | ------- |
| `ellipsis` | Whether to enable automatic text omission during development and debugging | `boolean` | No       | -       |
