---
title: Processing on the 'Edge'
date: 2024-07-02T00:00:00.000Z
categories:
  - AV
  - Analytics
  - Configuration
  - Drivers
  - Event
  - Modules
  - Product
  - product-update
summary: >-
  Explore how edge processing transforms data handling and performance. See why
  processing on the edge is crucial for real-time analytics and faster
  decision-maki
tags: []
author: Jeremy West
image: /images/posts/2024/07/processing-on-the-edge.jpg
---
PlaceOS Edge Connect is a service for enabling device drivers to run on Cisco Edge devices in a similar manner to how drivers run on Core.

This allows drivers to exist on protected networks with the only egress going to a trusted PlaceOS instance. Where no incoming connections are desirable.

The service enables:

*   Creation of multiple edges, each of which might represent a building or protected network segment
*   This generates secrets that can be provided to edge core instances for authorizing connections to the edge connect service
*   Assignment of modules to an edge
*   Incoming connections from core
*   Consistent hashing to distribute modules across cores assigned to a specific edge
*   Core to proxy redis state up to the cloud
*   Forward execute requests to the appropriate edge core and returns the result
*   Forward updates to settings to modules on an edge
*   Drivers transparently run on an edge - i.e. configuration determines if they connect to redis or proxy data via the core

### Integrations

Cisco Edge Runners

### Use Case

Edge Connect allows PlaceOS to run in a distributed mode where nodes are deployed to Cisco Edge Runners. An example of this might be each building with its own Edge Switch would have a PlaceOS Node deployed to every one of those switches.

This then prevents potential downtime in a case like a network trunk being lost between buildings, each building could operate independently without the master node. Once the connection is re-established it will update the master PlaceOS Node, which is deployed to a server.

This provides a broad redundancy scheme for geographically dispersed facilities and it also reduces the load on the master node as all local processing can be done on the Edge.

###   

‍
