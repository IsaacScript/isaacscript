import { removeLinesMatching } from "complete-common";
import { PackageManager, readFile } from "complete-node";
import { ok, strictEqual } from "node:assert/strict";
import test from "node:test";
import { applyPackageManagerToActionYML } from "./actionYML.js";
import { getTruncatedText } from "./commands/check/check.js";
import { ACTION_YML, ACTION_YML_TEMPLATE_PATH } from "./constants.js";

/** Mimics what the "init" command does to the template. */
async function generateActionYML(packageManager: PackageManager) {
  const template = await readFile(ACTION_YML_TEMPLATE_PATH);
  const actionYML = applyPackageManagerToActionYML(template, packageManager);
  return removeLinesMatching(actionYML, "@template")
    .replaceAll("PACKAGE_MANAGER_NAME", packageManager)
    .replaceAll("PACKAGE_MANAGER_INSTALL_COMMAND", `${packageManager} install`);
}

test("action.yml for npm does not set up Bun", async () => {
  const actionYML = await generateActionYML(PackageManager.npm);
  ok(actionYML.includes("cache: npm"));
  ok(!actionYML.includes("setup-bun"));
  ok(!actionYML.includes("@template"));
});

test("action.yml for Bun sets up Bun and does not use the Node.js cache", async () => {
  const actionYML = await generateActionYML(PackageManager.bun);
  ok(!actionYML.includes("cache:"));
  ok(actionYML.includes("- name: Setup Bun"));
  ok(actionYML.includes("uses: oven-sh/setup-bun@"));
  ok(!actionYML.includes("@template"));
});

for (const packageManager of [PackageManager.npm, PackageManager.bun]) {
  test(`check passes for a freshly generated ${packageManager} action.yml`, async () => {
    const template = await readFile(ACTION_YML_TEMPLATE_PATH);
    const actionYML = await generateActionYML(packageManager);

    const project = getTruncatedText(
      ACTION_YML,
      actionYML,
      new Set(),
      new Set(),
    );
    const parsedTemplate = getTruncatedText(
      ACTION_YML,
      template,
      project.ignoreLines,
      project.linesBeforeIgnore,
    );
    strictEqual(project.text, parsedTemplate.text);
  });
}
