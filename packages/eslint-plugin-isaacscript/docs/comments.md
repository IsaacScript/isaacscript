# Comments

`eslint-plugin-isaacscript` contains several rules that make working with comments very strict. Why would anyone want to subject themselves to that?

Let's have a short discussion on the motivation for these rules.

<br>

## The Types of Comments

First, some jargon:

- The `//` characters represent a "line" comment.
- The `/*` characters represent a "block" comment. (It is ended with `*/`.)
- The `/**` characters represent a "[JSDoc](https://jsdoc.app/)" comment. (It is also ended with `*/`.)

### Line Comments

When line comments are on the same line as code, they are called _trailing line comments_. For example:

```ts
foo(); // hello world
```

When line comments are on their own line, they are called _leading line comments_. For example:

```ts
// hello world
foo();
```

_Leading line comments_ can be either be single-line, or multi-line:

```ts
// This is a single-line line comment!

// This is a multi-line line comment! It's so long that
// it spills over on to the next line!
```

### Block Comments

Block comments are ignored by the rules of this plugin, since they are typically used to comment out blocks of code. For example:

```ts
/*
foo();
bar();
*/
```

### JSDoc Comments

JSDoc is a type of block comment that has a [strictly defined format](https://jsdoc.app/about-getting-started.html).

Like line comments, JSDoc comments can either be single-line or multi-line:

```ts
/** This is a single-line comment! */

/**
 * This is a multi-line line comment! It's so long that
 * it spills over on to the next line!
 */
```

Multi-line JSDoc comments use asterisks to denote the beginning of each line.

<br>

## Ignoring In-Line Comments

With the definitions out of the way, let's talk about how we use the different kinds of comments. It is common to use _trailing line comments_ to write quick annotations:

```ts
foo(); // initialize the data
bar(); // probably not needed but just in case
```

In this circumstance, it would probably be a waste of time to force the programmer to write the comments in complete sentences, like this:

```ts
foo(); // We call this function to initialize the data.
bar(); // Calling this function is probably not needed, but we call it just in case.
```

Thus, _trailing line comments_ are ignored by the rules in this plugin.

<br>

## Annotating Information on Variables and Functions

In contrast to _trailing line comments_, _leading line comments_ are usually longer and more detailed. For example, say that we want to document something about the `foo` variable:

```ts
// matches the USS design document, section D
const foo = 100;
```

This is a good start. But the problem with annotating this information with a line comment is that it doesn't get "attached" to the variable. For example, in VSCode, if we hover over the `foo` variable (either at the declaration or elsewhere in the code), we would see that it has a value of 84, but we wouldn't see what the comment is.

To fix this problem, we can annotate the information as a JSDoc comment instead:

```ts
/** matches the USS design document, section D */
const foo = 100;
```

Now, wherever we happen to be in the code, we can always mouse over `foo` to see the comment. Nice! (And if we use a documentation generator like [TypeDoc](https://github.com/TypeStrong/typedoc), it would automatically go in the generated documentation.)

However, one problem remains. You are [supposed to use complete sentences in JSDoc comments](https://jsdoc.app/about-getting-started.html), because it represents official information that will be extracted out and put on a documentation webpage. So we should update the comment to be like this:

```ts
/** Matches the USS design document, section D. */
const foo = 100;
```

Subsequently, it makes sense to have a linting rule to ensure that all JSDoc comments have complete sentences in them. This is the point of the [`isaacscript/complete-sentences-jsdoc`](docs/rules/complete-sentences-jsdoc.md) rule. (It is much smarter than the similar [`jsdoc/require-description-complete-sentence`](https://github.com/gajus/eslint-plugin-jsdoc/blob/master/.README/rules/require-description-complete-sentence.md) rule.)

<br>

## Using a Ruler

Many code projects have conventions to prevent lines from getting over a certain amount of characters. This kind of thing ensures that code is easy to read. It also is helpful to people with seeing disabilities, and for developers who prefer to open two files side by side.

In JavaScript/TypeScript, ESLint provides the [`max-len`](https://eslint.org/docs/latest/rules/max-len) lint rule. This lint rule is often accompanied by an on-screen ruler inside of the IDE. Having the ruler on-screen is very nice, as it can accurately show when a line is over the limit. For example, to enable the ruler in VSCode:

```json
{
  "editor.rulers": [100]
}
```

Formatters such as [Prettier](https://prettier.io/) have taken this concept to the next level. Prettier automatically reformats your code to stay within the line limit. Since it happens automatically, using Prettier is a huge timer-saver!

<br>

## Using JSDoc With a Ruler

Code comments should stay to the left of the ruler for the exact same reasons that normal code should. Unfortunately, Prettier does not automatically reformat JSDoc comments. This makes working with them a real pain.

For example, say that you have the following JSDoc comment:

```ts
/**
 * But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was
 * born and I will give you a complete account of the system, and expound the actual teachings of
 * the great explorer of the truth, the master-builder of human happiness. No one rejects, dislikes,
 * or avoids pleasure itself, because it is pleasure, but because those who do not know how to
 * pursue pleasure rationally encounter consequences that are extremely painful.
 */
```

This comment is aligned with a ruler of 100 characters. Imagine that I need to add some new information before the "No one rejects" sentence:

```ts
/**
 * But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was
 * born and I will give you a complete account of the system, and expound the actual teachings of
 * the great explorer of the truth, the master-builder of human happiness. ADDING SOME INFORMATION HERE. No one rejects, dislikes,
 * or avoids pleasure itself, because it is pleasure, but because those who do not know how to
 * pursue pleasure rationally encounter consequences that are extremely painful.
 */
```

Oh no! Now we have to manually re-adjust the next N lines of the block in order to keep everything aligned.

This annoying problem is why the [`isaacscript/format-jsdoc-comments`](docs/rules/complete-sentences-jsdoc.md) rule exists. After adding the "ADDING SOME INFORMATION HERE", all we have to do is save the file, and all of the subsequent lines will be automatically adjusted.

<br>

## Using Line Comments With a Ruler

The same problem happens with multi-line _leading line comments_:

```ts
// But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was
// born and I will give you a complete account of the system, and expound the actual teachings of
// the great explorer of the truth, the master-builder of human happiness. ADDING SOME INFORMATION HERE. No one rejects, dislikes,
// or avoids pleasure itself, because it is pleasure, but because those who do not know how to
// pursue pleasure rationally encounter consequences that are extremely painful.
```

After adding "ADDING INFORMATION HERE", we have to manually re-adjust the next N lines of the block in order to keep everything aligned.

Similar to the `format-jsdoc-comments` rule, the [`isaacscript/format-line-comments`](rules/format-line-comments.md) rule saves us from the tedium of manually formatting.

<br>

## Consistency With Line Comments and JSDoc Comments

You might notice that in general, there is a bit of asymmetry between JSDoc comments and _leading line comments_.

Specifically, you might already know that you are supposed to use complete sentences for JSDoc comments. But you might not use complete sentences for your _leading line comments_. For example:

```ts
// This is how we do things here
// I don't know why
// It's just the way it is
```

In this style, line breaks are used instead of periods. This kind of style can look nice under certain circumstances. But once we are committed to using the `format-line-comments` rule, this style becomes an anti-pattern, because the rule will change it to this:

```ts
// This is how we do things here I don't know why It's just the way it is
```

In order to prevent this from happening, the [`isaacscript/complete-sentences-line-comments`](rules/complete-sentences-line-comments.md) rule forces you to use complete sentences for any _leading line comment_. In the previous example, once we use complete sentences, it gets auto-formatted to this:

```ts
// This is how we do things here. I don't know why. It's just the way it is.
```

Much better!

Even if you don't use the `format-line-comments` rule, having consistency between JSDoc comments and line comments is a good thing. Why should JSDoc comments be styled one way (with complete sentences) and _leading line comments_ styled another way (without complete sentences)? Having a mismatch here is distracting for someone reading the code, and confusing for someone trying to work on the code: "Am I supposed to use punctuation here or not?" Better to make things always consistent.

Finally, note that complete-sentences are not enforced for certain kinds of single-line _leading line comments_. For example, the rule allows you to make quick annotations like this:

```ts
// Local variables
let a;
let b;
let c;

// Constants
const foo = 123;
const bar = 456;
```

All of the rules in this plugin are designed to try and be as smart as possible. They are trying to hit the sweet spot between false positives and false negatives. You can open a GitHub issue if you find a situation where this rule should be smarter.
