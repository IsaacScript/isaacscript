import { $sq } from "./execa.js";

/**
 * Helper function to check if the npm CLI tool is logged in. This is useful to throw an error
 * before publishing.
 */
export function isLoggedInToNPM(): boolean {
  try {
    $sq`npm whoami`;
  } catch {
    return false;
  }

  return true;
}
