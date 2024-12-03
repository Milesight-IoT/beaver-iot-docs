---
sidebar_position: 7
---

import { ProjectName } from '/src/consts';

# Development Best Practices

## Integration Should Focus on Specific Features
**Avoid integrating overly fundamental functionalities**. For example, basic capabilities such as MQTT, Socket, or Webhook should not be integrated directly. These underlying capabilities should be implemented as core system components or dependencies. The interaction between integrations and upper-layer functionalities should primarily be driven by entity events.

**Do not create overly comprehensive integrations**. For instance, if you intend to develop an integration to check whether a device is online and send an email notification if it is not, this should be split into two separate integrations: one for monitoring device connectivity and another for sending alert emails.

In summary, integrations should not be overly flexible or generic. Instead, they should focus on extending specific functionalities for particular scenarios or platforms.

## Frontend and Backend Integrations
An integration does not necessarily require both frontend and backend components.
* If an integration only needs to utilize existing HTTP API interfaces for UI interactions, it can be a frontend-only integration, such as a new dashboard component.
* If an integration only needs to connect to other platforms or components to synchronize device and entity data, it can be a backend-only integration, such as a gateway integration.

If the integration logic is highly complex and requires both UI and backend support for a better user experience, then this **logically** single integration will need both frontend and backend components. However, since the frontend and backend of {ProjectName} are separate projects, a **logically** single integration is implemented as two separate integrations: one for the frontend and one for the backend.
