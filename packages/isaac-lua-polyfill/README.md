# isaac-lua-polyfill

[![npm version](https://img.shields.io/npm/v/isaac-lua-polyfill.svg)](https://www.npmjs.com/package/isaac-lua-polyfill)

This package contains JavaScript polyfills for [_The Binding of Isaac: Repentance_](https://store.steampowered.com/app/1426300/The_Binding_of_Isaac_Repentance/). This is useful when you need to import `isaac-typescript-definitions` or `isaacscript-common` inside of JavaScript/TypeScript environments such as the browser or Node.js. For example, you might want to write unit tests in JavaScript/TypeScript for functions that are used in your mod, and then run them in [CI](https://en.wikipedia.org/wiki/Continuous_integration).

## List of Polyfills

Currently, only `BitSet128` polyfill is provided.

## Usage

Import the library at the top of the file to register the polyfills:

```ts
import "isaac-lua-polyfill";
```

(You need to import for side-effects because this library mutates the [`globalThis`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/globalThis) variable.)

### Usage with Jest

You can put `"isaac-lua-polyfill"` into `setupFiles` in your `jest.config.js` to have it automatically loaded for each test suite:

```ts
module.exports = {
  setupFiles: ["isaac-lua-polyfill"],
};
```
