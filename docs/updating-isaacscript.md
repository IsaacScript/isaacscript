---
title: Updating IsaacScript
---

IsaacScript is occasionally updated with new TypeScript definitions, new linting rules, and so forth. However, these new updates are not automatically pushed to your mod.

In a TypeScript project, you can see your project dependencies and their current versions by looking at the `package.json` file. More information can be found in the [package.json documentation](directory-structure.md#packagejson).

A helper script called `update.sh` is included in IsaacScript projects to help you update your dependencies. Run it like this:

```bash
./update.sh
```

And it will automatically update the versions and perform the `npm install` command, if necessary.

If you want to know more, [this blog](https://www.netwoven.com/2017/03/21/how-to-update-node-js-modules-to-latest-versions/) goes over this process in more detail.

For reference, the latest version of IsaacScript can always be found [on the NPM page](https://www.npmjs.com/package/isaacscript).
