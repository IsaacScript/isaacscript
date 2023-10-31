import { getEnumValues } from "isaacscript-common-ts";
import { PackageManager } from "./enums/PackageManager.js";

export const PACKAGE_MANAGER_VALUES: readonly PackageManager[] =
  getEnumValues(PackageManager);
