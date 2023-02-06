import { getPackageManagerUsedForExistingProject } from "../../packageManager.js";
import { Args } from "../../parseArgs.js";

export function checkCSpell(args: Args): void {
  const verbose = args.verbose === true;

  const packageManager = getPackageManagerUsedForExistingProject(args, verbose);
  console.log(packageManager);
}
