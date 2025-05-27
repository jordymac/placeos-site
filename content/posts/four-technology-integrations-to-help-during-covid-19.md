---
title: Four technology integrations to help during covid-19
date: 2024-05-20T00:00:00.000Z
categories:
  - AI
  - AV
  - Analytics
  - Automation
  - Employee Experience
  - Event
  - Interface
  - Occupancy
  - Platform
  - Safety
  - Smart Building
  - Systems
  - UX
  - Utilization
  - Workplace
  - Zones
  - blog
summary: >-
  Right now, it’s hard to focus on any workplace user requirement unless we
  address the biggest challenge: COVID-19.
tags: []
author: Jon McFarlane
image: /images/posts/2024/05/contact-tracing-iphonex-ui-ux-copy-copy.jpg
---
**‍**Right now, it’s hard to focus on any workplace user requirement unless we address the biggest challenge: COVID-19. How do we return to work safely? That’s the overarching question. To answer it, we need to focus on UX design principles and scope COVID-19 related features across the entire user journey. For the best results, we want to make sure we collect the right data that can help guide workflow automation. To achieve this, we need to connect everything to the one platform, that way we can observe any building analytics required to keep people safe.1. Smart Building Access: Workflows & Automation

**1\. Smart Building Access: Workflows & Automation**
-----------------------------------------------------

PlaceOS automates a workflow that can cross-reference space occupancy, employee role, and their given reason for working at the office. This can auto-approve based on priorities or go to a manual approval process. The administrator can also change the building/floor capacity at any stage. For example, the current COVID-19 Risk Management Plan might mean that a space is operating at 5% of its maximum capacity, but tomorrow the operating capacity might get dialled up to 20% of the maximum. PlaceOS can respond to these dynamic requests and make the relevant changes to front-end and back-end systems to ensure a consistent User Experience for building occupants, even in times of flux. By comparison, a hard-coded app wouldn’t be able to adapt to these changes quickly, and would require specific development to extend capabilities, which means more time and money. To learn more about platforms and apps, [check this out](https://placeos.squarespace.com/blog/2019/8/21/less-is-more-platforms-vs-apps).

User Interface doesn’t always mean a standalone app - the user interface can be a simple web page and/or Microsoft Teams conversational bot integration. The UI works with the technical integrations to enable workflows for your end users. For example, an employee’s employee access card will only work on the pre-approved level of the building they’re booked to work from on that day. If an employee arrives without being approved, their access card will not work at all. PlaceOS can sense their arrival at the building, while being aware that they don’t have clearance, and then send the employee an SMS or chat message to say, “It looks like you are in the building but haven’t been granted approval for this space today. Please request approval with this link.” This is what we call smart building automation, which enables great experiences for users within workplaces.

Available PlaceOS Integrations:

*   Microsoft Office 365 (to trigger email workflows)
*   SSO and Active Directory (to authenticate and reference user’s role/group)
*   SMS gateway (to send SMS alerts)
*   Building Access Control System (to add or remove building/floor access)
*   Slack, Microsoft Teams, Cisco WebEx Teams, Google Chat (to send alerts via a conversational bot)
*   Web Interface (to request access to a space, and answer COVID-19 screening questions prior to arrival)

**2\. People counting without sensors**
---------------------------------------

![workplace zone occupancy map](/images/posts/2024/05/people-counting-space-utilization.jpg)

Sensors have a time and a place. Our aim with any workplace experience is to do what we can without having to introduce new technology and hardware. If we move away from apps and focus on platforms, we can enable integrations rather than introduce unnecessary hardware or double handling.

There are several other technologies we can leverage to count people at desks, zones, and in rooms. With this count, we can apply logic in the back-end to send automatic events and notifications. If too many people are in a room, we can look up a larger available space and book a larger room for the group to move to. If too many people are in a zone, or are sitting too close at a shared desk, we can send a quick message to the employees via Slack (or similar).

We've got plenty more to say on [workplace sensors](https://placeos.squarespace.com/blog2019/10/29/why-sensors-in-your-workplace-suck-but-if-you-cant-avoid-them-heres-what-to-look-out-for).

Relevant PlaceOS Smart Building Integrations:

*   Cisco Meraki Smart Camera (counts people in zones)
*   Axis Camera (count people in zones)
*   Cisco Meraki WiFi (count people based on their devices in WiFi zones)
*   WebEx Camera (count people in rooms via the video conference system)
*   WebEx Assistant (alert people in rooms they are too close or to relocate)
*   Huddly Camera (count people in rooms using web camera)
*   Slack, WebEx Teams, MS Teams, etc- notify employees to relocate

**3\. People tracking for internal contact tracing**
----------------------------------------------------

![contact tracing app](/images/posts/2024/05/contact-tracing-ui-ux-anonymous-users.jpg)

The major difference between people counting and people locating is the context that is unlocked through profile information. Instead of just counting people, we know exactly where each employee is, or has been within the space. This allows PlaceOS to provide internal contact tracing. If someone reports as unwell, HR Departments can access information regarding close-proximity interactions and/or trigger automatic workflows around this.

Relevant PlaceOS Smart Building Integrations:

*   Cisco Meraki (locate employee via their device)
*   Windows Domain Controllers (to cross-reference device with profile)
*   SSO/Active Directory (for user profile info)
*   Microsoft Office 365 (for auto email workflow)

**4\. Auto trigger UV-C light after every meeting to clean the room**
---------------------------------------------------------------------

![safety notification for cleaning process on tablet](/images/posts/2024/05/cleaning-confirmation-touch-10.jpg)

Hopefully, you are picking up on the theme here; workflow automation is the key to managing your workplace. We have the capability for a logic profile that automates the processes around room cleaning. For example, in conjunction with the people-count integration, we can confirm no one is in the room, then trigger a message to send someone via remote access and then in person for verification, and have the in-room assistant countdown as a final warning to vacate the space. Finally, we will trigger the UV-C lighting control to sanitize the surfaces of the room.

As an alternative, keep it simple and trigger cleaning alerts based on the people-counting activity. These variables and factors are settings that managers can adjust, improve, or remove.

Relevant PlaceOS Integrations:

*   Lighting Systems
*   People-Count (monitor occupancy and utilisation)
*   Cisco WebEx Assistant (voice alerts in the room)
*   Cleaning Interface

These are just a few features PlaceOS are rolling out for our clients right now. Every workplace culture is different, and COVID-19 requirements vary between cities and countries. Therefore, a one-size-fits-all approach won’t work. An adaptive approach to user experience design and smart building solutions is the only way forward to ensure everyone can get back to work safely. I’m always open to hearing your ideas on workplace technology - to discuss how we can design a workflow to improve employee experiences within your space, please get in touch.

‍
