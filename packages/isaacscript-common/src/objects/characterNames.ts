import { PlayerType } from "isaac-typescript-definitions";

export const CHARACTER_NAMES = {
  [PlayerType.POSSESSOR]: "Possessor", // -1
  [PlayerType.ISAAC]: "Isaac", // 0
  [PlayerType.MAGDALENE]: "Magdalene", // 1
  [PlayerType.CAIN]: "Cain", // 2
  [PlayerType.JUDAS]: "Judas", // 3
  [PlayerType.BLUE_BABY]: "Blue Baby", // 4
  [PlayerType.EVE]: "Eve", // 5
  [PlayerType.SAMSON]: "Samson", // 6
  [PlayerType.AZAZEL]: "Azazel", // 7
  [PlayerType.LAZARUS]: "Lazarus", // 8
  [PlayerType.EDEN]: "Eden", // 9
  [PlayerType.LOST]: "The Lost", // 10
  [PlayerType.LAZARUS_2]: "Lazarus II", // 11
  [PlayerType.DARK_JUDAS]: "Dark Judas", // 12
  [PlayerType.LILITH]: "Lilith", // 13
  [PlayerType.KEEPER]: "Keeper", // 14
  [PlayerType.APOLLYON]: "Apollyon", // 15
  [PlayerType.FORGOTTEN]: "The Forgotten", // 16
  [PlayerType.SOUL]: "The Soul", // 17
  [PlayerType.BETHANY]: "Bethany", // 18
  [PlayerType.JACOB]: "Jacob", // 19
  [PlayerType.ESAU]: "Esau", // 20
  [PlayerType.ISAAC_B]: "Tainted Isaac", // 21
  [PlayerType.MAGDALENE_B]: "Tainted Magdalene", // 22
  [PlayerType.CAIN_B]: "Tainted Cain", // 23
  [PlayerType.JUDAS_B]: "Tainted Judas", // 24
  [PlayerType.BLUE_BABY_B]: "Tainted Blue Baby", // 25
  [PlayerType.EVE_B]: "Tainted Eve", // 26
  [PlayerType.SAMSON_B]: "Tainted Samson", // 27
  [PlayerType.AZAZEL_B]: "Tainted Azazel", // 28
  [PlayerType.LAZARUS_B]: "Tainted Lazarus", // 29
  [PlayerType.EDEN_B]: "Tainted Eden", // 30
  [PlayerType.LOST_B]: "Tainted Lost", // 31
  [PlayerType.LILITH_B]: "Tainted Lilith", // 32
  [PlayerType.KEEPER_B]: "Tainted Keeper", // 33
  [PlayerType.APOLLYON_B]: "Tainted Apollyon", // 34
  [PlayerType.FORGOTTEN_B]: "Tainted Forgotten", // 35
  [PlayerType.BETHANY_B]: "Tainted Bethany", // 36
  [PlayerType.JACOB_B]: "Tainted Jacob", // 37
  [PlayerType.LAZARUS_2_B]: "Dead Tainted Lazarus", // 38
  [PlayerType.JACOB_2_B]: "Dead Tainted Jacob", // 39
  [PlayerType.SOUL_B]: "Tainted Soul", // 40
} as const satisfies Record<PlayerType, string>;
