/* eslint-disable import/no-extraneous-dependencies */

// Generates the rules table in "README.md"

import fs from "fs";
import path from "path";
import {
  formatWithPrettier,
  getAlphabeticalRuleEntries,
  getFullRuleName,
  isRecommendedRule,
  RuleDefinition,
} from "./utils";

interface Marker {
  start: string;
  end: string;
}

const EMOJI_RECOMMENDED = ":white_check_mark:";
const EMOJI_FIXABLE = ":wrench:";
const EMOJI_REQUIRES_TYPE_INFORMATION = ":thought_balloon:";

const README_MD_PATH = path.join(__dirname, "..", "README.md");
const RULES_TABLE_MARKER = newMarker("RULES_TABLE");

generateRulesTable();

function newMarker(marker: string): Marker {
  return {
    start: newHTMLComment(marker),
    end: newHTMLComment(`/${marker}`),
  };
}

function newHTMLComment(comment: string) {
  return `<!-- ${comment} -->`;
}

function generateRulesTable() {
  const rulesTable = getRulesTable();
  updateFileContentInsideMark(README_MD_PATH, rulesTable, RULES_TABLE_MARKER);
}

function getRulesTable() {
  const header = `
| Name | Description | :white_check_mark: | :wrench: | :thought_balloon: |
| ---- | ----------- | ------------------ | -------- | ----------------- |
  `.trim();
  const headerWithNewline = `${header}\n`;

  const ruleEntries = getAlphabeticalRuleEntries();
  const ruleRows = ruleEntries
    .map((ruleEntry) => getRuleTableRow(ruleEntry))
    .join("\n");

  return `${headerWithNewline}${ruleRows}`;
}

function getRuleTableRow(ruleEntry: [string, RuleDefinition]) {
  const [ruleName, rule] = ruleEntry;

  if (rule.meta.docs === undefined) {
    throw new Error(`Rule ${ruleName} does not have a "docs" entry.`);
  }

  const fullRuleName = getFullRuleName(ruleName);

  const name = `[${fullRuleName}](docs/rules/${ruleName})`;
  const { description } = rule.meta.docs;
  const isRecommended = isRecommendedRule(rule) ? EMOJI_RECOMMENDED : "";
  const isFixable = rule.meta.hasSuggestions ? EMOJI_FIXABLE : "";
  const requiresTypeInformation =
    "requiresTypeChecking" in rule.meta ? EMOJI_REQUIRES_TYPE_INFORMATION : "";

  if (description.endsWith(".")) {
    throw new Error(
      `The "${ruleName}" rule ends with a period, which is incorrect and should be deleted.`,
    );
  }

  const ruleCells = [
    name,
    description,
    isRecommended,
    isFixable,
    requiresTypeInformation,
  ];

  return `| ${ruleCells.join(" | ")} |`;
}

function updateFileContentInsideMark(
  filePath: string,
  text: string,
  marker: Marker,
) {
  const originalFileText = fs.readFileSync(filePath, "utf8");
  const modifiedFileText = replaceContentInsideMark(
    originalFileText,
    text,
    marker,
  );

  const formattedModifiedFileText = formatWithPrettier(
    modifiedFileText,
    "markdown",
  );

  if (originalFileText === formattedModifiedFileText) {
    return;
  }

  fs.writeFileSync(filePath, formattedModifiedFileText);
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

  if (text) {
    text = `${text}\n`;
  }

  text = `\n${text}`;

  const before = original.slice(0, startMarkIndex + marker.start.length);
  const after = original.slice(endMarkIndex);

  return before + text + after;
}
