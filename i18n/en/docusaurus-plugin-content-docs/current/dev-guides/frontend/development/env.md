---
sidebar_position: 10
---

# Environment Variables

This project is designed as a Monorepo, with sub-applications using Vite as the build tool. The repository typically contains tightly related applications and tools. When adjusting environment variables, we aim to make unified adjustments in the root directory of the repository, while also allowing each sub-application to modify them independently. Therefore, we have standardized the configuration of environment variables and extracted a unified environment variable handling tool, giving developers more flexible variable handling capabilities.

### Configuration Standards

By default, after the application starts, it will sequentially read the following environment variable configuration files:

```bash
# .env in the root directory of the repository
.env

# .env.local in the root directory of the repository
.env.local

# .env in the sub-application directory
apps/web/.env

# .env.local in the sub-application directory
apps/web/.env.local
```

If there are variables with the same name in these configurations, the later-loaded ones will override the earlier ones. The loading order of the configurations can be customized. Developers can flexibly adjust it in the `vite.config.ts` of the application directory:

```ts
const { WEB_API_PROXY } = parseEnvVariables([
  path.join(projectRoot, ".env"),
  path.join(projectRoot, ".env.local"),
  path.join(__dirname, ".env"),
  path.join(__dirname, ".env.local"),
]);
```

## Built-in Variables

To facilitate development debugging and online issue troubleshooting, we have built some commonly used environment variables into the application. When executing `getViteEnvVarsConfig` in the build configuration of the application's `vite.config.ts`, these variables will be automatically loaded. During the application runtime, the following variables can be called:

```bash
# Application build timestamp
__BUILD_TIMESTAMP__

# Application build branch (requires git command support in the build environment)
__GIT_BRANCH__

# Application build commit hash (requires git command support in the build environment)
__LATEST_COMMIT_HASH__
```

## Application Variables

Currently, this project only has a web application. Some variables are only used during the build process and will not be injected into the runtime environment, as follows:

```bash
# Web application development server port
WEB_DEV_PORT=9000

# API proxy address
WEB_API_PROXY=http://192.168.45.115:9200

# WebSocket proxy address
WEB_SOCKET_PROXY=http://192.168.45.115:9201
```

- `WEB_DEV_PORT`: Local development server port for the web application;
- `WEB_API_PROXY`: API proxy address for the web application. To solve cross-origin issues and facilitate flexible development and debugging, the local front-end service will by default proxy requests with the `/api/v1` prefix to this address. If a local backend service is already deployed or there are other backend services, this variable can be modified accordingly;
- `WEB_SOCKET_PROXY`: WebSocket service proxy address for the web application. The local front-end service will by default proxy requests with the `/websocket` prefix to this address.

Runtime environment variables:

```bash
# API origin address
WEB_API_ORIGIN=/

# WebSocket host address
WEB_WS_HOST=/

# OAuth client ID
OAUTH_CLIENT_ID=iab

# OAuth client secret
OAUTH_CLIENT_SECRET=milesight*iab
```

The above variables will be injected into the application's runtime environment, and the variable names will be adjusted accordingly:

- `WEB_API_ORIGIN`: Runtime variable name `__APP_API_ORIGIN__`, default configuration is `/`. If the address starts with `http`/`https`, the application's API request address will directly use this origin, making the build-time `WEB_API_PROXY` configuration invalid;
- `WEB_WS_HOST`: Runtime variable name `__APP_WS_HOST__`, default configuration is `/`. If the address starts with `ws`/`wss`/`http`/`https`, the WebSocket service will directly use this host, making the build-time `WEB_SOCKET_PROXY` configuration invalid;
- `OAUTH_CLIENT_ID`: OAuth ID for authentication, adjust as needed;
- `OAUTH_CLIENT_SECRET`: OAuth Secret for authentication, adjust as needed;

> Tip: For temporary variable adjustments, it is recommended to modify them in `.env.local` to limit the impact of variable adjustments to the local environment.

:::warning Note
Vite supports convention-based environment variable definitions, automatically reading variables with the `VITE_` prefix from `.env.*` files in the application root directory and exposing them to the runtime environment via `import.meta.env`. This approach generally works well, but some third-party libraries may also use variables from `import.meta.env`. If variables in the application change, the resource hash generated during the build process for third-party libraries may also change, causing browser cache invalidation. Therefore, it is recommended:

1. Use the `VITE_` prefix for environment variables cautiously. If necessary, ensure the stability of these variables, so they do not change with application versions;
2. Use the `getViteEnvVarsConfig` method to define environment variables. Variables defined using this method will not be mounted to `import.meta.env` but will follow the naming convention `__${name}__`, making them safe to use in the runtime environment.
   :::
