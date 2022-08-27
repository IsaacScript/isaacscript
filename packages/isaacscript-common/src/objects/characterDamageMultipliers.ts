import { PlayerType } from "isaac-typescript-definitions";

/** From: https://bindingofisaacrebirth.fandom.com/wiki/Characters#Regular_Characters */
export const CHARACTER_DAMAGE_MULTIPLIERS: {
  readonly [key in PlayerType]: float;
} = {
  [PlayerType.POSSESSOR]: 1.0, // -1
  [PlayerType.ISAAC]: 1.0, // 0
  [PlayerType.MAGDALENE]: 1.0, // 1
  [PlayerType.CAIN]: 1.2, // 2
  [PlayerType.JUDAS]: 1.35, // 3
  [PlayerType.BLUE_BABY]: 1.05, // 4
  [PlayerType.EVE]: 0.75, // 5
  [PlayerType.SAMSON]: 1.0, // 6
  [PlayerType.AZAZEL]: 1.5, // 7
  [PlayerType.LAZARUS]: 1.0, // 8
  [PlayerType.EDEN]: 1.0, // 9
  [PlayerType.THE_LOST]: 1.0, // 10
  [PlayerType.LAZARUS_2]: 1.4, // 11
  [PlayerType.DARK_JUDAS]: 2.0, // 12
  [PlayerType.LILITH]: 1.0, // 13
  [PlayerType.KEEPER]: 1.2, // 14
  [PlayerType.APOLLYON]: 1.0, // 15
  [PlayerType.THE_FORGOTTEN]: 1.5, // 16
  [PlayerType.THE_SOUL]: 1.0, // 17
  [PlayerType.BETHANY]: 1.0, // 18
  [PlayerType.JACOB]: 1.0, // 19
  [PlayerType.ESAU]: 1.0, // 20
  [PlayerType.ISAAC_B]: 1.0, // 21
  [PlayerType.MAGDALENE_B]: 0.75, // 22
  [PlayerType.CAIN_B]: 1.0, // 23
  [PlayerType.JUDAS_B]: 1.0, // 24
  [PlayerType.BLUE_BABY_B]: 1.0, // 25
  [PlayerType.EVE_B]: 1.2, // 26
  [PlayerType.SAMSON_B]: 1.0, // 27
  [PlayerType.AZAZEL_B]: 1.5, // 28
  [PlayerType.LAZARUS_B]: 1.0, // 29
  [PlayerType.EDEN_B]: 1.0, // 30
  [PlayerType.THE_LOST_B]: 1.3, // 31
  [PlayerType.LILITH_B]: 1.0, // 32
  [PlayerType.KEEPER_B]: 1.0, // 33
  [PlayerType.APOLLYON_B]: 1.0, // 34
  [PlayerType.THE_FORGOTTEN_B]: 1.5, // 35
  [PlayerType.BETHANY_B]: 1.0, // 36
  [PlayerType.JACOB_B]: 1.0, // 37
  [PlayerType.LAZARUS_2_B]: 1.5, // 38
  [PlayerType.JACOB_2_B]: 1.0, // 39
  [PlayerType.THE_SOUL_B]: 1.0, // 40
} as const;
