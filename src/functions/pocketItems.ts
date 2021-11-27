import { CARD_NAME_MAP } from "../maps/cardNameMap";
import { PILL_EFFECT_NAME_MAP } from "../maps/pillEffectNameMap";

/**
 * This is a helper function to get a card name from a Card.
 *
 * Example:
 * ```
 * const card = Card.CARD_FOOL;
 * const cardName = getCardName(card); // cardName is "0 - The Fool"
 * ```
 */
export function getCardName(card: Card | int): string {
  const itemConfig = Isaac.GetItemConfig();
  const defaultName = "Unknown";

  if (type(card) !== "number") {
    return defaultName;
  }

  // "ItemConfigCard.Name" is bugged with vanilla cards on patch v1.7.5,
  // so we use a hard-coded map as a workaround
  const cardName = CARD_NAME_MAP.get(card);
  if (cardName !== undefined) {
    return cardName;
  }

  const itemConfigCard = itemConfig.GetCard(card);
  if (itemConfigCard === undefined) {
    return defaultName;
  }

  return itemConfigCard.Name;
}

/**
 * This is a helper function to get a pill effect name from a PillEffect.
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

  // "ItemConfigPillEffect.Name" is bugged with vanilla pill effects on patch v1.7.5,
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
