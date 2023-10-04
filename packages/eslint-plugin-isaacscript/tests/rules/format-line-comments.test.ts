import type { TSESLint } from "@typescript-eslint/utils";
import type { MessageIds, Options } from "../../src/rules/format-line-comments";
import { formatLineComments } from "../../src/rules/format-line-comments";
import { ruleTester } from "../utils";

const valid: Array<TSESLint.ValidTestCase<Options>> = [];
const invalid: Array<TSESLint.InvalidTestCase<MessageIds, Options>> = [];

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
  code: "// But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will",
  errors: [{ messageId: "incorrectlyFormatted" }],
  output: `// But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was
// born and I will`,
});

valid.push({
  name: "Using a multi-line comment with exactly 100 characters and potential spillover",
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

// The extra newline in the expected output cannot be removed because this rule operates on
// individual comment blocks, and it has no notion of the whitespace in between comment blocks.
// Prettier will automatically remove extra trailing newlines between comments like this, so we do
// not have to make a rule to handle that in this plugin.
invalid.push({
  name: "Using a multi-line comment that has many code blocks and block separation",
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
  name: "Using a multi-line comment that has many code blocks and block separation inside a function",
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
  name: "Using a multi-line comment with bullet points with a newline before the bullets",
  code: `
// Here is my list of things:
//
// - But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and
// - I will give you a complete account of the system, and expound the actual teachings of the great explorer of the
// truth, the master-builder of human happiness. No one rejects, dislikes, or avoids pleasure
// - itself, because it is pleasure, but because those who do not know how to pursue pleasure rationally encounter
  `,
  errors: [{ messageId: "incorrectlyFormatted" }],
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
  name: "Using a multi-line comment with bullet points with no newline before the bullets",
  code: `
// Here is my list of things:
// - But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and
// - I will give you a complete account of the system, and expound the actual teachings of the great explorer of the
// truth, the master-builder of human happiness. No one rejects, dislikes, or avoids pleasure
// - itself, because it is pleasure, but because those who do not know how to pursue pleasure rationally encounter
  `,
  errors: [{ messageId: "incorrectlyFormatted" }],
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
  errors: [{ messageId: "incorrectlyFormatted" }],
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
  name: "Using a multi-line comment with different kinds of bullet points",
  code: `
function foo() {
  // Reads data from a client object, according to the specified read pattern. Patterns follow the
  // Lua file I/O format, and the difference in performance between all patterns is negligible.
  //
  // Pattern can be any of the following:
  //
  // - '*a': reads from the socket until the connection is closed. No end-of-line translation is
  //   performed.
  // - '*l': reads a line of text from the socket. The line is terminated by a LF character (ASCII
  //   10), optionally preceded by a CR character (ASCII 13). The CR and LF characters are not
  //   included in the returned line. In fact, all CR characters are ignored by the pattern. This is
  //   the default pattern.
  // - number: causes the method to read a specified number of bytes from the socket.
  //
  // Prefix is an optional string to be concatenated to the beginning of any received data before
  // return.
  //
  // If successful, the method returns the received pattern. In case of error, the method returns
  // undefined followed by an error message which can be the string "closed" in case the connection
  // was closed before the transmission was completed or the string "timeout" in case there was a
  // timeout during the operation. Also, after the error message, the function returns the partial
  // result of the transmission.
}
  `,
});

valid.push({
  name: "Multi-line comment with bullet points with colons and e.g.",
  code: `
// Allow ending with a quote or backtick if this is an example of something indicated with a colon
// or an "e.g" or an "i.e.", like:
// - Use the following code: \`foo()\`
// - e.g. \`Foo.Bar()\`
  `,
});

valid.push({
  name: "Using a multi-line comment that looks like a numbered bullet point",
  code: `
function foo() {
  // This method will crash the game if you provide it an invalid collectible type, such as -1 or
  // 43. (Using 0 will not cause a crash.) Thus, it is safer to use the \`RemoveCostume\` method
  // instead.
}
  `,
});

invalid.push({
  name: "Using a multi-line comment with very long bullet points",
  code: `
function foo() {
  // This is my list:
  //
  // - But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I
  // will give you a complete account of the system, and expound the actual teachings of the great explorer of the
  // truth, the master-builder of human happiness. No one rejects, dislikes, or avoids pleasure itself, because it
  // is pleasure, but because those who do not know how to pursue pleasure rationally encounter consequences
  // - that are extremely painful. Nor again is there anyone who loves or pursues or desires to obtain pain of itself,
  // because it is pain, but because occasionally circumstances occur in which toil and pain can procure him some great
  // pleasure. To take a trivial example, which of us ever undertakes laborious physical exercise, except to obtain some
  // advantage from it? But who has any right to find fault with a man who chooses to enjoy a pleasure that has no
  // annoying consequences, or one who avoids a pain that produces no resultant pleasure?
}
  `,
  errors: [{ messageId: "incorrectlyFormatted" }],
  output: `
function foo() {
  // This is my list:
  //
  // - But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain
  //   was born and I will give you a complete account of the system, and expound the actual
  //   teachings of the great explorer of the truth, the master-builder of human happiness. No one
  //   rejects, dislikes, or avoids pleasure itself, because it is pleasure, but because those who
  //   do not know how to pursue pleasure rationally encounter consequences
  // - that are extremely painful. Nor again is there anyone who loves or pursues or desires to
  //   obtain pain of itself, because it is pain, but because occasionally circumstances occur in
  //   which toil and pain can procure him some great pleasure. To take a trivial example, which of
  //   us ever undertakes laborious physical exercise, except to obtain some advantage from it? But
  //   who has any right to find fault with a man who chooses to enjoy a pleasure that has no
  //   annoying consequences, or one who avoids a pain that produces no resultant pleasure?
}
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
  name: "Using a multi-line comment with a URL",
  code: `
// Documentation: https://github.com/jrdrg/eslint-plugin-something
// Not defined in the parent configs.
  `,
});

valid.push({
  name: "Using a multi-line comment with a URL and a blank line",
  code: `
// It is not possible to get single-line comments in the AST:
// https://stackoverflow.com/questions/47429792/is-it-possible-to-get-comments-as-nodes-in-the-ast-using-the-typescript-compiler
//
// Thus, we need to write the rule in such a way that it operates on the entire source code instead
// of individual AST nodes.
  `,
});

valid.push({
  name: "Using a multi-line comment with a URL and an empty line",
  code: `
// It is not possible to get single-line comments in the AST:
// https://stackoverflow.com/questions/47429792/is-it-possible-to-get-comments-as-nodes-in-the-ast-using-the-typescript-compiler

// Thus, we need to write the rule in such a way that it operates on the entire source code instead
// of individual AST nodes.
  `,
});

valid.push({
  name: "Using an URL in the subsequent line",
  code: `
// Allow proper formatting of JSONC files:
// https://github.com/prettier/prettier/issues/5708
// (this is an extra line)
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
  name: "Using an eslint-disable-next-line comment",
  code: `
// Trim the parenthesis and quotes surrounding the sentence, if any.
// eslint-disable-next-line no-constant-condition
  `,
});

valid.push({
  name: "Using an eslint-disable-next-line and a ts-ignore comment",
  code: `
export function foo(): boolean {
  // eslint-disable-next-line
  // @ts-ignore
  return package !== undefined;
}
  `,
});

valid.push({
  name: "Using a callback trace list",
  code: `
// ModCallback.POST_PLAYER_RENDER (32)
// PlayerVariant.PLAYER (0)
// BabySubType.SUB_TYPE (1)
  `,
});

valid.push({
  name: "Using a simple trailing number",
  code: `
// 1
// Magdalene can increase her maximum heart containers with Birthright.
  `,
});

valid.push({
  name: "Using a complicated trailing number",
  code: `
// 14, 33
// Keeper and Tainted Keeper can increase their coin containers with Mother's Kiss and Greed's
// Gullet.
  `,
});

valid.push({
  name: "Using a number at the end of the line",
  code: `
{
  {
    // If the room contained Mom's Hands, then a screen shake will be queued. Override it with a 0
    // frame shake.
  }
}
  `,
});

valid.push({
  name: "Using two or more enum headers",
  code: `
// ModCallbackCustom.POST_GRID_ENTITY_UPDATE
// GridEntityType.PRESSURE_PLATE (20)
// GridEntityType.PRESSURE_PLATE
  `,
});

invalid.push({
  name: "Double spaces between sentences",
  code: `
// This is the first sentence.  This is the second sentence.
  `,
  errors: [{ messageId: "incorrectlyFormatted" }],
  output: `
// This is the first sentence. This is the second sentence.
  `,
});

invalid.push({
  name: "Double spaces between words",
  code: `
// This is  the first sentence.
  `,
  errors: [{ messageId: "incorrectlyFormatted" }],
  output: `
// This is the first sentence.
  `,
});

invalid.push({
  name: "No space after double slash",
  code: `
//This is a sentence.
  `,
  errors: [{ messageId: "incorrectlyFormatted" }],
  output: `
// This is a sentence.
  `,
});

valid.push({
  name: "Commented out array elements",
  code: `
const array = [
  "foo",
  // "bar",
  // "baz",
];
  `,
});

ruleTester.run("format-line-comments", formatLineComments, {
  valid,
  invalid,
});
