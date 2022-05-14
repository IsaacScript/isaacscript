import { TSESLint, TSESTree } from "@typescript-eslint/utils";
import { ensureAllCases, hasURL } from "./utils";

export enum BulletPointKind {
  NonBulletPoint,
  Hyphen,
  NumberParenthesis,
  NumberPeriod,
}

enum SentenceKind {
  NonSentence,
  MissingCapital,
  MissingPeriod,
  Complete,
}

/**
 * The bullet point reported may not be accurate if this is a line that is continuing from the
 * previous line. For example:
 *
 * ```ts
 * /**
 *  * This method will crash the game if you provide it an invalid collectible type, such as or
 *  * 43. (Using 0 will not cause a crash.) Thus, it is safer to use the \`RemoveCostume\`
 *  * method instead.
 *  * /
 * ```
 *
 * In this example, "43. " is incorrectly interpreted as a bullet point.
 */
export function getAdjustedBulletPointKind(
  line: string,
  previousLineWasBlank: boolean,
  previousLineEndedInColon: boolean,
  insideBulletedListKind: BulletPointKind,
): BulletPointKind {
  const rawBulletPointKind = getBulletPointKind(line);

  switch (rawBulletPointKind) {
    case BulletPointKind.NonBulletPoint: {
      return BulletPointKind.NonBulletPoint;
    }

    case BulletPointKind.Hyphen: {
      return BulletPointKind.Hyphen;
    }

    case BulletPointKind.NumberPeriod:
    case BulletPointKind.NumberParenthesis: {
      // If we are already inside of a numbered list, then do not require blank lines in between the
      // bullets.
      if (rawBulletPointKind === insideBulletedListKind) {
        return rawBulletPointKind;
      }

      // If the previous line had a colon, then do not require blank lines in between the bullets.
      if (previousLineEndedInColon) {
        return rawBulletPointKind;
      }

      // Otherwise, only interpret this as a bulleted list if the previous line was blank.
      return previousLineWasBlank
        ? rawBulletPointKind
        : BulletPointKind.NonBulletPoint;
    }

    default: {
      return ensureAllCases(rawBulletPointKind);
    }
  }
}

// eslint-disable-next-line isaacscript/format-jsdoc-comments
/**
 * For example:
 *
 * "But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will."
 *
 * -->
 *
 * ```ts
 * // But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain
 * // was born and I will.
 * ```
 *
 * @param linePrefix The characters to the left of the text in the comment. For example, the line
 * prefix for "  // This is a comment." is equal to "  // ".
 */
export function getFormattedCommentText(
  text: string,
  linePrefix: string,
  maxLength: number,
): string {
  // We want to preserve the spaces before sub-bullet points.
  const spacesBeforeBulletPoint = getSpacesBeforeBulletPoint(text);
  const bulletPointSecondLineIndent =
    getBulletPointKind(text) === BulletPointKind.NonBulletPoint ? "" : "  ";

  const firstLinePrefix = linePrefix + spacesBeforeBulletPoint;
  const firstLineStartLength = firstLinePrefix.length;

  // Used for the 2nd line, 3rd line, and so on.
  const secondLinePrefix = `${firstLinePrefix}${bulletPointSecondLineIndent}`;
  const secondLineStartLength = secondLinePrefix.length;

  const words = text.split(" ");

  // Build a multi-line string that contains newlines when the words exceed the maximum line length.
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

export function getMessageIDFromSentenceKind(
  sentenceKind: SentenceKind,
): string | undefined {
  switch (sentenceKind) {
    case SentenceKind.NonSentence:
    case SentenceKind.Complete: {
      return undefined;
    }

    case SentenceKind.MissingCapital: {
      return "missingCapital";
    }

    case SentenceKind.MissingPeriod: {
      return "missingPeriod";
    }

    default: {
      return ensureAllCases(sentenceKind);
    }
  }
}

export function getSentenceKind(originalText: string): SentenceKind {
  let text = originalText;

  // Trim the parenthesis surrounding the sentence, if any.
  // eslint-disable-next-line no-constant-condition
  while (true) {
    const textBeforeModifications = text;
    text = text.trim().replace(/^\(*/, "").replace(/\)*$/, "").trim();
    if (text === textBeforeModifications) {
      break;
    }
  }

  if (text === "") {
    return SentenceKind.NonSentence;
  }

  // Ignore comments that do not contain any letters.
  if (!/[a-zA-Z]/.test(text)) {
    return SentenceKind.NonSentence;
  }

  // Ignore comments that begin with an example.
  if (text.startsWith("e.g.") || text.startsWith("i.e.")) {
    return SentenceKind.NonSentence;
  }

  // Ignore special comments.
  if (isSpecialComment(text)) {
    return SentenceKind.NonSentence;
  }

  // Ignore dates.
  if (isDate(text)) {
    return SentenceKind.NonSentence;
  }

  // Ignore comments that end with a number in parenthesis, since this indicates some kind of
  // expression.
  if (/ \(\d+\)$/.test(originalText.trimEnd())) {
    return SentenceKind.NonSentence;
  }

  const bulletPointKind = getBulletPointKind(text);

  if (
    // Whitelist bullets.
    bulletPointKind !== BulletPointKind.NonBulletPoint ||
    // Whitelist text with URLS.
    hasURL(text) ||
    // Whitelist code blocks.
    text.includes("```") ||
    // Whitelist single JSDoc tags.
    /^@\w+$/.test(text)
  ) {
    return SentenceKind.NonSentence;
  }

  if (/^[a-z]/.test(text)) {
    return SentenceKind.MissingCapital;
  }

  if (
    // Allow normal end-of-line punctuation.
    !text.endsWith(".") &&
    !text.endsWith("!") &&
    !text.endsWith("?") &&
    // Allow ending with a period inside of a single quote or double quote, since it is implied that
    // this is a fully quoted sentence.
    !text.endsWith('."') &&
    !text.endsWith('!"') &&
    !text.endsWith('?"') &&
    !text.endsWith(".'") &&
    !text.endsWith("!'") &&
    !text.endsWith("?'") &&
    // Allow ending with a colon, since it is implied that there is an example of something on the
    // subsequent block.
    !text.endsWith(":") &&
    // Allow ending with anything if there is a colon in the middle of the sentence, since it is
    // implied that this is an example of something.
    !text.includes(": ")
  ) {
    return SentenceKind.MissingPeriod;
  }

  return SentenceKind.Complete;
}

const MONTHS_SET = new Set([
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
]);

const ORDINALS_SET = new Set(["st", "nd", "rd", "th"]);

function isDate(text: string) {
  text = text.trim();

  const match1 = text.match(/^(\w+) \d+(\w+)$/);
  if (match1 !== null) {
    const month = match1[1];
    const ordinal = match1[2];
    if (
      month !== undefined &&
      MONTHS_SET.has(month) &&
      ordinal !== undefined &&
      ORDINALS_SET.has(ordinal)
    ) {
      return true;
    }
  }

  const match2 = text.match(/^(\w+) \d+(\w+), \d+$/);
  if (match2 !== null) {
    const month = match2[1];
    const ordinal = match2[2];
    if (
      month !== undefined &&
      MONTHS_SET.has(month) &&
      ordinal !== undefined &&
      ORDINALS_SET.has(ordinal)
    ) {
      return true;
    }
  }

  return false;
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

export function getBulletPointKind(text: string): BulletPointKind {
  const trimmedText = text.trim();

  // e.g. "- A bullet point can start with a hyphen."
  if (trimmedText.startsWith("- ")) {
    return BulletPointKind.Hyphen;
  }

  // e.g. "1. A bullet point can start with a number and a period."
  if (/^\d+\. /.test(trimmedText)) {
    return BulletPointKind.NumberPeriod;
  }

  // e.g. "1) A bullet point can start with a number and a parenthesis."
  if (/^\d+\) /.test(trimmedText)) {
    return BulletPointKind.NumberParenthesis;
  }

  return BulletPointKind.NonBulletPoint;
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

export function isSpecialComment(text: string): boolean {
  text = text.trim();

  return (
    text.startsWith("eslint-enable") ||
    text.startsWith("eslint-disable") ||
    text.startsWith("cspell:") ||
    text.startsWith("ts-prune-") ||
    text.startsWith("@ts-")
  );
}

export function startsWithExample(text: string): boolean {
  const trimmedText = text.trim();

  return (
    // e.g. "e.g. Foo"
    trimmedText.startsWith("e.g. ") ||
    // e.g. "(e.g. Foo)"
    trimmedText.startsWith("(e.g. ") ||
    // e.g. "i.e. Foo"
    trimmedText.startsWith("i.e. ") ||
    // e.g. "(i.e. Foo)"
    trimmedText.startsWith("(i.e. ")
    // e.g. "e.g. Foo"
  );
}
