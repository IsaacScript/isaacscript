import { PlayerType, TrinketType } from "isaac-typescript-definitions";

export const CHARACTER_STARTING_TRINKET_TYPE = {
  // -1
  [PlayerType.POSSESSOR]: undefined,

  // 0
  [PlayerType.ISAAC]: undefined,

  // 1
  [PlayerType.MAGDALENE]: undefined,

  // 2
  [PlayerType.CAIN]: TrinketType.PAPER_CLIP,

  // 3
  [PlayerType.JUDAS]: undefined,

  // 4
  [PlayerType.BLUE_BABY]: undefined,

  // 5
  [PlayerType.EVE]: undefined,

  // 6
  [PlayerType.SAMSON]: TrinketType.CHILDS_HEART,

  // 7
  [PlayerType.AZAZEL]: undefined,

  // 8
  [PlayerType.LAZARUS]: undefined,

  // 9
  [PlayerType.EDEN]: undefined,

  // 10
  [PlayerType.LOST]: undefined,

  // 11
  [PlayerType.LAZARUS_2]: undefined,

  // 12
  [PlayerType.DARK_JUDAS]: undefined,

  // 13
  [PlayerType.LILITH]: undefined,

  // 14
  [PlayerType.KEEPER]: TrinketType.STORE_KEY,

  // 15
  [PlayerType.APOLLYON]: undefined,

  // 16
  [PlayerType.FORGOTTEN]: undefined,

  // 17
  [PlayerType.SOUL]: undefined,

  // 18
  [PlayerType.BETHANY]: undefined,

  // 19
  [PlayerType.JACOB]: undefined,

  // 20
  [PlayerType.ESAU]: undefined,

  // 21
  [PlayerType.ISAAC_B]: undefined,

  // 22
  [PlayerType.MAGDALENE_B]: undefined,

  // 23
  [PlayerType.CAIN_B]: undefined,

  // 24
  [PlayerType.JUDAS_B]: undefined,

  // 25
  [PlayerType.BLUE_BABY_B]: undefined,

  // 26
  [PlayerType.EVE_B]: undefined,

  // 27
  [PlayerType.SAMSON_B]: undefined,

  // 28
  [PlayerType.AZAZEL_B]: undefined,

  // 29
  [PlayerType.LAZARUS_B]: undefined,

  // 30
  [PlayerType.EDEN_B]: undefined,

  // 31
  [PlayerType.LOST_B]: undefined,

  // 32
  [PlayerType.LILITH_B]: undefined,

  // 33
  [PlayerType.KEEPER_B]: undefined,

  // 34
  [PlayerType.APOLLYON_B]: undefined,

  // 35
  [PlayerType.FORGOTTEN_B]: undefined,

  // 36
  [PlayerType.BETHANY_B]: undefined,

  // 37
  [PlayerType.JACOB_B]: undefined,

  // 38
  [PlayerType.LAZARUS_2_B]: undefined,

  // 39
  [PlayerType.JACOB_2_B]: undefined,

  // 40
  [PlayerType.SOUL_B]: undefined,
} as const satisfies Record<PlayerType, TrinketType | undefined>;
