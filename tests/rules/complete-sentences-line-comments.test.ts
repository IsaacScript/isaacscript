import { TSESLint } from "@typescript-eslint/utils";
import {
  completeSentencesLineComments,
  MessageIds,
} from "../../src/rules/complete-sentences-line-comments";
import { ruleTester } from "../utils";

const valid: Array<TSESLint.ValidTestCase<unknown[]>> = [];
const invalid: Array<TSESLint.InvalidTestCase<MessageIds, unknown[]>> = [];

valid.push({
  name: "Single-line comment without complete sentence",
  code: `
// this is not a complete sentence.
  `,
});

valid.push({
  name: "Comment with complete sentence",
  code: `
// This is a complete
// sentence.
  `,
});

invalid.push({
  name: "Comment without a capital",
  code: `
// sometimes I forget to capitalize
// my sentences.
  `,
  errors: [{ messageId: "missingCapital" }],
});

invalid.push({
  name: "Comment without a period",
  code: `
// Sometimes I forget to put a period on
// my comments
  `,
  errors: [{ messageId: "missingPeriod" }],
});

valid.push({
  name: "Blank comments",
  code: `
//

//
//

//
//
//
  `,
});

valid.push({
  name: "Comment with a URL and without trailing text",
  code: `
// Taken from ESLint:
// https://github.com/eslint/eslint/blob/main/lib/rules/max-len.js
  `,
});

valid.push({
  name: "Comment with a URL and with trailing text",
  code: `
// The TypeScript config extends it:
// https://github.com/iamturns/eslint-config-airbnb-typescript/blob/master/lib/shared.js
// (This includes the "parser" declaration of "@typescript-eslint/parser".)
  `,
});

valid.push({
  name: "Comment with a colon and bullet points of non-complete items",
  code: `
// This is my list of things:
//
// - first thing
//   - sub-first thing
// - second thing
  `,
});

valid.push({
  name: "Comment with complete sentence in quotes",
  code: `
// "foo" refers to
// the "baz".
  `,
});

invalid.push({
  name: "Comment with incomplete sentence in quotes",
  code: `
// "foo" refers to
// the "baz"
  `,
  errors: [{ messageId: "missingPeriod" }],
});

valid.push({
  name: "Multi-line comment with a complete sentence in quotes",
  code: `
// "But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain
// was born and I will."
  `,
});

invalid.push({
  name: "Multi-line comment with a incomplete sentence in quotes",
  code: `
// "But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain
// was born and I will"
  `,
  errors: [{ messageId: "missingPeriod" }],
});

valid.push({
  name: "Comment with colon ending with code",
  code: `
// This is a line.
// For example: \`foo()\`
  `,
});

invalid.push({
  name: "Comment without colon ending with code",
  code: `
// This is a line.
// For example \`foo()\`
  `,
  errors: [{ messageId: "missingPeriod" }],
});

valid.push({
  name: "Comment using e.g. and no period",
  code: `
// The static methods in this class can only be called by a global variable.
// e.g. \`Foo.Bar()\`
  `,
});

valid.push({
  name: "Comment using a question",
  code: `
// This is a line.
// What is the meaning of life?
  `,
});

valid.push({
  name: "Comment using a numeric literal",
  code: `
// This is a foo.
//
// 1 << 1
  `,
});

ruleTester.run(
  "complete-sentences-line-comments",
  completeSentencesLineComments,
  {
    valid,
    invalid,
  },
);
