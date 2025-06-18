---
title: PlaceOS
description: >-
  PlaceOS is an open-source integration platform for building operations – used by IT, facilities, and space planning teams to connect systems and data across hundreds of buildings and thousands of spaces, without replacing existing deployments.
list_items:
  - title: >-
      Start here
    summary: >-
      This is a practical guide to PlaceOS. 
      We’ve laid everything out so you can understand what PlaceOS actually is, how it works and why it matters. 
      We structured it this way to cut through the usual product noise and give you a clear picture of the architecture, capabilities and workflows before you ever book a demo. 
      Whether you’re managing a single room or hundreds of buildings, we want this to be the fastest path to figuring out if PlaceOS fits your world.
  - title: The problems teams are solving with PlaceOS
    summary: >-
      Hundreds of offices and campuses around the world use PlaceOS for occupancy management, workplace experience, room management, utilization reporting, hot-desks, visitor management, building automation, campus experience and energy savings. If your goal is to connect systems, create smarter workflows and deliver real-world outcomes ~ without rolling out new hardware ~ PlaceOS is the platform to do it.
  - title: >-
      The types of teams solving those problems
    summary: >-
      IT, space planning, experience leads, facilities, AV and IoT teams. Basically, anyone managing complexity across spaces, systems and software. We help connect the dots and make it all work together.
  - title: What makes PlaceOS a platform
    summary: >- 
      At its core, PlaceOS is built to connect. Most building systems are siloed. HVAC, AV, calendars, access control and sensors all speak different languages. PlaceOS creates an abstraction layer across them, turning those scattered systems into usable building blocks. Once connected, they can serve as inputs and outputs in any workflow—like presence detection triggering HVAC changes, or badge swipes posting into chat. That’s what makes it a platform: not just a tool, but an integration layer that drives outcomes.
  - title: We won't sell you new hardware, because you probably don't need it
    summary: >-
      You'd be surprised by what data you can extract from existing systems. For example, most people go straight to new sensor rollouts when thinking about occupancy but your Wi-Fi network may already hold most of what you need. That’s why we recommend auditing what you’ve got first. More often than not, you don’t need new sensors. You need the siloed systems to talk to each other.
  - title: Which is why we take the platform approach
    summary: >-
      It’s a philosophy: open, agnostic, and designed for extensibility. Like WordPress or Salesforce, you can build solutions on top, plug in components, or use something off the shelf. But unlike single-use tools, PlaceOS gives you a foundation to connect systems, build logic and automate workflows. You get to shape the experience without rebuilding it every time the interface or you hardware changes.~
  - title: Our architecture creates an abstraction layer
    summary: >-
      PlaceOS creates an abstraction layer extracting away the complexities of all the unique building systems and software. 
      This separates the integrations and logic so you can
      swap technology in and out without breaking anything. Drivers handle the
      connection, modules group them and logic stays untouched. That’s what
      makes it scalable and future-ready.
  - title: The drivers doing the abstraction
    summary: >-
      Every integration starts here. Drivers connect
      PlaceOS to your systems like access control, AV, HVAC, sensors, network and
      calendars. This is where we connect and abstract. 


      There are two types of drivers, integration & logic. 


      Integration drivers: 


      - Communicate with external systems and lets them talk to PlaceOS. 

      - Represent hardware or software platforms (i.e. device or service).

      - Control any functionality of the external systems and handle any incoming data.


      Logic drivers:


      - Coordinate interactions between modules

      - Don't map to specific physical objects

      - Represent abstract or conceptual functions

      - May use a variety of devices or software platforms

      
      They’re also open source so you can build your own or use what’s already in
      the library. See our integration list [here](https://docs.placeos.com/reference/supported-integrations).
  - title: Hot-swappable modules
    summary: >-
      Modules are reusable building blocks, each one is a live instance of a driver. It could represent a device, a digital service, or a set of logic. Modules control both state (like power status or user presence) and behavior (like powering on a display or creating a booking).

      Each can be started or stopped individually, and reused across systems. That means shared infrastructure, like a lighting gateway or AV switch, doesn’t need to be rebuilt for every room. Logic modules are special: they don’t talk to external systems, they coordinate internal actions and inherit settings from zones and systems for consistent behavior.
  - title: Scaling with zones & systems
    summary: >-
      Systems are the building blocks that tie together devices, services, and logic. Each system groups modules, settings and metadata, typically representing a physical space like a room, or a logical function like digital signage. Zones are collections of systems that share characteristics, like being part of the same floor, building, or function.

      Zones help you apply shared settings across groups, while systems manage the localized logic and integrations. You can apply broad logic at the zone level (like building-wide HVAC behavior) and tailor specifics within each system. This structure lets you scale from one room to hundreds consistently, and without rewriting everything.
  - title: Workflow automation with triggers & logic drivers
    summary: >-
      Triggers add dynamic, event-driven behavior across modules without writing complex logic. They define actions that occur based on conditions like system state, time, or external input (like a webhook).

      Triggers let modules react to each other. For example, turning on AV when a room is booked, or posting a chat message when someone badges in. You can create and manage them directly in the PlaceOS Backoffice to customize real-time system behavior or use them to complement more advanced workflows powered by logic modules.
  - title: Decoupling frontend interface & experience from integrations & logic
    summary: >-
      The frontend doesn't drive the experience, the logic does. Whether you're using an AV panel, a workplace app, an AI agent or no interface at all, PlaceOS runs the workflows in the background. It supports varied systems across locations, while maintaining consistent behavior. The interface layer is flexible, so you can switch it out without redoing the logic underneath.
  - title: Examples of automation that actually deliver outcomes
    summary: >
      - Automate HVAC based on real-time occupancy and room bookings — save ~$1K
      per room per year


      - Swipe your badge and trigger camera footage to log the moment — find
      what you need, instantly


      - Auto-configure a room based on who booked it — lighting, presets, even
      signage


      - Use WorkMate for out-of-the-box workplace management — bookings,
      presence, mobile-first UX


      - Use Stagehand to simplify AV control for any room — touch panel, web,
      voice, or automated


      - Use VirtualCare to manage remote check-ins and hybrid support in
      healthcare or campuses


      Everything you do can become a trigger. Every system can be part of a
      workflow.
  - title: Why other tools don't cut it
    summary: |
      - Custom middleware: Slow, brittle, expensive to maintain

      - Vendor-locked apps: Can’t extend or integrate

      - Dashboards only: Good for viewing, not doing

      - Doing nothing: Keeps everything disconnected

      - SaaS-only tools: Hardcoded logic, no flexibility
  - title: Why PlaceOS is different
    summary: >
      The structural choices that set us apart and why they matter.


      - Composable architecture: Swap parts without breaking workflows


      - Open source drivers: No vendor lock-in, fast integration


      - Separation of logic/interface: Survives tech churn


      - UI-agnostic: Works with LLMs, CV, APIs or no UI at all


      - Platform-based business model: SaaS, usage-based, or license-ready


      - AI-agent ready: Agents can control any system via drivers


      All of this means you can build, scale and adapt without ever being
      boxed in.
  - title: You can start anywhere, as small as you like
    summary: >-
      Start small. Prove value. Scale fast. 
      
      You don’t need a huge rollout. Start
      with one workflow, like automating HVAC or linking AV to your calendar —
      and grow from there. Proof in week one, not year two. Sometimes scaling a
      small change can have a massive impact. See our energy savings on campus —
      ~$1K per room per year. We’re not asking for a forklift upgrade. Start
      with what you’ve got. We’ll make it work harder.
  - title: Apps suck (but yeah, we’ve got some)
    summary: >
      We’ve built apps like WorkMate that are ready to go. An app solves the obvious stuff, bundling up common problems in one place. Tapping into your phone’s native tech like Bluetooth, NFC, and Ultra-Wideband for access and location.

      But that’s just the surface. We go beyond with deep integrations, smart workflows, and modular interfaces.

      Our apps sit on top of the platform architecture so receive all the same benefits of hot-swappable modules and logic. When the next interface drops, glasses, wearables, or whatever OpenAI’s cooking, we’ll be there. Because we’ve decoupled the front-end from the brains, making the experience future-proof, flexible and device-agnostic.

      Here are our apps:

      **WorkMate**: The first workplace management system to combine
      out-of-the-box simplicity with enterprise-level configuration &
      scalability.


      **StageHand**: Remote AV control that works without third-party
      controllers.


      **VirtualCare**: Gives clinicians, carers, and patients one system to
      manage consults, surveys, referrals, Medicare billing, education, and
      follow-ups — no plugins or patchwork tools.


      **Room booking** (Free): Search, view, and book rooms based on
      availability, size, features, and location.


      **Room booking** (Basic): Works with every calendar tool, conferencing
      system, occupancy sensor, AV equipment and network.


      **Desk booking**: Configurable desk booking management at scale — no
      hardware lock-in.


      **Visitor management**: So simple, the only thing you do is send the
      invite — it does everything else.


      **Occupancy-based energy**: Align energy use in spaces with actual
      occupancy to reduce HVAC & lighting use.
  - title: We’ve got an experienced tech team who can build our own stuff
    summary: >-
      We’d love that. Honestly, it’s a better move than getting locked into some rigid, hard-coded app. But we think we can give you the best of both worlds: a head start that lets you focus on your unique challenges without getting buried in device-level protocol hell.

      Our integration drivers don’t just connect you to hundreds of vendors, we also support the protocols that make smart buildings actually smart: BACnet, Modbus, KNX, and more. We handle the heavy lifting, device integrations, zone management, system coordination, so you can get straight to building.

      Now your scoping exercise changes: What do you want to build, knowing you can connect everything you need?

      Take it from there. Extend with new drivers. Contribute to our open source libraries. Talk to us about using a non-commercial version for that side project you’ve been meaning to automate.
      
      We’re built for developers. Everything you need is available on [GitHub](https://github.com/PlaceOS) & our [Docs](https://docs.placeos.com/)
  - title: Built on Crystal for speed, safety and scale
    summary: >-
      PlaceOS is developed almost entirely in [Crystal](https://crystal-lang.org/), a modern programming language that blends the elegance of Ruby with the performance of C. We chose Crystal because it lets us move fast without compromising reliability. It gives our team the confidence of a typed language, the flexibility to build reusable services, and the performance to scale from a single room to enterprise-wide deployments.

      Our backend stack is fully Crystal—from open source drivers to our web framework [Spider-Gazelle](https://github.com/spider-gazelle). This lets us generate accurate API documentation automatically, run efficiently on minimal infrastructure, and support lightweight edge deployments that work even in bandwidth-constrained environments.

      It’s one of the reasons PlaceOS feels fast, stable and consistent—whether it’s running in the cloud, on-prem, or directly on a network switch.
  - title: Pricing models that suit your business
    summary: >-
      SaaS, usage-based, or perpetual, we support it all. We don’t care how you
      buy, just that it fits. We’ve seen every procurement process under the
      sun. We’ll work with yours.
  - title: Flexible delivery – cloud, on-prem & hybrid
    summary: >-
      It's your call, run PlaceOS wherever it makes sense. If you've got high
      security standards, everything can run on-prem ensuring your data remains
      protected. We don't store anything.
  - title: Plugs into what you've already got
    summary: >-
      This replaces nothing, unless you want it to. PlaceOS doesn’t require you
      to rip and replace. It plugs into what you’ve already got.
  - title: Future proof by design
    summary: >-
      Built for what’s next, not just what’s now. PlaceOS isn’t tied to any one
      interface, vendor, or trend. As technology rapidly shifts (LLMs, AI agents, new
      protocols) we’re already wired for it. We didn’t build PlaceOS to be
      finished. We built it to keep going.
---
