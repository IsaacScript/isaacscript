// Performs various checks on every "package.json" file in the repository.

import glob from "glob";
import path from "path";
import sortPackageJson from "sort-package-json";
import * as file from "../packages/isaacscript-cli/src/file";
import { error, isKebabCase } from "../packages/isaacscript-cli/src/utils";

const PACKAGE_JSON = "package.json";
const REPO_ROOT = path.join(__dirname, "..");
const REPO_ROOT_PACKAGE_JSON_PATH = path.join(REPO_ROOT, PACKAGE_JSON);

main();

function main() {
  process.chdir(REPO_ROOT);

  if (!packageJSONLint(REPO_ROOT_PACKAGE_JSON_PATH, undefined)) {
    process.exit(1);
  }
  const rootDeps = getDeps(REPO_ROOT_PACKAGE_JSON_PATH);

  const packageJSONPaths = glob.sync(`./packages/**/${PACKAGE_JSON}`, {
    ignore: ["node_modules/**", "dist/**"],
  });

  let atLeastOneError = false;
  for (const packageJSONPath of packageJSONPaths) {
    if (!packageJSONLint(packageJSONPath, rootDeps)) {
      atLeastOneError = true;
    }
  }

  if (atLeastOneError) {
    process.exit(1);
  }

  console.log('All "package.json" files are valid.');
}

function packageJSONLint(
  packageJSONPath: string,
  rootDeps: Record<string, string> | undefined,
): boolean {
  const isRoot = rootDeps === undefined;
  const isTemplateFile = packageJSONPath.includes("dynamic");
  const isDocs = packageJSONPath.includes("docs");
  const shouldBePrivate = isRoot || isDocs;

  const packageJSONString = file.read(packageJSONPath, false);
  const packageJSON = getPackageJSON(packageJSONString);

  const { name } = packageJSON;
  if (typeof name !== "string" || name === "") {
    console.error(`File is missing a "name" field: ${packageJSONPath}`);
    return false;
  }

  if (!isTemplateFile) {
    if (!isKebabCase(name)) {
      console.error(
        `File has a non-kebab-case "name" field: ${packageJSONPath}`,
      );
      return false;
    }
  }

  const { version } = packageJSON;
  if (typeof version !== "string" || version === "") {
    console.error(`File is missing a "version" field: ${packageJSONPath}`);
    return false;
  }

  if (shouldBePrivate && version !== "0.0.0") {
    console.error(`File must have a version of "0.0.0": ${packageJSONPath}`);
    return false;
  }

  const privateField = packageJSON["private"];
  if (shouldBePrivate && privateField !== true) {
    console.error(
      `File must have a private field equal to true: ${packageJSONPath}`,
    );
    return false;
  } else if (!shouldBePrivate && privateField !== undefined) {
    console.error(`File must not have a private field: ${packageJSONPath}`);
    return false;
  }

  const { description } = packageJSON;
  if (typeof description !== "string" || description === "") {
    console.error(`File is missing a "description" field: ${packageJSONPath}`);
    return false;
  }

  if (!description.endsWith(".")) {
    console.error(
      `File must have a trailing period in the "description" field: ${packageJSONPath}`,
    );
    return false;
  }

  if (!shouldBePrivate) {
    const { keywords } = packageJSON;
    if (typeof keywords !== "object") {
      console.error(`File is missing a "keywords" field: ${packageJSONPath}`);
    }

    if (!Array.isArray(keywords)) {
      console.error(
        `File has an invalid a "keywords" field: ${packageJSONPath}`,
      );
      return false;
    }
  }

  if (!isTemplateFile) {
    const { homepage } = packageJSON;
    if (typeof homepage !== "string" || homepage === "") {
      console.error(`File is missing a "homepage" field: ${packageJSONPath}`);
      return false;
    }

    if (homepage !== "https://isaacscript.github.io/") {
      console.error(`File has an invalid "homepage" field: ${packageJSONPath}`);
      return false;
    }

    const { bugs } = packageJSON;
    if (typeof bugs !== "object") {
      console.error(`File is missing a "bugs" field: ${packageJSONPath}`);
      return false;
    }

    const bugsURL = (bugs as Record<string, unknown>)["url"];
    if (typeof bugsURL !== "string" || bugsURL === "") {
      console.error(`File is missing a "bugs.url" field: ${packageJSONPath}`);
      return false;
    }

    if (bugsURL !== "https://github.com/IsaacScript/isaacscript/issues") {
      console.error(`File has an invalid "bugs.url" field: ${packageJSONPath}`);
      return false;
    }

    const { repository } = packageJSON;
    if (typeof repository !== "object") {
      console.error(`File is missing a "repository" field: ${packageJSONPath}`);
      return false;
    }

    const repositoryType = (repository as Record<string, unknown>)["type"];
    if (typeof repositoryType !== "string" || repositoryType === "") {
      console.error(
        `File is missing a "repository.type" field: ${packageJSONPath}`,
      );
      return false;
    }

    if (repositoryType !== "git") {
      console.error(
        `File has an invalid "repository.type" field: ${packageJSONPath}`,
      );
      return false;
    }

    const repositoryURL = (repository as Record<string, unknown>)["url"];
    if (typeof repositoryURL !== "string" || repositoryURL === "") {
      console.error(
        `File is missing a "repository.url" field: ${packageJSONPath}`,
      );
      return false;
    }

    if (
      repositoryURL !== "git+https://github.com/IsaacScript/isaacscript.git"
    ) {
      console.error(
        `File has an invalid "repository.url" field: ${packageJSONPath}`,
      );
      return false;
    }
  }

  const { license } = packageJSON;
  if (typeof license !== "string" || license === "") {
    console.error(`File is missing a "license" field: ${packageJSONPath}`);
    return false;
  }

  if (license !== "GPL-3.0" && license !== "MIT") {
    console.error(`File has an invalid "license" field: ${packageJSONPath}`);
    return false;
  }

  if (!isTemplateFile) {
    const packageDirectory = path.dirname(packageJSONPath);
    const licensePath = path.join(packageDirectory, "LICENSE");
    if (!file.exists(licensePath, false)) {
      console.error(`File does not exist: ${licensePath}`);
      return false;
    }

    const licenseFile = file.read(licensePath, false);
    if (
      license === "GPL-3.0" &&
      !licenseFile.includes("GNU GENERAL PUBLIC LICENSE")
    ) {
      console.error(`Invalid GPL license file: ${licensePath}`);
      return false;
    }
    if (license === "MIT" && !licenseFile.includes("The MIT License (MIT)")) {
      console.error(`Invalid MIT license file: ${licensePath}`);
      return false;
    }

    const { author } = packageJSON;
    if (typeof author !== "string" || author === "") {
      console.error(`File is missing a "author" field: ${packageJSONPath}`);
      return false;
    }

    if (author !== "Zamiell") {
      console.error(`File has an invalid "author" field: ${packageJSONPath}`);
      return false;
    }
  }

  // Docusaurus is bugged with the type field. Building will fail regardless of whether you specify
  // "commonjs" or "module".
  if (!isDocs) {
    const { type } = packageJSON;
    if (typeof type !== "string" || type === "") {
      console.error(`File is missing a "type" field: ${packageJSONPath}`);
      return false;
    }

    if (type !== "commonjs") {
      console.error(`File has an invalid "type" field: ${packageJSONPath}`);
      return false;
    }
  }

  const { files } = packageJSON;
  if (files !== undefined) {
    console.error(`File has a "files" field: ${packageJSONPath}`);
    return false;
  }

  if (!isTemplateFile && rootDeps !== undefined) {
    const { dependencies } = packageJSON;
    if (!checkDeps(dependencies, rootDeps, packageJSONPath)) {
      return false;
    }

    const { devDependencies } = packageJSON;
    if (!checkDeps(devDependencies, rootDeps, packageJSONPath)) {
      return false;
    }

    const { peerDependencies } = packageJSON;
    if (!checkDeps(devDependencies, rootDeps, packageJSONPath)) {
      return false;
    }
  }

  const sortedPackageJSONString = sortPackageJson(packageJSONString);
  if (packageJSONString !== sortedPackageJSONString) {
    console.error(`File is not sorted: ${packageJSONPath}`);
    return false;
  }

  return true;
}

function getDeps(packageJSONPath: string): Record<string, string> {
  const packageJSONString = file.read(packageJSONPath, false);
  const packageJSON = getPackageJSON(packageJSONString);

  let { dependencies, devDependencies, peerDependencies } = packageJSON;
  if (typeof dependencies !== "object") {
    dependencies = {};
  }
  if (typeof devDependencies !== "object") {
    devDependencies = {};
  }
  if (typeof peerDependencies !== "object") {
    peerDependencies = {};
  }

  return {
    ...(dependencies as Record<string, string>),
    ...(devDependencies as Record<string, string>),
    ...(peerDependencies as Record<string, string>),
  };
}

function checkDeps(
  object: unknown,
  rootDeps: Record<string, string>,
  packageJSONPath: string,
): boolean {
  const deps = object as Record<string, string>;

  if (deps === undefined || deps === null || typeof deps !== "object") {
    return true;
  }

  let atLeastOneError = false;
  for (const [key, value] of Object.entries(deps)) {
    let rootDepValue = rootDeps[key];
    if (rootDepValue === undefined) {
      // This is an internal dependency; thus, we need to look up the correct version in the
      // respective "package.json" file.
      const depPackageJSONPath = path.join(
        REPO_ROOT,
        "packages",
        key,
        PACKAGE_JSON,
      );
      const depPackageJSONString = file.read(depPackageJSONPath, false);
      const depPackageJSON = getPackageJSON(depPackageJSONString);
      const depVersion = depPackageJSON["version"];
      if (typeof depVersion !== "string") {
        error(`Failed to get the version from: ${depPackageJSONPath}`);
      }

      rootDepValue = `^${depVersion}`;
    }

    if (value !== rootDepValue) {
      console.error(
        `Incorrect dependency: ${packageJSONPath} - ${key}: ${value}`,
      );
      atLeastOneError = true;
    }
  }

  return !atLeastOneError;
}

function getPackageJSON(packageJSONString: string): Record<string, unknown> {
  let packageJSON: Record<string, unknown>;
  try {
    packageJSON = JSON.parse(packageJSONString);
  } catch (err) {
    error(`Failed to parse: ${path}`);
  }

  return packageJSON;
}
