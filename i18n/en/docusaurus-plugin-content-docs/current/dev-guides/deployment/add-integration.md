---
sidebar_position: 3
---

import { ProjectName } from '/src/consts';

# Adding Integrations
After running the above command to start the Docker container, a directory named `beaver-iot` will be created in the path where the command was executed. This directory is used to store persistent data for {ProjectName}, such as databases and logs.

To install integrations for {ProjectName}, create a folder named `plugins` in this directory, place the integration files with the `.jar `extension into it, and then run the command `docker restart beaver-iot` to restart the service and apply the changes.

<!-- You can get integration examples from [here](https://drive.weixin.qq.com/s?k=AMgAYAe8AAYhvgqr6K). -->
