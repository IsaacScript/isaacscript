---
title: Custom Stages
---

<!-- markdownlint-disable MD029 -->

Wanting to create a custom Binding of Isaac stage is common. But the vanilla API does not have support for this. IsaacScript offers support for custom stages as part of its standard library. See the [usage section](#usage) below.

Historically, people have used the [StageAPI](https://github.com/Meowlala/BOIStageAPI15) to build custom stages, but using IsaacScript over StageAPI has several advantages. See the [motivation section](#motivation) below.

## Usage

### `tsconfig.json`

You define and configure your custom stages by adding information to the `tsconfig.json` file.

First, make sure that it has a "$schema" property at the top:

<!-- We specify the following code block as "ts" instead of "jsonc" because Docusaurus will mess up the syntax highlighting. -->

```ts
  // We specify the schema to get auto-complete and validation.
  "$schema": "https://raw.githubusercontent.com/IsaacScript/isaacscript/main/packages/isaacscript-cli/schemas/tsconfig-isaacscript-schema.json",
```

Second, make sure it has an "isaacscript" property at the bottom:

<!-- We specify the following code block as "ts" instead of "jsonc" because Docusaurus will mess up the syntax highlighting. -->

```ts
  // IsaacScript settings
  "isaacscript": {
    // A list of objects that represent the custom stages that are in your mod, if any. See:
    // https://isaacscript.github.io/main/custom-stages
    "customStages": [
      {
        "name": "Foo",
        "xmlPath": "./mod/resources/rooms/foo.xml",
        "roomVariantPrefix": 101,
      },
    ],
  },
```

For the most basic stage, only the "name", "xmlPath", and "roomVariantPrefix" properties are required. But you will likely want to make additional customizations. There are many more optional properties that you can specify, which are documented in the [TypeScript schema definition](https://github.com/IsaacScript/isaacscript/blob/main/packages/isaacscript-common/src/interfaces/CustomStageLua.ts).

Furthermore, for more information on the "roomVariantPrefix" field, see the section below on [Custom Stage Room Variant Prefixes](#custom-stage-room-variant-prefixes).

## Motivation

[StageAPI](https://github.com/Meowlala/BOIStageAPI15) is a fantastic library created by [DeadInfinity](https://steamcommunity.com/profiles/76561198172774482/myworkshopfiles/?appid=250900) and [BudJMT](https://steamcommunity.com/profiles/76561198067029619/myworkshopfiles/?appid=250900), the two smartest people in the Isaac community. Until 2022, it has been the engine that has powered all Isaac mods that have custom stages, like [Revelations](https://steamcommunity.com/sharedfiles/filedetails/?id=1536643474) and [Fiend Folio](https://steamcommunity.com/sharedfiles/filedetails/?id=2305131709&searchtext=fiend+folio). However, no library is perfect. I wanted to try and improve on Stage API with the following goals in mind:

<!--lint disable ordered-list-marker-value -->

### 1. An Isaac library should be dead-easy to use.

- Creating a new stage should be as easy as specifying some values in a config file and then calling `spawnCustomTrapdoor`.
- Everything complicated should be abstracted away, with the ability to customize if needed.
- Auto-complete on functions and methods should work automatically. Just start typing.

### 2. An Isaac library should be safe.

- Creating stages can get complicated. You should immediately know if you are using a function incorrectly. You should never be running around in-game, troubleshooting run-time errors.
- It should be impossible to push broken code to production.

### 3. An Isaac library should work without being a Workshop dependency.

- When a user wants to play a mod, they should only have to subscribe to one thing on the Steam Workshop. Forcing the end-user to subscribe to multiple things is painful, complex, and unnecessary.
- Having stage logic bundled with the mod preserves backwards compatibility and ensures that stage logic is tightly-coupled to the mod logic that is using it.
- Having stage logic bundled with the mod allows the mod author to be in complete control of when they update to the latest version, if ever. This allows the upstream library to make breaking changes and stay clean without having to worry about having perpetual technical debt (like Stage API).

### 4. An Isaac library should use real XML/STB files.

- StageAPI forces people to convert their XML files to something called "Lua rooms", which is XML data converted to Lua. It then imports the Lua rooms at run-time and manually deploys their contents.
- Lua rooms are, in essence, the biggest hack in the history of Isaac modding. A lot of code is dedicated to making it all work. (You have to architect a solution for loading empty room data, work around grid entities not spawning properly, handle special entities like Slides, and so on.)
- But what if there was a better way? There's no need to go down this rabbit hole. The IsaacScript library uses real XML/STB files, and lazy-loads their data when needed using the `goto` command, resulting in a completely seamless experience.
- This means that for people creating new stages, things are ultra simple - no Basement Renovator hooks required!

### 5. An Isaac library should be compatible with other Isaac libraries.

- No library should irreparably alter the base game. In other words, it should make no vanilla resource replacements. This is the same principle as [not importing for side effects](https://github.com/Zamiell/isaac-faq/blob/main/mod-organization.md#avoiding-side-effects).
- With no resource replacements, there's never a compatibility issue. Each mod can use their own library for their own stage.

### 6. An Isaac library shouldn't cause lag on boot.

- StageAPI loads data for hundreds of rooms on the first run, which causes lag.
- Libraries shouldn't do anything if they are not being used. This is the same principle as [not importing for side effects](https://github.com/Zamiell/isaac-faq/blob/main/mod-organization.md#avoiding-side-effects).
- Instead, by lazy loading data, custom stages can work in a seamless way.

### 7. An Isaac library should have excellent documentation.

- StageAPI has historically been undocumented. Recently, there have been some excellent documentation additions by Filloax (the person behind Revelations). With that said, all of the documentation is manually typed and prone to error.
- An old adage in programming is that [if it isn't documented, then it doesn't exist](https://blog.codinghorror.com/if-it-isnt-documented-it-doesnt-exist/). Beautiful and easy-to-use documentation should be a first-class goal.
- Documentation should be automatically generated with tooling so that it never gets out of date.

<!--lint enable ordered-list-marker-value -->

With these improvements in mind, I've created the IsaacScript Stage Library. Since it is integrated into the normal [standard library](https://isaacscript.github.io/isaacscript-common), using it is effortless. See the [usage section](#usage) above.

<br />

## Custom Stage Room Variant Prefixes

The room variant prefix chosen by each mod must not overlap with any other ones - otherwise, loading the custom stage will not work properly. In order to prevent conflicts, this section documents all of the arbitrary prefixes claimed by each mod. Valid prefixes are between 101 and 999, inclusive.

| Room Variant Prefix | Mod Name |
| ------------------- | -------- |
| n/a                 | n/a      |

(There are no mods yet that have claimed any prefixes. Click on the edit button below to add yours.)
