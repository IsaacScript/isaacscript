import moment from "moment";
import type { Config } from "./classes/Config.js";
import { CURRENT_DIRECTORY_NAME } from "./constants.js";

export function getModTargetDirectoryName(config: Config): string {
  return config.customTargetModDirectoryName ?? CURRENT_DIRECTORY_NAME;
}

export function getTime(): string {
  return moment().format("h:mm:ss A"); // e.g. "1:23:45 AM"
}
