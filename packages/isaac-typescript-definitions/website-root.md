---
sidebar_label: Introduction
sidebar_position: 0
custom_edit_url: null
---

# `isaac-typescript-definitions`

The `isaac-typescript-definitions` package contains the definitions for the vanilla Isaac Lua API. It also includes bugfixes and quality of life changes that they developers have not bothered to implement yet.

You can explore what `isaac-typescript-definitions` offers via the left navigation bar.

Right now, we only generate documentation for the enums. (Some of them are the roughly the same as vanilla Lua ones, like `CollectibleType`. And some are them are community contributed things that the developers have forgotten to include, like `StageID`.)

If you want to learn about the classes in the API (like `Entity` or `Isaac`), then you should use [Wofsauge's documentation](https://wofsauge.github.io/IsaacDocs/rep/). (In a TypeScript mod, you use the Isaac API classes in the exact same way that you would in a Lua mod.) Alternatively, you can view [the TypeScript definition source files](https://github.com/IsaacScript/isaacscript/tree/main/packages/isaac-typescript-definitions/src) directly.

If you want to use `isaac-typescript-definitions` as a Lua library for your Lua code, see the [using IsaacScript in Lua](../main/isaacscript-in-lua.md) page.
