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
export type CustomStageTSConfig = Readonly<{
  /** Mandatory. The name of the custom stage. */
  name: string;

  /**
   * Mandatory. The path to the XML file that contains the rooms for the custom stage (created with
   * Basement Renovator).
   */
  xmlPath: string;

  /**
   * Mandatory. An arbitrarily chosen prefix in the range of 101-999 that will be unique to this
   * stage.
   *
   * Make sure the chosen prefix does not conflict with any other mods. You can find a list of
   * registered room variant prefixes on the IsaacScript website:
   * https://isaacscript.github.io/main/custom-stages
   *
   * @minimum 101
   * @maximum 109
   */
  roomVariantPrefix: number;

  /**
   * Optional. An integer between 2 and 13, corresponding to the `LevelStage` enum. This is the
   * number of the stage that will be warped to and used as a basis for the stage by the level
   * generation algorithm.
   *
   * (It is not possible to use Basement 1 as a base stage due to conflicts with the `Game.SetStage`
   * method.)
   *
   * If not specified, `LevelStage.BASEMENT_2` (2) will be used.
   *
   * @minimum 2
   * @maximum 13
   */
  baseStage?: number;

  /**
   * Optional. An integer between 0 and 5, corresponding to the `StageType` enum. This is the number
   * of the stage type that will be warped to and used as a basis for the stage by the level
   * generation algorithm.
   *
   * If not specified, `StageType.ORIGINAL` (0) will be used.
   *
   * @minimum 0
   * @maximum 5
   */
  baseStageType?: number;

  /**
   * Optional. An object containing the paths to the backdrop graphics for the stage. (A backdrop is
   * the graphics for the walls and floor.) If not specified, the graphics for Basement will be
   * used.
   */
  backdropPNGPaths?: Readonly<{
    /**
     * An array that contains the full paths to the graphic files that are used for the floor in
     * narrow rooms. (The "n" stands for "narrow").
     *
     * You must have at least one path in this array, but you can specify more than one to randomly
     * add extra variety (like the vanilla stages do).
     *
     * For an example of this, see the vanilla file "resources/gfx/backdrop/01_basement_nfloor.png".
     */
    nFloors: readonly string[];

    /**
     * An array that contains the full paths to the graphic files that are used for the floor in L
     * rooms.
     *
     * You must have at least one path in this array, but you can specify more than one to randomly
     * add extra variety (like the vanilla stages do).
     *
     * For an example of this, see the vanilla file "resources/gfx/backdrop/01_lbasementfloor.png".
     */
    lFloors: readonly string[];

    /**
     * An array that contains the full paths to the graphic files that are used for the walls of the
     * floor.
     *
     * You must have at least one path in this array, but you can specify more than one to randomly
     * add extra variety (like the vanilla stages do).
     *
     * For an example of this, see the vanilla file "resources/gfx/backdrop/01_basement.png". (In
     * the vanilla file, they concatenate all four variations together into one PNG file. However,
     * for the custom stages feature, you must separate each wall variation into a separate file.)
     */
    walls: readonly string[];

    /**
     * An array that contains the full paths to the graphic files for the stage's corners.
     *
     * You must have at least one path in this array, but you can specify more than one to randomly
     * add extra variety (like the vanilla stages do).
     *
     * For an example of this, see the vanilla file "resources/gfx/backdrop/01_basement.png". (In
     * the vanilla file, they concatenate both variations together into one PNG file and put it in
     * the top right hand corner. The corners are shown in the top right hand corner of the file,
     * with two different variations concatenated together. However, for the custom stages feature,
     * you must separate each corner variation into a separate file (and put it in a different file
     * from the walls).
     */
    corners: readonly string[];
  }>;

  /**
   * Optional. The full path to the spritesheet that contains the graphics of the decorations for
   * the floor.
   *
   * If not specified, the vanilla Basement decorations spritesheet will be used. For reference,
   * this is located at: `resources/gfx/grid/props_01_basement.png`
   */
  decorationsPNGPath?: string;

  /**
   * Optional. The full path to the spritesheet that contains the graphics of the rocks/blocks/urns
   * for the floor.
   *
   * If specified, it is assumed that you have your own custom rock alt type, and all vanilla
   * rewards/enemies that spawn from urns will be automatically removed. Use the
   * `POST_GRID_ENTITY_BROKEN` callback to make your own custom rewards. Or, if you want to emulate
   * a vanilla urn/mushroom/skull/polyp/bucket, use the `spawnRockAltReward` helper function.
   *
   * If not specified, the vanilla Basement rocks spritesheet will be used. For reference, this is
   * located at: `resources-dlc3/gfx/grid/rocks_basement.png`
   */
  rocksPNGPath?: string;

  /**
   * Optional. The full path to the spritesheet that contains the graphics of the pits for the
   * floor.
   *
   * If not specified, the vanilla Basement pits spritesheet will be used. For reference, this is
   * located at: `resources/gfx/grid/grid_pit.png`
   */
  pitsPNGPath?: string;

  /**
   * Optional. A collection of paths that contain graphics for the doors of the floor. If not
   * specified, the doors for Basement will be used.
   */
  doorPNGPaths?: Readonly<{
    /**
     * Optional. The full path to the spritesheet that contains the graphics of the normal doors for
     * the floor.
     *
     * If not specified, the vanilla Basement door spritesheet will be used. For reference, this is
     * located at: `resources/gfx/grid/door_01_normaldoor.png`
     */
    normal?: string; // RoomType.DEFAULT (1)

    /**
     * Optional. The full path to the spritesheet that contains the graphics of the Treasure Room
     * doors for the floor.
     *
     * If not specified, the vanilla Basement door spritesheet will be used. For reference, this is
     * located at: `resources/gfx/grid/door_02_treasureroomdoor.png`
     */
    treasureRoom?: string; // RoomType.TREASURE (4)

    /**
     * Optional. The full path to the spritesheet that contains the graphics of the Boss Room doors
     * for the floor.
     *
     * If not specified, the vanilla Basement door spritesheet will be used. For reference, this is
     * located at: `resources/gfx/grid/door_10_bossroomdoor.png`
     */
    bossRoom?: string; // RoomType.BOSS (5)

    /**
     * Optional. The full path to the spritesheet that contains the graphics of the Secret Room and
     * Super Secret Room doors for the floor.
     *
     * If not specified, the vanilla Basement door spritesheet will be used. For reference, this is
     * located at: `resources/gfx/grid/door_08_holeinwall.png`
     */
    secretRoom?: string; // RoomType.SECRET (7) and RoomType.SUPER_SECRET (8)

    /**
     * Optional. The full path to the spritesheet that contains the graphics of the arcade doors for
     * the floor.
     *
     * If not specified, the vanilla Basement door spritesheet will be used. For reference, this is
     * located at: `resources/gfx/grid/door_05_arcaderoomdoor.png`
     */
    arcade?: string; // RoomType.ARCADE (9)

    /**
     * Optional. The full path to the spritesheet that contains the graphics of the Curse Room doors
     * for the floor.
     *
     * If not specified, the vanilla Basement door spritesheet will be used. For reference, this is
     * located at: `resources/gfx/grid/door_04_selfsacrificeroomdoor.png`
     */
    curseRoom?: string; // RoomType.CURSE (10)

    /**
     * Optional. The full path to the spritesheet that contains the graphics of the normal Challenge
     * Room doors for the floor.
     *
     * If not specified, the vanilla Basement door spritesheet will be used. For reference, this is
     * located at: `resources/gfx/grid/door_03_ambushroomdoor.png`
     */
    normalChallengeRoom?: string; // RoomType.CHALLENGE (11)

    /**
     * Optional. The full path to the spritesheet that contains the graphics of the Boss Challenge
     * Room doors for the floor.
     *
     * If not specified, the vanilla Basement door spritesheet will be used. For reference, this is
     * located at: `resources/gfx/grid/door_09_bossambushroomdoor.png`
     */
    bossChallengeRoom?: string; // RoomType.CHALLENGE (11)

    /**
     * Optional. The full path to the spritesheet that contains the graphics of the Devil Room doors
     * for the floor.
     *
     * If not specified, the vanilla Basement door spritesheet will be used. For reference, this is
     * located at: `resources/gfx/grid/door_07_devilroomdoor.png`
     */
    devilRoom?: string; // RoomType.DEVIL (14)

    /**
     * Optional. The full path to the spritesheet that contains the graphics of the Angel Room doors
     * for the floor.
     *
     * If not specified, the vanilla Basement door spritesheet will be used. For reference, this is
     * located at: `resources/gfx/grid/door_07_holyroomdoor.png`
     */
    angelRoom?: string; // RoomType.ANGEL (15)

    /**
     * Optional. The full path to the spritesheet that contains the graphics of the Boss Rush doors
     * for the floor.
     *
     * If not specified, the vanilla Basement door spritesheet will be used. For reference, this is
     * located at: `resources/gfx/grid/door_15_bossrushdoor.png`
     */
    bossRush?: string; // RoomType.BOSS_RUSH (17)

    /**
     * Optional. The full path to the spritesheet that contains the graphics of the Chest Room doors
     * for the floor.
     *
     * If not specified, the vanilla Basement door spritesheet will be used. For reference, this is
     * located at: `resources/gfx/grid/door_02b_chestroomdoor.png`
     */
    chestRoom?: string; // RoomType.CHEST (20)
  }>;

  /**
   * Optional. An array of shadow objects that describe the graphics for the custom shadows of the
   * floor. (In this context, "shadows" are the outlines from things on the roof. For example, in
   * Basement, a shadow of a sideways V is used, among others.) If not specified, no extra shadows
   * will be drawn.
   */
  shadows?: Readonly<{
    /**
     * Optional. An array containing the shadows that will be used in rooms of shape
     * `RoomShape.SHAPE_1x1` (1), `RoomShape.IH` (2), and `RoomShape.IV` (3).
     *
     * If more than one shadow is specified, one will be randomly chosen for each room.
     *
     * If not specified, no extra shadows will be drawn in these room shapes.
     */
    "1x1"?: readonly CustomStageShadow[];

    /**
     * Optional. An array containing the shadows that will be used in rooms of shape
     * `RoomShape.SHAPE_1x2` (4) and `RoomShape.IIV` (5).
     *
     * If more than one shadow is specified, one will be randomly chosen for each room.
     *
     * If not specified, no extra shadows will be drawn in these room shapes.
     */
    "1x2"?: readonly CustomStageShadow[];

    /**
     * Optional. An array containing the shadows that will be used in rooms of shape
     * `RoomShape.SHAPE_2x1` (6) and `RoomShape.IIH` (7).
     *
     * If more than one shadow is specified, one will be randomly chosen for each room.
     *
     * If not specified, no extra shadows will be drawn in these room shapes.
     */
    "2x1"?: readonly CustomStageShadow[];

    /**
     * Optional. An array containing the shadows that will be used in rooms of shape
     * `RoomShape.SHAPE_2x2` (8), `RoomShape.LTL` (9), `RoomShape.LTR` (10), `RoomShape.LBL` (11),
     * and `RoomShape.LBR` (12).
     *
     * If more than one shadow is specified, one will be randomly chosen for each room.
     *
     * If not specified, no extra shadows will be drawn in these room shapes.
     */
    "2x2"?: readonly CustomStageShadow[];
  }>;

  /** Optional. An array containing the bosses that should be used for the stage. */
  bossPool?: readonly CustomStageBossPoolEntry[];

  /** Optional. A collection of colors used in the boss "versus" screen. */
  versusScreen?: Readonly<{
    /**
     * Optional. An object representing the color to use for the background of the boss "versus"
     * screen. If not specified, the color for Basement 1 will be used.
     *
     * For a list of the colors that correspond to the vanilla stages, see
     * `versusScreenBackgroundColors.ts`.
     */
    backgroundColor?: Readonly<{
      /**
       * @minimum 0
       * @maximum 1
       */
      r: number;

      /**
       * @minimum 0
       * @maximum 1
       */
      g: number;

      /**
       * @minimum 0
       * @maximum 1
       */
      b: number;

      /**
       * @minimum 0
       * @maximum 1
       */
      a: number;
    }>;

    /**
     * Optional. An object representing the color to use for the dirt spots in the boss "versus"
     * screen. (There are two dirt spots; one for the player and one for the boss.) If not
     * specified, the color for Basement 1 will be used.
     *
     * For a list of the colors that correspond to the vanilla stages, see
     * `versusScreenDirtSpotColors.ts`.
     */
    dirtSpotColor?: Readonly<{
      /**
       * @minimum 0
       * @maximum 1
       */
      r: number;

      /**
       * @minimum 0
       * @maximum 1
       */
      g: number;

      /**
       * @minimum 0
       * @maximum 1
       */
      b: number;

      /**
       * @minimum 0
       * @maximum 1
       */
      a: number;
    }>;
  }>;
}>;

/**
 * A description of a custom stage shadow. (In this context, "shadows" are the outlines from things
 * on the roof. For example, in Basement, a shadow of a sideways V is used, among others.)
 */
// ts-prune-ignore-next
export type CustomStageShadow = Readonly<{
  /**
   * The full path to the shadow overlay PNG file.
   *
   * For an example of a vanilla shadow overlay, see:
   * `resources/gfx/overlays/basement/1x1_overlay_1.png`
   */
  pngPath: string;

  /**
   * Optional. An object representing the color used for the shadow.
   *
   * If not specified, an object of `{ r: 0, g: 0, b: 0, a: 0.25 }` will be used (which corresponds
   * to 75% faded black).
   */
  color?: Readonly<{
    /**
     * @minimum 0
     * @maximum 1
     */
    r: number;

    /**
     * @minimum 0
     * @maximum 1
     */
    g: number;

    /**
     * @minimum 0
     * @maximum 1
     */
    b: number;

    /**
     * @minimum 0
     * @maximum 1
     */
    a: number;
  }>;
}>;

/** An object that represents a possible boss for a custom stage. */
// ts-prune-ignore-next
export interface CustomStageBossPoolEntry {
  /**
   * The name of the boss. This must correspond to the entry in "entities2.xml".
   *
   * Note that since there is no way to determine the corresponding `EntityType` of the boss during
   * compile-time, you must specify the `EntityType` at run-time when your mod first loads using the
   * `registerCustomBoss` helper function.
   */
  name: string;

  /**
   * The weight of the boss. This is used when randomly selecting which boss to use for the floor.
   * For example, use a value of 1 if you want this boss to be equally likely as any other boss, 0.5
   * if you want it to be half as likely, 2 if you want it to be twice as likely, and so on.
   */
  weight: number;
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
export type CustomStageRoomMetadata = Readonly<{
  type: number;
  variant: number;
  subType: number;
  shape: number;
  doorSlotFlags: number;
  weight: number;
}>;
