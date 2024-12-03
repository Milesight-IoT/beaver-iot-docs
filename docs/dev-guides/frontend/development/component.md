---
sidebar_position: 15
---

# 通用组件

项目中内置了一些通用组件，开发者可直接使用，若有需要可自行扩展。下面对部分通用组件的 API 进行简单介绍，详细内容可查看组件源码。

## Modal

对话框组件，基于 `@mui/material` 实现，支持自定义内容。

### 示例

```tsx
import { Modal } from '@milesight/shared/src/components';

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
                {formItems.map(props => (
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

| 参数 | 说明 | 类型 | 默认值 |
| --- | ---- | --- | ----- |
| `title` | 标题 | `string` | - |
| `visible` | 对话框是否可见 | `boolean` | `false` |
| `size` | 弹框尺寸 | `'sm' \| 'md' \| 'lg' \| 'xl' \| 'full'` | `md` |
| `width` | 弹框宽度（有值时，`size` 定义不生效） | `string` | - |
| `className` | 自定义类名 | `string` | - |
| `disabledBackdropClose` | 是否禁止点击遮罩层关闭弹框 | `boolean` | `false` |
| `onOkText` | 确定按钮文案 | `string` | `Confirm` |
| `onCancelText` | 取消按钮文案 | `string` | `Cancel` |
| `container` | 弹框挂载节点 | `HTMLElement` | - |
| `children` | 弹框内容 | `ReactNode` | - |
| `onOk` | 确定回调 | `() => void` | - |
| `onCancel` | 取消回调 | `() => void` | - |

## Confirm

确认框组件，基于 `Modal` 实现，支持命令式调用。

### 示例

```tsx
import { Breadcrumbs } from '@/components';

// ...

const confirm = useConfirm();
const handleDeleteConfirm = useCallback(
    (ids?: ApiKey[]) => {
        const idsToDelete = ids || [...selectedIds];

        // 注意：`confirm()` 调用将返回 Promise，可通过 `await` 等待确认回调执行完成后再执行后续逻辑。
        confirm({
            title: getIntlText('common.label.delete'),
            description: getIntlText('device.message.delete_tip'),
            confirmButtonText: getIntlText('common.label.delete'),
            confirmButtonProps: {
                color: 'error',
            },
            onConfirm: async () => {
                const [error, resp] = await awaitWrap(
                    deviceAPI.deleteDevices({ device_id_list: idsToDelete }),
                );

                if (error || !isRequestSuccess(resp)) return;

                getDeviceList();
                setSelectedIds([]);
                toast.success(getIntlText('common.message.delete_success'));
            },
        });
    },
    [confirm, getIntlText, getDeviceList, selectedIds],
);
```

### API

| 参数 | 说明 | 类型 | 默认值 |
| ---- | ---- | ---- | ------ |
| `title` | 标题 | `string` | - |
| `description` | 描述 | `string` | - |
| `icon` | 图标 | `ReactNode` | - |
| `cancelButtonText` | 取消按钮文案 | `string` | `Cancel` |
| `confirmButtonText` | 确认按钮文案 | `string` | `Confirm` |
| `rejectOnCancel` | 点击取消按钮是否 reject | `boolean` | `false` |
| `confirmText` | 输入确认文案，该参数不为空时，自动开启文案输入确认模式 | `string` | - |
| `timer` | 自动关闭倒计时，单位 ms，该参数不为空时，自动开启倒计时模式 | `number` | - |
| `disabledBackdropClose` | 是否禁用背景蒙层点击关闭功能 | `boolean` | `false` |
| `dialogProps` | MUI Dialog 组件属性 | `DialogProps` | - |
| `dialogTitleProps` | MUI DialogTitle 组件属性 | `DialogTitleProps` | - |
| `dialogContentProps` | MUI DialogContent 组件属性 | `DialogContentProps` | - |
| `dialogContentTextProps` | MUI DialogContentText 组件属性 | `DialogContentTextProps` | - |
| `dialogActionsProps` | MUI DialogActions 组件属性 | `DialogActionsProps` | - |
| `confirmTextFieldProps` | MUI TextField 组件属性 | `TextFieldProps` | - |
| `timerProgressProps` | MUI LinearProgress 组件属性 | `LinearProgressProps` | - |
| `confirmButtonProps` | MUI Button 组件属性 | `ButtonProps` | - |
| `cancelButtonProps` | MUI Button 组件属性 | `ButtonProps` | - |
| `onConfirm` | 确认回调 | `() => Promise<void> \| void` | - |

## Toast

全局提示组件，基于 `@mui/material` 实现，可用于成功、警告、错误、提示等场景。在页面居中展示，默认 3s 后自动关闭，是一种不打断用户操作的轻量级提示方式。

### 示例

```ts
// web/src/services/http/client/error-handler.ts
import { toast } from '@milesight/shared/src/components';

//...

const handlerConfigs: ErrorHandlerConfig[] = [
    // 统一 Message 弹窗提示
    {
        errCodes: ['authentication_failed'],
        handler(errCode, resp) {
            const intlKey = getHttpErrorKey(errCode);
            const message = intl.get(intlKey) || intl.get(serverErrorKey);
            const target = iotLocalStorage.getItem(REGISTERED_KEY)
                ? '/auth/login'
                : '/auth/register';

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

组件提供了一些静态方法，使用方式和参数如下：

- `toast.info(options)`: 常规提示
- `toast.success(options)`: 成功提示
- `toast.error(options)`: 错误提示
- `toast.warning(options)`: 警告提示

其中，`options` 参数类型如下：

| 参数 | 说明 | 类型 | 默认值 |
| ---- | ---- | ---- | ------ |
| `key` | 唯一标识，同一标识的 toast 只会在页面上渲染 1 次 | `string` | - |
| `content` | 提示内容 | `ReactNode` | - |
| `duration` | 自动关闭时间，单位 ms | `number` | 3000 |
| `onClose` | 关闭回调 | `() => void` | - |

## Empty

空状态占位组件，当目前没有数据时，用于显式的用户提示。

### 示例

```tsx
import { Empty, Descriptions, Tooltip } from '@/components';

const Property: React.FC<Props> = ({ loading, entities, onUpdateSuccess }) => {
    // ...

    return return !readOnlyProps?.length && !writableProps?.length ? (
        <Empty
            loading={loading}
            type="nodata"
            text={getIntlText('common.label.empty')}
            className="ms-empty"
        />
    ) : (
        <div className={cls('ms-entity-property', { loading: formState.isSubmitting })}>
            {/* ... */}
        </div>
    );
};

export default Property;
```



### API

| 参数 | 说明 | 类型 | 是否必填 | 默认值 |
| ---- | --- | --- | ------- | ------ |
| `type` | 空状态类型 | `'nodata'` | 否 | `nodata` |
| `size` | 空状态尺寸 | `'small' \|'middle' \| 'large'` | 否  | `middle` |
| `text` | 空状态文案 | `React.ReactNode` | 否  | - |
| `image` | 空状态占位图片，该属性有值时 `type` 属性无效 | `React.ReactNode` | 否  | - |
| `extra` | 空状态额外内容 | `React.ReactNode` | 否  | - |
| `loading` | 是否展示加载中状态 | `boolean` | 否  | - |
| `className` | 自定义类名 | `string` | 否  | - |


## Tooltip

文字提示气泡框组件，基于 @mui/material `Tooltip` 组件封装实现，在保留原有功能的同时，支持基于内容和容器宽度自动处理文案省略及气泡框的启用/禁用。

### 示例

```tsx
import { Tooltip } from '@/components';

// ...

const Integration = () => {
    // ...
    return (
        <>
            <Grid2 container spacing={2}>
                {intList?.map(item => (
                    <Grid2 key={item.id} size={{ xs: 12, sm: 6, md: 4, xl: 3 }}>
                        <div className="ms-int-card" onClick={() => handleCardClick(item.id, item)}>
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
                                    <span>{thousandSeparate(item.deviceCount) || '-'}</span>
                                </span>
                                <span className="meta-item">
                                    <EntityIcon />
                                    <span>{thousandSeparate(item.entityCount) || '-'}</span>
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

Tooltip 组件支持所有 @mui/material [Tooltip 组件 API](https://mui.com/material-ui/api/tooltip/)，同时新增了以下属性：

| 参数 | 说明 | 类型 | 是否必填 | 默认值 |
| ---- | --- | --- | ------- | ----- |
| `autoEllipsis` | 是否基于内容及容器宽度自动添加文本省略 | `boolean` | 否 | `false` |

## Breadcrumbs

面包屑导航组件，基于 @mui/material `Breadcrumbs` 组件封装实现，在支持自动基于路由层级生成面包屑导航的同时，支持对导航菜单的定制修改。

### 示例

```tsx
import { Breadcrumbs } from '@/components';
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

| 参数 | 说明 | 类型 | 是否必填 | 默认值 |
| ---- | --- | --- | ------- | ----- |
| `navs` | 自定义导航集合，该属性无值则自动根据当前路由计算导航菜单 | `NavsType` | 否 | - |
| `rewrite` | 导航重写函数 | `(navs: NavsType) => NavsType` | 否 | - |

## Description

描述列表组件，基于 @mui/material `Table` 组件封装实现，常用于展示数据的详情信息。

### 示例

```tsx
import { Descriptions, Tooltip } from '@/components';

const BasicTable = (
    { data, loading, onEditSuccess }: Props,
    ref?: React.ForwardedRef<BasicTableInstance>,
) => {
    const { getIntlText } = useI18n();
    const { getTimeFormat } = useTime();
    const descList = useMemo(() => {
        return [
            {
                key: 'name',
                label: getIntlText('common.label.name'),
                content: (
                    <Stack
                        direction="row"
                        sx={{ alignItems: 'center', justifyContent: 'space-between' }}
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
                key: 'externalId',
                label: getIntlText('device.label.param_external_id'),
                content: data?.identifier,
            },
            {
                key: 'source',
                label: getIntlText('device.label.param_source'),
                content: <Tooltip autoEllipsis title={data?.integrationName} />,
            },
            {
                key: 'createTime',
                label: getIntlText('common.label.create_time'),
                content: getTimeFormat(data?.createdAt),
            },
            {
                key: 'founder',
                label: getIntlText('device.label.param_founder'),
                content: data?.integrationName,
            },
            {
                key: 'id',
                label: getIntlText('device.label.param_device_id'),
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

| 参数 | 说明 | 类型 | 是否必填 | 默认值 |
| ---- | --- | --- | ------- | ----- |
| `data` | 描述列表数据 | `DescriptionDataType[]` | 否 | - |
| `loading` | 是否展示加载中状态 | `boolean` | 否 | - |
| `columns` | 每行渲染数据对数量 | `number` | 否 | 2 |

## TablePro

表格组件，基于 @mui/x-data-grid `DataGrid` 组件封装实现，内置了大量常规配置，在保留原有功能的同时，支持对表格的定制修改。

### 示例

```tsx
import { TablePro, type ColumnType } from '@/components';
// ...

const EntityTable: React.FC<Props> = ({ data, onRefresh }) => {
    const { getIntlText } = useI18n();
    const columns = useMemo(() => {
        const entityTypeFilterOptions: { label: EntityType; value: EntityType }[] = [
            {
                label: 'PROPERTY',
                value: 'PROPERTY',
            },
            {
                label: 'SERVICE',
                value: 'SERVICE',
            },
            {
                label: 'EVENT',
                value: 'EVENT',
            },
        ];
        const result: ColumnType<TableRowDataType>[] = [
            {
                field: 'name',
                headerName: getIntlText('device.label.param_entity_name'),
                flex: 1,
                minWidth: 150,
                ellipsis: true,
                filterable: true,
                disableColumnMenu: false,
                filterOperators: getGridStringOperators().filter(item => item.value === 'contains'),
            },
            {
                field: 'id',
                headerName: getIntlText('device.label.param_entity_id'),
                flex: 1,
                minWidth: 150,
                ellipsis: true,
            },
            {
                field: 'type',
                headerName: getIntlText('common.label.type'),
                flex: 1,
                minWidth: 150,
                filterable: true,
                disableColumnMenu: false,
                type: 'singleSelect',
                valueOptions: entityTypeFilterOptions,
                filterOperators: getGridSingleSelectOperators().filter(item => item.value === 'is'),
                renderCell({ value }) {
                    return (
                        <Chip
                            size="small"
                            color={entityTypeColorMap[(value || '').toLocaleLowerCase()]}
                            label={value}
                            sx={{ borderRadius: 1, lineHeight: '24px' }}
                        />
                    );
                },
            },
            {
                field: 'valueType',
                headerName: getIntlText('common.label.data_type'),
                align: 'left',
                headerAlign: 'left',
                flex: 1,
                minWidth: 150,
                ellipsis: true,
            },
        ];

        return result;
    }, [getIntlText]);

    return (
        <Stack className="ms-com-device-entity" sx={{ height: '100%' }}>
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

TablePro 组件支持所有 @mui/x-data-grid [DataGrid 组件 API](https://mui.com/x/react-data-grid/)，同时新增了以下属性：

| 参数 | 说明 | 类型 | 是否必填 | 默认值 |
| ---- | ---- | ---- | -------- | ------ |
| `toolbarRender` | 工具栏左侧自定义渲染 | `React.ReactNode` | 否 | - |
| `onSearch` | 工具栏右侧搜索回调（当该属性无值时，搜索框隐藏） | `(value: string) => void` | 否 | - |
| `onRefreshButtonClick` | 刷新按钮点击回调 | `() => void` | 否 | - |


新增 Column Props：

| 参数 | 说明 | 类型 | 是否必填 | 默认值 |
| ---- | ---- | ---- | -------- | ------ |
| `ellipsis` | 是否开启文本自动省略 | `boolean` | 否 | - |
