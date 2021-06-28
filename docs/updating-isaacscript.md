---
title: Updating IsaacScript
---

IsaacScript is occasionally updated with new TypeScript definitions, new linting rules, and so forth. However, these new updates are not automatically pushed to your mod.

In a TypeScript project, you can see your project dependencies by looking at the `package.json` file. By default, a new IsaacScript mod depends on just one thing: `isaacscript`. You can see the specific version inside of the `package.json` file.

[This page](https://www.netwoven.com/2017/03/21/how-to-update-node-js-modules-to-latest-versions/) explains how to update your project dependencies to the latest version.

In short, to automatically update the `package.json` file:

```bash
npx npm-check-updates --upgrade --packageFile package.json
```

Then, install the new modules with:

```bash
npm install
```

For reference, the latest version of IsaacScript can always be found [on the NPM page](https://www.npmjs.com/package/isaacscript).
