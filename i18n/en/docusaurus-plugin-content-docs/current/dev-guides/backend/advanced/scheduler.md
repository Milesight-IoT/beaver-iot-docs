---
sidebar_position: 6
toc_min_heading_level: 2
toc_max_heading_level: 3
---

import { ProjectName } from '/src/consts';

# Scheduler
## Overview
The Beaver IoT platform provides a built-in task scheduler, which supports multi-tenancy and cluster mode. You can quickly implement scheduled tasks in Spring Beans using the `@IntegrationScheduled` annotation.

## Configuration in Code
Similar to Spring Boot's `@Scheduled` annotation, the `@IntegrationScheduled` annotation allows you to directly configure scheduled task rules on methods that need to be executed periodically.
Note that the `name` field must be set and must be globally unique.

:::info  
Scheduled tasks configured this way do not have tenant context.  
:::

### Fixed Rate Execution
You can use the `fixedRate` and `timeUnit` fields of the `@IntegrationScheduled` annotation to set a fixed rate for executing a method.

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

### Cron Expression
The `cron` field of the `@IntegrationScheduled` annotation supports Spring cron syntax. And you can set the timezone for the cron expression using the `timeZone` field, which must be a standard TZID (e.g., `Asia/Shanghai`).

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

## Configuration Based on Entity Values
In some cases, the rule need to be dynamically determined based on user-configured entity values.  
The `@IntegrationScheduled` annotation provides some fields ending with `Entity`, which are used to specify the entity key for the configuration, indicating that the value will be retrieved from the entity and its changes will be subscribed to.  
Note that if any configuration in `@IntegrationScheduled` subscribes to an entity value, a separate scheduled task will be generated for each tenant to execute based on their respective entity values.

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
