/**
 * This is the format of a custom stage in the "isaacscript" section of the "tsconfig.json" file.
 *
 * The contents of this interface must be explicitly validated in the "getCustomStages" function.
 *
 * The contents of this interface must correspond to the definition in the
 * "tsconfig-schema-isaacscript.json" file.
 *
 * For the format of the Lua metadata for the stage, see `CustomStageLua`.
 */
export interface CustomStage {
  /** The name of the custom stage. */
  name: string;

  /**
   * Path to the XML file that contains the rooms for the custom stage (created with Basement
   * Renovator).
   */
  xmlPath: string;

  /** An arbitrarily chosen prefix in the range of 101-999. */
  roomVariantPrefix: number;
}
