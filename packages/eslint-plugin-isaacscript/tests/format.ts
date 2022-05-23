import { formatText } from "../src/format";

const FORMAT_TEST_MAX_LENGTH = 100;

export function testFormatText(
  text: string,
  formattedText?: string,
  trim = true,
): void {
  if (formattedText === undefined) {
    formattedText = text;
  }

  if (trim) {
    text = text.trim();
    formattedText = formattedText.trim();
  }

  expect(formatText(text, FORMAT_TEST_MAX_LENGTH)).toBe(formattedText);
}
