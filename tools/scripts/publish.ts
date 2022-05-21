// - This is a minimal script to publish your package to NPM.
// - This script is executed on "dist/path/to/library" as "cwd" by default.
// - You might need to authenticate with NPM before running this script.

import { readCachedProjectGraph } from "@nrwl/devkit";
import { execSync } from "child_process";
import { readFileSync, writeFileSync } from "fs";

main();

function main() {
  const [, , name, version, tag] = process.argv;

  // Validate the version.
  const validVersion = /^\d+\.\d+\.\d+(-\w+\.\d+)?/;
  invariant(
    version && validVersion.test(version),
    `No version provided or version did not match Semantic Versioning, expected: #.#.#-tag.# or #.#.#, got ${version}.`
  );

  const graph = readCachedProjectGraph();
  const project = graph.nodes[name];

  invariant(
    project,
    `Could not find project "${name}" in the workspace. Is the project.json configured correctly?`
  );

  const outputPath = project.data?.targets?.build?.options?.outputPath;
  invariant(
    outputPath,
    `Could not find "build.options.outputPath" of project "${name}". Is project.json configured  correctly?`
  );

  process.chdir(outputPath);

  // Update the version in "package.json" before publishing.
  try {
    const json = JSON.parse(readFileSync(`package.json`).toString());
    json.version = version;
    writeFileSync(`package.json`, JSON.stringify(json, null, 2));
  } catch (e) {
    console.error(`Error reading package.json file from library build output.`);
  }

  const noTagProvided =
    tag === undefined || tag === null || tag === "" || tag === "undefined";
  const tagToUse = noTagProvided ? "next" : tag;

  execSync(`yarn publish --access public --tag ${tagToUse}`);
}

function invariant(condition, message) {
  if (!condition) {
    console.error(message);
    process.exit(1);
  }
}
