---
title: Next Steps
---

If you just finished the [Green Candle tutorial](example-mod.md), you may be wondering about the next steps you should take.

<br />

## Skill Level

What to do next probably depends on your skill level.

<br />

### Intermediate & Advanced Programmers

For intermediate to advanced programmers, the Green Candle tutorial should be enough for you to understand the anatomy of an Isaac mod. From here, you can use the [API reference documentation](https://wofsauge.github.io/IsaacDocs/rep/) and the [IsaacScript standard library documentation](/isaacscript-common) to go forth and build whatever it is you want to build, using [the appropriate callbacks](https://wofsauge.github.io/IsaacDocs/rep/enums/ModCallbacks.html). (Also check out the [IsaacScript-specific callbacks](/isaacscript-common/other/enums/ModCallbackCustom.md).)

<br />

### Experienced Isaac Modders

For people who already have experience in Isaac modding in Lua, the [Green Candle tutorial](example-mod.md) should be enough to get you familiar with how exactly IsaacScript mods are different from Lua mods. And the [JavaScript tutorial](javascript-tutorial.md) should be enough to get you familiar with the syntax differences between the two languages. (Overall, they are pretty similar.)

If you already know how the Isaac API works, then you are in a good spot, because the API works exactly the same way in IsaacScript as it does with Lua. The only code differences will be cosmetic; use curly brackets instead of "then", and so on. At this point, you should be ready to go forth and build whatever it is you want to build.

<br />

### Novice Programmers

Novice programmers or people without any previous Isaac modding experience might not be "off to the races" after finishing the Green Candle tutorial. If you look through the [API reference documentation](https://wofsauge.github.io/IsaacDocs/rep/) and you feel completely lost about how to start doing what you want to do, then you probably fall into this camp.

One option for beginners is to watch the [Catinsurance video tutorial series on YouTube](https://www.youtube.com/playlist?list=PLkIbky8_pFUpqAF9l7dh_YsEV-zpJ4q50). As you can see, the videos cover a lot of different topics, so watching a few of these videos should give you a nice overview of the kinds of things that are possible, and you can follow along step by step so that you can learn how to do it.

Note that Catinsurance's videos are made for Lua, and in general, you probably won't find any IsaacScript-specific tutorials in the wild. But remember that the API is completely identical between Lua and TypeScript - the only difference is the language. In other words, you only have to worry about cosmetic things like using curly brackets instead of "then", using parenthesis around if statements, adding type annotations, and so on.

To give you an idea of what I mean, here is a `setBlindfold` function in both TypeScript and Lua:

```ts
// TypeScript code
function setBlindfold(player: EntityPlayer, enabled: boolean) {
  const character = player.GetPlayerType();
  const challenge = Isaac.GetChallenge();

  if (enabled) {
    game.Challenge = 6; // A challenge with a blindfold.
    player.ChangePlayerType(character);
    game.Challenge = challenge;
    player.TryRemoveNullCostume(14);
  } else {
    game.Challenge = 0;
    player.ChangePlayerType(character);
    game.Challenge = challenge;
    player.TryRemoveNullCostume(14);
  }
}
```

```lua
-- Lua code
local function setBlindfold(player, enabled)
  local character = player:GetPlayerType();
  local challenge = Isaac.GetChallenge();

  if enabled then
    game.Challenge = 6; -- A challenge with a blindfold.
    player:ChangePlayerType(character);
    game.Challenge = challenge;
    player:TryRemoveNullCostume(14);
  else
    game.Challenge = 0;
    player:ChangePlayerType(character);
    game.Challenge = challenge;
    player:TryRemoveNullCostume(14);
  }
end
```

As you can see, besides some shenanigans with Lua using colons, and having to include the types inside of the function declaration, the code is almost identical. For this reason, you can pretty easily use any Isaac modding tutorial that is made for Lua and then apply it in IsaacScript. Coding in IsaacScript has the advantage of type safety - you get a red squiggly line in your editor when you make a typo.

With that said, if you are brand new to coding, you might want to make things easier on yourself by switching to Lua. That way, you can follow along exactly with what the tutorial is doing without having to worry about converting code back and forth between Lua and TypeScript. You can always come back to TypeScript later on once you have a better grasp on modding in Lua.

It you feel shaky on the act of programming itself, that is more of something that you learn over time with lots of practice. I personally prefer to learn by doing, but there are plenty of coding tutorials that you can do online, such as [Code Academy](https://www.codecademy.com/).

<br />

## Example Mods

Sometimes, studying other people's code can also be helpful. If you want a real-life project to look at, you can take a look at [Racing+](https://github.com/Zamiell/racing-plus), which is one of the biggest IsaacScript mods in existence. Or, if you want to focus on a smaller project, take a look through the `#mod-showcase` channel of [the Discord server](discord.md), of which there are many to pick from.

Remember that because Lua is so similar to TypeScript, you can also download any popular mod from the Steam Workshop and then directly read the Lua code that it comes with in order to see how they are accomplishing things (but be aware that the code quality many mods can be low.)

<br />

## Discord

The IsaacScript community can help you with any questions that you have. Use the `#help-and-questions` channel of [the Discord server](discord.md).
