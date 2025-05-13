---
sidebar_position: 5
toc_min_heading_level: 2
toc_max_heading_level: 3
---

import { ProjectName } from '/src/consts';

# MQTT
## 概述
Beaver IoT 集成了MQTT Broker，允许开发者通过MQTT协议来订阅和发布消息。

## 订阅消息

```java
@Component
public class MqttSubscription {
    
    @Autowired
    private MqttPubSubServiceProvider mqttPubSubServiceProvider;
    
    @PostConstruct
    public void init() {
        String topicSubPath = "uplink/#";
        boolean shared = true;
        mqttPubSubServiceProvider.subscribe(topicSubPath, this::onMessage, shared);
    }
    
    public void onMessage(MqttMessage message) {
        log.info("Received message: {}", message);
    }
}
```
示例中订阅了`beaver-iot/+/uplink/#`主题的消息。此处`shared`为`true`表示一条消息只会被集群中的一个节点处理。


## 发布消息

```java
@Component
public class MqttPublish {
    
    @Autowired
    private MqttPubSubServiceProvider mqttPubSubServiceProvider;
    
    public void testPublish() {
        String topicSubPath = "downlink/test";
        byte[] message = "test message".getBytes(StandardCharsets.UTF_8);
        MqttQos qos = MqttQos.AT_MOST_ONCE;
        boolean retained = false;
        mqttPubSubServiceProvider.publish(topicSubPath, message, qos, retained);
    }
}
```
示例中，消息被发布到`beaver-iot/mqtt@${tenantId}/downlink/test`主题。其中`${tenantId}`表示当前上下文中的租户ID。

