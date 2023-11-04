import type { CompleteSentenceMessageIds } from "../src/completeSentence";
import { getIncompleteSentences, getSentences } from "../src/completeSentence";
import { assertDefined } from "../src/isaacScriptCommonTS";

function testSentences(text: string, numSentences: number) {
  const sentences = getSentences(text);
  expect(sentences.length).toBe(numSentences);
}

test("Multiple kinds of punctuation", () => {
  testSentences(
    "I like turtles. Do you? Awesome! Amazing. lol!!! What's going on????",
    6,
  );
});

test("Parenthetical sentences", () => {
  testSentences(
    "(I like turtles.) Do you? (Awesome!) Amazing. (lol!!! What's going on????)",
    6,
  );
});

test("No ending punctuation", () => {
  testSentences("Sentence 1. Sentence 2", 2);
});

test("Text after colon does not count as a sentence", () => {
  testSentences("This is my fruit: banana", 1);
});

test("Enum does not count as a sentence", () => {
  testSentences(
    "This uses CollectibleType.SAD_ONION (1) as a value. We must do it this way.",
    2,
  );
});

function testIncompleteSentence(
  text: string,
  messageId: CompleteSentenceMessageIds | undefined,
) {
  const incompleteSentences = getIncompleteSentences(text);
  const expectedLength = messageId === undefined ? 0 : 1;
  expect(incompleteSentences.length).toBe(expectedLength);
  if (messageId === undefined) {
    return;
  }

  const firstIncompleteSentence = incompleteSentences[0];
  assertDefined(
    firstIncompleteSentence,
    "Failed to get the first incomplete sentence.",
  );
  expect(firstIncompleteSentence.messageId).toBe(messageId);
}

test("Standard sentences", () => {
  testIncompleteSentence(
    "This is the first sentence. This is the second sentence.",
    undefined,
  );
});

test("Missing capital", () => {
  testIncompleteSentence(
    "sometimes I forget to capitalize my sentences.",
    "missingCapital",
  );
});

test("Missing period", () => {
  testIncompleteSentence(
    "Sometimes I forget to put a period on my sentences",
    "missingPeriod",
  );
});

test("Trailing word", () => {
  testIncompleteSentence(
    "Sometimes I add a trailing word. The",
    "missingPeriod",
  );
});

test("Plain URL", () => {
  testIncompleteSentence(
    "https://github.com/eslint/eslint/blob/main/lib/rules/fake-rule.js",
    undefined,
  );
});

test("Trailing URL", () => {
  testIncompleteSentence(
    "Taken from ESLint: https://github.com/eslint/eslint/blob/main/lib/rules/fake-rule.js",
    undefined,
  );
});

test("URL between text", () => {
  testIncompleteSentence(
    "This is my URL https://stackoverflow.com/ and this sentence should have a period",
    "missingPeriod",
  );
});

test("Text after colon is exempt", () => {
  testIncompleteSentence("This is my example: foo", undefined);
});

test("Parenthetical e.g. does not count as sentence", () => {
  testIncompleteSentence("I cannot eat certain foods (e.g. Apple).", undefined);
});

test("Parenthetical i.e. does not count as sentence", () => {
  testIncompleteSentence("I cannot eat certain foods (i.e. Apple).", undefined);
});

test("e.g. on separate line does not count as sentence", () => {
  testIncompleteSentence("I cannot eat certain foods.\ne.g. Apple", undefined);
});

test("i.e. on separate line does not count as sentence", () => {
  testIncompleteSentence("I cannot eat certain foods.\ni.e. Apple", undefined);
});

test("Parenthetical e.g. on separate line does not count as sentence", () => {
  testIncompleteSentence(
    "I cannot eat certain foods.\n(e.g. Apple)",
    undefined,
  );
});

test("Parenthetical i.e. on separate line does not count as sentence", () => {
  testIncompleteSentence(
    "I cannot eat certain foods.\n(i.e. Apple)",
    undefined,
  );
});

test("Example on same line", () => {
  const text = `
A list of strings. This is only shown when the player does not know the room's type (e.g.
locked shop, dice room).
  `;
  testIncompleteSentence(text, undefined);
});

test("Date", () => {
  testIncompleteSentence("January 1st", undefined);
});

test("Code block", () => {
  const text = `
This is a complete sentences.

\`\`\`
this is not a complete sentence
\`\`\`

This is also a complete sentences.
  `;
  testIncompleteSentence(text, undefined);
});

test("Parenthetical code", () => {
  const text = `
Add the word. (\`numLeadingSpaces\` will be set.)
  `;
  testIncompleteSentence(text, undefined);
});

test("Numbered list with incomplete sentences", () => {
  const text = `
We split to a new line if:
1. adding the word would make it overflow past the maximum length
2. and there is at least one word on the current line
  `;
  testIncompleteSentence(text, undefined);
});

test("Text that looks like a numbered list", () => {
  const text = `
This method will crash the game if you provide it an invalid type, such as -1, 0, or
500. Thus, it is safer to use the \`foo\` method instead.
  `;
  testIncompleteSentence(text, undefined);
});

test("ts-expect", () => {
  const text = `
@ts-expect-error The next line really is valid, I promise.
  `;
  testIncompleteSentence(text, undefined);
});

test("eslint-disable", () => {
  const text = `
eslint-disable-next-line isaacscript/complete-sentences-jsdoc
  `;
  testIncompleteSentence(text, undefined);
});

test("Text with Jr. in the middle of text", () => {
  const text = `
The player only changes to Esau Jr. on the frame after the item is used.
  `;
  testIncompleteSentence(text, undefined);
});

test("Text with Jr. at the end of text", () => {
  const text = `
Check to see if it is the frame after the player has used Esau Jr.
  `;
  testIncompleteSentence(text, undefined);
});

test("Text with etc. in the middle of text", () => {
  const text = `
This is the sprite for "1st", "2nd", etc. on the left side of the screen.
  `;
  testIncompleteSentence(text, undefined);
});

test("Text with etc. at the end of text", () => {
  const text = `
This is the sprite for "1st", "2nd", etc.
  `;
  testIncompleteSentence(text, undefined);
});

test("Short text with a non-word character", () => {
  const text = `
Racing+ items
  `;
  testIncompleteSentence(text, undefined);
});

test("Incomplete sentence at the end of a block", () => {
  const text = `
This is a sentence

This is another sentence.
  `;
  testIncompleteSentence(text, "missingPeriod");
});

test("Sentence with a double period", () => {
  const text = `
This is a sentence..
  `;
  testIncompleteSentence(text, "doublePeriod");
});

test("Sentence with question marks in single quotation marks", () => {
  const text = `
Note that this contains 'Blue Womb' instead of '???' for stage 9.
  `;
  testIncompleteSentence(text, undefined);
});

test("Sentence with question marks in double quotation marks", () => {
  const text = `
Note that this contains "Blue Womb" instead of "???" for stage 9.
  `;
  testIncompleteSentence(text, undefined);
});

test("Sentence with hard-coded allow words", () => {
  const text = `
iPad on iOS 13 detection.
  `;
  testIncompleteSentence(text, undefined);
});
