---
sidebar_position: 6
toc_max_heading_level: 3
---

import { ProjectName } from '/src/consts';

# REST API

## 概述

## Rest API
返回值接口规范

|名称|位置|类型|说明|
|---|---|---|---|
|request_id|body|string |请求唯一标识符id|
|status|body|string |请求是否成功`Success`/`Failed`|
|error_code|body|string |异常码，status为`Failed`时存在|
|error_message|body|string |异常消息，status为`Failed`时存在|
|detail_message|body|string |详细异常信息，status为`Failed`时可能存在|
|**data**|**body**|**object** |**返回结果数据**，一般在status为`Success`时存在|

## 登录认证

### POST 令牌刷新

POST /oauth2/token

#### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|body|body|object| 否 |none|
|» refresh_token|body|string| 否 |none|
|» grant_type|body|string| 否 |none|
|» client_id|body|string| 否 |none|
|» client_secret|body|string| 否 |none|
|» username|body|string| 否 |none|
|» password|body|string| 否 |none|

> Body 请求参数

```yaml
refresh_token: string
grant_type: password
client_id: iab
client_secret: milesight*iab
username: string
password: string

```

#### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|成功|Inline|

> 返回示例

> 200 Response

```json
{
  "access_token": "string",
  "expires_in": 0,
  "refresh_token:":"string"
}
```

### POST 用户注册

POST /user/register

#### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|body|body|object| 否 |none|
|» email|body|string| 是 |none|
|» nickname|body|string| 是 |none|
|» password|body|string| 是 |none|

> Body 请求参数

```json
{
  "email": "string",
  "nickname": "string",
  "password": "string"
}
```

#### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|成功|Inline|

> 返回示例

> 200 Response

```json
{}
```

### GET 获取用户信息
GET /user

#### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|成功|Inline|

> 返回示例
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

### GET 获取用户状态信息
GET /user/status

#### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|成功|Inline|

> 返回示例

> 200 Response

```json
{
  "data": {
    "init": true
  }
}
```

### Post 获取用户列表(分页)
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

#### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|成功|Inline|

> 返回示例
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

### POST 创建用户
POST /user/members

#### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|body|body|object| 否 |none|
|» email|body|string| 是 |none|
|» nickname|body|string| 是 |none|
|» password|body|string| 是 |none|

> Body 请求参数

```json
{
  "email": "string",
  "nickname": "string",
  "password": "string"
}
```

#### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|成功|Inline|

> 返回示例

> 200 Response

```json
{}
```

### PUT 修改用户信息
PUT /user/members/\{userId\}

#### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|userId|path|string| 是 |none|
|body|body|object| 否 |none|
|» email|body|string| 是 |none|
|» nickname|body|string| 是 |none|

> Body 请求参数

```json
{
  "email": "string",
  "nickname": "string"
}
```

#### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|成功|Inline|

> 返回示例

> 200 Response

```json
{}
```

### PUT 重置用户密码
PUT /user/members/\{userId\}/change-password

#### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|userId|path|string| 是 |none|
|body|body|object| 否 |none|
|» password|body|string| 是 |none|

> Body 请求参数

```json
{
  "password": "string"
}
```

#### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|成功|Inline|

> 返回示例

> 200 Response

```json
{}
```

### DELETE 删除用户

DELETE /user/members/\{user_id\}

#### 请求参数

| 名称      |位置|类型|必选|说明|
|---------|---|---|---|---|
| user_id |path|string| 是 |none|

#### 返回结果

|状态码|状态码含义|说明| 数据模型   |
|---|---|---|--------|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|成功| Object |

> 返回示例

> 成功

```json
{
  "data":{
    
  }
}
```

### POST 批量删除用户
POST /user/batch-delete

#### 请求参数

| 名称      |位置|类型| 必选 |说明|
|----------------|----------|--------|----|-------------|
| body           |body| object | 否  |none|
| » user_id_list |body| Array  | 是  |none|

> Body 请求参数

```json
{
  "user_id_list": []
}
```

#### 返回结果

|状态码|状态码含义|说明| 数据模型   |
|---|---|---|--------|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|成功| Object |

> 返回示例

> 成功

```json
{
  "data":{

  }
}
```

### PUT 修改密码（自己）
PUT /user/password

#### 请求参数

| 名称             |位置|类型|必选|说明|
|----------------|---|---|---|---|
| body           |body|object| 否 |none|
| » old_password |body|string| 是 |none|
| » new_password |body|string| 是 |none|

> Body 请求参数

```json
{
  "old_password": "string",
  "new_password": "string"
}
```

#### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|成功|Inline|

> 返回示例

> 200 Response

```json
{}
```

### GET 获取用户下的菜单列表

GET /user/members/\{user_id\}/menus

#### 请求参数

| 名称      |位置|类型|必选|说明|
|---------|---|---|---|---|
| user_id |path|string| 是 |none|

#### 返回结果

|状态码|状态码含义|说明| 数据模型   |
|---|---|---|--------|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|成功| Object |

> 返回示例

> 成功

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

### Post 获取是否包含某个资源权限
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

#### 请求参数

| 名称              |位置|类型|必选|说明|
|-----------------|---|---|---|---|
| userId          |path|string| 是 |none|


#### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|成功|Inline|

> 返回示例

> 200 Response

```json
{
  "has_permission": true
}
```

### POST 创建角色
POST /user/roles

#### 请求参数

| 名称     |位置| 类型     | 必选 |说明|
|--------|---|--------|----|---|
| body   |body| Object | 否  |none|
| » name |body|string| 是  |none|
| » description |body|string| 否  |none|

> Body 请求参数

```json
{
  "name": "string",
  "description": "string"
}
```

#### 返回结果

|状态码|状态码含义|说明| 数据模型   |
|---|---|---|--------|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|成功| Object |

> 返回示例

> 成功

```json
{
  "data":{
    "role_id": ""
  }
}
```

### PUT 更新角色

PUT /user/roles/\{role_id\}

#### 请求参数

| 名称           |位置| 类型     |必选|说明|
|--------------|---|--------|---|---|
| role_id      |path| string | 是 |none|
| body         |body| Object | 否 |none|
| » name       |body|string| 是 |none|
| » description |body|string| 否 |none|

> Body 请求参数

```json
{
  "name": "string",
  "description": "string"
}
```

#### 返回结果

|状态码|状态码含义|说明| 数据模型   |
|---|---|---|--------|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|成功| Object |

> 返回示例

> 成功

```json
{
  "data":{
    
  }
}
```

### DELETE 删除role

DELETE /user/roles/\{role_id\}

#### 请求参数

| 名称      |位置|类型|必选|说明|
|---------|---|---|---|---|
| role_id |path|string| 是 |none|

#### 返回结果

|状态码|状态码含义|说明| 数据模型   |
|---|---|---|--------|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|成功| Object |

> 返回示例

> 成功

```json
{
  "data":{
    
  }
}
```

### Post 获取角色列表(分页)

Post /user/roles/search

#### 返回结果

| 状态码                      |状态码含义|说明| 数据模型   |
|--------------------------|---|---|--------|
| 200                      |[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|成功| Object |
| data                     |Array|none| Array|
| » role_id                |string|none| String|
| » name                   |string|none| String|
| » description            |string|none| String|
| » created_at             |string|none| String|
| » user_role_count        |string|none| String|
| » role_integration_count |string|none| String|


> 返回示例

> 成功

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

### Post 获取角色下的用户列表

Post /user/roles/\{role_id\}/members

#### 请求参数

| 名称      |位置|类型|必选|说明|
|---------|---|---|---|---|
| role_id |path|string| 是 |none|

#### 返回结果

|状态码|状态码含义|说明| 数据模型   |
|---|---|---|--------|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|成功| Object |

> 返回示例

> 成功

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

### GET 获取角色下的菜单列表

GET /user/roles/\{role_id\}/menus

#### 请求参数

| 名称      |位置|类型|必选|说明|
|---------|---|---|---|---|
| role_id |path|string| 是 |none|

#### 返回结果

|状态码|状态码含义|说明| 数据模型   |
|---|---|---|--------|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|成功| Object |

> 返回示例

> 成功

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

### Post 获取角色下的资源列表

Post /user/roles/\{role_id\}/resources

#### 请求参数

| 名称              |位置|类型|必选|说明|
|-----------------|---|---|---|---|
| role_id         |path|string| 是 |none|
| body            |body| Object | 否 |none|
| » resource_type |body|string| 否 |none|

#### 返回结果

|状态码|状态码含义|说明| 数据模型   |
|---|---|---|--------|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|成功| Object |

> 返回示例

> 成功

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

### Post 获取角色下的集成列表

Post /user/roles/\{role_id\}/integrations

#### 请求参数

| 名称              |位置|类型|必选|说明|
|-----------------|---|---|---|---|
| role_id         |path|string| 是 |none|
| body            |body| Object | 否 |none|
| » keyword |body|string| 否 |none|

#### 返回结果

|状态码|状态码含义|说明| 数据模型   |
|---|---|---|--------|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|成功| Object |

> 返回示例

> 成功

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

### Post 获取角色下的设备列表

Post /user/roles/\{role_id\}/devices

#### 请求参数

| 名称              |位置|类型|必选|说明|
|-----------------|---|---|---|---|
| role_id         |path|string| 是 |none|
| body            |body| Object | 否 |none|
| » keyword |body|string| 否 |none|

#### 返回结果

|状态码|状态码含义|说明| 数据模型   |
|---|---|---|--------|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|成功| Object |

> 返回示例

> 成功

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

### Post 获取角色下的dashboard列表

Post /user/roles/\{role_id\}/dashboards

#### 请求参数

| 名称              |位置|类型|必选|说明|
|-----------------|---|---|---|---|
| role_id         |path|string| 是 |none|
| body            |body| Object | 否 |none|
| » keyword |body|string| 否 |none|

#### 返回结果

|状态码|状态码含义|说明| 数据模型   |
|---|---|---|--------|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|成功| Object |

> 返回示例

> 成功

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

### Post 获取所有未分配的dashboard（用于分配资源）

Post /user/roles/\{role_id\}/undistributed-dashboards

#### 请求参数

| 名称        |位置|类型|必选|说明|
|-----------|---|---|---|---|
| role_id   |path|string| 是 |none|
| body      |body| Object | 否 |none|
| » keyword |body|string| 否 |none|

#### 返回结果

|状态码|状态码含义|说明| 数据模型   |
|---|---|---|--------|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|成功| Object |

> 返回示例

> 成功

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

### Post 获取所有未分配的用户列表（用于分配资源）

Post /user/roles/\{role_id\}/undistributed-users

#### 请求参数

| 名称        |位置|类型|必选|说明|
|-----------|---|---|---|---|
| role_id   |path|string| 是 |none|
| body      |body| Object | 否 |none|
| » keyword |body|string| 否 |none|

#### 返回结果

|状态码|状态码含义|说明| 数据模型   |
|---|---|---|--------|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|成功| Object |

> 返回示例

> 成功

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

### Post 获取未分配的集成列表

Post /user/roles/\{role_id\}/undistributed-integrations

#### 请求参数

| 名称              |位置|类型|必选|说明|
|-----------------|---|---|---|---|
| role_id         |path|string| 是 |none|
| body            |body| Object | 否 |none|
| » keyword |body|string| 否 |none|

#### 返回结果

|状态码|状态码含义|说明| 数据模型   |
|---|---|---|--------|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|成功| Object |

> 返回示例

> 成功

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

### Post 获取未分配的设备列表

Post /user/roles/\{role_id\}/undistributed-devices

#### 请求参数

| 名称              |位置|类型|必选|说明|
|-----------------|---|---|---|---|
| role_id         |path|string| 是 |none|
| body            |body| Object | 否 |none|
| » keyword |body|string| 否 |none|

#### 返回结果

|状态码|状态码含义|说明| 数据模型   |
|---|---|---|--------|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|成功| Object |

> 返回示例

> 成功

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

### POST 添加用户到角色

POST /user/roles/\{role_id\}/associate-user

#### 请求参数

| 名称         |位置| 类型     |必选| 说明   |
|------------|---|--------|---|------|
| role_id    |path| string | 是 | none |
| body       |body| Object | 否 | none |
| » user_ids |body| Array | 否 | none |

```json
{
  "user_ids": ["",""]
}
```

#### 返回结果

|状态码|状态码含义|说明| 数据模型   |
|---|---|---|--------|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|成功| Object |

> 返回示例

> 成功

```json
{
  "data":{
    
  }
}
```

### POST 添加资源到角色

POST /user/roles/\{role_id\}/associate-resource

#### 请求参数

| 名称          |位置| 类型     |必选| 说明   |
|-------------|---|--------|---|------|
| role_id     |path| string | 是 | none |
| body        |body| Object | 否 | none |
| » resources |body| Array  | 否 | none |
| »» id       |body| String | 否 | none |
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

#### 返回结果

|状态码|状态码含义|说明| 数据模型   |
|---|---|---|--------|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|成功| Object |

> 返回示例

> 成功

```json
{
  "data":{
    
  }
}
```

### POST 取消角色用户绑定

POST /user/roles/\{role_id\}/disassociate-user

#### 请求参数

| 名称         |位置| 类型     |必选| 说明   |
|------------|---|--------|---|------|
| role_id    |path| string | 是 | none |
| body       |body| Object | 否 | none |
| » user_ids |body| Array | 否 | none |

```json
{
  "user_ids": ["",""]
}
```

#### 返回结果

|状态码|状态码含义|说明| 数据模型   |
|---|---|---|--------|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|成功| Object |

> 返回示例

> 成功

```json
{
  "data":{
    
  }
}
```

### POST 取消角色资源绑定

POST /user/roles/\{role_id\}/disassociate-resource

#### 请求参数

| 名称          |位置| 类型     |必选| 说明   |
|-------------|---|--------|---|------|
| role_id     |path| string | 是 | none |
| body        |body| Object | 否 | none |
| » resources |body| Array  | 否 | none |
| »» id       |body| String | 否 | none |
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

#### 返回结果

|状态码|状态码含义|说明| 数据模型   |
|---|---|---|--------|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|成功| Object |

> 返回示例

> 成功

```json
{
  "data":{
    
  }
}
```

### POST 创建菜单
POST /user/menus

#### 请求参数

| 名称          |位置| 类型     |必选|说明|
|-------------|---|--------|---|---|
| body        |body| Object | 否 |none|
| » code      |body|string| 是 |none|
| » name      |body|string| 是 |none|
| » type      |body|string| 是 |none|
| » parent_id |body|string| 否 |none|

> Body 请求参数

```json
{
  "code": "string",
  "name": "string",
  "type": "string",
  "parent_id":"string"
}
```

#### 返回结果

|状态码|状态码含义|说明| 数据模型   |
|---|---|---|--------|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|成功| Object |

> 返回示例

> 成功

```json
{
  "data":{
    "menu_id": ""
  }
}
```

### PUT 更新菜单

PUT /user/menus/\{menu_id\}

#### 请求参数

| 名称      |位置| 类型                   |必选|说明|
|---------|---|----------------------|---|---|
| menu_id |path| string               | 是 |none|
| body    |body| Object               | 否 |none|
| » name  |body| string               | 是 |none|
| » type  |body| string [MENU,FUNCTION] | 是 |none|

> Body 请求参数

```json
{
  "name": "string",
  "type": "string"
}
```

#### 返回结果

|状态码|状态码含义|说明| 数据模型   |
|---|---|---|--------|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|成功| Object |

> 返回示例

> 成功

```json
{
  "data":{
    
  }
}
```

### DELETE 删除菜单

DELETE /user/menus/\{menu_id\}

#### 请求参数

| 名称      |位置|类型|必选|说明|
|---------|---|---|---|---|
| menu_id |path|string| 是 |none|

#### 返回结果

|状态码|状态码含义|说明| 数据模型   |
|---|---|---|--------|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|成功| Object |

> 返回示例

> 成功

```json
{
  "data":{
    
  }
}
```

### GET 获取菜单列表

GET /user/menus

#### 返回结果

| 状态码         | 状态码含义                                                   |说明| 数据模型   |
|-------------|---------------------------------------------------------|---|--------|
| 200         | [OK](https://tools.ietf.org/html/rfc7231#section-6.3.1) |成功| Object |
| data        | Array                                                   |none| Array|
| » menu_id   | string                                                  |none| String|
| » name      | string                                                  |none| String|
| » code      | string                                                  |none| String|
| » type      | string                                                  |none| String|
| » parent_id | string                                                  |none| String|
| » children  | Array                                                   |none| String|

> 返回示例

> 成功

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

### POST 添加菜单到角色

POST /user/roles/\{role_id\}/associate-menu

#### 请求参数

| 名称         |位置| 类型     |必选| 说明   |
|------------|---|--------|---|------|
| role_id    |path| string | 是 | none |
| body       |body| Object | 否 | none |
| » menu_ids |body| Array | 否 | 全量的菜单(包含按钮)id(不包含在其中的将被删除) |

```json
{
  "menu_ids": ["",""]
}
```

#### 返回结果

|状态码|状态码含义|说明| 数据模型   |
|---|---|---|--------|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|成功| Object |

> 返回示例

> 成功

```json
{
  "data":{
    
  }
}
```


## 集成

### POST 获取集成列表

POST /integration/search

#### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|device_addable|body|boolean| 否 | 是否返回可添加设备的集成 |
|device_deletable|body|boolean| 否 | 是否返回可删除设备的集成 |

> Body 请求参数

```json
{
  "device_addable": true,
  "device_deletable": true
}
```

#### 返回结果

| 字段名       |字段类型|说明|
|-----------|---|---|
| $ |object|集成信息列表项|
| $.id |string|集成id|
| $.icon |string|集成图标地址|
| $.name |string|集成名称|
| $.description |string|集成描述|
| $.add_device_service_key |string|添加设备服务实体key|
| $.device_count |number|设备数量|
| $.entity_count |number|实体数量（包括设备实体和集成实体）|

> 返回示例

> 成功

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

### GET 获取集成详细信息

GET /integration/\{integration_id\}

#### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|integration_id|path|string| 是 |集成id|

#### 返回结果

| 字段名       |字段类型|说明|
|-----------|---|---|
| id |string|集成id|
| icon |string|集成图标地址|
| name |string|集成名称|
| description |string|集成描述|
| add_device_service_key |string|添加设备服务实体key|
| entity_count |number|实体数量（包括设备实体和集成实体）|
| entity_count |number|实体数量（包括设备实体和集成实体）|
| delete_device_service_key |string|删除设备服务实体key|
| integration_entities |array|集成的实体列表|
| integration_entities.$ |object|集成的实体列表项|
| integration_entities.$.id |string|实体id|
| integration_entities.$.key |string|实体key|
| integration_entities.$.name |string|实体名称|
| integration_entities.$.type |string|实体类型 (属性`PROPERTY` / 服务`SERVICE` / 事件`EVENT`)|
| integration_entities.$.value_attribute |object|实体属性|
| integration_entities.$.value_type |string|数据类型 `STRING`/`LONG`/`DOUBLE`/`BOOLEAN`/`BINARY`/`OBJECT` |
| integration_entities.$.access_mod |string|读写 `R` / `W` / `RW`，只对属性类型的实体生效|
| integration_entities.$.parent |string|父实体key|
| integration_entities.$.value |string|实体当前值|
> 返回示例

> 成功

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

## 设备

### POST 创建设备

POST /device

#### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|name|body|string| 是 |设备名称|
|integration|body|string| 是 |集成id|
|param_entities|body|object| 是 |添加设备服务所需参数实体|

> Body 请求参数

```json
{
  "name": "string",
  "integration": "string",
  "param_entities": {
    "key": "value"
  }
}
```

#### 返回结果

> 返回示例

> 成功

```json
{}
```

### POST 搜索设备

POST /device/search

#### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|name|body|string| 否 |搜索的设备名称|
|page_number|body|number| 否 |页数|
|page_size|body|number| 否 |分页大小|

> Body 请求参数

```json
{
    "name": "",
    "page_number": 1,
    "page_size": 10
}
```

#### 返回结果

> 返回示例

> 成功

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

### PUT 更新设备信息

PUT /device/\{device_id\}

#### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|device_id|path|string| 是 |设备id|
|name|body|string| 否 |设备名称|

> Body 请求参数

```json
{
  "name": "string"
}
```

#### 返回结果

> 返回示例

> 成功

```json
{}
```

### GET 获取设备详细信息

GET /device/\{device_id\}

#### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|device_id|path|string| 是 |设备id|

#### 返回结果

| 字段名       |字段类型|说明|
|-----------|---|---|
| id |string|设备id|
| key |string|设备key|
| name |string|设备名称|
| integration |string|设备所属集成id|
| integration_name |string|集成名称|
| additional_data |object|设备额外数据|
| created_at |number|创建时间戳|
| updated_at |number|修改时间戳|
| deletable |boolean|是否可删除|
| identifier |string|标识符|
| entities |array|设备的实体列表|
| entities.$ |object|实体列表项|
| entities.$.id |string|实体id|
| entities.$.key |string|实体key|
| entities.$.name |string|名称|
| entities.$.type |string|实体类型|
| entities.$.value_attribute |object|实体属性|
| entities.$.value_type |string|实体值类型|

> 返回示例

> 成功

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

### POST 批量删除设备

POST /device/batch-delete

#### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|device_id_list|body|array| 是 |请求删除的设备id列表|
|device_id_list.$|body|string| 是 |设备id|

> Body 请求参数

```json
{
  "device_id_list": [
    "string"
  ]
}
```

#### 返回结果

> 返回示例

> 成功

```json
{}
```

## 实体

### POST 实体查询
POST /entity/search

#### 请求参数
|名称|位置| 类型     |必选|说明|
|---|---|--------|---|---|
|body|body| Object | 否 |none|

> Body 请求参数
```json
{
  "keyword": "string",
  "entity_type": "Array[PROPERTY, SERVICE, EVENT]",
  "exclude_children": "Boolean",
  "entity_value_type": "Array[STRING, LONG, DOUBLE, BOOLEAN, BINARY, OBJECT]",
  "entity_access_mod": "Array[R, W, RW]"
}
```

#### 返回结果
| 状态码                      |状态码含义|说明| 数据模型   |
|--------------------------|---|---|--------|
| 200                      |[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|成功| Object |
| » entity_id              |string|none| none|
| » entity_name            |string|none| none|
| » entity_type            |string|none| none|
| » entity_value_type      |string|none| none|
| » entity_value_attribute |object|none| none|
| » entity_access_mod      |string|none| none|
| » entity_key             |string|none| none|
| » device_name            |string|none| none|
| » integration_name       |string|none| none|

> 返回示例
> 成功
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

### GET 获取子实体

GET /entity/\{entity_id\}/children

#### 请求参数

| 名称        |位置|类型|必选|说明|
|-----------|---|---|---|---|
| entity_id |path|string| 是 |none|

#### 返回结果

| 状态码                      |状态码含义|说明| 数据模型 |
|--------------------------|---|---|------|
| 200                      |[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|成功| Object    |
| data                     |Array|none| Array|
| » entity_id              |string|none| none|
| » entity_name            |string|none| none|
| » entity_type            |string|none| none|
| » entity_value_type      |string|none| none|
| » entity_value_attribute |object|none| none|
| » entity_access_mod      |string|none| none|
| » integration_name       |string|none| none|
| » device_name            |string|none| none|
| » entity_key             |string|none| none|

> 返回示例

> 成功

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

### POST 历史数据查询
POST /entity/history/search

#### 请求参数
|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|body|body| Object | 否 |none|

> Body 请求参数
```json
{
  "entity_id": 0,
  "start_timestamp": 0,
  "end_timestamp": 0
}
```

#### 返回结果
| 状态码          |状态码含义|说明| 数据模型 |
|--------------|---|---|------|
| 200          |[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|成功| Object    |
| » timestamp  |integer|none| none|
| » value      |object|none| none|
| » value_type |string|none| none|

> 返回示例
> 成功
```json
{
  "timestamp": 0,
  "value": "Object",
  "value_type": "String[STRING, LONG, DOUBLE, BOOLEAN, BINARY, OBJECT]"
}
```

### POST 历史数据聚合查询

POST /entity/history/aggregate

#### 请求参数

|名称|位置| 类型     |必选|说明|
|---|---|--------|---|---|
|body|body| Object | 否 |none|

> Body 请求参数

```json
{
  "entity_id": 0,
  "aggregate_type": "LAST",
  "start_timestamp": 0,
  "end_timestamp": 0
}
```

#### 返回结果

| 状态码            |状态码含义|说明| 数据模型   |
|----------------|---|---|--------|
| 200            |[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|成功| Object |
| » value        |object|none| none|
| » value_type   |string|none| none|
| » count_result |Array|none| Array|
| »» value       |object|none| none|
| »» value_type  |string|none| none|
| »» count       |integer|none| none|

> 返回示例

> 成功

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

### GET 获取实体当前最新值

GET /entity/\{entity_id\}/status

#### 请求参数

| 名称        |位置|类型|必选|说明|
|-----------|---|---|---|---|
| entity_id |path|string| 是 |none|

#### 返回结果

| 状态码          |状态码含义|说明| 数据模型   |
|--------------|---|---|--------|
| 200          |[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|成功| Object |
| » value      |object|none| none|
| » updated_at |string|none| none|
| » value_type |string|none| none|

> 返回示例

> 成功

```json
{
  "data":{
    "value": {},
    "updated_at": "",
    "value_type": ""
  }
}
```

### GET 获取实体元数据信息

GET /entity/\{entity_id\}/meta

#### 请求参数

| 名称        |位置|类型|必选|说明|
|-----------|---|---|---|---|
| entity_id |path|string| 是 |none|

#### 返回结果

| 状态码               |状态码含义|说明| 数据模型   |
|-------------------|---|---|--------|
| 200               |[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|成功| Object |
| » key             |string|none| none|
| » name            |string|none| none|
| » type            |string|none| none|
| » access_mod      |string|none| none|
| » value_attribute |object|none| none|
| » value_type      |string|none| none|

> 返回示例

> 成功

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

### POST 创建Dashboard

POST /dashboard

#### 请求参数

| 名称     |位置| 类型     |必选|说明|
|--------|---|--------|---|---|
| body   |body| Object | 否 |none|
| » name |body|string| 是 |none|

> Body 请求参数

```json
{
  "name": "string"
}
```

#### 返回结果

|状态码|状态码含义|说明| 数据模型   |
|---|---|---|--------|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|成功| Object |

> 返回示例

> 成功

```json
{
  "data":{
    "dashboard_id": ""
  }
}
```

### PUT 更新Dashboard

PUT /dashboard/\{dashboard_id\}

#### 请求参数

| 名称           |位置| 类型     |必选|说明|
|--------------|---|--------|---|---|
| dashboard_id |path| string | 是 |none|
| body         |body| Object | 否 |none|
| » name       |body|string| 是 |none|
| » widgets    |body| Array   | 是 |none|
| »» widget_id |body|string| 是 |none|
| »» data      |body| Object | 是 |none|

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

#### 返回结果

|状态码|状态码含义|说明| 数据模型   |
|---|---|---|--------|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|成功| Object |

> 返回示例

> 成功

```json
{
  "data":{
    
  }
}
```

### DELETE 删除Dashboard

DELETE /dashboard/\{dashboard_id\}

#### 请求参数

| 名称           |位置|类型|必选|说明|
|--------------|---|---|---|---|
| dashboard_id |path|string| 是 |none|

#### 返回结果

|状态码|状态码含义|说明| 数据模型   |
|---|---|---|--------|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|成功| Object |

> 返回示例

> 成功

```json
{
  "data":{
    
  }
}
```

### GET 获取所有Dashboards

GET /dashboard/dashboards

#### 返回结果

| 状态码            |状态码含义|说明| 数据模型   |
|----------------|---|---|--------|
| 200            |[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|成功| Object |
| data           |Array|none| Array|
| » dashboard_id |string|none| String|
| » user_id      |string|none| String|
| » name         |string|none| String|
| » widgets      |Array|none| Array|
| »» widget_id   |string|none| String|
| »» data        |Object|none| Object|
| » created_at   |string|none| String|

> 返回示例

> 成功

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
WebSocket连接地址为：ws://\{host\}:\{port\}/websocket

#### 请求参数
|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|Authorization|query|string| 是 |none|


## 工作流

### POST 查询工作流

POST /workflow/flows/search

#### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
| name |body|string| 否 |搜索名称|

#### 返回结果

| 字段名       |字段类型|说明|
|-----------|---|---|
| id |string|流程id|
| name |string|流程名称|
| remark |string|流程描述|
| enabled |boolean|流程是否启用|
| user_nickname |string|用户名称|
| created_at |number|创建时间戳|
| updated_at |number|修改时间戳|

> 返回示例

> 成功

```json
{
  "data": {
    "id": "",
    "name": "",
    "remark": "",
    "enabled": false,
    "user_nickname": "",
    "created_at": 0,
    "updated_at": 0
  }
}
```

### PUT 编辑工作流基本信息

PUT /workflow/flows/\{flowId\}

#### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
| flowId |path|string| 是 |流程id|
| name |body|string| 是 |流程名称|
| remark |body|string| 是 |流程描述|

#### 返回结果

无

### POST 删除工作流

POST /workflow/flows/batch-delete

#### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
| workflow_id_list |body|array of strings| 是 |流程id列表|

#### 返回结果

无

### GET 启用工作流

GET /workflow/flows/\{flowId\}/enable

#### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
| flowId |path|string| 是 |流程id|

#### 返回结果

无

### GET 禁用工作流

GET /workflow/flows/\{flowId\}/disable

#### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
| flowId |path|string| 是 |流程id|

#### 返回结果

无

### POST 查询工作流日志

POST /workflow/flows/\{flowId\}/logs/search

#### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
| flowId |path|string| 是 |流程id|
| status |body|string| 否 |状态 SUCCESS / ERROR|

#### 返回结果

| 字段名       |字段类型|说明|
|-----------|---|---|
| id |string|日志id|
| start_time |number|开始时间戳|
| time_cost |number|耗时(ms)|
| status |string|状态 SUCCESS / ERROR|

> 返回示例

> 成功

```json
{
  "data": [
    {
      "id": "",
      "start_time": 0,
      "time_cost": 0,
      "status": "SUCCESS"
    }
  ]
}
```

### GET 查询日志详细信息

GET /workflow/flows/logs/\{logId\}

#### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
| logId |path|string| 是 |日志id|

#### 返回结果

| 字段名       |字段类型|说明|
|-----------|---|---|
| trace_info |array|节点跟踪信息|
| trace_info.$ |object|节点跟踪信息项|
| trace_info.$.message_id |string|消息id|
| trace_info.$.node_id |string|节点id|
| trace_info.$.node_label |string|节点标签|
| trace_info.$.status |string|状态 SUCCESS / ERROR|
| trace_info.$.start_time |number|节点开始时间戳|
| trace_info.$.time_cost |number|节点耗时(ms)|
| trace_info.$.error_message |string|错误信息|
| trace_info.$.input |string|输入参数(JSON格式字符串)|
| trace_info.$.output |string|输出(JSON格式字符串)|

> 返回示例

> 成功

```json
{
  "data": {
    "trace_info": [
      {
        "message_id": "",
        "node_id": "",
        "node_label": "",
        "status": "SUCCESS",
        "start_time": 0,
        "time_cost": 0,
        "error_message": "",
        "input": "",
        "output": ""
      }
    ]
  }
}
```

### GET 获取流程设计

GET /workflow/flows/\{flowId\}/design?version=\{versionId\}

#### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
| flowId |path|string| 是 |流程id|
| versionId |query|string| 否 |版本id，不传表示获取最新版本|

#### 返回结果

| 字段名       |字段类型|说明|
|-----------|---|---|
| id |string|流程id|
| name |string|流程名称|
| remark |string|流程描述|
| enabled |boolean|流程是否启用|
| version |number|流程版本|
| design_data |string|流程数据(JSON格式字符串)|

> 返回示例

> 成功

```json
{
  "data": {
    "id": "",
    "name": "",
    "remark": "",
    "enabled": false,
    "version": 0,
    "design_data": ""
  }
}
```

### POST 校验工作流设计

POST /workflow/flows/design/validate

#### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
| design_data |body|string| 是 |流程数据(JSON格式字符串)|

#### 返回结果

无

### POST 保存流程设计

POST /workflow/flows/design

#### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
| id |body|string| 否 |流程id，不传入表示新建|
| version |body|number| 否 |当前版本|
| name |body|string| 是 |流程名称|
| enabled |body|boolean| 是 |是否启用|
| remark |body|string| 是 |流程描述|
| design_data |body|string| 是 |流程数据(JSON格式字符串)|

:::info
如果id和version不传入，表示新建一个流程，否则表示更新流程id对应的数据。

也就是说，在用户新建一个流程并且保存后，页面应当存下这个接口返回的id和version。用户若在当前页面多次点击保存，每次调用都需要使用到上一次调用返回的id和version。
:::

#### 返回结果

| 字段名       |字段类型|说明|
|-----------|---|---|
| id |string|流程id|
| version |number|当前版本|

> 返回示例

> 成功

```json
{
  "data": {
    "id": "",
    "version": 0
  }
}
```

### POST 工作流整体测试

POST /workflow/flows/test

#### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
| input |body|object| 是 |输入参数|
| design_data |body|string| 是 |流程数据(JSON格式字符串)|

#### 返回结果

| 字段名       |字段类型|说明|
|-----------|---|---|
| status |string|状态 SUCCESS / ERROR|
| flow_id |string|流程id|
| start_time |number|开始时间戳|
| time_cost |number|耗时(ms)|
| trace_infos |array|节点跟踪信息|
| trace_infos.$ |object|节点跟踪信息项|
| trace_infos.$.message_id |string|消息id|
| trace_infos.$.node_id |string|节点id|
| trace_infos.$.node_label |string|节点标签|
| trace_infos.$.status |string|状态 SUCCESS / ERROR|
| trace_infos.$.start_time |number|节点开始时间戳|
| trace_infos.$.time_cost |number|节点耗时(ms)|
| trace_infos.$.error_message |string|错误信息|
| trace_infos.$.input |string|输入参数(JSON格式字符串)|
| trace_infos.$.output |string|输出(JSON格式字符串)|

> 返回示例

> 成功

```json
{
  "data": {
    "status": "SUCCESS",
    "flow_id": "",
    "start_time": 0,
    "time_cost": 0,
    "trace_infos": [
      {
        "message_id": "",
        "node_id": "",
        "node_label": "",
        "status": "SUCCESS",
        "start_time": 0,
        "time_cost": 0,
        "error_message": "",
        "input": "",
        "output": ""
      }
    ]
  }
}
```

### POST 工作流单节点测试

POST /workflow/flows/node/test

#### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
| node_config |body|string| 是 |节点数据(JSON格式字符串)|
| input |body|object| 是 |传入参数|

#### 返回结果

| 字段名       |字段类型|说明|
|-----------|---|---|
| message_id |string|消息id|
| node_id |string|节点id|
| node_label |string|节点标签|
| status |string|状态 SUCCESS / ERROR|
| start_time |number|节点开始时间戳|
| time_cost |number|节点耗时(ms)|
| error_message |string|错误信息|
| input |string|输入参数(JSON格式字符串)|
| output |string|输出(JSON格式字符串)|

> 返回示例

> 成功

```json
{
  "data": {
    "message_id": "",
    "node_id": "",
    "node_label": "",
    "status": "SUCCESS",
    "start_time": 0,
    "time_cost": 0,
    "error_message": "",
    "input": "",
    "output": ""
  }
}
```

### GET 返回工作流所有分组

GET /workflow/components

#### 请求参数

无

#### 返回结果

| 字段名       |字段类型|说明|
|-----------|---|---|
| [section_name] |array|某组节点|
| [section_name].$ |object|节点项|
| [section_name].$.name |string|节点名称|
| [section_name].$.title |string|节点标题|
| [section_name].$.data |string|节点定义数据|

> 返回示例

> 成功


```json
{
  "data": {
    "entry": [
      {
        "name": "timer",
        "title": "timer",
        "data": ""
      },
      {
        "name": "direct",
        "title": "input",
        "data": ""
      },
      {
        "name": "eventListener",
        "title": "Event Listener",
        "data": ""
      }
    ],
    "control": [
      {
        "name": "choice",
        "title": "IF/ELSE",
        "data": ""
      }
    ],
    "action": [
      {
        "name": "serviceInvocation",
        "title": "Service Invocation",
        "data": ""
      },
      {
        "name": "entityAssigner",
        "title": "Entity Assigner",
        "data": ""
      }
    ],
    "external": [
      {
        "name": "email",
        "title": "Email",
        "data": ""
      },
      {
        "name": "webhook",
        "title": "Webhook",
        "data": ""
      }
    ]
  }
}
```

### GET 获取工作流组件数据

GET /workflow/components/\{componentName\}

#### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
| componentName |path|string| 是 | 工作流组件名称 |

#### 返回结果

| 字段名       |字段类型|说明|
|-----------|---|---|
| / | string | 工作流组件数据 |

> 返回示例

> 成功

```json
{
  "component": {
      "name": "timer",
      "description": "Generate messages in specified intervals using java.util.Timer.",
      "scheme": "timer",
      "syntax":"timer:timerName"
      // ...
  },
  "componentProperties":{/*...*/},
  "headers":{
     "CamelTimerFiredTime":{/*...*/}
     // ...
  },
  "properties":{
     "timerName": { "index": 0, "kind": "path", "displayName": "Timer Name", "group": "consumer", "label": "", "required": true, "type": "string", "javaType": "java.lang.String", "deprecated": false, "deprecationNote": "", "autowired": false, "secret": false, "description": "The name of the timer" },
     // ...
  }
}
```


### GET 获取支持的脚本语言

GET /workflow/components/languages

#### 请求参数

无

#### 返回结果

| 字段名       |字段类型|说明|
|-----------|---|---|
| code | array | 脚本编程语言 |
| code.$ | string | 语言项 |
| expression | array | 表达式编程语言 |
| expression.$ | string | 语言项 |

> 返回示例

> 成功

```json
{
    "code": ["groovy","javascript","python","mvel"],
    "expression": ["groovy","javascript","python","mvel","jsonPath"]
}
```
