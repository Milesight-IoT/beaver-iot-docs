---
sidebar_position: 2
---

# 容器配置

## beaver-iot-web

### 环境变量

| Name                      | Default    | Description                       |
|---------------------------|------------|-----------------------------------|
| BEAVER_IOT_API_HOST       | 172.17.0.1 | Nginx HTTP 代理的目的地址, 即后端服务的IP或FQDN |
| BEAVER_IOT_API_PORT       | 9200       | API 服务的 HTTP 端口号                  |
| BEAVER_IOT_WEBSOCKET_PORT | 9201       | API 服务的 Websocket 端口号             |

### 端口

| Port | Description       |
|------|-------------------|
| 80   | HTTP 服务端口, 用于访问网页 |

### 文件

| Path                           | Description           |
|--------------------------------|-----------------------|
| /web/                          | 网页文件目录                |
| /etc/nginx/nginx.conf          | nginx 主配置文件           |
| /etc/nginx/conf.d/             | nginx 额外配置文件目录        |
| /etc/nginx/conf.d/default.conf | nginx 默认 http 服务器配置文件 |

## beaver-iot-api

### 环境变量

| Name                                        | Default                                                   | Description                                            |
|---------------------------------------------|-----------------------------------------------------------|--------------------------------------------------------|
| JAVA_OPTS                                   |                                                           | JVM 配置参数                                               |
| SPRING_OPTS                                 |                                                           | Spring 配置参数                                            |
| DB_TYPE                                     | h2                                                        | 数据库类型, 可选项: `postgres`, `h2`                           |
| SPRING_H2_CONSOLE_ENABLED                   | false                                                     | 是否启用, 可选项: `true`, `false`                             |
| SPRING_H2_CONSOLE_SETTINGS_WEB_ALLOW_OTHERS | false                                                     | 是否允许其他主机访问, 可选项: `true`, `false`                       |
| SPRING_DATASOURCE_URL                       | jdbc:h2:file:~/beaver-iot/h2/beaver;<br/>AUTO_SERVER=TRUE | 数据库 jdbc 连接                                            |
| SPRING_DATASOURCE_USERNAME                  | sa                                                        | 数据库用户名                                                 |
| SPRING_DATASOURCE_PASSWORD                  |                                                           | 数据库密码                                                  |
| SPRING_DATASOURCE_DRIVER_CLASS_NAME         | org.h2.Driver                                             | 数据库驱动类名, 可选项: `org.h2.Driver`, `org.postgresql.Driver` |
| CLUSTER_ENABLED                             | false                                                     | 是否开启集群模式, 可选项: `true`, `false`                         |
| REDIS_HOST                                  |                                                           | Redis 服务器地址                                            |
| REDIS_PORT                                  | 6379                                                      | Redis 服务器端口                                            |                                                 |
| REDIS_PASSWORD                              |                                                           | Redis 密码                                               |
| REDIS_SSL                                   | false                                                     | Redis 是否启用 SSL                                         |
| REDIS_DB                                    | 0                                                         | Redis DB                                               |                                                 |
| MQTT_BROKER_HOST                            |                                                           | MQTT Broker的IP或FQDN, 供MQTT客户端连接使用                      |
| MQTT_BROKER_MQTT_PORT                       | 1883                                                      | MQTT Broker TCP端口                                      |
| MQTT_BROKER_MQTTS_PORT                      | 8883                                                      | MQTT Broker SSL/TLS端口                                  |
| MQTT_BROKER_WS_PORT                         | 8083                                                      | MQTT Broker Websocket端口                                |
| MQTT_BROKER_WSS_PORT                        | 8084                                                      | MQTT Broker Websocket SSL/TLS端口                        |
| MQTT_BROKER_WS_PATH                         | /mqtt                                                     | MQTT Broker Websocket路径                                |
| MQTT_EMQX_INTERNAL_MQTT_ENDPOINT            | tcp://$\{MQTT_BROKER_HOST}:1883                           | EMQX MQTT端点, 供Beaver API服务器连接使用 (注意: EMQX配置仅在集群模式下生效)  |
| MQTT_EMQX_INTERNAL_MQTT_USERNAME            |                                                           | EMQX MQTT用户名, 需要所有主题的订阅和发布权限                           |
| MQTT_EMQX_INTERNAL_MQTT_PASSWORD            |                                                           | EMQX MQTT密码                                            |
| MQTT_EMQX_INTERNAL_REST_API_ENDPOINT        | http://$\{MQTT_BROKER_HOST}:18083                         | EMQX REST API端点                                        |
| MQTT_EMQX_INTERNAL_REST_API_USERNAME        |                                                           | EMQX REST API Key                                      |
| MQTT_EMQX_INTERNAL_REST_API_PASSWORD        |                                                           | EMQX REST API 密钥                                       |

### 端口

| Port | Description                    |
|------|--------------------------------|
| 1883 | 内置MQTT Broker端口, 用于连接 MQTT     |
| 9200 | HTTP 服务端口, 用于请求 API            |
| 9201 | Websocket 服务端口, 用于连接 Websocket |

### 文件

| Path                           | Description     |
|--------------------------------|-----------------|
| /root/beaver-iot/logs/         | API 服务日志文件目录    |
| /root/beaver-iot/integrations/ | Beaver IoT 集成目录 |
| /root/beaver-iot/h2/           | H2 数据库存储目录      |

## beaver-iot

### 环境变量

| Name                                        | Default                                                   | Description                                            |
|---------------------------------------------|-----------------------------------------------------------|--------------------------------------------------------|
| BEAVER_IOT_API_HOST                         | localhost                                                 | Nginx HTTP 代理的目的地址, 即后端服务的IP或FQDN                      |
| BEAVER_IOT_API_PORT                         | 9200                                                      | API 服务的 HTTP 端口号                                       |
| BEAVER_IOT_WEBSOCKET_PORT                   | 9201                                                      | API 服务的 Websocket 端口号                                  |                  |
| JAVA_OPTS                                   |                                                           | JVM 配置参数                                               |
| SPRING_OPTS                                 |                                                           | Spring 配置参数                                            |
| DB_TYPE                                     | h2                                                        | 数据库类型, 可选项: `postgres`, `h2`                           |
| SPRING_H2_CONSOLE_ENABLED                   | false                                                     | 是否启用, 可选项: `true`, `false`                             |
| SPRING_H2_CONSOLE_SETTINGS_WEB_ALLOW_OTHERS | false                                                     | 是否允许其他主机访问, 可选项: `true`, `false`                       |
| SPRING_DATASOURCE_URL                       | jdbc:h2:file:~/beaver-iot/h2/beaver;<br/>AUTO_SERVER=TRUE | 数据库 jdbc 连接                                            |
| SPRING_DATASOURCE_USERNAME                  | sa                                                        | 数据库用户名                                                 |
| SPRING_DATASOURCE_PASSWORD                  |                                                           | 数据库密码                                                  |
| SPRING_DATASOURCE_DRIVER_CLASS_NAME         | org.h2.Driver                                             | 数据库驱动类名, 可选项: `org.h2.Driver`, `org.postgresql.Driver` |
| CLUSTER_ENABLED                             | false                                                     | 是否开启集群模式, 可选项: `true`, `false`                         |
| REDIS_HOST                                  |                                                           | Redis 服务器地址                                            |
| REDIS_PORT                                  | 6379                                                      | Redis 服务器端口                                            |                                                 |
| REDIS_PASSWORD                              |                                                           | Redis 密码                                               |
| REDIS_SSL                                   | false                                                     | Redis 是否启用 SSL                                         |
| REDIS_DB                                    | 0                                                         | Redis DB                                               |                                                 |
| MQTT_BROKER_HOST                            |                                                           | MQTT Broker的IP或FQDN, 供MQTT客户端连接使用                      |
| MQTT_BROKER_MQTT_PORT                       | 1883                                                      | MQTT Broker TCP端口                                      |
| MQTT_BROKER_MQTTS_PORT                      | 8883                                                      | MQTT Broker SSL/TLS端口                                  |
| MQTT_BROKER_WS_PORT                         | 8083                                                      | MQTT Broker Websocket端口                                |
| MQTT_BROKER_WSS_PORT                        | 8084                                                      | MQTT Broker Websocket SSL/TLS端口                        |
| MQTT_BROKER_WS_PATH                         | /mqtt                                                     | MQTT Broker Websocket路径                                |
| MQTT_EMQX_INTERNAL_MQTT_ENDPOINT            | tcp://$\{MQTT_BROKER_HOST}:1883                           | EMQX MQTT端点, 供Beaver API服务器连接使用 (注意: EMQX配置仅在集群模式下生效)  |
| MQTT_EMQX_INTERNAL_MQTT_USERNAME            |                                                           | EMQX MQTT用户名, 需要所有主题的订阅和发布权限                           |
| MQTT_EMQX_INTERNAL_MQTT_PASSWORD            |                                                           | EMQX MQTT密码                                            |
| MQTT_EMQX_INTERNAL_REST_API_ENDPOINT        | http://$\{MQTT_BROKER_HOST}:18083                         | EMQX REST API端点                                        |
| MQTT_EMQX_INTERNAL_REST_API_USERNAME        |                                                           | EMQX REST API Key                                      |
| MQTT_EMQX_INTERNAL_REST_API_PASSWORD        |                                                           | EMQX REST API 密钥                                       |

### 端口

| Port | Description                                    |
|------|------------------------------------------------|
| 80   | Nginx HTTP 端口, 用于访问网页和请求 API                   |
| 1883 | 内置MQTT Broker端口, 用于连接 MQTT                     |
| 9200 | API 服务 HTTP 端口, 用于请求 API(不经过 Nginx)            |
| 9201 | API 服务 Websocket 端口, 用于连接 Websocket(不经过 Nginx) |

### 文件

| Path                           | Description           |
|--------------------------------|-----------------------|
| /web/                          | 网页文件目录                |
| /etc/nginx/nginx.conf          | nginx 主配置文件           |
| /etc/nginx/conf.d/             | nginx 额外配置文件目录        |
| /etc/nginx/conf.d/default.conf | nginx 默认 http 服务器配置文件 |
| /root/beaver-iot/logs/         | API 服务日志文件目录          |
| /root/beaver-iot/integrations/ | Beaver IoT 集成目录       |
| /root/beaver-iot/h2/           | H2 数据库存储目录            |
