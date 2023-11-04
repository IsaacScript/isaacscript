import { PlayerType } from "isaac-typescript-definitions";

/** From: https://bindingofisaacrebirth.fandom.com/wiki/Characters#Regular_Characters */
export const CHARACTER_DAMAGE_MULTIPLIERS = {
  [PlayerType.POSSESSOR]: 1, // -1
  [PlayerType.ISAAC]: 1, // 0
  [PlayerType.MAGDALENE]: 1, // 1
  [PlayerType.CAIN]: 1.2, // 2
  [PlayerType.JUDAS]: 1.35, // 3
  [PlayerType.BLUE_BABY]: 1.05, // 4
  [PlayerType.EVE]: 0.75, // 5
  [PlayerType.SAMSON]: 1, // 6
  [PlayerType.AZAZEL]: 1.5, // 7
  [PlayerType.LAZARUS]: 1, // 8
  [PlayerType.EDEN]: 1, // 9
  [PlayerType.LOST]: 1, // 10
  [PlayerType.LAZARUS_2]: 1.4, // 11
  [PlayerType.DARK_JUDAS]: 2, // 12
  [PlayerType.LILITH]: 1, // 13
  [PlayerType.KEEPER]: 1.2, // 14
  [PlayerType.APOLLYON]: 1, // 15
  [PlayerType.FORGOTTEN]: 1.5, // 16
  [PlayerType.SOUL]: 1, // 17
  [PlayerType.BETHANY]: 1, // 18
  [PlayerType.JACOB]: 1, // 19
  [PlayerType.ESAU]: 1, // 20
  [PlayerType.ISAAC_B]: 1, // 21
  [PlayerType.MAGDALENE_B]: 0.75, // 22
  [PlayerType.CAIN_B]: 1, // 23
  [PlayerType.JUDAS_B]: 1, // 24
  [PlayerType.BLUE_BABY_B]: 1, // 25
  [PlayerType.EVE_B]: 1.2, // 26
  [PlayerType.SAMSON_B]: 1, // 27
  [PlayerType.AZAZEL_B]: 1.5, // 28
  [PlayerType.LAZARUS_B]: 1, // 29
  [PlayerType.EDEN_B]: 1, // 30
  [PlayerType.LOST_B]: 1.3, // 31
  [PlayerType.LILITH_B]: 1, // 32
  [PlayerType.KEEPER_B]: 1, // 33
  [PlayerType.APOLLYON_B]: 1, // 34
  [PlayerType.FORGOTTEN_B]: 1.5, // 35
  [PlayerType.BETHANY_B]: 1, // 36
  [PlayerType.JACOB_B]: 1, // 37
  [PlayerType.LAZARUS_2_B]: 1.5, // 38
  [PlayerType.JACOB_2_B]: 1, // 39
  [PlayerType.SOUL_B]: 1, // 40
} as const satisfies Record<PlayerType, float>;
