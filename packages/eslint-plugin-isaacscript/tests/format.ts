import { formatText } from "../src/format.js";

const FORMAT_TEST_MAX_LENGTH = 100;

export function testFormatText(
  text: string,
  expectedFormattedText?: string,
  trim = true,
): void {
  if (expectedFormattedText === undefined) {
    expectedFormattedText = text;
  }

  if (trim) {
    text = text.trim();
    expectedFormattedText = expectedFormattedText.trim();
  }

  const formattedText = formatText(text, FORMAT_TEST_MAX_LENGTH);
  expect(formattedText).toBe(expectedFormattedText);
}
