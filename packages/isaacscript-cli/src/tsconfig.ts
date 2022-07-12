/* eslint-disable @nrwl/nx/enforce-module-boundaries,import/no-relative-packages */

import Ajv, { Schema } from "ajv";
import chalk from "chalk";
import { CustomStageTSConfig } from "../../isaacscript-common/src/interfaces/CustomStageTSConfig";
import {
  ISAACSCRIPT_SCHEMA_PATH,
  PROJECT_NAME,
  TSCONFIG_JSON,
  TSCONFIG_JSON_PATH,
} from "./constants";
import * as file from "./file";
import { getJSONC } from "./json";
import { error, isRecord } from "./utils";

const ADVICE = `Try copying the "${TSCONFIG_JSON}" from a brand new ${PROJECT_NAME} project.`;
const ISAACSCRIPT_SCHEMA_RAW = file.read(ISAACSCRIPT_SCHEMA_PATH, false);
const ISAACSCRIPT_SCHEMA = JSON.parse(ISAACSCRIPT_SCHEMA_RAW) as Schema;
const ajv = new Ajv();
const schemaValidate = ajv.compile(ISAACSCRIPT_SCHEMA);

function getTSConfigJSON(verbose: boolean): Record<string, unknown> {
  return getJSONC(TSCONFIG_JSON_PATH, verbose);
}

function getIsaacScriptSection(
  verbose: boolean,
): Record<string, unknown> | undefined {
  const tsConfig = getTSConfigJSON(verbose);

  // We allow different kinds of casing for the property name.
  for (const propertyName of ["isaacscript", "isaacScript", "IsaacScript"]) {
    const property = tsConfig[propertyName];
    if (property !== undefined) {
      if (!isRecord(property)) {
        error(
          `Your "${chalk.green(
            TSCONFIG_JSON_PATH,
          )}" file has a non-object value for the "${propertyName}" property, which is surely a mistake. ${ADVICE}`,
        );
      }

      return property;
    }
  }

  return undefined;
}

export function getFirstTSConfigIncludePath(verbose: boolean): string {
  const tsConfig = getTSConfigJSON(verbose);

  const { include } = tsConfig;
  if (include === undefined) {
    error(
      `Your "${chalk.green(
        TSCONFIG_JSON_PATH,
      )}" file does not have an "include" property, which is surely a mistake. ${ADVICE}`,
    );
  }

  if (!Array.isArray(include)) {
    error(
      `Your "${chalk.green(
        TSCONFIG_JSON_PATH,
      )}" file has an "include" property that is not an array, which is surely a mistake. ${ADVICE}`,
    );
  }

  const firstInclude = include[0] as unknown | undefined;
  if (firstInclude === undefined) {
    error(
      `Your "${chalk.green(
        TSCONFIG_JSON_PATH,
      )}" file has an empty "include" property, which is surely a mistake. ${ADVICE}`,
    );
  }

  if (typeof firstInclude !== "string") {
    error(
      `Your "${chalk.green(
        TSCONFIG_JSON_PATH,
      )}" file has a non-string "include" value, which is surely a mistake. ${ADVICE}`,
    );
  }

  return firstInclude;
}

/**
 * Parses the "tsconfig.json" file and returns the "customStages" section. If the section does not
 * exist, returns an empty array.
 */
export function getCustomStagesFromTSConfig(
  verbose: boolean,
): CustomStageTSConfig[] {
  const isaacScriptSection = getIsaacScriptSection(verbose);
  if (isaacScriptSection === undefined) {
    return [];
  }

  const valid = schemaValidate(isaacScriptSection);
  if (!valid) {
    console.error('Your "isaacscript" section has the following errors:');
    console.error(schemaValidate.errors);
    error(ADVICE);
  }

  return isaacScriptSection["customStages"] as CustomStageTSConfig[];
}
