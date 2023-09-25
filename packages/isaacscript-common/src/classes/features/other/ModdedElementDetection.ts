import type {
  CardType,
  CollectibleType,
  PillEffect,
  TrinketType,
} from "isaac-typescript-definitions";
import { ModCallback } from "isaac-typescript-definitions";
import { itemConfig } from "../../../core/cachedClasses";
import {
  LAST_VANILLA_CARD_TYPE,
  LAST_VANILLA_COLLECTIBLE_TYPE,
  LAST_VANILLA_PILL_EFFECT,
  LAST_VANILLA_TRINKET_TYPE,
  NUM_VANILLA_CARD_TYPES,
  NUM_VANILLA_COLLECTIBLE_TYPES,
  NUM_VANILLA_PILL_EFFECTS,
  NUM_VANILLA_TRINKET_TYPES,
} from "../../../core/constantsFirstLast";
import { Exported } from "../../../decorators";
import {
  asCardType,
  asCollectibleType,
  asNumber,
  asPillEffect,
  asTrinketType,
} from "../../../functions/types";
import { Feature } from "../../private/Feature";

/**
 * Mods can add extra things to the game (e.g. collectibles, trinkets, and so on). Since mods load
 * in alphabetical order, the total number of things can't be properly be known until at least one
 * callback fires (which indicates that all mods have been loaded).
 *
 * This feature gates all such functions behind a callback check. Subsequently, these functions will
 * throw a runtime error if they are called in the menu, before any callbacks have occurred. This
 * ensures that the proper values are always returned and allows you to get immediate feedback if
 * you accidentally access them from the menu.
 */
export class ModdedElementDetection extends Feature {
  private atLeastOneCallbackFired = false;

  /** @internal */
  constructor() {
    super();

    this.callbacksUsed = [
      // 9
      [ModCallback.POST_PLAYER_INIT, this.postPlayerInit],
    ];
  }

  // ModCallback.POST_PLAYER_INIT (9)
  private readonly postPlayerInit = () => {
    this.atLeastOneCallbackFired = true;
  };

  private errorIfNoCallbacksFired(constantType: string) {
    if (!this.atLeastOneCallbackFired) {
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
   * This function can only be called if at least one callback has been executed. This is because
   * not all collectibles will necessarily be present when a mod first loads (due to mod load
   * order).
   *
   * In order to use this function, you must upgrade your mod with
   * `ISCFeature.MODDED_ELEMENT_DETECTION`.
   */
  @Exported
  public getFirstModdedCollectibleType(): CollectibleType | undefined {
    this.errorIfNoCallbacksFired("collectible");

    const firstModdedCollectibleType = asCollectibleType(
      asNumber(LAST_VANILLA_COLLECTIBLE_TYPE) + 1,
    );
    const itemConfigItem = itemConfig.GetCollectible(
      firstModdedCollectibleType,
    );

    return itemConfigItem === undefined
      ? undefined
      : firstModdedCollectibleType;
  }

  /**
   * Will change depending on how many modded collectibles there are.
   *
   * Equal to `itemConfig.GetCollectibles().Size - 1`. (`Size` includes invalid collectibles, like
   * 666. We subtract one to account for `CollectibleType.NULL`.)
   *
   * If there are no mods present that add any custom items, this function will return
   * `CollectibleType.MOMS_RING` (732).
   *
   * This function can only be called if at least one callback has been executed. This is because
   * not all collectibles will necessarily be present when a mod first loads (due to mod load
   * order).
   *
   * In order to use this function, you must upgrade your mod with
   * `ISCFeature.MODDED_ELEMENT_DETECTION`.
   */
  @Exported
  public getLastCollectibleType(): CollectibleType {
    this.errorIfNoCallbacksFired("collectible");
    return itemConfig.GetCollectibles().Size - 1;
  }

  /**
   * Returns the total number of collectibles in the item config, including both vanilla and modded
   * items. If you just need the number of vanilla collectible types, use the
   * `NUM_VANILLA_COLLECTIBLE_TYPES` constant.
   *
   * This function can only be called if at least one callback has been executed. This is because
   * not all collectibles will necessarily be present when a mod first loads (due to mod load
   * order).
   *
   * In order to use this function, you must upgrade your mod with
   * `ISCFeature.MODDED_ELEMENT_DETECTION`.
   */
  @Exported
  public getNumCollectibleTypes(): int {
    this.errorIfNoCallbacksFired("collectible");

    const numModdedCollectibleTypes = this.getNumModdedCollectibleTypes();
    return NUM_VANILLA_COLLECTIBLE_TYPES + numModdedCollectibleTypes;
  }

  /**
   * Unlike vanilla collectible types, modded collectible types are always contiguous.
   *
   * This function can only be called if at least one callback has been executed. This is because
   * not all collectibles will necessarily be present when a mod first loads (due to mod load
   * order).
   *
   * In order to use this function, you must upgrade your mod with
   * `ISCFeature.MODDED_ELEMENT_DETECTION`.
   */
  @Exported
  public getNumModdedCollectibleTypes(): int {
    this.errorIfNoCallbacksFired("collectible");

    const lastCollectibleType = this.getLastCollectibleType();
    return lastCollectibleType - LAST_VANILLA_COLLECTIBLE_TYPE;
  }

  // --------
  // Trinkets
  // --------

  /**
   * Returns the first modded trinket type, or undefined if there are no modded trinkets.
   *
   * This function can only be called if at least one callback has been executed. This is because
   * not all trinkets will necessarily be present when a mod first loads (due to mod load order).
   *
   * In order to use this function, you must upgrade your mod with
   * `ISCFeature.MODDED_ELEMENT_DETECTION`.
   */
  @Exported
  public getFirstModdedTrinketType(): TrinketType | undefined {
    this.errorIfNoCallbacksFired("trinket");

    const firstModdedTrinketType = asTrinketType(
      asNumber(LAST_VANILLA_TRINKET_TYPE) + 1,
    );
    const itemConfigItem = itemConfig.GetTrinket(firstModdedTrinketType);
    return itemConfigItem === undefined ? undefined : firstModdedTrinketType;
  }

  /**
   * Will change depending on how many modded trinkets there are.
   *
   * Equal to `itemConfig.GetTrinkets().Size - 1`. (`Size` includes invalid trinkets, like 47. We
   * subtract one to account for `TrinketType.NULL`.)
   *
   * If there are no mods present that add any custom trinkets, this function will return
   * `TrinketType.SIGIL_OF_BAPHOMET` (189).
   *
   * This function can only be called if at least one callback has been executed. This is because
   * not all trinkets will necessarily be present when a mod first loads (due to mod load order).
   *
   * In order to use this function, you must upgrade your mod with
   * `ISCFeature.MODDED_ELEMENT_DETECTION`.
   */
  @Exported
  public getLastTrinketType(): TrinketType {
    this.errorIfNoCallbacksFired("trinket");
    return itemConfig.GetTrinkets().Size - 1;
  }

  /**
   * Returns the total number of trinkets in the item config, including both vanilla and modded
   * items. If you just need the number of vanilla trinket types, use the
   * `NUM_VANILLA_TRINKET_TYPES` constant.
   *
   * This function can only be called if at least one callback has been executed. This is because
   * not all trinkets will necessarily be present when a mod first loads (due to mod load order).
   *
   * In order to use this function, you must upgrade your mod with
   * `ISCFeature.MODDED_ELEMENT_DETECTION`.
   */
  @Exported
  public getNumTrinketTypes(): int {
    this.errorIfNoCallbacksFired("trinket");

    const numModdedTrinketTypes = this.getNumModdedTrinketTypes();
    return NUM_VANILLA_TRINKET_TYPES + numModdedTrinketTypes;
  }

  /**
   * Unlike vanilla trinket types, modded trinket types are always contiguous.
   *
   * This function can only be called if at least one callback has been executed. This is because
   * not all trinkets will necessarily be present when a mod first loads (due to mod load order).
   *
   * In order to use this function, you must upgrade your mod with
   * `ISCFeature.MODDED_ELEMENT_DETECTION`.
   */
  @Exported
  public getNumModdedTrinketTypes(): int {
    this.errorIfNoCallbacksFired("trinket");

    const lastTrinketType = this.getLastTrinketType();
    return lastTrinketType - LAST_VANILLA_TRINKET_TYPE;
  }

  // -----
  // Cards
  // -----

  /**
   * Returns the first modded card sub-type, or undefined if there are no modded cards.
   *
   * This function can only be called if at least one callback has been executed. This is because
   * not all cards will necessarily be present when a mod first loads (due to mod load order).
   *
   * In order to use this function, you must upgrade your mod with
   * `ISCFeature.MODDED_ELEMENT_DETECTION`.
   */
  @Exported
  public getFirstModdedCardType(): CardType | undefined {
    this.errorIfNoCallbacksFired("card");

    const firstModdedCardType = asCardType(
      asNumber(LAST_VANILLA_CARD_TYPE) + 1,
    );

    const itemConfigCard = itemConfig.GetCard(firstModdedCardType);
    return itemConfigCard === undefined ? undefined : firstModdedCardType;
  }

  /**
   * Will change depending on how many modded cards there are.
   *
   * This is equal to the number of cards, since all card sub-types are contiguous (unlike
   * collectibles).
   *
   * This function can only be called if at least one callback has been executed. This is because
   * not all cards will necessarily be present when a mod first loads (due to mod load order).
   *
   * In order to use this function, you must upgrade your mod with
   * `ISCFeature.MODDED_ELEMENT_DETECTION`.
   */
  @Exported
  public getLastCardType(): CardType {
    this.errorIfNoCallbacksFired("card");

    const numCards = this.getNumCardTypes();
    return asCardType(numCards);
  }

  /**
   * Will change depending on how many modded cards there are.
   *
   * Equal to `itemConfig.GetCards().Size - 1`. (We subtract one to account for `Card.NULL`.)
   *
   * This function can only be called if at least one callback has been executed. This is because
   * not all cards will necessarily be present when a mod first loads (due to mod load order).
   *
   * In order to use this function, you must upgrade your mod with
   * `ISCFeature.MODDED_ELEMENT_DETECTION`.
   */
  @Exported
  public getNumCardTypes(): int {
    this.errorIfNoCallbacksFired("card");
    return itemConfig.GetCards().Size - 1;
  }

  /**
   * This function can only be called if at least one callback has been executed. This is because
   * not all trinkets will necessarily be present when a mod first loads (due to mod load order).
   *
   * In order to use this function, you must upgrade your mod with
   * `ISCFeature.MODDED_ELEMENT_DETECTION`.
   */
  @Exported
  public getNumModdedCardTypes(): int {
    this.errorIfNoCallbacksFired("card");

    const numCardTypes = this.getNumCardTypes();
    return numCardTypes - NUM_VANILLA_CARD_TYPES;
  }

  // ------------
  // Pill Effects
  // ------------

  /**
   * Returns the first modded pill effect, or undefined if there are no modded pill effects.
   *
   * This function can only be called if at least one callback has been executed. This is because
   * not all pill effects will necessarily be present when a mod first loads (due to mod load
   * order).
   *
   * In order to use this function, you must upgrade your mod with
   * `ISCFeature.MODDED_ELEMENT_DETECTION`.
   */
  @Exported
  public getFirstModdedPillEffect(): PillEffect | undefined {
    this.errorIfNoCallbacksFired("pill");

    const firstModdedPillEffect = asPillEffect(
      asNumber(LAST_VANILLA_PILL_EFFECT) + 1,
    );
    const itemConfigPillEffect = itemConfig.GetPillEffect(
      firstModdedPillEffect,
    );

    return itemConfigPillEffect === undefined
      ? undefined
      : firstModdedPillEffect;
  }

  /**
   * Will change depending on how many modded pill effects there are.
   *
   * This is equal to the number of pill effects, since all pill effects are contiguous (unlike
   * collectibles).
   *
   * This function can only be called if at least one callback has been executed. This is because
   * not all pill effects will necessarily be present when a mod first loads (due to mod load
   * order).
   *
   * In order to use this function, you must upgrade your mod with
   * `ISCFeature.MODDED_ELEMENT_DETECTION`.
   */
  @Exported
  public getLastPillEffect(): PillEffect {
    this.errorIfNoCallbacksFired("pill");

    const numPillEffects = this.getNumPillEffects();
    return asPillEffect(numPillEffects);
  }

  /**
   * Will change depending on how many modded pill effects there are.
   *
   * Equal to `itemConfig.GetPillEffects().Size`. (We do not have to subtract one, because the first
   * pill effect has an ID of 0 and there is no `PillEffect.NULL`.)
   *
   * This function can only be called if at least one callback has been executed. This is because
   * not all pill effects will necessarily be present when a mod first loads (due to mod load
   * order).
   *
   * In order to use this function, you must upgrade your mod with
   * `ISCFeature.MODDED_ELEMENT_DETECTION`.
   */
  @Exported
  public getNumPillEffects(): int {
    this.errorIfNoCallbacksFired("pill");
    return itemConfig.GetPillEffects().Size;
  }

  /**
   * This function can only be called if at least one callback has been executed. This is because
   * not all pill effects will necessarily be present when a mod first loads (due to mod load
   * order).
   *
   * In order to use this function, you must upgrade your mod with
   * `ISCFeature.MODDED_ELEMENT_DETECTION`.
   */
  @Exported
  public getNumModdedPillEffects(): int {
    this.errorIfNoCallbacksFired("pill");

    const numPillEffects = this.getNumPillEffects();
    return numPillEffects - NUM_VANILLA_PILL_EFFECTS;
  }
}
