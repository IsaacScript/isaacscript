import { TSESLint } from "@typescript-eslint/utils";
import {
  limitSlashSlashComments,
  MessageIds,
} from "../../src/rules/limit-slash-slash-comments";
import { ruleTester } from "../utils";

const valid: TSESLint.ValidTestCase<unknown[]>[] = [];
const invalid: TSESLint.InvalidTestCase<MessageIds, unknown[]>[] = [];

valid.push({
  name: "Using a single-line JSDoc comment that is too long",
  code: `
/** But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will */
  `,
});

valid.push({
  name: "Using a single-line comment with exactly 100 characters",
  code: `
// But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was
  `,
});

invalid.push({
  name: "Using a single-line comment with exactly 101 characters",
  code: `
// But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain felt
  `,
  errors: [{ messageId: "incorrectlyFormatted" }],
  output: `
// But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain
// felt
  `,
});

invalid.push({
  name: "Using a single-line comment with no preceding or trailing whitespace",
  code: `// But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will`,
  errors: [{ messageId: "incorrectlyFormatted" }],
  output: `// But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was
// born and I will`,
});

valid.push({
  name: "Using a multi-line comment with exactly 100 characters",
  code: `
// But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was
// born and I will give you a complete account of the system
    `,
});

invalid.push({
  name: "Using a multi-line comment that is too long",
  code: `
// But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and
// I will give you a complete account of the system
  `,
  errors: [{ messageId: "incorrectlyFormatted" }],
  output: `
// But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was
// born and I will give you a complete account of the system
  `,
});

invalid.push({
  name: "Using a multi-line comment with with many long lines",
  code: `
// But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will
// give you a complete account of the system, and expound the actual teachings of the great explorer of the truth, the master-builder
// of human happiness. No one rejects, dislikes, or avoids pleasure itself, because it is pleasure, but because those who do not know how
// to pursue pleasure rationally encounter consequences that are extremely painful.
  `,
  errors: [{ messageId: "incorrectlyFormatted" }],
  output: `
// But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was
// born and I will give you a complete account of the system, and expound the actual teachings of
// the great explorer of the truth, the master-builder of human happiness. No one rejects, dislikes,
// or avoids pleasure itself, because it is pleasure, but because those who do not know how to
// pursue pleasure rationally encounter consequences that are extremely painful.
  `,
});

valid.push({
  name: "Using a multi-line comment with with exactly 100 characters inside a function",
  code: `
function foo() {
  // But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain a
}
  `,
});

invalid.push({
  name: "Using a multi-line comment with with exactly 101 characters inside a function",
  code: `
function foo() {
  // But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain as
}
  `,
  errors: [{ messageId: "incorrectlyFormatted" }],
  output: `
function foo() {
  // But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain
  // as
}
  `,
});

invalid.push({
  name: "Using a multi-line comment with that is too long inside a function",
  code: `
function foo() {
  // But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was
  // born and I will give you a complete account of the system
}
  `,
  errors: [{ messageId: "incorrectlyFormatted" }],
  output: `
function foo() {
  // But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain
  // was born and I will give you a complete account of the system
}
  `,
});

invalid.push({
  name: "Using a multi-line comment with many long lines inside a function",
  code: `
function foo() {
  // But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will
  // give you a complete account of the system, and expound the actual teachings of the great explorer of the truth, the master-builder
  // of human happiness. No one rejects, dislikes, or avoids pleasure itself, because it is pleasure, but because those who do not know how
  // to pursue pleasure rationally encounter consequences that are extremely painful.
}
  `,
  errors: [{ messageId: "incorrectlyFormatted" }],
  output: `
function foo() {
  // But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain
  // was born and I will give you a complete account of the system, and expound the actual teachings
  // of the great explorer of the truth, the master-builder of human happiness. No one rejects,
  // dislikes, or avoids pleasure itself, because it is pleasure, but because those who do not know
  // how to pursue pleasure rationally encounter consequences that are extremely painful.
}
  `,
});

invalid.push({
  name: "Using a multi-line comment that can be combined",
  code: `
// I love cookies.
// But not cake.
  `,
  errors: [{ messageId: "incorrectlyFormatted" }],
  output: `
// I love cookies. But not cake.
  `,
});

invalid.push({
  name: "Using a multi-line comment that has many code blocks",
  code: `
// But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born

// and I will give you a complete account of the system, and expound the actual teachings of the great
// explorer of the truth, the master-builder of human happiness. No one rejects, dislikes, or avoids pleasure


// itself, because it is pleasure, but because those who do not know how to pursue pleasure rationally
// encounter consequences that are extremely painful. Nor again is there anyone who loves or pursues or
// desires to obtain pain of itself, because it is pain, but because occasionally circumstances occur
  `,
  errors: [
    { messageId: "incorrectlyFormatted" },
    { messageId: "incorrectlyFormatted" },
    { messageId: "incorrectlyFormatted" },
  ],
  output: `
// But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was
// born

// and I will give you a complete account of the system, and expound the actual teachings of the
// great explorer of the truth, the master-builder of human happiness. No one rejects, dislikes, or
// avoids pleasure


// itself, because it is pleasure, but because those who do not know how to pursue pleasure
// rationally encounter consequences that are extremely painful. Nor again is there anyone who loves
// or pursues or desires to obtain pain of itself, because it is pain, but because occasionally
// circumstances occur
  `,
});

invalid.push({
  name: "Using a multi-line comment that has many code blocks inside a function",
  code: `
function foo() {
  // But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born

  // and I will give you a complete account of the system, and expound the actual teachings of the great
  // explorer of the truth, the master-builder of human happiness. No one rejects, dislikes, or avoids pleasure

  // itself, because it is pleasure, but because those who do not know how to pursue pleasure rationally
  // encounter consequences that are extremely painful. Nor again is there anyone who loves or pursues or
  // desires to obtain pain of itself, because it is pain, but because occasionally circumstances occur
}
  `,
  errors: [
    { messageId: "incorrectlyFormatted" },
    { messageId: "incorrectlyFormatted" },
    { messageId: "incorrectlyFormatted" },
  ],
  output: `
function foo() {
  // But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain
  // was born

  // and I will give you a complete account of the system, and expound the actual teachings of the
  // great explorer of the truth, the master-builder of human happiness. No one rejects, dislikes,
  // or avoids pleasure

  // itself, because it is pleasure, but because those who do not know how to pursue pleasure
  // rationally encounter consequences that are extremely painful. Nor again is there anyone who
  // loves or pursues or desires to obtain pain of itself, because it is pain, but because
  // occasionally circumstances occur
}
  `,
});

invalid.push({
  name: "Using a multi-line comment with bullet points (with a newline before the bullets)",
  code: `
// Here is my list of things:
//
// - But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and
// - I will give you a complete account of the system, and expound the actual teachings of the great explorer of the
// truth, the master-builder of human happiness. No one rejects, dislikes, or avoids pleasure
// - itself, because it is pleasure, but because those who do not know how to pursue pleasure rationally encounter
  `,
  errors: [
    { messageId: "incorrectlyFormatted" },
    { messageId: "incorrectlyFormatted" },
    { messageId: "incorrectlyFormatted" },
  ],
  output: `
// Here is my list of things:
//
// - But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain
//   was born and
// - I will give you a complete account of the system, and expound the actual teachings of the great
//   explorer of the truth, the master-builder of human happiness. No one rejects, dislikes, or
//   avoids pleasure
// - itself, because it is pleasure, but because those who do not know how to pursue pleasure
//   rationally encounter
  `,
});

invalid.push({
  name: "Using a multi-line comment with bullet points (with no newline before the bullets)",
  code: `
// Here is my list of things:
// - But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and
// - I will give you a complete account of the system, and expound the actual teachings of the great explorer of the
// truth, the master-builder of human happiness. No one rejects, dislikes, or avoids pleasure
// - itself, because it is pleasure, but because those who do not know how to pursue pleasure rationally encounter
  `,
  errors: [
    { messageId: "incorrectlyFormatted" },
    { messageId: "incorrectlyFormatted" },
    { messageId: "incorrectlyFormatted" },
  ],
  output: `
// Here is my list of things:
// - But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain
//   was born and
// - I will give you a complete account of the system, and expound the actual teachings of the great
//   explorer of the truth, the master-builder of human happiness. No one rejects, dislikes, or
//   avoids pleasure
// - itself, because it is pleasure, but because those who do not know how to pursue pleasure
//   rationally encounter
  `,
});

invalid.push({
  name: "Using a multi-line comment with sub-bullet points",
  code: `
// Here is my list of things:
//
// - But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and
//   - I will give you a complete account of the system, and expound the actual teachings of the great explorer of the
// truth, the master-builder of human happiness. No one rejects, dislikes, or avoids pleasure
//   - itself, because it is pleasure, but because those who do not know how to pursue pleasure rationally encounter
// - consequences that are extremely painful.
  `,
  errors: [
    { messageId: "incorrectlyFormatted" },
    { messageId: "incorrectlyFormatted" },
    { messageId: "incorrectlyFormatted" },
  ],
  output: `
// Here is my list of things:
//
// - But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain
//   was born and
//   - I will give you a complete account of the system, and expound the actual teachings of the
//     great explorer of the truth, the master-builder of human happiness. No one rejects, dislikes,
//     or avoids pleasure
//   - itself, because it is pleasure, but because those who do not know how to pursue pleasure
//     rationally encounter
// - consequences that are extremely painful.
  `,
});

invalid.push({
  name: "Using a multi-line comment with bullet points with newlines in-between",
  code: `
// Here is my list of things:
//
// - But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and
//
// - I will give you a complete account of the system, and expound the actual teachings of the great explorer of the
// truth, the master-builder of human happiness. No one rejects, dislikes, or avoids pleasure
//
// - itself, because it is pleasure, but because those who do not know how to pursue pleasure rationally encounter
  `,
  errors: [
    { messageId: "incorrectlyFormatted" },
    { messageId: "incorrectlyFormatted" },
    { messageId: "incorrectlyFormatted" },
  ],
  output: `
// Here is my list of things:
//
// - But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain
//   was born and
//
// - I will give you a complete account of the system, and expound the actual teachings of the great
//   explorer of the truth, the master-builder of human happiness. No one rejects, dislikes, or
//   avoids pleasure
//
// - itself, because it is pleasure, but because those who do not know how to pursue pleasure
//   rationally encounter
  `,
});

valid.push({
  name: "Using a single-line comment with an unbreakable line",
  code: `
// AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA
  `,
});

invalid.push({
  name: "Using a single-line comment with an unbreakable line and other overflowing text",
  code: `
// But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA I will give you a complete account of the system
  `,
  errors: [{ messageId: "incorrectlyFormatted" }],
  output: `
// But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was
// born and
// AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA
// I will give you a complete account of the system
  `,
});

valid.push({
  name: "Using triple slash directives",
  code: `
/// <reference path="foo1.d.ts" />
/// <reference path="foo2.d.ts" />
  `,
});

valid.push({
  name: "Using triple slash directives with a leading comment",
  code: `
// This is my directive.
/// <reference path="foo1.d.ts" />
  `,
});

valid.push({
  name: "Using triple slash directives with a trailing comment",
  code: `
/// <reference path="foo1.d.ts" />
// This is my directive.
  `,
});

valid.push({
  name: "Using triple slash directives with a mix of comments",
  code: `
// This is my directive.
/// <reference path="foo1.d.ts" />
// This is my directive.
/// <reference path="foo2.d.ts" />
// This is my directive.
  `,
});

valid.push({
  name: "Using a block comment specified with hyphens",
  code: `
// ----------------
// Getter functions
// ----------------
  `,
});

valid.push({
  name: "Using a multi-line comment with a URL",
  code: `
// Documentation: https://github.com/jrdrg/eslint-plugin-sort-exports
// Not defined in parent configs.
  `,
});

invalid.push({
  name: "Using a multi-line comment with a URL that can be combined",
  code: `
// Documentation:
// https://github.com/jrdrg/eslint-plugin-sort-exports
// Not defined in parent configs.
  `,
  errors: [{ messageId: "incorrectlyFormatted" }],
  output: `
// Documentation: https://github.com/jrdrg/eslint-plugin-sort-exports
// Not defined in parent configs.
  `,
});

ruleTester.run("limit-slash-slash-comments", limitSlashSlashComments, {
  valid,
  invalid,
});
