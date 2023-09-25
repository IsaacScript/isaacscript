import type { PillEffect } from "isaac-typescript-definitions";
import {
  CacheFlag,
  CardType,
  CollectibleType,
  ItemConfigCardType,
  ItemConfigTag,
  PlayerForm,
  TrinketType,
} from "isaac-typescript-definitions";
import {
  CACHE_FLAG_VALUES,
  ITEM_CONFIG_CARD_TYPE_VALUES,
  ITEM_CONFIG_TAG_VALUES,
} from "../../../arrays/cachedEnumValues";
import { itemConfig } from "../../../core/cachedClasses";
import { FIRST_GLITCHED_COLLECTIBLE_TYPE } from "../../../core/constants";
import {
  VANILLA_CARD_TYPES,
  VANILLA_COLLECTIBLE_TYPES,
  VANILLA_PILL_EFFECTS,
  VANILLA_TRINKET_TYPES,
} from "../../../core/constantsVanilla";
import { Exported } from "../../../decorators";
import { ISCFeature } from "../../../enums/ISCFeature";
import { getItemConfigCardType } from "../../../functions/cards";
import { collectibleHasTag } from "../../../functions/collectibleTag";
import {
  collectibleHasCacheFlag,
  isActiveCollectible,
  isHiddenCollectible,
  isPassiveOrFamiliarCollectible,
} from "../../../functions/collectibles";
import { getFlagName } from "../../../functions/flag";
import { getRandomSeed } from "../../../functions/rng";
import {
  copySet,
  deleteSetsFromSet,
  getRandomSetElement,
  getSortedSetValues,
} from "../../../functions/set";
import { trinketHasCacheFlag } from "../../../functions/trinkets";
import {
  asCardType,
  asCollectibleType,
  asPillEffect,
  asTrinketType,
} from "../../../functions/types";
import { assertDefined, iRange, repeat } from "../../../functions/utils";
import { ITEM_CONFIG_CARD_TYPES_FOR_CARDS_SET } from "../../../sets/itemConfigCardTypesForCardsSet";
import { ReadonlyMap } from "../../../types/ReadonlyMap";
import { ReadonlySet } from "../../../types/ReadonlySet";
import { Feature } from "../../private/Feature";
import type { ModdedElementDetection } from "./ModdedElementDetection";

const CONDITIONAL_FLYING_COLLECTIBLE_TYPES = [
  CollectibleType.BIBLE,
  CollectibleType.EMPTY_VESSEL,
  CollectibleType.ASTRAL_PROJECTION,
  CollectibleType.RECALL,
] as const;

const TRANSFORMATION_TO_TAG_MAP = new ReadonlyMap<PlayerForm, ItemConfigTag>([
  [PlayerForm.GUPPY, ItemConfigTag.GUPPY], // 0
  [PlayerForm.BEELZEBUB, ItemConfigTag.FLY], // 1
  [PlayerForm.FUN_GUY, ItemConfigTag.MUSHROOM], // 2
  [PlayerForm.SERAPHIM, ItemConfigTag.ANGEL], // 3
  [PlayerForm.BOB, ItemConfigTag.BOB], // 4
  [PlayerForm.SPUN, ItemConfigTag.SYRINGE], // 5
  [PlayerForm.YES_MOTHER, ItemConfigTag.MOM], // 6
  [PlayerForm.CONJOINED, ItemConfigTag.BABY], // 7
  [PlayerForm.LEVIATHAN, ItemConfigTag.DEVIL], // 8
  [PlayerForm.OH_CRAP, ItemConfigTag.POOP], // 9
  [PlayerForm.BOOKWORM, ItemConfigTag.BOOK], // 10
  // PlayerForm.ADULTHOOD (11) is based on pill usage.
  [PlayerForm.SPIDER_BABY, ItemConfigTag.SPIDER], // 12
  // PlayerForm.STOMPY (13) is based on size.
]);

/**
 * A feature that lazy-inits and caches various arrays and sets that include both vanilla and modded
 * elements. This is useful for performance purposes (so that we do not have to reconstruct the
 * arrays/sets multiple times).
 *
 * The modded arrays/sets are created using the functions from
 * `ISCFeature.MODDED_ELEMENT_DETECTION`.
 */
export class ModdedElementSets extends Feature {
  private arraysInitialized = false;

  private readonly allCollectibleTypesArray: CollectibleType[] = [];
  private readonly allCollectibleTypesSet = new Set<CollectibleType>();

  private readonly moddedCollectibleTypesArray: CollectibleType[] = [];
  private readonly moddedCollectibleTypesSet = new Set<CollectibleType>();

  private readonly allTrinketTypesArray: TrinketType[] = [];
  private readonly allTrinketTypesSet = new Set<TrinketType>();

  private readonly moddedTrinketTypesArray: TrinketType[] = [];
  private readonly moddedTrinketTypesSet = new Set<TrinketType>();

  private readonly allCardTypesArray: CardType[] = [];
  private readonly allCardTypesSet = new Set<CardType>();

  private readonly moddedCardTypesArray: CardType[] = [];
  private readonly moddedCardTypesSet = new Set<CardType>();

  private readonly allPillEffectsArray: PillEffect[] = [];
  private readonly allPillEffectsSet = new Set<PillEffect>();

  private readonly moddedPillEffectsArray: PillEffect[] = [];
  private readonly moddedPillEffectsSet = new Set<PillEffect>();

  private readonly cacheFlagToCollectibleTypesMap = new Map<
    CacheFlag,
    Set<CollectibleType>
  >();

  private readonly cacheFlagToTrinketTypesMap = new Map<
    CacheFlag,
    Set<TrinketType>
  >();

  private flyingCollectibleTypesSet = new Set<CollectibleType>();
  private readonly permanentFlyingCollectibleTypesSet =
    new Set<CollectibleType>();

  private flyingTrinketTypesSet = new Set<TrinketType>();

  private readonly tagToCollectibleTypesMap = new Map<
    ItemConfigTag,
    Set<CollectibleType>
  >();

  private readonly edenActiveCollectibleTypesSet = new Set<CollectibleType>();
  private readonly edenPassiveCollectibleTypesSet = new Set<CollectibleType>();

  private readonly itemConfigCardTypeToCardTypeMap = new Map<
    ItemConfigCardType,
    Set<CardType>
  >();

  /**
   * The set of card types that are not:
   *
   * - ItemConfigCardType.RUNE
   * - ItemConfigCardType.SPECIAL_OBJECT
   */
  private readonly cardSet = new Set<CardType>();

  private readonly moddedElementDetection: ModdedElementDetection;

  /** @internal */
  constructor(moddedElementDetection: ModdedElementDetection) {
    super();

    this.featuresUsed = [ISCFeature.MODDED_ELEMENT_DETECTION];

    this.moddedElementDetection = moddedElementDetection;
  }

  private lazyInit() {
    if (this.arraysInitialized) {
      return;
    }
    this.arraysInitialized = true;

    this.lazyInitModdedCollectibleTypes();
    this.lazyInitModdedTrinketTypes();
    this.lazyInitModdedCardTypes();
    this.lazyInitModdedPillEffects();
    this.lazyInitTagToCollectibleTypesMap();
    this.lazyInitCacheFlagToCollectibleTypesMap();
    this.lazyInitCacheFlagToTrinketTypesMap();
    this.lazyInitFlyingCollectibleTypesSet();
    this.lazyInitFlyingTrinketTypesSet();
    this.lazyInitEdenCollectibleTypesSet();
    this.lazyInitCardTypes();
  }

  private lazyInitModdedCollectibleTypes() {
    for (const collectibleType of VANILLA_COLLECTIBLE_TYPES) {
      this.allCollectibleTypesArray.push(collectibleType);
      this.allCollectibleTypesSet.add(collectibleType);
    }

    const firstModdedCollectibleType =
      this.moddedElementDetection.getFirstModdedCollectibleType();
    if (firstModdedCollectibleType === undefined) {
      return;
    }

    const lastCollectibleType =
      this.moddedElementDetection.getLastCollectibleType();
    const moddedCollectibleTypes = iRange(
      firstModdedCollectibleType,
      lastCollectibleType,
    );

    for (const collectibleTypeInt of moddedCollectibleTypes) {
      // Modded collectible types are contiguous, but we check every value just in case.
      const collectibleType = asCollectibleType(collectibleTypeInt);
      const itemConfigItem = itemConfig.GetCollectible(collectibleType);
      if (itemConfigItem !== undefined) {
        this.moddedCollectibleTypesArray.push(collectibleType);
        this.moddedCollectibleTypesSet.add(collectibleType);

        this.allCollectibleTypesArray.push(collectibleType);
        this.allCollectibleTypesSet.add(collectibleType);
      }
    }
  }

  private lazyInitModdedTrinketTypes() {
    for (const trinketType of VANILLA_TRINKET_TYPES) {
      this.allTrinketTypesArray.push(trinketType);
      this.allTrinketTypesSet.add(trinketType);
    }

    const firstModdedTrinketType =
      this.moddedElementDetection.getFirstModdedTrinketType();
    if (firstModdedTrinketType === undefined) {
      return;
    }

    const lastTrinketType = this.moddedElementDetection.getLastTrinketType();
    const moddedTrinketTypes = iRange(firstModdedTrinketType, lastTrinketType);

    for (const trinketTypeInt of moddedTrinketTypes) {
      // Modded trinket types are contiguous, but we check every value just in case.
      const trinketType = asTrinketType(trinketTypeInt);
      const itemConfigItem = itemConfig.GetTrinket(trinketType);
      if (itemConfigItem !== undefined) {
        this.moddedTrinketTypesArray.push(trinketType);
        this.moddedTrinketTypesSet.add(trinketType);

        this.allTrinketTypesArray.push(trinketType);
        this.allTrinketTypesSet.add(trinketType);
      }
    }
  }

  private lazyInitModdedCardTypes() {
    for (const cardType of VANILLA_CARD_TYPES) {
      this.allCardTypesArray.push(cardType);
      this.allCardTypesSet.add(cardType);
    }

    const firstModdedCardType =
      this.moddedElementDetection.getFirstModdedCardType();
    if (firstModdedCardType === undefined) {
      return;
    }

    const lastCardType = this.moddedElementDetection.getLastCardType();
    const moddedCardTypes = iRange(firstModdedCardType, lastCardType);

    for (const cardTypeInt of moddedCardTypes) {
      // Modded card types are contiguous, but we check every value just in case.
      const cardType = asCardType(cardTypeInt);
      const itemConfigCard = itemConfig.GetCard(cardType);
      if (itemConfigCard !== undefined) {
        this.moddedCardTypesArray.push(cardType);
        this.moddedCardTypesSet.add(cardType);

        this.allCardTypesArray.push(cardType);
        this.allCardTypesSet.add(cardType);
      }
    }
  }

  private lazyInitModdedPillEffects() {
    for (const pillEffect of VANILLA_PILL_EFFECTS) {
      this.allPillEffectsArray.push(pillEffect);
      this.allPillEffectsSet.add(pillEffect);
    }

    const firstModdedPillEffect =
      this.moddedElementDetection.getFirstModdedPillEffect();
    if (firstModdedPillEffect === undefined) {
      return;
    }

    const lastPillEffect = this.moddedElementDetection.getLastPillEffect();
    const moddedPillEffects = iRange(firstModdedPillEffect, lastPillEffect);

    for (const pillEffectInt of moddedPillEffects) {
      // Modded pill effects are contiguous, but we check every value just in case.
      const pillEffect = asPillEffect(pillEffectInt);
      const itemConfigPillEffect = itemConfig.GetPillEffect(pillEffect);
      if (itemConfigPillEffect !== undefined) {
        this.moddedPillEffectsArray.push(pillEffect);
        this.moddedPillEffectsSet.add(pillEffect);

        this.allPillEffectsArray.push(pillEffect);
        this.allPillEffectsSet.add(pillEffect);
      }
    }
  }

  private lazyInitTagToCollectibleTypesMap() {
    // The tag to collectible types map should be valid for every tag, so we initialize it with
    // empty sets.
    for (const itemConfigTag of ITEM_CONFIG_TAG_VALUES) {
      this.tagToCollectibleTypesMap.set(itemConfigTag, new Set());
    }

    for (const collectibleType of this.getCollectibleTypes()) {
      for (const itemConfigTag of ITEM_CONFIG_TAG_VALUES) {
        if (!collectibleHasTag(collectibleType, itemConfigTag)) {
          continue;
        }

        const collectibleTypesSet =
          this.tagToCollectibleTypesMap.get(itemConfigTag);
        if (collectibleTypesSet === undefined) {
          const flagName = getFlagName(itemConfigTag, ItemConfigTag);
          error(
            `Failed to get the collectible types for item tag: ${flagName}`,
          );
        }
        collectibleTypesSet.add(collectibleType);
      }
    }
  }

  private lazyInitCacheFlagToCollectibleTypesMap() {
    for (const cacheFlag of CACHE_FLAG_VALUES) {
      const collectiblesSet = new Set<CollectibleType>();

      for (const collectibleType of this.getCollectibleTypes()) {
        if (collectibleHasCacheFlag(collectibleType, cacheFlag)) {
          collectiblesSet.add(collectibleType);
        }
      }

      this.cacheFlagToCollectibleTypesMap.set(cacheFlag, collectiblesSet);
    }
  }

  private lazyInitCacheFlagToTrinketTypesMap() {
    for (const cacheFlag of CACHE_FLAG_VALUES) {
      const trinketsSet = new Set<TrinketType>();

      for (const trinketType of this.getTrinketTypes()) {
        if (trinketHasCacheFlag(trinketType, cacheFlag)) {
          trinketsSet.add(trinketType);
        }
      }

      this.cacheFlagToTrinketTypesMap.set(cacheFlag, trinketsSet);
    }
  }

  private lazyInitFlyingCollectibleTypesSet() {
    // Instead of manually compiling a list of collectibles that grant flying, we can instead
    // dynamically look for collectibles that have `CacheFlag.FLYING`.
    this.flyingCollectibleTypesSet = copySet(
      this.getCollectibleTypesWithCacheFlag(CacheFlag.FLYING),
    );

    // None of the collectibles with a cache of "all" grant flying (including all of the 3 Dollar
    // Bill collectibles and all of the Birthright effects), so we can safely remove them from the
    // list.
    const collectiblesWithAllCacheFlag = this.getCollectibleTypesWithCacheFlag(
      CacheFlag.ALL,
    );
    deleteSetsFromSet(
      this.flyingCollectibleTypesSet,
      collectiblesWithAllCacheFlag,
    );

    // Additionally, create a second set that represents the collectible types that grant flying
    // non-conditionally.
    const permanentFlyingCollectibleTypes = copySet(
      this.flyingCollectibleTypesSet,
    );
    for (const collectibleType of CONDITIONAL_FLYING_COLLECTIBLE_TYPES) {
      permanentFlyingCollectibleTypes.delete(collectibleType);
    }
    for (const collectibleType of permanentFlyingCollectibleTypes) {
      this.permanentFlyingCollectibleTypesSet.add(collectibleType);
    }
  }

  private lazyInitFlyingTrinketTypesSet() {
    // Instead of manually compiling a list of trinkets that grant flying, we can instead
    // dynamically look for collectibles that have `CacheFlag.FLYING`.
    this.flyingTrinketTypesSet = copySet(
      this.getTrinketsTypesWithCacheFlag(CacheFlag.FLYING),
    );

    // None of the trinkets with `CacheFlag.ALL` grant flying except for Azazel's Stump, so we can
    // safely remove them from the list.
    const trinketsWithAllCacheFlag = copySet(
      this.getTrinketsTypesWithCacheFlag(CacheFlag.ALL),
    );
    trinketsWithAllCacheFlag.delete(TrinketType.AZAZELS_STUMP);
    deleteSetsFromSet(this.flyingTrinketTypesSet, trinketsWithAllCacheFlag);
  }

  private lazyInitEdenCollectibleTypesSet() {
    for (const collectibleType of this.getCollectibleTypes()) {
      if (
        isHiddenCollectible(collectibleType) ||
        collectibleHasTag(collectibleType, ItemConfigTag.NO_EDEN)
      ) {
        continue;
      }

      if (isActiveCollectible(collectibleType)) {
        this.edenActiveCollectibleTypesSet.add(collectibleType);
      }

      if (isPassiveOrFamiliarCollectible(collectibleType)) {
        this.edenPassiveCollectibleTypesSet.add(collectibleType);
      }
    }
  }

  private lazyInitCardTypes() {
    // The card type to cards map should be valid for every card type, so we initialize it with
    // empty sets.
    for (const itemConfigCardType of ITEM_CONFIG_CARD_TYPE_VALUES) {
      this.itemConfigCardTypeToCardTypeMap.set(
        itemConfigCardType,
        new Set<CardType>(),
      );
    }

    for (const cardType of this.getCardTypes()) {
      const itemConfigCardType = getItemConfigCardType(cardType);
      if (itemConfigCardType !== undefined) {
        const cardTypeSet =
          this.itemConfigCardTypeToCardTypeMap.get(itemConfigCardType);
        assertDefined(
          cardTypeSet,
          `Failed to get the card set for item config card type: ${itemConfigCardType}`,
        );

        cardTypeSet.add(cardType);

        if (ITEM_CONFIG_CARD_TYPES_FOR_CARDS_SET.has(itemConfigCardType)) {
          this.cardSet.add(cardType);
        }
      }
    }
  }

  // ------------
  // Collectibles
  // ------------

  /**
   * Returns an array containing every valid collectible type in the game, including modded
   * collectibles.
   *
   * Use this if you need to iterate over the collectibles in order. If you need to do O(1) lookups,
   * then use the `getCollectibleTypesSet` helper function instead.
   *
   * This function can only be called if at least one callback has been executed. This is because
   * not all collectible types will necessarily be present when a mod first loads (due to mod load
   * order).
   *
   * In order to use this function, you must upgrade your mod with `ISCFeature.MODDED_ELEMENT_SETS`.
   */
  @Exported
  public getCollectibleTypes(): readonly CollectibleType[] {
    this.lazyInit();
    return this.allCollectibleTypesArray;
  }

  /**
   * Returns a set containing every valid collectible type in the game, including modded
   * collectibles.
   *
   * Use this if you need to do O(1) lookups. If you need to iterate over the collectibles in order,
   * then use the `getCollectibleTypes` helper function instead.
   *
   * This function can only be called if at least one callback has been executed. This is because
   * not all collectible types will necessarily be present when a mod first loads (due to mod load
   * order).
   *
   * In order to use this function, you must upgrade your mod with `ISCFeature.MODDED_ELEMENT_SETS`.
   */
  @Exported
  public getCollectibleTypeSet(): ReadonlySet<CollectibleType> {
    this.lazyInit();
    return this.allCollectibleTypesSet;
  }

  /**
   * Returns an array containing every modded collectible type in the game.
   *
   * Use this if you need to iterate over the collectibles in order. If you need to do O(1) lookups,
   * then use the `getModdedCollectibleTypesSet` helper function instead.
   *
   * This function can only be called if at least one callback has been executed. This is because
   * not all collectible types will necessarily be present when a mod first loads (due to mod load
   * order).
   *
   * In order to use this function, you must upgrade your mod with `ISCFeature.MODDED_ELEMENT_SETS`.
   */
  @Exported
  public getModdedCollectibleTypes(): readonly CollectibleType[] {
    this.lazyInit();
    return this.moddedCollectibleTypesArray;
  }

  /**
   * Returns a set containing every modded collectible type in the game.
   *
   * Use this if you need to do O(1) lookups. If you need to iterate over the collectibles in order,
   * then use the `getModdedCollectibleTypes` helper function instead.
   *
   * This function can only be called if at least one callback has been executed. This is because
   * not all collectible types will necessarily be present when a mod first loads (due to mod load
   * order).
   *
   * In order to use this function, you must upgrade your mod with `ISCFeature.MODDED_ELEMENT_SETS`.
   */
  @Exported
  public getModdedCollectibleTypesSet(): ReadonlySet<CollectibleType> {
    this.lazyInit();
    return this.moddedCollectibleTypesSet;
  }

  /**
   * Iterates over every collectible in the game and returns a map containing the number of each
   * item that the player has.
   *
   * Note that this will filter out non-real collectibles like Lilith's Incubus.
   *
   * This function can only be called if at least one callback has been executed. This is because
   * not all collectible types will necessarily be present when a mod first loads (due to mod load
   * order).
   *
   * In order to use this function, you must upgrade your mod with `ISCFeature.MODDED_ELEMENT_SETS`.
   */
  @Exported
  public getPlayerCollectibleMap(
    player: EntityPlayer,
  ): Map<CollectibleType, int> {
    const collectibleArray = this.getCollectibleTypes();

    const collectibleMap = new Map<CollectibleType, int>();
    for (const collectibleType of collectibleArray) {
      // We specify "true" as the second argument to filter out things like Lilith's Incubus.
      const numCollectibles = player.GetCollectibleNum(collectibleType, true);
      if (numCollectibles > 0) {
        collectibleMap.set(collectibleType, numCollectibles);
      }
    }

    // If the player has TMTRAINER, they might also have glitched items.
    if (player.HasCollectible(CollectibleType.TMTRAINER)) {
      let collectibleType = FIRST_GLITCHED_COLLECTIBLE_TYPE;
      let itemConfigItem: Readonly<ItemConfigItem> | undefined;
      do {
        itemConfigItem = itemConfig.GetCollectible(collectibleType);

        if (itemConfigItem !== undefined) {
          // The `EntityPlayer.GetCollectibleNum` method is bugged with TMTrainer items and will
          // always return 0. To work around this, we simply assume that if the player has the
          // collectible, then they have one copy of the item.
          const hasCollectibles = player.HasCollectible(collectibleType, true);
          if (hasCollectibles) {
            collectibleMap.set(collectibleType, 1);
          }
        }

        collectibleType--; // eslint-disable-line isaacscript/strict-enums
      } while (itemConfigItem !== undefined);
    }

    return collectibleMap;
  }

  // --------
  // Trinkets
  // --------

  /**
   * Returns an array containing every modded trinket type in the game.
   *
   * Use this if you need to iterate over the trinkets in order. If you need to do O(1) lookups,
   * then use the `getModdedTrinketTypesSet` helper function instead.
   *
   * This function can only be called if at least one callback has been executed. This is because
   * not all trinket types will necessarily be present when a mod first loads (due to mod load
   * order).
   *
   * In order to use this function, you must upgrade your mod with `ISCFeature.MODDED_ELEMENT_SETS`.
   */
  @Exported
  public getTrinketTypes(): readonly TrinketType[] {
    this.lazyInit();
    return this.allTrinketTypesArray;
  }

  /**
   * Returns a set containing every modded trinket type in the game.
   *
   * Use this if you need to do O(1) lookups. If you need to iterate over the trinkets in order,
   * then use the `getModdedTrinketTypes` helper function instead.
   *
   * This function can only be called if at least one callback has been executed. This is because
   * not all trinket types will necessarily be present when a mod first loads (due to mod load
   * order).
   *
   * In order to use this function, you must upgrade your mod with `ISCFeature.MODDED_ELEMENT_SETS`.
   */
  @Exported
  public getTrinketTypesSet(): ReadonlySet<TrinketType> {
    this.lazyInit();
    return this.allTrinketTypesSet;
  }

  /**
   * Returns an array containing every modded trinket type in the game.
   *
   * Use this if you need to iterate over the trinkets in order. If you need to do O(1) lookups,
   * then use the `getModdedTrinketTypesSet` helper function instead.
   *
   * This function can only be called if at least one callback has been executed. This is because
   * not all trinket types will necessarily be present when a mod first loads (due to mod load
   * order).
   *
   * In order to use this function, you must upgrade your mod with `ISCFeature.MODDED_ELEMENT_SETS`.
   */
  @Exported
  public getModdedTrinketTypes(): readonly TrinketType[] {
    this.lazyInit();
    return this.moddedTrinketTypesArray;
  }

  /**
   * Returns a set containing every modded trinket type in the game.
   *
   * Use this if you need to do O(1) lookups. If you need to iterate over the trinkets in order,
   * then use the `getModdedTrinketTypes` helper function instead.
   *
   * This function can only be called if at least one callback has been executed. This is because
   * not all trinket types will necessarily be present when a mod first loads (due to mod load
   * order).
   *
   * In order to use this function, you must upgrade your mod with `ISCFeature.MODDED_ELEMENT_SETS`.
   */
  @Exported
  public getModdedTrinketTypesSet(): ReadonlySet<TrinketType> {
    this.lazyInit();
    return this.moddedTrinketTypesSet;
  }

  // -----
  // Cards
  // -----

  /**
   * Returns an array containing every valid card type in the game, including modded cards.
   *
   * Use this if you need to iterate over the cards in order. If you need to do O(1) lookups, then
   * use the `getCardTypesSet` helper function instead.
   *
   * This function can only be called if at least one callback has been executed. This is because
   * not all card types will necessarily be present when a mod first loads (due to mod load order).
   *
   * In order to use this function, you must upgrade your mod with `ISCFeature.MODDED_ELEMENT_SETS`.
   */
  @Exported
  public getCardTypes(): readonly CardType[] {
    this.lazyInit();
    return this.allCardTypesArray;
  }

  /**
   * Returns a set containing every valid card type in the game, including modded cards.
   *
   * Use this if you need to do O(1) lookups. If you need to iterate over the cards in order, then
   * use the `getCardTypes` helper function instead.
   *
   * This function can only be called if at least one callback has been executed. This is because
   * not all card types will necessarily be present when a mod first loads (due to mod load order).
   *
   * In order to use this function, you must upgrade your mod with `ISCFeature.MODDED_ELEMENT_SETS`.
   */
  @Exported
  public getCardTypesSet(): ReadonlySet<CardType> {
    this.lazyInit();
    return this.allCardTypesSet;
  }

  /**
   * Returns an array containing every modded card type in the game.
   *
   * Use this if you need to iterate over the cards in order. If you need to do O(1) lookups, then
   * use the `getModdedCardTypesSet` helper function instead.
   *
   * This function can only be called if at least one callback has been executed. This is because
   * not all card types will necessarily be present when a mod first loads (due to mod load order).
   *
   * In order to use this function, you must upgrade your mod with `ISCFeature.MODDED_ELEMENT_SETS`.
   */
  @Exported
  public getModdedCardTypes(): readonly CardType[] {
    this.lazyInit();
    return this.moddedCardTypesArray;
  }

  /**
   * Returns a set containing every modded card type in the game.
   *
   * Use this if you need to do O(1) lookups. If you need to iterate over the cards in order, then
   * use the `getModdedCardTypes` helper function instead.
   *
   * This function can only be called if at least one callback has been executed. This is because
   * not all card types will necessarily be present when a mod first loads (due to mod load order).
   *
   * In order to use this function, you must upgrade your mod with `ISCFeature.MODDED_ELEMENT_SETS`.
   */
  @Exported
  public getModdedCardTypesSet(): ReadonlySet<CardType> {
    this.lazyInit();
    return this.moddedCardTypesSet;
  }

  // ------------
  // Pill Effects
  // ------------

  /**
   * Returns an array containing every valid pill effect in the game, including modded pill effects.
   *
   * Use this if you need to iterate over the pill effects in order. If you need to do O(1) lookups,
   * then use the `getPillEffectSet` helper function instead.
   *
   * This function can only be called if at least one callback has been executed. This is because
   * not all pill effects will necessarily be present when a mod first loads (due to mod load
   * order).
   *
   * In order to use this function, you must upgrade your mod with `ISCFeature.MODDED_ELEMENT_SETS`.
   */
  @Exported
  public getPillEffects(): readonly PillEffect[] {
    this.lazyInit();
    return this.allPillEffectsArray;
  }

  /**
   * Returns a set containing every valid pill effect in the game, including modded pill effects.
   *
   * Use this if you need to do O(1) lookups. If you need to iterate over the pill effects in order,
   * then use the `getPillEffects` helper function instead.
   *
   * This function can only be called if at least one callback has been executed. This is because
   * not all pill effects will necessarily be present when a mod first loads (due to mod load
   * order).
   *
   * In order to use this function, you must upgrade your mod with `ISCFeature.MODDED_ELEMENT_SETS`.
   */
  @Exported
  public getPillEffectsSet(): ReadonlySet<PillEffect> {
    this.lazyInit();
    return this.allPillEffectsSet;
  }

  /**
   * Returns an array containing every modded pill effect in the game.
   *
   * Use this if you need to iterate over the pill effects in order. If you need to do O(1) lookups,
   * then use the `getModdedPillEffectsSet` helper function instead.
   *
   * This function can only be called if at least one callback has been executed. This is because
   * not all pill effects will necessarily be present when a mod first loads (due to mod load
   * order).
   *
   * In order to use this function, you must upgrade your mod with `ISCFeature.MODDED_ELEMENT_SETS`.
   */
  @Exported
  public getModdedPillEffects(): readonly PillEffect[] {
    this.lazyInit();
    return this.moddedPillEffectsArray;
  }

  /**
   * Returns a set containing every modded pill effect in the game.
   *
   * Use this if you need to do O(1) lookups. If you need to iterate over the pill effects in order,
   * then use the `getModdedPillEffects` helper function instead.
   *
   * This function can only be called if at least one callback has been executed. This is because
   * not all pill effects will necessarily be present when a mod first loads (due to mod load
   * order).
   *
   * In order to use this function, you must upgrade your mod with `ISCFeature.MODDED_ELEMENT_SETS`.
   */
  @Exported
  public getModdedPillEffectsSet(): ReadonlySet<PillEffect> {
    this.lazyInit();
    return this.moddedPillEffectsSet;
  }

  // -----------
  // Cache Flags
  // -----------

  /**
   * Returns a set containing every collectible type with the given cache flag, including modded
   * collectibles.
   *
   * This function can only be called if at least one callback has been executed. This is because
   * not all collectible types will necessarily be present when a mod first loads (due to mod load
   * order).
   *
   * In order to use this function, you must upgrade your mod with `ISCFeature.MODDED_ELEMENT_SETS`.
   */
  @Exported
  public getCollectibleTypesWithCacheFlag(
    cacheFlag: CacheFlag,
  ): ReadonlySet<CollectibleType> {
    this.lazyInit();

    const collectiblesSet = this.cacheFlagToCollectibleTypesMap.get(cacheFlag);
    if (collectiblesSet === undefined) {
      return new ReadonlySet();
    }

    return collectiblesSet;
  }

  /**
   * Returns a set containing every trinket type with the given cache flag, including modded
   * trinkets.
   *
   * This function can only be called if at least one callback has been executed. This is because
   * not all trinket types will necessarily be present when a mod first loads (due to mod load
   * order).
   *
   * In order to use this function, you must upgrade your mod with `ISCFeature.MODDED_ELEMENT_SETS`.
   */
  @Exported
  public getTrinketsTypesWithCacheFlag(
    cacheFlag: CacheFlag,
  ): ReadonlySet<TrinketType> {
    this.lazyInit();

    const trinketsSet = this.cacheFlagToTrinketTypesMap.get(cacheFlag);
    if (trinketsSet === undefined) {
      return new ReadonlySet();
    }

    return trinketsSet;
  }

  /**
   * Returns an array containing every collectible type that the player has that matches the
   * provided `CacheFlag`.
   *
   * For example, if the cache flag is `CacheFlag.FLYING`, and the player has one Lord of the Pit
   * and two Dead Doves, then this function would return:
   *
   * ```ts
   * [
   *   CollectibleType.LORD_OF_THE_PIT,
   *   CollectibleType.DEAD_DOVE,
   *   CollectibleType.DEAD_DOVE,
   * ]
   * ```
   *
   * Note that this array will not include collectibles that the player does not really have, like
   * Lilith's Incubus.
   *
   * This function can only be called if at least one callback has been executed. This is because
   * not all collectible types will necessarily be present when a mod first loads (due to mod load
   * order).
   *
   * In order to use this function, you must upgrade your mod with `ISCFeature.MODDED_ELEMENT_SETS`.
   */
  @Exported
  public getPlayerCollectiblesWithCacheFlag(
    player: EntityPlayer,
    cacheFlag: CacheFlag,
  ): CollectibleType[] {
    const collectiblesWithCacheFlag =
      this.getCollectibleTypesWithCacheFlag(cacheFlag);

    const playerCollectibles: CollectibleType[] = [];
    for (const collectibleType of getSortedSetValues(
      collectiblesWithCacheFlag,
    )) {
      // We specify "true" as the second argument to filter out things like Lilith's Incubus.
      const numCollectibles = player.GetCollectibleNum(collectibleType, true);
      repeat(numCollectibles, () => {
        playerCollectibles.push(collectibleType);
      });
    }

    return playerCollectibles;
  }

  /**
   * Returns a map containing every trinket type that the player has that matches the provided
   * `CacheFlag`. The values of the map correspond to the multiplier for that trinket.
   *
   * This function can only be called if at least one callback has been executed. This is because
   * not all trinket types will necessarily be present when a mod first loads (due to mod load
   * order).
   *
   * In order to use this function, you must upgrade your mod with `ISCFeature.MODDED_ELEMENT_SETS`.
   */
  @Exported
  public getPlayerTrinketsWithCacheFlag(
    player: EntityPlayer,
    cacheFlag: CacheFlag,
  ): Map<TrinketType, int> {
    const trinketTypesWithCacheFlag =
      this.getTrinketsTypesWithCacheFlag(cacheFlag);

    const playerTrinkets = new Map<TrinketType, int>();
    for (const trinketType of trinketTypesWithCacheFlag) {
      const trinketMultiplier = player.GetTrinketMultiplier(trinketType);
      if (trinketMultiplier > 0) {
        playerTrinkets.set(trinketType, trinketMultiplier);
      }
    }

    return playerTrinkets;
  }

  /**
   * Returns a set of all of the collectibles that grant flight. This is derived from collectibles
   * that have `CacheFlag.FLYING` set in the "items.xml" file.
   *
   * Vanilla collectibles that only grant flight conditionally are manually pruned. Collectibles
   * such as Empty Vessel should be checked for via the `hasFlyingTemporaryEffect` function.
   *
   * Under the hood, this is determined by looking at the collectibles that have `CacheFlag.FLYING`
   * and excluding the ones that have `CacheFlag.ALL`. (None of the collectibles with
   * `CacheFlag.ALL` grant flying, including all of the 3 Dollar Bill collectibles and all of the
   * Birthright effects.)
   *
   * This function can only be called if at least one callback has been executed. This is because
   * not all collectible types will necessarily be present when a mod first loads (due to mod load
   * order).
   *
   * In order to use this function, you must upgrade your mod with `ISCFeature.MODDED_ELEMENT_SETS`.
   *
   * @param includeConditionalItems Whether collectibles that only grant flight conditionally should
   *                                be included in the set (like Empty Vessel).
   */
  @Exported
  public getFlyingCollectibleTypes(
    includeConditionalItems: boolean,
  ): ReadonlySet<CollectibleType> {
    this.lazyInit();

    return includeConditionalItems
      ? this.flyingCollectibleTypesSet
      : this.permanentFlyingCollectibleTypesSet;
  }

  /**
   * Returns a set of all of the trinkets that grant flight. (All vanilla trinkets that grant flight
   * do so conditionally, like Bat Wing and Azazel's Stump.)
   *
   * Under the hood, this is determined by looking at the trinkets that have `CacheFlag.FLYING` and
   * excluding the ones that have `CacheFlag.ALL`. (None of the trinket with `CacheFlag.ALL` grant
   * flying except for Azazel's Stump.)
   *
   * This function can only be called if at least one callback has been executed. This is because
   * not all trinket types will necessarily be present when a mod first loads (due to mod load
   * order).
   *
   * In order to use this function, you must upgrade your mod with `ISCFeature.MODDED_ELEMENT_SETS`.
   */
  @Exported
  public getFlyingTrinketTypes(): ReadonlySet<TrinketType> {
    this.lazyInit();
    return this.flyingTrinketTypesSet;
  }

  // ----------------
  // Collectible Tags
  // ----------------

  /**
   * Returns a set containing every collectible type with the given tag.
   *
   * For example, to get all of the collectible types that count as offensive for the purposes of
   * Tainted Lost:
   *
   * ```ts
   * const offensiveCollectibleTypes = getCollectibleTypesWithTag(ItemConfigTag.OFFENSIVE);
   * ```
   *
   * This function can only be called if at least one callback has been executed. This is because
   * not all collectible types will necessarily be present when a mod first loads (due to mod load
   * order).
   *
   * In order to use this function, you must upgrade your mod with `ISCFeature.MODDED_ELEMENT_SETS`.
   */
  @Exported
  public getCollectibleTypesWithTag(
    itemConfigTag: ItemConfigTag,
  ): ReadonlySet<CollectibleType> {
    this.lazyInit();

    const collectibleTypes = this.tagToCollectibleTypesMap.get(itemConfigTag);
    assertDefined(
      collectibleTypes,
      `The item config tag of ${itemConfigTag} is not a valid value of the "ItemConfigTag" enum.`,
    );

    return collectibleTypes;
  }

  /**
   * Returns the number of items that a player has towards a particular transformation.
   *
   * This function can only be called if at least one callback has been executed. This is because
   * not all collectible types will necessarily be present when a mod first loads (due to mod load
   * order).
   *
   * In order to use this function, you must upgrade your mod with `ISCFeature.MODDED_ELEMENT_SETS`.
   */
  @Exported
  public getPlayerCollectiblesWithTag(
    player: EntityPlayer,
    itemConfigTag: ItemConfigTag,
  ): CollectibleType[] {
    const collectibleTypesWithTag =
      this.getCollectibleTypesWithTag(itemConfigTag);

    const playerCollectibles: CollectibleType[] = [];
    for (const collectibleType of getSortedSetValues(collectibleTypesWithTag)) {
      // We specify "true" as the second argument to filter out things like Lilith's Incubus.
      const numCollectibles = player.GetCollectibleNum(collectibleType, true);
      repeat(numCollectibles, () => {
        playerCollectibles.push(collectibleType);
      });
    }

    return playerCollectibles;
  }

  /**
   * Helper function to get all of the collectible types in the game that count towards a particular
   * transformation.
   *
   * For example, to get all of the collectible types that count towards Guppy:
   *
   * ```ts
   * const guppyCollectibleTypes = getCollectiblesForTransformation(PlayerForm.GUPPY);
   * ```
   *
   * This function can only be called if at least one callback has been executed. This is because
   * not all collectible types will necessarily be present when a mod first loads (due to mod load
   * order).
   *
   * In order to use this function, you must upgrade your mod with `ISCFeature.MODDED_ELEMENT_SETS`.
   */
  @Exported
  public getCollectibleTypesForTransformation(
    playerForm: PlayerForm,
  ): ReadonlySet<CollectibleType> {
    const itemConfigTag = TRANSFORMATION_TO_TAG_MAP.get(playerForm);
    assertDefined(
      itemConfigTag,
      `Failed to get the collectible types for the transformation of ${playerForm} because that transformation is not based on collectibles.`,
    );

    return this.getCollectibleTypesWithTag(itemConfigTag);
  }

  /**
   * Returns the number of items that a player has towards a particular transformation.
   *
   * This function can only be called if at least one callback has been executed. This is because
   * not all collectible types will necessarily be present when a mod first loads (due to mod load
   * order).
   *
   * In order to use this function, you must upgrade your mod with `ISCFeature.MODDED_ELEMENT_SETS`.
   */
  @Exported
  public getPlayerCollectiblesForTransformation(
    player: EntityPlayer,
    playerForm: PlayerForm,
  ): CollectibleType[] {
    const collectibleForTransformation =
      this.getCollectibleTypesForTransformation(playerForm);

    const playerCollectibles: CollectibleType[] = [];
    for (const collectibleType of getSortedSetValues(
      collectibleForTransformation,
    )) {
      // We specify "true" as the second argument to filter out things like Lilith's Incubus.
      const numCollectibles = player.GetCollectibleNum(collectibleType, true);
      repeat(numCollectibles, () => {
        playerCollectibles.push(collectibleType);
      });
    }

    return playerCollectibles;
  }

  /**
   * Returns a set containing every valid passive item that can be randomly granted to Eden as a
   * starting item.
   *
   * Under the hood, this is determined by looking at the "noeden" tag in "items_metadata.xml".
   *
   * This function can only be called if at least one callback has been executed. This is because
   * not all collectible types will necessarily be present when a mod first loads (due to mod load
   * order).
   *
   * In order to use this function, you must upgrade your mod with `ISCFeature.MODDED_ELEMENT_SETS`.
   */
  @Exported
  public getEdenActiveCollectibleTypes(): ReadonlySet<CollectibleType> {
    this.lazyInit();
    return this.edenActiveCollectibleTypesSet;
  }

  /**
   * Returns a set containing every valid passive item that can be randomly granted to Eden as a
   * starting item.
   *
   * Under the hood, this is determined by looking at the "noeden" tag in "items_metadata.xml".
   *
   * This function can only be called if at least one callback has been executed. This is because
   * not all collectible types will necessarily be present when a mod first loads (due to mod load
   * order).
   *
   * In order to use this function, you must upgrade your mod with `ISCFeature.MODDED_ELEMENT_SETS`.
   */
  @Exported
  public getEdenPassiveCollectibleTypes(): ReadonlySet<CollectibleType> {
    this.lazyInit();
    return this.edenPassiveCollectibleTypesSet;
  }

  /**
   * Returns a random active collectible type that that is a valid starting item for Eden.
   *
   * This function can only be called if at least one callback has been executed. This is because
   * not all collectible types will necessarily be present when a mod first loads (due to mod load
   * order).
   *
   * In order to use this function, you must upgrade your mod with `ISCFeature.MODDED_ELEMENT_SETS`.
   *
   * @param seedOrRNG Optional. The `Seed` or `RNG` object to use. If an `RNG` object is provided,
   *                  the `RNG.Next` method will be called. Default is `getRandomSeed()`.
   * @param exceptions Optional. An array of runes to not select.
   */
  @Exported
  public getRandomEdenActiveCollectibleType(
    seedOrRNG: Seed | RNG = getRandomSeed(),
    exceptions: CollectibleType[] | readonly CollectibleType[] = [],
  ): CollectibleType {
    this.lazyInit();
    return getRandomSetElement(
      this.edenPassiveCollectibleTypesSet,
      seedOrRNG,
      exceptions,
    );
  }

  /**
   * Returns a random passive collectible type that that is a valid starting item for Eden
   * (including familiars).
   *
   * This function can only be called if at least one callback has been executed. This is because
   * not all collectible types will necessarily be present when a mod first loads (due to mod load
   * order).
   *
   * In order to use this function, you must upgrade your mod with `ISCFeature.MODDED_ELEMENT_SETS`.
   *
   * @param seedOrRNG Optional. The `Seed` or `RNG` object to use. If an `RNG` object is provided,
   *                  the `RNG.Next` method will be called. Default is `getRandomSeed()`.
   * @param exceptions Optional. An array of runes to not select.
   */
  @Exported
  public getRandomEdenPassiveCollectibleType(
    seedOrRNG: Seed | RNG = getRandomSeed(),
    exceptions: CollectibleType[] | readonly CollectibleType[] = [],
  ): CollectibleType {
    this.lazyInit();
    return getRandomSetElement(
      this.edenPassiveCollectibleTypesSet,
      seedOrRNG,
      exceptions,
    );
  }

  // ----------------------
  // Item Config Card Types
  // ----------------------

  /**
   * Helper function to get a set of card types matching the `ItemConfigCardType`.
   *
   * This function is variadic, meaning that you can you can specify N card types to get a set
   * containing cards that match any of the specified types.
   *
   * This function can only be called if at least one callback has been executed. This is because
   * not all card types will necessarily be present when a mod first loads (due to mod load order).
   *
   * In order to use this function, you must upgrade your mod with `ISCFeature.MODDED_ELEMENT_SETS`.
   */
  @Exported
  public getCardTypesOfType(
    ...itemConfigCardTypes: ItemConfigCardType[]
  ): Set<CardType> {
    this.lazyInit();

    const matchingCardTypes = new Set<CardType>();
    for (const itemConfigCardType of itemConfigCardTypes) {
      const cardTypeSet =
        this.itemConfigCardTypeToCardTypeMap.get(itemConfigCardType);
      assertDefined(
        cardTypeSet,
        `Failed to get the card type set for item config type: ${itemConfigCardType}`,
      );

      for (const cardType of cardTypeSet) {
        matchingCardTypes.add(cardType);
      }
    }

    return matchingCardTypes;
  }

  /**
   * Helper function to get a random card type that matches the provided `ItemConfigCardType`.
   *
   * This function can only be called if at least one callback has been executed. This is because
   * not all card types will necessarily be present when a mod first loads (due to mod load order).
   *
   * In order to use this function, you must upgrade your mod with `ISCFeature.MODDED_ELEMENT_SETS`.
   *
   * @param itemConfigCardType The item config card type that represents the pool of cards to select
   *                           from.
   * @param seedOrRNG Optional. The `Seed` or `RNG` object to use. If an `RNG` object is provided,
   *                  the `RNG.Next` method will be called. Default is `getRandomSeed()`.
   * @param exceptions Optional. An array of cards to not select.
   */
  @Exported
  public getRandomCardTypeOfType(
    itemConfigCardType: ItemConfigCardType,
    seedOrRNG: Seed | RNG = getRandomSeed(),
    exceptions: CardType[] = [],
  ): CardType {
    const cardTypeSet = this.getCardTypesOfType(itemConfigCardType);
    return getRandomSetElement(cardTypeSet, seedOrRNG, exceptions);
  }

  /**
   * Has an equal chance of returning any card (e.g. Fool, Reverse Fool, Wild Card, etc.).
   *
   * This will not return:
   * - any runes
   * - any objects like Dice Shard
   *
   * This function can only be called if at least one callback has been executed. This is because
   * not all card types will necessarily be present when a mod first loads (due to mod load order).
   *
   * In order to use this function, you must upgrade your mod with `ISCFeature.MODDED_ELEMENT_SETS`.
   *
   * @param seedOrRNG Optional. The `Seed` or `RNG` object to use. If an `RNG` object is provided,
   *                  the `RNG.Next` method will be called. Default is `getRandomSeed()`.
   * @param exceptions Optional. An array of cards to not select.
   */
  @Exported
  public getRandomCard(
    seedOrRNG: Seed | RNG = getRandomSeed(),
    exceptions: CardType[] = [],
  ): CardType {
    this.lazyInit();
    return getRandomSetElement(this.cardSet, seedOrRNG, exceptions);
  }

  /**
   * Has an equal chance of returning any rune (e.g. Rune of Hagalaz, Blank Rune, Black Rune, Soul
   * of Isaac, etc.). This will never return a Rune Shard.
   *
   * This function can only be called if at least one callback has been executed. This is because
   * not all card types will necessarily be present when a mod first loads (due to mod load order).
   *
   * In order to use this function, you must upgrade your mod with `ISCFeature.MODDED_ELEMENT_SETS`.
   *
   * @param seedOrRNG Optional. The `Seed` or `RNG` object to use. If an `RNG` object is provided,
   *                  the `RNG.Next` method will be called. Default is `getRandomSeed()`.
   * @param exceptions Optional. An array of runes to not select.
   */
  @Exported
  public getRandomRune(
    seedOrRNG: Seed | RNG = getRandomSeed(),
    exceptions: CardType[] = [],
  ): CardType {
    const runesSet = this.getCardTypesOfType(ItemConfigCardType.RUNE);
    runesSet.delete(CardType.RUNE_SHARD);
    return getRandomSetElement(runesSet, seedOrRNG, exceptions);
  }
}
