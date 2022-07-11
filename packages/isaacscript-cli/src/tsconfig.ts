import chalk from "chalk";
import { PROJECT_NAME, TSCONFIG_JSON, TSCONFIG_JSON_PATH } from "./constants";
import { CustomStage } from "./interfaces/CustomStage";
import { getJSONC } from "./json";
import { error, isRecord } from "./utils";

const ADVICE = `Try copying the "${TSCONFIG_JSON}" from a brand new ${PROJECT_NAME} project.`;

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

export function getCustomStages(verbose: boolean): CustomStage[] {
  const isaacScriptSection = getIsaacScriptSection(verbose);
  if (isaacScriptSection === undefined) {
    return [];
  }

  const { customStages } = isaacScriptSection;
  if (!Array.isArray(customStages)) {
    error(
      `Your "${chalk.green(
        TSCONFIG_JSON_PATH,
      )}" file has a non-array value for the "customStages" property, which is surely a mistake. ${ADVICE}`,
    );
  }

  for (const customStage of customStages) {
    if (!isRecord(customStage)) {
      error(
        `Your "${chalk.green(
          TSCONFIG_JSON_PATH,
        )}" file has a non-object value for one of the custom stages in the "customStages" property, which is surely a mistake. ${ADVICE}`,
      );
    }

    const { name } = customStage;
    if (typeof name !== "string") {
      error(
        `Your "${chalk.green(
          TSCONFIG_JSON_PATH,
        )}" file has a non-string value for the "name" property for one of the custom stages, which is surely a mistake. ${ADVICE}`,
      );
    }

    const { xmlPath } = customStage;
    if (typeof xmlPath !== "string") {
      error(
        `Your "${chalk.green(
          TSCONFIG_JSON_PATH,
        )}" file has a non-string value for the "xmlPath" property for one of the custom stages, which is surely a mistake. ${ADVICE}`,
      );
    }

    const { roomVariantPrefix } = customStage;
    if (typeof roomVariantPrefix !== "string") {
      error(
        `Your "${chalk.green(
          TSCONFIG_JSON_PATH,
        )}" file has a non-string value for the "roomVariantPrefix" property for one of the custom stages, which is surely a mistake. ${ADVICE}`,
      );
    }
  }

  return customStages as CustomStage[];
}
