import { version } from "../package.json";

/**
 * Helper function to get the current version of the `isaac-typescript-definitions` library,
 * according to the "package.json" file at the time of compilation. (The version is in the Semantic
 * Versioning format, e.g. "1.0.0".)
 */
export function getIsaacTypeScriptDefinitionsVersion(): string {
  return version;
}
