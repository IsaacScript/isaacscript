import { Ajv } from "ajv";
import chalk from "chalk";
import { isObject } from "complete-common";
import { fatalError, getJSONC } from "complete-node";
import {
  ISAACSCRIPT_SCHEMA_PATH,
  PROJECT_NAME,
  TSCONFIG_JSON,
  TSCONFIG_JSON_PATH,
} from "./constants.js";
import type { CustomStageTSConfig } from "./interfaces/copied/CustomStageTSConfig.js";

const ADVICE = `Try copying the "${TSCONFIG_JSON}" from a brand new ${PROJECT_NAME} project.`;

const isaacScriptSchema = getJSONC(ISAACSCRIPT_SCHEMA_PATH);
const ajv = new Ajv();
const schemaValidate = ajv.compile(isaacScriptSchema);

function getTSConfigJSON(): Record<string, unknown> {
  return getJSONC(TSCONFIG_JSON_PATH);
}

function getIsaacScriptSection(): Record<string, unknown> | undefined {
  const tsConfig = getTSConfigJSON();

  // We allow different kinds of casing for the field name.
  for (const fieldName of ["isaacscript", "isaacScript", "IsaacScript"]) {
    const field = tsConfig[fieldName];
    if (field !== undefined) {
      if (!isObject(field)) {
        fatalError(
          `Your "${chalk.green(
            TSCONFIG_JSON_PATH,
          )}" file has a non-object value for the "${fieldName}" field, which is surely a mistake. ${ADVICE}`,
        );
      }

      return field;
    }
  }

  return undefined;
}

/**
 * Parses the "tsconfig.json" file and returns the "customStages" section. If the section does not
 * exist, returns an empty array.
 *
 * Most of this function is simply performing input validation.
 */
export function getCustomStagesFromTSConfig(): readonly CustomStageTSConfig[] {
  const isaacScriptSection = getIsaacScriptSection();
  if (isaacScriptSection === undefined) {
    return [];
  }

  const valid = schemaValidate(isaacScriptSection);
  if (!valid) {
    console.error(
      'Your "isaacscript" section in the "tsconfig.json" file has the following errors:',
    );
    console.error(schemaValidate.errors);
    fatalError(
      "For more information, see the custom stages documentation on the website.",
    );
  }

  // "customStages" is an optional field.
  const { customStages } = isaacScriptSection;
  if (customStages === undefined) {
    return [];
  }

  // The type of "customStages" should be validated by Ajv, but check again just in case.
  if (!Array.isArray(customStages)) {
    fatalError(
      `Failed to parse the "customStages" field, since it was not an array. ${ADVICE}.`,
    );
  }

  // Perform some extra validation that can't be automatically done by Ajv.
  for (const customStageTSConfig of customStages as CustomStageTSConfig[]) {
    const { name } = customStageTSConfig;
    if (name === "") {
      fatalError(
        chalk.red(
          "One of the custom stages has a blank name, which is not allowed.",
        ),
      );
    }

    const { xmlPath } = customStageTSConfig;
    if (xmlPath === "") {
      fatalError(
        chalk.red(
          `The "${name}" custom stage has a blank "xmlPath" field, which is not allowed.`,
        ),
      );
    }

    const { roomVariantPrefix } = customStageTSConfig;
    if (roomVariantPrefix < 100 || roomVariantPrefix > 999) {
      fatalError(
        chalk.red(
          `The "${name}" custom stage has an invalid value for the "roomVariantPrefix" field: ${roomVariantPrefix}`,
        ),
      );
    }

    const { baseStage } = customStageTSConfig;
    if (baseStage !== undefined && (baseStage < 2 || baseStage > 13)) {
      fatalError(
        `The "${name}" custom stage has an invalid value for the "baseStage" field: ${baseStage}`,
      );
    }

    const { baseStageType } = customStageTSConfig;
    if (
      baseStageType !== undefined &&
      (baseStageType < 0 || baseStageType > 5)
    ) {
      fatalError(
        `The "${name}" custom stage has an invalid value for the "baseStageType" field: ${baseStageType}`,
      );
    }
  }

  return customStages as CustomStageTSConfig[];
}
