# `prefer-plusplus`

Require `++` or `--` operators instead of assignment operators where applicable.

## Rule Details

The [`operator-assignment`](https://eslint.org/docs/latest/rules/operator-assignment) ESLint rule converts `x = x + 1` to `x += 1`. This is a fantastic rule because it makes code more concise and easier to read. (Technically, the code would be more confusing for people who don't know what the "+=" operator does, but this is not an issue in most cases.)

Building on this logic, it also makes sense to convert `x += 1` to `x++`, which is even more concise and easier to read. (Again, we make the assumption that everyone knows what the "++" operator does, which should be a pretty safe bet.)

However, the `++` operator is historically controversial in JavaScript. For example, [the Airbnb style guide gives this justification](https://github.com/airbnb/javascript#variables--unary-increment-decrement):

> Why? Per the eslint documentation, unary increment and decrement statements are subject to automatic semicolon insertion and can cause silent errors with incrementing or decrementing values within an application. It is also more expressive to mutate your values with statements like `num += 1` instead of `num++` or `num ++`. Disallowing unary increment and decrement statements also prevents you from pre-incrementing/pre-decrementing values unintentionally which can also cause unexpected behavior in your programs.

This justification does not apply if you use the combination of:

- The [Prettier](https://prettier.io/) autoformatter (which automatically inserts semicolons for you)
- The [`isaacscript/no-unsafe-plusplus`](no-unsafe-plusplus.md) rule (which prevents usage of `++i` where swapping it to `i++` would change the functionality of the program)
- The [`isaacscript/prefer-postfix-plusplus`](prefer-postfix-plusplus) rule (which prevents usage of `++i` in favor of `i++`)

Together, these heavily restrict the usage of the operator, making the only legal usage equal to that of "+= 1".

```ts
// Bad
i += 1;

// Good
i++;
```

## Options and Defaults

```json
{
  "rules": {
    "isaacscript/prefer-plusplus": "error"
  }
}
```

This rule is not configurable.

## Resources

- [How to use this rule](../README.md#install--usage)
- [Rule source](../../src/rules/prefer-plusplus.ts)
- [Test source](../../tests/rules/prefer-plusplus.test.ts)
