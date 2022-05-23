import { readCachedProjectGraph } from "@nrwl/devkit";
import { execSync } from "child_process";
import path from "path";
import * as file from "../../packages/isaacscript-cli/src/file";
import { error } from "../../packages/isaacscript-cli/src/utils";

const PACKAGE_JSON = "package.json";
const REPO_ROOT = path.join(__dirname, "..", "..");

main();

function main() {
  const args = process.argv.slice(2);

  const name = args[0];
  if (typeof name !== "string" || name === "undefined" || name === "") {
    error("The name of the project must be provided as the first argument.");
  }

  const graph = readCachedProjectGraph();
  const project = graph.nodes[name];

  invariant(
    project,
    `Failed to find project "${name}" in the monorepo. Is the "project.json" configured correctly?`,
  );

  const buildPath = path.join(REPO_ROOT, "dist", "packages", name);
  invariant(
    file.exists(buildPath, false),
    `Failed to find the build directory at: ${buildPath}`,
  );

  const packageJSONPath = path.join(buildPath, PACKAGE_JSON);
  invariant(
    file.exists(packageJSONPath, false),
    `Failed to find the "${PACKAGE_JSON}" file at: ${packageJSONPath}`,
  );

  const packageJSONString = file.read(packageJSONPath, false);
  let packageJSON: Record<string, unknown>;
  try {
    packageJSON = JSON.parse(packageJSONString);
  } catch (err) {
    error(`Failed to parse the "${PACKAGE_JSON}" file:`, err);
  }

  const version = packageJSON.version;
  if (typeof version !== "string") {
    error(
      `Failed to read the version of the "${PACKAGE_JSON}" file since the version was of type: ${typeof version}`,
    );
  }

  process.chdir(buildPath);
  const tag = version.includes("dev") ? "next" : "latest";
  execSync(`yarn publish --non-interactive --access public --tag ${tag}`);

  console.log(`Successfully published: ${name}@${version} (w/ tag: ${tag})`);
}

function invariant(condition: unknown, msg: string) {
  if (!condition) {
    error(msg);
  }
}
