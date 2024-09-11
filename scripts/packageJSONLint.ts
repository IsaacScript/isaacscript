// Performs various checks on every "package.json" file in the repository.

import type { ReadonlyRecord } from "complete-common";
import { isKebabCase } from "complete-common";
import {
  echo,
  exit,
  getArgs,
  getPackageJSON,
  getPackageJSONDependencies,
  isFile,
  isMain,
  readFile,
} from "complete-node";
import { globSync } from "glob";
import path from "node:path";

const REPO_ROOT = path.join(import.meta.dirname, "..");
const REPO_ROOT_PACKAGE_JSON_PATH = path.join(REPO_ROOT, "package.json");

if (isMain()) {
  main();
}

function main() {
  const args = getArgs();
  const verbose = args.includes("--verbose");

  if (verbose) {
    echo('Checking "package.json" files...');
  }

  if (!packageJSONLint(verbose)) {
    exit(1);
  }

  if (verbose) {
    echo('All "package.json" files are valid.');
  }
}

/** @returns Whether or not all "package.json" files are valid. */
export function packageJSONLint(verbose: boolean): boolean {
  if (!isPackageJSONValid(REPO_ROOT_PACKAGE_JSON_PATH, undefined, verbose)) {
    return false;
  }
  const rootDeps = getDeps(REPO_ROOT_PACKAGE_JSON_PATH);

  const packageJSONPaths = globSync("./packages/**/package.json", {
    ignore: ["**/dist/**", "**/node_modules/**"],
    cwd: REPO_ROOT,
  });

  checkRootDepsUpToDate(rootDeps, packageJSONPaths);

  let allValid = true;
  for (const packageJSONPath of packageJSONPaths) {
    if (!isPackageJSONValid(packageJSONPath, rootDeps, verbose)) {
      allValid = false;
    }
  }

  return allValid;
}

function isPackageJSONValid(
  packageJSONPath: string,
  rootDeps: ReadonlyRecord<string, string> | undefined,
  verbose: boolean,
): boolean {
  if (verbose) {
    console.log(`Checking: ${packageJSONPath}`);
  }

  const isRoot = rootDeps === undefined;
  const isTemplateFile = packageJSONPath.includes("dynamic");
  const isDocs = packageJSONPath.includes("docs");
  const shouldBePrivate = isRoot || isDocs;

  const packageJSON = getPackageJSON(packageJSONPath);

  const { name } = packageJSON;
  if (typeof name !== "string" || name === "") {
    echo(`File is missing a "name" field: ${packageJSONPath}`);
    return false;
  }

  if (!isTemplateFile && !isKebabCase(name)) {
    echo(`File has a non-kebab-case "name" field: ${packageJSONPath}`);
    return false;
  }

  const { version } = packageJSON;
  if (!shouldBePrivate && (typeof version !== "string" || version === "")) {
    echo(`File is missing a "version" field: ${packageJSONPath}`);
    return false;
  }

  const privateField = packageJSON["private"];
  if (shouldBePrivate && privateField !== true) {
    echo(`File must have a private field equal to true: ${packageJSONPath}`);
    return false;
  }

  if (!shouldBePrivate && privateField !== undefined) {
    echo(`File must not have a private field: ${packageJSONPath}`);
    return false;
  }

  const { description } = packageJSON;
  if (typeof description !== "string" || description === "") {
    echo(`File is missing a "description" field: ${packageJSONPath}`);
    return false;
  }

  if (!description.endsWith(".")) {
    echo(
      `File must have a trailing period in the "description" field: ${packageJSONPath}`,
    );
    return false;
  }

  if (!shouldBePrivate) {
    const { keywords } = packageJSON;
    if (typeof keywords !== "object") {
      echo(`File is missing a "keywords" field: ${packageJSONPath}`);
    }

    if (!Array.isArray(keywords)) {
      echo(`File has an invalid a "keywords" field: ${packageJSONPath}`);
      return false;
    }
  }

  if (!isTemplateFile) {
    const { homepage } = packageJSON;
    if (typeof homepage !== "string" || homepage === "") {
      echo(`File is missing a "homepage" field: ${packageJSONPath}`);
      return false;
    }

    if (homepage !== "https://isaacscript.github.io/") {
      echo(`File has an invalid "homepage" field: ${packageJSONPath}`);
      return false;
    }

    const { bugs } = packageJSON;
    if (typeof bugs !== "object") {
      echo(`File is missing a "bugs" field: ${packageJSONPath}`);
      return false;
    }

    const bugsURL = (bugs as Record<string, unknown>)["url"];
    if (typeof bugsURL !== "string" || bugsURL === "") {
      echo(`File is missing a "bugs.url" field: ${packageJSONPath}`);
      return false;
    }

    if (bugsURL !== "https://github.com/IsaacScript/isaacscript/issues") {
      echo(`File has an invalid "bugs.url" field: ${packageJSONPath}`);
      return false;
    }

    const { repository } = packageJSON;
    if (typeof repository !== "object") {
      echo(`File is missing a "repository" field: ${packageJSONPath}`);
      return false;
    }

    const repositoryType = (repository as Record<string, unknown>)["type"];
    if (typeof repositoryType !== "string" || repositoryType === "") {
      echo(`File is missing a "repository.type" field: ${packageJSONPath}`);
      return false;
    }

    if (repositoryType !== "git") {
      echo(`File has an invalid "repository.type" field: ${packageJSONPath}`);
      return false;
    }

    const repositoryURL = (repository as Record<string, unknown>)["url"];
    if (typeof repositoryURL !== "string" || repositoryURL === "") {
      echo(`File is missing a "repository.url" field: ${packageJSONPath}`);
      return false;
    }

    if (
      repositoryURL !== "git+https://github.com/IsaacScript/isaacscript.git"
    ) {
      echo(`File has an invalid "repository.url" field: ${packageJSONPath}`);
      return false;
    }
  }

  const { license } = packageJSON;
  if (typeof license !== "string" || license === "") {
    echo(`File is missing a "license" field: ${packageJSONPath}`);
    return false;
  }

  if (license !== "GPL-3.0" && license !== "MIT") {
    echo(`File has an invalid "license" field: ${packageJSONPath}`);
    return false;
  }

  if (!isTemplateFile) {
    const packageDirectory = path.dirname(packageJSONPath);
    const licensePath = path.join(packageDirectory, "LICENSE");
    if (!isFile(licensePath)) {
      echo(`File does not exist: ${licensePath}`);
      return false;
    }

    const licenseFile = readFile(licensePath);
    switch (license) {
      case "GPL-3.0": {
        if (!licenseFile.includes("GNU GENERAL PUBLIC LICENSE")) {
          echo(`Invalid GPL license file: ${licensePath}`);
          return false;
        }

        break;
      }

      case "MIT": {
        if (!licenseFile.includes("The MIT License (MIT)")) {
          echo(`Invalid MIT license file: ${licensePath}`);
          return false;
        }

        break;
      }
    }

    const { author } = packageJSON;
    if (typeof author !== "string" || author === "") {
      echo(`File is missing a "author" field: ${packageJSONPath}`);
      return false;
    }

    if (author !== "Zamiell") {
      echo(`File has an invalid "author" field: ${packageJSONPath}`);
      return false;
    }
  }

  // Docusaurus is bugged with the type field. Building will fail regardless of whether you specify
  // "commonjs" or "module".
  if (!isDocs) {
    const { type } = packageJSON;
    if (typeof type !== "string" || type === "") {
      echo(`File is missing a "type" field: ${packageJSONPath}`);
      return false;
    }
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

    // We skip checking for peer dependencies, since they are all based on the major version.
    // e.g. "typescript": ">= 5.0.0"
  }

  return true;
}

/** Gets the dependencies of the root monorepo "package.json" file. */
function getDeps(packageJSONPath: string): Record<string, string> {
  const dependencies =
    getPackageJSONDependencies(packageJSONPath, "dependencies") ?? {};
  const devDependencies =
    getPackageJSONDependencies(packageJSONPath, "devDependencies") ?? {};
  const peerDependencies =
    getPackageJSONDependencies(packageJSONPath, "peerDependencies") ?? {};

  const deps = {
    ...dependencies,
    ...devDependencies,
    ...peerDependencies,
  };

  // `eslint-plugin-isaacscript` is not a root dependency of the monorepo, so it has to be
  // explicitly added to the list of deps.
  const pluginVersion = getVersionForSpecificPackage(
    "eslint-plugin-isaacscript",
  );
  deps["eslint-plugin-isaacscript"] = `^${pluginVersion}`;

  return deps;
}

function getVersionForSpecificPackage(packageName: string): string {
  const packageJSONPath = path.join(
    REPO_ROOT,
    "packages",
    packageName,
    "package.json",
  );
  const packageJSON = getPackageJSON(packageJSONPath);
  const packageVersion = packageJSON["version"];
  if (typeof packageVersion !== "string") {
    throw new TypeError(`Failed to parse the version from: ${packageJSONPath}`);
  }

  return packageVersion;
}

function checkDeps(
  object: unknown,
  rootDeps: ReadonlyRecord<string, string>,
  packageJSONPath: string,
): boolean {
  const deps = object as Record<string, string> | undefined | null;

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
        "package.json",
      );
      const depPackageJSON = getPackageJSON(depPackageJSONPath);
      const depVersion = depPackageJSON["version"];
      if (typeof depVersion !== "string") {
        throw new TypeError(
          `Failed to get the version from: ${depPackageJSONPath}`,
        );
      }

      rootDepValue = `^${depVersion}`;
    }

    if (value !== rootDepValue) {
      echo(
        `Incorrect dependency: ${packageJSONPath} - ${key}: ${value} --> ${rootDepValue}`,
      );
      atLeastOneError = true;
    }
  }

  return !atLeastOneError;
}

function checkRootDepsUpToDate(
  rootDeps: ReadonlyRecord<string, string>,
  packageJSONPaths: readonly string[],
) {
  for (const [rootDepName, rootDepVersion] of Object.entries(rootDeps)) {
    const matchingPackageJSONPath = packageJSONPaths.find((packageJSONPath) =>
      packageJSONPath.includes(`/${rootDepName}/`),
    );
    if (matchingPackageJSONPath === undefined) {
      continue;
    }

    const packageJSON = getPackageJSON(matchingPackageJSONPath);

    const { version } = packageJSON;
    if (typeof version !== "string" || version === "") {
      throw new Error(
        `Failed to find the version for file: ${matchingPackageJSONPath}`,
      );
    }

    const versionString = `^${version}`;
    if (
      rootDepVersion !== versionString &&
      rootDepName !== "eslint-plugin-isaacscript"
    ) {
      throw new Error(
        `Root dependency "${rootDepName}" is not up to date: ${rootDepVersion} --> ${versionString}`,
      );
    }
  }
}
