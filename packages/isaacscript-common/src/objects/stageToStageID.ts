import { LevelStage, StageID, StageType } from "isaac-typescript-definitions";

const BASEMENT_TO_STAGE_ID = {
  [StageType.ORIGINAL]: StageID.BASEMENT, // 0
  [StageType.WRATH_OF_THE_LAMB]: StageID.CELLAR, // 1
  [StageType.AFTERBIRTH]: StageID.BURNING_BASEMENT, // 2
  [StageType.GREED_MODE]: StageID.BASEMENT, // 3
  [StageType.REPENTANCE]: StageID.DOWNPOUR, // 4
  [StageType.REPENTANCE_B]: StageID.DROSS, // 5
} as const satisfies Record<StageType, StageID>;

const CAVES_TO_STAGE_ID = {
  [StageType.ORIGINAL]: StageID.CAVES, // 0
  [StageType.WRATH_OF_THE_LAMB]: StageID.CATACOMBS, // 1
  [StageType.AFTERBIRTH]: StageID.FLOODED_CAVES, // 2
  [StageType.GREED_MODE]: StageID.CAVES, // 3
  [StageType.REPENTANCE]: StageID.MINES, // 4
  [StageType.REPENTANCE_B]: StageID.ASHPIT, // 5
} as const satisfies Record<StageType, StageID>;

const DEPTHS_TO_STAGE_ID = {
  [StageType.ORIGINAL]: StageID.DEPTHS, // 0
  [StageType.WRATH_OF_THE_LAMB]: StageID.NECROPOLIS, // 1
  [StageType.AFTERBIRTH]: StageID.DANK_DEPTHS, // 2
  [StageType.GREED_MODE]: StageID.DEPTHS, // 3
  [StageType.REPENTANCE]: StageID.MAUSOLEUM, // 4
  [StageType.REPENTANCE_B]: StageID.GEHENNA, // 5
} as const satisfies Record<StageType, StageID>;

const WOMB_TO_STAGE_ID = {
  [StageType.ORIGINAL]: StageID.WOMB, // 0
  [StageType.WRATH_OF_THE_LAMB]: StageID.UTERO, // 1
  [StageType.AFTERBIRTH]: StageID.SCARRED_WOMB, // 2
  [StageType.GREED_MODE]: StageID.WOMB, // 3
  [StageType.REPENTANCE]: StageID.CORPSE, // 4
  [StageType.REPENTANCE_B]: StageID.MORTIS, // 5
} as const satisfies Record<StageType, StageID>;

const BLUE_WOMB_TO_STAGE_ID = {
  [StageType.ORIGINAL]: StageID.BLUE_WOMB, // 0
  [StageType.WRATH_OF_THE_LAMB]: StageID.BLUE_WOMB, // 1
  [StageType.AFTERBIRTH]: StageID.BLUE_WOMB, // 2
  [StageType.GREED_MODE]: StageID.BLUE_WOMB, // 3
  [StageType.REPENTANCE]: StageID.BLUE_WOMB, // 4
  [StageType.REPENTANCE_B]: StageID.BLUE_WOMB, // 5
} as const satisfies Record<StageType, StageID>;

const SHEOL_CATHEDRAL_TO_STAGE_ID = {
  [StageType.ORIGINAL]: StageID.SHEOL, // 0
  [StageType.WRATH_OF_THE_LAMB]: StageID.CATHEDRAL, // 1
  [StageType.AFTERBIRTH]: StageID.SHEOL, // 2
  [StageType.GREED_MODE]: StageID.SHEOL, // 3
  [StageType.REPENTANCE]: StageID.SHEOL, // 4
  [StageType.REPENTANCE_B]: StageID.SHEOL, // 5
} as const satisfies Record<StageType, StageID>;

const DARK_ROOM_CHEST_TO_STAGE_ID = {
  [StageType.ORIGINAL]: StageID.DARK_ROOM, // 0
  [StageType.WRATH_OF_THE_LAMB]: StageID.CHEST, // 1
  [StageType.AFTERBIRTH]: StageID.DARK_ROOM, // 2
  [StageType.GREED_MODE]: StageID.DARK_ROOM, // 3
  [StageType.REPENTANCE]: StageID.DARK_ROOM, // 4
  [StageType.REPENTANCE_B]: StageID.DARK_ROOM, // 5
} as const satisfies Record<StageType, StageID>;

const VOID_TO_STAGE_ID = {
  [StageType.ORIGINAL]: StageID.VOID, // 0
  [StageType.WRATH_OF_THE_LAMB]: StageID.VOID, // 1
  [StageType.AFTERBIRTH]: StageID.VOID, // 2
  [StageType.GREED_MODE]: StageID.VOID, // 3
  [StageType.REPENTANCE]: StageID.VOID, // 4
  [StageType.REPENTANCE_B]: StageID.VOID, // 5
} as const satisfies Record<StageType, StageID>;

const HOME_TO_STAGE_ID = {
  [StageType.ORIGINAL]: StageID.HOME, // 0
  [StageType.WRATH_OF_THE_LAMB]: StageID.HOME, // 1
  [StageType.AFTERBIRTH]: StageID.HOME, // 2
  [StageType.GREED_MODE]: StageID.HOME, // 3
  [StageType.REPENTANCE]: StageID.HOME, // 4
  [StageType.REPENTANCE_B]: StageID.HOME, // 5
} as const satisfies Record<StageType, StageID>;

export const STAGE_TO_STAGE_ID = {
  [LevelStage.BASEMENT_1]: BASEMENT_TO_STAGE_ID, // 1
  [LevelStage.BASEMENT_2]: BASEMENT_TO_STAGE_ID, // 2
  [LevelStage.CAVES_1]: CAVES_TO_STAGE_ID, // 3
  [LevelStage.CAVES_2]: CAVES_TO_STAGE_ID, // 4
  [LevelStage.DEPTHS_1]: DEPTHS_TO_STAGE_ID, // 5
  [LevelStage.DEPTHS_2]: DEPTHS_TO_STAGE_ID, // 6
  [LevelStage.WOMB_1]: WOMB_TO_STAGE_ID, // 7
  [LevelStage.WOMB_2]: WOMB_TO_STAGE_ID, // 8
  [LevelStage.BLUE_WOMB]: BLUE_WOMB_TO_STAGE_ID, // 9
  [LevelStage.SHEOL_CATHEDRAL]: SHEOL_CATHEDRAL_TO_STAGE_ID, // 10
  [LevelStage.DARK_ROOM_CHEST]: DARK_ROOM_CHEST_TO_STAGE_ID, // 11
  [LevelStage.VOID]: VOID_TO_STAGE_ID, // 12
  [LevelStage.HOME]: HOME_TO_STAGE_ID, // 13
} as const satisfies Record<LevelStage, unknown>;
