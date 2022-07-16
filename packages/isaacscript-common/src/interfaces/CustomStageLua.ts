/**
 * This is the format of a custom stage in the "isaacscript" section of the "tsconfig.json" file.
 *
 * The contents of this interface are used to create a "tsconfig-isaacscript-section-schema.json"
 * schema with the "ts-json-schema-generator" library.
 *
 * The contents of this interface are validated at run-time against the schema using the Ajv
 * library.
 *
 * The `CustomStageLua` interface extends this, adding room metadata.
 */

// ts-prune-ignore-next
export interface CustomStageTSConfig {
  /** The name of the custom stage. Mandatory. */
  readonly name: string;

  /**
   * Path to the XML file that contains the rooms for the custom stage (created with Basement
   * Renovator). Mandatory.
   */
  readonly xmlPath: string;

  /** An arbitrarily chosen prefix in the range of 101-999. Mandatory. */
  readonly roomVariantPrefix: number;

  /**
   * An integer between 2 and 13, corresponding to the `LevelStage` enum. This is the number of the
   * stage that will be warped to and used as a basis for the stage by the level generation
   * algorithm. Mandatory.
   *
   * (It is not possible to use Basement 1 as a base due to conflicts with the `Game.SetStage`
   * method.)
   */
  readonly baseStage: number;

  /**
   * An integer between 0 and 5, corresponding to the `StageType` enum. This is the number of the
   * stage type that will be warped to and used as a basis for the stage by the level generation
   * algorithm. Mandatory.
   */
  readonly baseStageType: number;

  /**
   * An object containing the paths to the backdrop for the stage. (A backdrop is the graphics for
   * the walls and floor.) Mandatory.
   */
  readonly backdrop: CustomStageBackdrop;

  /**
   * Optional. The path to the spritesheet that contains the graphics for the decorations for the
   * floor.
   *
   * If not specified, the vanilla Basement decorations spritesheet will be used. For reference,
   * this is located at: `C:\Program Files (x86)\Steam\steamapps\common\The Binding of Isaac
   * Rebirth\resources\gfx\grid\props_01_basement.png`
   */
  readonly decorationsPNGPath?: string;

  /**
   * Optional. The path to the spritesheet that contains the graphics for the rocks/blocks/urns for
   * the floor.
   *
   * If specified, it is assumed that you have your own custom rock alt type, and all vanilla
   * rewards/enemies that spawn from urns will be automatically removed. Use the
   * `POST_GRID_ENTITY_BROKEN` callback to make your own custom rewards. Or, if you want to emulate
   * a vanilla urn/mushroom/skull/polyp/bucket, use the `spawnRockAltReward` helper function.
   *
   * If not specified, the vanilla Basement rocks spritesheet will be used. For reference, this is
   * located at: `C:\Program Files (x86)\Steam\steamapps\common\The Binding of Isaac
   * Rebirth\resources-dlc3\gfx\grid\rocks_basement.png`
   */
  readonly rocksPNGPath?: string;

  /**
   * Optional. The path to the spritesheet that contains the graphics for the pits for the floor.
   *
   * If not specified, the vanilla Basement pits spritesheet will be used. For reference, this is
   * located at: `C:\Program Files (x86)\Steam\steamapps\common\The Binding of Isaac
   * Rebirth\resources\gfx\grid\grid_pit.png`
   */
  readonly pitsPNGPath?: string;

  /**
   * Optional. An object representing the color to use for the background of the boss "versus"
   * screen. If not specified, the color for Basement 1 will be used.
   *
   * For a list of the colors that correspond to the vanilla stages, see
   * `versusScreenBackgroundColors.ts`.
   */
  readonly versusScreenBackgroundColor?: {
    r: number;
    g: number;
    b: number;
  };

  /**
   * Optional. An object representing the color to use for the dirt spots in the boss "versus"
   * screen. (There are two dirt spots; one for the player and one for the boss.) If not specified,
   * the color for Basement 1 will be used.
   *
   * For a list of the colors that correspond to the vanilla stages, see
   * `versusScreenDirtSpotColors.ts`.
   */
  readonly versusScreenDirtSpotColor?: {
    r: number;
    g: number;
    b: number;
  };
}

interface CustomStageBackdrop {
  /**
   * The beginning of the path that leads to the backdrop graphics. For example:
   *
   * ```sh
   * gfx/backdrop/revelations/revelations_
   * ```
   */
  prefix: string;

  /**
   * The end of the path that leads to the backdrop graphics. In most cases, this will be ".png".
   */
  suffix: string;

  /**
   * An array of strings that represent the graphic files that are used for the floors in narrow
   * rooms. (The "n" stands for "narrow").
   *
   * You must have at least one string in this array, but you can specify more than one to randomly
   * add extra variety (like the vanilla stages do).
   *
   * For an example of this, see the vanilla file "resources/gfx/backdrop/01_basement_nfloor.png".
   */
  nFloors: string[];

  /**
   * An array of strings that represent the graphic files that are used for the floors in L rooms.
   *
   * You must have at least one string in this array, but you can specify more than one to randomly
   * add extra variety (like the vanilla stages do).
   *
   * For an example of this, see the vanilla file "resources/gfx/backdrop/01_lbasementfloor.png".
   */
  lFloors: string[];

  /**
   * An array of strings that represent the graphic files for the stage's walls.
   *
   * You must have at least one string in this array, but you can specify more than one to randomly
   * add extra variety (like the vanilla stages do).
   *
   * For an example of this, see the vanilla file "resources/gfx/backdrop/01_basement.png". (In the
   * vanilla file, they concatenate all four variations together into one PNG file. However, for the
   * custom stages feature, you must separate each wall variation into a separate file.)
   */
  walls: string[];

  /**
   * An array of strings that represent the graphic files for the stage's corners. You must have at
   * least one string in this array, but you can specify more than one to randomly add extra variety
   * (like the vanilla stages do).
   *
   * For an example of this, see the vanilla file "resources/gfx/backdrop/01_basement.png". (In the
   * vanilla file, they concatenate both variations together into one PNG file and put it in the top
   * right hand corner. The corners are shown in the top right hand corner of the file, with two
   * different variations concatenated together. However, for the custom stages feature, you must
   * separate each corner variation into a separate file (and put it in a different file from the
   * walls).
   */
  corners: string[];
}

/**
 * An object that represents a custom stage. The "metadata.lua" file contains an array of these
 * objects. Besides the room metadata, the data is the same as what is specified inside the
 * "tsconfig.json" file.
 *
 * The `CustomStage` interface extends this, adding more data.
 */
export interface CustomStageLua extends CustomStageTSConfig {
  readonly roomsMetadata: readonly CustomStageRoomMetadata[];
}

/**
 * Metadata about a custom stage room. Each custom stage object contains an array with metadata for
 * each room.
 */
export interface CustomStageRoomMetadata {
  readonly type: number;
  readonly variant: number;
  readonly subType: number;
  readonly shape: number;
  readonly doorSlotFlags: number;
  readonly weight: number;
}
