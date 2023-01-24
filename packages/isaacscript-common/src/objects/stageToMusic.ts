import { LevelStage, Music, StageType } from "isaac-typescript-definitions";
import { HasAllEnumKeys } from "../types/HasAllEnumKeys";

const BASEMENT_TO_MUSIC = {
  [StageType.ORIGINAL]: Music.BASEMENT,
  [StageType.WRATH_OF_THE_LAMB]: Music.CELLAR,
  [StageType.AFTERBIRTH]: Music.BURNING_BASEMENT,
  [StageType.GREED_MODE]: Music.BASEMENT,
  [StageType.REPENTANCE]: Music.DOWNPOUR,
  [StageType.REPENTANCE_B]: Music.DROSS,
} as const satisfies HasAllEnumKeys<StageType, Music>;

const CAVES_TO_MUSIC = {
  [StageType.ORIGINAL]: Music.CAVES,
  [StageType.WRATH_OF_THE_LAMB]: Music.CATACOMBS,
  [StageType.AFTERBIRTH]: Music.FLOODED_CAVES,
  [StageType.GREED_MODE]: Music.CAVES,
  [StageType.REPENTANCE]: Music.MINES,
  [StageType.REPENTANCE_B]: Music.ASHPIT,
} as const satisfies HasAllEnumKeys<StageType, Music>;

const DEPTHS_TO_MUSIC = {
  [StageType.ORIGINAL]: Music.DEPTHS,
  [StageType.WRATH_OF_THE_LAMB]: Music.NECROPOLIS,
  [StageType.AFTERBIRTH]: Music.DANK_DEPTHS,
  [StageType.GREED_MODE]: Music.DEPTHS,
  [StageType.REPENTANCE]: Music.MAUSOLEUM,
  [StageType.REPENTANCE_B]: Music.GEHENNA,
} as const satisfies HasAllEnumKeys<StageType, Music>;

const WOMB_TO_MUSIC = {
  [StageType.ORIGINAL]: Music.WOMB,
  [StageType.WRATH_OF_THE_LAMB]: Music.UTERO,
  [StageType.AFTERBIRTH]: Music.SCARRED_WOMB,
  [StageType.GREED_MODE]: Music.WOMB,
  [StageType.REPENTANCE]: Music.CORPSE,
  [StageType.REPENTANCE_B]: Music.MORTIS,
} as const satisfies HasAllEnumKeys<StageType, Music>;

const BLUE_WOMB_TO_MUSIC = {
  [StageType.ORIGINAL]: Music.BLUE_WOMB,
  [StageType.WRATH_OF_THE_LAMB]: Music.BLUE_WOMB,
  [StageType.AFTERBIRTH]: Music.BLUE_WOMB,
  [StageType.GREED_MODE]: Music.BLUE_WOMB,
  [StageType.REPENTANCE]: Music.BLUE_WOMB,
  [StageType.REPENTANCE_B]: Music.BLUE_WOMB,
} as const satisfies HasAllEnumKeys<StageType, Music>;

const SHEOL_CATHEDRAL_TO_MUSIC = {
  [StageType.ORIGINAL]: Music.SHEOL,
  [StageType.WRATH_OF_THE_LAMB]: Music.CATHEDRAL,
  [StageType.AFTERBIRTH]: Music.SHEOL,
  [StageType.GREED_MODE]: Music.SHEOL,
  [StageType.REPENTANCE]: Music.SHEOL,
  [StageType.REPENTANCE_B]: Music.SHEOL,
} as const satisfies HasAllEnumKeys<StageType, Music>;

const DARK_ROOM_CHEST_TO_MUSIC = {
  [StageType.ORIGINAL]: Music.DARK_ROOM,
  [StageType.WRATH_OF_THE_LAMB]: Music.CHEST,
  [StageType.AFTERBIRTH]: Music.DARK_ROOM,
  [StageType.GREED_MODE]: Music.DARK_ROOM,
  [StageType.REPENTANCE]: Music.DARK_ROOM,
  [StageType.REPENTANCE_B]: Music.DARK_ROOM,
} as const satisfies HasAllEnumKeys<StageType, Music>;

const THE_VOID_TO_MUSIC = {
  [StageType.ORIGINAL]: Music.VOID,
  [StageType.WRATH_OF_THE_LAMB]: Music.VOID,
  [StageType.AFTERBIRTH]: Music.VOID,
  [StageType.GREED_MODE]: Music.VOID,
  [StageType.REPENTANCE]: Music.VOID,
  [StageType.REPENTANCE_B]: Music.VOID,
} as const satisfies HasAllEnumKeys<StageType, Music>;

const HOME_TO_MUSIC = {
  [StageType.ORIGINAL]: Music.ISAACS_HOUSE,
  [StageType.WRATH_OF_THE_LAMB]: Music.ISAACS_HOUSE,
  [StageType.AFTERBIRTH]: Music.ISAACS_HOUSE,
  [StageType.GREED_MODE]: Music.ISAACS_HOUSE,
  [StageType.REPENTANCE]: Music.ISAACS_HOUSE,
  [StageType.REPENTANCE_B]: Music.ISAACS_HOUSE,
} as const satisfies HasAllEnumKeys<StageType, Music>;

export const STAGE_TO_MUSIC = {
  [LevelStage.BASEMENT_1]: BASEMENT_TO_MUSIC,
  [LevelStage.BASEMENT_2]: BASEMENT_TO_MUSIC,
  [LevelStage.CAVES_1]: CAVES_TO_MUSIC,
  [LevelStage.CAVES_2]: CAVES_TO_MUSIC,
  [LevelStage.DEPTHS_1]: DEPTHS_TO_MUSIC,
  [LevelStage.DEPTHS_2]: DEPTHS_TO_MUSIC,
  [LevelStage.WOMB_1]: WOMB_TO_MUSIC,
  [LevelStage.WOMB_2]: WOMB_TO_MUSIC,
  [LevelStage.BLUE_WOMB]: BLUE_WOMB_TO_MUSIC,
  [LevelStage.SHEOL_CATHEDRAL]: SHEOL_CATHEDRAL_TO_MUSIC,
  [LevelStage.DARK_ROOM_CHEST]: DARK_ROOM_CHEST_TO_MUSIC,
  [LevelStage.THE_VOID]: THE_VOID_TO_MUSIC,
  [LevelStage.HOME]: HOME_TO_MUSIC,
} as const satisfies HasAllEnumKeys<LevelStage, Record<StageType, Music>>;
