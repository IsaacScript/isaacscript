import { AST_TOKEN_TYPES, TSESTree } from "@typescript-eslint/utils";
import { isCodeInComment, isCommentOnOwnLine } from "../comments";
import { PLUGIN_NAME } from "../constants";
import { createRule, isURL } from "../utils";

const RULE_NAME = "limit-slash-asterisk-comments";

const SINGLE_LINE_BOILERPLATE_SIZE = 5; // i.e. "/** ".length + "*/".length
const MULTILINE_BOILERPLATE_SIZE = 2; // i.e. " *".length

type Options = [
  {
    maxLength: number;
    ignoreUrls: boolean;
  },
];

export type MessageIds = "incorrectlyFormatted";

export const limitSlashAsteriskComments = createRule<Options, MessageIds>({
  name: RULE_NAME,
  meta: {
    type: "layout",
    docs: {
      description: 'Disallows "/*" comments longer than N characters',
      recommended: "error",
      requiresTypeChecking: true,
    },
    schema: [
      {
        type: "object",
        properties: {
          maxLength: { type: "number" },
          ignoreUrls: { type: "boolean" },
        },
        additionalProperties: false,
      },
    ],
    messages: {
      incorrectlyFormatted: `Comment is not formatted properly to the line length of {{ maxLength }} characters.`,
    },
    fixable: "whitespace",
  },
  defaultOptions: [
    {
      /**
       * Matches the Airbnb style guide, which is the most popular JavaScript style guide in the
       * world.
       */
      maxLength: 100,

      /** Matches the default value of ESLint's `max-len` rule. */
      ignoreUrls: true,
    },
  ],

  /**
   * It is not possible to get single-line comments in the AST:
   * https://stackoverflow.com/questions/47429792/is-it-possible-to-get-comments-as-nodes-in-the-ast-using-the-typescript-compiler
   *
   * Thus, we need to write the rule in such a way that it operates on the entire source code
   * instead of individual AST nodes.
   */
  create(context, [options]) {
    const { maxLength, ignoreUrls } = options;

    const sourceCode = context.getSourceCode();
    const text = sourceCode.getText();
    const comments = sourceCode.getAllComments();

    /**
     * Filter out `/* ` style comments, since those are conventionally used to comment-out code.
     * (Actual code documentation conventionally uses JSDoc-style comments, like `/**`.)
     */
    const filteredComments = comments.filter((comment) => {
      const startLocation = comment.range[0];

      const firstCharacter = text[startLocation];
      if (firstCharacter === undefined) {
        return false;
      }

      const secondCharacter = text[startLocation + 1];
      if (secondCharacter === undefined) {
        return false;
      }

      const thirdCharacter = text[startLocation + 2];
      if (thirdCharacter === undefined) {
        return false;
      }

      const firstTwoCharacters = firstCharacter + secondCharacter;
      const firstThreeCharacters =
        firstCharacter + secondCharacter + thirdCharacter;
      return (
        firstTwoCharacters === "//" ||
        (firstTwoCharacters === "/*" && firstThreeCharacters === "/**")
      );
    });

    filteredComments.forEach((comment) => {
      if (
        !comment.loc ||
        comment.type !== AST_TOKEN_TYPES.Block ||
        // Ignore trailing comments, e.g.
        // const abc = 123 /** Foo */;
        !isCommentOnOwnLine(sourceCode, comment)
      ) {
        return;
      }

      const whitespaceSize = comment.loc?.start.column ?? 0;
      const lines = getCommentLines(comment);

      let hasConflictingLine = false;
      const fixableLinesBlocks: Array<{
        value: string;
        startIndex: number;
        endIndex: number;
      }> = [];

      for (let i = 0; i < lines.length; i++) {
        const line = lines[i];

        if (
          line &&
          isLineOverflowing(
            line,
            maxLength,
            whitespaceSize,
            getBoilerPlateSize(lines),
            ignoreUrls,
          )
        ) {
          const fixableLines = captureRelevantLines(
            lines,
            i,
            whitespaceSize,
            maxLength,
            ignoreUrls,
          );

          fixableLinesBlocks.push(fixableLines);

          if (
            isCommentInComment(fixableLines.value) ||
            isCodeInComment(captureNearbyLines(lines, i), context.parserPath)
          ) {
            hasConflictingLine = true;
            continue;
          }
        }
      }

      if (hasConflictingLine) {
        throw new Error(
          `<${PLUGIN_NAME}/${RULE_NAME}>: Failed to automatically fix a comment.`,
        );
      }

      fixableLinesBlocks.forEach((fixableLines) => {
        context.report({
          loc: comment.loc,
          messageId: "incorrectlyFormatted",
          fix: (fixer) => {
            const newValue = fixCommentLength(
              lines,
              fixableLines,
              maxLength,
              whitespaceSize,
            );

            return fixer.replaceTextRange(comment.range, newValue);
          },
        });
      });
    });

    return {};
  },
});

function captureRelevantLines(
  lines: string[],
  startIndex: number,
  maxLength: number,
  whitespaceSize: number,
  ignoreUrls: boolean,
): { value: string; startIndex: number; endIndex: number } {
  let line = lines[startIndex];

  if (!line) {
    return { value: "", startIndex, endIndex: startIndex + 1 };
  }

  for (let i = startIndex + 1; i < lines.length; i++) {
    const nextLine = lines[i];

    if (!nextLine || nextLine.trim() === "") {
      return { value: line, startIndex, endIndex: i };
    }

    line = mergeLines(line, nextLine);

    // eslint-disable-next-line
    const lineToCheck = nextLine + lines[i + 1]?.trim().split(" ")[0];
    if (
      !isLineOverflowing(
        lineToCheck,
        maxLength,
        whitespaceSize,
        SINGLE_LINE_BOILERPLATE_SIZE,
        ignoreUrls,
      )
    ) {
      return { value: line, startIndex, endIndex: i + 1 };
    }
  }

  return { value: line, startIndex, endIndex: lines.length };
}

function captureNearbyLines(lines: string[], startIndex: number): string {
  let line = lines[startIndex];

  if (!line) {
    return "";
  }

  for (let i = startIndex - 1; i >= 0; i--) {
    const prevLine = lines[i];

    if (!prevLine || prevLine.trim() === "") {
      break;
    }

    line = mergeLines(prevLine, line, "\n");
  }

  for (let i = startIndex + 1; i < lines.length; i++) {
    const nextLine = lines[i];

    if (!nextLine || nextLine.trim() === "") {
      break;
    }

    line = mergeLines(line, nextLine, "\n");
  }

  return line;
}

function mergeLines(a: string, b: string, separator = " "): string {
  return `${a.trim()}${separator}${b.trim()}`;
}

/**
 *
 * @param lines The comment that needs to be fixed, represented by an array of strings. Each line is
 * a separate element.
 * @param fixable An object containing the multi-line comment concatenated together into a single
 * string.
 * @param maxLength The maximum length that a comment line can be, derived from the rule
 * configuration.
 * @param whitespaceSize The number of characters to the left of the comment, not including the ` *`
 * or `/*` or `//` characters". For example, in the comment of `   * Hello.`, `whitespaceSize` would
 * be equal to 2.
 * @returns The adjusted comment string.
 */
function fixCommentLength(
  lines: string[],
  fixable: { value: string; startIndex: number; endIndex: number },
  maxLength: number,
  whitespaceSize: number,
): string {
  /*
  console.log("lines:", lines);
  console.log("fixable:", fixable);
  console.log("maxLength:", maxLength);
  console.log("whitespaceSize:", whitespaceSize);
  */

  const whitespace = " ".repeat(whitespaceSize);
  const startValues = lines.slice(0, fixable.startIndex);
  const endValues = lines.slice(fixable.endIndex);

  const lineStartSize = whitespaceSize + MULTILINE_BOILERPLATE_SIZE;
  const fixableWords = fixable.value.trim().split(" ");

  let newValue = `/**`;

  if (startValues.length > 0) {
    newValue += startValues.join(`\n${whitespace} * `);
  } else {
    newValue += " ";
  }

  const fixedContent = fixableWords.reduce(
    (acc, curr) => {
      const lengthIfAdded = acc.currentLineLength + curr.length + 1;
      // We can safely split to a new line in case we are reaching and overflowing line AND if there
      // is at least one word on the current line.
      const splitToNewline =
        lengthIfAdded > maxLength && acc.currentLineLength !== lineStartSize;

      if (splitToNewline) {
        return {
          value: `${acc.value}\n${whitespace} * ${curr}`,
          currentLineLength: lineStartSize,
        };
      }
      return {
        value: `${acc.value} ${curr}`,
        currentLineLength: lengthIfAdded,
      };
    },
    { value: "", currentLineLength: lineStartSize },
  );

  newValue += `\n${whitespace} *${fixedContent.value}`;

  if (endValues.length > 0) {
    newValue += `\n${whitespace} * ${endValues.join(`\n${whitespace} * `)}`;
  }

  if (endValues[endValues.length - 1] === "") {
    newValue = `${newValue.slice(0, -1)}/`;
  } else {
    newValue += `\n${whitespace} */`;
  }

  // Trim the trailing whitespace from each line, if any
  return newValue
    .split("\n")
    .map((line) => line.trimEnd())
    .join("\n");
}

function isLineOverflowing(
  line: string,
  maxLength: number,
  whitespaceSize: number,
  boilerplateSize: number,
  ignoreUrls: boolean,
): boolean {
  return (
    (!ignoreUrls || !isURL(line)) &&
    line.trim().split(" ").length > 1 &&
    line.length + whitespaceSize + boilerplateSize > maxLength
  );
}

function isCommentInComment(value: string): boolean {
  return value.includes("// ") || value.includes("/*") || value.includes("*/");
}

function getBoilerPlateSize(commentLines: string[]): number {
  return commentLines.length === 1
    ? SINGLE_LINE_BOILERPLATE_SIZE
    : MULTILINE_BOILERPLATE_SIZE;
}

function getCommentLines(comment: TSESTree.Comment): string[] {
  return comment.value
    .replace(/\*/g, "")
    .split("\n")
    .map((line) => line.trim());
}
