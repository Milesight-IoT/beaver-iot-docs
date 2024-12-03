---
sidebar_position: 5
---

import { ProjectName } from '/src/consts';

# Development Guidelines

## Overview
This document primarily outlines the backend development standards for {ProjectName}, aiming to prevent conflicts during the integration development process and facilitate subsequent maintenance.

## Naming Conventions

**1. Integration Module Naming Conventions**

It is recommended to name the Maven module artifactId the same as the integration ID, such as `msc-integration`, for ease of maintenance and retrieval.

**2. Integration Class Package Naming Conventions**

The integration class package path should adhere to the `com.milesight.beaveriot.integration.{integration_identifier}` convention, such as `com.milesight.beaveriot.integration.msc`. The `com.milesight.beaveriot` package path allows for framework scanning, `integration` is fixed, and `msc` is the integration identifier.

**3. Integration Icon Naming Conventions**

Integration icons support both **relative paths** and **absolute paths**. A **relative path** is relative to the root directory of the integration, while an **absolute path** references an external image address. When using a relative path, developers should place the image files in the `/resources/static/public` directory of the integration and name the files after the integration name to avoid conflicts.

**4. Identifier Naming Conventions**

Devices and entities in the {ProjectName} platform contain Identifiers, preferably named as snakes (lowercase letters with underscores, e.g. foo_bar). See [Introduction to key coding concepts] (.../.../key-dev-concept).

## Project Standards
**1.Project Construction**

For integration development, we provide a context dependency package for basic integration functions. Dependencies already included in {ProjectName} are set to scope as provided. Developers may introduce other dependency packages (not included in {ProjectName}) to meet integration development needs, but should preferably use the versions defined in the platform's beaver-iot-parent to avoid dependency conflicts.

## REST API Standards

### **Request and Response**

**1.Request and Response Field Style**

{ProjectName} uses snake_case naming for request and response fields, such as `user_name`. The platform will automatically convert field names during the request and response process. Additionally, when defining entities using annotations, the platform will also convert field names to snake_case by default.

**2.Request and Response Message Structure**

- **Success**

    When a request is successful, the response message structure is as follows：


    ```json
    {
       "request_id":"",                    ---【Non-empty】Request Trace ID
       "status":"Success",                 ---【Non-empty】Response status, including Success, Failed
       "data":{                            ---【Optional】Response data
    
        }
    }

    ```
- **Failure**
    
    When a request fails, the response message structure is as follows:    

    ```json
    {
       "request_id":"",                     ---【Non-empty】Request Trace ID
       "status":"Failed",                   ---【Non-empty】Response status, including Success, Failed
       "error_code": "gateway_timeout",     ---【Non-empty】Exception error code    
       "error_message": "Gateway Timeout",  ---【Optional】Exception message
       "detail_message": "",                ---【Optional】Detailed exception information
       "data":{                             ---【Optional】Exception response information, when an exception requires returning data to the frontend
    
        }
    }
    ```
**3.Request Failure Error Codes**

    {ProjectName} defines common request failure error codes. Developers can choose appropriate error codes based on actual situations or customize exception error codes. The exception error codes are as follows:

    | Error Code                        | HTTP Status Code | Description                       |
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


### **Pagination Standards**

**1.Pagination Request**

  {ProjectName} starts pagination from page 1. If the page size is not specified, the default is 10 items per page. The request message structure is as follows:

      ```json
      {
        "page_size": 100,                                      -- Specifies the number of items per page
        "page_number": 1,                                      -- Specifies the page number
        "sorts": [                                             -- Specifies sorting
                {
                    "direction":"ASC", "property":"user_name"
                }
            ]     
      }
      ```
:::warning
Note: The sorting field name should also use snake_case.
:::

**2.Pagination Response*

    {ProjectName} pagination response format is as follows:
    
        ```json
        {
            "request_id":""                      
            "status":"Success"                   
            "data":{                              
                "page_size": 10,                 ---【Non-empty】Page size
                "page_number": 1,                ---【Non-empty】Current page number
                "total": 0,                      ---【Non-empty】Total number of items
                "content": []                    ---【Non-empty】List of data
            }
        }
        ```

### **Request Path**

1. **Path Conventions**

    {ProjectName} request paths should follow RESTful conventions. For integration development, request paths should include the integration identifier, such as `/msc/user`. The `msc` is the integration identifier to avoid path conflicts between different integration developers.

### **Access Control**

     {ProjectName} will intercept requests to verify the token information in the request header. If verification fails, a 401 error code will be returned. For requests that do not require token verification, developers can name the request path as `/public`, and the platform will not verify the token information.

