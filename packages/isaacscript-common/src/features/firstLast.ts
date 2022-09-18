import {
  CardType,
  CollectibleType,
  PillEffect,
  TrinketType,
} from "isaac-typescript-definitions";
import { ModUpgraded } from "../classes/ModUpgraded";
import { itemConfig } from "../core/cachedClasses";
import {
  FIRST_CARD_TYPE,
  FIRST_PILL_EFFECT,
  FIRST_TRINKET_TYPE,
  LAST_VANILLA_CARD_TYPE,
  LAST_VANILLA_COLLECTIBLE_TYPE,
  LAST_VANILLA_PILL_EFFECT,
  LAST_VANILLA_TRINKET_TYPE,
  NUM_VANILLA_CARD_TYPES,
  NUM_VANILLA_COLLECTIBLE_TYPES,
  NUM_VANILLA_PILL_EFFECTS,
  NUM_VANILLA_TRINKET_TYPES,
} from "../core/constantsFirstLast";
import { ModCallbackCustom } from "../enums/ModCallbackCustom";
import { errorIfFeaturesNotInitialized } from "../featuresInitialized";
import {
  asCardType,
  asCollectibleType,
  asNumber,
  asPillEffect,
  asTrinketType,
} from "../functions/types";
import { iRange } from "../functions/utils";

const FEATURE_NAME = "firstLast";

let atLeastOneCallbackFired = false;

/** @internal */
export function firstLastInit(mod: ModUpgraded): void {
  mod.AddCallbackCustom(
    ModCallbackCustom.POST_NEW_ROOM_EARLY,
    postNewRoomEarly,
  );
}

// ModCallbackCustom.POST_NEW_ROOM_EARLY
function postNewRoomEarly() {
  atLeastOneCallbackFired = true;
}

function errorIfNoCallbacksFired(constantType: string) {
  if (!atLeastOneCallbackFired) {
    error(
      `Failed to retrieve a ${constantType} constant. Since not all mods have been loaded yet, any constants of this type will be inaccurate. Thus, you must wait until at least one callback fires before retrieving these types of constants.`,
    );
  }
}

// ------------
// Collectibles
// ------------

/**
 * Returns the first modded collectible type, or undefined if there are no modded collectibles.
 *
 * This function can only be called if at least one callback has been executed. This is because not
 * all collectibles will necessarily be present when a mod first loads (due to mod load order).
 */
export function getFirstModdedCollectibleType(): CollectibleType | undefined {
  errorIfFeaturesNotInitialized(FEATURE_NAME);
  errorIfNoCallbacksFired("collectible");

  const firstModdedCollectibleType = asCollectibleType(
    asNumber(LAST_VANILLA_COLLECTIBLE_TYPE) + 1,
  );
  const itemConfigItem = itemConfig.GetCollectible(firstModdedCollectibleType);
  return itemConfigItem === undefined ? undefined : firstModdedCollectibleType;
}

/**
 * Will change depending on how many modded collectibles there are.
 *
 * Equal to `itemConfig.GetCollectibles().Size - 1`. (`Size` includes invalid collectibles, like
 * 666. We subtract one to account for `CollectibleType.NULL`.)
 *
 * This function can only be called if at least one callback has been executed. This is because not
 * all collectibles will necessarily be present when a mod first loads (due to mod load order).
 */
export function getLastCollectibleType(): CollectibleType {
  errorIfFeaturesNotInitialized(FEATURE_NAME);
  errorIfNoCallbacksFired("collectible");

  return itemConfig.GetCollectibles().Size - 1;
}

/**
 * Helper function to get an array that represents the all modded collectible types.
 *
 * Returns an empty array if there are no modded collectible types.
 *
 * This function is only useful when building collectible type objects. For most purposes, you
 * should use the `getModdedCollectibleArray` or `getModdedCollectibleSet` helper function instead.
 *
 * (This function is named differently from the `getVanillaCollectibleTypeRange` function because
 * all modded collectible types are contiguous. Thus, each value represents a real
 * `CollectibleType`.)
 *
 * This function can only be called if at least one callback has been executed. This is because not
 * all collectibles will necessarily be present when a mod first loads (due to mod load order).
 */
export function getModdedCollectibleTypes(): CollectibleType[] {
  errorIfFeaturesNotInitialized(FEATURE_NAME);
  errorIfNoCallbacksFired("collectible");

  const firstModdedCollectibleType = getFirstModdedCollectibleType();
  if (firstModdedCollectibleType === undefined) {
    return [];
  }

  const lastCollectibleType = getLastCollectibleType();
  return iRange(firstModdedCollectibleType, lastCollectibleType);
}

/**
 * This function can only be called if at least one callback has been executed. This is because not
 * all collectibles will necessarily be present when a mod first loads (due to mod load order).
 */
export function getNumCollectibleTypes(): int {
  errorIfFeaturesNotInitialized(FEATURE_NAME);
  errorIfNoCallbacksFired("collectible");

  const numModdedCollectibleTypes = getNumModdedCollectibleTypes();
  return NUM_VANILLA_COLLECTIBLE_TYPES + numModdedCollectibleTypes;
}

/**
 * Unlike vanilla collectible types, modded collectible types are always contiguous.
 *
 * This function can only be called if at least one callback has been executed. This is because not
 * all collectibles will necessarily be present when a mod first loads (due to mod load order).
 */
export function getNumModdedCollectibleTypes(): int {
  errorIfFeaturesNotInitialized(FEATURE_NAME);
  errorIfNoCallbacksFired("collectible");

  const lastCollectibleType = getLastCollectibleType();
  return lastCollectibleType - LAST_VANILLA_COLLECTIBLE_TYPE;
}

// --------
// Trinkets
// --------

/**
 * Returns the first modded trinket type, or undefined if there are no modded trinkets.
 *
 * This function can only be called if at least one callback has been executed. This is because not
 * all trinkets will necessarily be present when a mod first loads (due to mod load order).
 */
export function getFirstModdedTrinketType(): TrinketType | undefined {
  errorIfFeaturesNotInitialized(FEATURE_NAME);
  errorIfNoCallbacksFired("trinket");

  const firstModdedTrinketType = asTrinketType(
    asNumber(LAST_VANILLA_TRINKET_TYPE) + 1,
  );
  const itemConfigItem = itemConfig.GetTrinket(firstModdedTrinketType);
  return itemConfigItem === undefined ? undefined : firstModdedTrinketType;
}

/**
 * Will change depending on how many modded trinkets there are.
 *
 * This is equal to the number of trinket types, since all trinket types are contiguous (unlike
 * collectibles).
 *
 * This function can only be called if at least one callback has been executed. This is because not
 * all trinkets will necessarily be present when a mod first loads (due to mod load order).
 */
export function getLastTrinketType(): TrinketType {
  errorIfFeaturesNotInitialized(FEATURE_NAME);
  errorIfNoCallbacksFired("trinket");

  const numTrinketTypes = getNumTrinketTypes();
  return asTrinketType(numTrinketTypes);
}

/**
 * Helper function to get an array that represents every modded trinket type.
 *
 * Returns an empty array if there are no modded trinket types.
 *
 * This function is only useful when building collectible type objects. For most purposes, you
 * should use the `getModdedCollectibleArray` or `getModdedCollectibleSet` helper function instead.
 *
 * This function can only be called if at least one callback has been executed. This is because not
 * all trinkets will necessarily be present when a mod first loads (due to mod load order).
 */
export function getModdedTrinketTypes(): TrinketType[] {
  const firstModdedTrinketType = getFirstModdedTrinketType();
  if (firstModdedTrinketType === undefined) {
    return [];
  }

  const lastTrinketType = getLastTrinketType();
  return iRange(firstModdedTrinketType, lastTrinketType);
}

/**
 * Will change depending on how many modded trinkets there are.
 *
 * Equal to `itemConfig.GetTrinkets().Size - 1`. (We subtract one to account for
 * `TrinketType.NULL`.)
 *
 * This function can only be called if at least one callback has been executed. This is because not
 * all trinkets will necessarily be present when a mod first loads (due to mod load order).
 */
export function getNumTrinketTypes(): int {
  errorIfFeaturesNotInitialized(FEATURE_NAME);
  errorIfNoCallbacksFired("trinket");

  return itemConfig.GetTrinkets().Size - 1;
}

/**
 * This function can only be called if at least one callback has been executed. This is because not
 * all trinkets will necessarily be present when a mod first loads (due to mod load order).
 */
export function getNumModdedTrinketTypes(): int {
  errorIfFeaturesNotInitialized(FEATURE_NAME);
  errorIfNoCallbacksFired("trinket");

  const numTrinketTypes = getNumTrinketTypes();
  return numTrinketTypes - NUM_VANILLA_TRINKET_TYPES;
}

/**
 * Helper function to get an array that contains every trinket type.
 *
 * This function can only be called if at least one callback has been executed. This is because not
 * all trinkets will necessarily be present when a mod first loads (due to mod load order).
 */
export function getTrinketTypes(): TrinketType[] {
  const lastTrinketType = getLastTrinketType();
  return iRange(FIRST_TRINKET_TYPE, lastTrinketType);
}

// -----
// Cards
// -----

/**
 * Helper function to get an array with every valid card sub-type. This includes modded cards.
 *
 * This function can only be called if at least one callback has been executed. This is because not
 * all cards will necessarily be present when a mod first loads (due to mod load order).
 */
export function getAllCardTypes(): CardType[] {
  const lastCardType = getLastCardType();
  return iRange(FIRST_CARD_TYPE, lastCardType);
}

/**
 * Returns the first modded card sub-type, or undefined if there are no modded cards.
 *
 * This function can only be called if at least one callback has been executed. This is because not
 * all cards will necessarily be present when a mod first loads (due to mod load order).
 */
export function getFirstModdedCardType(): CardType | undefined {
  errorIfFeaturesNotInitialized(FEATURE_NAME);
  errorIfNoCallbacksFired("card");

  const firstModdedCardType = asCardType(asNumber(LAST_VANILLA_CARD_TYPE) + 1);
  const itemConfigCard = itemConfig.GetCard(firstModdedCardType);
  return itemConfigCard === undefined ? undefined : firstModdedCardType;
}

/**
 * Will change depending on how many modded cards there are.
 *
 * This is equal to the number of cards, since all card sub-types are contiguous (unlike
 * collectibles).
 *
 * This function can only be called if at least one callback has been executed. This is because not
 * all cards will necessarily be present when a mod first loads (due to mod load order).
 */
export function getLastCardType(): CardType {
  errorIfFeaturesNotInitialized(FEATURE_NAME);
  errorIfNoCallbacksFired("card");

  const numCards = getNumCardTypes();
  return asCardType(numCards);
}

/**
 * Helper function to get an array with every modded card sub-type.
 *
 * Returns an empty array if there are no modded cards.
 *
 * This function can only be called if at least one callback has been executed. This is because not
 * all cards will necessarily be present when a mod first loads (due to mod load order).
 */
export function getModdedCardTypes(): CardType[] {
  const firstModdedCardType = getFirstModdedCardType();
  if (firstModdedCardType === undefined) {
    return [];
  }

  const lastCardType = getLastCardType();
  return iRange(firstModdedCardType, lastCardType);
}

/**
 * Will change depending on how many modded cards there are.
 *
 * Equal to `itemConfig.GetCards().Size - 1`. (We subtract one to account for `Card.NULL`.)
 *
 * This function can only be called if at least one callback has been executed. This is because not
 * all cards will necessarily be present when a mod first loads (due to mod load order).
 */
export function getNumCardTypes(): int {
  errorIfFeaturesNotInitialized(FEATURE_NAME);
  errorIfNoCallbacksFired("card");

  return itemConfig.GetCards().Size - 1;
}

/**
 * This function can only be called if at least one callback has been executed. This is because not
 * all trinkets will necessarily be present when a mod first loads (due to mod load order).
 */
export function getNumModdedCardTypes(): int {
  errorIfFeaturesNotInitialized(FEATURE_NAME);
  errorIfNoCallbacksFired("card");

  const numCardTypes = getNumCardTypes();
  return numCardTypes - NUM_VANILLA_CARD_TYPES;
}

// ------------
// Pill Effects
// ------------

/**
 * Helper function to get an array with every valid pill effect. This includes modded pill effects.
 *
 * This function can only be called if at least one callback has been executed. This is because not
 * all pill effects will necessarily be present when a mod first loads (due to mod load order).
 */
export function getAllPillEffects(): PillEffect[] {
  const lastPillEffect = getLastPillEffect();
  return iRange(FIRST_PILL_EFFECT, lastPillEffect);
}

/**
 * Returns the first modded pill effect, or undefined if there are no modded pill effects.
 *
 * This function can only be called if at least one callback has been executed. This is because not
 * all pill effects will necessarily be present when a mod first loads (due to mod load order).
 */
export function getFirstModdedPillEffect(): PillEffect | undefined {
  errorIfFeaturesNotInitialized(FEATURE_NAME);
  errorIfNoCallbacksFired("pill");

  const firstModdedPillEffect = asPillEffect(
    asNumber(LAST_VANILLA_PILL_EFFECT) + 1,
  );
  const itemConfigPillEffect = itemConfig.GetPillEffect(firstModdedPillEffect);
  return itemConfigPillEffect === undefined ? undefined : firstModdedPillEffect;
}

/**
 * Will change depending on how many modded pill effects there are.
 *
 * This is equal to the number of pill effects, since all pill effects are contiguous (unlike
 * collectibles).
 *
 * This function can only be called if at least one callback has been executed. This is because not
 * all pill effects will necessarily be present when a mod first loads (due to mod load order).
 */
export function getLastPillEffect(): PillEffect {
  errorIfFeaturesNotInitialized(FEATURE_NAME);
  errorIfNoCallbacksFired("pill");

  const numPillEffects = getNumPillEffects();
  return asPillEffect(numPillEffects);
}

/**
 * Helper function to get an array with every modded pill effect.
 *
 * Returns an empty array if there are no modded pill effects.
 *
 * This function can only be called if at least one callback has been executed. This is because not
 * all pill effects will necessarily be present when a mod first loads (due to mod load order).
 */
export function getModdedPillEffects(): PillEffect[] {
  const firstModdedPillEffect = getFirstModdedPillEffect();
  if (firstModdedPillEffect === undefined) {
    return [];
  }

  const lastPillEffect = getLastPillEffect();
  return iRange(firstModdedPillEffect, lastPillEffect);
}

/**
 * Will change depending on how many modded pill effects there are.
 *
 * Equal to `itemConfig.GetPillEffects().Size`. (We do not have to subtract one, because the first
 * pill effect has an ID of 0 and there is no `PillEffect.NULL`.)
 *
 * This function can only be called if at least one callback has been executed. This is because not
 * all pill effects will necessarily be present when a mod first loads (due to mod load order).
 */
export function getNumPillEffects(): int {
  errorIfFeaturesNotInitialized(FEATURE_NAME);
  errorIfNoCallbacksFired("pill");

  return itemConfig.GetPillEffects().Size;
}

/**
 * This function can only be called if at least one callback has been executed. This is because not
 * all pill effects will necessarily be present when a mod first loads (due to mod load order).
 */
export function getNumModdedPillEffects(): int {
  errorIfFeaturesNotInitialized(FEATURE_NAME);
  errorIfNoCallbacksFired("pill");

  const numPillEffects = getNumPillEffects();
  return numPillEffects - NUM_VANILLA_PILL_EFFECTS;
}
