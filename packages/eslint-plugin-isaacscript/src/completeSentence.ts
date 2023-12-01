import { isEnumBlockLabel, isSpecialComment } from "./comments";
import type { List } from "./list";
import { getAdjustedList, reachedNewList } from "./list";
import { hasURL } from "./utils";

export type CompleteSentenceMessageIds =
  | "missingCapital"
  | "missingPeriod"
  | "doublePeriod";

interface IncompleteSentence {
  sentence: string;
  messageId: CompleteSentenceMessageIds;
}

/**
 * From:
 * https://stackoverflow.com/questions/23571013/how-to-remove-url-from-a-string-completely-in-javascript
 */
const FULL_URL_REGEX = /(?:https?|ftp):\/\/[\S\n]+/g;

/**
 * From:
 * https://stackoverflow.com/questions/11761563/javascript-regexp-for-splitting-text-into-sentences-and-keeping-the-delimiter
 */
const SENTENCE_REGEX =
  /(?=[^])(?:\P{Sentence_Terminal}|\p{Sentence_Terminal}(?!['"`\p{Close_Punctuation}\p{Final_Punctuation}\s]))*(?:\p{Sentence_Terminal}+['"`\p{Close_Punctuation}\p{Final_Punctuation}]*|$)/guy;

const SENTENCE_SEPARATOR_IDENTIFIER = "___sentence_separator_identifier___";
const IN_LINE_CODE_IDENTIFIER = "___in_line_code_identifier___";
const LIST_ELEMENT_IDENTIFIER = "___list_element_identifier___";

export function getIncompleteSentences(
  text: string,
): readonly IncompleteSentence[] {
  const incompleteSentences: IncompleteSentence[] = [];

  const textBlocks = splitOnSpecialText(text);
  for (const textBlock of textBlocks) {
    // Handle text that "spills over" to the next line by simply converting all newlines to spaces.
    const squishedText = textBlock.split("\n").join(" ").trim();

    // Handling all edge cases for "e.g." or "i.e." is very difficult, since sometimes it is correct
    // to put a period after them, and sometimes not. Thus, ignore all text that contains them.
    if (squishedText.includes("e.g.") || squishedText.includes("i.e.")) {
      continue;
    }

    // Whitelist markdown links.
    if (squishedText.endsWith("](")) {
      continue;
    }

    const sentences = getSentences(squishedText);
    const loneSentence = sentences.length === 1;
    for (const sentence of sentences) {
      const messageId = getIncompleteSentenceKind(sentence, loneSentence);
      if (messageId !== undefined) {
        incompleteSentences.push({
          sentence,
          messageId,
        });
      }
    }
  }

  return incompleteSentences;
}

/**
 * Before parsing a multi-line string to get the sentences, we first need to mutate the input to
 * handle some problematic situations.
 */
function splitOnSpecialText(text: string): readonly string[] {
  // Below, we avoid replacing certain things to an empty string because that can potentially cause
  // subsequent text to be considered to be part of the previous sentence.

  // Remove multi-line code blocks.
  text = text.replaceAll(/```[\S\s]*```/gm, SENTENCE_SEPARATOR_IDENTIFIER);

  // Remove example tag blocks. An example tag might be followed by another tag, so first look for
  // that situation. Then, handle the situation where the example tag is the final tag.
  text = text.replaceAll(
    // We use `[\s\S]` instead of `.` because the latter does not match a new line.
    /@example[\S\s]*?@/gm,
    `${SENTENCE_SEPARATOR_IDENTIFIER}@`,
  );
  text = text.replaceAll(/@example[\S\s]*/gm, "");

  // Remove see tag blocks. A see tag might be followed by another tag, so first look for that
  // situation. Then, handle the situation where the see tag is the final tag. (This is copy-pasted
  // from the code that handles example tags above.)
  text = text.replaceAll(
    // We use `[\s\S]` instead of `.` because the latter does not match a new line.
    /@see[\S\s]*?@/gm,
    `${SENTENCE_SEPARATOR_IDENTIFIER}@`,
  );
  text = text.replaceAll(/@see[\S\s]*/gm, "");

  // Replace the link tags with the link text. Note that if we replace them with a sentence
  // separator instead, then the following sentence would fail: Get the name of a peripheral wrapped
  // with {@link peripheral.wrap}.
  // https://regex101.com/r/0u8hQG/1
  // https://jsdoc.app/tags-inline-link.html
  text = text.replaceAll(
    /\[([^\]]*)]{@link [^ |}]+}|{@link ([^ |}]+)[ |]?}|{@link [^ |}]+[ |]([^}]+)}/gm,
    "$1$2$3",
  );

  // Remove Markdown headers.
  text = text.replaceAll(/^\n\s*#.*\n\n/gm, SENTENCE_SEPARATOR_IDENTIFIER);
  if (text.trimStart().startsWith("#")) {
    // Also handle if the first line is a Markdown header.
    text = text.replace(/^\s*#.*\n\n/m, SENTENCE_SEPARATOR_IDENTIFIER);
  }

  // Remove pipes (which indicate a Markdown table).
  text = text.replaceAll("|", SENTENCE_SEPARATOR_IDENTIFIER);

  // Handle "blocks" indicated by a double newline. We don't want sentences to be parsed/combined
  // past blocks, so we manually insert a sentence separator.
  text = text.replaceAll("\n\n", `\n${SENTENCE_SEPARATOR_IDENTIFIER}\n`);

  // Handle quoted question marks.
  // e.g. This text contains "???" in the middle.
  text = text.replaceAll(/'\?+'/g, "");
  text = text.replaceAll(/"\?+"/g, "");

  const lines = text.split("\n");
  const newLines: string[] = [];
  let insideList: List | undefined;

  for (const [i, originalLine] of lines.entries()) {
    let line = originalLine;

    // Ignore "@type" JSDoc tags, since they contain a code type instead of English text.
    // https://jsdoc.app/tags-type.html
    line = line.replace(/^\s*@type .+$/, SENTENCE_SEPARATOR_IDENTIFIER);

    // Remove any JSDoc tags. (But leave the descriptions following the tags, if any.) "@param" tags
    // are followed by variable names, which will not be part of the sentence.
    line = line.replace(/^\s*@param \w+ /, SENTENCE_SEPARATOR_IDENTIFIER);
    // This is "\S+" instead of "\w+" because we need to match things like "@ts-expect-error".
    line = line.replace(/^\s*@\S+/, SENTENCE_SEPARATOR_IDENTIFIER);

    // Replace any single-line code snippets with custom text. The custom text begins with an
    // underscore, which means that it will count towards the sentence starting with a capital
    // letter. (This is only relevant if the code block is the first word in the sentence.)
    line = line.replaceAll(/`.+`/g, IN_LINE_CODE_IDENTIFIER);

    // Remove any URLs present in the string, as the periods will count as sentence terminators.
    // e.g. "This is my URL: https://stackoverflow."
    line = line.replaceAll(FULL_URL_REGEX, "");

    // Remove the periods from some common abbreviations so that they do not mess up the sentence
    // parsing.
    line = line.replaceAll(/\bDr\.\s+/g, "Dr");
    line = line.replaceAll(/\bJr\.\s+/g, "Jr");
    line = line.replaceAll(/\bMr\.\s+/g, "Mr");
    line = line.replaceAll(/\bMrs\.\s+/g, "Mrs");
    line = line.replaceAll(/\bMs\.\s+/g, "Ms");
    line = line.replaceAll(/\bSr\.\s+/g, "Sr");
    line = line.replaceAll(/\bSt\.\s+/g, "St");
    line = line.replaceAll(/\betc\.\s+/g, "etc");

    // Replace list bullet headers, since they are never part of a sentence. We also need to mark
    // that this sentence is a list element for the purposes of ignoring any incomplete sentences.
    // Doing this allows short lists like:
    // - apple
    // - banana
    const previousLine = lines[i - 1];
    const previousLineWasBlank =
      previousLine === undefined || previousLine.trim() === "";
    const previousLineEndedInColon =
      previousLine !== undefined && previousLine.trimEnd().endsWith(":");
    const list = getAdjustedList(
      line,
      previousLineWasBlank,
      previousLineEndedInColon,
      insideList,
    );
    if (reachedNewList(insideList, list)) {
      // Keep track that we have begun a list (or a new sub-list).
      insideList = list;
    }
    if (list !== undefined) {
      line = line.slice(list.markerSize);
      line = SENTENCE_SEPARATOR_IDENTIFIER + LIST_ELEMENT_IDENTIFIER + line;
    }

    // Split enum block labels.
    if (isEnumBlockLabel(line)) {
      line += SENTENCE_SEPARATOR_IDENTIFIER;
    }

    newLines.push(line);
  }

  const textBlocks = newLines.join("\n").split(SENTENCE_SEPARATOR_IDENTIFIER);

  return textBlocks.filter((textBlock) => !isEnumBlockLabel(textBlock));
}

export function getSentences(text: string): readonly string[] {
  const match = text.match(SENTENCE_REGEX);
  if (match === null) {
    return [];
  }

  return match;
}

function getIncompleteSentenceKind(
  sentence: string,
  loneSentence: boolean,
): CompleteSentenceMessageIds | undefined {
  let text = sentence;

  // Trim the parenthesis surrounding the sentence, if any.
  let textBeforeModifications: string;
  do {
    textBeforeModifications = text;
    text = text.trim().replace(/^\(*/, "").replace(/\)*$/, "").trim();
  } while (text !== textBeforeModifications);

  // Ignore / whitelist some specific things.
  if (
    // Blank text.
    text === "" ||
    // Sentences that do not contain any letters.
    !/[A-Za-z]/.test(text) ||
    // Sentences with an arrow, like: "Alice --> Bob"
    text.includes("-->") ||
    // Placeholder text.
    text === "n/a" ||
    // Special comments.
    isSpecialComment(text) ||
    // Dates.
    isDate(text) ||
    // URLS.
    hasURL(text) ||
    // Single JSDoc tags.
    /^@\w+$/.test(text) ||
    // Lists.
    text.startsWith(LIST_ELEMENT_IDENTIFIER) ||
    // Code blocks.
    text.includes("```") ||
    // Sentences that end with a number in parenthesis (which indicates some kind of expression).
    // This must check the original text.
    / \(\d+\)$/.test(sentence.trimEnd())
  ) {
    return undefined;
  }

  // First, check for a double period.
  if (text.endsWith("..") && text.length >= 3) {
    const characterBeforePeriods = text.at(-3);
    if (characterBeforePeriods !== ".") {
      return "doublePeriod";
    }
  }

  if (
    loneSentence &&
    // Single words, double words, and triple words.
    (/^\S+$/.test(text) || /^\S+ \S+$/.test(text) || /^\S+ \S+ \S+$/.test(text))
  ) {
    return undefined;
  }

  if (/^[a-z]/.test(text) && !isCapitalizedWordException(text)) {
    return "missingCapital";
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
    return "missingPeriod";
  }

  return undefined;
}

const CAPITALIZED_WORD_EXCEPTIONS = ["iPad", "iPhone", "iPod"] as const;

function isCapitalizedWordException(text: string): boolean {
  return CAPITALIZED_WORD_EXCEPTIONS.some((word) => text.startsWith(word));
}

const MONTHS_SET: ReadonlySet<string> = new Set([
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

const ORDINALS_SET: ReadonlySet<string> = new Set(["st", "nd", "rd", "th"]);

function isDate(text: string) {
  text = text.trim();

  const match1 = text.match(/^(?<month>\w+) \d+(?<ordinal>\w+)$/);
  if (match1 !== null && match1.groups !== undefined) {
    const { month, ordinal } = match1.groups;
    if (
      month !== undefined &&
      MONTHS_SET.has(month) &&
      ordinal !== undefined &&
      ORDINALS_SET.has(ordinal)
    ) {
      return true;
    }
  }

  const match2 = text.match(/^(?<month>\w+) \d+(?<ordinal>\w+), \d+$/);
  if (match2 !== null && match2.groups !== undefined) {
    const { month, ordinal } = match2.groups;
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
