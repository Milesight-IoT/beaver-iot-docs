---
sidebar_position: 5
toc_min_heading_level: 2
toc_max_heading_level: 3
---

import { ProjectName } from '/src/consts';

# MQTT
## Overview
Beaver IoT integrates an MQTT Broker, allowing to subscribe to and publish messages via the MQTT protocol.

## Subscribing to Messages

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
In this example, messages under the topic beaver-iot/+/uplink/# are subscribed to.
Here, setting `shared` to `true` means a message will only be processed by a single node in the cluster.

## Publishing Messages

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
In this example, the message is published to the topic `beaver-iot/mqtt@${tenantId}/downlink/test`, where `${tenantId}` represents the tenant ID from the current context.
