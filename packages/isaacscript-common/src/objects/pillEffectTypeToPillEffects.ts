import type { PillEffect } from "isaac-typescript-definitions";
import { ItemConfigPillEffectType } from "isaac-typescript-definitions";
import { VANILLA_PILL_EFFECTS } from "../core/constantsVanilla";
import { filterMap } from "../functions/array";
import { PILL_EFFECT_TYPES } from "./pillEffectTypes";

export const PILL_EFFECT_TYPE_TO_PILL_EFFECTS = {
  // -1
  [ItemConfigPillEffectType.NULL]: getPillEffectsOfType(
    ItemConfigPillEffectType.NULL,
  ),

  // 0
  [ItemConfigPillEffectType.POSITIVE]: getPillEffectsOfType(
    ItemConfigPillEffectType.POSITIVE,
  ),

  // 1
  [ItemConfigPillEffectType.NEGATIVE]: getPillEffectsOfType(
    ItemConfigPillEffectType.NEGATIVE,
  ),

  // 2
  [ItemConfigPillEffectType.NEUTRAL]: getPillEffectsOfType(
    ItemConfigPillEffectType.NEUTRAL,
  ),

  // 3
  [ItemConfigPillEffectType.MODDED]: getPillEffectsOfType(
    ItemConfigPillEffectType.MODDED,
  ),
} as const satisfies Record<ItemConfigPillEffectType, readonly PillEffect[]>;

function getPillEffectsOfType(
  matchingPillEffectType: ItemConfigPillEffectType,
): readonly PillEffect[] {
  return filterMap(VANILLA_PILL_EFFECTS, (pillEffect) => {
    const pillEffectType = PILL_EFFECT_TYPES[pillEffect];
    return pillEffectType === matchingPillEffectType ? pillEffect : undefined;
  });
}
