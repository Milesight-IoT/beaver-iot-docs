---
sidebar_position: 2
---

import { ProjectName } from '/src/consts';

# Key Concepts

This topic describes the key concepts that you need to understand about {ProjectName}.

## Concept Relationships

![Concept](/img/en/concept.png)



## Integration
**Integration** is the main solution for {ProjectName} to interact with third-party services, devices or platforms and achieve device connectivity, device control and some functionality expansions, for example: 

* Integrate with weather forecast website to get the weather information of corresponding locations.   

* Get and update device list from third-party platforms via API or Webhook and sync to database of {ProjectName}.

* Provide request URL to ask for third-party services.

  

## Device
**Device** refers to a physical device or logical device which is defined and created by Integration.

* Every device only belongs to one Integration.
* An integration is able to define whether can add or deletes devices manually. If supported, users can go to Device page to add or delete devices.



## Entity

**Entity** refers to an object to describe the attributes and characteristics of things in the real world, to which is the basic data carrier of {ProjectName}. Every entity should be pre-defined and in fact, the function of integration and device is defined by their entities.

* Every entity only belongs to one **Integration** or one **Device**.
* The entity includes current values and historical values.
* An entity supports to exist separately or has multiple sub-entities. But it only has two-level relationship.
* There are three entity types:

<table>
  <tr>
    <th rowspan="2">Type</th>
    <th rowspan="2">Description</th>
    <th colspan="2">Current Value</th>
    <th colspan="2">Historical Value</th>
    <th rowspan="2">Example</th>
  </tr>
  <tr rowspan="2">
    <th>Read</th>
    <th>Write</th>
    <th>Enquiry</th>
    <th>Add</th>
  </tr>
  <tr>
    <td>Property</td>
    <td>The **status** or **information** of a device or an integration.</td>
    <td>✅</td>
    <td>✅</td>
    <td>✅</td>
    <td>✅</td>
    <td>Temperature, Humidity, IP address, Key</td>
  </tr>
  <tr>
    <td>Event</td>
    <td>The notification that requires action or attention.</td>
    <td>❌</td>
    <td>❌</td>
    <td>✅</td>
    <td>✅</td>
    <td>
        Button triggers, Temperature alerts
    </td>
  </tr>
  <tr>
    <td>Service</td>
    <td>A **capability** or **method** of a deivce or an integration which can be invoked.</td>
    <td>❌</td>
    <td>❌</td>
    <td>✅</td>
    <td>✅</td>
    <td>Reboot, Open/close value, Connection validation</td>
  </tr>
</table>


