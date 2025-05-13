---
sidebar_position: 6
toc_min_heading_level: 2
toc_max_heading_level: 3
---

import { ProjectName } from '/src/consts';

# 定时器
## 概述
Beaver IoT 平台提供了定时任务功能，集成可以在Spring Bean中通过`@IntegrationScheduled`注解来快速实现定时任务, 并且不用关心定时任务在集群中的调度问题。

## 在代码中配置
类似于Spring Boot的`@Scheduled`注解, `@IntegrationScheduled`注解允许开发者在需要定期执行的方法上直接配置定时任务规则。需要注意的是, name字段必须被设置, 且全局唯一。

:::info
通过这种方式配置的定时任务, 没有租户上下文
:::

### 固定频率执行
通过`@IntegrationScheduled`注解的`fixedRate`和`timeUnit`字段来设置固定频率执行某个方法。

```java
@Component
public class ScheduledTasks {

    private static final Logger log = LoggerFactory.getLogger(ScheduledTasks.class);

    private static final SimpleDateFormat dateFormat = new SimpleDateFormat("HH:mm:ss");

    @IntegrationScheduled(
            name = "scheduled_tasks.report_current_time",
            enabled = true,
            fixedRate = 5,
            timeUnit = TimeUnit.SECONDS
    )
    public void reportCurrentTime() {
        log.info("The time is now {}", dateFormat.format(new Date()));
    }
}
```

### Cron表达式
`@IntegrationScheduled`注解的`cron`字段支持设置Spring的Cron表达式格式。另外，可以通过timeZone字段设置Cron表达式的时区，时区必须是标准的TZID，例如：`Asia/Shanghai`。

```java
@Component
public class ScheduledTasks {

    private static final Logger log = LoggerFactory.getLogger(ScheduledTasks.class);

    private static final SimpleDateFormat dateFormat = new SimpleDateFormat("HH:mm:ss");

    @IntegrationScheduled(
            name = "scheduled_tasks.report_current_time",
            enabled = true,
            cron = "0 * * * * *",
            timeZone = "UTC"
    )
    public void reportCurrentTime() {
        log.info("The time is now {}", dateFormat.format(new Date()));
    }
}
```

## 根据实体值进行配置
在某些场景下，定时任务的规则需要根据用户设置的实体值来动态决定。
`@IntegrationScheduled`注解对除`name`以外的配置项, 都提供了对应的以`Entity`为结尾的字段, 用于填写该配置项对应的实体的Key，表示定时任务规则中的该项配置将取自对应的实体值，并订阅其变化。
需要注意的是, 当`@IntegrationScheduled`注解的任意一个配置项订阅了实体值时, 会为每个租户都生成一个单独的定时任务，以根据各租户设置的实体值分别执行。

```java
@Component
public class ScheduledTasks {

    private static final Logger log = LoggerFactory.getLogger(ScheduledTasks.class);

    private static final SimpleDateFormat dateFormat = new SimpleDateFormat("HH:mm:ss");

    @IntegrationScheduled(
            name = "scheduled_tasks.report_current_time",
            enabledEntity = "xxx.enabled_entity_key",
            cronEntity = "xxx.cron_entity_key",
            timeZoneEntity = "xxx.timezone_entity_key"
    )
    public void reportCurrentTime() {
        log.info("The time is now {}", dateFormat.format(new Date()));
    }
}
```
