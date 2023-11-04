import type { TSESLint } from "@typescript-eslint/utils";
import type {
  MessageIds,
  Options,
} from "../../src/rules/require-capital-const-assertions";
import { requireCapitalConstAssertions } from "../../src/rules/require-capital-const-assertions";
import { ruleTester } from "../utils";

const valid: Array<TSESLint.ValidTestCase<Options>> = [];
const invalid: Array<TSESLint.InvalidTestCase<MessageIds, Options>> = [];

valid.push({
  name: "Object acting as a number enum with const assertion",
  code: `
const Foo = {
  Value1: 1,
  Value2: 2,
  Value3: 3,
} as const;
  `,
});

invalid.push({
  name: "Object acting as a number enum without const assertion",
  code: `
const Foo = {
  Value1: 1,
  Value2: 2,
  Value3: 3,
};
  `,
  errors: [{ messageId: "noConstAssertion" }],
  output: `
const Foo = {
  Value1: 1,
  Value2: 2,
  Value3: 3,
} as const;
  `,
});

valid.push({
  name: "Object acting as a static map with const assertion",
  code: `
const FOO = {
  [MyEnum.Value1]: "something1",
  [MyEnum.Value2]: "something2",
  [MyEnum.Value3]: "something3",
} as const;
  `,
});

valid.push({
  name: "Object acting as a static map with const assertion and satisfies",
  code: `
const FOO = {
  [MyEnum.Value1]: "something1",
  [MyEnum.Value2]: "something2",
  [MyEnum.Value3]: "something3",
} as const satisfies Record<MyEnum, string>;
  `,
});

invalid.push({
  name: "Object acting as a static map without const assertion",
  code: `
const FOO = {
  [MyEnum.Value1]: "something1",
  [MyEnum.Value2]: "something2",
  [MyEnum.Value3]: "something3",
};
  `,
  errors: [{ messageId: "noConstAssertion" }],
  output: `
const FOO = {
  [MyEnum.Value1]: "something1",
  [MyEnum.Value2]: "something2",
  [MyEnum.Value3]: "something3",
} as const;
  `,
});

invalid.push({
  name: "Object acting as a static map without const assertion and satisfies",
  code: `
const FOO = {
  [MyEnum.Value1]: "something1",
  [MyEnum.Value2]: "something2",
  [MyEnum.Value3]: "something3",
} satisfies Record<MyEnum, string>;
  `,
  errors: [{ messageId: "noConstAssertion" }],
});

valid.push({
  name: "Empty object assignment with const assertion",
  code: `
const Foo = {} as const;
  `,
});

invalid.push({
  name: "Empty object assignment without const assertion",
  code: `
const Foo = {};
  `,
  errors: [{ messageId: "noConstAssertion" }],
  output: `
const Foo = {} as const;
  `,
});

valid.push({
  name: "Lowercase object",
  code: `
const myObject = {};
  `,
});

invalid.push({
  name: "Array constant declaration without const assertion",
  code: `
const MY_CONSTANT = [1, 2, 3];
  `,
  errors: [{ messageId: "noConstAssertion" }],
  output: `
const MY_CONSTANT = [1, 2, 3] as const;
  `,
});

valid.push({
  name: "Empty array constant declaration with const assertion",
  code: `
const MY_CONSTANT = [] as const;
  `,
});

invalid.push({
  name: "Empty array constant declaration without const assertion",
  code: `
const MY_CONSTANT = [];
  `,
  errors: [{ messageId: "noConstAssertion" }],
  output: `
const MY_CONSTANT = [] as const;
  `,
});

valid.push({
  name: "Lowercase array",
  code: `
const myArray = [];
  `,
});

valid.push({
  name: "Number constant declaration",
  code: `
const MY_CONSTANT = 123;
  `,
});

valid.push({
  name: "String constant declaration",
  code: `
const MY_CONSTANT = "foo";
  `,
});

valid.push({
  name: "Array constant declaration with const assertion",
  code: `
const MY_CONSTANT = [1, 2, 3] as const;
  `,
});

ruleTester.run(
  "require-capital-const-assertions",
  requireCapitalConstAssertions,
  {
    valid,
    invalid,
  },
);
