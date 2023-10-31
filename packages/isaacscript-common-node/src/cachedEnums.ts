import { getEnumValues } from "isaacscript-common-ts";
import { PackageManager } from "./index.js";

export const PACKAGE_MANAGER_VALUES: readonly PackageManager[] =
  getEnumValues(PackageManager);
