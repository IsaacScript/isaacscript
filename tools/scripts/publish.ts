import { readCachedProjectGraph } from "@nrwl/devkit";
import { execSync } from "child_process";
import path from "path";
import yargs from "yargs";
import {
  error,
  parseIntSafe,
  parseSemVer,
} from "../../packages/isaacscript-cli/src/utils";
import * as file from "../../packages/isaacscript-cli/src/file";

const PACKAGE_JSON = "package.json";

main();

function main() {
  const args = parseArgs();

  const name = args._[0];
  if (typeof name !== "string" || name === "undefined" || name === "") {
    error("The name of the project must be provided as the first argument.");
  }

  const graph = readCachedProjectGraph();
  const project = graph.nodes[name];

  invariant(
    project,
    `Failed to find project "${name}" in the monorepo. Is the "project.json" configured correctly?`,
  );

  const projectPath = path.join(__dirname, "..", "..", "packages", name);
  invariant(
    file.exists(projectPath, false),
    `Failed to find the project directory at: ${projectPath}`,
  );

  const packageJSONPath = path.join(projectPath, PACKAGE_JSON);
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

  const oldVersion = packageJSON.version;
  if (typeof oldVersion !== "string") {
    error(
      `Failed to read the version of the "${PACKAGE_JSON}" file since the version was of type: ${typeof oldVersion}`,
    );
  }

  const outputPath = project.data?.targets?.build?.options?.outputPath;
  invariant(
    outputPath,
    `Failed to find "build.options.outputPath" of project "${name}". Is the "project.json" configured correctly?`,
  );
  const buildPath = path.join(__dirname, "..", "..", outputPath);
  const packageJSONBuildPath = path.join(buildPath, PACKAGE_JSON);

  const newVersion = getNewVersion(args, oldVersion);
  if (newVersion !== undefined) {
    writeVersionInPackageJSON(packageJSONPath, newVersion, false);
    writeVersionInPackageJSON(packageJSONBuildPath, newVersion, false);
  }

  process.chdir(buildPath);
  const tag = args.production ? "next" : "latest";
  execSync(`yarn publish --access public --tag ${tag}`);

  console.log(`Successfully published: ${name}@${newVersion}`);
}

function parseArgs() {
  const yargsObject = yargs(process.argv.slice(2))
    .usage("usage: $0 [project-name] [options]")
    .command("publish", "Publish a project to NPM. (default)", (builder) =>
      builder
        .positional("project", {
          type: "string",
          description: "The name of the monorepo project to publish",
        })
        .option("production", {
          alias: "p",
          type: "boolean",
          description: 'Publish to "latest" instead of "next"',
        })
        .option("skip-increment", {
          alias: "s",
          type: "boolean",
          description: `Do not increment the version number in the "${PACKAGE_JSON}" file`,
        })
        .option("skip-commit", {
          alias: "c",
          type: "boolean",
          description: "Do not make a commit to the git repository",
        })
        .option("set-version", {
          alias: "t",
          type: "string",
          description: "Set the version number to a specific string",
        }),
    )
    .parseSync();

  return yargsObject;
}

function getNewVersion(
  args: Record<string, unknown>,
  oldVersion: string,
): string | undefined {
  if (typeof args.setVersion === "string" && args.setVersion !== "") {
    return args.setVersion;
  }

  if (args.skipIncrement) {
    return undefined;
  }

  const [majorVersion, minorVersion, patchVersion] = parseSemVer(oldVersion);

  if (args.production) {
    const incrementedPatchVersion = patchVersion + 1;
    return `${majorVersion}.${minorVersion}.${incrementedPatchVersion}`;
  }

  let devNumberString = "0";
  if (oldVersion.includes("dev")) {
    const match = oldVersion.match(/^\d+\.\d+\.\d+-dev\.(\d+)/);
    if (match === null) {
      error(
        `Failed to parse the dev version in the "${PACKAGE_JSON}" file: ${oldVersion}`,
      );
    }
    devNumberString = match[1];
  }

  const devNumber = parseIntSafe(devNumberString);
  if (Number.isNaN(devNumber)) {
    error(
      `Failed to parse the dev version in the "${PACKAGE_JSON}" file: ${oldVersion}`,
    );
  }

  const incrementedDevNumber = devNumber + 1;
  const suffix = `-dev.${incrementedDevNumber}`;
  return `${majorVersion}.${minorVersion}.${patchVersion}${suffix}`;
}

function writeVersionInPackageJSON(
  packageJSONPath: string,
  version: string,
  verbose: boolean,
) {
  const packageJSON = file.read(packageJSONPath, verbose);
  const newPackageJSON = packageJSON.replace(
    /"version": ".+",/,
    `"version": "${version}",`,
  );
  file.write(packageJSONPath, newPackageJSON, verbose);
}

function invariant(condition: unknown, msg: string) {
  if (!condition) {
    error(msg);
  }
}
