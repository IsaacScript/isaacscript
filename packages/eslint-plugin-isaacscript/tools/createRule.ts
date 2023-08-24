import fs from "node:fs";
import path from "node:path";
import { PLUGIN_NAME } from "./constants";
import { generateAll } from "./generateAll";
import {
  getCamelCaseRuleName,
  isKebabCase,
  removeFirstAndLastLine,
} from "./utils";

const REPO_ROOT = path.join(__dirname, "..");
const DOCS_PATH = path.join(REPO_ROOT, "docs");
const TEMPLATE_MD_PATH = path.join(DOCS_PATH, "template.md");

const SRC_PATH = path.join(REPO_ROOT, "src");
const TEMPLATE_SRC_PATH = path.join(SRC_PATH, "template.ts");

const TESTS_PATH = path.join(REPO_ROOT, "tests");
const TEMPLATE_TEST_PATH = path.join(TESTS_PATH, "template.ts");

createRule().catch((error) => {
  throw new Error(`Failed to create a rule: ${error}`);
});

async function createRule() {
  const firstArg = process.argv[2];
  if (firstArg === undefined || firstArg === "") {
    throw new Error(
      'You must provide the rule name as the first argument. e.g. "strict-enums"',
    );
  }

  const secondArg = process.argv[3];
  if (secondArg === undefined || secondArg === "") {
    throw new Error(
      'You must provide the rule description as the second argument. e.g. "Disallows the usage of unsafe enum patterns"',
    );
  }

  const ruleName = firstArg;
  const description = secondArg;

  if (!isKebabCase(ruleName)) {
    throw new Error("The rule name must be in kebab-case.");
  }

  if (description.endsWith(".")) {
    throw new Error("The rule description cannot end with a period.");
  }

  createDocFile(ruleName, description);
  createSourceFile(ruleName, description);
  createTestFile(ruleName, description);
  await generateAll();

  console.log(`Successfully created rule: ${ruleName}`);
}

function createDocFile(ruleName: string, description: string) {
  const templateMDContent = fs.readFileSync(TEMPLATE_MD_PATH, "utf8");
  const content = replaceTemplateText(templateMDContent, ruleName, description);
  const ruleMDPath = path.join(DOCS_PATH, "rules", `${ruleName}.md`);
  fs.writeFileSync(ruleMDPath, content);
}

function createSourceFile(ruleName: string, description: string) {
  const templateSourceContent = fs.readFileSync(TEMPLATE_SRC_PATH, "utf8");
  const content = replaceTemplateText(
    templateSourceContent,
    ruleName,
    description,
  );
  const contentWithoutComments = removeFirstAndLastLine(content);
  const ruleSourcePath = path.join(SRC_PATH, "rules", `${ruleName}.ts`);
  fs.writeFileSync(ruleSourcePath, contentWithoutComments);
}

function createTestFile(ruleName: string, description: string) {
  const templateTestContent = fs.readFileSync(TEMPLATE_TEST_PATH, "utf8");
  const content = replaceTemplateText(
    templateTestContent,
    ruleName,
    description,
  );
  const contentWithoutComments = removeFirstAndLastLine(content);
  const ruleTestPath = path.join(TESTS_PATH, "rules", `${ruleName}.test.ts`);
  fs.writeFileSync(ruleTestPath, contentWithoutComments);
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
