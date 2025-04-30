---
sidebar_position: 23
---

# Integration Customization

Integration is the primary way for BeaverIoT to achieve device connectivity, device control, and functionality extension. It enables BeaverIoT to interact with other software, devices, and third-party platforms. The integration feature of the BeaverIoT platform is community-driven, promoting system expansion and integration.

In the BeaverIoT Web project, we have built a general integration detail page to display basic information and configuration options for integrations. Developers can customize the style and content of the integration detail page according to their needs.

### File Structure

```
beaver-iot-web/apps/web/
├── src
│   ├── pages
│   │   ├── integration/view/integration-detail/
│   │   │   ├── components
│   │   │   │   ├── general-content     # General integration detail component
│   │   │   │   └── ...
│   │   │   │
│   │   │   └── index.tsx
│   │   └── ...
│   └── ...
```

## Content Customization

The above is the file structure of the integration detail page in the BeaverIoT Web project. The `index.tsx` file under the `pages/integration/view/integration-detail` directory is the entry point for the integration detail page, and the `components/` folder contains both general and custom components for the integration detail page.

Before starting customization, developers need to obtain the unique ID of the integration, which can be found in the API data or the URL of the integration detail page. First, create a new integration detail component under the `components` folder. For example, to create a component for the `msc-integration` integration:

```
├── src
│   ├── pages
│   │   ├── integration/view/integration-detail/
│   │   │   ├── components
│   │   │   │   ├── general-content     # General integration detail component
│   │   │   │   ├── msc-content         # MSC integration detail component
│   │   │   │   └──...
│   │   │   │
│   │   │   └── index.tsx
│   │   └──...
│   └──...
```

Then, in the `index.tsx` file, call the corresponding integration detail component based on the unique ID of the integration, as shown below:

```tsx
import { useState, useLayoutEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { GeneralContent, MscContent } from './components';

// ...

const renderContent = () => {
    // Call the corresponding integration detail component based on the unique ID
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

Finally, in the `msc-content` component, developers can customize the style and content of the integration detail page according to the specific requirements of the integration.
