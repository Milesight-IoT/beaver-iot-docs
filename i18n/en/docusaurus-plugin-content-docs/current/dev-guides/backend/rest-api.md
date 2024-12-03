---
sidebar_position: 6
toc_min_heading_level: 2
toc_max_heading_level: 5
---

import { ProjectName } from '/src/consts';

# REST API

## Overview

## REST API
### Return Value Interface Specification

| Name           | Location | Type   | Description                             |
|----------------|----------|--------|-----------------------------------------|
| request_id     | body     | string | Unique request identifier ID            |
| status         | body     | string | Request status: `Success`/`Failed`      |
| error_code     | body     | string | Error code, present when status is `Failed` |
| error_message  | body     | string | Error message, present when status is `Failed` |
| detail_message | body     | string | Detailed error message, possibly present when status is `Failed` |
| **data**       | **body** | **object** | **Returned result data**, generally present when status is `Success` |

## Authentication

### POST Token Refresh

POST /oauth2/token

#### Request Parameters

| Name           | Location | Type   | Required | Description |
|----------------|----------|--------|----------|-------------|
| body           | body     | object | No       | none        |
| » refresh_token| body     | string | No       | none        |
| » grant_type   | body     | string | No       | none        |
| » client_id    | body     | string | No       | none        |
| » client_secret| body     | string | No       | none        |
| » username     | body     | string | No       | none        |
| » password     | body     | string | No       | none        |

> Body Request Parameters

```yaml
refresh_token: string
grant_type: password
client_id: iab
client_secret: milesight*iab
username: string
password: string
```

#### Response

| Status Code | Description                                                                 | Data Model |
|-------------|-----------------------------------------------------------------------------|------------|
| 200         | [OK](https://tools.ietf.org/html/rfc7231#section-6.3.1) | Success | Inline    |

> Response Example

> 200 Response

```json
{
  "access_token": "string",
  "expires_in": 0,
  "refresh_token": "string"
}
```

### POST User Registration

POST /user/register

#### Request Parameters

| Name     | Location | Type   | Required | Description |
|----------|----------|--------|----------|-------------|
| body     | body     | object | No       | none        |
| » email  | body     | string | Yes      | none        |
| » nickname| body    | string | Yes      | none        |
| » password| body    | string | Yes      | none        |

> Body Request Parameters

```json
{
  "email": "string",
  "nickname": "string",
  "password": "string"
}
```

#### Response

| Status Code | Description                                                                 | Data Model |
|-------------|-----------------------------------------------------------------------------|------------|
| 200         | [OK](https://tools.ietf.org/html/rfc7231#section-6.3.1) | Success | Inline    |

> Response Example

> 200 Response

```json
{}
```

### GET User Status Information

GET /user/status

#### Response

| Status Code | Description                                                                 | Data Model |
|-------------|-----------------------------------------------------------------------------|------------|
| 200         | [OK](https://tools.ietf.org/html/rfc7231#section-6.3.1) | Success | Inline    |

> Response Example

> 200 Response

```json
{
  "data": {
    "init": true
  }
}
```

## Integration

### POST Get Integration List

POST /integration/search

#### Request Parameters

| Name             | Location | Type    | Required | Description                     |
|------------------|----------|---------|----------|---------------------------------|
| device_addable   | body     | boolean | No       | Whether to return integrations that can add devices |
| device_deletable | body     | boolean | No       | Whether to return integrations that can delete devices |

> Body Request Parameters

```json
{
  "device_addable": true,
  "device_deletable": true
}
```

#### Response

| Field Name                | Field Type | Description                       |
|---------------------------|------------|-----------------------------------|
| $                         | object     | Integration information list item |
| $.id                      | string     | Integration ID                    |
| $.icon                    | string     | Integration icon URL              |
| $.name                    | string     | Integration name                  |
| $.description             | string     | Integration description           |
| $.add_device_service_key  | string     | Add device service entity key     |
| $.device_count            | number     | Number of devices                 |
| $.entity_count            | number     | Number of entities (including device and integration entities) |

> Response Example

> Success

```json
{
  "data": [
    {
      "id": "",
      "icon": "",
      "name": "",
      "description": "",
      "add_device_service_key": "",
      "deviceCount": 0,
      "entityCount": 0
    }
  ]
}
```

### GET Get Integration Details

GET /integration/\{integration_id\}

#### Request Parameters

| Name           | Location | Type   | Required | Description |
|----------------|----------|--------|----------|-------------|
| integration_id | path     | string | Yes      | Integration ID |

#### Response

| Field Name                     | Field Type | Description                       |
|--------------------------------|------------|-----------------------------------|
| id                             | string     | Integration ID                    |
| icon                           | string     | Integration icon URL              |
| name                           | string     | Integration name                  |
| description                    | string     | Integration description           |
| add_device_service_key         | string     | Add device service entity key     |
| entity_count                   | number     | Number of entities (including device and integration entities) |
| delete_device_service_key      | string     | Delete device service entity key  |
| integration_entities           | array      | List of integration entities      |
| integration_entities.$         | object     | Integration entity list item      |
| integration_entities.$.id      | string     | Entity ID                         |
| integration_entities.$.key     | string     | Entity key                        |
| integration_entities.$.name    | string     | Entity name                       |
| integration_entities.$.type    | string     | Entity type (PROPERTY / SERVICE / EVENT) |
| integration_entities.$.value_attribute | object | Entity attribute                  |
| integration_entities.$.value_type | string  | Data type (STRING / LONG / DOUBLE / BOOLEAN / BINARY / OBJECT) |
| integration_entities.$.access_mod | string  | Read/Write (R / W / RW) - only for property type entities |
| integration_entities.$.parent  | string     | Parent entity key                 |
| integration_entities.$.value   | string     | Current value of the entity       |

> Response Example

> Success

```json
{
  "data": {
    "id": "",
    "icon": "",
    "name": "",
    "description": "",
    "add_device_service_key": "",
    "deviceCount": 0,
    "entityCount": 0,
    "delete_device_service_key": "",
    "integration_entities": [
      {
        "id": "",
        "key": "",
        "name": "",
        "type": "",
        "value_attribute": {
          "": {}
        },
        "value_type": "",
        "access_mod": "",
        "parent": "",
        "value": {}
      }
    ]
  }
}
```

## Devices

### POST Create Device

POST /device

#### Request Parameters

| Name           | Location | Type   | Required | Description |
|----------------|----------|--------|----------|-------------|
| name           | body     | string | Yes      | Device name |
| integration    | body     | string | Yes      | Integration ID |
| param_entities | body     | object | Yes      | Parameters required for adding the device service |

> Body Request Parameters

```json
{
  "name": "string",
  "integration": "string",
  "param_entities": {
    "key": "value"
  }
}
```

#### Response

> Response Example

> Success

```json
{}
```

### POST Search Devices

POST /device/search

#### Request Parameters

| Name        | Location | Type   | Required | Description     |
|-------------|----------|--------|----------|-----------------|
| name        | body     | string | No       | Device name to search |
| page_number | body     | number | No       | Page number      |
| page_size   | body     | number | No       | Page size        |

> Body Request Parameters

```json
{
    "name": "",
    "page_number": 1,
    "page_size": 10
}
```

#### Response

> Response Example

> Success

```json
{
    "data": {
        "page_size": 0,
        "page_number": 0,
        "total": 0,
        "content": [
            {
                "id": "",
                "key": "",
                "name": "",
                "integration": "",
                "additional_data": {},
                "created_at": 0,
                "updated_at": 0,
                "integration_name": "",
                "deletable": true
            }
        ]
    }
}
```

### PUT Update Device Information

PUT /device/\{device_id\}

#### Request Parameters

| Name      | Location | Type   | Required | Description |
|-----------|----------|--------|----------|-------------|
| device_id | path     | string | Yes      | Device ID   |
| name      | body     | string | No       | Device name |

> Body Request Parameters

```json
{
  "name": "string"
}
```

#### Response

> Response Example

> Success

```json
{}
```

### GET Get Device Details

GET /device/\{device_id\}

#### Request Parameters

| Name      | Location | Type   | Required | Description |
|-----------|----------|--------|----------|-------------|
| device_id | path     | string | Yes      | Device ID   |

#### Response

| Field Name        | Field Type | Description                |
|-------------------|------------|----------------------------|
| id                | string     | Device ID                  |
| key               | string     | Device key                 |
| name              | string     | Device name                |
| integration       | string     | Integration ID             |
| integration_name  | string     | Integration name           |
| additional_data   | object     | Additional data            |
| created_at        | number     | Creation timestamp         |
| updated_at        | number     | Update timestamp           |
| deletable         | boolean    | Deletable flag             |
| identifier        | string     | Identifier                 |
| entities          | array      | List of device entities    |
| entities.$        | object     | Device entity list item    |
| entities.$.id     | string     | Entity ID                  |
| entities.$.key    | string     | Entity key                 |
| entities.$.name   | string     | Entity name                |
| entities.$.type   | string     | Entity type                |
| entities.$.value_attribute | object | Entity attribute     |
| entities.$.value_type | string | Entity value type          |

> Response Example

> Success

```json
{
  "data": {
    "id": "",
    "key": "",
    "name": "",
    "integration": "",
    "additional_data": {
      "": {}
    },
    "created_at": 0,
    "updated_at": 0,
    "integration_name": "",
    "deletable": false,
    "identifier": "",
    "entities": [
      {
        "id": "",
        "key": "",
        "name": "",
        "type": "",
        "value_attribute": {
          "": {}
        },
        "value_type": ""
      }
    ]
  }
}
```

### POST Batch Delete Devices

POST /device/batch-delete

#### Request Parameters

| Name           | Location | Type   | Required | Description                     |
|----------------|----------|--------|----------|---------------------------------|
| device_id_list | body     | array  | Yes      | List of device IDs to delete    |
| device_id_list.$ | body   | string | Yes      | Device ID                       |

> Body Request Parameters

```json
{
  "device_id_list": [
    "string"
  ]
}
```

#### Response

> Response Example

> Success

```json
{}
```

## Entities

### POST Query Entities

POST /entity/search

#### Request Parameters

| Name             | Location | Type    | Required | Description |
|------------------|----------|---------|----------|-------------|
| body             | body     | object  | No       | none        |

> Body Request Parameters

```json
{
  "keyword": "string",
  "entityType": ["PROPERTY", "SERVICE", "EVENT"],
  "excludeChildren": "Boolean",
  "entityValueType": ["STRING", "LONG", "DOUBLE", "BOOLEAN", "BINARY", "OBJECT"],
  "entityAccessMod": ["R", "W", "RW"]
}
```

#### Response

| Status Code | Description                                                                 | Data Model |
|-------------|-----------------------------------------------------------------------------|------------|
| 200         | [OK](https://tools.ietf.org/html/rfc7231#section-6.3.1) | Success | Object    |
| » entityId  | string     | none        | none        |
| » entityName | string    | none        | none        |
| » entityType | string    | none        | none        |
| » entityValueType | string | none      | none        |
| » entityValueAttribute | object | none | none        |
| » entityAccessMod | string | none      | none        |
| » entityKey | string     | none        | none        |
| » deviceName | string    | none        | none        |
| » integrationName | string | none      | none        |

> Response Example

> Success

```json
{
  "data": {
    "deviceName": "String",
    "integrationName": "String",
    "entityId": "String",
    "entityAccessMod": "String",
    "entityKey": "String",
    "entityName": "String",
    "entityType": "String",
    "entityValueAttribute": {},
    "entityValueType": "String"
  }
}
```

### GET Get Child Entities

GET /entity/\{entityId\}/children

#### Request Parameters

| Name      | Location | Type   | Required | Description |
|-----------|----------|--------|----------|-------------|
| entityId  | path     | string | Yes      | none        |

#### Response

| Status Code | Description                                                                 | Data Model |
|-------------|-----------------------------------------------------------------------------|------------|
| 200         | [OK](https://tools.ietf.org/html/rfc7231#section-6.3.1) | Success | Object    |
| data        | array      | none        | Array       |
| » entityId  | string     | none        | none        |
| » entityName| string     | none        | none        |
| » entityType| string     | none        | none        |
| » entityValueType | string | none      | none        |
| » entityValueAttribute | object | none | none        |
| » entityAccessMod | string | none      | none        |
| » integrationName | string | none      | none        |
| » deviceName | string    | none        | none        |
| » entityKey | string     | none        | none        |

> Response Example

> Success

```json
{
  "data": [
    {
      "deviceName": "",
      "integrationName": "",
      "entityId": "",
      "entityAccessMod": "",
      "entityKey": "",
      "entityType": "",
      "entityName": "",
      "entityValueAttribute": {
        "": {}
      },
      "entityValueType": ""
    }
  ]
}
```

### POST Query Historical Data

POST /entity/history/search

#### Request Parameters

| Name             | Location | Type    | Required | Description |
|------------------|----------|---------|----------|-------------|
| body             | body     | object  | No       | none        |

> Body Request Parameters

```json
{
  "entityId": 0,
  "startTimestamp": 0,
  "endTimestamp": 0
}
```

#### Response

| Status Code | Description                                                                 | Data Model |
|-------------|-----------------------------------------------------------------------------|------------|
| 200         | [OK](https://tools.ietf.org/html/rfc7231#section-6.3.1) | Success | Object    |
| » timestamp | integer    | none        | none        |
| » value     | object     | none        | none        |
| » valueType | string     | none        | none        |

> Response Example

> Success

```json
{
  "timestamp": 0,
  "value": "Object",
  "valueType": "String[STRING, LONG, DOUBLE, BOOLEAN, BINARY, OBJECT]"
}
```

### POST Query Historical Data Aggregation

POST /entity/history/aggregate

#### Request Parameters

| Name             | Location | Type    | Required | Description |
|------------------|----------|---------|----------|-------------|
| body             | body     | object  | No       | none        |

> Body Request Parameters

```json
{
  "entityId": 0,
  "aggregateType": "LAST",
  "startTimestamp": 0,
  "endTimestamp": 0
}
```

#### Response

| Status Code | Description                                                                 | Data Model |
|-------------|-----------------------------------------------------------------------------|------------|
| 200         | [OK](https://tools.ietf.org/html/rfc7231#section-6.3.1) | Success | Object    |
| » value     | object     | none        | none        |
| » valueType | string     | none        | none        |
| » countResult | array    | none        | Array       |
| »» value    | object     | none        | none        |
| »» valueType | string    | none        | none        |
| »» count    | integer    | none        | none        |

> Response Example

> Success

```json
{
  "data":{
    "value": {},
    "valueType": "",
    "countResult": [
      {
        "value": {},
        "valueType": "",
        "count": 0
      }
    ]
  }
}
```

### GET Retrieve the Latest Value of an Entity

GET /entity/\{entityId\}/status

#### Request Parameters

| Name      | Location | Type   | Required | Description |
|-----------|----------|--------|----------|-------------|
| entityId  | path     | string | Yes      | none        |

#### Response

| Status Code | Meaning | Description | Data Model |
|-------------|---------|-------------|------------|
| 200         | [OK](https://tools.ietf.org/html/rfc7231#section-6.3.1) | Success     | Object     |
| » value     | object  | none        | none       |
| » updatedAt | string  | none        | none       |
| » valueType | string  | none        | none       |

> Example Response

> Success

```json
{
  "data": {
    "value": {},
    "updatedAt": "",
    "valueType": ""
  }
}
```

### GET Retrieve Entity Metadata

GET /entity/\{entityId\}/meta

#### Request Parameters

| Name      | Location | Type   | Required | Description |
|-----------|----------|--------|----------|-------------|
| entityId  | path     | string | Yes      | none        |

#### Response

| Status Code | Meaning | Description | Data Model |
|-------------|---------|-------------|------------|
| 200         | [OK](https://tools.ietf.org/html/rfc7231#section-6.3.1) | Success     | Object     |
| » key       | string  | none        | none       |
| » name      | string  | none        | none       |
| » type      | string  | none        | none       |
| » accessMod | string  | none        | none       |
| » valueAttribute | object | none    | none       |
| » valueType | string  | none        | none       |

> Example Response

> Success

```json
{
  "data": {
    "key": "",
    "name": "",
    "type": "",
    "accessMod": "",
    "valueAttribute": {
      "": {}
    },
    "valueType": ""
  }
}
```

## Dashboard

### POST Create Dashboard

POST /dashboard

#### Request Parameters

| Name  | Location | Type   | Required | Description |
|-------|----------|--------|----------|-------------|
| body  | body     | Object | No       | none        |
| » name | body    | string | Yes      | none        |

> Body Request Example

```json
{
  "name": "string"
}
```

#### Response

| Status Code | Meaning | Description | Data Model |
|-------------|---------|-------------|------------|
| 200         | [OK](https://tools.ietf.org/html/rfc7231#section-6.3.1) | Success     | Object     |

> Example Response

> Success

```json
{
  "data": {
    "dashboardId": ""
  }
}
```

### PUT Update Dashboard

PUT /dashboard/\{dashboardId\}

#### Request Parameters

| Name         | Location | Type   | Required | Description |
|--------------|----------|--------|----------|-------------|
| dashboardId  | path     | string | Yes      | none        |
| body         | body     | Object | No       | none        |
| » name       | body     | string | Yes      | none        |
| » widgets    | body     | Array  | Yes      | none        |
| »» widgetId  | body     | string | Yes      | none        |
| »» data      | body     | Object | Yes      | none        |

> Body Request Example

```json
{
  "name": "string",
  "widgets": [
    {
      "widgetId": "string",
      "data": {
      }
    }
  ]
}
```

#### Response

| Status Code | Meaning | Description | Data Model |
|-------------|---------|-------------|------------|
| 200         | [OK](https://tools.ietf.org/html/rfc7231#section-6.3.1) | Success     | Object     |

> Example Response

> Success

```json
{
  "data": {
    
  }
}
```

### DELETE Delete Dashboard

DELETE /dashboard/\{dashboardId\}

#### Request Parameters

| Name        | Location | Type   | Required | Description |
|-------------|----------|--------|----------|-------------|
| dashboardId | path     | string | Yes      | none        |

#### Response

| Status Code | Meaning | Description | Data Model |
|-------------|---------|-------------|------------|
| 200         | [OK](https://tools.ietf.org/html/rfc7231#section-6.3.1) | Success     | Object     |

> Example Response

> Success

```json
{
  "data": {
    
  }
}
```

### GET Retrieve All Dashboards

GET /dashboard/dashboards

#### Response

| Status Code | Meaning | Description | Data Model |
|-------------|---------|-------------|------------|
| 200         | [OK](https://tools.ietf.org/html/rfc7231#section-6.3.1) | Success     | Object     |
| data        | Array   | none        | Array      |
| » dashboardId | string | none       | String     |
| » name      | string  | none        | String     |
| » widgets   | Array   | none        | Array      |
| »» widgetId | string  | none        | String     |
| »» data     | Object  | none        | Object     |
| » createdAt | string  | none        | String     |

> Example Response

> Success

```json
{
  "data": [
    {
      "dashboardId": "",
      "name": "",
      "widgets": [
        {
          "widgetId": "",
          "data": {
            "": {}
          }
        }
      ],
      "createdAt": ""
    }
  ]
}
```

### WebSocket

WebSocket connection URL: ws://\{host\}:\{port\}/websocket

#### Request Parameters

| Name         | Location | Type   | Required | Description |
|--------------|----------|--------|----------|-------------|
| Authorization | query    | string | Yes      | none        |