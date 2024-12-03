---
sidebar_position: 12
---

# API Requests

In frontend development, making API requests is a very common operation. To facilitate management and maintenance, and to standardize the handling of API requests, ensuring that all request parameters and response data have complete TypeScript type definitions, we have encapsulated a general-purpose API handling tool.

## Getting Started

The API handling tool is currently maintained in the `shared/src/utils/request` directory and supports various API request configuration methods for flexible selection.

Creating an instance:

```ts
// client.ts
import { createRequestClient } from "@milesight/shared/src/utils/request";

/** Business request header configuration */
const headerHandler = async () => {
  // ...
};

/** Auto-refresh logic handling */
const autoJumpHandler = async () => {
  // ...
};

/** API timeout tracking and reporting */
const trackerHandler = async () => {
  // ...
};

const client = createRequestClient({
  // API base URL
  baseURL: "https://xxx.host.com",
  // Static API request headers
  headers: {
    "x-headers": "xxx",
  },
  configHandlers: [headerHandler, autoJumpHandler],
  onResponse(resp) {
    // Todo: Global common response handling
    return resp;
  },
  onResponseError(error) {
    // Todo: Global common error handling
    return error;
  },
});

export default client;
```

Creating an API:

```ts
// services/http/user.ts
import { attachAPI } from "@milesight/shared/src/utils/request";
import client from "client.ts";

// APISchema is defined in @milesight/shared/types/common.d.ts
interface UserAPISchema extends APISchema {
  /** Get user by ID */
  getUser: {
    request: {
      id: number;
    };
    response: {
      avatar: string;
      id: number;
      name: string;
    };
  };

  /** Get the currently logged-in user */
  getLoginUser: {
    request: void;
    response: {
      id: number;
      name: string;
      avatar: string;
    };
  };

  /** Create a new user */
  createUser: {
    request: {
      avatar: string;
      name: string;
      enterpriseId: number;
    };
    response: {
      avatar: string;
      id: number;
      name: string;
    };
  };

  /** Download resource */
  download: {
    request: {
      id: number;
    };
    response: unknown;
  };
}

export default attachAPI<UserAPISchema>(client, {
  // API error and response handling is delegated to the service layer, and can be defined by the business logic
  onError(error) {
    // Todo: Unified error handling for APIs
    return error;
  },

  onResponse(resp) {
    // Todo: Unified response handling for APIs
    return resp;
  },

  // Supports 3 configuration methods for flexible selection
  apis: {
    // String configuration
    getUser: "GET api/user/:id",
    getLoginUser: "GET api/user/current",

    // Object configuration
    createUser: {
      method: "POST",
      path: "api/user/:enterpriseId",
      // Special configuration
      headers: { "x-abc": "xxx" },
    },

    // Function configuration
    download: async (params) => {
      const resp = await client.request({
        url: "http://xxx.milesight.com",
        method: "GET",
        params,
        headers: {
          enterpriseId: "xxx",
        },
        responseType: "blob",
      });
      let result = resp.data.data;
      // ...
      return result;
    },
  },
});
```

Business usage:

```ts
import userAPI from "@/services/http/user.ts";

userAPI.getUser({ id: 123 }).then((resp) => {
  console.log(resp.data.data);
});
```

## Error Handling

Based on the request handling tool, we have encapsulated unified API error handling logic in the web application. This allows for uniform interception and handling of common API error codes (such as `authentication_failed` for user authentication errors), while also supporting interception and custom handling of error codes during business calls.

### Unified Interception

By default, all API error codes are intercepted and a message prompt is displayed. Developers can also customize the unified handling method according to business needs, as follows:

```ts
// web/src/services/http/client/error-handler.ts
const handlerConfigs: ErrorHandlerConfig[] = [
  /**
   * Intercept the authentication_failed error code and perform the following actions:
   * 1. Display a message prompt
   * 2. Redirect to the login/registration page after 1 second
   * 3. Remove the token cache
   */
  {
    errCodes: ["authentication_failed"],
    handler(errCode, resp) {
      const intlKey = getHttpErrorKey(errCode);
      const message = intl.get(intlKey) || intl.get(serverErrorKey);
      const target = iotLocalStorage.getItem(REGISTERED_KEY)
        ? "/auth/login"
        : "/auth/register";

      toast.error({
        key: errCode,
        content: message,
        duration: 1000,
        onClose: () => {
          const { pathname } = window.location;

          if (target === pathname) return;
          location.replace(target);
        },
      });
      iotLocalStorage.removeItem(TOKEN_CACHE_KEY);
    },
  },
];
```

### Custom Interception

In business development, the handling of API errors is sometimes closely related to business logic. In such cases, we can configure the `$ignoreError` parameter during the API call to ignore the unified error interception handling. There are 3 configuration methods for custom interception handling, as shown in the examples below.

Ignore all unified error interception handling:

```ts
const {
  data: deviceData,
  loading,
  run: getDeviceList,
} = useRequest(
  async () => {
    const { page, pageSize } = paginationModel;
    const [error, resp] = await awaitWrap(
      deviceAPI.getList(
        {
          name: keyword,
          page_size: pageSize,
          page_number: page + 1,
        },
        // Ignore all common error interception handling, business logic must define error handling
        { $ignoreError: true }
      )
    );
    const data = getResponseData(resp);

    if (error || !data || !isRequestSuccess(resp)) {
      // TODO: Define custom error handling logic here
      return;
    }

    return objectToCamelCase(data);
  },
  {
    debounceWait: 300,
    refreshDeps: [keyword, paginationModel],
  }
);
```

Ignore unified error interception handling for specific error codes:

```ts
const {
  data: deviceData,
  loading,
  run: getDeviceList,
} = useRequest(
  async () => {
    const { page, pageSize } = paginationModel;
    const [error, resp] = await awaitWrap(
      deviceAPI.getList(
        {
          name: keyword,
          page_size: pageSize,
          page_number: page + 1,
        },
        // Only ignore interception handling for the `authentication_failed` error code, business logic must define error handling
        { $ignoreError: ["authentication_failed"] }
      )
    );
    const data = getResponseData(resp);

    if (error || !data || !isRequestSuccess(resp)) {
      // TODO: Define custom error handling logic here
      return;
    }

    return objectToCamelCase(data);
  },
  {
    debounceWait: 300,
    refreshDeps: [keyword, paginationModel],
  }
);
```

Ignore unified error interception handling for specific error codes and define an error handling function:

```ts
const {
  data: deviceData,
  loading,
  run: getDeviceList,
} = useRequest(
  async () => {
    const { page, pageSize } = paginationModel;
    const [error, resp] = await awaitWrap(
      deviceAPI.getList(
        {
          name: keyword,
          page_size: pageSize,
          page_number: page + 1,
        },
        {
          $ignoreError: [
            {
              codes: ["authentication_failed", "token_expired"],
              handler(errCode, resp) {
                // TODO: Define custom error handling logic here
              },
            },
          ],
        }
      )
    );
    const data = getResponseData(resp);

    if (error || !data || !isRequestSuccess(resp)) return;

    return objectToCamelCase(data);
  },
  {
    debounceWait: 300,
    refreshDeps: [keyword, paginationModel],
  }
);
```
