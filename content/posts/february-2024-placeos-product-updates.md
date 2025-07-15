---
title: February 2024 PlaceOS Product Updates
date: 2024-06-25T00:00:00.000Z
categories:
  - Configuration
  - Desk Booking
  - Interface
  - Zones
post_types:
  - product-update
summary: Added Secure S3 Uploads, enhanced MapBox and MapsPeople integration, and new Work Locations feature, Improved visitor booking
tags:
author: Jeremy West
image: /images/posts/2024/06/feb-2024-placeos-update-main.webp
---
*   Secure S3 Uploads/Private Buckets now supported for file upload and fetch on all modals including sensors interface.
*   S3 secret no longer returned in Storage Config.
*   Added display to show cancelled desk bookings in Concierge.
*   Improved MapBox integration ability to locate building by setting GPS Coordinates of building on the Building Zone, else will default to users current location.
*   MapsPeople integration now supported in all modals on all interfaces, noting modified configuration required:

    "maps_people": {
            "keys": {
                "mapbox": "pk.xxxxxx.xxxxxxxx",
                "mapsindoors": "xxxxxxxxxx"
            },
            "use_zones": [
                "*"
            ]
        },

*   Customise visitor checkin kiosk post-checkin messaging.
*   Added Work Locations feature allowing employees to set intended working locations:

*   [PP-39: Work From Home Status Management](https://acaprojects.atlassian.net/browse/PP-39)
*   Added Work Location auto-release booked assets:

*   [PP-40: Allocated Desk/Car Park & Release Function](https://acaprojects.atlassian.net/browse/PP-40)
*   Improved support for visitor bookings without a room where catering and/or assets are required including updated documentation for configuration: [https://docs.placeos.com/tutorials/common-configurations/visitor-bookings-without-room](https://docs.placeos.com/tutorials/common-configurations/visitor-bookings-without-room)

‍
