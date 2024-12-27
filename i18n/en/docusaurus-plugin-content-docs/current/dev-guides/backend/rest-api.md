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
  "refresh_token:":"string"
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

### GET User Information
GET /user

#### Response

| Status Code | Description                                                                 | Data Model |
|-------------|-----------------------------------------------------------------------------|------------|
| 200         | [OK](https://tools.ietf.org/html/rfc7231#section-6.3.1) | Success | Inline    |

> Response Example

> 200 Response

```json
{
  "data": {
    "tenant_id": "string",
    "user_id": "string",
    "nickname": "string",
    "email": "string",
    "created_at": "string",
    "roles": [{
      "role_id": "string",
      "role_name": "string"
    }],
    "menus": [
      {
        "menu_id": "",
        "code": "",
        "name": "",
        "type": "",
        "parent_id":""
      }
    ],
    "super_admin": true
  }
}
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

### Post user list (page)
Post /user/members/search

#### 请求参数
|名称|位置| 类型     |必选| 说明                  |
|---|---|--------|---|---------------------|
|body|body| Object | 否 | none                |
|» keyword|body|string| 否 | 模糊匹配nickname或email  |

> Body 请求参数
```json
{
  "keyword": "string"
}
```

#### Response

| Status Code | Description                                                                 | Data Model |
|-------------|-----------------------------------------------------------------------------|------------|
| 200         | [OK](https://tools.ietf.org/html/rfc7231#section-6.3.1) | Success | Inline    |

> Response Example

> 200 Response

```json
{
  "data": {
    "tenant_id": "string",
    "user_id": "string",
    "nickname": "string",
    "email": "string",
    "created_at": "string",
    "roles": [{
      "role_id": "string",
      "role_name": "string"
    }]
  }
}
```

### POST create user
POST /user/members

#### Request Parameters

| Name           | Location | Type   | Required | Description |
|----------------|----------|--------|----------|-------------|
|body|body|object| NO |none|
|» email|body|string| YES |none|
|» nickname|body|string| YES |none|
|» password|body|string| YES |none|

> Body REQUEST

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

### PUT edit user
PUT /user/members/\{userId\}

#### Request Parameters

| Name           | Location | Type   | Required | Description |
|----------------|----------|--------|----------|-------------|
|userId|path|string| YES |none|
|body|body|object| NO |none|
|» email|body|string| YES |none|
|» nickname|body|string| YES |none|

> Body REQUEST

```json
{
  "email": "string",
  "nickname": "string"
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

### PUT RESET password
PUT /user/members/\{userId\}/change-password

#### Request Parameters

| Name           | Location | Type   | Required | Description |
|----------------|----------|--------|----------|-------------|
|userId|path|string| YES |none|
|body|body|object| NO |none|
|» password|body|string| NO |none|

> Body Request

```json
{
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

### DELETE delete user

DELETE /user/members/\{user_id\}

#### Request Parameters

| Name           | Location | Type   | Required | Description |
|----------------|----------|--------|----------|-------------|
|---------|---|---|---|---|
| user_id |path|string| YES |none|

#### Response

| Status Code | Description                                                                 | Data Model |
|-------------|-----------------------------------------------------------------------------|------------|
| 200         | [OK](https://tools.ietf.org/html/rfc7231#section-6.3.1) | Success | Inline    |

> Response Example

> 200 Response

```json
{
  "data":{
    
  }
}
```

### POST batch delete user
POST /user/batch-delete

#### Request Parameters

| Name           | Location | Type   | Required | Description |
|----------------|----------|--------|----------|-------------|
| body           |body| object | NO |none|
| » user_id_list |body| Array  | YES |none|

> Body REQUEST

```json
{
  "user_id_list": []
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

### PUT edit password（self）
PUT /user/password

#### Request Parameters

| Name           | Location | Type   | Required | Description |
|----------------|----------|--------|----------|-------------|
| body           |body|object| NO |none|
| » old_password |body|string| YES |none|
| » new_password |body|string| YES |none|

> Body Request

```json
{
  "old_password": "string",
  "new_password": "string"
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

### GET user menu list

GET /user/members/\{user_id\}/menus

#### Request Parameters

| Name           | Location | Type   | Required | Description |
|----------------|----------|--------|----------|-------------|
| user_id |path|string| YES |none|

#### Response

| Status Code | Description                                                                 | Data Model |
|-------------|-----------------------------------------------------------------------------|------------|
| 200         | [OK](https://tools.ietf.org/html/rfc7231#section-6.3.1) | Success | Inline    |

> Response Example

> 200 Response

```json
{
  "data": [
    {
      "menu_id": "",
      "code": "",
      "name": "",
      "type": "",
      "parent_id":""
    }
  ]
}
```

### Post is has some resource permission
Post /user/members/\{userId\}/permission

#### 请求参数

| 名称              |位置|类型|必选|说明|
|-----------------|---|---|---|---|
| userId          |path|string| 是 |none|
| body            |body|object| 否 |none|
| » resource_type |body|string| 是 |none|
| » resource_id   |body|string| 是 |none|

> Body 请求参数

```json
{
  "resource_type": "string",
  "resource_id": "string"
}
```

#### Request Parameters

| Name           | Location | Type   | Required | Description |
|----------------|----------|--------|----------|-------------|
| userId          |path|string| YES |none|

#### Response

| Status Code | Description                                                                 | Data Model |
|-------------|-----------------------------------------------------------------------------|------------|
| 200         | [OK](https://tools.ietf.org/html/rfc7231#section-6.3.1) | Success | Inline    |

> Response Example

> 200 Response

```json
{
  "has_permission": true
}
```

### POST create role
POST /user/roles

#### Request Parameters

| Name           | Location | Type   | Required | Description |
|----------------|----------|--------|----------|-------------|
| body   |body| Object | NO  |none|
| » name |body|string| YES  |none|
| » description |body|string| NO  |none|

> Body REQUEST

```json
{
  "name": "string",
  "description": "string"
}
```

#### Response

| Status Code | Description                                                                 | Data Model |
|-------------|-----------------------------------------------------------------------------|------------|
| 200         | [OK](https://tools.ietf.org/html/rfc7231#section-6.3.1) | Success | Inline    |

> Response Example

> 200 Response

```json
{
  "data":{
    "role_id": ""
  }
}
```

### PUT update role

PUT /user/roles/\{role_id\}

#### Request Parameters

| Name           | Location | Type   | Required | Description |
|----------------|----------|--------|----------|-------------|
| role_id      |path| string | YES |none|
| body         |body| Object | NO |none|
| » name       |body|string| YES |none|
| » description |body|string| NO |none|

> Body Request

```json
{
  "name": "string",
  "description": "string"
}
```

#### Response

| Status Code | Description                                                                 | Data Model |
|-------------|-----------------------------------------------------------------------------|------------|
| 200         | [OK](https://tools.ietf.org/html/rfc7231#section-6.3.1) | Success | Inline    |

> Response Example

> 200 Response

```json
{
  "data":{
    
  }
}
```

### DELETE delete role

DELETE /user/roles/\{role_id\}

#### Request Parameters

| Name           | Location | Type   | Required | Description |
|----------------|----------|--------|----------|-------------|
| role_id |path|string| YES |none|

#### Response

| Status Code | Description                                                                 | Data Model |
|-------------|-----------------------------------------------------------------------------|------------|
| 200         | [OK](https://tools.ietf.org/html/rfc7231#section-6.3.1) | Success | Inline    |

> Response Example

> 200 Response

```json
{
  "data":{
    
  }
}
```

### GET role list(page)

Post /user/roles/search

#### Response

| Status Code | Description                                                                 | Data Model |
|-------------|-----------------------------------------------------------------------------|------------|
| 200         | [OK](https://tools.ietf.org/html/rfc7231#section-6.3.1) | Success | Inline    |

> Response Example

> 200 Response

```json
{
  "data": [
    {
      "role_id": "",
      "name": "",
      "description": "",
      "created_at": "",
      "user_role_count": "",
      "role_integration_count": ""
    }
  ]
}
```

### GET user list in role

GET /user/roles/\{role_id\}/members

#### Request Parameters

| Name           | Location | Type   | Required | Description |
|----------------|----------|--------|----------|-------------|
| role_id |path|string| YES |none|

#### Response

| Status Code | Description                                                                 | Data Model |
|-------------|-----------------------------------------------------------------------------|------------|
| 200         | [OK](https://tools.ietf.org/html/rfc7231#section-6.3.1) | Success | Inline    |

> Response Example

> 200 Response

```json
{
  "data": [
    {
      "user_id": "",
      "user_email": "",
      "user_nickname": "",
      "role_id":""
    }
  ]
}
```

### GET menu list in role

GET /user/roles/\{role_id\}/menus

#### Request Parameters

| Name           | Location | Type   | Required | Description |
|----------------|----------|--------|----------|-------------|
| role_id |path|string| YES |none|

#### Response

| Status Code | Description                                                                 | Data Model |
|-------------|-----------------------------------------------------------------------------|------------|
| 200         | [OK](https://tools.ietf.org/html/rfc7231#section-6.3.1) | Success | Inline    |

> Response Example

> 200 Response

```json
{
  "data": [
    {
      "menu_id": "",
      "code": "",
      "name": "",
      "type": "",
      "parent_id":""
    }
  ]
}
```

### Post resource list in role

Post /user/roles/\{role_id\}/resources

#### Request Parameters

| Name           | Location | Type   | Required | Description |
|----------------|----------|--------|----------|-------------|
| role_id         |path|string| Yes |none|
| body            |body| Object | NO |none|
| » resource_type |body|string| NO |none|

#### Response

| Status Code | Description                                                                 | Data Model |
|-------------|-----------------------------------------------------------------------------|------------|
| 200         | [OK](https://tools.ietf.org/html/rfc7231#section-6.3.1) | Success | Inline    |

> Response Example

> 200 Response

```json
{
  "data": [
    {
      "resource_id": "",
      "resource_type":""
    }
  ]
}
```

### Post Integration list in role

Post /user/roles/\{role_id\}/integrations

#### Request Parameters

| Name           | Location | Type   | Required | Description |
|----------------|----------|--------|----------|-------------|
| role_id         |path|string| Yes |none|
| body            |body| Object | NO |none|
| » keyword |body|string| NO |none|

#### Response

| Status Code | Description                                                                 | Data Model |
|-------------|-----------------------------------------------------------------------------|------------|
| 200         | [OK](https://tools.ietf.org/html/rfc7231#section-6.3.1) | Success | Inline    |

> Response Example

> 200 Response

```json
{
  "data": [
    {
      "integration_id": "",
      "integration_name":"",
      "device_num":"",
      "entity_num": ""
    }
  ]
}
```

### Post device list in role

Post /user/roles/\{role_id\}/devices

#### Request Parameters

| Name           | Location | Type   | Required | Description |
|----------------|----------|--------|----------|-------------|
| role_id         |path|string| Yes |none|
| body            |body| Object | no |none|
| » keyword |body|string| no |none|

#### Response

| Status Code | Description                                                                 | Data Model |
|-------------|-----------------------------------------------------------------------------|------------|
| 200         | [OK](https://tools.ietf.org/html/rfc7231#section-6.3.1) | Success | Inline    |

> Response Example

> 200 Response

```json
{
  "data": [
    {
      "device_id": "",
      "device_name":"",
      "created_at": "",
      "integration_id": "",
      "integration_name":"",
      "user_id":"",
      "user_email": "",
      "user_nickname":"",
      "role_integration": "boolean"
    }
  ]
}
```

### Post dashboard list in role

Post /user/roles/\{role_id\}/dashboards

#### Request Parameters

| Name           | Location | Type   | Required | Description |
|----------------|----------|--------|----------|-------------|
| role_id         |path|string| yes |none|
| body            |body| Object | no |none|
| » keyword |body|string| no |none|

#### Response

| Status Code | Description                                                                 | Data Model |
|-------------|-----------------------------------------------------------------------------|------------|
| 200         | [OK](https://tools.ietf.org/html/rfc7231#section-6.3.1) | Success | Inline    |

> Response Example

> 200 Response

```json
{
  "data": [
    {
      "dashboard_id": "",
      "dashboard_name":"",
      "created_at": "",
      "user_id":"",
      "user_email": "",
      "user_nickname":""
    }
  ]
}
```

### Post undistributed dashboard list

Post /user/roles/\{role_id\}/undistributed-dashboards

#### Request Parameters

| Name           | Location | Type   | Required | Description |
|----------------|----------|--------|----------|-------------|
| role_id   |path|string| yes |none|
| body      |body| Object | no |none|
| » keyword |body|string| no |none|

#### Response

| Status Code | Description                                                                 | Data Model |
|-------------|-----------------------------------------------------------------------------|------------|
| 200         | [OK](https://tools.ietf.org/html/rfc7231#section-6.3.1) | Success | Inline    |

> Response Example

> 200 Response

```json
{
  "data": [
    {
      "dashboard_id": "",
      "dashboard_name":"",
      "created_at": "",
      "user_id":"",
      "user_email": "",
      "user_nickname":""
    }
  ]
}
```

### Post undistributed user list

Post /user/roles/\{role_id\}/undistributed-users

#### Request Parameters

| Name           | Location | Type   | Required | Description |
|----------------|----------|--------|----------|-------------|
| role_id   |path|string| yes |none|
| body      |body| Object | no |none|
| » keyword |body|string| no |none|

#### Response

| Status Code | Description                                                                 | Data Model |
|-------------|-----------------------------------------------------------------------------|------------|
| 200         | [OK](https://tools.ietf.org/html/rfc7231#section-6.3.1) | Success | Inline    |

> Response Example

> 200 Response

```json
{
  "data": [
    {
      "email": "",
      "nickname":"",
      "user_id":""
    }
  ]
}
```

### Post undistributed integration list

Post /user/roles/\{role_id\}/undistributed-integrations

#### Request Parameters

| Name           | Location | Type   | Required | Description |
|----------------|----------|--------|----------|-------------|
| role_id         |path|string| yes |none|
| body            |body| Object | no |none|
| » keyword |body|string| no |none|

#### Response

| Status Code | Description                                                                 | Data Model |
|-------------|-----------------------------------------------------------------------------|------------|
| 200         | [OK](https://tools.ietf.org/html/rfc7231#section-6.3.1) | Success | Inline    |

> Response Example

> 200 Response

```json
{
  "data": [
    {
      "integration_id": "",
      "integration_name":""
    }
  ]
}
```

### Post undistributed device list

Post /user/roles/\{role_id\}/undistributed-devices

#### Request Parameters

| Name           | Location | Type   | Required | Description |
|----------------|----------|--------|----------|-------------|
| role_id         |path|string| yes |none|
| body            |body| Object | no |none|
| » keyword |body|string| no |none|

#### Response

| Status Code | Description                                                                 | Data Model |
|-------------|-----------------------------------------------------------------------------|------------|
| 200         | [OK](https://tools.ietf.org/html/rfc7231#section-6.3.1) | Success | Inline    |

> Response Example

> 200 Response

```json
{
  "data": [
    {
      "device_id": "",
      "device_name":"",
      "created_at": "",
      "integration_id": "",
      "integration_name":"",
      "user_id":"",
      "user_email": "",
      "user_nickname":""
    }
  ]
}
```

### POST add user to role

POST /user/roles/\{role_id\}/associate-user

#### Request Parameters

| Name           | Location | Type   | Required | Description |
|----------------|----------|--------|----------|-------------|
| role_id    |path| string | yes | none |
| body       |body| Object | no | none |
| » user_ids |body| Array | no | none |

```json
{
  "user_ids": ["",""]
}
```

#### Response

| Status Code | Description                                                                 | Data Model |
|-------------|-----------------------------------------------------------------------------|------------|
| 200         | [OK](https://tools.ietf.org/html/rfc7231#section-6.3.1) | Success | Inline    |

> Response Example

> 200 Response

```json
{
  "data":{
    
  }
}
```

### POST add resource to role

POST /user/roles/\{role_id\}/associate-resource

#### Request Parameters

| Name           | Location | Type   | Required | Description |
|----------------|----------|--------|----------|-------------|
| role_id     |path| string | yes | none |
| body        |body| Object | no | none |
| » resources |body| Array  | no | none |
| »» id       |body| String | no | none |
| »» type     |body| String[ENTITY, DEVICE, INTEGRATION, DASHBOARD, WORKFLOW] | 否 | none |

```json
{
  "resources": [
    {
      "id": "String",
      "type": "String" 
    }
  ]
}
```
#### Response

| Status Code | Description                                                                 | Data Model |
|-------------|-----------------------------------------------------------------------------|------------|
| 200         | [OK](https://tools.ietf.org/html/rfc7231#section-6.3.1) | Success | Inline    |

> Response Example

> 200 Response

```json
{
  "data":{
    
  }
}
```

### POST disassociate user from role

POST /user/roles/\{role_id\}/disassociate-user

#### Request Parameters

| Name           | Location | Type   | Required | Description |
|----------------|----------|--------|----------|-------------|
| role_id    |path| string | YES | none |
| body       |body| Object | NO | none |
| » user_ids |body| Array | NO | none |

```json
{
  "user_ids": ["",""]
}
```

#### Response

| Status Code | Description                                                                 | Data Model |
|-------------|-----------------------------------------------------------------------------|------------|
| 200         | [OK](https://tools.ietf.org/html/rfc7231#section-6.3.1) | Success | Inline    |

> Response Example

> 200 Response

```json
{
  "data":{
    
  }
}
```

### POST disassociate resource from role

POST /user/roles/\{role_id\}/disassociate-resource

#### Request Parameters

| Name           | Location | Type   | Required | Description |
|----------------|----------|--------|----------|-------------|
| role_id     |path| string | YES | none |
| body        |body| Object | no | none |
| » resources |body| Array  | no | none |
| »» id       |body| String | no | none |
| »» type     |body| String[ENTITY, DEVICE, INTEGRATION, DASHBOARD, WORKFLOW] | 否 | none |

```json
{
  "resources": [
    {
      "id": "String",
      "type": "String" 
    }
  ]
}
```

#### Response

| Status Code | Description                                                                 | Data Model |
|-------------|-----------------------------------------------------------------------------|------------|
| 200         | [OK](https://tools.ietf.org/html/rfc7231#section-6.3.1) | Success | Inline    |

> Response Example

> 200 Response

```json
{
  "data":{
    
  }
}
```

### POST create menu
POST /user/menus

#### Request Parameters

| Name           | Location | Type   | Required | Description |
|----------------|----------|--------|----------|-------------|
| body        |body| Object | no |none|
| » code      |body|string| yes |none|
| » name      |body|string| yes |none|
| » type      |body|string| yes |none|
| » parent_id |body|string| no |none|

> Body Request

```json
{
  "code": "string",
  "name": "string",
  "type": "string",
  "parent_id":"string"
}
```

#### Response

| Status Code | Description                                                                 | Data Model |
|-------------|-----------------------------------------------------------------------------|------------|
| 200         | [OK](https://tools.ietf.org/html/rfc7231#section-6.3.1) | Success | Inline    |

> Response Example

> 200 Response

```json
{
  "data":{
    "menu_id": ""
  }
}
```

### PUT update menu

PUT /user/menus/\{menu_id\}

#### Request Parameters

| Name           | Location | Type   | Required | Description |
|----------------|----------|--------|----------|-------------|
| menu_id |path| string               | yes |none|
| body    |body| Object               | no |none|
| » name  |body| string               | yes |none|
| » type  |body| string [MENU,FUNCTION] | yes |none|

> Body request

```json
{
  "name": "string",
  "type": "string"
}
```

#### Response

| Status Code | Description                                                                 | Data Model |
|-------------|-----------------------------------------------------------------------------|------------|
| 200         | [OK](https://tools.ietf.org/html/rfc7231#section-6.3.1) | Success | Inline    |

> Response Example

> 200 Response

```json
{
  "data":{
    
  }
}
```

### DELETE delete menu

DELETE /user/menus/\{menu_id\}

#### Request Parameters

| Name           | Location | Type   | Required | Description |
|----------------|----------|--------|----------|-------------|
| menu_id |path|string| yes |none|

#### Response

| Status Code | Description                                                                 | Data Model |
|-------------|-----------------------------------------------------------------------------|------------|
| 200         | [OK](https://tools.ietf.org/html/rfc7231#section-6.3.1) | Success | Inline    |

> Response Example

> 200 Response

```json
{
  "data":{
    
  }
}
```

### GET menu list

GET /user/menus

#### Response

| Status Code | Description                                                                 | Data Model |
|-------------|-----------------------------------------------------------------------------|------------|
| 200         | [OK](https://tools.ietf.org/html/rfc7231#section-6.3.1) | Success | Inline    |

> Response Example

> 200 Response

```json
{
  "data": [
    {
      "menu_id": "",
      "code": "",
      "name": "",
      "type": "",
      "parent_id": "",
      "children": []
    }
  ]
}
```

### POST add menu to role

POST /user/roles/\{role_id\}/associate-menu

#### Request Parameters

| Name           | Location | Type   | Required | Description |
|----------------|----------|--------|----------|-------------|
| role_id    |path| string | yes | none |
| body       |body| Object | no | none |
| » menu_ids |body| Array | no | none |

```json
{
  "menu_ids": ["",""]
}
```

#### Response

| Status Code | Description                                                                 | Data Model |
|-------------|-----------------------------------------------------------------------------|------------|
| 200         | [OK](https://tools.ietf.org/html/rfc7231#section-6.3.1) | Success | Inline    |

> Response Example

> 200 Response

```json
{
  "data":{
    
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

| Status Code | Description                                                                 | Data Model |
|-------------|-----------------------------------------------------------------------------|------------|
| 200         | [OK](https://tools.ietf.org/html/rfc7231#section-6.3.1) | Success | Inline    |

> Response Example

> 200 Response

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

| Status Code | Description                                                                 | Data Model |
|-------------|-----------------------------------------------------------------------------|------------|
| 200         | [OK](https://tools.ietf.org/html/rfc7231#section-6.3.1) | Success | Inline    |

> Response Example

> 200 Response

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

| Status Code | Description                                                                 | Data Model |
|-------------|-----------------------------------------------------------------------------|------------|
| 200         | [OK](https://tools.ietf.org/html/rfc7231#section-6.3.1) | Success | Inline    |

> Response Example

> 200 Response

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

| Status Code | Description                                                                 | Data Model |
|-------------|-----------------------------------------------------------------------------|------------|
| 200         | [OK](https://tools.ietf.org/html/rfc7231#section-6.3.1) | Success | Inline    |

> Response Example

> 200 Response

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

| Status Code | Description                                                                 | Data Model |
|-------------|-----------------------------------------------------------------------------|------------|
| 200         | [OK](https://tools.ietf.org/html/rfc7231#section-6.3.1) | Success | Inline    |

> Response Example

> 200 Response

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

| Status Code | Description                                                                 | Data Model |
|-------------|-----------------------------------------------------------------------------|------------|
| 200         | [OK](https://tools.ietf.org/html/rfc7231#section-6.3.1) | Success | Inline    |

> Response Example

> 200 Response

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

| Status Code | Description                                                                 | Data Model |
|-------------|-----------------------------------------------------------------------------|------------|
| 200         | [OK](https://tools.ietf.org/html/rfc7231#section-6.3.1) | Success | Inline    |

> Response Example

> 200 Response

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
  "entity_type": "Array[PROPERTY, SERVICE, EVENT]",
  "exclude_children": "Boolean",
  "entity_value_type": "Array[STRING, LONG, DOUBLE, BOOLEAN, BINARY, OBJECT]",
  "entity_access_mod": "Array[R, W, RW]"
}
```

#### Response

| Status Code | Description                                                                 | Data Model |
|-------------|-----------------------------------------------------------------------------|------------|
| 200         | [OK](https://tools.ietf.org/html/rfc7231#section-6.3.1) | Success | Inline    |

> Response Example

> 200 Response
```json
{
  "data": {
    "device_name": "String",
    "integration_name": "String",
    "entity_id": "String",
    "entity_access_mod": "String",
    "entity_key": "String",
    "entity_name": "String",
    "entity_type": "String",
    "entity_value_attribute": {},
    "entity_value_type": "String"
  }
}
```

### GET Get Child Entities

GET /entity/\{entity_id\}/children

#### Request Parameters

| Name      | Location | Type   | Required | Description |
|-----------|----------|--------|----------|-------------|
| entity_id  | path     | string | Yes      | none        |

#### Response

| Status Code | Description                                                                 | Data Model |
|-------------|-----------------------------------------------------------------------------|------------|
| 200         | [OK](https://tools.ietf.org/html/rfc7231#section-6.3.1) | Success | Inline    |

> Response Example

> 200 Response

```json
{
  "data": [
    {
      "device_name": "",
      "integration_name": "",
      "entity_id": "",
      "entity_access_mod": "",
      "entity_key": "",
      "entity_type": "",
      "entity_name": "",
      "entity_value_attribute": {
        "": {}
      },
      "entity_value_type": ""
    }
  ]
}
```

### POST Query Historical Data

POST /entity/history/search

#### Request Parameters

> Body REQUEST
```json
{
  "entity_id": 0,
  "start_timestamp": 0,
  "end_timestamp": 0
}
```

#### Response

| Status Code | Description                                                                 | Data Model |
|-------------|-----------------------------------------------------------------------------|------------|
| 200         | [OK](https://tools.ietf.org/html/rfc7231#section-6.3.1) | Success | Inline    |

> Response Example

> 200 Response
```json
{
  "timestamp": 0,
  "value": "Object",
  "value_type": "String[STRING, LONG, DOUBLE, BOOLEAN, BINARY, OBJECT]"
}
```

### POST Query Historical Data Aggregation

POST /entity/history/aggregate

#### Request Parameters

| Name             | Location | Type    | Required | Description |
|------------------|----------|---------|----------|-------------|
| body             | body     | object  | No       | none        |

> Body 请求参数

```json
{
  "entity_id": 0,
  "aggregate_type": "LAST",
  "start_timestamp": 0,
  "end_timestamp": 0
}
```

#### Response

| Status Code | Description                                                                 | Data Model |
|-------------|-----------------------------------------------------------------------------|------------|
| 200         | [OK](https://tools.ietf.org/html/rfc7231#section-6.3.1) | Success | Inline    |

> Response Example

> 200 Response

```json
{
  "data":{
    "value": {},
    "value_type": "",
    "count_result": [
      {
        "value": {},
        "value_type": "",
        "count": 0
      }
    ]
  }
}
```

### GET Retrieve the Latest Value of an Entity

GET /entity/\{entity_id\}/status

#### Request Parameters

| Name      | Location | Type   | Required | Description |
|-----------|----------|--------|----------|-------------|
| entity_id  | path     | string | Yes      | none        |

#### Response

| Status Code | Description                                                                 | Data Model |
|-------------|-----------------------------------------------------------------------------|------------|
| 200         | [OK](https://tools.ietf.org/html/rfc7231#section-6.3.1) | Success | Inline    |

> Response Example

> 200 Response

```json
{
  "data":{
    "value": {},
    "updated_at": "",
    "value_type": ""
  }
}
```

### GET Retrieve Entity Metadata

GET /entity/\{entity_id\}/meta

#### Request Parameters

| Name      | Location | Type   | Required | Description |
|-----------|----------|--------|----------|-------------|
| entity_id  | path     | string | Yes      | none        |

#### Response

| Status Code | Description                                                                 | Data Model |
|-------------|-----------------------------------------------------------------------------|------------|
| 200         | [OK](https://tools.ietf.org/html/rfc7231#section-6.3.1) | Success | Inline    |

> Response Example

> 200 Response

```json
{
  "data":{
    "key": "",
    "name": "",
    "type": "",
    "access_mod": "",
    "value_attribute": {
      "": {}
    },
    "value_type": ""
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

| Status Code | Description                                                                 | Data Model |
|-------------|-----------------------------------------------------------------------------|------------|
| 200         | [OK](https://tools.ietf.org/html/rfc7231#section-6.3.1) | Success | Inline    |

> Response Example

> 200 Response

```json
{
  "data":{
    "dashboard_id": ""
  }
}
```

### PUT Update Dashboard

PUT /dashboard/\{dashboard_id\}

#### Request Parameters

| Name         | Location | Type   | Required | Description |
|--------------|----------|--------|----------|-------------|
| dashboard_id  | path     | string | Yes      | none        |
| body         | body     | Object | No       | none        |
| » name       | body     | string | Yes      | none        |
| » widgets    | body     | Array  | Yes      | none        |
| »» widget_id  | body     | string | Yes      | none        |
| »» data      | body     | Object | Yes      | none        |

> Body 请求参数

```json
{
  "name": "string",
  "widgets": [
    {
      "widget_id": "string",
      "data": {
      }
    }
  ]
}
```

#### Response

| Status Code | Description                                                                 | Data Model |
|-------------|-----------------------------------------------------------------------------|------------|
| 200         | [OK](https://tools.ietf.org/html/rfc7231#section-6.3.1) | Success | Inline    |

> Response Example

> 200 Response

```json
{
  "data":{
    
  }
}
```

### DELETE Delete Dashboard

DELETE /dashboard/\{dashboard_id\}

#### Request Parameters

| Name        | Location | Type   | Required | Description |
|-------------|----------|--------|----------|-------------|
| dashboardId | path     | string | Yes      | none        |

#### Response

| Status Code | Description                                                                 | Data Model |
|-------------|-----------------------------------------------------------------------------|------------|
| 200         | [OK](https://tools.ietf.org/html/rfc7231#section-6.3.1) | Success | Inline    |

> Response Example

> 200 Response

```json
{
  "data":{
    
  }
}
```

### GET Retrieve All Dashboards

GET /dashboard/dashboards

#### Response

| Status Code | Description                                                                 | Data Model |
|-------------|-----------------------------------------------------------------------------|------------|
| 200         | [OK](https://tools.ietf.org/html/rfc7231#section-6.3.1) | Success | Inline    |

> Response Example

> 200 Response

```json
{
  "data": [
    {
      "dashboard_id": "",
      "user_id":"",
      "name": "",
      "widgets": [
        {
          "widget_id": "",
          "data": {
            "": {}
          }
        }
      ],
      "created_at": ""
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