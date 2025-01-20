---
sidebar_position: 17
---

# User Permissions

Role management is used to maintain and manage the roles that exist in the system, and to set the permissions related to the devices and pages available under each role.   
Role-Based Access Control can be achieved by defining roles and permissions and then assigning permissions to different roles. Users are granted permissions based on their roles to access specific routes, page components, or operations.

The following describes how the new application module accesses user permissions control.

## Overall Process

1. Add new application module permission code
2. Add new application module routing permission control
3. Add new secondary menu tab permission control
4. Add new application module button permission control
5. Add new application module details permission control

### Add new application module permission code

The code file directory is：**apps\web\src\constants.ts**

```typescript
/**
 * permissions configuration code
 */
export enum PERMISSIONS {
    /**
     * dashboard module
     */
    DASHBOARD_MODULE = 'dashboard',
    DASHBOARD_VIEW = 'dashboard.view',
    DASHBOARD_ADD = 'dashboard.add',
    DASHBOARD_EDIT = 'dashboard.edit',

    /**
     * device module
     */
    DEVICE_MODULE = 'device',
    DEVICE_VIEW = 'device.view',
    DEVICE_ADD = 'device.add',
    DEVICE_EDIT = 'device.edit',
    DEVICE_DELETE = 'device.delete',

    /**
     * entity module
     * custom entity module
     */
    ENTITY_MODULE = 'entity',
    ENTITY_CUSTOM_MODULE = 'entity_custom',
    ENTITY_CUSTOM_VIEW = 'entity_custom.view',
    ENTITY_CUSTOM_ADD = 'entity_custom.add',
    ENTITY_CUSTOM_EDIT = 'entity_custom.edit',
    ENTITY_CUSTOM_DELETE = 'entity_custom.delete',
    /**
     * entity data module
     */
    ENTITY_DATA_MODULE = 'entity_data',
    ENTITY_DATA_VIEW = 'entity_data.view',
    ENTITY_DATA_EDIT = 'entity_data.edit',
    ENTITY_DATA_EXPORT = 'entity_data.export',

    /**
     * user role module
     */
    USER_ROLE_MODULE = 'user_role',

    /**
     * workflow module
     */
    WORKFLOW_MODULE = 'workflow',
    WORKFLOW_VIEW = 'workflow.view',
    WORKFLOW_ADD = 'workflow.add',
    WORKFLOW_EDIT = 'workflow.edit',
    WORKFLOW_DELETE = 'workflow.delete',

    /**
     * integration module
     */
    INTEGRATION_MODULE = 'integration',
    INTEGRATION_VIEW = 'integration.view',
}
```

### Add new application module routing permission control

The code file directory is：**apps\web\src\routes\routes.tsx**

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
    /** Custom Routing Metadata */
    handle?: {
        title?: string;

        /** menu icon */
        icon?: React.ReactNode;

        /**
         * Layout type, defaults to `basic`.
         *
         * Note: The type here should be LayoutType, but there will be an inference error, so it is defined as string for the time being.
         */
        layout?: string;

        /** Whether to access without login, default `false` (login required) */
        authFree?: boolean;

        /**
         * The page should be accessible based on satisfying one of the functions of the current route
         * Then satisfying one of the permissions in the array enables the current routing access
         */
        permissions?: PERMISSIONS | PERMISSIONS[];

        /**
         * Whether to hide in the menu bar
         */
        hideInMenuBar?: boolean;

        /** Hide Sidebar */
        hideSidebar?: boolean;
    };

    /** sub route */
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

### Add new secondary menu tab permission control

The Entity Application module is used as an example to illustrate the access to the secondary menu custom entity labels and permission control for entity data labels.   

![entity-tabs](/img/entity-tabs.png)  

#### Steps
* Introduce useUserPermissions hooks
* Set the tag's permission code, for example: permission: PERMISSIONS.ENTITY_CUSTOM_MODULE 
* Determine if the user has this permission based on the hasPermission in the hooks.


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

### Add new application module button permission control

#### Option 1: Hidden buttons
* Introduce the High-Order component PermissionControlHidden
* Set the permission code of the button permissions: PERMISSIONS.DEVICE_EDIT


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

#### Option 2: Disable buttons
* Introduce the High-Order component PermissionControlDisabled
* Set the permission code of the button permissions: PERMISSIONS.ENTITY_CUSTOM_EDIT


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

### Add new application module details permissions control

* Introduce usePermissionsError hooks
* Get the hooks function handlePermissionsError.
* Pass params in the application details error, then redirect to a 403 page if you don't have permission.

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