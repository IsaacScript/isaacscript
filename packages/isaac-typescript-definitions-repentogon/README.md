# isaac-typescript-definitions-repentogon

[![npm version](https://img.shields.io/npm/v/isaac-typescript-definitions-repentogon.svg)](https://www.npmjs.com/package/isaac-typescript-definitions-repentogon)

These are TypeScript definitions for [REPENTOGON](https://repentogon.com/index.html), an exe-hack for the modding API of [_The Binding of Isaac: Repentance_](https://store.steampowered.com/app/1426300/The_Binding_of_Isaac_Repentance/).

They are not included by default in [IsaacScript](https://isaacscript.github.io/) mods.

## Installation

First, add these definitions as a dependency (similar to any other JavaScript/TypeScript dependency):

```sh
npm install isaac-typescript-definitions-repentogon --save
```

Second, add the following to your "tsconfig.json" file:

```jsonc
  "compilerOptions": {
    "types": ["isaac-typescript-definitions-repentogon"],
  },
```
