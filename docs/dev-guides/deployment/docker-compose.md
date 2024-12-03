---
sidebar_position: 1
---

# Docker Compose

## 单体部署

如果您不希望部署任何额外的容器, 那么可以参考如下 docker-compose 配置, 通过 monolith 镜像启动单体服务:

```yaml
services:
  monolith:
    container_name: beaver-iot
    image: ${DOCKER_REPO:-beaver-iot}/monolith:${BEAVER_IOT_IMAGE_TAG:-latest}
    ports:
      - "80:80"
    environment:
      # Configure database connection (using h2 as default)
      - "DB_TYPE=h2"
      # Allow remote access to h2 console
      - "SPRING_H2_CONSOLE_ENABLED=true"
      - "SPRING_H2_CONSOLE_SETTINGS_WEB_ALLOW_OTHERS=true"
      - "SPRING_DATASOURCE_URL=jdbc:h2:file:~/beaver-iot/h2/beaver;AUTO_SERVER=TRUE"
      - "SPRING_DATASOURCE_USERNAME=sa"
      - "SPRING_DATASOURCE_PASSWORD="
      - "SPRING_DATASOURCE_DRIVER_CLASS_NAME=org.h2.Driver"
    volumes:
      # Persist database data and log files
      - "./beaver-iot/:/root/beaver-iot/"
```

## 前后端分离部署

如果您需要分别部署前端和后端容器, 那么可以参考如下 docker-compose 配置, 分别部署 nginx, web 和 server 容器:

```yaml
services:
  nginx:
    container_name: beaver-iot-nginx
    image: nginx:stable-alpine3.20-slim
    ports:
      - "80:80"
    volumes:
      # Nginx config files should be prepared by yourself
      - "./nginx/nginx.conf:/etc/nginx/nginx.conf"
      - "./nginx/conf.d/:/etc/nginx/conf.d/"
  web:
    container_name: beaver-iot-web
    image: ${DOCKER_REPO:-beaver-iot}/web:${BEAVER_IOT_IMAGE_TAG:-latest}
  server:
    container_name: beaver-iot-server
    image: ${DOCKER_REPO:-beaver-iot}/server:${BEAVER_IOT_IMAGE_TAG:-latest}
    environment:
      # Configure database connection (using h2 as default)
      - "DB_TYPE=h2"
      # Allow remote access to h2 console
      - "SPRING_H2_CONSOLE_ENABLED=true"
      - "SPRING_H2_CONSOLE_SETTINGS_WEB_ALLOW_OTHERS=true"
      - "SPRING_DATASOURCE_URL=jdbc:h2:file:~/beaver-iot/h2/beaver;AUTO_SERVER=TRUE"
      - "SPRING_DATASOURCE_USERNAME=sa"
      - "SPRING_DATASOURCE_PASSWORD="
      - "SPRING_DATASOURCE_DRIVER_CLASS_NAME=org.h2.Driver"
    volumes:
      # Persist database data and log files
      - "./beaver-iot/:/root/beaver-iot/"
```

:::tip
您也可以将页面文件从 web 容器中`/web`路径下取出, 托管到其他 HTTP 服务器上
:::

## 使用 Postgres 数据库

如果您希望使用 Postgres 数据库来替代 H2 数据库, 那么只需要对上述配置中 monolith/server 容器的环境变量稍作修改:

```yaml
services:
  nginx:
    container_name: beaver-iot-nginx
    image: nginx:stable-alpine3.20-slim
    ports:
      - "80:80"
      - "443:443"
    volumes:
      # Nginx config files should be prepared by yourself
      - "./nginx/nginx.conf:/etc/nginx/nginx.conf"
      - "./nginx/conf.d/:/etc/nginx/conf.d/"
  web:
    container_name: beaver-iot-web
    image: ${DOCKER_REPO:-beaver-iot}/web:${BEAVER_IOT_IMAGE_TAG:-latest}
    ports:
      - "80:80"
  server:
    container_name: beaver-iot-server
    image: ${DOCKER_REPO:-beaver-iot}/server:${BEAVER_IOT_IMAGE_TAG:-latest}
    environment:
      # Configure database connection
      - "DB_TYPE=postgres"
      - "SPRING_DATASOURCE_DRIVER_CLASS_NAME=org.postgresql.Driver"
      - "SPRING_DATASOURCE_USERNAME=postgres"
      - "SPRING_DATASOURCE_PASSWORD=postgres"
      - "SPRING_DATASOURCE_URL=jdbc:postgresql://beaver-iot-postgresql:5432/postgres"
    volumes:
      # Persist log files
      - "./beaver-iot/logs/:/root/beaver-iot/logs/"
      # Load plugins
      - "./beaver-iot/plugins/:/root/beaver-iot/plugins/"
  postgresql:
    container_name: beaver-iot-postgresql
    image: postgres:17.0-alpine3.20
    ports:
      - "5432:5432"
    environment:
      - "POSTGRES_USER=postgres"
      - "POSTGRES_PASSWORD=postgres"
      - "POSTGRES_DB=postgres"
      - "PGDATA=/var/lib/postgresql/data/pgdata"
    volumes:
      - "./postgresql/:/var/lib/postgresql/data/"
```

:::tip
您可以将 Postgres 数据库部署在任何地方, 只要正确配置 SPRING_DATASOURCE_URL 即可
:::
