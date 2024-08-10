import type { TSESLint } from "@typescript-eslint/utils";
import type {
  MessageIds,
  Options,
} from "../../src/rules/no-unnecessary-assignment.js";
import { noUnnecessaryAssignment } from "../../src/rules/no-unnecessary-assignment.js";
import { ruleTester } from "../utils.js";

const valid: Array<TSESLint.ValidTestCase<Options>> = [];
const invalid: Array<TSESLint.InvalidTestCase<MessageIds, Options>> = [];

valid.push({
  name: "normal boolean assignment expression with literal",
  code: `
declare let foo: boolean;
foo = true;
    `,
});

invalid.push({
  name: "useless boolean assignment expression with literal",
  code: `
declare let foo: true;
foo = true;
    `,
  errors: [{ messageId: "unnecessary" }],
});

valid.push({
  name: "normal boolean assignment expression with variable",
  code: `
declare let foo: boolean;
declare let bar: boolean;
foo = bar;
    `,
});

invalid.push({
  name: "useless boolean assignment expression with variable",
  code: `
declare let foo: true;
declare let bar: true;
foo = bar;
    `,
  errors: [{ messageId: "unnecessary" }],
});

valid.push({
  name: "normal number assignment expression with literal",
  code: `
declare let foo: number;
foo = 123;
    `,
});

invalid.push({
  name: "invalid number assignment expression with literal",
  code: `
declare let foo: 123;
foo = 123;
    `,
  errors: [{ messageId: "unnecessary" }],
});

valid.push({
  name: "normal number assignment expression with variable",
  code: `
declare let foo: number;
declare let bar: 123;
foo = bar;
    `,
});

invalid.push({
  name: "invalid number assignment expression with variable",
  code: `
declare let foo: 123;
declare let bar: 123;
foo = bar;
    `,
  errors: [{ messageId: "unnecessary" }],
});

valid.push({
  name: "normal string assignment expression with literal",
  code: `
declare let foo: string;
foo = "foo";
    `,
});

invalid.push({
  name: "invalid string assignment expression with literal",
  code: `
declare let foo: "foo";
foo = "foo";
    `,
  errors: [{ messageId: "unnecessary" }],
});

valid.push({
  name: "normal string assignment expression with variable",
  code: `
declare let foo: string;
declare let bar: "foo";
foo = bar;
    `,
});

invalid.push({
  name: "invalid string assignment expression with variable",
  code: `
declare let foo: "foo";
declare let bar: "foo";
foo = bar;
    `,
  errors: [{ messageId: "unnecessary" }],
});

valid.push({
  name: "normal assignment with string enum member literal",
  code: `
enum Foo {
  Value1 = "Value1",
  Value2 = "Value2",
}
declare let foo: Foo.Value1;
foo = Foo.Value2;
    `,
});

invalid.push({
  name: "invalid assignment with string enum member literal",
  code: `
enum Foo {
  Value1 = "Value1",
  Value2 = "Value2",
}
declare let foo: Foo.Value1;
foo = Foo.Value1;
    `,
  errors: [{ messageId: "unnecessary" }],
});

valid.push({
  name: "normal assignment with string enum member variable",
  code: `
enum Foo {
  Value1 = "Value1",
  Value2 = "Value2",
}
declare let foo: Foo.Value1;
declare let bar: Foo.Value2;
foo = bar;
    `,
});

invalid.push({
  name: "invalid assignment with string enum member variable",
  code: `
enum Foo {
  Value1 = "Value1",
  Value2 = "Value2",
}
declare let foo: Foo.Value1;
declare let bar: Foo.Value1;
foo = bar;
    `,
  errors: [{ messageId: "unnecessary" }],
});

valid.push({
  name: "normal assignment with number enum member literal",
  code: `
enum Foo {
  Value1,
  Value2,
}
declare let foo: Foo.Value1;
foo = Foo.Value2;
    `,
});

invalid.push({
  name: "invalid assignment with number enum member literal",
  code: `
enum Foo {
  Value1,
  Value2,
}
declare let foo: Foo.Value1;
foo = Foo.Value1;
    `,
  errors: [{ messageId: "unnecessary" }],
});

valid.push({
  name: "normal assignment with number enum member variable",
  code: `
enum Foo {
  Value1,
  Value2,
}
declare let foo: Foo.Value1;
declare let bar: Foo.Value2;
foo = bar;
    `,
});

invalid.push({
  name: "invalid assignment with number enum member variable",
  code: `
enum Foo {
  Value1,
  Value2,
}
declare let foo: Foo.Value1;
declare let bar: Foo.Value1;
foo = bar;
    `,
  errors: [{ messageId: "unnecessary" }],
});

valid.push({
  name: "normal assignment with string enum variable",
  code: `
enum Foo {
  Value1 = "Value1",
  Value2 = "Value2",
}
declare let foo: Foo;
declare let bar: Foo;
foo = bar;
    `,
});

valid.push({
  name: "normal assignment with number enum variable",
  code: `
enum Foo {
  Value1,
  Value2,
}
declare let foo: Foo;
declare let bar: Foo;
foo = bar;
    `,
});

valid.push({
  name: "assignment with generic type",
  code: `
declare let foo: Set<string>;
declare let bar: Set<string>;
foo = bar;
    `,
});

valid.push({
  name: "adding 1 with equal and literal",
  code: `
declare let foo: number;
foo = foo + 1;
    `,
});

invalid.push({
  name: "adding 0 with equal and literal",
  code: `
declare let foo: number;
foo = foo + 0;
    `,
  errors: [{ messageId: "unnecessaryZero" }],
});

valid.push({
  name: "adding 1 with = and variable",
  code: `
declare let foo: number;
declare let bar: 1;
foo = foo + bar;
    `,
});

valid.push({
  name: "adding 0 with equal and variable",
  code: `
declare let foo: number;
declare let bar: 0;
foo = foo + bar;
    `,
});

valid.push({
  name: "adding 1 with plus-equal and literal",
  code: `
declare let foo: number;
foo += 1;
    `,
});

invalid.push({
  name: "adding 0 with plus-equal and literal",
  code: `
declare let foo: number;
foo += 0;
    `,
  errors: [{ messageId: "unnecessaryZero" }],
});

valid.push({
  name: "adding 1 with plus-equal and variable",
  code: `
declare let foo: number;
declare let bar: 1;
foo += bar;
    `,
});

valid.push({
  name: "adding 0 with plus-equal and variable",
  code: `
declare let foo: number;
declare let bar: 0;
foo += bar;
    `,
});

valid.push({
  name: "adding a with equal and literal",
  code: `
declare let foo: string;
foo = foo + "a";
    `,
});

invalid.push({
  name: "adding empty string with equal and literal",
  code: `
declare let foo: string;
foo = foo + "";
    `,
  errors: [{ messageId: "unnecessaryEmptyString" }],
});

valid.push({
  name: "adding a with equal and variable",
  code: `
declare let foo: string;
declare let bar: "a"
foo = foo + bar;
    `,
});

valid.push({
  name: "adding empty string with equal and variable",
  code: `
declare let foo: string;
declare let bar: ""
foo = foo + bar;
    `,
});

valid.push({
  name: "adding a with plus-equal and literal",
  code: `
declare let foo: string;
foo += "a";
    `,
});

invalid.push({
  name: "adding empty string with plus-equal and literal",
  code: `
declare let foo: string;
foo += "";
    `,
  errors: [{ messageId: "unnecessaryEmptyString" }],
});

valid.push({
  name: "adding a with plus-equal and variable",
  code: `
declare let foo: string;
declare let bar: "a";
foo += bar;
    `,
});

valid.push({
  name: "adding empty string with plus-equal and variable",
  code: `
declare let foo: string;
declare let bar: "";
foo += bar;
    `,
});

valid.push({
  name: "normal boolean short-circuit with pipe-pipe and literal",
  code: `
declare const foo: boolean;
const bar = foo || true;
    `,
});

invalid.push({
  name: "invalid boolean short-circuit with pipe-pipe and literal",
  code: `
declare const foo: boolean;
const bar = foo || false;
    `,
  errors: [{ messageId: "unnecessaryShortCircuit" }],
});

valid.push({
  name: "normal boolean short-circuit with pipe-pipe and variable",
  code: `
declare const foo: boolean;
declare const bar: true;
const baz = foo || bar;
    `,
});

invalid.push({
  name: "invalid boolean short-circuit with pipe-pipe and variable",
  code: `
declare const foo: boolean;
declare const bar: false;
const baz = foo || bar;
    `,
  errors: [{ messageId: "unnecessaryShortCircuit" }],
});

valid.push({
  name: "normal boolean short-circuit with ampersand-ampersand and literal",
  code: `
declare const foo: boolean;
const bar = foo && false;
    `,
});

invalid.push({
  name: "invalid boolean short-circuit with ampersand-ampersand and literal",
  code: `
declare const foo: boolean;
const bar = foo && true;
    `,
  errors: [{ messageId: "unnecessaryShortCircuit" }],
});

valid.push({
  name: "normal boolean short-circuit with ampersand-ampersand and variable",
  code: `
declare const foo: boolean;
declare const bar: false;
const baz = foo && bar;
    `,
});

invalid.push({
  name: "invalid boolean short-circuit with ampersand-ampersand and variable",
  code: `
declare const foo: boolean;
declare const bar: true;
const baz = foo && bar;
    `,
  errors: [{ messageId: "unnecessaryShortCircuit" }],
});

valid.push({
  name: "normal number short-circuit with pipe-pipe and literal",
  code: `
declare const foo: number;
const bar = foo || 1;
    `,
});

invalid.push({
  name: "invalid number short-circuit with pipe-pipe and literal",
  code: `
declare const foo: number;
const bar = foo || 0;
    `,
  errors: [{ messageId: "unnecessaryShortCircuit" }],
});

valid.push({
  name: "normal number short-circuit with pipe-pipe and variable",
  code: `
declare const foo: number;
declare const bar: 1;
const baz = foo || bar;
    `,
});

invalid.push({
  name: "invalid number short-circuit with pipe-pipe and variable",
  code: `
declare const foo: number;
declare const bar: 0;
const baz = foo || bar;
    `,
  errors: [{ messageId: "unnecessaryShortCircuit" }],
});

valid.push({
  name: "normal string short-circuit with pipe-pipe and literal",
  code: `
declare const foo: string;
const bar = foo || "a";
    `,
});

invalid.push({
  name: "invalid string short-circuit with pipe-pipe and literal",
  code: `
declare const foo: string;
const bar = foo || "";
    `,
  errors: [{ messageId: "unnecessaryShortCircuit" }],
});

valid.push({
  name: "normal string short-circuit with pipe-pipe and variable",
  code: `
declare const foo: string;
declare const bar: "a";
const baz = foo || bar;
    `,
});

invalid.push({
  name: "invalid string short-circuit with pipe-pipe and variable",
  code: `
declare const foo: string;
declare const bar: "";
const baz = foo || bar;
    `,
  errors: [{ messageId: "unnecessaryShortCircuit" }],
});

valid.push({
  name: "normal boolean union short-circuit with pipe-pipe and literal true",
  code: `
declare const foo: boolean | null;
const bar = foo || true;
    `,
});

valid.push({
  name: "normal boolean union short-circuit with pipe-pipe and literal false",
  code: `
declare const foo: boolean | null;
const bar = foo || false;
    `,
});

valid.push({
  name: "normal short-circuit with question-mark-question-mark and literal null",
  code: `
declare const foo: string | null | undefined;
const bar = foo ?? null;
    `,
});

invalid.push({
  name: "invalid short-circuit with question-mark-question-mark and literal null (1)",
  code: `
declare const foo: null;
const bar = foo ?? null;
    `,
  errors: [{ messageId: "unnecessaryShortCircuit" }],
});

invalid.push({
  name: "invalid short-circuit with question-mark-question-mark and literal null (2)",
  code: `
declare const foo: string | null;
const bar = foo ?? null;
    `,
  errors: [{ messageId: "unnecessaryShortCircuit" }],
});

valid.push({
  name: "normal short-circuit with question-mark-question-mark and variable null",
  code: `
declare const foo: string | null | undefined;
declare const bar: null;
const baz = foo ?? bar;
    `,
});

invalid.push({
  name: "invalid short-circuit with question-mark-question-mark and variable null (1)",
  code: `
declare const foo: null;
declare const bar: null;
const baz = foo ?? bar;
    `,
  errors: [{ messageId: "unnecessaryShortCircuit" }],
});

invalid.push({
  name: "invalid short-circuit with question-mark-question-mark and variable null (2)",
  code: `
declare const foo: string | null;
declare const bar: null;
const baz = foo ?? bar;
    `,
  errors: [{ messageId: "unnecessaryShortCircuit" }],
});

valid.push({
  name: "normal short-circuit with question-mark-question-mark and literal undefined",
  code: `
declare const foo: string | null | undefined;
const bar = foo ?? undefined;
    `,
});

invalid.push({
  name: "invalid short-circuit with question-mark-question-mark and literal undefined (1)",
  code: `
declare const foo: string | undefined;
const bar = foo ?? undefined;
    `,
  errors: [{ messageId: "unnecessaryShortCircuit" }],
});

invalid.push({
  name: "invalid short-circuit with question-mark-question-mark and literal undefined (2)",
  code: `
declare const foo: undefined;
const bar = foo ?? undefined;
    `,
  errors: [{ messageId: "unnecessaryShortCircuit" }],
});

valid.push({
  name: "normal short-circuit with question-mark-question-mark and variable undefined",
  code: `
declare const foo: string | null | undefined;
declare const bar: undefined;
const baz = foo ?? bar;
    `,
});

invalid.push({
  name: "invalid short-circuit with question-mark-question-mark and variable undefined (1)",
  code: `
declare const foo: string | undefined;
declare const bar: undefined;
const baz = foo ?? bar;
    `,
  errors: [{ messageId: "unnecessaryShortCircuit" }],
});

invalid.push({
  name: "invalid short-circuit with question-mark-question-mark and variable undefined (2)",
  code: `
declare const foo: undefined;
declare const bar: undefined;
const baz = foo ?? bar;
    `,
  errors: [{ messageId: "unnecessaryShortCircuit" }],
});

valid.push({
  name: "normal logical expression assignment with existing variable",
  code: `
declare const foo: boolean;
declare let bar: boolean;
bar = foo || true;
    `,
});

invalid.push({
  name: "invalid logical expression assignment with existing variable",
  code: `
declare const foo: boolean;
declare let bar: boolean;
bar = foo || false;
    `,
  errors: [{ messageId: "unnecessaryShortCircuit" }],
});

ruleTester.run("no-unnecessary-assignment", noUnnecessaryAssignment, {
  valid,
  invalid,
});
