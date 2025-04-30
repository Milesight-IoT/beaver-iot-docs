---
sidebar_position: 23
---

# 集成定制

集成是 BeaverIoT 实现设备连接、设备控制、功能拓展的主要途径，它能够使 BeaverIoT 和其它软件、设备、第三方平台等交互。 BeaverIoT 平台的集成面向社区共建，促进系统的扩展和集成。

在 BeaverIoT Web 项目中，我们内置了通用的集成详情页，用于展示集成的基本信息和配置项。开发者可以根据自己的需求，自定义集成详情页的样式和内容。

### 文件结构

```
beaver-iot-web/apps/web/
├── src
│   ├── pages
│   │   ├── integration/view/integration-detail/
│   │   │   ├── components
│   │   │   │   ├── general-content     # 通用集成详情组件
│   │   │   │   └── ...
│   │   │   │
│   │   │   └── index.tsx
│   │   └── ...
│   └── ...
```

## 内容定制

以上是 BeaverIoT Web 项目中集成详情页的文件结构，其中 `pages/integration/view/integration-detail` 目录下的 `index.tsx` 文件是集成详情页的入口文件，`components/` 文件夹中存放的是集成详情页的通用组件及定制组件。

在开始开发定制前，开发者需先拿到集成的唯一 ID，该 ID 可以在接口数据中，或集成详情页的 URL 中找到。首先，在 `components` 下创建一个新的集成详情组件，以创建一个 `msc-integration` 集成为例：

```
├── src
│   ├── pages
│   │   ├── integration/view/integration-detail/
│   │   │   ├── components
│   │   │   │   ├── general-content     # 通用集成详情组件
│   │   │   │   ├── msc-content         # msc 集成详情组件
│   │   │   │   └──...
│   │   │   │
│   │   │   └── index.tsx
│   │   └──...
│   └──...
```

然后，在 `index.tsx` 文件中，根据集成的唯一 ID，调用相应的集成详情组件，如下：

```tsx
import { useState, useLayoutEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { GeneralContent, MscContent } from './components';

// ...

const renderContent = () => {
    // 根据集成的唯一 ID，调用相应的集成详情组件
    if (basicInfo?.id === 'msc-integration') {
        return <MscContent entities={entityList} onUpdateSuccess={refreshInteDetail} />;
    }

    return (
        <GeneralContent
            loading={loading}
            entities={entityList}
            excludeServiceKeys={excludeServiceKeys}
            onUpdateSuccess={refreshInteDetail}
        />
    );
};

// ...
```

最后，在 `msc-content` 组件中，开发者可根据集成的具体需求，自定义集成详情页的样式和内容。
