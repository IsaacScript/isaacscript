import { TSESLint } from "@typescript-eslint/utils";
import {
  formatJSDocComments,
  MessageIds,
} from "../../src/rules/format-jsdoc-comments";
import { ruleTester } from "../utils";

const valid: Array<TSESLint.ValidTestCase<unknown[]>> = [];
const invalid: Array<TSESLint.InvalidTestCase<MessageIds, unknown[]>> = [];

// ----------------------
// COVERED BY OTHER RULES
// ----------------------

valid.push({
  name: 'Using a single-line "//" comment that is too long',
  code: `
// But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will
  `,
});

// ------------
// SHARED TESTS
// ------------

valid.push({
  name: "Using a single-line comment with exactly 100 characters",
  code: `
/** But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain */
  `,
});

invalid.push({
  name: "Using a single-line comment with exactly 101 characters",
  code: `
/** But I must explain to you how all this mistaken idea of denouncing pleasure and praising pains */
  `,
  errors: [{ messageId: "incorrectlyFormatted" }],
  output: `
/**
 * But I must explain to you how all this mistaken idea of denouncing pleasure and praising pains
 */
  `,
});

invalid.push({
  name: "Using a single-line comment with no preceding or trailing whitespace",
  code: "/** But I must explain to you how all this mistaken idea of denouncing pleasure and praising pains */",
  errors: [{ messageId: "incorrectlyFormatted" }],
  output: `/**
 * But I must explain to you how all this mistaken idea of denouncing pleasure and praising pains
 */`,
});

valid.push({
  name: "Using a multi-line comment with exactly 100 characters",
  code: `
/**
 * But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was
 */
  `,
});

valid.push({
  name: "Using a multi-line comment with exactly 100 characters and potential spillover",
  code: `
/**
 * But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was
 * born and I will give you a complete account of the system
 */
  `,
});

invalid.push({
  name: "Using a multi-line comment with exactly 101 characters",
  code: `
/**
 * But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain work
 * born and I will give you a complete account of the system
 */
  `,
  errors: [{ messageId: "incorrectlyFormatted" }],
  output: `
/**
 * But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain
 * work born and I will give you a complete account of the system
 */
  `,
});

invalid.push({
  name: "Using a multi-line comment that is too long",
  code: `
/**
 * But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and
 * I will give you a complete account of the system
 */
  `,
  errors: [{ messageId: "incorrectlyFormatted" }],
  output: `
/**
 * But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was
 * born and I will give you a complete account of the system
 */
  `,
});

invalid.push({
  name: "Using a multi-line comment with many long lines",
  code: `
/**
 * But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will
 * give you a complete account of the system, and expound the actual teachings of the great explorer of the truth, the master-builder
 * of human happiness. No one rejects, dislikes, or avoids pleasure itself, because it is pleasure, but because those who do not know how
 * to pursue pleasure rationally encounter consequences that are extremely painful.
 */
  `,
  errors: [{ messageId: "incorrectlyFormatted" }],
  output: `
/**
 * But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was
 * born and I will give you a complete account of the system, and expound the actual teachings of
 * the great explorer of the truth, the master-builder of human happiness. No one rejects, dislikes,
 * or avoids pleasure itself, because it is pleasure, but because those who do not know how to
 * pursue pleasure rationally encounter consequences that are extremely painful.
 */
  `,
});

valid.push({
  name: "Using a single-line comment with exactly 100 characters inside a function",
  code: `
function foo() {
  /** But I must explain to you how all this mistaken idea of denouncing pleasure and praising to */
}
  `,
});

invalid.push({
  name: "Using a single-line comment with exactly 101 characters inside a function",
  code: `
function foo() {
  /** But I must explain to you how all this mistaken idea of denouncing pleasure and praising two */
}
  `,
  errors: [{ messageId: "incorrectlyFormatted" }],
  output: `
function foo() {
  /**
   * But I must explain to you how all this mistaken idea of denouncing pleasure and praising two
   */
}
  `,
});

valid.push({
  name: "Using a multi-line comment with exactly 100 characters inside a function",
  code: `
function foo() {
  /**
   * But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain a
   * born and I will give you a complete account of the system
   */
}
  `,
});

invalid.push({
  name: "Using a multi-line comment with exactly 101 characters inside a function",
  code: `
function foo() {
  /**
   * But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain as
   * born and I will give you a complete account of the system
   */
}
  `,
  errors: [{ messageId: "incorrectlyFormatted" }],
  output: `
function foo() {
  /**
   * But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain
   * as born and I will give you a complete account of the system
   */
}
  `,
});

invalid.push({
  name: "Using a multi-line comment that is too long inside a function",
  code: `
function foo() {
  /**
   * But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and
   * I will give you a complete account of the system
   */
}
  `,
  errors: [{ messageId: "incorrectlyFormatted" }],
  output: `
function foo() {
  /**
   * But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain
   * was born and I will give you a complete account of the system
   */
}
  `,
});

invalid.push({
  name: "Using a multi-line comment with many long lines inside a function",
  code: `
function foo() {
  /**
   * But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will
   * give you a complete account of the system, and expound the actual teachings of the great explorer of the truth, the master-builder
   * of human happiness. No one rejects, dislikes, or avoids pleasure itself, because it is pleasure, but because those who do not know how
   * to pursue pleasure rationally encounter consequences that are extremely painful.
   */
}
  `,
  errors: [{ messageId: "incorrectlyFormatted" }],
  output: `
function foo() {
  /**
   * But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain
   * was born and I will give you a complete account of the system, and expound the actual teachings
   * of the great explorer of the truth, the master-builder of human happiness. No one rejects,
   * dislikes, or avoids pleasure itself, because it is pleasure, but because those who do not know
   * how to pursue pleasure rationally encounter consequences that are extremely painful.
   */
}
  `,
});

invalid.push({
  name: "Using a multi-line comment that can be combined (2 lines --> 1 line)",
  code: `
/**
 * I love cookies.
 * But not cake.
 */
  `,
  errors: [{ messageId: "incorrectlyFormatted" }],
  output: `
/** I love cookies. But not cake. */
  `,
});

invalid.push({
  name: "Using a multi-line comment that can be combined (3 lines --> 2 lines)",
  code: `
/**
 * I love cookies. But not cake. Actually, I love a lot of different foods. But mostly cookies.
 * And definitely not cake.
 * Except on my birthday.
 */
  `,
  errors: [{ messageId: "incorrectlyFormatted" }],
  output: `
/**
 * I love cookies. But not cake. Actually, I love a lot of different foods. But mostly cookies. And
 * definitely not cake. Except on my birthday.
 */
  `,
});

invalid.push({
  name: "Using a multi-line comment that has many blocks and block separation",
  code: `
/**
 * But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born
 *
 * and I will give you a complete account of the system, and expound the actual teachings of the great
 * explorer of the truth, the master-builder of human happiness. No one rejects, dislikes, or avoids pleasure
 *
 *
 * itself, because it is pleasure, but because those who do not know how to pursue pleasure rationally
 * encounter consequences that are extremely painful. Nor again is there anyone who loves or pursues or
 * desires to obtain pain of itself, because it is pain, but because occasionally circumstances occur
 */
  `,
  errors: [{ messageId: "incorrectlyFormatted" }],
  output: `
/**
 * But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was
 * born
 *
 * and I will give you a complete account of the system, and expound the actual teachings of the
 * great explorer of the truth, the master-builder of human happiness. No one rejects, dislikes, or
 * avoids pleasure
 *
 * itself, because it is pleasure, but because those who do not know how to pursue pleasure
 * rationally encounter consequences that are extremely painful. Nor again is there anyone who loves
 * or pursues or desires to obtain pain of itself, because it is pain, but because occasionally
 * circumstances occur
 */
  `,
});

invalid.push({
  name: "Using a multi-line comment that has many blocks and block separation inside a function",
  code: `
function foo() {
  /**
   * But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born
   *
   * and I will give you a complete account of the system, and expound the actual teachings of the great
   * explorer of the truth, the master-builder of human happiness. No one rejects, dislikes, or avoids pleasure
   *
   *
   * itself, because it is pleasure, but because those who do not know how to pursue pleasure rationally
   * encounter consequences that are extremely painful. Nor again is there anyone who loves or pursues or
   * desires to obtain pain of itself, because it is pain, but because occasionally circumstances occur
   */
}
  `,
  errors: [{ messageId: "incorrectlyFormatted" }],
  output: `
function foo() {
  /**
   * But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain
   * was born
   *
   * and I will give you a complete account of the system, and expound the actual teachings of the
   * great explorer of the truth, the master-builder of human happiness. No one rejects, dislikes,
   * or avoids pleasure
   *
   * itself, because it is pleasure, but because those who do not know how to pursue pleasure
   * rationally encounter consequences that are extremely painful. Nor again is there anyone who
   * loves or pursues or desires to obtain pain of itself, because it is pain, but because
   * occasionally circumstances occur
   */
}
  `,
});

invalid.push({
  name: "Using a multi-line comment with bullet points with a newline before the bullets",
  code: `
/**
 * Here is my list of things:
 *
 * - But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and
 * - I will give you a complete account of the system, and expound the actual teachings of the great explorer of the
 * truth, the master-builder of human happiness. No one rejects, dislikes, or avoids pleasure
 * - itself, because it is pleasure, but because those who do not know how to pursue pleasure rationally encounter
 */
  `,
  errors: [{ messageId: "incorrectlyFormatted" }],
  output: `
/**
 * Here is my list of things:
 *
 * - But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain
 *   was born and
 * - I will give you a complete account of the system, and expound the actual teachings of the great
 *   explorer of the truth, the master-builder of human happiness. No one rejects, dislikes, or
 *   avoids pleasure
 * - itself, because it is pleasure, but because those who do not know how to pursue pleasure
 *   rationally encounter
 */
  `,
});

invalid.push({
  name: "Using a multi-line comment with bullet points with no newline before the bullets",
  code: `
/**
 * Here is my list of things:
 * - But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and
 * - I will give you a complete account of the system, and expound the actual teachings of the great explorer of the
 * truth, the master-builder of human happiness. No one rejects, dislikes, or avoids pleasure
 * - itself, because it is pleasure, but because those who do not know how to pursue pleasure rationally encounter
 */
  `,
  errors: [{ messageId: "incorrectlyFormatted" }],
  output: `
/**
 * Here is my list of things:
 * - But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain
 *   was born and
 * - I will give you a complete account of the system, and expound the actual teachings of the great
 *   explorer of the truth, the master-builder of human happiness. No one rejects, dislikes, or
 *   avoids pleasure
 * - itself, because it is pleasure, but because those who do not know how to pursue pleasure
 *   rationally encounter
 */
  `,
});

invalid.push({
  name: "Using a multi-line comment with sub-bullet points",
  code: `
/**
 * Here is my list of things:
 *
 * - But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and
 *   - I will give you a complete account of the system, and expound the actual teachings of the great explorer of the
 * truth, the master-builder of human happiness. No one rejects, dislikes, or avoids pleasure
 * - itself, because it is pleasure, but because those who do not know how to pursue pleasure rationally encounter
 */
  `,
  errors: [{ messageId: "incorrectlyFormatted" }],
  output: `
/**
 * Here is my list of things:
 *
 * - But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain
 *   was born and
 *   - I will give you a complete account of the system, and expound the actual teachings of the
 *     great explorer of the truth, the master-builder of human happiness. No one rejects, dislikes,
 *     or avoids pleasure
 * - itself, because it is pleasure, but because those who do not know how to pursue pleasure
 *   rationally encounter
 */
  `,
});

invalid.push({
  name: "Using a multi-line comment with bullet points with newlines in-between",
  code: `
/**
 * Here is my list of things:
 *
 * - But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and
 *
 * - I will give you a complete account of the system, and expound the actual teachings of the great explorer of the
 * truth, the master-builder of human happiness. No one rejects, dislikes, or avoids pleasure
 *
 * - itself, because it is pleasure, but because those who do not know how to pursue pleasure rationally encounter
 */
  `,
  errors: [{ messageId: "incorrectlyFormatted" }],
  output: `
/**
 * Here is my list of things:
 *
 * - But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain
 *   was born and
 *
 * - I will give you a complete account of the system, and expound the actual teachings of the great
 *   explorer of the truth, the master-builder of human happiness. No one rejects, dislikes, or
 *   avoids pleasure
 *
 * - itself, because it is pleasure, but because those who do not know how to pursue pleasure
 *   rationally encounter
 */
  `,
});

valid.push({
  name: "Using a multi-line comment with number period bullet points and no spacing",
  code: `
/**
 * This is my list:
 * 1. foo
 * 2. bar
 * 3. baz
 */
  `,
});

valid.push({
  name: "Using a multi-line comment with number parenthesis bullet points and no spacing",
  code: `
/**
 * This is my list:
 * 1) foo
 * 2) bar
 * 3) baz
 */
  `,
});

valid.push({
  name: "Using a multi-line comment with number period bullet points and spacing",
  code: `
/**
 * This is my list:
 *
 * 1. foo
 * 2. bar
 * 3. baz
 */
  `,
});

valid.push({
  name: "Using a multi-line comment with number parenthesis bullet points and spacing",
  code: `
/**
 * This is my list:
 *
 * 1) foo
 * 2) bar
 * 3) baz
 */
  `,
});

valid.push({
  name: "Using a multi-line comment with different kinds of bullet points",
  code: `
function foo() {
  /**
   * Reads data from a client object, according to the specified read pattern. Patterns follow the
   * Lua file I/O format, and the difference in performance between all patterns is negligible.
   *
   * Pattern can be any of the following:
   *
   * - '*a': reads from the socket until the connection is closed. No end-of-line translation is
   *   performed.
   * - '*l': reads a line of text from the socket. The line is terminated by a LF character (ASCII
   *   10), optionally preceded by a CR character (ASCII 13). The CR and LF characters are not
   *   included in the returned line. In fact, all CR characters are ignored by the pattern. This is
   *   the default pattern.
   * - number: causes the method to read a specified number of bytes from the socket.
   *
   * Prefix is an optional string to be concatenated to the beginning of any received data before
   * return.
   *
   * If successful, the method returns the received pattern. In case of error, the method returns
   * undefined followed by an error message which can be the string "closed" in case the connection
   * was closed before the transmission was completed or the string "timeout" in case there was a
   * timeout during the operation. Also, after the error message, the function returns the partial
   * result of the transmission.
   */
}
  `,
});

valid.push({
  name: "Using a multi-line comment that looks like a numbered bullet point",
  code: `
function foo() {
  /**
   * This method will crash the game if you provide it an invalid collectible type, such as -1 or
   * 43. (Using 0 will not cause a crash.) Thus, it is safer to use the \`RemoveCostume\` method
   * instead.
   */
}
  `,
});

invalid.push({
  name: "Using a multi-line comment with very long bullet points",
  code: `
function foo() {
  /**
   * This is my list:
   *
   * - But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I
   * will give you a complete account of the system, and expound the actual teachings of the great explorer of the
   * truth, the master-builder of human happiness. No one rejects, dislikes, or avoids pleasure itself, because it
   * is pleasure, but because those who do not know how to pursue pleasure rationally encounter consequences
   * - that are extremely painful. Nor again is there anyone who loves or pursues or desires to obtain pain of itself,
   * because it is pain, but because occasionally circumstances occur in which toil and pain can procure him some great
   * pleasure. To take a trivial example, which of us ever undertakes laborious physical exercise, except to obtain some
   * advantage from it? But who has any right to find fault with a man who chooses to enjoy a pleasure that has no
   * annoying consequences, or one who avoids a pain that produces no resultant pleasure?
   */
}
  `,
  errors: [{ messageId: "incorrectlyFormatted" }],
  output: `
function foo() {
  /**
   * This is my list:
   *
   * - But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain
   *   was born and I will give you a complete account of the system, and expound the actual
   *   teachings of the great explorer of the truth, the master-builder of human happiness. No one
   *   rejects, dislikes, or avoids pleasure itself, because it is pleasure, but because those who
   *   do not know how to pursue pleasure rationally encounter consequences
   * - that are extremely painful. Nor again is there anyone who loves or pursues or desires to
   *   obtain pain of itself, because it is pain, but because occasionally circumstances occur in
   *   which toil and pain can procure him some great pleasure. To take a trivial example, which of
   *   us ever undertakes laborious physical exercise, except to obtain some advantage from it? But
   *   who has any right to find fault with a man who chooses to enjoy a pleasure that has no
   *   annoying consequences, or one who avoids a pain that produces no resultant pleasure?
   */
}
  `,
});

valid.push({
  name: "Multi-line comment with bullet points with colons and e.g.",
  code: `
/**
 * Allow ending with a quote or backtick if this is an example of something indicated with a colon
 * or an "e.g" or an "i.e.", like:
 * - Use the following code: \`foo()\`
 * - e.g. \`Foo.Bar()\`
 */
  `,
});

invalid.push({
  name: "Using a single-line comment with an unbreakable line",
  code: `
/** AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA */
  `,
  errors: [{ messageId: "incorrectlyFormatted" }],
  output: `
/**
 * AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA
 */
  `,
});

valid.push({
  name: "Using a multi-line comment with an unbreakable line",
  code: `
/**
 * AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA
 */
  `,
});

invalid.push({
  name: "Using a single-line comment with an unbreakable line and other overflowing text",
  code: `
/** But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA I will give you a complete account of the system */
  `,
  errors: [{ messageId: "incorrectlyFormatted" }],
  output: `
/**
 * But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was
 * born and
 * AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA
 * I will give you a complete account of the system
 */
  `,
});

valid.push({
  name: "Using a multi-line comment with a URL",
  code: `
/**
 * Documentation: https://github.com/jrdrg/eslint-plugin-sort-exports
 * Not defined in parent configs.
 */
  `,
});

invalid.push({
  name: "Using a multi-line comment with a URL that can be combined",
  code: `
/**
 * Documentation:
 * https://github.com/jrdrg/eslint-plugin-sort-exports
 * Not defined in parent configs.
 */
  `,
  errors: [{ messageId: "incorrectlyFormatted" }],
  output: `
/**
 * Documentation: https://github.com/jrdrg/eslint-plugin-sort-exports
 * Not defined in parent configs.
 */
  `,
});

valid.push({
  name: "Using a multi-line comment with a URL and an empty line",
  code: `
/**
 * It is not possible to get single-line comments in the AST:
 * https://stackoverflow.com/questions/47429792/is-it-possible-to-get-comments-as-nodes-in-the-ast-using-the-typescript-compiler
 *
 * Thus, we need to write the rule in such a way that it operates on the entire source code instead
 * of individual AST nodes.
 */
  `,
});

valid.push({
  name: "Using a multi-line comment with e.g. Foo without parenthesis",
  code: `
/**
 * We split to a new line if:
 * 1) adding the word would make it overflow past the maximum length
 * 2) and there is at least one word on the current line
 * e.g. there could be a very long URL that exceeds the maximum length, but since there are no
 * spaces in the URL, it can't be split up and has to exceed the maximum length
 */
  `,
});

valid.push({
  name: "Using a multi-line comment with e.g. Foo in parenthesis",
  code: `
/**
 * We split to a new line if:
 * 1) adding the word would make it overflow past the maximum length
 * 2) and there is at least one word on the current line
 * (e.g. there could be a very long URL that exceeds the maximum length, but since there are no
 * spaces in the URL, it can't be split up and has to exceed the maximum length)
 */
  `,
});

valid.push({
  name: "Using a multi-line comment with i.e. Foo",
  code: `
/**
 * We split to a new line if:
 * 1) adding the word would make it overflow past the maximum length
 * 2) and there is at least one word on the current line
 * i.e. there could be a very long URL that exceeds the maximum length, but since there are no
 * spaces in the URL, it can't be split up and has to exceed the maximum length
 */
  `,
});

valid.push({
  name: "Using a multi-line comment with i.e. Foo in parenthesis",
  code: `
/**
 * We split to a new line if:
 * 1) adding the word would make it overflow past the maximum length
 * 2) and there is at least one word on the current line
 * (i.e. there could be a very long URL that exceeds the maximum length, but since there are no
 * spaces in the URL, it can't be split up and has to exceed the maximum length)
 */
  `,
});

// ------------------
// JSDOC UNIQUE TESTS
// ------------------

// Valid since we ignore "/* "
valid.push({
  name: 'Using a single-line "/*" comment with over 100 characters',
  code: `
/* But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will */
  `,
});

invalid.push({
  name: "Using a multi-line comment with JSDoc block tags",
  code: `
/**
 * Here is my function.
 *
 * @param bar But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and
 * I will give you a complete account of the system, and expound the actual teachings of the great
 * @returns explorer of the truth, the master-builder of human happiness. No one rejects, dislikes, or avoids pleasure
 * explorer of the truth, the master-builder of human happiness. No one rejects, dislikes, or avoids pleasure itself
 */
  `,
  errors: [{ messageId: "incorrectlyFormatted" }],
  output: `
/**
 * Here is my function.
 *
 * @param bar But I must explain to you how all this mistaken idea of denouncing pleasure and
 * praising pain was born and I will give you a complete account of the system, and expound the
 * actual teachings of the great
 * @returns explorer of the truth, the master-builder of human happiness. No one rejects, dislikes,
 * or avoids pleasure explorer of the truth, the master-builder of human happiness. No one rejects,
 * dislikes, or avoids pleasure itself
 */
  `,
});

valid.push({
  name: "Using a multi-line comment with code blocks",
  code: `
/**
 * For example:
 *
 * \`\`\`ts
 * function foo() {
 *   const abc = 123;
 * }
 * \`\`\`
 */
  `,
});

valid.push({
  name: "Using a multi-line comment with code blocks and a trailing text",
  code: `
/**
 * For example:
 *
 * \`\`\`ts
 * function foo() {
 *   const abc = 123;
 * }
 * \`\`\` (this is a trailing message)
 */
  `,
});

invalid.push({
  name: "Using a multi-line comment with code blocks and a trailing line",
  code: `
/**
 * For example:
 *
 * \`\`\`ts
 * function foo() {
 *   const abc = 123;
 * }
 * \`\`\`
 * (this is a trailing message)
 */
  `,
  errors: [{ messageId: "incorrectlyFormatted" }],
  output: `
/**
 * For example:
 *
 * \`\`\`ts
 * function foo() {
 *   const abc = 123;
 * }
 * \`\`\`
 *
 * (this is a trailing message)
 */
  `,
});

valid.push({
  name: "Using a multi-line comment with code blocks that contain blank lines",
  code: `
/**
 * Returns an array of grouped comments. For example, the following code would return an array of
 * three comment blocks:
 *
 * \`\`\`ts
 * // This is the first block.
 *
 * // This is the second block.
 * // We are still in the second block, because there has not been a newline separator yet.
 *
 * // This is the third block.
 * \`\`\`
 */
  `,
});

valid.push({
  name: "Using a multi-line comment with a short JSDoc tag with text",
  code: `
/**
 * @param foo This is foo.
 */
  `,
});

valid.push({
  name: "Using a multi-line comment with a short JSDoc tag without text",
  code: `
/** @foo */
  `,
});

invalid.push({
  name: "Using a single-line comment with a duplicate asterisk",
  code: `
/** * Foo */
  `,
  errors: [{ messageId: "incorrectlyFormatted" }],
  output: `
/** Foo */
  `,
});

invalid.push({
  name: "Using a multi-line comment with a duplicate asterisk",
  code: `
/**
 * * But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain
 */
  `,
  errors: [{ messageId: "incorrectlyFormatted" }],
  output: `
/**
 * But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain
 */
  `,
});

ruleTester.run("format-jsdoc-comments", formatJSDocComments, {
  valid,
  invalid,
});
