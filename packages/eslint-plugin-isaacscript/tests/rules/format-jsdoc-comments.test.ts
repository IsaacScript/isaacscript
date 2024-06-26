import type { TSESLint } from "@typescript-eslint/utils";
import type {
  MessageIds,
  Options,
} from "../../src/rules/format-jsdoc-comments";
import { formatJSDocComments } from "../../src/rules/format-jsdoc-comments";
import { ruleTester } from "../utils";

const valid: Array<TSESLint.ValidTestCase<Options>> = [];
const invalid: Array<TSESLint.InvalidTestCase<MessageIds, Options>> = [];

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
  name: "Using a single-line comment with a JSDoc tag with text",
  code: `
/** @param foo This is foo. */
  `,
});

valid.push({
  name: "Using a single-line comment with a short JSDoc tag without text",
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
 * @param arg1 Whether to bar.
 */
function foo(arg1: boolean) {}
    `,
  errors: [{ messageId: "incorrectlyFormatted" }],
  output: `
/**
 * This is the description for \`foo\`.
 *
 * @param arg1 Whether to bar.
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

valid.push({
  name: "Comment with JSDoc example on one line",
  code: `
/**
 * Inference helper for inputs.
 *
 * @example type HelloInput = RouterInputs['example']['hello'];
 */
  `,
});

valid.push({
  name: "Comment with JSDoc example on multiple lines and header",
  code: `
/**
 * Inference helper for inputs.
 *
 * @example
 * type Foo = 123;
 * type Bar = 456;
 */
  `,
});

valid.push({
  name: "Comment with JSDoc example on multiple lines and no header",
  code: `
/**
 * @example
 *     // Open the modem on the top of this computer.
 *     peripheral.call("top", "open", 1);
 */
  `,
});

valid.push({
  name: "Comment with JSDoc example on multiple lines and another tag afterwards",
  code: `
/**
 * Inference helper for inputs.
 *
 * @example
 * type Foo = 123;
 * type Bar = 456;
 *
 * @param Baz This is baz.
 */
  `,
});

valid.push({
  name: "Comment with multiple JSDoc example tags",
  code: `
/**
 * Determines if a peripheral is present with the given name.
 *
 * @example
 *     peripheral.isPresent("top");
 * @example
 *     peripheral.isPresent("monitor_0");
 * @param name The side or network name that you want to check.
 * @returns If a peripheral is present with the given name.
 */
declare function isPresent(name: string): boolean;
  `,
});

valid.push({
  name: "Comment with JSDoc markdown table",
  code: `
/**
 * | API                                                  | Description                                                                  |
 * | ---------------------------------------------------- | ---------------------------------------------------------------------------- |
 * | {@link getNames getNames()}                          | Provides a list of all peripherals available.                                |
 * | {@link isPresent isPresent(name)}                    | Determines if a peripheral is present with the given name.                   |
 * | {@link getType getType(peripheral)}                  | Get the types of a named or wrapped peripheral.                              |
 * | {@link hasType hasType(peripheral, peripheral_type)} | Check if a peripheral is of a particular type.                               |
 * | {@link getMethods getMethods(name)}                  | Get all available methods for the peripheral with the given name.            |
 * | {@link getName getName(peripheral)}                  | Get the name of a peripheral wrapped with \`peripheral.wrap\`.                 |
 * | {@link call call(name, method, ...)}                 | Call a method on the peripheral with the given name.                         |
 * | {@link wrap wrap(name)}                              | Get a table containing all functions available on a peripheral.              |
 * | {@link find find(ty [, filter])}                     | Find all peripherals of a specific type, and return the wrapped peripherals. |
 */
  `,
});

invalid.push({
  name: "Comment with multiple JSDoc link tag that spills over on a new line",
  code: `
/**
 * Asd asd asd asd asd asd asd asd asd asd asd asd asd asd asd asd asd asd asd asd asd asd {@link colors}.
 */
  `,
  errors: [{ messageId: "incorrectlyFormatted" }],
  output: `
/**
 * Asd asd asd asd asd asd asd asd asd asd asd asd asd asd asd asd asd asd asd asd asd asd
 * {@link colors}.
 */
  `,
});

valid.push({
  name: "Comment with example JSDoc and code block inside",
  code: `
function foo() {
  function bar() {
    /**
     * Get detailed information about the items in the given slot.
     *
     * @since 1.64.0
     * @example
     *     // Print the current slot, assuming it contains 13 dirt.
     *     print(text_utils.serialize(turtle.getItemDetail()));
     *     // \`\`\`lua {
     *     //  name = "minecraft:dirt",
     *     //  count = 13,
     *     // \`\`\`
     * @param slot The slot to get information about. Defaults to the {@link select selected slot}.
     * @param detailed Whether to include "detailed" information. When \`true\` the method will
     *                 contain much more information about the item at the cost of taking longer to
     *                 run.
     * @returns Information about the given slot, or \`undefined\` if it is empty.
     * @throws If the slot is out of range.
     * @see {@link InventoryPeripheral.getItemDetail} Describes the information returned by a
     *      detailed query.
     */
  }
}
  `,
});

invalid.push({
  name: "Comment with 1 leading asterisk",
  code: `
/** *foo */
  `,
  errors: [{ messageId: "incorrectlyFormatted" }],
  output: `
/** foo */
  `,
});

invalid.push({
  name: "Comment with 2 leading asterisks",
  code: `
/** **foo */
  `,
  errors: [{ messageId: "incorrectlyFormatted" }],
  output: `
/** foo */
  `,
});

ruleTester.run("format-jsdoc-comments", formatJSDocComments, {
  valid,
  invalid,
});
