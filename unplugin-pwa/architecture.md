---
title: Architecture | Unplugin PWA
next: true
prev: true
aside: false
---

# The Architecture Diagram

```mermaid
flowchart LR
%% External Consumers
    Nuxt("<div style='padding: 10px 15px;'>Framework<br>(e.g., Nuxt)</div>")
    Vanilla("<div style='padding: 10px 15px;'>Vanilla Vite</div>")
    App("<div style='padding: 10px 15px;'>User App Code</div>")

    subgraph Monorepo ["PWA Ecosystem (unplugin-pwa)"]
        direction TB

        subgraph Builders ["Adapters / Builders"]
            direction TB
            Vite["<div style='padding: 10px'>📦 @unplugin-pwa/vite</div>"]
            Webpack["<div style='padding: 10px'>📦 @unplugin-pwa/webpack</div>"]
            Rspack["<div style='padding: 10px'>📦 @unplugin-pwa/rspack</div>"]
        end

        Core["<div style='padding: 10px'>📦 @unplugin-pwa/core<br>(Context, Configuration, Helpers)</div>"]
        WB["<div style='padding: 10px'>📦 @vite-pwa/workbox-build<br>(SW Generation, lazy-loaded)</div>"]

        subgraph Extras ["Optional"]
            Client["<div style='padding: 10px'>📦 @unplugin-pwa/client<br>(React, Vue, Svelte types...)</div>"]
        end

    %% Internal Relations
        Builders -. "Injects Context" .-> Core
        Core == "Dynamic Import" === WB
    end

%% External Connections
    Nuxt ==>|1. Resolves config| Core
    Nuxt ==>|2. Consumes plugin| Vite
    Vanilla ==>|Consumes| Vite
    Client -. "Imported by" .-> App

%% Styles
    classDef core fill:#fbca04,stroke:#333,stroke-width:2px,color:black;
    classDef builder fill:#2ea043,stroke:#333,stroke-width:2px,color:white;
    classDef framework fill:#388bfd,stroke:#333,stroke-width:2px,color:white;

    class Core core;
    class Vite,Webpack,Rspack builder;
    class Nuxt,Vanilla framework;
```

## Vanilla Vite Lifecycle Diagram (Execution Flow)

```mermaid
sequenceDiagram
    autonumber
    actor Dev as User
    participant Config as vite.config.ts
    participant Builder as 📦 @unplugin-pwa/vite
    participant Core as 📦 @unplugin-pwa/core
    participant Vite as Vite
    participant WB as 📦 @vite-pwa/workbox-build

    Note over Dev, Core: Phase 1: Configuration & Facade Initialization
    Dev->>Config: Imports and configures VitePWA(options)
    Config->>Builder: Calls VitePWA(options)
    activate Builder
    Builder->>Core: preparePWAContext(options) (Internal call)
    activate Core
    Core-->>Builder: Returns empty/base `ctx`
    deactivate Core
    Builder-->>Config: Returns Array of modular Plugins
    deactivate Builder
    Config->>Vite: Registers plugins in Vite

    Note over Builder, Vite: Phase 2: Context Enrichment
    Vite->>Builder: Hook: configResolved
    activate Builder
    Builder->>Builder: Extracts Vite's base, build outDir, etc.
    Builder->>Core: Injects resolved Vite config into `ctx`
    deactivate Builder

    Note over Vite, WB: Phase 3: Build / Dev Execution
    Vite->>Builder: Hook: closeBundle / buildEnd
    activate Builder
    Builder->>Core: ctx.runBuild()
    activate Core
    Core->>WB: dynamic import (generateSW / buildSW)
    activate WB
    WB-->>Core: Generates Service Worker and Assets
    deactivate WB
    Core-->>Builder: Build complete
    deactivate Core
    Builder-->>Vite: Hook finished
    deactivate Builder
```

## Nuxt + Vite Lifecycle Diagram (Execution Flow)

> [!TIP]
> **On Lifecycle Execution:**
> While the sequence diagram represents a chronological flow, it is important to understand that the architecture is highly **event-driven**. During Phase 1, the Nuxt Module (`@vite-pwa/nuxt`) only resolves the initial context and synchronously registers the lifecycle hooks. The execution is not blocking or strictly sequential thereafter. Phases 2, 3, and 4 are executed asynchronously in complete isolation whenever the underlying Nuxt and Nitro reach those specific milestones in their internal build processes.

```mermaid
sequenceDiagram
    autonumber
    participant Setup as 📦 @vite-pwa/nuxt
    participant Core as 📦 @unplugin-pwa/core
    participant Builder as 📦 @unplugin-pwa/vite
    participant Nuxt as Nuxt
    participant Nitro as Nitro
    participant Vite as Vite<br>(@nuxt/vite-builder)
    participant WB as 📦 @vite-pwa/workbox-build

    Note over Setup, Builder: Phase 1: Context Creation & Hook Registration
    Setup->>Builder: createViteNuxtPwaContext(options)
    activate Builder
    Builder->>Core: createCustomVitePWAContext('vite')
    Core-->>Builder: Returns base agnostic `ctx`
    Builder-->>Setup: Returns base `ctx`
    deactivate Builder

    Note over Setup: prepareModule(ctx) execution:
    Setup->>Nuxt: Registers Nuxt hooks (e.g., build:before)
    Setup->>Nitro: Registers Nitro hooks (e.g., nitro:init)
    Note over Setup, Nitro: Setup finishes execution. Awaiting events...

    Note over Setup, Nitro: Phase 2: Nitro Init (Enrichment)
    Nitro-)Setup: Asynchronous Hook: 'nitro:init'
    activate Setup
    Note over Setup, Builder: Enriches `ctx`: Loads PWA config using resolved Nuxt aliases & Nitro output paths when required
    deactivate Setup

    Note over Setup, Vite: Phase 3: Plugin Registration
    Nuxt-)Setup: Asynchronous Hook: 'build:before'
    activate Setup
    Setup->>Builder: ctx.nuxt.prepareNuxtOptions()
    activate Builder
    Note over Builder: Instantiates plugins (Main, Dev, Assets...)
    Builder->>Vite: Nuxt Kit: addVitePlugin(plugins)
    deactivate Builder
    deactivate Setup

    Note over Setup, WB: Phase 4: PWA Generation
    Nuxt-)Setup: Asynchronous Hook: 'nitro:build:public-assets'
    activate Setup
    Setup->>Core: buildPwaAssets(ctx)
    activate Core
    Note over Core: Generates Web Manifest & Icons
    Note over Core: Executes ctx.runBuild()
    Core->>WB: dynamic import (generateSW / buildSW)
    activate WB
    WB-->>Core: Generates Service Worker
    deactivate WB
    Core-->>Setup: PWA Build complete
    deactivate Core
    deactivate Setup
```
