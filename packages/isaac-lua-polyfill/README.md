# isaac-lua-polyfill

[![npm version](https://img.shields.io/npm/v/isaac-lua-polyfill.svg)](https://www.npmjs.com/package/isaac-lua-polyfill)

This package contains JavaScript polyfills for [_The Binding of Isaac: Repentance_](https://store.steampowered.com/app/1426300/The_Binding_of_Isaac_Repentance/). They are useful for unit testing your mods.

Currently, only `BitSet128` polyfill is provided.

## Usage

Import the library at the top of the testing file to register the polyfills:

```ts
import "isaac-lua-polyfill";
```

### Usage with Jest

You can put `"isaac-lua-polyfill"` into `setupFiles` in your `jest.config.js` to have it automatically loaded for each test suite:

```ts
module.exports = {
  setupFiles: ["isaac-lua-polyfill"],
};
```
