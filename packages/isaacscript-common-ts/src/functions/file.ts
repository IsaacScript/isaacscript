import fs from "fs";
import { error } from "./utils";

export function fileExists(filePath: string): boolean {
  let pathExists: boolean;
  try {
    pathExists = fs.existsSync(filePath);
  } catch (err) {
    error(`Failed to check if "${filePath}" exists:`, err);
  }

  return pathExists;
}
