import chalk from "chalk";
import figlet from "figlet";
import { fatalError, getPackageJSONVersion } from "isaacscript-common-node";
import { PROJECT_NAME, REPO_ROOT } from "./constants.js";

export function printBanner(): void {
  const banner = figlet.textSync(PROJECT_NAME);
  console.log(chalk.green(banner));

  const isaacScriptCLIVersion = getPackageJSONVersion(REPO_ROOT);
  const versionString = `v${isaacScriptCLIVersion}`;
  const bannerLines = banner.split("\n");
  const firstBannerLine = bannerLines[0];
  if (firstBannerLine === undefined) {
    fatalError(
      firstBannerLine,
      "Failed to get the first line of the banner text.",
    );
  }
  const bannerHorizontalLength = firstBannerLine.length;
  const leftPaddingAmount = Math.floor(
    (bannerHorizontalLength + versionString.length) / 2,
  );
  const versionLine = versionString.padStart(leftPaddingAmount);
  console.log(`${versionLine}\n`);
}
