import { BossID, EntityType } from "isaac-typescript-definitions";
import { ReadonlySet } from "../types/ReadonlySet";

const STORY_BOSS_IDS = [
  BossID.MOM, // 6
  BossID.MOMS_HEART, // 8
  BossID.SATAN, // 24
  BossID.IT_LIVES, // 25
  BossID.ISAAC, // 39
  BossID.BLUE_BABY, // 40
  BossID.LAMB, // 54
  BossID.MEGA_SATAN, // 55 (Mega Satan 2 is in the same room.)
  BossID.ULTRA_GREED, // 62
  BossID.HUSH, // 63
  BossID.DELIRIUM, // 70
  BossID.ULTRA_GREEDIER, // 71
  BossID.MOTHER, // 88
  BossID.MAUSOLEUM_MOM, // 89
  BossID.MAUSOLEUM_MOMS_HEART, // 90
  BossID.DOGMA, // 99
  BossID.BEAST, // 100
] as const;

const STORY_BOSS_ENTITY_TYPES_SET = new ReadonlySet([
  EntityType.MOM, // 45
  EntityType.MOMS_HEART, // 78
  EntityType.SATAN, // 84
  // - It Lives is a variant of Mom's Heart.
  EntityType.ISAAC, // 102
  // - Blue Baby is a variant of Isaac.
  EntityType.LAMB, // 273
  EntityType.MEGA_SATAN, // 274
  EntityType.MEGA_SATAN_2, // 275
  EntityType.ULTRA_GREED, // 406
  EntityType.HUSH, // 407
  EntityType.DELIRIUM, // 412
  // - Ultra Greedier is a variant of Ultra Greed.
  EntityType.MOTHER, // 912
  // - Mausoleum Mom is a sub-type of Mom.
  // - Mausoleum Mom's Heart is a sub-type of Mom's Heart.
  EntityType.DOGMA, // 950
  EntityType.BEAST, // 951
]);

const STORY_BOSS_IDS_SET = new ReadonlySet<BossID>(STORY_BOSS_IDS);

/**
 * A helper type that is a union of every story boss. Useful for data structures that must contain
 * one entry for each story boss.
 */
export type StoryBossID = (typeof STORY_BOSS_IDS)[number];

/**
 * Helper function to determine if the specified entity type is an end-game story boss, like Isaac,
 * Blue Baby, Mega Satan, The Beast, and so on. This is useful because certain effects should only
 * apply to non-story bosses, like Vanishing Twin.
 */
export function isStoryBoss(entityType: EntityType): boolean {
  return STORY_BOSS_ENTITY_TYPES_SET.has(entityType);
}

/**
 * Helper function to determine if the specified boss ID is an end-game story boss, like Isaac, Blue
 * Baby, Mega Satan, The Beast, and so on. This is useful because certain effects should only apply
 * to non-story bosses, like Vanishing Twin.
 */
export function isStoryBossID(bossID: BossID): bossID is StoryBossID {
  return STORY_BOSS_IDS_SET.has(bossID);
}
