import { LevelStage, StageType } from "isaac-typescript-definitions";

/**
 * A mapping of stage and stage types to the corresponding English level name.
 *
 * This is useful because the `Level.GetName` method returns a localized version of the level name,
 * which will not display correctly on some fonts.
 *
 * Note that this contains "Blue Womb" instead of "???" for stage 9.
 */
export const LEVEL_NAMES = {
  // 1
  [LevelStage.BASEMENT_1]: {
    [StageType.ORIGINAL]: "Basement 1",
    [StageType.WRATH_OF_THE_LAMB]: "Cellar 1",
    [StageType.AFTERBIRTH]: "Burning Basement 1",
    [StageType.GREED_MODE]: "Basement",
    [StageType.REPENTANCE]: "Downpour 1",
    [StageType.REPENTANCE_B]: "Dross 1",
  },

  // 2
  [LevelStage.BASEMENT_2]: {
    [StageType.ORIGINAL]: "Basement 2",
    [StageType.WRATH_OF_THE_LAMB]: "Cellar 2",
    [StageType.AFTERBIRTH]: "Burning Basement 2",
    [StageType.GREED_MODE]: "Basement",
    [StageType.REPENTANCE]: "Downpour 2",
    [StageType.REPENTANCE_B]: "Dross 2",
  },

  // 3
  [LevelStage.CAVES_1]: {
    [StageType.ORIGINAL]: "Caves 1",
    [StageType.WRATH_OF_THE_LAMB]: "Catacombs 1",
    [StageType.AFTERBIRTH]: "Flooded Caves 1",
    [StageType.GREED_MODE]: "Caves",
    [StageType.REPENTANCE]: "Mines 1",
    [StageType.REPENTANCE_B]: "Ashpit 1",
  },

  // 4
  [LevelStage.CAVES_2]: {
    [StageType.ORIGINAL]: "Caves 2",
    [StageType.WRATH_OF_THE_LAMB]: "Catacombs 2",
    [StageType.AFTERBIRTH]: "Flooded Caves 2",
    [StageType.GREED_MODE]: "Caves",
    [StageType.REPENTANCE]: "Mines 2",
    [StageType.REPENTANCE_B]: "Ashpit 2",
  },

  // 5
  [LevelStage.DEPTHS_1]: {
    [StageType.ORIGINAL]: "Depths 1",
    [StageType.WRATH_OF_THE_LAMB]: "Necropolis 1",
    [StageType.AFTERBIRTH]: "Dank Depths 1",
    [StageType.GREED_MODE]: "Depths",
    [StageType.REPENTANCE]: "Mausoleum 1",
    [StageType.REPENTANCE_B]: "Gehenna 1",
  },

  // 6
  [LevelStage.DEPTHS_2]: {
    [StageType.ORIGINAL]: "Depths 2",
    [StageType.WRATH_OF_THE_LAMB]: "Necropolis 2",
    [StageType.AFTERBIRTH]: "Dank Depths 2",
    [StageType.GREED_MODE]: "Depths",
    [StageType.REPENTANCE]: "Mausoleum 2",
    [StageType.REPENTANCE_B]: "Gehenna 2",
  },

  // 7
  [LevelStage.WOMB_1]: {
    [StageType.ORIGINAL]: "Womb 1",
    [StageType.WRATH_OF_THE_LAMB]: "Utero 1",
    [StageType.AFTERBIRTH]: "Scarred Womb 1",
    [StageType.GREED_MODE]: "Womb",
    [StageType.REPENTANCE]: "Corpse 1",
    [StageType.REPENTANCE_B]: "Mortis 1",
  },

  // 8
  [LevelStage.WOMB_2]: {
    [StageType.ORIGINAL]: "Womb 2",
    [StageType.WRATH_OF_THE_LAMB]: "Utero 2",
    [StageType.AFTERBIRTH]: "Scarred Womb 2",
    [StageType.GREED_MODE]: "Womb",
    [StageType.REPENTANCE]: "Corpse 2",
    [StageType.REPENTANCE_B]: "Mortis 2",
  },

  // 9
  [LevelStage.BLUE_WOMB]: {
    [StageType.ORIGINAL]: "Blue Womb",
    [StageType.WRATH_OF_THE_LAMB]: "Blue Womb",
    [StageType.AFTERBIRTH]: "Blue Womb",
    [StageType.GREED_MODE]: "Blue Womb",
    [StageType.REPENTANCE]: "Blue Womb",
    [StageType.REPENTANCE_B]: "Blue Womb",
  },

  // 10
  [LevelStage.SHEOL_CATHEDRAL]: {
    [StageType.ORIGINAL]: "Sheol",
    [StageType.WRATH_OF_THE_LAMB]: "Cathedral",
    [StageType.AFTERBIRTH]: "Undefined",
    [StageType.GREED_MODE]: "Sheol",
    [StageType.REPENTANCE]: "Undefined",
    [StageType.REPENTANCE_B]: "Undefined",
  },

  // 11
  [LevelStage.DARK_ROOM_CHEST]: {
    [StageType.ORIGINAL]: "Dark Room",
    [StageType.WRATH_OF_THE_LAMB]: "The Chest",
    [StageType.AFTERBIRTH]: "Undefined",
    [StageType.GREED_MODE]: "The Shop",
    [StageType.REPENTANCE]: "Undefined",
    [StageType.REPENTANCE_B]: "Undefined",
  },

  // 12
  [LevelStage.VOID]: {
    [StageType.ORIGINAL]: "The Void",
    [StageType.WRATH_OF_THE_LAMB]: "The Void",
    [StageType.AFTERBIRTH]: "The Void",
    [StageType.GREED_MODE]: "The Void",
    [StageType.REPENTANCE]: "The Void",
    [StageType.REPENTANCE_B]: "The Void",
  },

  // 13
  [LevelStage.HOME]: {
    [StageType.ORIGINAL]: "Home",
    [StageType.WRATH_OF_THE_LAMB]: "Home",
    [StageType.AFTERBIRTH]: "Home",
    [StageType.GREED_MODE]: "Home",
    [StageType.REPENTANCE]: "Home",
    [StageType.REPENTANCE_B]: "Home",
  },
} as const satisfies Record<LevelStage, Record<StageType, string>>;
