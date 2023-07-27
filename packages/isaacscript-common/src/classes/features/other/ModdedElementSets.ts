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
import { Exported } from "../../../decorators";
import { ISCFeature } from "../../../enums/ISCFeature";
import {
  getItemConfigCardType,
  getVanillaCardTypes,
} from "../../../functions/cards";
import { collectibleHasTag } from "../../../functions/collectibleTag";
import {
  collectibleHasCacheFlag,
  getVanillaCollectibleTypeRange,
  isActiveCollectible,
  isHiddenCollectible,
  isPassiveCollectible,
} from "../../../functions/collectibles";
import { getFlagName } from "../../../functions/flag";
import { getRandomSeed } from "../../../functions/rng";
import {
  copySet,
  deleteSetsFromSet,
  getRandomSetElement,
  getSortedSetValues,
} from "../../../functions/set";
import {
  getVanillaTrinketTypeRange,
  trinketHasCacheFlag,
} from "../../../functions/trinkets";
import { repeat } from "../../../functions/utils";
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

export class ModdedElementSets extends Feature {
  private readonly allCollectibleTypesArray: CollectibleType[] = [];
  private readonly allCollectibleTypesSet = new Set<CollectibleType>();

  private readonly vanillaCollectibleTypesArray: CollectibleType[] = [];
  private readonly vanillaCollectibleTypesSet = new Set<CollectibleType>();

  private readonly moddedCollectibleTypesArray: CollectibleType[] = [];
  private readonly moddedCollectibleTypesSet = new Set<CollectibleType>();

  private readonly allTrinketTypesArray: TrinketType[] = [];
  private readonly allTrinketTypesSet = new Set<TrinketType>();

  private readonly vanillaTrinketTypesArray: TrinketType[] = [];
  private readonly vanillaTrinketTypesSet = new Set<TrinketType>();

  private readonly moddedTrinketTypesArray: TrinketType[] = [];
  private readonly moddedTrinketTypesSet = new Set<TrinketType>();

  private readonly allCardTypesArray: CardType[] = [];
  private readonly allCardTypesSet = new Set<CardType>();

  private readonly vanillaCardTypesArray: CardType[] = [];
  private readonly vanillaCardTypesSet = new Set<CardType>();

  private readonly moddedCardTypesArray: CardType[] = [];
  private readonly moddedCardTypesSet = new Set<CardType>();

  private readonly tagToCollectibleTypesMap = new Map<
    ItemConfigTag,
    Set<CollectibleType>
  >();

  private readonly cacheFlagToCollectibleTypesMap = new Map<
    CacheFlag,
    Set<CollectibleType>
  >();

  private readonly cacheFlagToTrinketTypesMap = new Map<CacheFlag, Set<TrinketType>>();

  private flyingCollectibleTypesSet = new Set<CollectibleType>();
  private readonly permanentFlyingCollectibleTypesSet = new Set<CollectibleType>();
  private flyingTrinketTypesSet = new Set<TrinketType>();

  private readonly edenActiveCollectibleTypesSet = new Set<CollectibleType>();
  private readonly edenPassiveCollectibleTypesSet = new Set<CollectibleType>();

  private readonly itemConfigCardTypeToCardTypeMap = new Map<
    ItemConfigCardType,
    Set<CardType>
  >();

  /**
   * The set of cards that are not:
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

  private lazyInitVanillaCollectibleTypes() {
    if (this.vanillaCollectibleTypesArray.length > 0) {
      return;
    }

    const vanillaCollectibleTypeRange = getVanillaCollectibleTypeRange();
    for (const collectibleType of vanillaCollectibleTypeRange) {
      // Vanilla collectible types are not contiguous, so we must check every value. (There are
      // several gaps, e.g. 666.)
      const itemConfigItem = itemConfig.GetCollectible(collectibleType);
      if (itemConfigItem !== undefined) {
        this.vanillaCollectibleTypesArray.push(collectibleType);
        this.vanillaCollectibleTypesSet.add(collectibleType);
      }
    }
  }

  private lazyInitModdedCollectibleTypes() {
    if (this.moddedCollectibleTypesArray.length > 0) {
      return;
    }

    this.lazyInitVanillaCollectibleTypes();

    for (const collectibleType of this.vanillaCollectibleTypesArray) {
      this.allCollectibleTypesArray.push(collectibleType);
      this.allCollectibleTypesSet.add(collectibleType);
    }

    const moddedCollectibleTypes =
      this.moddedElementDetection.getModdedCollectibleTypes();
    for (const collectibleType of moddedCollectibleTypes) {
      // Modded collectible types are contiguous, but we check every value just in case.
      const itemConfigItem = itemConfig.GetCollectible(collectibleType);
      if (itemConfigItem !== undefined) {
        this.moddedCollectibleTypesArray.push(collectibleType);
        this.moddedCollectibleTypesSet.add(collectibleType);

        this.allCollectibleTypesArray.push(collectibleType);
        this.allCollectibleTypesSet.add(collectibleType);
      }
    }
  }

  private lazyInitVanillaTrinketTypes() {
    if (this.vanillaTrinketTypesArray.length > 0) {
      return;
    }

    const vanillaTrinketTypeRange = getVanillaTrinketTypeRange();
    for (const trinketType of vanillaTrinketTypeRange) {
      // Vanilla trinket types are not contiguous, so we must check every value. (The only gap is 47
      // for `POLAROID_OBSOLETE`.)
      const itemConfigItem = itemConfig.GetTrinket(trinketType);
      if (itemConfigItem !== undefined) {
        this.vanillaTrinketTypesArray.push(trinketType);
        this.vanillaTrinketTypesSet.add(trinketType);
      }
    }
  }

  private lazyInitModdedTrinketTypes() {
    if (this.moddedTrinketTypesArray.length > 0) {
      return;
    }

    this.lazyInitVanillaTrinketTypes();

    for (const trinketType of this.vanillaTrinketTypesArray) {
      this.allTrinketTypesArray.push(trinketType);
      this.allTrinketTypesSet.add(trinketType);
    }

    const moddedTrinketTypes =
      this.moddedElementDetection.getModdedTrinketTypes();
    for (const trinketType of moddedTrinketTypes) {
      // Modded trinket types are contiguous, but we check every value just in case.
      const itemConfigItem = itemConfig.GetTrinket(trinketType);
      if (itemConfigItem !== undefined) {
        this.moddedTrinketTypesArray.push(trinketType);
        this.moddedTrinketTypesSet.add(trinketType);

        this.allTrinketTypesArray.push(trinketType);
        this.allTrinketTypesSet.add(trinketType);
      }
    }
  }

  private lazyInitVanillaCardTypes() {
    if (this.vanillaCardTypesArray.length > 0) {
      return;
    }

    const vanillaCardTypes = getVanillaCardTypes();
    for (const cardType of vanillaCardTypes) {
      // Vanilla card types are contiguous, but we check every value just to be safe (and so that
      // the code is similar to the collectible and trinket functions above).
      const itemConfigCard = itemConfig.GetCard(cardType);
      if (itemConfigCard !== undefined) {
        this.vanillaCardTypesArray.push(cardType);
        this.vanillaCardTypesSet.add(cardType);
      }
    }
  }

  private lazyInitModdedCardTypes() {
    if (this.moddedCardTypesArray.length > 0) {
      return;
    }

    this.lazyInitVanillaCardTypes();

    for (const cardType of this.vanillaCardTypesArray) {
      this.allCardTypesArray.push(cardType);
      this.allCardTypesSet.add(cardType);
    }

    const moddedCardTypes = this.moddedElementDetection.getModdedCardTypes();
    for (const cardType of moddedCardTypes) {
      // Modded card types are contiguous, but we check every value just in case.
      const itemConfigCard = itemConfig.GetCard(cardType);
      if (itemConfigCard !== undefined) {
        this.moddedCardTypesArray.push(cardType);
        this.moddedCardTypesSet.add(cardType);

        this.allCardTypesArray.push(cardType);
        this.allCardTypesSet.add(cardType);
      }
    }
  }

  private lazyInitTagToCollectibleTypesMap() {
    if (this.tagToCollectibleTypesMap.size > 0) {
      return;
    }

    // The tag to collectible types map should be valid for every tag, so we initialize it with
    // empty sets.
    for (const itemConfigTag of ITEM_CONFIG_TAG_VALUES) {
      this.tagToCollectibleTypesMap.set(itemConfigTag, new Set());
    }

    for (const collectibleType of this.getCollectibleArray()) {
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
    if (this.cacheFlagToCollectibleTypesMap.size > 0) {
      return;
    }

    for (const cacheFlag of CACHE_FLAG_VALUES) {
      const collectiblesSet = new Set<CollectibleType>();

      for (const collectibleType of this.getCollectibleArray()) {
        if (collectibleHasCacheFlag(collectibleType, cacheFlag)) {
          collectiblesSet.add(collectibleType);
        }
      }

      this.cacheFlagToCollectibleTypesMap.set(cacheFlag, collectiblesSet);
    }
  }

  private lazyInitCacheFlagToTrinketTypesMap() {
    if (this.cacheFlagToTrinketTypesMap.size > 0) {
      return;
    }

    for (const cacheFlag of CACHE_FLAG_VALUES) {
      const trinketsSet = new Set<TrinketType>();

      for (const trinketType of this.moddedElementDetection.getTrinketTypes()) {
        if (trinketHasCacheFlag(trinketType, cacheFlag)) {
          trinketsSet.add(trinketType);
        }
      }

      this.cacheFlagToTrinketTypesMap.set(cacheFlag, trinketsSet);
    }
  }

  private lazyInitFlyingCollectibleTypesSet() {
    if (this.flyingCollectibleTypesSet.size > 0) {
      return;
    }

    // Instead of manually compiling a list of collectibles that grant flying, we can instead
    // dynamically look for collectibles that have `CacheFlag.FLYING`.
    this.flyingCollectibleTypesSet = copySet(
      this.getCollectiblesWithCacheFlag(CacheFlag.FLYING),
    );

    // None of the collectibles with a cache of "all" grant flying (including all of the 3 Dollar
    // Bill collectibles and all of the Birthright effects), so we can safely remove them from the
    // list.
    const collectiblesWithAllCacheFlag = this.getCollectiblesWithCacheFlag(
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
    if (this.flyingTrinketTypesSet.size > 0) {
      return;
    }

    // Instead of manually compiling a list of trinkets that grant flying, we can instead
    // dynamically look for collectibles that have `CacheFlag.FLYING`.
    this.flyingTrinketTypesSet = copySet(
      this.getTrinketsWithCacheFlag(CacheFlag.FLYING),
    );

    // None of the collectibles with a cache of "all" grant flying except for Azazel's Stump, so we
    // can safely remove them from the list.
    const trinketsWithAllCacheFlag = copySet(
      this.getTrinketsWithCacheFlag(CacheFlag.ALL),
    );
    trinketsWithAllCacheFlag.delete(TrinketType.AZAZELS_STUMP);
    deleteSetsFromSet(this.flyingTrinketTypesSet, trinketsWithAllCacheFlag);
  }

  private lazyInitEdenCollectibleTypesSet() {
    if (this.edenActiveCollectibleTypesSet.size > 0) {
      return;
    }

    for (const collectibleType of this.getCollectibleArray()) {
      if (
        isHiddenCollectible(collectibleType) ||
        collectibleHasTag(collectibleType, ItemConfigTag.NO_EDEN)
      ) {
        continue;
      }

      if (isActiveCollectible(collectibleType)) {
        this.edenActiveCollectibleTypesSet.add(collectibleType);
      }

      if (isPassiveCollectible(collectibleType)) {
        this.edenPassiveCollectibleTypesSet.add(collectibleType);
      }
    }
  }

  private lazyInitCardTypes() {
    if (this.itemConfigCardTypeToCardTypeMap.size > 0) {
      return;
    }

    // The card type to cards map should be valid for every card type, so we initialize it with
    // empty sets.
    for (const itemConfigCardType of ITEM_CONFIG_CARD_TYPE_VALUES) {
      this.itemConfigCardTypeToCardTypeMap.set(
        itemConfigCardType,
        new Set<CardType>(),
      );
    }

    for (const cardType of this.getCardArray()) {
      const itemConfigCardType = getItemConfigCardType(cardType);
      if (itemConfigCardType !== undefined) {
        const cardTypeSet =
          this.itemConfigCardTypeToCardTypeMap.get(itemConfigCardType);
        if (cardTypeSet === undefined) {
          error(
            `Failed to get the card set for item config card type: ${itemConfigCardType}`,
          );
        }
        cardTypeSet.add(cardType);

        if (ITEM_CONFIG_CARD_TYPES_FOR_CARDS_SET.has(itemConfigCardType)) {
          this.cardSet.add(cardType);
        }
      }
    }
  }

  // --------------
  // Public Methods
  // --------------

  /**
   * Returns an array containing every valid card type in the game, including modded cards.
   *
   * Use this if you need to iterate over the cards in order. If you need to do O(1) lookups, then
   * use the `getCardSet` helper function instead.
   *
   * This function can only be called if at least one callback has been executed. This is because
   * not all cards will necessarily be present when a mod first loads (due to mod load order).
   *
   * In order to use this function, you must upgrade your mod with `ISCFeature.MODDED_ELEMENT_SETS`.
   */
  @Exported
  public getCardArray(): readonly CardType[] {
    this.lazyInitModdedCardTypes();
    return this.allCardTypesArray;
  }

  /**
   * Returns a set containing every valid card type in the game, including modded cards.
   *
   * Use this if you need to do O(1) lookups. If you need to iterate over the cards in order, then
   * use the `getCardArray` helper function instead.
   *
   * This function can only be called if at least one callback has been executed. This is because
   * not all cards will necessarily be present when a mod first loads (due to mod load order).
   *
   * In order to use this function, you must upgrade your mod with `ISCFeature.MODDED_ELEMENT_SETS`.
   */
  @Exported
  public getCardSet(): ReadonlySet<CardType> {
    this.lazyInitModdedCardTypes();
    return this.allCardTypesSet;
  }

  /**
   * Helper function to get a set of card types matching the `ItemConfigCardType`.
   *
   * This function is variadic, meaning that you can you can specify N card types to get a set
   * containing cards that match any of the specified types.
   *
   * This function can only be called if at least one callback has been executed. This is because
   * not all cards will necessarily be present when a mod first loads (due to mod load order).
   *
   * In order to use this function, you must upgrade your mod with `ISCFeature.MODDED_ELEMENT_SETS`.
   */
  @Exported
  public getCardTypesOfType(
    ...itemConfigCardTypes: ItemConfigCardType[]
  ): Set<CardType> {
    if (this.itemConfigCardTypeToCardTypeMap.size === 0) {
      this.lazyInitCardTypes();
    }

    const matchingCardTypes = new Set<CardType>();
    for (const itemConfigCardType of itemConfigCardTypes) {
      const cardTypeSet =
        this.itemConfigCardTypeToCardTypeMap.get(itemConfigCardType);
      if (cardTypeSet === undefined) {
        error(
          `Failed to get the card type set for item config type: ${itemConfigCardType}`,
        );
      }

      for (const cardType of cardTypeSet) {
        matchingCardTypes.add(cardType);
      }
    }

    return matchingCardTypes;
  }

  /**
   * Returns an array containing every valid collectible type in the game, including modded
   * collectibles.
   *
   * Use this if you need to iterate over the collectibles in order. If you need to do O(1) lookups,
   * then use the `getCollectibleSet` helper function instead.
   *
   * This function can only be called if at least one callback has been executed. This is because
   * not all collectibles will necessarily be present when a mod first loads (due to mod load
   * order).
   *
   * In order to use this function, you must upgrade your mod with `ISCFeature.MODDED_ELEMENT_SETS`.
   */
  @Exported
  public getCollectibleArray(): readonly CollectibleType[] {
    this.lazyInitModdedCollectibleTypes();
    return this.allCollectibleTypesArray;
  }

  /**
   * Returns a set containing every valid collectible type in the game, including modded
   * collectibles.
   *
   * Use this if you need to do O(1) lookups. If you need to iterate over the collectibles in order,
   * then use the `getCollectibleArray` helper function instead.
   *
   * This function can only be called if at least one callback has been executed. This is because
   * not all collectibles will necessarily be present when a mod first loads (due to mod load
   * order).
   *
   * In order to use this function, you must upgrade your mod with `ISCFeature.MODDED_ELEMENT_SETS`.
   */
  @Exported
  public getCollectibleSet(): ReadonlySet<CollectibleType> {
    this.lazyInitModdedCollectibleTypes();
    return this.allCollectibleTypesSet;
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
   * not all collectibles will necessarily be present when a mod first loads (due to mod load
   * order).
   *
   * In order to use this function, you must upgrade your mod with `ISCFeature.MODDED_ELEMENT_SETS`.
   */
  @Exported
  public getCollectiblesForTransformation(
    playerForm: PlayerForm,
  ): ReadonlySet<CollectibleType> {
    const itemConfigTag = TRANSFORMATION_TO_TAG_MAP.get(playerForm);
    if (itemConfigTag === undefined) {
      error(
        `Failed to get the collectible types for the transformation of ${playerForm} because that transformation is not based on collectibles.`,
      );
    }

    return this.getCollectiblesWithTag(itemConfigTag);
  }

  /**
   * Returns a set containing every collectible type with the given cache flag, including modded
   * collectibles.
   *
   * This function can only be called if at least one callback has been executed. This is because
   * not all collectibles will necessarily be present when a mod first loads (due to mod load
   * order).
   *
   * This function can only be called if at least one callback has been executed. This is because
   * not all collectibles will necessarily be present when a mod first loads (due to mod load
   * order).
   *
   * In order to use this function, you must upgrade your mod with `ISCFeature.MODDED_ELEMENT_SETS`.
   */
  @Exported
  public getCollectiblesWithCacheFlag(
    cacheFlag: CacheFlag,
  ): ReadonlySet<CollectibleType> {
    this.lazyInitCacheFlagToCollectibleTypesMap();

    const collectiblesSet = this.cacheFlagToCollectibleTypesMap.get(cacheFlag);
    if (collectiblesSet === undefined) {
      return new ReadonlySet();
    }

    return collectiblesSet;
  }

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
   * not all collectibles will necessarily be present when a mod first loads (due to mod load
   * order).
   *
   * In order to use this function, you must upgrade your mod with `ISCFeature.MODDED_ELEMENT_SETS`.
   */
  @Exported
  public getCollectiblesWithTag(
    itemConfigTag: ItemConfigTag,
  ): ReadonlySet<CollectibleType> {
    this.lazyInitTagToCollectibleTypesMap();

    const collectibleTypes = this.tagToCollectibleTypesMap.get(itemConfigTag);
    if (collectibleTypes === undefined) {
      error(
        `The item config tag of ${itemConfigTag} is not a valid value of the "ItemConfigTag" enum.`,
      );
    }

    return collectibleTypes;
  }

  /**
   * Returns a set containing every valid passive item that can be randomly granted to Eden as a
   * starting item.
   *
   * This function can only be called if at least one callback has been executed. This is because
   * not all collectibles will necessarily be present when a mod first loads (due to mod load
   * order).
   *
   * In order to use this function, you must upgrade your mod with `ISCFeature.MODDED_ELEMENT_SETS`.
   */
  @Exported
  public getEdenActiveCollectibles(): ReadonlySet<CollectibleType> {
    this.lazyInitEdenCollectibleTypesSet();
    return this.edenActiveCollectibleTypesSet;
  }

  /**
   * Returns a set containing every valid passive item that can be randomly granted to Eden as a
   * starting item.
   *
   * This function can only be called if at least one callback has been executed. This is because
   * not all collectibles will necessarily be present when a mod first loads (due to mod load
   * order).
   *
   * In order to use this function, you must upgrade your mod with `ISCFeature.MODDED_ELEMENT_SETS`.
   */
  @Exported
  public getEdenPassiveCollectibles(): ReadonlySet<CollectibleType> {
    this.lazyInitEdenCollectibleTypesSet();
    return this.edenPassiveCollectibleTypesSet;
  }

  /**
   * Returns a set of all of the collectibles that grant flight. This is derived from collectibles
   * that have `CacheFlag.FLYING` set in the "items.xml" file.
   *
   * Collectibles that only grant flight conditionally are manually pruned. Collectibles such as
   * Empty Vessel should be checked for via the `hasFlyingTemporaryEffect` function.
   *
   * This function can only be called if at least one callback has been executed. This is because
   * not all collectibles will necessarily be present when a mod first loads (due to mod load
   * order).
   *
   * In order to use this function, you must upgrade your mod with `ISCFeature.MODDED_ELEMENT_SETS`.
   *
   * @param includeConditionalItems Whether or not collectibles that only grant flight conditionally
   *                                should be included in the set (like Empty Vessel).
   */
  @Exported
  public getFlyingCollectibles(
    includeConditionalItems: boolean,
  ): ReadonlySet<CollectibleType> {
    this.lazyInitFlyingCollectibleTypesSet();

    return includeConditionalItems
      ? this.flyingCollectibleTypesSet
      : this.permanentFlyingCollectibleTypesSet;
  }

  /**
   * Returns a set of all of the trinkets that grant flight. (All trinkets that grant flight do so
   * conditionally, like Bat Wing and Azazel's Stump.)
   *
   * This function can only be called if at least one callback has been executed. This is because
   * not all trinkets will necessarily be present when a mod first loads (due to mod load order).
   *
   * In order to use this function, you must upgrade your mod with `ISCFeature.MODDED_ELEMENT_SETS`.
   */
  @Exported
  public getFlyingTrinkets(): ReadonlySet<TrinketType> {
    this.lazyInitFlyingTrinketTypesSet();

    return this.flyingTrinketTypesSet;
  }

  /**
   * Returns an array containing every modded card type in the game.
   *
   * Use this if you need to iterate over the cards in order. If you need to do O(1) lookups, then
   * use the `getModdedCardSet` helper function instead.
   *
   * This function can only be called if at least one callback has been executed. This is because
   * not all cards will necessarily be present when a mod first loads (due to mod load order).
   *
   * In order to use this function, you must upgrade your mod with `ISCFeature.MODDED_ELEMENT_SETS`.
   */
  @Exported
  public getModdedCardArray(): readonly CardType[] {
    this.lazyInitModdedCardTypes();
    return this.moddedCardTypesArray;
  }

  /**
   * Returns a set containing every modded card type in the game.
   *
   * Use this if you need to do O(1) lookups. If you need to iterate over the cards in order, then
   * use the `getModdedCardArray` helper function instead.
   *
   * This function can only be called if at least one callback has been executed. This is because
   * not all cards will necessarily be present when a mod first loads (due to mod load order).
   *
   * In order to use this function, you must upgrade your mod with `ISCFeature.MODDED_ELEMENT_SETS`.
   */
  @Exported
  public getModdedCardSet(): ReadonlySet<CardType> {
    this.lazyInitModdedCardTypes();
    return this.moddedCardTypesSet;
  }

  /**
   * Returns an array containing every modded collectible type in the game.
   *
   * Use this if you need to iterate over the collectibles in order. If you need to do O(1) lookups,
   * then use the `getModdedCollectibleSet` helper function instead.
   *
   * This function can only be called if at least one callback has been executed. This is because
   * not all collectibles will necessarily be present when a mod first loads (due to mod load
   * order).
   *
   * In order to use this function, you must upgrade your mod with `ISCFeature.MODDED_ELEMENT_SETS`.
   */
  @Exported
  public getModdedCollectibleArray(): readonly CollectibleType[] {
    this.lazyInitModdedCollectibleTypes();
    return this.moddedCollectibleTypesArray;
  }

  /**
   * Returns a set containing every modded collectible type in the game.
   *
   * Use this if you need to do O(1) lookups. If you need to iterate over the collectibles in order,
   * then use the `getModdedCollectibleArray` helper function instead.
   *
   * This function can only be called if at least one callback has been executed. This is because
   * not all collectibles will necessarily be present when a mod first loads (due to mod load
   * order).
   *
   * In order to use this function, you must upgrade your mod with `ISCFeature.MODDED_ELEMENT_SETS`.
   */
  @Exported
  public getModdedCollectibleSet(): ReadonlySet<CollectibleType> {
    this.lazyInitModdedCollectibleTypes();
    return this.moddedCollectibleTypesSet;
  }

  /**
   * Returns an array containing every modded trinket type in the game.
   *
   * Use this if you need to iterate over the trinkets in order. If you need to do O(1) lookups,
   * then use the `getModdedTrinketSet` helper function instead.
   *
   * This function can only be called if at least one callback has been executed. This is because
   * not all trinkets will necessarily be present when a mod first loads (due to mod load order).
   *
   * In order to use this function, you must upgrade your mod with `ISCFeature.MODDED_ELEMENT_SETS`.
   */
  @Exported
  public getModdedTrinketArray(): readonly TrinketType[] {
    this.lazyInitModdedTrinketTypes();
    return this.moddedTrinketTypesArray;
  }

  /**
   * Returns a set containing every modded trinket type in the game.
   *
   * Use this if you need to do O(1) lookups. If you need to iterate over the trinkets in order,
   * then use the `getModdedTrinketArray` helper function instead.
   *
   * This function can only be called if at least one callback has been executed. This is because
   * not all trinkets will necessarily be present when a mod first loads (due to mod load order).
   *
   * In order to use this function, you must upgrade your mod with `ISCFeature.MODDED_ELEMENT_SETS`.
   */
  @Exported
  public getModdedTrinketSet(): ReadonlySet<TrinketType> {
    this.lazyInitModdedTrinketTypes();
    return this.moddedTrinketTypesSet;
  }

  /**
   * Iterates over every item in the game and returns a map containing the number of each item that
   * the player has.
   *
   * Note that this will filter out non-real collectibles like Lilith's Incubus.
   *
   * In order to use this function, you must upgrade your mod with `ISCFeature.MODDED_ELEMENT_SETS`.
   */
  @Exported
  public getPlayerCollectibleMap(
    player: EntityPlayer,
  ): Map<CollectibleType, int> {
    const collectibleArray = this.getCollectibleArray();

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
   * not all collectibles will necessarily be present when a mod first loads (due to mod load
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
      this.getCollectiblesWithCacheFlag(cacheFlag);

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
   * Returns the number of items that a player has towards a particular transformation.
   *
   * In order to use this function, you must upgrade your mod with `ISCFeature.MODDED_ELEMENT_SETS`.
   */
  @Exported
  public getPlayerCollectiblesWithTag(
    player: EntityPlayer,
    itemConfigTag: ItemConfigTag,
  ): CollectibleType[] {
    const collectiblesWithTag = this.getCollectiblesWithTag(itemConfigTag);

    const playerCollectibles: CollectibleType[] = [];
    for (const collectibleType of getSortedSetValues(collectiblesWithTag)) {
      // We specify "true" as the second argument to filter out things like Lilith's Incubus.
      const numCollectibles = player.GetCollectibleNum(collectibleType, true);
      repeat(numCollectibles, () => {
        playerCollectibles.push(collectibleType);
      });
    }

    return playerCollectibles;
  }

  /**
   * Returns the number of items that a player has towards a particular transformation.
   *
   * In order to use this function, you must upgrade your mod with `ISCFeature.MODDED_ELEMENT_SETS`.
   */
  @Exported
  public getPlayerCollectiblesForTransformation(
    player: EntityPlayer,
    playerForm: PlayerForm,
  ): CollectibleType[] {
    const collectibleForTransformation =
      this.getCollectiblesForTransformation(playerForm);

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
   * Returns a map containing every trinket type that the player has that matches the provided
   * `CacheFlag`. The values of the map correspond to the multiplier for that trinket.
   *
   * This function can only be called if at least one callback has been executed. This is because
   * not all trinkets will necessarily be present when a mod first loads (due to mod load order).
   *
   * In order to use this function, you must upgrade your mod with `ISCFeature.MODDED_ELEMENT_SETS`.
   */
  @Exported
  public getPlayerTrinketsWithCacheFlag(
    player: EntityPlayer,
    cacheFlag: CacheFlag,
  ): Map<TrinketType, int> {
    const trinketsWithCacheFlag = this.getTrinketsWithCacheFlag(cacheFlag);

    const playerTrinkets = new Map<TrinketType, int>();
    for (const trinketType of trinketsWithCacheFlag) {
      const trinketMultiplier = player.GetTrinketMultiplier(trinketType);
      if (trinketMultiplier > 0) {
        playerTrinkets.set(trinketType, trinketMultiplier);
      }
    }

    return playerTrinkets;
  }

  /**
   * Has an equal chance of returning any card (e.g. Fool, Reverse Fool, Wild Card, etc.).
   *
   * This will not return:
   * - any runes
   * - any objects like Dice Shard
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
    return getRandomSetElement(this.cardSet, seedOrRNG, exceptions);
  }

  /**
   * Helper function to get a random card type that matches the provided `ItemConfigCardType`.
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
   * Has an equal chance of returning any rune (e.g. Rune of Hagalaz, Blank Rune, Black Rune, Soul
   * of Isaac, etc.). This will never return a Rune Shard.
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

  /**
   * Returns a random active collectible type that that is a valid starting item for Eden.
   *
   * This function can only be called if at least one callback has been executed. This is because
   * not all collectibles will necessarily be present when a mod first loads (due to mod load
   * order).
   *
   * In order to use this function, you must upgrade your mod with `ISCFeature.MODDED_ELEMENT_SETS`.
   *
   * @param seedOrRNG Optional. The `Seed` or `RNG` object to use. If an `RNG` object is provided,
   *                  the `RNG.Next` method will be called. Default is `getRandomSeed()`.
   * @param exceptions Optional. An array of runes to not select.
   */
  @Exported
  public getRandomEdenActiveCollectible(
    seedOrRNG: Seed | RNG = getRandomSeed(),
    exceptions: CollectibleType[] | readonly CollectibleType[] = [],
  ): CollectibleType {
    this.lazyInitEdenCollectibleTypesSet();
    return getRandomSetElement(
      this.edenPassiveCollectibleTypesSet,
      seedOrRNG,
      exceptions,
    );
  }

  /**
   * Returns a random passive collectible type that that is a valid starting item for Eden.
   *
   * This function can only be called if at least one callback has been executed. This is because
   * not all collectibles will necessarily be present when a mod first loads (due to mod load
   * order).
   *
   * In order to use this function, you must upgrade your mod with `ISCFeature.MODDED_ELEMENT_SETS`.
   *
   * @param seedOrRNG Optional. The `Seed` or `RNG` object to use. If an `RNG` object is provided,
   *                  the `RNG.Next` method will be called. Default is `getRandomSeed()`.
   * @param exceptions Optional. An array of runes to not select.
   */
  @Exported
  public getRandomEdenPassiveCollectible(
    seedOrRNG: Seed | RNG = getRandomSeed(),
    exceptions: CollectibleType[] | readonly CollectibleType[] = [],
  ): CollectibleType {
    this.lazyInitEdenCollectibleTypesSet();
    return getRandomSetElement(
      this.edenPassiveCollectibleTypesSet,
      seedOrRNG,
      exceptions,
    );
  }

  /**
   * Returns an array containing every modded trinket type in the game.
   *
   * Use this if you need to iterate over the trinkets in order. If you need to do O(1) lookups,
   * then use the `getModdedTrinketSet` helper function instead.
   *
   * This function can only be called if at least one callback has been executed. This is because
   * not all trinkets will necessarily be present when a mod first loads (due to mod load order).
   *
   * In order to use this function, you must upgrade your mod with `ISCFeature.MODDED_ELEMENT_SETS`.
   */
  @Exported
  public getTrinketArray(): readonly TrinketType[] {
    this.lazyInitModdedTrinketTypes();
    return this.allTrinketTypesArray;
  }

  /**
   * Returns a set containing every modded trinket type in the game.
   *
   * Use this if you need to do O(1) lookups. If you need to iterate over the trinkets in order,
   * then use the `getModdedTrinketArray` helper function instead.
   *
   * This function can only be called if at least one callback has been executed. This is because
   * not all trinkets will necessarily be present when a mod first loads (due to mod load order).
   *
   * In order to use this function, you must upgrade your mod with `ISCFeature.MODDED_ELEMENT_SETS`.
   */
  @Exported
  public getTrinketSet(): ReadonlySet<TrinketType> {
    this.lazyInitModdedTrinketTypes();
    return this.allTrinketTypesSet;
  }

  /**
   * Returns a set containing every trinket type with the given cache flag, including modded
   * trinkets.
   *
   * This function can only be called if at least one callback has been executed. This is because
   * not all trinkets will necessarily be present when a mod first loads (due to mod load order).
   *
   * In order to use this function, you must upgrade your mod with `ISCFeature.MODDED_ELEMENT_SETS`.
   */
  @Exported
  public getTrinketsWithCacheFlag(
    cacheFlag: CacheFlag,
  ): ReadonlySet<TrinketType> {
    this.lazyInitCacheFlagToTrinketTypesMap();

    const trinketsSet = this.cacheFlagToTrinketTypesMap.get(cacheFlag);
    if (trinketsSet === undefined) {
      return new ReadonlySet();
    }

    return trinketsSet;
  }

  /**
   * Returns an array containing every valid vanilla card type in the game.
   *
   * Use this if you need to iterate over the cards in order. If you need to do O(1) lookups, then
   * use the `getVanillaCardSet` helper function instead.
   *
   * In order to use this function, you must upgrade your mod with `ISCFeature.MODDED_ELEMENT_SETS`.
   */
  @Exported
  public getVanillaCardArray(): readonly CardType[] {
    this.lazyInitVanillaCardTypes();
    return this.vanillaCardTypesArray;
  }

  /**
   * Returns a set containing every valid vanilla card type in the game.
   *
   * Use this if you need to do O(1) lookups. If you need to iterate over the cards in order, then
   * use the `getVanillaCardArray` helper function instead.
   *
   * In order to use this function, you must upgrade your mod with `ISCFeature.MODDED_ELEMENT_SETS`.
   */
  @Exported
  public getVanillaCardSet(): ReadonlySet<CardType> {
    this.lazyInitVanillaCardTypes();
    return this.vanillaCardTypesSet;
  }

  /**
   * Returns an array containing every valid vanilla collectible type in the game.
   *
   * Use this if you need to iterate over the collectibles in order. If you need to do O(1) lookups,
   * then use the `getVanillaCollectibleSet` helper function instead.
   *
   * In order to use this function, you must upgrade your mod with `ISCFeature.MODDED_ELEMENT_SETS`.
   */
  @Exported
  public getVanillaCollectibleArray(): readonly CollectibleType[] {
    this.lazyInitVanillaCollectibleTypes();
    return this.vanillaCollectibleTypesArray;
  }

  /**
   * Returns a set containing every valid vanilla collectible type in the game.
   *
   * Use this if you need to do O(1) lookups. If you need to iterate over the collectibles in order,
   * then use the `getVanillaCollectibleArray` helper function instead.
   *
   * In order to use this function, you must upgrade your mod with `ISCFeature.MODDED_ELEMENT_SETS`.
   */
  @Exported
  public getVanillaCollectibleSet(): ReadonlySet<CollectibleType> {
    this.lazyInitVanillaCollectibleTypes();
    return this.vanillaCollectibleTypesSet;
  }

  /**
   * Returns an array containing every valid vanilla trinket type in the game.
   *
   * Use this if you need to iterate over the trinkets in order. If you need to do O(1) lookups,
   * then use the `getVanillaTrinketSet` helper function instead.
   *
   * In order to use this function, you must upgrade your mod with `ISCFeature.MODDED_ELEMENT_SETS`.
   */
  @Exported
  public getVanillaTrinketArray(): readonly TrinketType[] {
    this.lazyInitVanillaTrinketTypes();
    return this.vanillaTrinketTypesArray;
  }

  /**
   * Returns a set containing every valid vanilla trinket type in the game.
   *
   * Use this if you need to do O(1) lookups. If you need to iterate over the trinkets in order,
   * then use the `getVanillaTrinketArray` helper function instead.
   *
   * In order to use this function, you must upgrade your mod with `ISCFeature.MODDED_ELEMENT_SETS`.
   */
  @Exported
  public getVanillaTrinketSet(): ReadonlySet<TrinketType> {
    this.lazyInitVanillaTrinketTypes();
    return this.vanillaTrinketTypesSet;
  }
}
