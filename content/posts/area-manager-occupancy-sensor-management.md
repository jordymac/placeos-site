---
title: 'Area Manager: Occupancy & Sensor Management'
date: 2024-07-02T00:00:00.000Z
categories:
  - AI
  - Analytics
  - Occupancy
  - Smart Building
  - UX
  - Utilization
  - Workplace
  - Zones
post_types:
  - product-update
summary: >-
  Discover how Area Manager optimizes occupancy sensor management for efficient
  space utilization. Enhance your workplace with advanced occupancy tracking.
tags: []
author: Jeremy West
image: /images/posts/2024/07/area-manager.jpg
---
The Area Manager
----------------

There’s no shortage of sensor products on the market. All capturing and communicating different types of data in different ways. This makes it difficult to combine those data points for reporting or to trigger actions. That’s why we’ve added the Area Manager to PlaceOS. The Area Manager connects these disparate data points to provide an accurate reflection of the real-world.

![PlaceOS area manager for smart building app](/images/posts/2024/07/sensors-area-manager-fx.png)

How It Works
------------

Area Manager allows administrators of PlaceOS to connect their sensors across their physical environment and plot them onto floor plans by dropping pins. The next step is to add zones which highlight and aggregate the sensors located within. This information can be displayed on the front-end for users to easily digest and make decisions on, like finding a quiet area to work.

All this information is collected in real-time and is piped into a time-series database, InfluxDB, so administrators can generate reports and gain insights into their spaces.

![highlighting areas on a workplace map](/images/posts/2024/07/zones-area-manager-fx.png)

![placeos occupancy analytics dashboard](/images/posts/2024/07/ipad-pro-horizontal_space-utilization-analytics.png)
