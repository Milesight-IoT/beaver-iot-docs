---
sidebar_position: 17
---

# 用户权限

通过角色管理来维护和管理系统中所存在的角色，设定每个角色下的可用设备和页面相关权限。  
Role-Based Access Control - 基于角色的访问控制，可以通过定义角色和权限，然后将权限分配给不同的角色来实现。用户根据其角色获得相应的权限，进而访问特定的路由、页面组件或者操作。

以下介绍新的应用模块接入用户权限控制的方式。

## 整体流程

1. 添加新的应用模块权限代码
2. 添加新的应用模块路由权限控制
3. 添加新的二级菜单标签权限控制
4. 添加新的应用模块按钮权限控制
5. 添加新的应用模块详情权限控制

### 添加新的应用模块权限代码

代码文件目录为：**apps\web\src\constants.ts**

```typescript
/**
 * 权限代码
 */
export enum PERMISSIONS {
    /**
     * 仪表盘模块
     */
    DASHBOARD_MODULE = 'dashboard',
    DASHBOARD_VIEW = 'dashboard.view',
    DASHBOARD_ADD = 'dashboard.add',
    DASHBOARD_EDIT = 'dashboard.edit',

    /**
     * 设备模块
     */
    DEVICE_MODULE = 'device',
    DEVICE_VIEW = 'device.view',
    DEVICE_ADD = 'device.add',
    DEVICE_EDIT = 'device.edit',
    DEVICE_DELETE = 'device.delete',

    /**
     * 实体模块
     * 自定义实体模块
     */
    ENTITY_MODULE = 'entity',
    ENTITY_CUSTOM_MODULE = 'entity_custom',
    ENTITY_CUSTOM_VIEW = 'entity_custom.view',
    ENTITY_CUSTOM_ADD = 'entity_custom.add',
    ENTITY_CUSTOM_EDIT = 'entity_custom.edit',
    ENTITY_CUSTOM_DELETE = 'entity_custom.delete',
    /**
     * 实体数据模块
     */
    ENTITY_DATA_MODULE = 'entity_data',
    ENTITY_DATA_VIEW = 'entity_data.view',
    ENTITY_DATA_EDIT = 'entity_data.edit',
    ENTITY_DATA_EXPORT = 'entity_data.export',

    /**
     * 用户角色模块
     */
    USER_ROLE_MODULE = 'user_role',

    /**
     * 工作流模块
     */
    WORKFLOW_MODULE = 'workflow',
    WORKFLOW_VIEW = 'workflow.view',
    WORKFLOW_ADD = 'workflow.add',
    WORKFLOW_EDIT = 'workflow.edit',
    WORKFLOW_DELETE = 'workflow.delete',

    /**
     * 集成模块
     */
    INTEGRATION_MODULE = 'integration',
    INTEGRATION_VIEW = 'integration.view',
}
```

### 添加新的应用模块路由权限控制

代码文件目录为：**apps\web\src\routes\routes.tsx**

```tsx
import intl from 'react-intl-universal';
import { Outlet, RouteObject } from 'react-router-dom';
import {
    DashboardCustomizeIcon,
    DevicesFilledIcon,
    IntegrationInstructionsIcon,
    Person4Icon,
    EntityIcon,
    WorkflowIcon,
} from '@milesight/shared/src/components';
import { PERMISSIONS } from '@/constants';
import ErrorBoundaryComponent from './error-boundary';

type RouteObjectType = RouteObject & {
    /** 自定义路由元数据 */
    handle?: {
        title?: string;

        /** 菜单图标 */
        icon?: React.ReactNode;

        /**
         * 布局类型，默认为 `basic`
         *
         * 注意：此处类型应为 LayoutType，但会出现推断错误，故暂定义为 string
         */
        layout?: string;

        /** 是否无需登录便可访问，默认 `false` (需要登录) */
        authFree?: boolean;

        /**
         * 只有用户拥有该权限，才能访问当前路由或菜单
         */
        permissions?: PERMISSIONS | PERMISSIONS[];

        /**
         * 是否在菜单栏中隐藏
         */
        hideInMenuBar?: boolean;

        /** 隐藏侧边栏 */
        hideSidebar?: boolean;
    };

    /** 子路由 */
    children?: RouteObjectType[];
};

const ErrorBoundary = () => <ErrorBoundaryComponent inline />;

const routes: RouteObjectType[] = [
    {
        path: '/dashboard',
        handle: {
            get title() {
                return intl.get('common.label.dashboard');
            },
            icon: <DashboardCustomizeIcon fontSize="medium" />,
            permissions: PERMISSIONS.DASHBOARD_MODULE,
        },
        async lazy() {
            const { default: Component } = await import('@/pages/dashboard');
            return { Component };
        },
        ErrorBoundary,
    },
    {
        path: '/device',
        element: <Outlet />,
        ErrorBoundary,
        handle: {
            get title() {
                return intl.get('common.label.device');
            },
            icon: <DevicesFilledIcon fontSize="medium" />,
            permissions: PERMISSIONS.DEVICE_MODULE,
        },
        children: [
            {
                index: true,
                async lazy() {
                    const { default: Component } = await import('@/pages/device');
                    return { Component };
                },
                ErrorBoundary,
            },
            {
                index: true,
                path: 'detail/:deviceId',
                handle: {
                    get title() {
                        return intl.get('common.label.detail');
                    },
                },
                async lazy() {
                    const { default: Component } = await import('@/pages/device/views/detail');
                    return { Component };
                },
                ErrorBoundary,
            },
        ],
    },
    {
        path: '/integration',
        element: <Outlet />,
        ErrorBoundary,
        handle: {
            get title() {
                return intl.get('common.label.integration');
            },
            icon: <IntegrationInstructionsIcon fontSize="medium" />,
            permissions: PERMISSIONS.INTEGRATION_MODULE,
        },
        children: [
            {
                index: true,
                async lazy() {
                    const { default: Component } = await import('@/pages/integration');
                    return { Component };
                },
                ErrorBoundary,
            },
            {
                path: 'detail/:integrationId',
                handle: {
                    get title() {
                        return intl.get('common.label.integration');
                    },
                },
                async lazy() {
                    const { default: Component } = await import(
                        '@/pages/integration/views/integration-detail'
                    );
                    return { Component };
                },
                ErrorBoundary,
            },
        ],
    },
    {
        path: '/entity',
        element: <Outlet />,
        ErrorBoundary,
        handle: {
            get title() {
                return intl.get('common.label.entity');
            },
            icon: <EntityIcon fontSize="medium" />,
            permissions: PERMISSIONS.ENTITY_MODULE,
        },
        children: [
            {
                index: true,
                async lazy() {
                    const { default: Component } = await import('@/pages/entity');
                    return { Component };
                },
                ErrorBoundary,
            },
        ],
    },
    {
        path: '/workflow',
        element: <Outlet />,
        ErrorBoundary,
        handle: {
            get title() {
                return intl.get('common.label.workflow');
            },
            icon: <WorkflowIcon />,
            permissions: PERMISSIONS.WORKFLOW_MODULE,
        },
        children: [
            {
                index: true,
                async lazy() {
                    const { default: Component } = await import('@/pages/workflow');
                    return { Component };
                },
                ErrorBoundary,
            },
            {
                path: 'editor',
                handle: {
                    get title() {
                        return intl.get('common.label.editor');
                    },
                    hideSidebar: true,
                },
                async lazy() {
                    const { default: Component } = await import('@/pages/workflow/views/editor');
                    return { Component };
                },
                ErrorBoundary,
            },
        ],
    },
    {
        path: '/user-role',
        handle: {
            get title() {
                return intl.get('user.label.user_role');
            },
            icon: <Person4Icon fontSize="medium" />,
            permissions: PERMISSIONS.USER_ROLE_MODULE,
        },
        async lazy() {
            const { default: Component } = await import('@/pages/user-role');
            return { Component };
        },
        ErrorBoundary,
    },
    {
        path: '/403',
        handle: {
            title: '403',
            hideInMenuBar: true,
        },
        async lazy() {
            const { default: Component } = await import('@/pages/403');
            return { Component };
        },
        ErrorBoundary,
    },
    {
        path: '/auth',
        handle: {
            layout: 'blank',
        },
        element: <Outlet />,
        ErrorBoundary,
        children: [
            {
                index: true,
                path: 'login',
                handle: {
                    get title() {
                        return intl.get('common.label.login');
                    },
                    layout: 'blank',
                },
                async lazy() {
                    const { default: Component } = await import('@/pages/auth/views/login');
                    return { Component };
                },
                ErrorBoundary,
            },
            {
                path: 'register',
                handle: {
                    get title() {
                        return intl.get('common.label.register');
                    },
                    layout: 'blank',
                },
                async lazy() {
                    const { default: Component } = await import('@/pages/auth/views/register');
                    return { Component };
                },
                ErrorBoundary,
            },
        ],
    },
    {
        path: '*',
        handle: {
            title: '404',
            layout: 'blank',
            authFree: true,
        },
        async lazy() {
            const { default: Component } = await import('@/pages/404');
            return { Component };
        },
        ErrorBoundary,
    },
];

export default routes;
```

### 添加新的二级菜单标签权限控制

以实体应用模块举例说明，接入二级菜单自定义实体标签和实体数据标签的权限控制。  

![entity-tabs](/img/entity-tabs.png)  

#### 步骤
* 引入 useUserPermissions hooks
* 设置标签的权限代码，例如： permission: PERMISSIONS.ENTITY_CUSTOM_MODULE 
* 根据 hooks 中的 hasPermission 判断用户是否拥有该权限


```tsx
import { useMemo } from 'react';
import { Tabs, Tab } from '@mui/material';
import { useI18n } from '@milesight/shared/src/hooks';
import { useRouteTab, useUserPermissions } from '@/hooks';
import { Breadcrumbs, TabPanel } from '@/components';
import { PERMISSIONS } from '@/constants';
import CustomEntity from './components/custom-entity';
import Entity from './components/entity';
import './style.less';

export default () => {
    const { getIntlText } = useI18n();
    const { hasPermission } = useUserPermissions();

    const tabs = useMemo(() => {
        return [
            {
                key: 'custom-entity',
                label: getIntlText('entity.label.custom_entity'),
                component: <CustomEntity />,
                permission: PERMISSIONS.ENTITY_CUSTOM_MODULE,
            },
            {
                key: 'entity-data',
                label: getIntlText('device.detail.entity_data'),
                component: <Entity />,
                permission: PERMISSIONS.ENTITY_DATA_MODULE,
            },
        ].filter(t => hasPermission(t.permission));
    }, [getIntlText, hasPermission]);

    const [tabKey, setTabKey] = useRouteTab(tabs?.[0]?.key || 'custom-entity');

    return (
        <div className="ms-main">
            <Breadcrumbs />
            <div className="ms-view ms-view-entity">
                <div className="topbar">
                    <Tabs
                        className="ms-tabs"
                        value={tabKey}
                        onChange={(_, value) => setTabKey(value)}
                    >
                        {tabs.map(({ key, label }) => (
                            <Tab disableRipple key={key} value={key} title={label} label={label} />
                        ))}
                    </Tabs>
                </div>
                <div className="ms-tab-content">
                    {tabs.map(({ key, component }) => (
                        <TabPanel value={tabKey} index={key} key={key}>
                            {component}
                        </TabPanel>
                    ))}
                </div>
            </div>
        </div>
    );
};

```

### 添加新的应用模块按钮权限控制

#### 方案一：隐藏按钮
* 引入高阶组件 PermissionControlHidden
* 设置按钮的权限代码 permissions：PERMISSIONS.DEVICE_EDIT


```tsx
import { PermissionControlHidden } from '@/components';
import { PERMISSIONS } from '@/constants';

const descList = useMemo(() => {
    return [
        {
            key: 'name',
            label: getIntlText('common.label.name'),
            content: (
                <PermissionControlHidden permissions={PERMISSIONS.DEVICE_EDIT}>
                    <IconButton
                        sx={{ width: 22, height: 22 }}
                        onClick={() => {
                            setDialogOpen(true);
                        }}
                    >
                        <EditIcon sx={{ fontSize: 16 }} />
                    </IconButton>
                </PermissionControlHidden>
            ),
        },
    ];
}, [data, getIntlText, getTimeFormat]);

```

#### 方案二：禁用按钮
* 引入高阶组件 PermissionControlDisabled
* 设置按钮的权限代码 permissions：PERMISSIONS.ENTITY_CUSTOM_EDIT


```tsx
import { PermissionControlDisabled } from '@/components';
import { PERMISSIONS } from '@/constants';

const disabledBtn = useMemo(
    () => (
        <PermissionControlDisabled permissions={PERMISSIONS.ENTITY_CUSTOM_EDIT}>
            <Tooltip title={getIntlText('common.label.detail')}>
                <IconButton sx={{ width: 30, height: 30 }}>
                    <ListAltIcon sx={{ width: 20, height: 20 }} />
                </IconButton>
            </Tooltip>
        </PermissionControlDisabled>
    ),
    [getIntlText],
);

```

### 添加新的应用模块详情权限控制

* 引入 usePermissionsError hooks
* 获取 hooks 函数 handlePermissionsError
* 传入应用详情的错误信息 error, 若无权限，则跳转至 403 页面

```tsx
import { usePermissionsError } from '@/hooks';

    const { handlePermissionsError } = usePermissionsError();

    const {
        loading,
        run: getDeviceDetail,
    } = useRequest(
        async () => {
            if (!deviceId) return;
            const [error, resp] = await awaitWrap(deviceAPI.getDetail({ id: deviceId }));
            const respData = getResponseData(resp);

            if (error || !respData || !isRequestSuccess(resp)) {
                handlePermissionsError(error);
                return;
            }

            const data = objectToCamelCase(respData);

            setDeviceDetail(data);
            return data;
        },
        {
            debounceWait: 300,
            refreshDeps: [deviceId],
        },
    );
```

![403](/img/403.png)