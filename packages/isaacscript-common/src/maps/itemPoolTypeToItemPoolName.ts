import { ItemPoolType } from "isaac-typescript-definitions";

/** From "itempools.xml". */
export const ITEM_POOL_TYPE_TO_ITEM_POOL_NAME = {
  [ItemPoolType.TREASURE]: "treasure", // 0
  [ItemPoolType.SHOP]: "shop", // 1
  [ItemPoolType.BOSS]: "boss", // 2
  [ItemPoolType.DEVIL]: "devil", // 3
  [ItemPoolType.ANGEL]: "angel", // 4
  [ItemPoolType.SECRET]: "secret", // 5
  [ItemPoolType.LIBRARY]: "library", // 6
  [ItemPoolType.SHELL_GAME]: "shellGame", // 7
  [ItemPoolType.GOLDEN_CHEST]: "goldenChest", // 8
  [ItemPoolType.RED_CHEST]: "redChest", // 9
  [ItemPoolType.BEGGAR]: "beggar", // 10
  [ItemPoolType.DEMON_BEGGAR]: "demonBeggar", // 11
  [ItemPoolType.CURSE]: "curse", // 12
  [ItemPoolType.KEY_MASTER]: "keyMaster", // 13
  [ItemPoolType.BATTERY_BUM]: "batteryBum", // 14
  [ItemPoolType.MOMS_CHEST]: "momsChest", // 15
  [ItemPoolType.GREED_TREASURE]: "greedTreasure", // 16
  [ItemPoolType.GREED_BOSS]: "greedBoss", // 17
  [ItemPoolType.GREED_SHOP]: "greedShop", // 18
  [ItemPoolType.GREED_DEVIL]: "greedDevil", // 19
  [ItemPoolType.GREED_ANGEL]: "greedAngel", // 20
  [ItemPoolType.GREED_CURSE]: "greedCurse", // 21
  [ItemPoolType.GREED_SECRET]: "greedSecret", // 22
  [ItemPoolType.CRANE_GAME]: "craneGame", // 23
  [ItemPoolType.ULTRA_SECRET]: "ultraSecret", // 24
  [ItemPoolType.BOMB_BUM]: "bombBum", // 25
  [ItemPoolType.PLANETARIUM]: "planetarium", // 26
  [ItemPoolType.OLD_CHEST]: "oldChest", // 27
  [ItemPoolType.BABY_SHOP]: "babyShop", // 28
  [ItemPoolType.WOODEN_CHEST]: "woodenChest", // 29
  [ItemPoolType.ROTTEN_BEGGAR]: "rottenBeggar", // 30
} as const satisfies Record<ItemPoolType, string>;
