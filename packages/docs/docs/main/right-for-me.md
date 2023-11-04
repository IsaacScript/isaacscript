---
title: Is IsaacScript Right for Me?
hide_table_of_contents: true
---

(If you don't know what IsaacScript is, first see the [features](features.md) page.)

Coding in TypeScript is a bit more involved than coding in Lua, since it requires more tooling to be installed. This means that `isaacscript` isn't right for everyone. Whether you should use the framework depends on several factors.

<br />

### Are you good with computers? Have you programmed anything before?

- No - ❌ - `isaacscript` is a command-line program. If you don't know what that is, then this is not the right tool for you.
- Yes - ✔️ - Using IsaacScript is as simple as using any other compiler.

### How much time are you spending on coding Isaac mods?

- Not a lot of time - ❌ - Code quick mods in Lua and move on with your life.
- A lot of time - ✔️ - Using `isaacscript` will save you a lot of time:
  - Automatic formatting and tab-complete makes typing up mod code twice as fast.
  - With automatic in-game loading, testing your mods is lightning fast.
  - You will waste less time running-around in-game debugging run-time errors.

### What is the size of the mod you are building?

- A tiny mod - ❌ - Tiny mods are less likely to have bugs or typos.
- A medium mod - ✔️ - If your mod is big enough to be split into two or more files, then using `isaacscript` will be helpful. And if you will update the mod in the future (with new features or bug fixes), then using `isaacscript` will help you maintain the project.
- A big mod - ✔️ - `isaacscript` allows you to glue everything together in a provably-correct way.

### How good at you at coding?

- Never coded before - ❌ - IsaacScript is not for you. Spend a few months learning to code, and then come back here.
- Beginner - ❔ - Since using IsaacScript can make things more complicated, beginners might want to follow KISS - Keep It Simple, Stupid. On the other hand, beginners often waste an enormous amount of time troubleshooting typos and other small errors. The TypeScript compiler is like a helpful friend that looks out for you, pointing out all of these small errors automatically.
- Intermediate - ✔️ - `isaacscript` helps you focus on _coding_. Spend less time referencing the API docs and less time dealing with run-time errors.
- Expert - ✔️ - You probably already know how invaluable type-safety is. Enjoy the power of TypeScript's generics and higher-level patterns to write bug-free and easy-to-read code.

### Do you have experience in TypeScript?

- Yes, I know TypeScript - ✔️ - The choice is obvious.
- No, but I know JavaScript - ✔️ - TypeScript is almost the same thing as JavaScript. (It is a "superset" language.)
- No, but I know Lua - ❔ - On one hand, if you already know Lua and are comfortable with it, then it might not be worth the time and effort to learn something new. On the other hand, once you've learned one language, learning another is pretty easy. It is **totally worth it** to spend an hour or two to learn TypeScript in order to get all of the other fantastic benefits that it provides over Lua.
- No, but I know some other language - ✔️ - Isaac mods are programmed in either TypeScript or Lua. If you don't know either, then start with TypeScript from the get-go. You'll thank me later.

<br />

Are you ready to get started? Read on.
