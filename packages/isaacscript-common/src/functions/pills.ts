import type {
  ItemConfigPillEffectClass,
  ItemConfigPillEffectType,
  PillEffect,
} from "isaac-typescript-definitions";
import { PillColor } from "isaac-typescript-definitions";
import { PILL_COLOR_VALUES } from "../cachedEnumValues";
import { game, itemConfig } from "../core/cachedClasses";
import {
  FIRST_HORSE_PILL_COLOR,
  FIRST_PILL_COLOR,
  LAST_HORSE_PILL_COLOR,
  LAST_NORMAL_PILL_COLOR,
  LAST_VANILLA_PILL_EFFECT,
} from "../core/constantsFirstLast";
import { PHD_PILL_CONVERSIONS_MAP } from "../maps/PHDPillConversionsMap";
import { FALSE_PHD_PILL_CONVERSIONS_MAP } from "../maps/falsePHDPillConversionsMap";
import {
  DEFAULT_PILL_EFFECT_CLASS,
  PILL_EFFECT_CLASSES,
} from "../objects/pillEffectClasses";
import {
  DEFAULT_PILL_EFFECT_NAME,
  PILL_EFFECT_NAMES,
} from "../objects/pillEffectNames";
import { PILL_EFFECT_TYPE_TO_PILL_EFFECTS } from "../objects/pillEffectTypeToPillEffects";
import {
  DEFAULT_PILL_EFFECT_TYPE,
  PILL_EFFECT_TYPES,
} from "../objects/pillEffectTypes";
import { asNumber, asPillColor, asPillEffect } from "./types";
import { iRange } from "./utils";

/**
 * Add this to a `PillColor` to get the corresponding giant pill color.
 *
 * Corresponds to the vanilla `PillColor.GIANT_FLAG` value.
 *
 * 1 << 11
 */
const HORSE_PILL_COLOR_ADJUSTMENT = 2048;

/**
 * Helper function to get an array with every non-null pill color. This includes all gold colors and
 * all horse colors.
 */
export function getAllPillColors(): readonly PillColor[] {
  return PILL_COLOR_VALUES.slice(1); // Remove `PillColor.NULL`
}

/**
 * Helper function to get the associated pill effect after False PHD is acquired. If a pill effect
 * is not altered by False PHD, then the same pill effect will be returned.
 */
export function getFalsePHDPillEffect(pillEffect: PillEffect): PillEffect {
  const convertedPillEffect = FALSE_PHD_PILL_CONVERSIONS_MAP.get(pillEffect);
  return convertedPillEffect ?? pillEffect;
}

/**
 * Helper function to get the corresponding horse pill color from a normal pill color.
 *
 * For example, passing `PillColor.BLUE_BLUE` would result in 2049, which is the value that
 * corresponds to the horse pill color for blue/blue.
 *
 * If passed a horse pill color, this function will return the unmodified pill color.
 */
export function getHorsePillColor(pillColor: PillColor): PillColor {
  return isHorsePill(pillColor)
    ? pillColor
    : pillColor + HORSE_PILL_COLOR_ADJUSTMENT;
}

/** Helper function to get an array with every non-gold horse pill color. */
export function getHorsePillColors(): readonly PillColor[] {
  return iRange(FIRST_HORSE_PILL_COLOR, LAST_HORSE_PILL_COLOR);
}

/**
 * Helper function to get the corresponding normal pill color from a horse pill color.
 *
 * For example, passing 2049 would result in `PillColor.BLUE_BLUE`.
 *
 * If called with a non-horse pill color, this function will return back the same color.
 */
export function getNormalPillColorFromHorse(pillColor: PillColor): PillColor {
  return isHorsePill(pillColor)
    ? asPillColor(pillColor - HORSE_PILL_COLOR_ADJUSTMENT)
    : pillColor;
}

/** Helper function to get an array with every non-gold and non-horse pill color. */
export function getNormalPillColors(): readonly PillColor[] {
  return iRange(FIRST_PILL_COLOR, LAST_NORMAL_PILL_COLOR);
}

/**
 * Helper function to get the associated pill effect after PHD is acquired. If a pill effect is not
 * altered by PHD, then the same pill effect will be returned.
 */
export function getPHDPillEffect(pillEffect: PillEffect): PillEffect {
  const convertedPillEffect = PHD_PILL_CONVERSIONS_MAP.get(pillEffect);
  return convertedPillEffect ?? pillEffect;
}

/**
 * Helper function to get the corresponding pill color from an effect by repeatedly using the
 * `ItemPool.GetPillEffect` method.
 *
 * Note that this will return the corresponding effect even if the passed pill color is not yet
 * identified by the player.
 *
 * Returns `PillColor.NULL` if there is the corresponding pill color cannot be found.
 *
 * This function is especially useful in the `POST_USE_PILL` callback, since at that point, the used
 * pill is already consumed, and the callback only passes the effect. In this specific circumstance,
 * consider using the `POST_USE_PILL_FILTER` callback instead of the `POST_USE_PILL` callback, since
 * it correctly passes the color and handles the case of horse pills.
 */
export function getPillColorFromEffect(pillEffect: PillEffect): PillColor {
  const itemPool = game.GetItemPool();
  const normalPillColors = getNormalPillColors();
  for (const normalPillColor of normalPillColors) {
    const normalPillEffect = itemPool.GetPillEffect(normalPillColor);
    if (normalPillEffect === pillEffect) {
      return normalPillColor;
    }
  }

  return PillColor.NULL;
}

/**
 * Helper function to get a pill effect class from a PillEffect enum value. In this context, the
 * class is equal to the numerical prefix in the "class" tag in the "pocketitems.xml" file. Use the
 * `getPillEffectType` helper function to determine whether the pill effect is positive, negative,
 * or neutral.
 *
 * Due to limitations in the API, this function will not work properly for modded pill effects, and
 * will always return `DEFAULT_PILL_EFFECT_CLASS` in those cases.
 */
export function getPillEffectClass(
  pillEffect: PillEffect,
): ItemConfigPillEffectClass {
  // `ItemConfigPillEffect` does not contain the "class" tag, so we must manually compile a map of
  // pill effect classes. Modded pill effects are not included in the map.
  const pillEffectClass = PILL_EFFECT_CLASSES[pillEffect];

  // Handle modded pill effects.
  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
  return pillEffectClass ?? DEFAULT_PILL_EFFECT_CLASS;
}

/**
 * Helper function to get a pill effect name from a `PillEffect`. Returns "Unknown" if the provided
 * pill effect is not valid.
 *
 * This function works for both vanilla and modded pill effects.
 *
 * For example, `getPillEffectName(PillEffect.BAD_GAS)` would return "Bad Gas".
 */
export function getPillEffectName(pillEffect: PillEffect): string {
  // `ItemConfigPillEffect.Name` is bugged with vanilla pill effects on patch v1.7.6, so we use a
  // hard-coded map as a workaround.
  const pillEffectName = PILL_EFFECT_NAMES[pillEffect];
  // Handle modded pill effects.
  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
  if (pillEffectName !== undefined) {
    return pillEffectName;
  }

  const itemConfigPillEffect = itemConfig.GetPillEffect(pillEffect);
  if (itemConfigPillEffect !== undefined) {
    return itemConfigPillEffect.Name;
  }

  return DEFAULT_PILL_EFFECT_NAME;
}

/**
 * Helper function to get a pill effect type from a `PillEffect` enum value. In this context, the
 * type is equal to positive, negative, or neutral. This is derived from the suffix of the "class"
 * tag in the "pocketitems.xml" file. Use the `getPillEffectClass` helper function to determine the
 * "power" of the pill.
 *
 * Due to limitations in the API, this function will not work properly for modded pill effects, and
 * will always return `DEFAULT_PILL_EFFECT_TYPE` in those cases.
 */
export function getPillEffectType(
  pillEffect: PillEffect,
): ItemConfigPillEffectType {
  // `ItemConfigPillEffect` does not contain the "class" tag, so we must manually compile a map of
  // pill effect classes. Modded pill effects are not included in the map.
  const pillEffectType = PILL_EFFECT_TYPES[pillEffect];

  // Handle modded pill effects.
  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
  return pillEffectType ?? DEFAULT_PILL_EFFECT_TYPE;
}

export function getVanillaPillEffectsOfType(
  pillEffectType: ItemConfigPillEffectType,
): readonly PillEffect[] {
  return PILL_EFFECT_TYPE_TO_PILL_EFFECTS[pillEffectType];
}

/** Helper function to see if the given pill color is either a gold pill or a horse gold pill. */
export function isGoldPill(pillColor: PillColor): boolean {
  return pillColor === PillColor.GOLD || pillColor === PillColor.HORSE_GOLD;
}

/** Helper function to see if the given pill color is a horse pill. */
export function isHorsePill(pillColor: PillColor): boolean {
  return asNumber(pillColor) > HORSE_PILL_COLOR_ADJUSTMENT;
}

export function isModdedPillEffect(pillEffect: PillEffect): boolean {
  return !isVanillaPillEffect(pillEffect);
}

export function isValidPillEffect(pillEffect: int): pillEffect is PillEffect {
  const potentialPillEffect = asPillEffect(pillEffect);
  const itemConfigPillEffect = itemConfig.GetPillEffect(potentialPillEffect);
  return itemConfigPillEffect !== undefined;
}

export function isVanillaPillEffect(pillEffect: PillEffect): boolean {
  return pillEffect <= LAST_VANILLA_PILL_EFFECT;
}
