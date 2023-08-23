import { getTruncatedText } from "./check.js";

test("no markers", () => {
  const templateText = `
line 1
line 2
line 3
`.trim();

  const { text } = getTruncatedText("test", templateText, new Set(), new Set());
  expect(text).toBe(templateText);
});

test("customization marker", () => {
  const templateText = `
line 1
@template-customization-start
line 2
@template-customization-end
line 3
  `.trim();

  const expectedTemplateText = `
line 1
line 3
  `.trim();

  const { text } = getTruncatedText("test", templateText, new Set(), new Set());
  expect(text).toBe(expectedTemplateText);
});

test("ignore block marker part 1", () => {
  const templateText = `
line 1
@template-ignore-block-start
// line 2
@template-ignore-block-end
line 3
  `.trim();

  const parsedTemplateText = `
line 1
line 3
  `.trim();

  const { text, ignoreLines } = getTruncatedText(
    "test",
    templateText,
    new Set(),
    new Set(),
  );
  expect(text).toBe(parsedTemplateText);
  expect(ignoreLines.size).toBe(1);
  expect([...ignoreLines][0]).toBe("line 2");
});

test("ignore block marker part 2", () => {
  const templateText = `
line 1
line 2
line 3
  `.trim();

  const expectedTemplateText = `
line 1
line 3
  `.trim();

  const { text } = getTruncatedText(
    "test",
    templateText,
    new Set(["line 2"]),
    new Set(),
  );
  expect(text).toBe(expectedTemplateText);
});

test("ignore next line part 1", () => {
  const templateText = `
line 1
@template-ignore-next-line
line 2
line 3
  `.trim();

  const expectedTemplateText = `
line 1
line 3
  `.trim();

  const { text, linesBeforeIgnore } = getTruncatedText(
    "test",
    templateText,
    new Set(),
    new Set(),
  );
  expect(linesBeforeIgnore.size).toBe(1);
  expect([...linesBeforeIgnore][0]).toBe("line 1");
  expect(text).toBe(expectedTemplateText);
});

test("ignore next line part 2", () => {
  const templateText = `
line 1
line 2
line 3
  `.trim();

  const expectedTemplateText = `
line 1
line 3
  `.trim();

  const { text } = getTruncatedText(
    "test",
    templateText,
    new Set(),
    new Set(["line 1"]),
  );
  expect(text).toBe(expectedTemplateText);
});
