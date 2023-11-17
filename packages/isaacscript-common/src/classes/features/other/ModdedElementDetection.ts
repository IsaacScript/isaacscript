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
import { Feature } from "../../private/Feature";

// eslint-disable-next-line isaacscript/strict-enums
export const FIRST_MODDED_COLLECTIBLE_TYPE: CollectibleType =
  LAST_VANILLA_COLLECTIBLE_TYPE + 1;

// eslint-disable-next-line isaacscript/strict-enums
export const FIRST_MODDED_TRINKET_TYPE: TrinketType =
  LAST_VANILLA_TRINKET_TYPE + 1;

// eslint-disable-next-line isaacscript/strict-enums
export const FIRST_MODDED_CARD_TYPE: CardType = LAST_VANILLA_CARD_TYPE + 1;

// eslint-disable-next-line isaacscript/strict-enums
export const FIRST_MODDED_PILL_EFFECT: PillEffect =
  LAST_VANILLA_PILL_EFFECT + 1;

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
   *
   * @public
   */
  @Exported
  public getFirstModdedCollectibleType(): CollectibleType | undefined {
    this.errorIfNoCallbacksFired("collectible");

    const itemConfigItem = itemConfig.GetCollectible(
      FIRST_MODDED_COLLECTIBLE_TYPE,
    );

    return itemConfigItem === undefined
      ? undefined
      : FIRST_MODDED_COLLECTIBLE_TYPE;
  }

  /**
   * Will change depending on how many modded collectibles there are.
   *
   * Equal to `itemConfig.GetCollectibles().Size - 1`. (`Size` includes invalid collectibles, like
   * 666. We subtract one to account for `CollectibleType.NULL`.)
   *
   * If there are no mods present that add any custom collectibles, this function will return
   * `CollectibleType.MOMS_RING` (732).
   *
   * This function can only be called if at least one callback has been executed. This is because
   * not all collectibles will necessarily be present when a mod first loads (due to mod load
   * order).
   *
   * In order to use this function, you must upgrade your mod with
   * `ISCFeature.MODDED_ELEMENT_DETECTION`.
   *
   * @public
   */
  @Exported
  public getLastCollectibleType(): CollectibleType {
    this.errorIfNoCallbacksFired("collectible");
    return itemConfig.GetCollectibles().Size - 1;
  }

  /**
   * Returns the total number of collectibles in the item config, including both vanilla and modded
   * collectibles. If you just need the number of vanilla collectible types, use the
   * `NUM_VANILLA_COLLECTIBLE_TYPES` constant.
   *
   * This function can only be called if at least one callback has been executed. This is because
   * not all collectibles will necessarily be present when a mod first loads (due to mod load
   * order).
   *
   * In order to use this function, you must upgrade your mod with
   * `ISCFeature.MODDED_ELEMENT_DETECTION`.
   *
   * @public
   */
  @Exported
  public getNumCollectibleTypes(): int {
    this.errorIfNoCallbacksFired("collectible");
    return NUM_VANILLA_COLLECTIBLE_TYPES + this.getNumModdedCollectibleTypes();
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
   *
   * @public
   */
  @Exported
  public getNumModdedCollectibleTypes(): int {
    this.errorIfNoCallbacksFired("collectible");
    return this.getLastCollectibleType() - LAST_VANILLA_COLLECTIBLE_TYPE;
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
   *
   * @public
   */
  @Exported
  public getFirstModdedTrinketType(): TrinketType | undefined {
    this.errorIfNoCallbacksFired("trinket");

    const itemConfigItem = itemConfig.GetTrinket(FIRST_MODDED_TRINKET_TYPE);
    return itemConfigItem === undefined ? undefined : FIRST_MODDED_TRINKET_TYPE;
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
   *
   * @public
   */
  @Exported
  public getLastTrinketType(): TrinketType {
    this.errorIfNoCallbacksFired("trinket");
    return itemConfig.GetTrinkets().Size - 1;
  }

  /**
   * Returns the total number of trinkets in the item config, including both vanilla and modded
   * trinkets. If you just need the number of vanilla trinket types, use the
   * `NUM_VANILLA_TRINKET_TYPES` constant.
   *
   * This function can only be called if at least one callback has been executed. This is because
   * not all trinkets will necessarily be present when a mod first loads (due to mod load order).
   *
   * In order to use this function, you must upgrade your mod with
   * `ISCFeature.MODDED_ELEMENT_DETECTION`.
   *
   * @public
   */
  @Exported
  public getNumTrinketTypes(): int {
    this.errorIfNoCallbacksFired("trinket");
    return NUM_VANILLA_TRINKET_TYPES + this.getNumModdedTrinketTypes();
  }

  /**
   * Unlike vanilla trinket types, modded trinket types are always contiguous.
   *
   * This function can only be called if at least one callback has been executed. This is because
   * not all trinkets will necessarily be present when a mod first loads (due to mod load order).
   *
   * In order to use this function, you must upgrade your mod with
   * `ISCFeature.MODDED_ELEMENT_DETECTION`.
   *
   * @public
   */
  @Exported
  public getNumModdedTrinketTypes(): int {
    this.errorIfNoCallbacksFired("trinket");
    return this.getLastTrinketType() - LAST_VANILLA_TRINKET_TYPE;
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
   *
   * @public
   */
  @Exported
  public getFirstModdedCardType(): CardType | undefined {
    this.errorIfNoCallbacksFired("card");

    const itemConfigCard = itemConfig.GetCard(FIRST_MODDED_CARD_TYPE);
    return itemConfigCard === undefined ? undefined : FIRST_MODDED_CARD_TYPE;
  }

  /**
   * Will change depending on how many modded cards there are.
   *
   * Equal to `itemConfig.GetCards().Size - 1`. (`Size` includes invalid cards, but since cards are
   * contiguous, there are no invalid cards. We subtract one to account for `CardType.NULL`.)
   *
   * If there are no mods present that add any custom cards, this function will return
   * `CardType.SOUL_OF_JACOB_AND_ESAU` (97).
   *
   * This function can only be called if at least one callback has been executed. This is because
   * not all trinkets will necessarily be present when a mod first loads (due to mod load order).
   *
   * In order to use this function, you must upgrade your mod with
   * `ISCFeature.MODDED_ELEMENT_DETECTION`.
   *
   * @public
   */
  @Exported
  public getLastCardType(): CardType {
    this.errorIfNoCallbacksFired("card");
    return itemConfig.GetCards().Size - 1;
  }

  /**
   * Returns the total number of cards in the item config, including both vanilla and modded cards.
   * If you just need the number of vanilla card types, use the `NUM_VANILLA_CARD_TYPES` constant.
   *
   * This function can only be called if at least one callback has been executed. This is because
   * not all cards will necessarily be present when a mod first loads (due to mod load order).
   *
   * In order to use this function, you must upgrade your mod with
   * `ISCFeature.MODDED_ELEMENT_DETECTION`.
   *
   * @public
   */
  @Exported
  public getNumCardTypes(): int {
    this.errorIfNoCallbacksFired("card");
    return NUM_VANILLA_CARD_TYPES + this.getNumModdedCardTypes();
  }

  /**
   * Like vanilla card types, modded card types are always contiguous.
   *
   * This function can only be called if at least one callback has been executed. This is because
   * not all cards will necessarily be present when a mod first loads (due to mod load order).
   *
   * In order to use this function, you must upgrade your mod with
   * `ISCFeature.MODDED_ELEMENT_DETECTION`.
   *
   * @public
   */
  @Exported
  public getNumModdedCardTypes(): int {
    this.errorIfNoCallbacksFired("card");
    return this.getLastCardType() - LAST_VANILLA_CARD_TYPE;
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
   *
   * @public
   */
  @Exported
  public getFirstModdedPillEffect(): PillEffect | undefined {
    this.errorIfNoCallbacksFired("pill");

    const itemConfigPillEffect = itemConfig.GetPillEffect(
      FIRST_MODDED_PILL_EFFECT,
    );

    return itemConfigPillEffect === undefined
      ? undefined
      : FIRST_MODDED_PILL_EFFECT;
  }

  /**
   * Will change depending on how many modded pill effects there are.
   *
   * Equal to `itemConfig.GetPillEffects().Size - 1`. (`Size` includes invalid pill effects, but
   * since pill effects are contiguous, there are no invalid pill effects. We subtract one to
   * account for the enum starting at 0 instead of 1.)
   *
   * If there are no mods present that add any custom pill effects, this function will return
   * `PillEffect.EXPERIMENTAL` (49).
   *
   * This function can only be called if at least one callback has been executed. This is because
   * not all pill effects will necessarily be present when a mod first loads (due to mod load
   * order).
   *
   * In order to use this function, you must upgrade your mod with
   * `ISCFeature.MODDED_ELEMENT_DETECTION`.
   *
   * @public
   */
  @Exported
  public getLastPillEffect(): PillEffect {
    this.errorIfNoCallbacksFired("pill");
    return itemConfig.GetPillEffects().Size - 1;
  }

  /**
   * Returns the total number of pill effects in the item config, including both vanilla and modded
   * pill effects. If you just need the number of vanilla pill effects, use the
   * `NUM_VANILLA_PILL_EFFECTS` constant.
   *
   * This function can only be called if at least one callback has been executed. This is because
   * not all cards will necessarily be present when a mod first loads (due to mod load order).
   *
   * In order to use this function, you must upgrade your mod with
   * `ISCFeature.MODDED_ELEMENT_DETECTION`.
   *
   * @public
   */
  @Exported
  public getNumPillEffects(): int {
    this.errorIfNoCallbacksFired("pill");
    return NUM_VANILLA_PILL_EFFECTS + this.getNumModdedPillEffects();
  }

  /**
   * Like vanilla pill effects, modded pill effects are always contiguous.
   *
   * This function can only be called if at least one callback has been executed. This is because
   * not all cards will necessarily be present when a mod first loads (due to mod load order).
   *
   * In order to use this function, you must upgrade your mod with
   * `ISCFeature.MODDED_ELEMENT_DETECTION`.
   *
   * @public
   */
  @Exported
  public getNumModdedPillEffects(): int {
    this.errorIfNoCallbacksFired("card");
    return this.getLastPillEffect() - LAST_VANILLA_PILL_EFFECT;
  }
}
