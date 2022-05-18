import { isEnumBlockLabel, isSpecialComment } from "./comments";
import { getAdjustedList, List, reachedNewList } from "./list";
import { hasURL } from "./utils";

export type CompleteSentenceMessageIds = "missingCapital" | "missingPeriod";

interface IncompleteSentence {
  sentence: string;
  messageId: CompleteSentenceMessageIds;
}

/**
 * From:
 * https://stackoverflow.com/questions/23571013/how-to-remove-url-from-a-string-completely-in-javascript
 */
const FULL_URL_REGEX = /(?:https?|ftp):\/\/[\n\S]+/g;

// cspell: ignore lonemc
/**
 * From:
 * https://stackoverflow.com/questions/11761563/javascript-regexp-for-splitting-text-into-sentences-and-keeping-the-delimiter
 */
const SENTENCE_REGEX =
  /(?=[^])(?:\P{Sentence_Terminal}|\p{Sentence_Terminal}(?!['"`\p{Close_Punctuation}\p{Final_Punctuation}\s]))*(?:\p{Sentence_Terminal}+['"`\p{Close_Punctuation}\p{Final_Punctuation}]*|$)/guy;

const SENTENCE_SEPARATOR_IDENTIFIER =
  "___isaacscript_sentence_separator_identifier___";
const IN_LINE_CODE_IDENTIFIER = "___in_line_code_identifier___";
const LIST_ELEMENT_IDENTIFIER = "___list_element_identifier___";

export function getIncompleteSentences(text: string): IncompleteSentence[] {
  const incompleteSentences: IncompleteSentence[] = [];

  const textBlocks = splitOnSpecialText(text);
  textBlocks.forEach((textBlock) => {
    // Handle text that "spills over" to the next line by simply converting all newlines to spaces.
    const squishedText = textBlock.split("\n").join(" ");

    // Handling all edge cases for "e.g." or "i.e." is very difficult, since sometimes it is correct
    // to put a period after them, and sometimes not. Thus, ignore all text that contains them.
    if (squishedText.includes("e.g.") || squishedText.includes("i.e.")) {
      return;
    }

    const sentences = getSentences(squishedText);
    const loneSentence = sentences.length === 1;
    sentences.forEach((sentence) => {
      const messageId = getIncompleteSentenceKind(sentence, loneSentence);
      if (messageId !== undefined) {
        incompleteSentences.push({
          sentence,
          messageId,
        });
      }
    });
  });

  return incompleteSentences;
}

/**
 * Before parsing a multi-line string to get the sentences, we first need to mutate the input to
 * handle some problematic situations.
 */
function splitOnSpecialText(text: string): string[] {
  // Below, we avoid replacing certain things to an empty string because that can potentially cause
  // subsequent text to be considered to be part of the previous sentence.

  // First, remove multi-line code blocks.
  text = text.replace(/```[\s\S]*```/gm, SENTENCE_SEPARATOR_IDENTIFIER);

  const lines = text.split("\n");
  const newLines: string[] = [];
  let insideList: List | undefined;
  for (let i = 0; i < lines.length; i++) {
    let line = lines[i]!; // eslint-disable-line @typescript-eslint/no-non-null-assertion

    // Remove any JSDoc tags. (But leave the descriptions following the tags, if any.) "@param" tags
    // are followed by variable names, which will not be part of the sentence.
    line = line.replace(/^\s*@param \w+ /, SENTENCE_SEPARATOR_IDENTIFIER);
    // This is "\S+" instead of "\w+" because we need to match things like "@ts-expect-error".
    line = line.replace(/^\s*@\S+/, SENTENCE_SEPARATOR_IDENTIFIER);

    // Replace any single-line code snippets with custom text. The custom text begins with an
    // underscore, which means that it will count towards the sentence starting with a capital
    // letter. (This is only relevant if the code block is the first word in the sentence.)
    line = line.replace(/`.+`/, IN_LINE_CODE_IDENTIFIER);

    // Remove any URLs present in the string, as the periods will count as sentence terminators.
    // e.g. "This is my URL: https://stackoverflow."
    line = line.replace(FULL_URL_REGEX, "");

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

// ts-prune-ignore-next
export function getSentences(text: string): string[] {
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
  // eslint-disable-next-line no-constant-condition
  while (true) {
    const textBeforeModifications = text;
    text = text.trim().replace(/^\(*/, "").replace(/\)*$/, "").trim();
    if (text === textBeforeModifications) {
      break;
    }
  }

  // Ignore / whitelist some specific things.
  if (
    // Blank text.
    text === "" ||
    // Sentences that do not contain any letters.
    !/[a-zA-Z]/.test(text) ||
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

  if (
    loneSentence &&
    // Single words, double words, and triple words.
    (/^\w+$/.test(text) || /^\w+ \w+$/.test(text) || /^\w+ \w+ \w+$/.test(text))
  ) {
    return undefined;
  }

  if (/^[a-z]/.test(text)) {
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
