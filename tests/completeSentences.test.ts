import {
  CompleteSentenceMessageIds,
  getIncompleteSentences,
  getSentences,
} from "../src/completeSentence";

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

  const incompleteSentence = incompleteSentences[0];
  if (incompleteSentence === undefined) {
    throw new Error("Failed to get the incomplete sentence.");
  }
  expect(incompleteSentence.messageId).toBe(messageId);
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
    "https://github.com/eslint/eslint/blob/main/lib/rules/max-len.js",
    undefined,
  );
});

test("Trailing URL", () => {
  testIncompleteSentence(
    "Taken from ESLint: https://github.com/eslint/eslint/blob/main/lib/rules/max-len.js",
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

test("List", () => {
  const text = `
We split to a new line if:
1. adding the word would make it overflow past the maximum length
2. and there is at least one word on the current line
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
