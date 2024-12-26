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
    image: milesight/beaver-iot:latest
    restart: always
    ports:
      - "80:80"
    environment:
      # 配置数据库文件 (默认使用H2)
      - "DB_TYPE=h2"
      - "SPRING_DATASOURCE_URL=jdbc:h2:file:~/beaver-iot/h2/beaver;AUTO_SERVER=TRUE"
      - "SPRING_DATASOURCE_USERNAME=sa"
      - "SPRING_DATASOURCE_PASSWORD="
      - "SPRING_DATASOURCE_DRIVER_CLASS_NAME=org.h2.Driver"
    volumes:
      # 持久化存储数据
      - "./beaver-iot/:/root/beaver-iot/"
```

## 前后端分离部署

如果您需要分别部署前端和后端容器, 那么可以参考如下 docker-compose 配置, 分别部署 nginx, web 和 api 容器:

```yaml
services:
  nginx:
    container_name: beaver-iot-nginx
    image: nginx:stable-alpine3.20-slim
    restart: always
    ports:
      - "80:80"
    volumes:
      # 您需要自行准备Nginx配置文件
      - "./nginx/nginx.conf:/etc/nginx/nginx.conf"
      - "./nginx/conf.d/:/etc/nginx/conf.d/"
  web:
    container_name: beaver-iot-web
    image: milesight/beaver-iot-web:latest
    restart: always
  api:
    container_name: beaver-iot-api
    image: milesight/beaver-iot-api:latest
    restart: always
    environment:
      # 配置数据库文件 (默认使用H2)
      - "DB_TYPE=h2"
      - "SPRING_DATASOURCE_URL=jdbc:h2:file:~/beaver-iot/h2/beaver;AUTO_SERVER=TRUE"
      - "SPRING_DATASOURCE_USERNAME=sa"
      - "SPRING_DATASOURCE_PASSWORD="
      - "SPRING_DATASOURCE_DRIVER_CLASS_NAME=org.h2.Driver"
    volumes:
      # 持久化存储数据
      - "./beaver-iot/:/root/beaver-iot/"
```

:::tip
您也可以将页面文件从 web 容器中`/web`路径下取出, 托管到其他 HTTP 服务器上
:::

## 使用 Postgres 数据库

如果您希望使用 Postgres 数据库来替代 H2 数据库, 那么只需要对上述配置中`monolith`或`api`容器的环境变量稍作修改:

```yaml
services:
  nginx:
    container_name: beaver-iot-nginx
    image: nginx:stable-alpine3.20-slim
    restart: always
    ports:
      - "80:80"
      - "443:443"
    volumes:
      # 您需要自行准备Nginx配置文件
      - "./nginx/nginx.conf:/etc/nginx/nginx.conf"
      - "./nginx/conf.d/:/etc/nginx/conf.d/"
  web:
    container_name: beaver-iot-web
    image: milesight/beaver-iot-web:latest
    restart: always
  api:
    container_name: beaver-iot-api
    image: milesight/beaver-iot-api:latest
    restart: always
    environment:
      # 配置数据库连接
      - "DB_TYPE=postgres"
      - "SPRING_DATASOURCE_DRIVER_CLASS_NAME=org.postgresql.Driver"
      - "SPRING_DATASOURCE_USERNAME=postgres"
      - "SPRING_DATASOURCE_PASSWORD=postgres"
      - "SPRING_DATASOURCE_URL=jdbc:postgresql://beaver-iot-postgresql:5432/postgres"
    volumes:
      # 保存日志文件
      - "./beaver-iot/logs/:/root/beaver-iot/logs/"
      # 加载插件
      - "./beaver-iot/plugins/:/root/beaver-iot/plugins/"
  postgresql:
    container_name: beaver-iot-postgresql
    image: postgres:17.0-alpine3.20
    restart: always
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
