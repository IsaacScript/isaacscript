import chalk from "chalk";
import { parseSemanticVersion } from "complete-common";
import { PROJECT_NAME } from "./constants.js";

// 20.11 is the minimum version that supports `import.meta.dirname`.
const REQUIRED_NODE_JS_MAJOR_VERSION = 20;
const REQUIRED_NODE_JS_MINOR_VERSION = 11;

export function validateNodeVersion(): void {
  const { version } = process;

  const semanticVersion = parseSemanticVersion(version);
  if (semanticVersion === undefined) {
    throw new Error(`Failed to parse the Node version: ${version}`);
  }

  const { majorVersion, minorVersion } = semanticVersion;
  if (majorVersion > REQUIRED_NODE_JS_MAJOR_VERSION) {
    return;
  }

  if (
    majorVersion === REQUIRED_NODE_JS_MAJOR_VERSION
    && minorVersion >= REQUIRED_NODE_JS_MINOR_VERSION
  ) {
    return;
  }

  console.error(`Your Node.js version is: ${chalk.red(version)}`);
  console.error(
    `${PROJECT_NAME} requires a Node.js version of ${chalk.red(
      `${REQUIRED_NODE_JS_MAJOR_VERSION}.${REQUIRED_NODE_JS_MINOR_VERSION}.0`,
    )} or greater.`,
  );
  console.error(
    `Please upgrade your version of Node.js before using ${PROJECT_NAME}.`,
  );
  process.exit(1);
}
