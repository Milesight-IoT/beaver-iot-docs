---
sidebar_position: 8
---

import { ProjectName } from '/src/consts';

# 开发规范

## 概述
本文档主要介绍{ProjectName}平台后端开发规范，目的避免集成开发过程导致的冲突，另外也有利于后续维护。
## 命名规范

**1. 集成模块命名规范**

集成Maven模块artifactId建议命名同集成ID，如`msc-integration`。方便后续维护和查找。

**2. 集成类包命名规范**
    
集成类包路径需要遵循`com.milesight.beaveriot.integrations.{integration标识}`规范，如`com.milesight.beaveriot.integrations.msc`。其中`com.milesight.beaveriot`包路径方便可被框架扫描到，`integrations`是固定的，`msc`是集成标识。

**3. 集成icon命名规范**

集成icon支持**相对路径**和**绝对路径**，**相对路径**是相对于集成的根目录的路径，**绝对路径**是引用外部的图片地址。当使用相对路径，开发者需要将图片文件放置在集成的`/resources/static/public`目录下，且文件名采用集成名称命名，避免冲突。

**4. Identifier命名规范**

{ProjectName}平台中的设备、实体均包含Identifier，最好以蛇形(小写字母加下划线，如 foo_bar)命名。可参见[关键编码概念介绍](../../key-dev-concept)。

## 工程规范
**1.工程构建**

对于集成开发，我们提供了context依赖包，用于集成开发的基础功能。对于{ProjectName}平台已经包含的依赖包，我们将其scope设置为provided。
开发者可引入其他依赖包（{ProjectName}平台未引入的包），以满足集成开发的需求,但尽可能以平台beaver-iot-parent中定义的版本为准，避免依赖冲突。

:::warning
无论是**beaver-iot**项目还是**beaver-iot-integrations**项目，在本地安装的命令都是:
```shell
mvn install -DskipTests -Ddeploy.skip
```
:::

## REST API规范

### 请求响应

**1.请求响应字段风格**

{ProjectName}平台请求响应采用蛇形命名法，如`user_name`。平台在请求响应过程中会自动进行转换。
另外，当采用注解方式定义实体时，平台默认情况下同样也会将字段名转换为蛇形命名法。

**2.请求响应报文结构**

- **成功**

    请求成功时，响应报文结构如下：

    ```json
    {
       "request_id":"",                    ---【非空】请求Trace ID
       "status":"Success",                 ---【非空】响应状态，包括Success、Failed
       "data":{                            ---【可为空】接口响应数据
    
        }
    }

    ```
- **失败**
    
    请求失败时，响应报文结构如下：    

    ```json
    {
       "request_id":"",                     ---【非空】请求Trace ID
       "status":"Failed",                   ---【非空】响应状态，包括Success、Failed
       "error_code": "gateway_timeout",     ---【非空】异常错误码  
       "error_message": "Gateway Timeout",  ---【可为空】异常信息
       "detail_message": "",                ---【可为空】详细的异常信息
       "data":{                             ---【可为空】异常响应信息，当异常且需要返回数据至前端
    
        }
    }
    ```
**3.请求失败错误码**

    {ProjectName}平台定义了常见的请求失败错误码，开发者在开发过程中可根据实际情况选择合适的错误码，或自定义异常错误码。异常错误码如下：

    | 错误代码                        | HTTP 状态码 | 描述                       |
    |--------------------------------|-------------|----------------------------|
    | SERVER_ERROR                   | 500         | server_error               |
    | PARAMETER_VALIDATION_FAILED    | 400         | parameter_validation_failed|
    | REQUEST_TOO_FREQUENTLY         | 429         | request_too_frequently     |
    | PARAMETER_SYNTAX_ERROR         | 400         | parameter_syntax_error     |
    | DATA_NO_FOUND                  | 404         | data_no_found              |
    | TOKEN_EXPIRED                  | 401         | token_expired              |
    | FORBIDDEN_PERMISSION           | 401         | forbidden_permission       |
    | METHOD_NOT_ALLOWED             | 400         | method_not_allowed         |
    | TOKEN_INVALID                  | 401         | token_invalid              |
    | AUTHENTICATION_FAILED          | 401         | authentication_failed      |    


### 分页规范

**1.分页请求**

  {ProjectName}平台分页页数从1开始，在为指定每页大小情况下，默认每页10条，请求报文结构如下：

      ```json
      {
        "page_size": 100,                                      -- 指定单页数据量
        "page_number": 1,                                      -- 指定分页号
        "sorts": [                                             --指定排序
                {
                    "direction":"ASC", "property":"user_name"
                }
            ]     
      }
      ```
:::warning
注意，此处的排序字段名同样采用蛇形风格
:::

**2.分页响应**

    {ProjectName}平台分页响应格式如下：
    
        ```json
        {
            "request_id":""                      
            "status":"Success"                   
            "data":{                              
                "page_size": 10,                 ---【非空】每页大小
                "page_number": 1,                ---【非空】当前页数
                "total": 0,                      ---【非空】总数
                "content": []                    ---【非空】列表数据
            }
        }
        ```

### 请求路径

1. **路径规范**

    {ProjectName}平台请求路径应遵循RESTful规范。对于集成开发，请求路径应包含集成标识，如`/msc/user`。其中`msc`是集成标识，避免不同集成开发者之间的路径冲突。

### 访问控制

    {ProjectName}平台将会拦截请求，校验请求头中的token信息，验证不通过将会返回401错误码。对于不需要校验token的请求，开发者可将请求路径命名为`/public`，平台将不会校验token信息。

