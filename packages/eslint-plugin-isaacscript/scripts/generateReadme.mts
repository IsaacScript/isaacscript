// Generates the rules table in "README.md".

import { readFile, writeFile } from "isaacscript-common-node";
import { assertDefined } from "isaacscript-common-ts";
import path from "node:path";
import { PACKAGE_ROOT } from "./constants.mjs";
import type { RuleDefinition } from "./utils.mjs";
import {
  formatWithPrettier,
  getRuleEntries,
  getRuleNameWithPluginNamePrefix,
  isRecommendedRule,
} from "./utils.mjs";

interface Marker {
  start: string;
  end: string;
}

const EMOJI_RECOMMENDED = ":white_check_mark:";
const EMOJI_FIXABLE = ":wrench:";
const EMOJI_REQUIRES_TYPE_INFORMATION = ":thought_balloon:";

export const README_MD_PATH = path.join(PACKAGE_ROOT, "README.md");
const RULES_TABLE_MARKER = newMarker("RULES_TABLE");

function newMarker(marker: string): Marker {
  return {
    start: newHTMLComment(marker),
    end: newHTMLComment(`/${marker}`),
  };
}

function newHTMLComment(comment: string) {
  return `<!-- ${comment} -->`;
}

export async function generateReadme(): Promise<void> {
  const rulesTable = await getRulesTable();
  await updateFileContentInsideMark(
    README_MD_PATH,
    rulesTable,
    RULES_TABLE_MARKER,
  );
}

async function getRulesTable() {
  const header = `
| Name | Description | :white_check_mark: | :wrench: | :thought_balloon: |
| ---- | ----------- | ------------------ | -------- | ----------------- |
  `.trim();
  const headerWithNewline = `${header}\n`;

  const ruleEntries = await getRuleEntries();
  const ruleRows = ruleEntries
    .map((ruleEntry) => getRuleTableRow(ruleEntry))
    .join("\n");

  return `${headerWithNewline}${ruleRows}`;
}

function getRuleTableRow(ruleEntry: [string, RuleDefinition]) {
  const [ruleName, rule] = ruleEntry;

  assertDefined(
    rule.meta.docs,
    `Rule ${ruleName} does not have a "docs" entry.`,
  );

  const fullRuleName = getRuleNameWithPluginNamePrefix(ruleName);
  const nameWithLink = `[\`${fullRuleName}\`](docs/rules/${ruleName}.md)`;
  const { description } = rule.meta.docs;
  const isRecommended = isRecommendedRule(rule) ? EMOJI_RECOMMENDED : "";
  const isFixable = rule.meta.fixable === undefined ? "" : EMOJI_FIXABLE;
  const requiresTypeInformation =
    "requiresTypeChecking" in rule.meta.docs
      ? EMOJI_REQUIRES_TYPE_INFORMATION
      : "";

  if (description.endsWith(".")) {
    throw new Error(
      `The "${ruleName}" rule ends with a period, which is incorrect and should be deleted.`,
    );
  }

  const ruleCells = [
    nameWithLink,
    description,
    isRecommended,
    isFixable,
    requiresTypeInformation,
  ];

  return `| ${ruleCells.join(" | ")} |`;
}

async function updateFileContentInsideMark(
  filePath: string,
  text: string,
  marker: Marker,
) {
  const originalFileText = readFile(filePath);
  const modifiedFileText = replaceContentInsideMark(
    originalFileText,
    text,
    marker,
  );

  const formattedModifiedFileText = await formatWithPrettier(
    modifiedFileText,
    "markdown",
  );

  if (originalFileText === formattedModifiedFileText) {
    return;
  }

  writeFile(filePath, formattedModifiedFileText);
}

function replaceContentInsideMark(
  original: string,
  text: string,
  marker: Marker,
) {
  const startMarkIndex = original.indexOf(marker.start);
  const endMarkIndex = original.indexOf(marker.end);

  if (startMarkIndex === -1) {
    throw new Error(`'${marker.start}' mark lost.`);
  }

  if (endMarkIndex === -1) {
    throw new Error(`'${marker.end}' mark lost.`);
  }

  if (startMarkIndex > endMarkIndex) {
    throw new Error(`'${marker.start}' should used before '${marker.end}'.`);
  }

  if (text !== "") {
    text = `${text}\n`;
  }

  text = `\n${text}`;

  const before = original.slice(0, startMarkIndex + marker.start.length);
  const after = original.slice(endMarkIndex);

  return before + text + after;
}
