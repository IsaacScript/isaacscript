import chalk from "chalk";

// IsaacScript requires Node to be at least 14.14,
// since that is the version that added the "fs.rmSync()" function
export default function validateNodeVersion(): void {
  const { version } = process;

  const match = /^v(\d+)\.(\d+)\.(\d)+$/g.exec(version);
  if (match === null) {
    console.error(`Failed to parse your NodeJS version of: ${version}`);
    process.exit(1);
  }

  const majorVersionString = match[1];
  const minorVersionString = match[2];
  const patchVersionString = match[3];

  const majorVersion = parseInt(majorVersionString, 10);
  const minorVersion = parseInt(minorVersionString, 10);

  if (Number.isNaN(majorVersion) || Number.isNaN(minorVersion)) {
    console.error(`Failed to parse your NodeJS version of: ${version}`);
    process.exit(1);
  }

  if (majorVersion >= 15) {
    return;
  }
  if (majorVersion === 14 && minorVersion >= 14) {
    return;
  }

  console.error(
    `Your Node.js version is: ${chalk.red(
      `${majorVersionString}.${minorVersionString}.${patchVersionString}`,
    )}`,
  );
  console.error(
    `IsaacScript requires a Node.js version of ${chalk.red(
      "14.14.0",
    )} or greater.`,
  );
  console.error(
    "Please upgrade your version of Node.js before using IsaacScript.",
  );
  process.exit(1);
}
