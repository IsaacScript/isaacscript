import chalk from "chalk";
import { fatalError } from "complete-node";
import figlet from "figlet"; // Cannot be "import * as figlet" or else run-time errors occur.
import { PROJECT_NAME, PROJECT_VERSION } from "./constants.js";

export async function printBanner(): Promise<void> {
  const banner = await figlet.text(PROJECT_NAME);
  console.log(chalk.green(banner));

  const versionString = `v${PROJECT_VERSION}`;
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
