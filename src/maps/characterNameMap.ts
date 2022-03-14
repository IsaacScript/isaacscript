export const DEFAULT_CHARACTER_NAME = "Unknown";

export const CHARACTER_NAME_MAP: { readonly [key in PlayerType]: string } = {
  [PlayerType.PLAYER_POSSESSOR]: "Possessor", // -1
  [PlayerType.PLAYER_ISAAC]: "Isaac", // 0
  [PlayerType.PLAYER_MAGDALENE]: "Magdalene", // 1
  [PlayerType.PLAYER_CAIN]: "Cain", // 2
  [PlayerType.PLAYER_JUDAS]: "Judas", // 3
  [PlayerType.PLAYER_BLUEBABY]: "Blue Baby", // 4
  [PlayerType.PLAYER_EVE]: "Eve", // 5
  [PlayerType.PLAYER_SAMSON]: "Samson", // 6
  [PlayerType.PLAYER_AZAZEL]: "Azazel", // 7
  [PlayerType.PLAYER_LAZARUS]: "Lazarus", // 8
  [PlayerType.PLAYER_EDEN]: "Eden", // 9
  [PlayerType.PLAYER_THELOST]: "The Lost", // 10
  [PlayerType.PLAYER_LAZARUS2]: "Lazarus II", // 11
  [PlayerType.PLAYER_BLACKJUDAS]: "Dark Judas", // 12
  [PlayerType.PLAYER_LILITH]: "Lilith", // 13
  [PlayerType.PLAYER_KEEPER]: "Keeper", // 14
  [PlayerType.PLAYER_APOLLYON]: "Apollyon", // 15
  [PlayerType.PLAYER_THEFORGOTTEN]: "The Forgotten", // 16
  [PlayerType.PLAYER_THESOUL]: "The Soul", // 17
  [PlayerType.PLAYER_BETHANY]: "Bethany", // 18
  [PlayerType.PLAYER_JACOB]: "Jacob", // 19
  [PlayerType.PLAYER_ESAU]: "Esau", // 20
  [PlayerType.PLAYER_ISAAC_B]: "Tainted Isaac", // 21
  [PlayerType.PLAYER_MAGDALENE_B]: "Tainted Magdalene", // 22
  [PlayerType.PLAYER_CAIN_B]: "Tainted Cain", // 23
  [PlayerType.PLAYER_JUDAS_B]: "Tainted Judas", // 24
  [PlayerType.PLAYER_BLUEBABY_B]: "Tainted Blue Baby", // 25
  [PlayerType.PLAYER_EVE_B]: "Tainted Eve", // 26
  [PlayerType.PLAYER_SAMSON_B]: "Tainted Samson", // 27
  [PlayerType.PLAYER_AZAZEL_B]: "Tainted Azazel", // 28
  [PlayerType.PLAYER_LAZARUS_B]: "Tainted Lazarus", // 29
  [PlayerType.PLAYER_EDEN_B]: "Tainted Eden", // 30
  [PlayerType.PLAYER_THELOST_B]: "Tainted Lost", // 31
  [PlayerType.PLAYER_LILITH_B]: "Tainted Lilith", // 32
  [PlayerType.PLAYER_KEEPER_B]: "Tainted Keeper", // 33
  [PlayerType.PLAYER_APOLLYON_B]: "Tainted Apollyon", // 34
  [PlayerType.PLAYER_THEFORGOTTEN_B]: "Tainted Forgotten", // 35
  [PlayerType.PLAYER_BETHANY_B]: "Tainted Bethany", // 36
  [PlayerType.PLAYER_JACOB_B]: "Tainted Jacob", // 37
  [PlayerType.PLAYER_LAZARUS2_B]: "Dead Tainted Lazarus", // 38
  [PlayerType.PLAYER_JACOB2_B]: "Dead Tainted Jacob", // 39
  [PlayerType.PLAYER_THESOUL_B]: "Tainted Soul", // 40
  [PlayerType.NUM_PLAYER_TYPES]: DEFAULT_CHARACTER_NAME, // 41
};
