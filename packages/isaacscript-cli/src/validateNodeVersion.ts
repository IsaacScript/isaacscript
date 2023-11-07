import chalk from "chalk";
import { fatalError } from "isaacscript-common-node";
import { parseSemanticVersion } from "isaacscript-common-ts";
import { PROJECT_NAME } from "./constants.js";

/**
 * The lowest supported LTS version as of the time of this writing.
 *
 * @see https://endoflife.date/nodejs
 */
const REQUIRED_NODE_JS_MAJOR_VERSION = 18;

/**
 * The IsaacScript CLI will probably work on versions of Node.js that are past end-of-life, but this
 * is not supported. We prefer failing fast to get the end-user on a modern version of Node.js.
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
