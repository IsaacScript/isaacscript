import {
  removeLinesBetweenMarkers,
  removeLinesMatching,
} from "complete-common";
import { PackageManager } from "complete-node";

/**
 * The "action.yml" template contains a step to install Bun that is wrapped in this marker. It is
 * only kept for projects that use Bun as the package manager.
 */
export const MARKER_BUN = "@template-bun";

/**
 * The "actions/setup-node" action does not support Bun as a value for the "cache" input, so we
 * remove that line entirely for Bun projects.
 */
const CACHE_LINE = "cache: PACKAGE_MANAGER_NAME";

/**
 * Removes or keeps the package-manager-specific parts of the "action.yml" template. This must be
 * called before the generic template markers are removed.
 */
export function applyPackageManagerToActionYML(
  template: string,
  packageManager: PackageManager,
): string {
  if (packageManager !== PackageManager.bun) {
    return removeLinesBetweenMarkers(template, MARKER_BUN);
  }

  return removeLinesMatching(template, CACHE_LINE);
}

/**
 * Whether the line is part of the step that installs Bun, which only exists in the "action.yml"
 * file of projects that use Bun as the package manager.
 */
export function isSetupBunStepLine(line: string): boolean {
  const trimmedLine = line.trim();
  return (
    trimmedLine === "- name: Setup Bun"
    || trimmedLine.startsWith("uses: oven-sh/setup-bun@")
  );
}
