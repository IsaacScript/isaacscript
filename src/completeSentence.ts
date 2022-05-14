import { BulletPointKind, getBulletPointKind } from "./bulletPoints";
import { isSpecialComment } from "./comments";
import { ensureAllCases, hasURL } from "./utils";

enum SentenceKind {
  NonSentence,
  MissingCapital,
  MissingPeriod,
  Complete,
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
