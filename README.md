[![npm version](https://img.shields.io/npm/v/isaacscript-lint.svg)](https://www.npmjs.com/package/isaacscript-lint)

# isaacscript-lint

`isaacscript-lint` is a helper package to install all of the dependencies necessary for ESLint to work with a typical IsaacScript linting configuration.

Please see the [IsaacScript webpage](https://isaacscript.github.io/) for more information.

<br />

## Why Code Formatting is Important

In the 90's, the most popular scripting language in the world was [Perl](https://www.perl.org/), invented by [Larry Wall](https://en.wikipedia.org/wiki/Larry_Wall). One of Larry's slogans was that "There Is Always More Than One Way To Do It", abbreviated as the TIAMTOWTDI principle. In Perl, there were many different ways to do even the most basic thing, like adding an element to an array. This resulted in a Perl ecosystem where programs often looked nothing like each other, where everyone had different coding styles, and where everything was hard to read and comprehend.

One of the key insights of [Guido van Rossum](https://en.wikipedia.org/wiki/Guido_van_Rossum), the creator of the [Python](https://www.python.org/) programming language, was that [code is read much more often than it is written](https://www.python.org/dev/peps/pep-0008/). Python was designed to be concise, clean, and readable. It had standard ways of doing things and recommended that everyone follow the [PEP-8 coding standard](https://www.python.org/dev/peps/pep-0008/). And so, in the 90s, there was a massive movement away from Perl and towards Python. Now, it is the [most popular programming language in the world](https://pypl.github.io/PYPL.html).

[Go](https://golang.org/), the programming language designed at Google in 2009, took this concept a step further. They included a code formatter inside of the language itself, called `gofmt` (which is short for "Go formatter"). When you are coding a Go program, it will automatically format all of the code as soon as you save the file. This can be surprising and disturbing for newcomers: "Why does gofmt make my code ugly?!" However, once people get used to the formatter, they realize that it saves them a tremendous amount of time. Rob Pike, one of the creators of Go, famously said that "gofmt's style is no one's favorite, yet gofmt is everyone's favorite". ([This YouTube clip](https://www.youtube.com/watch?v=PAAkCSZUG1c&t=523s) of Rob is a much-watch!)

When Rob says that everyone loves `gofmt`, he isn't lying. Programmers across the world have taken this concept and ran with it. People now use [rustfmt](https://github.com/rust-lang/rustfmt) in [Rust](https://www.rust-lang.org/), [Black](https://github.com/psf/black) in [Python](https://www.python.org/), and [Prettier](https://prettier.io/) in [JavaScript](https://www.javascript.com/) & [TypeScript](https://www.typescriptlang.org/).

The root of the problem here is that when people try out a new programming language, they often use the same formatting and conventions that they used in their previous language. This fractures the ecosystem and makes everyone's code inconsistent and hard to read. The lesson of Go is that whenever you code in a new language, you should use the standard style that everyone else uses for that language.

<br />

## TypeScript Code Formatting - ESLint & Prettier

In JavaScript and TypeScript land, there isn't a unifying standard like there is in Go, but we can get close.

Historically, the the most popular style guide is the world is the [Airbnb JavaScript Style Guide](https://github.com/airbnb/javascript). ([Google's Style Guide](https://google.github.io/styleguide/jsguide.html) and [StandardJS](https://standardjs.com/) are also notable, but don't seem quite as popular.) Thus, we chose Airbnb as a base for new JavaScript and TypeScript projects.

ESLint is the industry standard tool for linting in JavaScript and TypeScript. Airbnb helpfully provides an ESLint configuration with most of their style recommendations. ESLint can function in a way similar to `gofmt` by configuring your text editor to do `eslint --fix` on save. However, this has a lot of limitations. It can't automatically fix everything and leaves a lot up to the end user to fix.

[Prettier](https://prettier.io/) was released in 2017 and it has quickly become very widespread. (It could probably be considered the industry standard in 2021, but I'm not sure.) Prettier works by completely rebuilding your code from scratch using the [AST](https://en.wikipedia.org/wiki/Abstract_syntax_tree), which allows it to make much better transformations than pure ESLint can.

Because of the advantages of Prettier, we use it on top of the Airbnb config, and prefer Prettier's changes if there are any conflicts. Instead of running two different tools, we run Prettier inside of ESLint as a plugin with [`eslint-plugin-prettier`](https://github.com/prettier/eslint-plugin-prettier). Then, any ESLint rules that conflict with prettier are turned off with [`eslint-config-prettier`](https://github.com/prettier/eslint-config-prettier).

Finally, some specific Airbnb rules are disabled, since they don't make much sense in IsaacScript projects. You can see the specific exclusions in the [index.js](https://github.com/IsaacScript/eslint-config-isaacscript/blob/main/index.js) file of the [`eslint-config-isaacscript`](https://github.com/IsaacScript/eslint-config-isaacscript) repository.

<br />

## Package Documentation

- [`eslint`](https://github.com/eslint/eslint) is used, as explained above.
- [`eslint-config-isaacscript`](https://github.com/IsaacScript/eslint-config-isaacscript) contains the ESLint configuration.
  - It uses [`eslint-config-airbnb-typescript`](https://github.com/iamturns/eslint-config-airbnb-typescript) as a base, which is the Airbnb ESLint config for TypeScript.
- `eslint-config-airbnb-typescript` requires the [`eslint-plugin-import`](https://github.com/benmosher/eslint-plugin-import) and the [`@typescript-eslint/eslint-plugin`](https://github.com/typescript-eslint/typescript-eslint) packages to be installed. (They are peer dependencies and must be manually included.)
- [`eslint-plugin-prettier`](https://github.com/prettier/eslint-plugin-prettier) is used, as explained above.
- [`prettier-plugin-organize-imports`](https://github.com/simonhaenisch/prettier-plugin-organize-imports) is used because Prettier will not organize imports automatically.

<br />
