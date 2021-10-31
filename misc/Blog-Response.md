IsaacScript, and why it doesn't suck

Jill posted a [fairly log blog](https://blog.oat.zone/p/7c181fbf-99bc-40a8-b710-7384ca8d4252/) about IsaacScript. I welcome criticism, and I thank Jill for putting it together.

Jill brings forth the following points:

1. TypeScript isn't a good programming language.
2. There is no operator overloading.
3. It uses a compiler, which increases overhead, and extra overhead is bad.
4. It is branded at beginners when it should only be branded at more advanced users.
5. Some of the features can be accomplished by extra Lua tooling.
6. IsaacScript does not work properly if you have created a symbolic link on top of your mods directory. (A symbolic link is a special redirection that Linux users sometimes do, but is rare to see in Windows.)
7. There are no TypeScript comments in the Lua output.
8. You need to cast to get around functions that return undefined.
9. It pollutes the global namespace with `__TS__` functions.
10. It adds extra transpiled functions, even if they are not used in the source code.
11. Using IsaacScript makes your mod lag more.
12. The transpiled output is hard to read.
13. Someone reading the Lua code wouldn't know that IsaacScript is used and would be confused.

Some of these points I agree with, and some are confused, so let's go through each in turn.

<br />

### 1. TypeScript isn't a good programming language.

Programming languages are tools. As programmers, once we learn a bunch of different languages, we realize that they all have different pros and cons, and that there isn't one best language. Rather, it is more about choosing the right tool for the job. And even when you choose the best tool for your particular situation, it still isn't going to be perfect, because *every programming language sucks*.

Jill pontificates on the history of JavaScript, explaining how it was created in a few short weeks. I fully agree with Jill: JavaScript and TypeScript suck, and there's definitely things that I would change about them. But I think that this is missing the bigger picture. The only relevant comparison is between TypeScript and Lua - two languages that both suck. Our job here should be to point out specific things that make Lua better than TypeScript, or specific things that make TypeScript better than Lua - not just complain that TypeScript is a "bad language" in general.

Here, the closest we get to a specific criticism of TypeScript is that there is both a `==` operator and a `===` operator. The former is an "loose equality" operator, and the latter is a "strict equality" operator. The idea is that you can use whichever one best suits your needs. But in Lua, there is only a strict equality operator. Here, Lua appears to be at a strict disadvantage: it just has one less operator to work with.

Jill goes on to say that MoonScript, Teal, Fennel, Amulet, and Haxe would all be better choices than TypeScript, because they are "designed to be compiled". That is a little misleading. Here, I think Jill is ignorant of these languages work, because [all](https://github.com/leafo/moonscript/blob/b7efcd131046ed921ae1075d7c0f6a3b64a570f7/docs/command_line.md#syntax-transformer) [five](https://github.com/teal-language/tl/blob/6b46e4051eb4a73138f827387017f9bcfe1befbe/spec/parser/parser_spec.lua) [of](https://github.com/bakpakin/Fennel/blob/5b142c22c679a23f0f63873e923e16d354bcbc82/src/fennel/compiler.fnl) [them](https://github.com/ianmaclarty/amulet/blob/8fa43fcdc5e145f607ba195eb9a053b423f24655/third_party/glsl-optimizer/src/glsl/glsl_parser.yy) convert code to an AST (abstract syntax tree), which can then be transpiled to any language in an agnostic way. In fact, this is [exactly how TypeScriptToLua works as well](https://github.com/TypeScriptToLua/TypeScriptToLua/blob/master/src/LuaAST.ts), so there is no meaningful difference here.

In fact, before deciding on TypeScript, I did investigate all five of these options! But TypeScript stood out as the clear winner among them. TypeScript has world-class tooling and a robust ecosystem - huge swathes of the internet have shifted their codebases to TypeScript in the past few years.

On the other hand, the 5 languages that Jill recommends are tiny projects with no next-to-no adoption. To be fair, Haxe deserves a special mention here, as it has gained some traction recently with the hit browser game [Friday Night Funkin](https://github.com/ninjamuffin99/Funkin). But the size of the Haxe ecosystem pales in comparison to TypeScript. If I'm having a weird Haxe problem, the likelihood of finding a StackOverflow question or an open-source project on GitHub to help me out is orders of magnitude less likely than if I was googling for an equivalent TypeScript problem. Ecosystem matters!

Furthermore, the transpilation of TypeScriptToLua is essentially flawless and gets solid reviews from many others who have used it to code "Lua mods" for DotA2, World of Warcraft, Factorio, and others. Do any big mods written in Haxe even exist for these games? TypeScript still appears to be the clear winner in 2021.

<br />

### 2. There is no operator overloading.

Jill complains that code without operator overloads is verbose. However, this isn't a fair criticism, because any IsaacScript mod can use Vector overloading for their project by copy-pasting a new definition for a `Vector` in, which is something that Jill doesn't mention.

In fact, this gives you the best of both worlds: you choose operator overloading, or you can choose the extra type safety. Either way, this is strictly an *advantage* for TypeScript over Lua, because the case where operator overloading is enabled is equivalent to the default state of affairs in Lua - and in Lua you don't even have the option available to you to choose the other path.

<br />

### 3. It uses a compiler, which increases overhead, and extra overhead is bad.

It is indeed true that using a compiler increases overhead. Jill is quite right to showcase here that IsaacScript significantly increases the complexity of your setup, and that should not be overlooked. I agree with her that people who are not already familiar with command-line tools and/or programming should probably not be using the tool. And extra overhead adds more things to troubleshoot when things go wrong.

But let's get a little more specific and examine exactly what that overhead is.

#### Installing

The time to install IsaacScript is anywhere between 1 minute (if you already know how to install things from npm) to 10 minutes (assuming you've never programmed before and you have to install Node, Git, and VSCode).

#### Running

The steps to run IsaacScript are just double clicking on a shortcut, or typing a few keystrokes into a shell. Both of these can be performed in a fraction of second.

#### Learning TypeScript

For those who have only programmed in Lua before, you could say that another cost would be to learn the syntax of the TypeScript programming language. Of course, many people already know both languages, and some people *only* know TypeScript, so this cost depends on the person.

#### Transpilation

Debugging runtime errors becomes slightly more tricky because the Lua line numbers won't match up to your TypeScript line numbers. So you could consider "harder troubleshooting" as another cost of using the tool.

Thankfully, this is almost never a problem in practice, because 1) using TypeScript prevents nearly all runtime errors (that's the point of using TypeScript), and 2) the Lua code is very close to the TypeScript code, with all of the same variable names and so forth.

#### Cost-Benefit Analysis

You could think of the cost of installing IsaacScript and learning the syntax as a one time cost, whereas the others are recurring costs that happen every time that you sit down to code. For people familiar with computers or familiar with programming, we can probably agree that these things are not exactly a big hurdle.

As for Lua, programming mods in Lua have essentially no cost - you open up Notepad, type up some code, save the file and then boot up the game and see if it worked.

So, for people who *are* familiar with command-line tools and/or programming, the question becomes more of a cost-benefit analysis. Is it worth it to spend a few minutes to install IsaacScript and have a more complex setup in return for saving hours and hours of mod-troubleshooting? For anyone making small mods, the answer is almost unquestionably **no**. For anyone making big mods, the answer is almost unquestionably **yes**. For anyone making medium mods, it probably depends on other factors.

<br />

### 4. It is branded at beginners when it should only be branded at more advanced users.

On the one hand, I think that Jill is right: adding the complexity of a compiler could be overwhelming and stupid for someone new to programming. But on the other hand, I think that Jill is wrong: having a compiler can be invaluable for a beginner.

Frequently, people come to the Isaac modding Discord and post code-snippets requesting help. Over and over, the root cause of many issues (maybe even most issues?) are mistyped variables, mistyped functions, or other type errors. Sometimes I notice that these troubleshooting sessions go on for *over an hour* before the root cause is discovered.

Just think about how silly that is - pouring over code, adding print statements, testing things over and over for *an entire hour* until you finally find a typo. This is the story that we see over and over, and it's a bit frustrating when you know that after a few short steps, this person could simply have a red squiggly line in their text editor that shows them exactly where the error is, reducing the time that it takes to solve the problem down to a *single second*.

But do the benefits for beginners outweigh the other costs? That is a difficult question to answer properly. I think I do agree with Jill that IsaacScript is best-suited for people who already know how to program TypeScript and already know how Isaac modding works. As we move further away from that side of the spectrum, things get a little more murky. There are definitely benefits of using the tool, regardless of what your skill level is, but I do take Jill's point that IsaacScript should not be recommended to everyone. If the website doesn't do a good enough job of explaining that, then it probably needs to be updated.

<br />

### 5. Some of the features can be accomplished by extra Lua tooling.

#### Mouseover

Jill starts off this section by showcasing that Lua language servers provide some mouseover info, which is true. However, this is vastly inferior to IsaacScript. For example, this is a screenshot of what happens when I mouse over the `AddTrinket` method:

<br />

![AddTrinket mouseover text](mouseover.png)

<br />

While every function in the game definitely doesn't have this level of detail, a lot of them do, and tell you useful things that you would otherwise have to open up the docs to look for. This feature is fantastic and saves you a lot of time.

Jill's main point here is that it is entirely possible to create a framework to get this same functionality in Lua using something like [EmmyLua](https://github.com/EmmyLua/EmmyLua-LanguageServer). I agree. But such a framework **does not currently exist**. If it gets created, and it is as thorough as the IsaacScript API comments are, then when that day comes, IsaacScript will have one less feature over the competition. Until then, it's kind of a silly critique by saying that "it could be possible in Lua" without it actually existing for people to use.

#### API Accuracy

Jill is indeed correct that this isn't really a "major" feature. By simply setting the definition for some problematic functions to have a type of `never`, it can cause compiler errors for end-users who accidentally use those functions. No, you don't "really need to have something solve this", but it's a nice bonus that you get for free when having a compiler along for the ride.

As for IsaacScript being a monolith, I don't think that Jill understands what the tool is doing very well. Jill links a blog post that goes over the downsides of having tightly coupled software, without mentioning exactly how IsaacScript is tightly coupled. Maybe she can chime in later with more specifics, but I think that IsaacScript is pretty modular: linting is optional, automatic mod reloading is optional, the expanded standard library is optional, and even the definitions are optional - you can easily drop in your own solutions for any of these if you wanted, just by changing a single line in the "package.json" file. So I think that this criticism misses the mark.

#### Require/Include

Jill says that "there are no consequences of using `include`", but this is false. The official docs [go into more detail on why you should never use `include` without having require as a fallback](https://wofsauge.github.io/IsaacDocs/rep/tutorials/Using-Additional-Lua-Files.html), so I think that Jill is just unaware that `include` is broken in this way.

#### Extra Enums

Jill points out that theoretically, extra enums could happen in Lua. This is true, but as we saw previously, **solutions for this do not actually exist**. If they ever do exist, I'll update the website accordingly, but as it stands, this is kind of an empty criticism.

#### Automatic Formatting

Jill mentions that you can auto-format in Lua, which is true. In fact, the best option for Lua auto-formatting right now is [LuaFormatter](https://github.com/Koihik/LuaFormatter). I used it myself in my Lua projects, and it has a lot of great options. But realistically, it only has a shadow of the power that Prettier + ESLint does. So I'd argue that listing Prettier as a feature is warranted. However, I don't feel super strongly about this, so if people think that it would be more honest to remove it as a feature, I can.

#### Automatic Linting

Jill mentions that you don't need ESLint because you can use Luacheck. But this is a little misleading.

I've used Luacheck myself for the past 5 years, and I would highly recommend it to anyone who works with Lua projects. However, the tool hasn't gotten many updates since the maintainer of the project died back in 2018. And the tool is very limited compared to what you would expect from a linter in any other language. As a fun fact, the severe limitations of Luacheck were one of the direct reasons that caused me to get frustrated enough to create IsaacScript in the first place.

On the other hand, ESLint is hands down the most popular and best linter in the world. It is actively maintained and has the ability to write custom plugins to do anything you want. The ESLint ecosystem has tons of existing rules, plugins, and even a support Discord for when things go wrong. This isn't exactly an apples to oranges comparison.

#### Lua Language Servers

Jill mentions that you can achieve types in Lua with a language server. This is true, and I would highly recommend doing this for anyone working with Lua projects.

However, I think Jill should acknowledge that there is a meaningful distinction to be made between 1) types annotated by LDoc comments and picked up by a linter, and 2) types embedded into the language itself.

Having all type information encoded as LDoc comments is clunky and painful to annotate. But more importantly, the tooling to get this working well in the Isaac ecosystem does not currently exist. It's the same as the "Extra Enums" section above: when Lua types for EID, StageAPI, and so forth do exist, I'll gladly concede this point, but until then it's not fair to complain that something is theoretical possible without it actually existing for people to use in their mods right now.

Furthermore, we should note that when types are a first class part of the language, it allows for powerful coding patterns that are not possible with LDoc comments and a Lua language server:

```ts
enum Situations {
  Situation1,
  Situation2,
  Situation3,
  // Situation4, // If we uncomment this line, the program will no longer compile
}

function doThingBasedOnSituation(situation: Situation) {
  switch (situation) {
    case Situation1: {
      return 41;
    }

    case Situation2: {
      return 68;
    }

    case Situation3: {
      return 12;
    }

    default: {
      ensureAllCases(situation);
      return 0;
    }
  }
}
```

This is an example of code that is future-safe against someone adding a values to an enum. While not everyone can appreciate the value here, this is the kind of thing I get excited about, because I love having bug-free code. :)

#### TypeScript is Not Strongly Typed

Jill claims that if you have "one trace of `any`, your code becomes unsafe", but this is misguided.

In Lua, you normally have no type safety, because nothing is typed. Alternatively, you can use a Lua language server and manually annotate types as LDoc comments. This solution is nice in that you can opt-in to as much type safety as you want. In other words, if you want to go crazy and annotate LDoc comments for every single function in the entire project, you can. Or if you want to only have certain parts of your program be type-safe, you can. You have the flexibility to do exactly what you want.

In TypeScript land, the situation is identical. TypeScript allows the `any` type as an escape hatch when you don't care what the actual type is. In this section of the blog, Jill seems to be proposing that `any` is somehow a bug, and that TypeScript shouldn't ever allow `any`. But of course, that would be quite silly, because the programmer should be empowered to do what they want. If a TypeScript programmer wants to have a completely type-safe program, then they can simply never use the `any` type in their program, or enable a lint rule that disallows it programmatically. So I think that it's the exact opposite of what Jill describes: having `any` available to use if you want is only an advantage, not a disadvantage.

### 6. IsaacScript does not work properly if you have created a symbolic link on top of your mods directory.

This is half-true. Prior to October 31st, IsaacScript would not handle symbolic links properly, but fixing this bug was as simple as [removing a single character](https://github.com/IsaacScript/isaacscript/pull/11/files#diff-bc9705d0f7a567399044dfc66ccc82d4d9aa1cff116842a0094d54e463c9ecbcR68) (which was performed by Kyojo in a pull request).

Sure, IsaacScript should probably handle symlinks correctly, but I think that we can probably agree that this was not a major flaw in the software. Rather, I think it could be more honestly characterized as a very specific issue for a very specific kind of person. Most people use Windows, and most people don't symlink their mods directory.

### 7. There are no TypeScript comments in the Lua output.

I agree that it would be nice for TypeScript comments to get copied over. In fact, it's one of the open issues on the TypeScriptToLua Github. Maybe it will get implemented soon! The nice thing about TypeScriptToLua is that it is actively maintained and continues to get nice goodies added as time progresses.

Until then, I think it's worth noting that while having comments would be nice, it doesn't make a lot of practical difference. When you get a runtime error and a Lua line number, finding the matching TypeScript code is trivial because all of the Lua function names and variable names are the same.

### 8. You need to cast to get around functions that return undefined.

Jill's example attempts to show that you "have to cast" in order for the code to compile, but this is not true. The example is instead better written like this, which requires no casting:

```ts
const players = getPlayers();
const nonCoopGhosts = players.filter((player) => !player.IsCoopGhost());
```

And if I may, it's easy to read and very high-level!

In general, I think Jill is just confused about how TypeScript works, as in my mods I hardly ever cast anything. One notable exception is `Entity.GetData()`, since the return type on that is `Record<string, unknown>`, and it is often useful to cast that into a more specific interface to achieve even better type safety than what `Record<string, unknown>` would provide.

#### 9. It pollutes the global namespace with `__TS__` functions.

I agree that it would be nice for the `__TS__` functions to be local to the transpiled project. In fact, it's one of the open issues on the TypeScriptToLua Github. Maybe it will get implemented soon!

As my friends on the modding Discord server will know, I hate polluting the global namespace when it isn't required. But we should mention that until TypeScriptToLua implements a "local" mode, there really isn't much practical consequence of making these functions global. The likelihood of it affecting any other seems extremely tiny, so this seems like a pretty tiny nitpick.

#### 10. It adds extra transpiled functions, even if they are not used in the source code.

Jill takes issue with non-used functions in the transpilation output, which admittedly at first glance does appear to be a bug. However, this is not a bug, and Jill is just ignorant of how TypeScriptToLua works.

As noted in the [TypeScriptToLua documentation](https://typescripttolua.github.io/docs/configuration), the default value for the `luaLibImport` compiler option is set to `require`, which causes every polyfilled function to be included. If users instead set this to `inline`, it would match the playground behavior and only include the explicit functions that are used in the source code, which is probably how Jill would expect the software to work. So, if this is an issue for you, simply use `inline` and you are done.

The reason that `require` is the default over `inline` is because it provides better compilation times and doesn't increase the size of the transpiled output that much. With a big enough mod, you would end up using all of the transpiled functions anyway, so parsing the AST to see if the individual functions are actually being used is essentially just a waste of time.

Even if it were not possible to use the `inline` compiler flag, this criticism is still really weird. Are there any actual implications of having non-used functions in the transpiled output? Jill states that "it's not good, at ALL", but doesn't go on to say why. It's important to remember that as programmers, we [should only be worried about performance increases that are measurable](http://www.catb.org/~esr/writings/taoup/html/ch12s02.html). The time differential between the game loading a 10 KB Lua file and a 11 KB Lua file is going to be on the order of nanoseconds - it wouldn't be something that you would ever be able to meaningfully measure. Thus, worrying about this is a complete waste of our time.

#### 11. Using IsaacScript makes your mod lag more.

Jill speculates that using higher-order functions like `filter` will make mods more laggy than if you use a for loop. But the practical differences here are going to be so small that they won't be measurable. This is a classic mistake made by newer programmers, summarized nicely by the legendary Donald Knuth:

> "Programmers waste enormous amounts of time thinking about, or worrying about, the speed of noncritical parts of their programs, and these attempts at efficiency actually have a strong negative impact when debugging and maintenance are considered. We should forget about small efficiencies, say about 97% of the time: premature optimization is the root of all evil.

Remember that where optimization is concerned, the first thing that we have to do is measure. Jill expresses that "I can't imagine how much worse this gets later", but provides no actual measurements in her blog. As for me, I've done benchmarks on IsaacScript code, and am not able to detect a difference. In the specific case that Jill outlines, `filter` incurs an extra function invocation, but I think that you would only be able to detect this if it was running millions of times per frame. This would probably never happen in an Isaac mod, or even with 100 mods all running at the same time.

Furthermore, this criticism in particular doesn't seem to be aimed at TypeScript itself, but just higher-order functions. As a final nail in the coffin here, I will state that nothing prevents you from using good-ol-fashioned for loops in TypeScript in exactly the same way that you would in Lua.

#### 12. The transpiled output is hard to read.

This is a criticism that other people have brought up before, so it's a good one to discuss. I believe that this issue is a symptom of people thinking incorrectly about what code is.

As an analogy, let's consider the case of C++ code. People write code in the "high-level" language of C++, which looks like this:

```c++
#include <iostream>

int main() {
    std::cout << "Hello World!";
    return 0;
}
```

Then, they run the C++ code through a compiler, which produces X86/X64 code. It looks like this:

```x86
          global    _start

          section   .text
_start:   mov       rax, 1
          mov       rdi, 1
          mov       rsi, message
          mov       rdx, 13
          syscall
          mov       rax, 60
          xor       rdi, rdi
          syscall

          section   .data
message:  db        "Hello, World", 10
```

As we can see, the compiled output doesn't really look anything like what we started with. Rather, it is a lower level version of the code, which is naturally going to be more verbose. However, for nearly all intents and purposes, the we don't really care *what* the X86 code looks like, because we never need to look at it. All we care about is the source code in C++. The source code is the thing that gets checked into GitHub. The source code is the thing that is going to be read by other programmers on the team. The source code is where we understand how the program works.

Imagine that someone came along and told you that "a disadvantage of coding in C++ is that the compiled output is really hard to read". This would probably strike you as being quite strange. What point is there in reading the X86 code? It might as well be written in Klingon instead of X86 for all we care, since we never have to deal with it.

The situation with C++ and X86 is very similar to the situation with TypeScript and Lua. I think that the root of the issue is that Lua programmers have beautiful-looking Lua code, so they recoil when they see computer-generated, nasty looking Lua code that is generated from a machine. It's harder to read the computer-written Lua code and harder to figure out what is going on. So they consider this to be a disadvantage of the tool.

Of course, the reason that they consider it a disadvantage is because their brains are thinking in Lua, and not thinking in TypeScript. Once you start to think in TypeScript, it doesn't make a whiff of a difference what the transpiled output looks like, because all you are doing is reading the TypeScript code. So as far as I am concerned, this is a complete non-issue.

There's one big caveat, of course. When runtime errors occur, the Isaac log file will tell you the line of Lua that the error happened on. This means that IsaacScript coders might have to jump into the transpiled "main.lua" file from time to time to find out what went wrong. However, doing this is not a problem, because the generated Lua code is very close to the TypeScript code, with all of the same variable names, function names, and so on. So it is trivial to find the corresponding line of TypeScript code.

It's also important to remember that runtime errors are very rare in IsaacScript land - that's the whole point of using TypeScript in the first place!

#### Someone reading the Lua code wouldn't know that IsaacScript is used and would be confused.



This is an issue that Cucco brought up before and I consider to be a non-issue.


Conclusion

Many of these issues