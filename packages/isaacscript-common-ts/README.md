# isaacscript-common-ts

[![npm version](https://img.shields.io/npm/v/isaacscript-common-ts.svg)](https://www.npmjs.com/package/isaacscript-common-ts)

This package contains helper functions for a typical TypeScript project, such as [`iRange`](https://isaacscript.github.io/isaacscript-common/functions/utils/#irange).

Some of the functions here are copied from [`isaacscript-common`](../isaacscript-common). However, `isaacscript-common` is compiled to Lua, so it cannot be used in a typical JavaScript/TypeScript project. This project is compiled to JavaScript, so it can be consumed as a normal JavaScript/TypeScript library.

For more information about IsaacScript, see the [official website](https://isaacscript.github.io/).

## `tslib` / `importHelpers`

This library uses the [`importHelpers`](https://www.typescriptlang.org/tsconfig#importHelpers) TypeScript compiler flag. Thus, if you use it in your project, you also need to put this flag in your "tsconfig.json" file and include `tslib` as a dependency in your "package.json" file.

This is an optimization that is [recommended by the authors of TypeScript](https://github.com/Microsoft/tslib).
