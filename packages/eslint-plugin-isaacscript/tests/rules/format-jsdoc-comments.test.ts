import { TSESLint } from "@typescript-eslint/utils";
import {
  formatJSDocComments,
  MessageIds,
} from "../../src/rules/format-jsdoc-comments";
import { ruleTester } from "../utils";

const valid: Array<TSESLint.ValidTestCase<unknown[]>> = [];
const invalid: Array<TSESLint.InvalidTestCase<MessageIds, unknown[]>> = [];

valid.push({
  name: 'Using a single-line "//" comment that is too long',
  code: `
// But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will
  `,
});

valid.push({
  name: "Using a non-JSDoc comment that is too long",
  code: `
/* But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will */
  `,
});

valid.push({
  name: "Using a single-line comment with exactly 100 characters without any indent",
  code: `
/** But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain */
  `,
});

invalid.push({
  name: "Using a single-line comment with exactly 101 characters without any indent",
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
  name: "Using a multi-line comment with exactly 100 characters without any indent",
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
 *            praising pain was born and I will give you a complete account of the system, and
 *            expound the actual teachings of the great
 * @returns explorer of the truth, the master-builder of human happiness. No one rejects, dislikes,
 *          or avoids pleasure explorer of the truth, the master-builder of human happiness. No one
 *          rejects, dislikes, or avoids pleasure itself
 */
  `,
});

valid.push({
  name: "Using a multi-line comment with code blocks and no trailing line",
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
 *
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
  name: "Using a single-line comment with a single duplicate asterisk",
  code: `
/** * Foo */
  `,
  errors: [{ messageId: "incorrectlyFormatted" }],
  output: `
/** Foo */
  `,
});

invalid.push({
  name: "Using a single-line comment with two duplicate asterisks",
  code: `
/** * * Foo */
  `,
  errors: [{ messageId: "incorrectlyFormatted" }],
  output: `
/** Foo */
  `,
});

invalid.push({
  name: "Using a multi-line comment with a single duplicate asterisk",
  code: `
/**
 * * But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was
 */
  `,
  errors: [{ messageId: "incorrectlyFormatted" }],
  output: `
/**
 * But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was
 */
  `,
});

invalid.push({
  name: "Using a multi-line comment with two duplicate asterisks",
  code: `
/**
 * * * But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was
 */
  `,
  errors: [{ messageId: "incorrectlyFormatted" }],
  output: `
/**
 * But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was
 */
  `,
});

valid.push({
  name: "Using a comment with an enum header",
  code: `
/**
 * ModCallback.PRE_NPC_COLLISION (30)
 * EntityType.SUCKER (61)
 *
 * The algorithm for detecting a discharge is checking if the current charge is less than the charge
 * on the previous frame. Thus, when a Bulb zaps a player and drains their charge, this will be a
 * false position, so Bulbs have to be handled.
 */
  `,
});

invalid.push({
  name: "Using a comment with no line before JSDoc tag",
  code: `
/**
 * This is the description for \`foo\`.
 * @param arg1 Whether or not to bar.
 */
function foo(arg1: boolean) {}
    `,
  errors: [{ messageId: "incorrectlyFormatted" }],
  output: `
/**
 * This is the description for \`foo\`.
 *
 * @param arg1 Whether or not to bar.
 */
function foo(arg1: boolean) {}
    `,
});

valid.push({
  name: "Using a comment with only JSDoc param tags",
  code: `
 /**
  * @param nullItemID
  * @param addCostume
  * @param count Default is 1.
  */
    `,
});

ruleTester.run("format-jsdoc-comments", formatJSDocComments, {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-explicit-any
  valid: valid as any,
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-explicit-any
  invalid: invalid as any,
});
