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

### 端口

| Port | Description                    |
|------|--------------------------------|
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

### 端口

| Port | Description                                    |
|------|------------------------------------------------|
| 80   | Nginx HTTP 端口, 用于访问网页和请求 API                   |
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
