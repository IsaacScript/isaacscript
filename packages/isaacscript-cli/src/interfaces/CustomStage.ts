/**
 * This is the format of a custom stage in the "isaacscript" section of the "tsconfig.json" file.
 *
 * The contents of this interface must correspond to the definition in the "tsconfig-schema.json"
 * file.
 *
 * For the format of the Lua metadata for the stage, see `CustomStageLua`.
 */
export interface CustomStage {
  name: string;
  xmlPath: string;
  roomVariantPrefix: number;
}
