// These cached enum value arrays are only meant to be used internally within
// `isaacscript-common-node`.

import { getEnumValues } from "isaacscript-common-ts";
import { PackageManager } from "./enums/PackageManager.js";

export const PACKAGE_MANAGER_VALUES = getEnumValues(PackageManager);
