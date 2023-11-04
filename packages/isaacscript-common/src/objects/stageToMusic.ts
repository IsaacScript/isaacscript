import { LevelStage, Music, StageType } from "isaac-typescript-definitions";

const BASEMENT_TO_MUSIC = {
  [StageType.ORIGINAL]: Music.BASEMENT, // 0
  [StageType.WRATH_OF_THE_LAMB]: Music.CELLAR, // 1
  [StageType.AFTERBIRTH]: Music.BURNING_BASEMENT, // 2
  [StageType.GREED_MODE]: Music.BASEMENT, // 3
  [StageType.REPENTANCE]: Music.DOWNPOUR, // 4
  [StageType.REPENTANCE_B]: Music.DROSS, // 5
} as const satisfies Record<StageType, Music>;

const CAVES_TO_MUSIC = {
  [StageType.ORIGINAL]: Music.CAVES, // 0
  [StageType.WRATH_OF_THE_LAMB]: Music.CATACOMBS, // 1
  [StageType.AFTERBIRTH]: Music.FLOODED_CAVES, // 2
  [StageType.GREED_MODE]: Music.CAVES, // 3
  [StageType.REPENTANCE]: Music.MINES, // 4
  [StageType.REPENTANCE_B]: Music.ASHPIT, // 5
} as const satisfies Record<StageType, Music>;

const DEPTHS_TO_MUSIC = {
  [StageType.ORIGINAL]: Music.DEPTHS, // 0
  [StageType.WRATH_OF_THE_LAMB]: Music.NECROPOLIS, // 1
  [StageType.AFTERBIRTH]: Music.DANK_DEPTHS, // 2
  [StageType.GREED_MODE]: Music.DEPTHS, // 3
  [StageType.REPENTANCE]: Music.MAUSOLEUM, // 4
  [StageType.REPENTANCE_B]: Music.GEHENNA, // 5
} as const satisfies Record<StageType, Music>;

const WOMB_TO_MUSIC = {
  [StageType.ORIGINAL]: Music.WOMB, // 0
  [StageType.WRATH_OF_THE_LAMB]: Music.UTERO, // 1
  [StageType.AFTERBIRTH]: Music.SCARRED_WOMB, // 2
  [StageType.GREED_MODE]: Music.WOMB, // 3
  [StageType.REPENTANCE]: Music.CORPSE, // 4
  [StageType.REPENTANCE_B]: Music.MORTIS, // 5
} as const satisfies Record<StageType, Music>;

const BLUE_WOMB_TO_MUSIC = {
  [StageType.ORIGINAL]: Music.BLUE_WOMB, // 0
  [StageType.WRATH_OF_THE_LAMB]: Music.BLUE_WOMB, // 1
  [StageType.AFTERBIRTH]: Music.BLUE_WOMB, // 2
  [StageType.GREED_MODE]: Music.BLUE_WOMB, // 3
  [StageType.REPENTANCE]: Music.BLUE_WOMB, // 4
  [StageType.REPENTANCE_B]: Music.BLUE_WOMB, // 5
} as const satisfies Record<StageType, Music>;

const SHEOL_CATHEDRAL_TO_MUSIC = {
  [StageType.ORIGINAL]: Music.SHEOL, // 0
  [StageType.WRATH_OF_THE_LAMB]: Music.CATHEDRAL, // 1
  [StageType.AFTERBIRTH]: Music.SHEOL, // 2
  [StageType.GREED_MODE]: Music.SHEOL, // 3
  [StageType.REPENTANCE]: Music.SHEOL, // 4
  [StageType.REPENTANCE_B]: Music.SHEOL, // 5
} as const satisfies Record<StageType, Music>;

const DARK_ROOM_CHEST_TO_MUSIC = {
  [StageType.ORIGINAL]: Music.DARK_ROOM, // 0
  [StageType.WRATH_OF_THE_LAMB]: Music.CHEST, // 1
  [StageType.AFTERBIRTH]: Music.DARK_ROOM, // 2
  [StageType.GREED_MODE]: Music.DARK_ROOM, // 3
  [StageType.REPENTANCE]: Music.DARK_ROOM, // 4
  [StageType.REPENTANCE_B]: Music.DARK_ROOM, // 5
} as const satisfies Record<StageType, Music>;

const VOID_TO_MUSIC = {
  [StageType.ORIGINAL]: Music.VOID, // 0
  [StageType.WRATH_OF_THE_LAMB]: Music.VOID, // 1
  [StageType.AFTERBIRTH]: Music.VOID, // 2
  [StageType.GREED_MODE]: Music.VOID, // 3
  [StageType.REPENTANCE]: Music.VOID, // 4
  [StageType.REPENTANCE_B]: Music.VOID, // 5
} as const satisfies Record<StageType, Music>;

const HOME_TO_MUSIC = {
  [StageType.ORIGINAL]: Music.ISAACS_HOUSE, // 0
  [StageType.WRATH_OF_THE_LAMB]: Music.ISAACS_HOUSE, // 1
  [StageType.AFTERBIRTH]: Music.ISAACS_HOUSE, // 2
  [StageType.GREED_MODE]: Music.ISAACS_HOUSE, // 3
  [StageType.REPENTANCE]: Music.ISAACS_HOUSE, // 4
  [StageType.REPENTANCE_B]: Music.ISAACS_HOUSE, // 5
} as const satisfies Record<StageType, Music>;

export const STAGE_TO_MUSIC = {
  [LevelStage.BASEMENT_1]: BASEMENT_TO_MUSIC, // 1
  [LevelStage.BASEMENT_2]: BASEMENT_TO_MUSIC, // 2
  [LevelStage.CAVES_1]: CAVES_TO_MUSIC, // 3
  [LevelStage.CAVES_2]: CAVES_TO_MUSIC, // 4
  [LevelStage.DEPTHS_1]: DEPTHS_TO_MUSIC, // 5
  [LevelStage.DEPTHS_2]: DEPTHS_TO_MUSIC, // 6
  [LevelStage.WOMB_1]: WOMB_TO_MUSIC, // 7
  [LevelStage.WOMB_2]: WOMB_TO_MUSIC, // 8
  [LevelStage.BLUE_WOMB]: BLUE_WOMB_TO_MUSIC, // 9
  [LevelStage.SHEOL_CATHEDRAL]: SHEOL_CATHEDRAL_TO_MUSIC, // 10
  [LevelStage.DARK_ROOM_CHEST]: DARK_ROOM_CHEST_TO_MUSIC, // 11
  [LevelStage.VOID]: VOID_TO_MUSIC, // 12
  [LevelStage.HOME]: HOME_TO_MUSIC, // 13
} as const satisfies Record<LevelStage, Record<StageType, Music>>;
