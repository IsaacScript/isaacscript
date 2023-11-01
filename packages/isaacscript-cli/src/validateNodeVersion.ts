import chalk from "chalk";
import { fatalError } from "isaacscript-common-node";
import { parseSemanticVersion } from "isaacscript-common-ts";
import { PROJECT_NAME } from "./constants.js";

const REQUIRED_NODE_JS_MAJOR_VERSION = 16;

/**
 * This program requires Node to be at least v16.0.0, since that is the version that added the
 * "fs.rmSync" function. (Node v15.0.0 is confirmed to not work.)
 */
export function validateNodeVersion(): void {
  const { version } = process;

  const semanticVersion = parseSemanticVersion(version);
  if (semanticVersion === undefined) {
    fatalError(`Failed to parse the Node version: ${version}`);
  }

  const { majorVersion } = semanticVersion;
  if (majorVersion >= REQUIRED_NODE_JS_MAJOR_VERSION) {
    return;
  }

  console.error(`Your Node.js version is: ${chalk.red(version)}`);
  console.error(
    `${PROJECT_NAME} requires a Node.js version of ${chalk.red(
      `${REQUIRED_NODE_JS_MAJOR_VERSION}.0.0`,
    )} or greater.`,
  );
  console.error(
    `Please upgrade your version of Node.js before using ${PROJECT_NAME}.`,
  );
  process.exit(1);
}
