import { CollectibleType, PlayerType } from "isaac-typescript-definitions";

export const CHARACTER_STARTING_COLLECTIBLE_TYPES = {
  // -1
  [PlayerType.POSSESSOR]: [],

  // 0
  [PlayerType.ISAAC]: [CollectibleType.D6],

  // 1
  [PlayerType.MAGDALENE]: [CollectibleType.YUM_HEART],

  // 2
  [PlayerType.CAIN]: [CollectibleType.LUCKY_FOOT],

  // 3
  [PlayerType.JUDAS]: [CollectibleType.BOOK_OF_BELIAL],

  // 4
  [PlayerType.BLUE_BABY]: [CollectibleType.POOP],

  // 5
  [PlayerType.EVE]: [
    CollectibleType.DEAD_BIRD, // 117
    CollectibleType.WHORE_OF_BABYLON, // 122
    CollectibleType.RAZOR_BLADE, // 126
  ],

  // 6
  [PlayerType.SAMSON]: [CollectibleType.BLOODY_LUST],

  // 7
  [PlayerType.AZAZEL]: [],

  // 8
  [PlayerType.LAZARUS]: [CollectibleType.ANEMIC],
  // (Lazarus Rags is not granted; the extra life is innate.)

  // 9
  [PlayerType.EDEN]: [],

  // 10
  [PlayerType.LOST]: [CollectibleType.ETERNAL_D6],
  // (Holy Mantle is not granted; the effect is innate.)

  // 11
  [PlayerType.LAZARUS_2]: [CollectibleType.ANEMIC],
  // (Even if the run is started as Lazarus 2 using e.g. `restart 11`, Anemic is still granted.)

  // 12
  [PlayerType.DARK_JUDAS]: [],

  // 13
  [PlayerType.LILITH]: [
    CollectibleType.BOX_OF_FRIENDS, // 357
    CollectibleType.CAMBION_CONCEPTION, // 412
  ],

  // 14
  [PlayerType.KEEPER]: [CollectibleType.WOODEN_NICKEL],

  // 15
  [PlayerType.APOLLYON]: [CollectibleType.VOID],

  // 16
  [PlayerType.FORGOTTEN]: [],

  // 17
  [PlayerType.SOUL]: [],

  // 18
  [PlayerType.BETHANY]: [CollectibleType.BOOK_OF_VIRTUES],

  // 19
  [PlayerType.JACOB]: [],

  // 20
  [PlayerType.ESAU]: [],

  // 21
  [PlayerType.ISAAC_B]: [],

  // 22
  [PlayerType.MAGDALENE_B]: [CollectibleType.YUM_HEART],

  // 23
  [PlayerType.CAIN_B]: [CollectibleType.BAG_OF_CRAFTING],

  // 24
  [PlayerType.JUDAS_B]: [CollectibleType.DARK_ARTS],

  // 25
  [PlayerType.BLUE_BABY_B]: [CollectibleType.HOLD],

  // 26
  [PlayerType.EVE_B]: [CollectibleType.SUMPTORIUM],

  // 27
  [PlayerType.SAMSON_B]: [],
  // (Berserk is not granted; the rage is innate.)

  // 28
  [PlayerType.AZAZEL_B]: [],

  // 29
  [PlayerType.LAZARUS_B]: [CollectibleType.FLIP],

  // 30
  [PlayerType.EDEN_B]: [],

  // 31
  [PlayerType.LOST_B]: [],

  // 32
  [PlayerType.LILITH_B]: [],

  // 33
  [PlayerType.KEEPER_B]: [],

  // 34
  [PlayerType.APOLLYON_B]: [CollectibleType.ABYSS],

  // 35
  [PlayerType.FORGOTTEN_B]: [],

  // 36
  [PlayerType.BETHANY_B]: [CollectibleType.LEMEGETON],

  // 37
  [PlayerType.JACOB_B]: [CollectibleType.ANIMA_SOLA],

  // 38
  [PlayerType.LAZARUS_2_B]: [CollectibleType.FLIP],
  // (Even if the run is started as Dead Tainted Lazarus using e.g. `restart 38`, Flip is still
  // granted.)

  // 39
  [PlayerType.JACOB_2_B]: [CollectibleType.ANIMA_SOLA],
  // (Even if the run is started as Tainted Jacob in "Lost" form using e.g. `restart 39`, Anima Sola
  // is still granted.)

  // 40
  [PlayerType.SOUL_B]: [],
} as const satisfies Record<PlayerType, readonly CollectibleType[]>;
