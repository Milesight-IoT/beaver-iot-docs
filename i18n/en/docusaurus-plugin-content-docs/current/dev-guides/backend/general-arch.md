---
sidebar_position: 1
---

import { ProjectName } from '/src/consts';

# Backend Architecture

## Overall Architecture
![Functional Architecture](/img/en/functional-arch.png)
> The image illustrates the conceptual architecture. Some components are continuously being refined.

- **Data Layer**: The data storage layer. It supports Postgres SQL and out-of-the-box databases like H2.
- **Core Layer**:
    - **Data Exchange**: Core support capabilities, including rule engines, dynamic scripts, event buses, and other essential functionalities. It also includes connectors built on these core capabilities to support device data upstream and downstream business scenarios.
    - **Standards/Specifications**: The {ProjectName} platform defines standards and specifications for integrated development, including basic standards, integration standards, entity standards, SPI standards, and more, to standardize integrated service development.
- **Component Layer**: General technical components that are modularized for better reuse by upper-layer services.
- **Service Layer**:
    - **Service**: Essential services built on the core and component layers to support upper-layer applications.
    - **Integration**: Integration is the primary means by which {ProjectName} achieves device connectivity, control, and functionality extension. It allows {ProjectName} to interact with other software, devices, and third-party platforms. Integrations on {ProjectName} are developed as plugins, fostering community co-creation and promoting system expansion and integration.
- **Application Layer**: Specific business applications built on the services and components provided by the service layer.

![General Architecture](/img/en/general-arch.svg)

Overall, {ProjectName} implements a microkernel architecture, with specific functionalities achieved through integrations. {ProjectName} itself is responsible for data storage, basic process definitions, integration management, and general interface implementation.