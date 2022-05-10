import { TSESLint, TSESTree } from "@typescript-eslint/utils";

/**
 *
 * For example:
 *
 * "But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will"
 *
 * -->
 *
 * ```ts
 * // But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain
 * // was born and I will
 *
 * @param linePrefix The characters to the left of the text in the comment. For example, the line
 * prefix for "  // This is a comment." is equal to "  // ".
 * ```
 */
export function getFormattedCommentText(
  text: string,
  linePrefix: string,
  maxLength: number,
): string {
  // We want to preserve the spaces before sub-bullet points
  const spacesBeforeBulletPoint = getSpacesBeforeBulletPoint(text);
  const bulletPointSecondLineIndent = startsWithBulletPoint(text) ? "  " : "";

  const firstLinePrefix = linePrefix + spacesBeforeBulletPoint;
  const firstLineStartLength = firstLinePrefix.length;

  // Used for the 2nd line, 3rd line, and so on
  const secondLinePrefix = `${firstLinePrefix}${bulletPointSecondLineIndent}`;
  const secondLineStartLength = secondLinePrefix.length;

  const words = text.split(" ");

  // Build a multi-line string that contains newlines when the words exceed the maximum line length
  const formattedWordsObject = words.reduce(
    (accumulator, word) => {
      const onFirstLine = accumulator.numLines === 1;
      const atBeginningOfLine = onFirstLine
        ? accumulator.currentLineLength === firstLineStartLength
        : accumulator.currentLineLength === secondLineStartLength;
      const textToAdd = atBeginningOfLine ? word : ` ${word}`;
      const lineLengthIfAdded =
        accumulator.currentLineLength + textToAdd.length;

      // We split to a new line if:
      // 1) adding the word would make it overflow past the maximum length
      // 2) and there is at least one word on the current line
      // (e.g. there could be a very long URL that exceeds the maximum length, but since there are
      // no spaces in the URL, it can't be split up and has to exceed the maximum length)
      const splitToNewLine =
        lineLengthIfAdded > maxLength && !atBeginningOfLine;

      if (splitToNewLine) {
        return {
          value: `${accumulator.value}\n${secondLinePrefix}${word}`,
          currentLineLength: secondLinePrefix.length + word.length,
          numLines: accumulator.numLines + 1,
        };
      }

      return {
        value: `${accumulator.value}${textToAdd}`,
        currentLineLength: lineLengthIfAdded,
        numLines: accumulator.numLines,
      };
    },
    {
      value: firstLinePrefix,
      currentLineLength: firstLineStartLength,
      numLines: 1,
    },
  );

  return formattedWordsObject.value;
}

/** In this context, a string with a hyphen represents a bullet point. */
export function getSpacesBeforeBulletPoint(text: string): string {
  const match = text.match(/^( *)-/);
  if (match === null) {
    return "";
  }

  const spaces = match[1];
  if (spaces === undefined) {
    return "";
  }

  return spaces;
}

export function startsWithBulletPoint(text: string): boolean {
  return text.trim().startsWith("-");
}

/**
 * Returns false for trailing comments like:
 *
 * ```ts
 * const abc = 123; // Foo
 * ```
 */
export function isCommentOnOwnLine(
  sourceCode: TSESLint.SourceCode,
  comment: TSESTree.Comment,
): boolean {
  const startLine = comment.loc.start.line;
  const endLine = comment.loc.end.line;

  const previousToken = sourceCode.getTokenBefore(comment);
  const previousTokenEndLine =
    previousToken === null ? null : previousToken.loc.end.line;
  const nextToken = sourceCode.getTokenAfter(comment);
  const nextTokenStartLine =
    nextToken === null ? null : nextToken.loc.start.line;

  return startLine !== previousTokenEndLine && endLine !== nextTokenStartLine;
}
