import { PILL_EFFECT_NAME_MAP } from "../maps/pillEffectNameMap";

/**
 * Helper function to get a pill effect name from a PillEffect enum value.
 *
 * Example:
 * ```
 * const pillEffect = PillEffect.PILLEFFECT_BAD_GAS;
 * const pillEffectName = getPillEffectName(pillEffect); // trinketName is "Bad Gas"
 * ```
 */
export function getPillEffectName(pillEffect: PillEffect | int): string {
  const itemConfig = Isaac.GetItemConfig();
  const defaultName = "Unknown";

  if (type(pillEffect) !== "number") {
    return defaultName;
  }

  // "ItemConfigPillEffect.Name" is bugged with vanilla pill effects on patch v1.7.6,
  // so we use a hard-coded map as a workaround
  const pillEffectName = PILL_EFFECT_NAME_MAP.get(pillEffect);
  if (pillEffectName !== undefined) {
    return pillEffectName;
  }

  const itemConfigPillEffect = itemConfig.GetPillEffect(pillEffect);
  if (itemConfigPillEffect === undefined) {
    return defaultName;
  }

  return itemConfigPillEffect.Name;
}
