import type { TSESLint } from "@typescript-eslint/utils";
import type { MessageIds, Options } from "../../src/rules/strict-enums";
import { strictEnums } from "../../src/rules/strict-enums";
import { ruleTester } from "../utils";
import { fruitEnumDefinition } from "./strict-enums";

const valid: Array<TSESLint.ValidTestCase<Options>> = [];
const invalid: Array<TSESLint.InvalidTestCase<MessageIds, Options>> = [];

valid.push({
  name: "Incrementing a number (postfix)",
  code: `${fruitEnumDefinition}
let fruit = 0;
fruit++;
  `,
});

invalid.push({
  name: "Incrementing a number enum value (postfix)",
  code: `${fruitEnumDefinition}
let fruit = Fruit.Apple;
fruit++;
  `,
  errors: [{ messageId: "incorrectIncrement" }],
});

valid.push({
  name: "Decrementing a number (postfix)",
  code: `${fruitEnumDefinition}
let fruit = 1;
fruit--;
  `,
});

invalid.push({
  name: "Decrementing a number enum value (postfix)",
  code: `${fruitEnumDefinition}
let fruit = Fruit.Banana;
fruit--;
  `,
  errors: [{ messageId: "incorrectIncrement" }],
});

valid.push({
  name: "Incrementing a number (prefix)",
  code: `${fruitEnumDefinition}
let fruit = 0;
++fruit;
  `,
});

invalid.push({
  name: "Incrementing a number enum value (prefix)",
  code: `${fruitEnumDefinition}
let fruit = Fruit.Apple;
++fruit;
  `,
  errors: [{ messageId: "incorrectIncrement" }],
});

valid.push({
  name: "Decrementing a number (prefix)",
  code: `${fruitEnumDefinition}
let fruit = 1;
--fruit
  `,
});

invalid.push({
  name: "Decrementing a number enum value (prefix)",
  code: `${fruitEnumDefinition}
let fruit = Fruit.Banana;
--fruit;
  `,
  errors: [{ messageId: "incorrectIncrement" }],
});

valid.push({
  name: "Incrementing a number (assignment operator)",
  code: `${fruitEnumDefinition}
let fruit = 0;
fruit += 1;
  `,
});

invalid.push({
  name: "Incrementing a number enum value (assignment operator)",
  code: `${fruitEnumDefinition}
let fruit = Fruit.Apple;
fruit += 1;
  `,
  errors: [{ messageId: "mismatchedAssignment" }],
});

valid.push({
  name: "Decrementing a number (assignment operator)",
  code: `${fruitEnumDefinition}
let fruit = 1;
fruit -= 1;
  `,
});

invalid.push({
  name: "Decrementing a number enum value (assignment operator)",
  code: `${fruitEnumDefinition}
let fruit = Fruit.Banana;
fruit -= 1;
  `,
  errors: [{ messageId: "mismatchedAssignment" }],
});

ruleTester.run("strict-enums-incrementing", strictEnums, {
  valid,
  invalid,
});
