import { echo, readFile, writeFile } from "isaacscript-common-node";
import { isKebabCase, trimSuffix } from "isaacscript-common-ts";
import path from "node:path";
import { PACKAGE_ROOT, PLUGIN_NAME } from "./constants.js";
import { generateAll } from "./generate.js";
import { getCamelCaseRuleName } from "./utils.js";

const DOCS_PATH = path.join(PACKAGE_ROOT, "docs");
const TEMPLATE_MD_PATH = path.join(DOCS_PATH, "template.md");

const SRC_PATH = path.join(PACKAGE_ROOT, "src");
const TEMPLATE_SRC_PATH = path.join(SRC_PATH, "template.ts");

const TESTS_PATH = path.join(PACKAGE_ROOT, "tests");
const TEMPLATE_TEST_PATH = path.join(TESTS_PATH, "template.ts");

await createRule();

async function createRule() {
  const args = process.argv.slice(2);

  const firstArg = args[0];
  if (firstArg === undefined || firstArg === "") {
    throw new Error(
      'You must provide the rule name as the first argument. e.g. "strict-enums"',
    );
  }

  const secondArg = args[1];
  if (secondArg === undefined || secondArg === "") {
    throw new Error(
      'You must provide the rule description as the second argument. e.g. "Disallows the usage of unsafe enum patterns"',
    );
  }

  const ruleName = firstArg;
  const descriptionRaw = secondArg;

  if (!isKebabCase(ruleName)) {
    throw new Error("The rule name must be in kebab-case.");
  }

  const description = trimSuffix(descriptionRaw, ".");
  if (description.endsWith(".")) {
    throw new Error("The rule description cannot end with a period.");
  }

  createDocFile(ruleName, description);
  createSourceFile(ruleName, description);
  createTestFile(ruleName, description);
  await generateAll();

  echo(`Successfully created rule: ${ruleName}`);
}

function createDocFile(ruleName: string, description: string) {
  const templateMDContent = readFile(TEMPLATE_MD_PATH);
  const content = replaceTemplateText(templateMDContent, ruleName, description);
  const ruleMDPath = path.join(DOCS_PATH, "rules", `${ruleName}.md`);
  writeFile(ruleMDPath, content);
}

function createSourceFile(ruleName: string, description: string) {
  const templateSourceContent = readFile(TEMPLATE_SRC_PATH);
  const content = replaceTemplateText(
    templateSourceContent,
    ruleName,
    description,
  );
  const contentWithoutComments = removeFirstAndLastLine(content);
  const ruleSourcePath = path.join(SRC_PATH, "rules", `${ruleName}.ts`);
  writeFile(ruleSourcePath, contentWithoutComments);
}

function createTestFile(ruleName: string, description: string) {
  const templateTestContent = readFile(TEMPLATE_TEST_PATH);
  const content = replaceTemplateText(
    templateTestContent,
    ruleName,
    description,
  );
  const contentWithoutComments = removeFirstAndLastLine(content);
  const ruleTestPath = path.join(TESTS_PATH, "rules", `${ruleName}.test.ts`);
  writeFile(ruleTestPath, contentWithoutComments);
}

function replaceTemplateText(
  text: string,
  ruleName: string,
  ruleDescription: string,
) {
  const ruleNameCamelCase = getCamelCaseRuleName(ruleName);

  return text
    .replaceAll("RULE_NAME_CAMEL_CASE", ruleNameCamelCase)
    .replaceAll("RULE_NAME", ruleName)
    .replaceAll("RULE_DESCRIPTION", ruleDescription)
    .replaceAll("PLUGIN_NAME", PLUGIN_NAME);
}

/** Intended to be used on file content that needs to have a trailing newline. */
function removeFirstAndLastLine(text: string): string {
  const lines = text.trim().split("\n");
  lines.shift(); // Remove first line
  lines.pop(); // Remove last line
  lines.push(""); // Add a trailing newline
  return lines.join("\n");
}
