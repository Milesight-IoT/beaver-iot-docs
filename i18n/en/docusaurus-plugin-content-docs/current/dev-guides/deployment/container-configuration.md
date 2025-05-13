---
sidebar_position: 2
---

# Container Configuration

## beaver-iot-web

### Environment Variables

| Name                      | Default    | Description                                                                      |
|---------------------------|------------|----------------------------------------------------------------------------------|
| BEAVER_IOT_API_HOST       | 172.17.0.1 | Destination address for Nginx HTTP proxy, i.e., the backend service's IP or FQDN |
| BEAVER_IOT_API_PORT       | 9200       | HTTP port number for the API service                                             |
| BEAVER_IOT_WEBSOCKET_PORT | 9201       | WebSocket port number for the API service                                        |

### Ports

| Port | Description                      |
|------|----------------------------------|
| 80   | HTTP service port for web access |

### Files

| Path                           | Description                                        |
|--------------------------------|----------------------------------------------------|
| /web/                          | Directory for web files                            |
| /etc/nginx/nginx.conf          | Main configuration file for Nginx                  |
| /etc/nginx/conf.d/             | Directory for additional Nginx configuration files |
| /etc/nginx/conf.d/default.conf | Default HTTP server configuration file for Nginx   |

## beaver-iot-api

### Environment Variables

| Name                                        | Default                                                   | Description                                                                                                                                  |
|---------------------------------------------|-----------------------------------------------------------|----------------------------------------------------------------------------------------------------------------------------------------------|
| JAVA_OPTS                                   |                                                           | JVM configuration parameters                                                                                                                 |
| SPRING_OPTS                                 |                                                           | Spring configuration parameters                                                                                                              |
| DB_TYPE                                     | h2                                                        | Database type, options: `postgres`, `h2`                                                                                                     |
| SPRING_H2_CONSOLE_ENABLED                   | false                                                     | Enable H2 console, options: `true`, `false`                                                                                                  |
| SPRING_H2_CONSOLE_SETTINGS_WEB_ALLOW_OTHERS | false                                                     | Allow access from other hosts, options: `true`, `false`                                                                                      |
| SPRING_DATASOURCE_URL                       | jdbc:h2:file:~/beaver-iot/h2/beaver;<br/>AUTO_SERVER=TRUE | JDBC connection for the database                                                                                                             |
| SPRING_DATASOURCE_USERNAME                  | sa                                                        | Database username                                                                                                                            |
| SPRING_DATASOURCE_PASSWORD                  |                                                           | Database password                                                                                                                            |
| SPRING_DATASOURCE_DRIVER_CLASS_NAME         | org.h2.Driver                                             | Database driver class name, options: `org.h2.Driver`, `org.postgresql.Driver`                                                                |
| CLUSTER_ENABLED                             | false                                                     | Enable cluster mode.                                                                                                                         |
| REDIS_HOST                                  |                                                           | Redis server host name or IP address.                                                                                                        |
| REDIS_PORT                                  | 6379                                                      | Redis server port                                                                                                                            |                                                 
| REDIS_PASSWORD                              |                                                           | Redis password                                                                                                                               |
| REDIS_SSL                                   | false                                                     | Enable SSL/TLS for Redis connection.                                                                                                         |
| REDIS_DB                                    | 0                                                         | Redis Database id.                                                                                                                           |                                                 
| MQTT_BROKER_HOST                            |                                                           | MQTT Broker host name or IP address.                                                                                                         |
| MQTT_BROKER_MQTT_PORT                       | 1883                                                      | MQTT Broker TCP port.                                                                                                                        |
| MQTT_BROKER_MQTTS_PORT                      | 8883                                                      | MQTT Broker SSL/TLS port.                                                                                                                    |
| MQTT_BROKER_WS_PORT                         | 8083                                                      | MQTT Broker websocket port.                                                                                                                  |
| MQTT_BROKER_WSS_PORT                        | 8084                                                      | MQTT Broker websocket secure port.                                                                                                           |
| MQTT_BROKER_WS_PATH                         | /mqtt                                                     | MQTT Broker websocket path.                                                                                                                  |
| MQTT_EMQX_INTERNAL_MQTT_ENDPOINT            | tcp://$\{MQTT_BROKER_HOST}:1883                           | EMQX MQTT endpoint. Used to bridge MQTT messages with the Beaver-IoT API server. Note: EMQX configuration only takes effect in cluster mode. |
| MQTT_EMQX_INTERNAL_MQTT_USERNAME            |                                                           | EMQX MQTT username. Subscription and publish permissions for all topics are required.                                                        |
| MQTT_EMQX_INTERNAL_MQTT_PASSWORD            |                                                           | EMQX MQTT password.                                                                                                                          |
| MQTT_EMQX_INTERNAL_REST_API_ENDPOINT        | http://$\{MQTT_BROKER_HOST}:18083                         | EMQX REST API endpoint.                                                                                                                      |
| MQTT_EMQX_INTERNAL_REST_API_USERNAME        |                                                           | EMQX REST API key.                                                                                                                           |
| MQTT_EMQX_INTERNAL_REST_API_PASSWORD        |                                                           | EMQX REST API secret key.                                                                                                                    |

### Ports

| Port | Description                                      |
|------|--------------------------------------------------|
| 1883 | Built-in MQTT broker port for MQTT connections   |
| 9200 | HTTP service port for API requests               |
| 9201 | WebSocket service port for WebSocket connections |

### Files

| Path                           | Description                           |
|--------------------------------|---------------------------------------|
| /root/beaver-iot/logs/         | Directory for API service log files   |
| /root/beaver-iot/integrations/ | Directory for Beaver IoT integrations |
| /root/beaver-iot/h2/           | Directory for H2 database storage     |

## beaver-iot

### Environment Variables

| Name                                        | Default                                                   | Description                                                                                                                                  |
|---------------------------------------------|-----------------------------------------------------------|----------------------------------------------------------------------------------------------------------------------------------------------|
| BEAVER_IOT_API_HOST                         | localhost                                                 | Destination address for Nginx HTTP proxy, i.e., the backend service's IP or FQDN                                                             |
| BEAVER_IOT_API_PORT                         | 9200                                                      | HTTP port number for the API service                                                                                                         |
| BEAVER_IOT_WEBSOCKET_PORT                   | 9201                                                      | WebSocket port number for the API service                                                                                                    |
| JAVA_OPTS                                   |                                                           | JVM configuration parameters                                                                                                                 |
| SPRING_OPTS                                 |                                                           | Spring configuration parameters                                                                                                              |
| DB_TYPE                                     | h2                                                        | Database type, options: `postgres`, `h2`                                                                                                     |
| SPRING_H2_CONSOLE_ENABLED                   | false                                                     | Enable H2 console, options: `true`, `false`                                                                                                  |
| SPRING_H2_CONSOLE_SETTINGS_WEB_ALLOW_OTHERS | false                                                     | Allow access from other hosts, options: `true`, `false`                                                                                      |
| SPRING_DATASOURCE_URL                       | jdbc:h2:file:~/beaver-iot/h2/beaver;<br/>AUTO_SERVER=TRUE | JDBC connection for the database                                                                                                             |
| SPRING_DATASOURCE_USERNAME                  | sa                                                        | Database username                                                                                                                            |
| SPRING_DATASOURCE_PASSWORD                  |                                                           | Database password                                                                                                                            |
| SPRING_DATASOURCE_DRIVER_CLASS_NAME         | org.h2.Driver                                             | Database driver class name, options: `org.h2.Driver`, `org.postgresql.Driver`                                                                |
| CLUSTER_ENABLED                             | false                                                     | Enable cluster mode.                                                                                                                         |
| REDIS_HOST                                  |                                                           | Redis server host name or IP address.                                                                                                        |
| REDIS_PORT                                  | 6379                                                      | Redis server port                                                                                                                            |                                                 
| REDIS_PASSWORD                              |                                                           | Redis password                                                                                                                               |
| REDIS_SSL                                   | false                                                     | Enable SSL/TLS for Redis connection.                                                                                                         |
| REDIS_DB                                    | 0                                                         | Redis Database id.                                                                                                                           |                                                 
| MQTT_BROKER_HOST                            |                                                           | MQTT Broker host name or IP address.                                                                                                         |
| MQTT_BROKER_MQTT_PORT                       | 1883                                                      | MQTT Broker TCP port.                                                                                                                        |
| MQTT_BROKER_MQTTS_PORT                      | 8883                                                      | MQTT Broker SSL/TLS port.                                                                                                                    |
| MQTT_BROKER_WS_PORT                         | 8083                                                      | MQTT Broker websocket port.                                                                                                                  |
| MQTT_BROKER_WSS_PORT                        | 8084                                                      | MQTT Broker websocket secure port.                                                                                                           |
| MQTT_BROKER_WS_PATH                         | /mqtt                                                     | MQTT Broker websocket path.                                                                                                                  |
| MQTT_EMQX_INTERNAL_MQTT_ENDPOINT            | tcp://$\{MQTT_BROKER_HOST}:1883                           | EMQX MQTT endpoint. Used to bridge MQTT messages with the Beaver-IoT API server. Note: EMQX configuration only takes effect in cluster mode. |
| MQTT_EMQX_INTERNAL_MQTT_USERNAME            |                                                           | EMQX MQTT username. Subscription and publish permissions for all topics are required.                                                        |
| MQTT_EMQX_INTERNAL_MQTT_PASSWORD            |                                                           | EMQX MQTT password.                                                                                                                          |
| MQTT_EMQX_INTERNAL_REST_API_ENDPOINT        | http://$\{MQTT_BROKER_HOST}:18083                         | EMQX REST API endpoint.                                                                                                                      |
| MQTT_EMQX_INTERNAL_REST_API_USERNAME        |                                                           | EMQX REST API key.                                                                                                                           |
| MQTT_EMQX_INTERNAL_REST_API_PASSWORD        |                                                           | EMQX REST API secret key.                                                                                                                    |

### Ports

| Port | Description                                                            |
|------|------------------------------------------------------------------------|
| 80   | Nginx HTTP port for web access and API requests                        |
| 1883 | Built-in MQTT broker port for MQTT connections                         |
| 9200 | API service HTTP port for API requests (bypassing Nginx)               |
| 9201 | API service WebSocket port for WebSocket connections (bypassing Nginx) |

### Files

| Path                           | Description                                        |
|--------------------------------|----------------------------------------------------|
| /web/                          | Directory for web files                            |
| /etc/nginx/nginx.conf          | Main configuration file for Nginx                  |
| /etc/nginx/conf.d/             | Directory for additional Nginx configuration files |
| /etc/nginx/conf.d/default.conf | Default HTTP server configuration file for Nginx   |
| /root/beaver-iot/logs/         | Directory for API service log files                |
| /root/beaver-iot/integrations/ | Directory for Beaver IoT integrations              |
| /root/beaver-iot/h2/           | Directory for H2 database storage                  |
