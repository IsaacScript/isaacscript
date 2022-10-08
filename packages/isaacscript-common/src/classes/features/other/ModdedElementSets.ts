import {
  CacheFlag,
  CollectibleType,
  ItemConfigTag,
  PlayerForm,
  TrinketType,
} from "isaac-typescript-definitions";
import { itemConfig } from "../../../core/cachedClasses";
import { Exported } from "../../../decorators";
import { ISCFeature } from "../../../enums/ISCFeature";
import {
  collectibleHasCacheFlag,
  getVanillaCollectibleTypeRange,
  isActiveCollectible,
  isHiddenCollectible,
  isPassiveCollectible,
} from "../../../functions/collectibles";
import { collectibleHasTag } from "../../../functions/collectibleTag";
import { getEnumValues } from "../../../functions/enums";
import { getFlagName } from "../../../functions/flag";
import { getRandomSeed } from "../../../functions/rng";
import {
  copySet,
  deleteSetsFromSet,
  getRandomSetElement,
  getSortedSetValues,
} from "../../../functions/set";
import {
  getVanillaTrinketTypes,
  trinketHasCacheFlag,
} from "../../../functions/trinkets";
import { repeat } from "../../../functions/utils";
import { Feature } from "../../private/Feature";
import { ModdedElementDetection } from "./ModdedElementDetection";

const CONDITIONAL_FLYING_COLLECTIBLE_TYPES: readonly CollectibleType[] = [
  CollectibleType.BIBLE,
  CollectibleType.EMPTY_VESSEL,
  CollectibleType.ASTRAL_PROJECTION,
  CollectibleType.RECALL,
];

const TRANSFORMATION_TO_TAG_MAP: ReadonlyMap<PlayerForm, ItemConfigTag> =
  new Map([
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
 * This feature is automatically applied to every upgraded mod, so there is no need to explicitly
 * include it in the list of features.
 */
export class ModdedElementSets extends Feature {
  private allCollectibleTypesArray: CollectibleType[] = [];
  private allCollectibleTypesSet = new Set<CollectibleType>();

  private vanillaCollectibleTypesArray: CollectibleType[] = [];
  private vanillaCollectibleTypesSet = new Set<CollectibleType>();

  private moddedCollectibleTypesArray: CollectibleType[] = [];
  private moddedCollectibleTypesSet = new Set<CollectibleType>();

  private allTrinketTypesArray: TrinketType[] = [];
  private allTrinketTypesSet = new Set<TrinketType>();

  private vanillaTrinketTypesArray: TrinketType[] = [];
  private vanillaTrinketTypesSet = new Set<TrinketType>();

  private moddedTrinketTypesArray: TrinketType[] = [];
  private moddedTrinketTypesSet = new Set<TrinketType>();

  private tagToCollectibleTypesMap = new Map<
    ItemConfigTag,
    Set<CollectibleType>
  >();

  private cacheFlagToCollectibleTypesMap = new Map<
    CacheFlag,
    Set<CollectibleType>
  >();

  private cacheFlagToTrinketTypesMap = new Map<CacheFlag, Set<TrinketType>>();

  private flyingCollectibleTypesSet = new Set<CollectibleType>();
  private permanentFlyingCollectibleTypesSet = new Set<CollectibleType>();
  private flyingTrinketTypesSet = new Set<TrinketType>();

  private edenActiveCollectibleTypesSet = new Set<CollectibleType>();
  private edenPassiveCollectibleTypesSet = new Set<CollectibleType>();

  private moddedElementDetection: ModdedElementDetection;

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
      // Vanilla collectible types are not contiguous, so we must check every value.
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

    const vanillaTrinketTypes = getVanillaTrinketTypes();
    for (const trinketType of vanillaTrinketTypes) {
      // Vanilla trinket types are contiguous, but we check every value just in case.
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

  private lazyInitTagToCollectibleTypesMap() {
    if (this.tagToCollectibleTypesMap.size > 0) {
      return;
    }

    // The tag to collectible types map should be valid for every tag, so we initialize it with
    // empty sets.
    for (const itemConfigTag of getEnumValues(ItemConfigTag)) {
      this.tagToCollectibleTypesMap.set(itemConfigTag, new Set());
    }

    for (const collectibleType of this.getCollectibleArray()) {
      for (const itemConfigTag of getEnumValues(ItemConfigTag)) {
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

    for (const cacheFlag of getEnumValues(CacheFlag)) {
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

    for (const cacheFlag of getEnumValues(CacheFlag)) {
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
   */
  @Exported
  public getCollectiblesWithCacheFlag(
    cacheFlag: CacheFlag,
  ): ReadonlySet<CollectibleType> {
    this.lazyInitCacheFlagToCollectibleTypesMap();

    const collectiblesSet = this.cacheFlagToCollectibleTypesMap.get(cacheFlag);
    if (collectiblesSet === undefined) {
      return new Set();
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
   */
  @Exported
  public getEdenActiveCollectibles(): ReadonlySet<CollectibleType> {
    this.lazyInitEdenCollectibleTypesSet();
    return this.edenActiveCollectibleTypesSet;
  }

  /**
   * Returns a set containing every valid passive item that can be randomly granted to Eden as a
   * starting item.
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
   * @param pruneConditionalItems Whether or not collectibles that only grant flight conditionally
   *                              should be included in the set (like Empty Vessel).
   */
  @Exported
  public getFlyingCollectibles(
    pruneConditionalItems: boolean,
  ): ReadonlySet<CollectibleType> {
    this.lazyInitFlyingCollectibleTypesSet();

    return pruneConditionalItems
      ? this.permanentFlyingCollectibleTypesSet
      : this.flyingCollectibleTypesSet;
  }

  /**
   * Returns a set of all of the trinkets that grant flight. (All trinkets that grant flight do so
   * conditionally, like Bat Wing and Azazel's Stump.)
   */
  @Exported
  public getFlyingTrinkets(): ReadonlySet<TrinketType> {
    this.lazyInitFlyingTrinketTypesSet();

    return this.flyingTrinketTypesSet;
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
   */
  @Exported
  public getModdedCollectibleSet(): ReadonlySet<CollectibleType> {
    this.lazyInitModdedCollectibleTypes();
    return this.moddedCollectibleTypesSet;
  }

  /**
   * Returns an array containing every valid trinket type in the game, including modded trinkets.
   *
   * Use this if you need to iterate over the trinkets in order. If you need to do O(1) lookups,
   * then use the `getTrinketSet` helper function instead.
   *
   * This function can only be called if at least one callback has been executed. This is because
   * not all trinkets will necessarily be present when a mod first loads (due to mod load order).
   */
  @Exported
  public getModdedTrinketArray(): readonly TrinketType[] {
    this.lazyInitModdedTrinketTypes();
    return this.moddedTrinketTypesArray;
  }

  /**
   * Returns a set containing every valid trinket type in the game, including modded trinkets.
   *
   * Use this if you need to do O(1) lookups. If you need to iterate over the trinkets in order,
   * then use the `getTrinketArray` helper function instead.
   *
   * This function can only be called if at least one callback has been executed. This is because
   * not all trinkets will necessarily be present when a mod first loads (due to mod load order).
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

  /** Returns the number of items that a player has towards a particular transformation. */
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

  /** Returns the number of items that a player has towards a particular transformation. */
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
   */
  @Exported
  public getPlayerTrinketsWithCacheFlag(
    player: EntityPlayer,
    cacheFlag: CacheFlag,
  ): Map<TrinketType, int> {
    const trinketsWithCacheFlag = this.getTrinketsWithCacheFlag(cacheFlag);

    const playerTrinkets = new Map<TrinketType, int>();
    for (const trinketType of trinketsWithCacheFlag.values()) {
      const trinketMultiplier = player.GetTrinketMultiplier(trinketType);
      if (trinketMultiplier > 0) {
        playerTrinkets.set(trinketType, trinketMultiplier);
      }
    }

    return playerTrinkets;
  }

  /** Returns a random active collectible type that that is a valid starting item for Eden. */
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

  /** Returns a random passive collectible type that that is a valid starting item for Eden. */
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
   */
  @Exported
  public getTrinketsWithCacheFlag(
    cacheFlag: CacheFlag,
  ): ReadonlySet<TrinketType> {
    this.lazyInitCacheFlagToTrinketTypesMap();

    const trinketsSet = this.cacheFlagToTrinketTypesMap.get(cacheFlag);
    if (trinketsSet === undefined) {
      return new Set();
    }

    return trinketsSet;
  }

  /**
   * Returns an array containing every valid vanilla collectible type in the game.
   *
   * Use this if you need to iterate over the collectibles in order. If you need to do O(1) lookups,
   * then use the `getVanillaCollectibleSet` helper function instead.
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
   */
  @Exported
  public getVanillaTrinketSet(): ReadonlySet<TrinketType> {
    this.lazyInitVanillaTrinketTypes();
    return this.vanillaTrinketTypesSet;
  }
}
