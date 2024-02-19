# `prefer-postfix-plusplus`

Require `i++` instead of `++i` (and `i--` instead of `--i`).

## Rule Details

Most of the time, the `++` operator is used inside of a for loop, which is pretty easy to understand. In this simple case, switching `i++` to `++i` does not functionally change the program in any way. However, this is not always the case. In some situations, changing `++i` to `i++` _does_ result in functionally different code. In these cases, it is usually done specifically by the programmer to take take advantage of the prefix functionality.

Sometimes, using prefix `++` and `--` is the most concise way to write code. But since this usage is so rare in JavaScript/TypeScript, other people reading the code can get confused. So, it can be a good idea to replace prefix operators with more standard code, which can make things a bit less arcane at the cost of a little verbosity.

Thus, this rule is meant to be used with the [`no-unsafe-plusplus`](no-unsafe-plusplus.md) ESLint rule, which ensures that code like in the previous example can be identified and removed. The remaining cases of `++i` in your code-base can be safety converted to the more-standard `i++`, which will make your code more uniform.

```ts
// Bad
++foo;
--foo;

// Good
foo++;
foo--;
```

## Options and Defaults

```json
{
  "rules": {
    "isaacscript/prefer-postfix-plusplus": "error"
  }
}
```

This rule is not configurable.

## Resources

- [How to use this rule](../../README.md#install--usage)
- [Rule source](../../src/rules/prefer-postfix-plusplus.ts)
- [Test source](../../tests/rules/prefer-postfix-plusplus.test.ts)
