---
title: How to capture occupancy data in the workplace
date: 2024-07-02T00:00:00.000Z
categories:
  - AI
  - AV
  - Interface
  - Occupancy
  - Utilization
  - Workplace
  - blog
summary: >-
  Learn how to capture occupancy data in commercial buildings using real-time
  location services. Optimize space utilization and enhance workplace
  efficiency.
tags: []
author: Jon McFarlane
image: /images/posts/2024/07/ep-40_auditing_16x9.png
---
One of the most important pieces of data that is the bedrock for any legitimate workplace solution is user location. It provides the context for you to create user journeys that benefit your employees when they need it most. If you don’t know where they are, the solution won’t be much help.

{{< wistia id="uyz0odf9dz" >}}

What Sources Can We Use?
------------------------

There are numerous ways to capture user location or occupancy data in the workplace. Here’s a list of the most common methods.

### 01\. User Input

This might include scenarios where a user has booked a room, desk, or space. This provides location data but it’s not in real-time and can’t verify user location alone. A simple way to resolve that is user check-in/check-out, like a QR Code. There are some limitations with this method but can still be an important component.

### 02\. Sensors

Think motion sensors, desk sensors, BLE’s, etc. Typically, this method is quite costly and depending on the type of sensor, can have medium real-time visibility. 

### 03\. Cameras

Cameras are one of the most accurate devices used for people counting but are also one of the most expensive.

### 04\. Network

This could be something as simple as an HDMI connection to a monitor or an ethernet connection. We would know when someone has plugged in their laptop at their desk but would need to cross-reference other sources as to whether or not they’re there the entire time they’re connected. 

### 05\. Wifi

This method allows for both who and where; users can be identified by their device connection and their location be triangulated using the nearest modems. 

### 06\. Lighting

A lot of lighting installations come with motion sensors, although they can only tell whether or not there’s movement in the space, they can’t tell how many people are there. But, it can be a good cross-reference point, think about someone turning up to a meeting, we could make approximations based on the meeting room data and the lighting sensor being triggered.

![workplace occupancy changing threshold from low to medium](/images/posts/2024/07/prague-people-location-map-interface.gif)

Here you can see a device log off the network, this is then reflected as a shift from yellow to green on the map interface.

### What Do We Have That’s Already Receiving This Data?

This part is critical but often goes neglected. Now that you know what’s possible, take stock of what’s installed and put together use cases where you would want to know user location and occupancy levels. 

### Putting it all together

This is all dependent on context, the why, so I’ll be using one use case as an example. Let's say you want to know definitively if someone is at their desk in real-time for [Desk Availability](/app/desk-booking-app). You could use a combination of two data sources and cross-reference them against one another to confirm they’re using the desk.

The User Input data are generated from the booking and Wifi data once they’ve connected with a device. It’s safe to assume their phone will be connected and if they’re on the same floor as the desk, it’s most likely they’re using the desk, and if not, it doesn’t matter because they’ll most likely be back shortly. 

The reason this method is preferred is that you don’t need to invest in any new hardware, you’re using already existing infrastructure in a more efficient manner as opposed to purchasing something like Desk Sensors. 

‍
