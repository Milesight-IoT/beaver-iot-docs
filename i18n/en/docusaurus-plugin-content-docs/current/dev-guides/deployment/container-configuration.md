---
sidebar_position: 2
---

# Container Configuration

## beaver-iot-web

### Environment Variables

| Name                                        | Default                                                   | Description                                            |
|---------------------------------------------|-----------------------------------------------------------|--------------------------------------------------------|
| SERVER_HOST                                 | 172.17.0.1                                                | Destination address for Nginx HTTP proxy, i.e., the backend service's IP or FQDN                      |
| SERVER_PORT                                 | 9200                                                      | HTTP port number for the Java service                                      |
| WEBSOCKET_PORT                              | 9201                                                      | WebSocket port number for the Java service                                 |

### Ports

| Port | Description       |
|------|-------------------|
| 80   | HTTP service port for web access |

### Files

| Path                           | Description           |
|--------------------------------|-----------------------|
| /web/                          | Directory for web files                |
| /etc/nginx/nginx.conf          | Main configuration file for Nginx           |
| /etc/nginx/conf.d/             | Directory for additional Nginx configuration files        |
| /etc/nginx/conf.d/default.conf | Default HTTP server configuration file for Nginx |

## beaver-iot-server

### Environment Variables

| Name                                        | Default                                                   | Description                                            |
|---------------------------------------------|-----------------------------------------------------------|--------------------------------------------------------|
| JAVA_OPTS                                   |                                                           | JVM configuration parameters                                               |
| SPRING_OPTS                                 |                                                           | Spring configuration parameters                                            |
| DB_TYPE                                     | h2                                                        | Database type, options: `postgres`, `h2`                           |
| SPRING_H2_CONSOLE_ENABLED                   | false                                                     | Enable H2 console, options: `true`, `false`                             |
| SPRING_H2_CONSOLE_SETTINGS_WEB_ALLOW_OTHERS | false                                                     | Allow access from other hosts, options: `true`, `false`                       |
| SPRING_DATASOURCE_URL                       | jdbc:h2:file:~/beaver-iot/h2/beaver;<br/>AUTO_SERVER=TRUE | JDBC connection for the database                                            |
| SPRING_DATASOURCE_USERNAME                  | sa                                                        | Database username                                                 |
| SPRING_DATASOURCE_PASSWORD                  |                                                           | Database password                                                  |
| SPRING_DATASOURCE_DRIVER_CLASS_NAME         | org.h2.Driver                                             | Database driver class name, options: `org.h2.Driver`, `org.postgresql.Driver` |

### Ports

| Port | Description                    |
|------|--------------------------------|
| 9200 | HTTP service port for API requests            |
| 9201 | WebSocket service port for WebSocket connections |

### Files

| Path                      | Description   |
|---------------------------|---------------|
| /root/beaver-iot/logs/    | Directory for Java service log files |
| /root/beaver-iot/plugins/ | Directory for Java plugins     |
| /root/beaver-iot/h2/      | Directory for H2 database storage    |

## beaver-iot

### Environment Variables

| Name                                        | Default                                                   | Description                                            |
|---------------------------------------------|-----------------------------------------------------------|--------------------------------------------------------|
| SERVER_HOST                                 | 172.17.0.1                                                | Destination address for Nginx HTTP proxy, i.e., the backend service's IP or FQDN                      |
| SERVER_PORT                                 | 9200                                                      | HTTP port number for the Java service                                      |
| WEBSOCKET_PORT                              | 9201                                                      | WebSocket port number for the Java service                                 |
| JAVA_OPTS                                   |                                                           | JVM configuration parameters                                               |
| SPRING_OPTS                                 |                                                           | Spring configuration parameters                                            |
| DB_TYPE                                     | h2                                                        | Database type, options: `postgres`, `h2`                           |
| SPRING_H2_CONSOLE_ENABLED                   | false                                                     | Enable H2 console, options: `true`, `false`                             |
| SPRING_H2_CONSOLE_SETTINGS_WEB_ALLOW_OTHERS | false                                                     | Allow access from other hosts, options: `true`, `false`                       |
| SPRING_DATASOURCE_URL                       | jdbc:h2:file:~/beaver-iot/h2/beaver;<br/>AUTO_SERVER=TRUE | JDBC connection for the database                                            |
| SPRING_DATASOURCE_USERNAME                  | sa                                                        | Database username                                                 |
| SPRING_DATASOURCE_PASSWORD                  |                                                           | Database password                                                  |
| SPRING_DATASOURCE_DRIVER_CLASS_NAME         | org.h2.Driver                                             | Database driver class name, options: `org.h2.Driver`, `org.postgresql.Driver` |

### Ports

| Port | Description                                     |
|------|-------------------------------------------------|
| 80   | Nginx HTTP port for web access and API requests                    |
| 9200 | Java service HTTP port for API requests (bypassing Nginx)            |
| 9201 | Java service WebSocket port for WebSocket connections (bypassing Nginx) |

### Files

| Path                           | Description           |
|--------------------------------|-----------------------|
| /web/                          | Directory for web files                |
| /etc/nginx/nginx.conf          | Main configuration file for Nginx           |
| /etc/nginx/conf.d/             | Directory for additional Nginx configuration files        |
| /etc/nginx/conf.d/default.conf | Default HTTP server configuration file for Nginx |
| /root/beaver-iot/logs/         | Directory for Java service log files         |
| /root/beaver-iot/plugins/      | Directory for Java plugins             |
| /root/beaver-iot/h2/           | Directory for H2 database storage            |
