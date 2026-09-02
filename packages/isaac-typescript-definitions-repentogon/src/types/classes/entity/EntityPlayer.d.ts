import type {
  ActiveSlot,
  BabySubType,
  CacheFlag,
  CardType,
  CollectibleType,
  ControllerIndex,
  DamageFlag,
  Direction,
  EntityGridCollisionClass,
  FamiliarVariant,
  ItemPoolType,
  NullItemID,
  PickupVariant,
  PillEffect,
  PlayerForm,
  PlayerType,
  PoopSpellType,
  SoundEffect,
  TrinketType,
  WeaponType,
} from "isaac-typescript-definitions";
import type { BagOfCraftingPickup } from "../../../enums/BagOfCraftingPickup";
import type { CambionPregnancyLevel } from "../../../enums/CambionPregnancyLevel";
import type { DeathAnimationName } from "../../../enums/DeathAnimationName";
import type { ConceptionFamiliarFlag } from "../../../enums/flags/ConceptionFamiliarFlag";
import type { WeaponModifierFlag } from "../../../enums/flags/WeaponModifierFlag";
import type { HealthType } from "../../../enums/HealthType";
import type { PillCardSlot } from "../../../enums/PillCardSlot";
import type { PlayerFoot } from "../../../enums/PlayerFoot";
import type { PocketItemType } from "../../../enums/PocketItemType";
import type { PurityState } from "../../../enums/PurityState";
import type { SuplexState } from "../../../enums/SuplexState";
import type { WeaponSlot } from "../../../enums/WeaponSlot";

declare global {
  interface EntityPlayer extends Entity {
    /**
     * Adds the specified amount of charges to one of the player's actives. Returns the true amount
     * of charges added, which may have been capped by the targeted item's max charges.
     *
     * @param charge
     * @param slot
     * @param flashHUD Optional. This parameter is redundant as the game will flash the HUD
     *                 regardless. Default is true.
     * @param overCharge Optional. Whether to allow leftover charges to overcharge the item. Default
     *                   is false.
     * @param force Optional. Default is false.
     */
    readonly AddActiveCharge: (
      charge: int,
      slot: ActiveSlot,
      flashHUD?: boolean,
      overCharge?: boolean,
      force?: boolean,
    ) => int;

    /** Adds a bone orbital to the player. */
    readonly AddBoneOrbital: (position: Vector) => void;

    /**
     * Repentogon's modified `EntityPlayer.AddCacheFlags` method.
     *
     * Behaves the same as `EntityPlayer.AddCacheFlags` except you can now choose to have it
     * immediately call `EntityPlayer.EvaluateItems` or not.
     *
     * This method has been renamed to include "Ex" so it can not conflict with the vanilla type
     * definitions. However, when the project compiles the method's name will change to what it's
     * supposed to be.
     *
     * @param flag
     * @param evaluateItems Optional. Default is false.
     * @customName AddCacheFlags
     */
    readonly AddCacheFlagsEx: (flag: CacheFlag, evaluateItems?: boolean) => void;

    /**
     * Adds a candy heart bonus to the player.
     *
     * @param cacheFlags Optional. Default is CacheFlagZero.
     * @param amount Optional. Default is 1.
     */
    readonly AddCandyHeartBonus: (
      cacheFlags?: BitFlags<CacheFlag>,
      amount?: int,
    ) => void;

    /**
     * Behaves the same as `EntityPlayer.CheckFamiliar` except it returns an array of all of the
     * familiars.
     *
     * @param collectibleType
     * @param charge Default is 0.
     * @param firstTimePickingUp Setting this to false will not spawn or add consumables for the
     *                           item and will not cause it to count towards transformations.
     *                           Default is true.
     * @param activeSlot Sets the active slot this collectible should be added to. Default is
     *                   `ActiveSlot.SLOT_PRIMARY`.
     * @param varData Sets the variable data for this collectible (this is used to store extra data
     *                for some active items like the number of uses for Jar of Wisps). Default is 0.
     * @param itemPoolType Optional. Default is `ItemPoolType.TREASURE`.
     */
    readonly AddCollectibleEx: (
      collectibleType: CollectibleType,
      charge?: int,
      firstTimePickingUp?: boolean,
      activeSlot?: ActiveSlot.PRIMARY | ActiveSlot.SECONDARY,
      varData?: int,
      itemPoolType?: ItemPoolType,
    ) => void;

    /**
     * Adds a collectible effect associated with the provided `collectibleType`.
     *
     * Collectible effects are not intended to be used as a fake or temporary copy of items. For
     * instance, every single active item grants a collectible effect on use and are often tied to
     * its effect. Therefore, collectible effects can be seen as more tied to an item's state, such
     * as:
     *
     * - The Holy Mantle tracking how many shield charges the player has.
     * - How most familiars are granted to the player.
     * - Activating the effects of Whore of Babylon and Crown of Light.
     *
     * This method is a shortcut to `TemporaryEffects.AddCollectibleEffect` with extra cooldown
     * arguments.
     *
     * @param collectibleType
     * @param applyCostume
     * @param cooldown Optional. Default is the cooldown as defined in `items.xml`.
     * @param additive Optional. If true, calling this method will increment the current cooldown.
     *                 Default is true.
     */
    readonly AddCollectibleEffect: (
      collectibleType: CollectibleType,
      applyCostume: boolean,
      cooldown?: int,
      additive?: boolean,
    ) => void;

    /**
     * Used to specify the custom stats that should be evaluated the next time the
     * `EntityPlayer.EvaluateCache` is run.
     *
     * Do not use this method for vanilla stats, instead use `EntityPlayer.AddCacheFlagsEx` or
     * `EntityPlayer.AddCacheFlags`.
     *
     * @param tags
     * @param evaluateItems Optional. Whether `EntityPlayer.EvaluateCache` should immediately run.
     *                      Default is false.
     */
    readonly AddCustomCacheTag: (
      tags: string | string[],
      evaluateItems?: boolean,
    ) => void;

    /**
     * Adds an innate collectible to the player. Innate collectibles grant the effects of a
     * collectible but the collectible itself is not added to the player's inventory, akin to an
     * item wisp. You can use `EntityPlayer.HasCollectibleEx` and `EntityPlayer.GetCollectibleNumEx`
     * when checking the player's collectibles to also see if they have it as an innate item.
     *
     * This method is currently bugged as it directly modifies the array returned by
     * `EntityPlayer.GetWispCollectiblesList`. Furthermore, added innate items are not saved when
     * exiting a run. You will need to keep track of the player's innate collectible count using
     * Isaacscript Common's Save Data Manager feature and the
     * `ModCallbackCustom.POST_GAME_STARTED_REORDERED` callback to reapply the innate collectibles.
     *
     * @param collectible
     * @param amount Optional. Default is 1.
     * @param evaluateItems Optional. Default is true.
     */
    readonly AddInnateCollectible: (
      collectible: CollectibleType,
      amount?: int,
      evaluateItems?: boolean,
    ) => void;

    /**
     * Adds a Leprosy orbital to the player. This is capped at a maximum of three Leprosy orbitals.
     * This is capped at a max of three familiars.
     */
    readonly AddLeprosy: () => void;

    /** Adds an item locust to the player. */
    readonly AddLocust: (collectible: CollectibleType, position: Vector) => void;

    /**
     * Adds a collectible effect associated with the provided `nullItemId`.
     *
     * Collectible effects are not intended to be used as a fake or temporary copy of items. For
     * instance, every single active item grants a collectible effect on use and are often tied to
     * its effect. Therefore, collectible effects can be seen as more tied to an item's state, such
     * as:
     *
     * - The Holy Mantle tracking how many shield charges the player has.
     * - How most familiars are granted to the player.
     * - Activating the effects of Whore of Babylon and Crown of Light.
     *
     * This method is a shortcut to `TemporaryEffects.AddNullEffect` with extra cooldown arguments.
     *
     * @param nullItemId
     * @param applyCostume
     * @param cooldown Optional. Default is the cooldown as defined in `items.xml`.
     * @param additive Optional. If true, calling this method will increment the current cooldown.
     *                 Default is true.
     */
    readonly AddNullItemEffect: (
      nullItemId: NullItemID,
      applyCostume: boolean,
      cooldown?: int,
      additive?: boolean,
    ) => void;

    /**
     * Adds a smelted trinket directly to the player's inventory.
     *
     * Returns whether the trinket was successfully added.
     *
     * @param trinket
     * @param firstTimePickingUp Optional. Default is true.
     */
    readonly AddSmeltedTrinket: (
      trinket: TrinketType,
      firstTimePickingUp?: boolean,
    ) => boolean;

    /**
     * @param cacheFlags Optional. Default is `CacheFlagZero`.
     * @param amount Optional. Default is 1.
     */
    readonly AddSoulLocketBonus: (
      cacheFlags?: CacheFlag | BitFlags<CacheFlag>,
      amount?: int,
    ) => void;

    /**
     * A shortcut of `TemporaryEffects.AddTrinketEffect` with extra cooldown arguments.
     *
     * @param trinket
     * @param showCostume
     * @param cooldown Optional. Default is the cooldown as defined in `items.xml`.
     * @param additive Optional. If true, calling this method will increment the current cooldown.
     *                 Default is true.
     */
    readonly AddTrinketEffect: (
      trinket: TrinketType,
      showCostume: boolean,
      cooldown?: int,
      additive?: boolean,
    ) => void;

    /**
     * Adds charges to the player's Urn of Souls if they are currently holding it. This is capped at
     * 20 souls.
     *
     * The game always keeps track of the amount of souls the player has, even if they do not have
     * the Urn of Souls in their inventory.
     */
    readonly AddUrnSouls: (count: number) => void;

    /**
     * Blocks the provided `collectibleType`.
     *
     * Blocked collectibles causes the game to think the player does not have the collectible, even
     * if it's in their inventory. However, collectible related callbacks such as
     * `ModCallbackRepentogon.POST_ADD_COLLECTIBLE` will still fire, even if the collectible is
     * blocked.
     *
     * **Example**
     *
     * ```ts
     * const player = Isaac.GetPlayer(0);
     * player.BlockCollectible(CollectibleType.SAD_ONION);
     *
     * print(player.HasCollectible(CollectibleType.SAD_ONION)); // false
     * print(player.GetCollectibleNum(CollectibleType.SAD_ONION)); // 0
     * print(player.IsCollectibleBlocked(CollectibleType.SAD_ONION)); // true
     *
     * player.UnblockCollectible(CollectibleType.SAD_ONION);
     * print(player.HasCollectible(CollectibleType.SAD_ONION)); // true
     * ```
     */
    readonly BlockCollectible: (collectibleType: CollectibleType) => void;

    /** Returns whether the collectible can be added to the player's inventory. */
    readonly CanAddCollectibleToInventory: (collectible: CollectibleType) => boolean;

    /**
     * Returns whether the player can crush rocks and similar grid entities on contact.
     *
     * This method only returns true if:
     *
     * - The player has Leo or Thunder Thighs in their inventory.
     * - The effects from The Nail or Mega Mush is active.
     * - The player has the Stompy transformation.
     */
    readonly CanCrushRocks: () => boolean;

    /** Returns whether the active item at the provided `slot` can be overridden. */
    readonly CanOverrideActiveItem: (slot: ActiveSlot) => boolean;

    /** Returns whether the player can use the provided `pillEffect`. */
    readonly CanUsePill: (pillEffect: PillEffect) => boolean;

    /**
     * Behaves the same as `EntityPlayer.CheckFamiliar` except it returns an array of all of the
     * spawned familiars.
     *
     * @param familiar
     * @param targetCount
     * @param rng
     * @param sourceItem Optional. Default is undefined.
     * @param familiarSubType Optional. Default is -1.
     */
    readonly CheckFamiliarEx: (
      familiar: FamiliarVariant,
      targetCount: int,
      rng: RNG,
      sourceItem?: ItemConfigItem,
      familiarSubType?: int,
    ) => EntityFamiliar[];

    /**
     * Stops the currently playing costume animation tied to the provided `collectible`.
     *
     * This method seems to only apply to costumes where they have multiple animations instead of a
     * single one (i.e Monstros Lung, Larynx, etc.).
     */
    readonly ClearCollectibleAnim: (collectible: CollectibleType) => void;

    /**
     * Repentogon's modified `EntityPlayer.ClearDeadEyeCharge` method.
     *
     * Behaves the same as `EntityPlayer.ClearDeadEyeCharge` except you can now forcefully reset the
     * charge.
     *
     * This method has been renamed to include "Ex" so it can not conflict with the vanilla type
     * definitions. However, when the project compiles the method's name will change to what it's
     * supposed to be.
     *
     * @param force Optional. Default is false.
     * @customName ClearDeadEyeCharge
     */
    readonly ClearDeadEyeChargeEx: (force?: boolean) => void;

    /**
     * Stops the currently playing costume animation tied to the provided `collectible`.
     *
     * This method seems to only apply to costumes where they have multiple animations instead of a
     * single one (i.e Monstros Lung, Larynx, etc.).
     */
    readonly ClearItemAnimCollectible: (collectible: CollectibleType) => void;

    /** Stops all playing costume animations tied to Null Items. */
    readonly ClearItemAnimNullItems: () => void;

    /**
     * Removes the player's queued item.
     *
     * When the player touches a collectible item, they are not granted it immediately. Instead, the
     * item is added to a queue for the duration of the animation where the player holds the item
     * above their head. When the animation is finished, the item(s) in the queue will be granted.
     * This method adds a new item to the item queue. If the player is not currently playing an
     * animation, then the queued item will simply be awarded instantly.
     */
    readonly ClearQueueItem: () => void;

    /** Creates an afterimage of the player that is used by items such as Suplex and A Pony. */
    readonly CreateAfterimage: (duration: int, position: Vector) => void;

    /**
     * Removes the collectible from the player's inventory and spawns a pedestal containing the
     * collectible.
     *
     * @param collectible
     * @param existingPedestal Optional. If defined, the collectible the pedestal contains will be
     *                         swapped out for the dropped collectible instead of a new pedestal
     *                         spawning. Default is undefined.
     * @param removeFromPlayerForm Optional. Default is false.
     */
    readonly DropCollectible: (
      collectible: CollectibleType,
      existingPedestal?: EntityPickupCollectible,
      removeFromPlayerForm?: boolean,
    ) => void;

    /**
     * Removes the collectible from the player's inventory based on the provided index and spawns a
     * a pedestal containing the collectible. If `existingPedestal` is defined, this method returns
     * an `EntityPickupCollectible`. Otherwise, this method returns undefined.
     *
     * @param index The history index starts at 0.
     * @param existingPedestal Optional. If defined, the collectible the pedestal contains will be
     *                         swapped out for the dropped collectible instead of a new pedestal
     *                         spawning. Default is undefined.
     */
    readonly DropCollectibleByHistoryIndex: (
      index: int,
      existingPedestal?: EntityPickupCollectible,
    ) => EntityPickupCollectible;

    /** Sets whether the provided `weaponType` is enabled. */
    readonly EnableWeaponType: (weaponType: WeaponType, set: boolean) => void;

    /**
     * Fires a Brimstone ball. If the player has Tech X, they will fire a laser as well, with the
     * brimstone ball being its parent. Returns the spawned Brimstone Ball.
     *
     * @param position
     * @param velocity
     * @param offset Optional. Default is `VectorZero`.
     */
    readonly FireBrimstoneBall: (
      position: Vector,
      velocity: Vector,
      offset?: Vector,
    ) => EntityEffect;

    /** Returns how many frames the player has been holding the drop trinket button. */
    readonly GetActionHoldDrop: () => int;

    /**
     * Returns an `ActiveItemDesc` corresponding to the provided `activeSlot`.
     *
     * @param activeSlot Optional. Default is `ActiveSlot.PRIMARY`.
     */
    readonly GetActiveItemDesc: (activeSlot?: ActiveSlot) => ActiveItemDesc;

    /**
     * Returns the `ActiveSlot` that the player has the provided `collectibleType` in. Returns -1 if
     * the player does not have the collectible in any slot.
     *
     * If the player has multiple copies of the collectible, this method only returns the slot with
     * the highest priority depending on its value, with `ActiveSlot.PRIMARY` being the highest and
     * `ActiveSlot.POCKET_SINGLE_USE` being the lowest. If you need to get all of the active slots,
     * use Isaacscript Common's `getActiveItemSlots` helper function instead.
     */
    readonly GetActiveItemSlot: (collectibleType: CollectibleType) => ActiveSlot | -1;

    /**
     * Returns the maximum amount of charges the collectible in the provided slot has. This does not
     * account for overcharging. Returns 0 if there is no collectible in the slot.
     */
    readonly GetActiveMaxCharge: (slot: ActiveSlot) => int;

    /**
     * Returns the minimum amount of charges the collectible in the provided slot needs in order for
     * it to be used. Returns 0 if there is no collectible in the slot.
     */
    readonly GetActiveMinUsableCharge: (slot: ActiveSlot) => int;

    /**
     * Returns how many times the player has attacked with their currently active weapon. The value
     * resets if the player's current weapon changes or they exit the run.
     *
     * Returns undefined if the player has no weapon.
     */
    readonly GetActiveWeaponNumFired: () => int | undefined;

    /** Returns an array containing the contents of the player's Bag of Crafting. */
    readonly GetBagOfCraftingContent: () => BagOfCraftingPickup[];

    /**
     * Returns the current output collectible in the player's Bag of Crafting. Returns
     * `CollectibleType.NULL` if there is no output collectible.
     */
    readonly GetBagOfCraftingOutput: () => CollectibleType;

    /** Returns the `ItemPoolType` corresponding to the Bag of Crafting's output. */
    readonly GetBagOfCraftingOutputItemPool: () => ItemPoolType;

    /** Returns the `BagOfCraftingPickup` in the player's Bag of Crafting at the provided index. */
    readonly GetBagOfCraftingSlot: (slot: int) => BagOfCraftingPickup;

    /**
     * Returns the current charge for when the player stops shooting and charges the Kidney Stone
     * collectible. This is normally capped at 90 but can be overridden through the
     * `EntityPlayer.SetBladderCharge` method.
     */
    readonly GetBladderCharge: () => int;

    /**
     * Returns how many times the player has taken damage in the current floor while having Bloody
     * Lust in their inventory.
     */
    readonly GetBloodLustCounter: () => int;

    /** Returns the direction the player's body is moving. */
    readonly GetBodyMoveDirection: () => Vector;

    /** Returns the number of frames until the player can place another bomb. */
    readonly GetBombPlaceDelay: () => int;

    /**
     * Returns how many times the player has taken damage while having Cambion Conception in their
     * inventory.
     */
    readonly GetCambionConceptionState: () => int;

    /** Returns the current visible state of Cambion Conception's costume. */
    readonly GetCambionPregnancyLevel: () => CambionPregnancyLevel;

    /**
     * Returns an object of every Candy Heart stat boost and how many times each has been applied to
     * the player.
     */
    readonly GetCandyHeartBonus: () => {
      Damage: int;
      FireDelay: int;
      Luck: int;
      MoveSpeed: int;
      ShotSpeed: int;
      TearRange: int;
    };

    readonly GetCharmOfTheVampireKills: () => int;

    /**
     * Returns a dictionary with the keys being a collectible and their value being how many of the
     * collectible the player has in their inventory. Innate collectibles are not counted.
     */
    readonly GetCollectiblesList: () => LuaTable<CollectibleType, int>;

    /**
     * Repentogon's modified `EntityPlayer.GetCollectibleNum` method.
     *
     * Behaves the same as `EntityPlayer.GetCollectibleNum` except you can now choose to have it
     * ignore innate items.
     *
     * This method has been renamed to include "Ex" so it can not conflict with the vanilla type
     * definitions. However, when the project compiles the method's name will change to what it's
     * supposed to be.
     *
     * @param collectibleType
     * @param onlyCountTrueItems If set to true, the function only counts collectibles that the
     *                           player actually owns and ignores things like Lilith's Incubus,
     *                           items granted by 3 Dollar Bill, and so forth.
     * @param ignoreInnate Optional. If true, this method will not check the player's innate
     *                     collectibles. Default is false.
     * @customName GetCollectibleNum
     */
    readonly GetCollectibleNumEx: (
      collectibleType: CollectibleType,
      onlyCountTrueItems?: boolean,
      ignoreInnate?: boolean,
    ) => int;

    /**
     * Returns a bitmask corresponding to which familiars have been spawned by Cambion Conception or
     * Immaculate Conception.
     */
    readonly GetConceptionFamiliarFlags: () => BitFlags<ConceptionFamiliarFlag>;

    /**
     * Returns an array of the layer data of all of the player's costumes.
     *
     * Due to the differences in the starting index of arrays between Lua and C++, you need to
     * decrease iterator index by one and increase the `costumeIndex` by one in order to get
     * accurate information.
     *
     * **Example**
     *
     * ```ts
     * const player = Isaac.GetPlayer();
     * const costumeMap = player.GetCostumeLayerMap();
     *
     * print("-------------------------------------------------------------------");
     *
     * const costumeSpriteDescs = player.GetCostumeSpriteDescs();
     *
     * for (const [costumeLayer, mapData] of costumeMap.entries()) {
     *   if (mapData.costumeIndex == -1) {
     *     continue;
     *   }
     *
     *   const desc = costumeSpriteDescs[costumeLayer + 1];
     *
     *   if (desc === undefined) {
     *     continue;
     *   }
     *
     *   const sprite = desc.GetSprite();
     *   const itemConfig = desc.GetItemConfig();
     *   const spriteLayer = sprite.GetLayer(mapData.layerID);
     *
     *   // `Isaac.GetString` lets you get an item's localized name, so we need to explicitly typecast it.
     *   const itemName = itemConfig.Name as LanguageAbbreviation;
     *
     *   if (spriteLayer === undefined) {
     *     continue;
     *   }
     *
     *   const layerName = spriteLayer.GetName();
     *   const costumeName =
     *     itemConfig.Name != ""
     *       ? Isaac.GetString("Items", itemName)
     *       : `NullItemID${itemConfig.ID}`;
     *
     *   const spritePath = sprite.GetFilename();
     *   print(`${costumeLayer - 1} - ${layerName} - ${costumeName} - ${spritePath}`);
     * }
     * ```
     */
    readonly GetCostumeLayerMap: () => Array<{
      costumeIndex: int;
      layerID: int;
      priority: int;
      isBodyLayer: boolean;
    }>;

    /** Returns an array of all of the player's `CostumeSpriteDesc`. */
    readonly GetCostumeSpriteDescs: () => CostumeSpriteDesc[];

    /**
     * Returns the value corresponding to the custom cache tag. Returns 0 if the value does not
     * exist.
     */
    readonly GetCustomCacheValue: (customCacheTag: string) => number;

    /** Returns the damage modifier used by the D8. */
    readonly GetD8DamageModifier: () => number;

    /** Returns the fire delay modifier used by the D8. */
    readonly GetD8FireDelayModifier: () => number;

    /** Returns the range modifier used by the D8. */
    readonly GetD8RangeModifier: () => number;

    /** Returns the speed modifier used by the D8. */
    readonly GetD8SpeedModifier: () => number;

    /**
     * Returns the player's current damage modifier. The damage modifier is either set through
     * Experimental Treatment or `EntityPlayer.SetDamageModifier`.
     */
    readonly GetDamageModifier: () => number;

    /** Returns the current charge of Dead Eye. */
    readonly GetDeadEyeCharge: () => int;

    /** Returns the name of the player's death animation. */
    readonly GetDeathAnimName: () => DeathAnimationName;

    /** Returns the offset of the player's damage stat for Eden's random stats. */
    readonly GetEdenDamage: () => number;

    /** Returns the offset of the player's fire delay stat for Eden's random stats. */
    readonly GetEdenFireDelay: () => number;

    /** Returns the offset of the player's luck stat for Eden's random stats. */
    readonly GetEdenLuck: () => number;

    /** Returns the offset of the player's range stat for Eden's random stats. */
    readonly GetEdenRange: () => number;

    /** Returns the offset of the player's shot speed stat for Eden's random stats. */
    readonly GetEdenShotSpeed: () => number;

    /** Returns the offset of the player's speed stat for Eden's random states. */
    readonly GetEdenSpeed: () => number;

    readonly GetEnterPosition: () => Vector;

    /** Returns the player's `EntityConfigPlayer`. */
    readonly GetEntityConfigPlayer: () => EntityConfigPlayer;

    /**
     * Returns how many frames the player has been firing in one direction with Epiphora in their
     * inventory. The charge stops increasing when the player's fire rate can no longer increase
     * from the effect.
     */
    readonly GetEpiphoraCharge: () => int;

    /** Returns how many frames Tainted Eve's innate Sumptorium has been charging. */
    readonly GetEveSumptoriumCharge: () => int;

    /**
     * Returns the player's current fire delay modifier. The fire delay modifier is either set
     * through Experimental Treatment or `EntityPlayer.SetFireDelayModifier`.
     */
    readonly GetFireDelayModifier: () => int;

    /**
     * Returns the player's flipped form. Returns undefined if the player does not have a flipped
     * form.
     *
     * This is only used by Tainted Lazarus.
     */
    readonly GetFlippedForm: () => EntityPlayer | undefined;

    /**
     * Returns the entity used by Active Camera to determine where the camera should focus. This can
     * either be the Marked target `EntityEffect` or a weapon's entity. Returns undefined if no
     * entity exists.
     */
    readonly GetFocusEntity: () => Entity | undefined;

    /** Returns the color of the player's footprint. */
    readonly GetFootprintColor: (useLeftFootprint: boolean) => KColor;

    /**
     * Returns how many frames until the player can switch between the Skeleton/Soul form as the
     * Forgotten.
     */
    readonly GetForgottenSwapFormCooldown: () => int;

    /**
     * Returns the EntityDesc corresponding to the enemy the player last captured using Friendly
     * Ball.
     */
    readonly GetFriendBallEnemy: () => EntityDesc;

    /** Returns the SubType of the glitched baby. */
    readonly GetGlitchBabySubType: () => BabySubType;

    /**
     * Returns an array containing what pickup Glyph of Balance will drop upon the room being
     * cleared.
     *
     * @param variant Optional. Default is -1.
     * @param subType Optional. Default is -1.
     */
    readonly GetGlyphOfBalanceDrop: (
      variant?: PickupVariant,
      subType?: int,
    ) => [PickupVariant, int];

    /**
     * Returns how many frames the player has been holding still with Gnawed Leaf in their
     * inventory.
     */
    readonly GetGnawedLeafTimer: () => int;

    /** Returns the amount of heart containers the player has that were given by Greed's Gullet. */
    readonly GetGreedsGulletHearts: () => int;

    /**
     * Returns the amount of frames until the player loses their stat boost from the aura used by
     * Hallowed Ground and Star of Bethlehem. The countdown decreases when they leave the aura.
     */
    readonly GetHallowedGroundCountdown: () => int;

    /**
     * Returns the number of frames the player's head was forced to stay in a specific direction.
     * Returns -1 or lower if the direction is not locked.
     */
    readonly GetHeadDirectionLockTime: () => int;

    /** Returns the player's health type. */
    readonly GetHealthType: () => HealthType;

    /**
     * Returns the entity the player is holding over their head. Returns undefined if no entity is
     * being held.
     */
    readonly GetHeldEntity: () => Entity | undefined;

    /**
     * Returns the `Sprite` used for when the player is doing an animation that involves holding a
     * sprite over their head, such as active item usage.
     */
    readonly GetHeldSprite: () => Sprite;

    /**
     * Returns the player's `History`. This is used to keep track of the collectibles the player has
     * gotten throughout the run.
     */
    readonly GetHistory: () => History;

    /**
     * Returns how many hearts have been collected with Immaculate Conception in the player's
     * inventory.
     */
    readonly GetImmaculateConceptionState: () => int;

    /** Returns the number of coins spent while possessing Keeper's Sack. */
    readonly GetKeepersSackBonus: () => int;

    /** Returns the player's laser color. */
    readonly GetLaserColor: () => Color;

    /**
     * Returns the player's current luck modifier. The luck modifier is either set through
     * Experimental Treatment or `EntityPlayer.SetLuckModifier`.
     */
    readonly GetLuckModifier: () => number;

    /**
     * Returns how many frames are left until one of Tainted Magdalene's temporary hearts is
     * drained.
     */
    readonly GetMaggyHealthDrainCooldown: () => int;

    /**
     * Returns how many frames are left until Tainted Magdalene's swing attack can be used again.
     * Returns 0 if the player is not Tainted Magdalene.
     */
    readonly GetMaggySwingCooldown: () => int;

    /** Returns the Marked target effect, if it exists. Otherwise, returns undefined. */
    readonly GetMarkedTarget: () => EntityEffect | undefined;

    /**
     * Returns the maximum amount of charge until the player stops shooting and charges the Kidney
     * Stone collectible.
     */
    readonly GetMaxBladderCharge: () => int;

    /** Returns the maximum amount of bombs the player can have. */
    readonly GetMaxBombs: () => int;

    /** Returns the maximum amount of coins the player can have. */
    readonly GetMaxCoins: () => int;

    /** Returns the maximum amount of keys the player can have. */
    readonly GetMaxKeys: () => int;

    /** Returns the maximum duration of the Kidney Stone collectible. */
    readonly GetMaxPeeBurstCooldown: () => int;

    /** Returns the maximum amount of pocket items. */
    readonly GetMaxPocketItems: () => int;

    /** Returns how many frames until the effects of Mega Blast stop. */
    readonly GetMegaBlastDuration: () => int;

    /** Returns the `CollectibleType` of the last collectible given by Metronome. */
    readonly GetMetronomeCollectibleID: () => CollectibleType;

    /**
     * Returns the `EntitiesSaveStateVector` corresponding to the pickups the player has stored
     * using the Moving Box collectible.
     */
    readonly GetMovingBoxContents: () => EntitiesSaveStateVector;

    /** Returns the `MultiShotParams` of the provided `weaponType`. */
    readonly GetMultiShotParams: (weaponType: WeaponType) => MultiShotParams;

    readonly GetMultiShotPositionVelocity: (
      loopIndex: int,
      weaponType: WeaponType,
      shotDirection: Vector,
      shotSpeed: number,
      params: MultiShotParams,
    ) => PosVel;

    /**
     * Returns the frame at which the player stops shooting and starts charging the Kidney Stone
     * collectible.
     */
    readonly GetNextUrethraBlockFrame: () => int;

    /** Returns the attack duration of the Kidney Stone item. */
    readonly GetPeeBurstCooldown: () => int;

    /** Returns the amount of collectibles the player has tied to the specified transformation. */
    readonly GetPlayerFormCounter: (playerFormID: PlayerForm) => void;

    readonly GetPlayerHUD: () => PlayerHUD | undefined;

    /**
     * Returns the player's index.
     *
     * This method should not be confused with Isaacscript Common's `getPlayerIndex` helper
     * function. If you need to store any data pertaining to a player, use `getPlayerIndex` over
     * this.
     */
    readonly GetPlayerIndex: () => int;

    /** Returns the `PocketItem` from the provided `slotId`. */
    readonly GetPocketItem: (slotId: PillCardSlot) => PocketItem;

    /**
     * Returns the amount of frames left until the charging effect from the A Pony or White Pony
     * item deactivates.
     */
    readonly GetPonyCharge: () => int;

    /**
     * Returns the state in which the Purity item effect currently is. Returns `PurityState.BLUE` if
     * the player does not have the Purity collectible.
     */
    readonly GetPurityState: () => PurityState;

    /** Returns the frames left until the damage bonus from Red Stew expires. */
    readonly GetRedStewBonusDuration: () => int;

    readonly GetRevelationCharge: () => int;

    readonly GetRockBottomDamage: () => number;
    readonly GetRockBottomLuck: () => number;
    readonly GetRockBottomMaxFireDelay: () => number;
    readonly GetRockBottomMoveSpeed: () => number;
    readonly GetRockBottomShotSpeed: () => number;
    readonly GetRockBottomTearRange: () => number;

    /**
     * Returns the player's current shot speed modifier. The shot speed modifier is either set
     * through Experimental Treatment or `EntityPlayer.SetShotSpeedModifier`.
     */
    readonly GetShotSpeedModifier: () => number;

    /**
     * Returns a table with the keys being the `TrinketType` and the value being being a table with
     * the corresponding amount of smelted trinkets.
     */
    readonly GetSmeltedTrinkets: () => LuaTable<
      TrinketType,
      { trinketAmount: int; goldenTrinketAmount: int }
    >;

    readonly GetSmeltedTrinketDesc: (trinket: TrinketType) => {
      trinketAmount: int;
      goldenTrinketAmount: int;
    };

    readonly GetSoulLocketBonus: () => {
      Damage: int;
      FireDelay: int;
      TearRange: int;
      ShotSpeed: int;
      MoveSpeed: int;
      Luck: int;
    };

    /** @param position Optional. Default is the player's position. */
    readonly GetSpecialGridCollision: (position?: Vector) => EntityGridCollisionClass;

    /**
     * Returns the player's current speed modifier. The speed modifier is either set through
     * Experimental Treatment or `EntityPlayer.SetSpeedModifier`.
     */
    readonly GetSpeedModifier: () => number;

    /** Returns an array containing information of all of the player's innate collectibles. */
    readonly GetSpoofedCollectiblesList: () => Array<{
      CollectibleID: CollectibleType;
      AppendedCount: int;
      IsBlocked: boolean;
    }>;

    readonly GetStatMultiplier: () => number;
    readonly GetSuplexAimCountdown: () => int;
    readonly GetSuplexLandPosition: () => Vector;
    readonly GetSuplexState: () => SuplexState;
    readonly GetSuplexTargetPosition: () => Vector;

    /**
     * Returns the player's tear displacement. The displacement corresponds to the eye the tear is
     * being fired from, with 1 being the right eye and -1 being the left eye.
     */
    readonly GetTearDisplacement: () => number;

    readonly GetTearsCap: () => number;

    /**
     * Returns the amount of charges the collectible in the provided slot has. Returns 0 if there is
     * no collectible in the slot.
     */
    readonly GetTotalActiveCharge: (slot: ActiveSlot) => int;

    /** Returns the amount charges the player has for the Urn of Souls item. */
    readonly GetUrnSouls: () => int;

    /** Returns an array of all active items that were consumed by the Void item. */
    readonly GetVoidedCollectiblesList: () => CollectibleType[];

    /** Returns a Weapon from the provided slot. Returns undefined if no weapon is in the slot. */
    readonly GetWeapon: (slot: WeaponSlot) => Weapon | undefined;

    /** Returns a bitmask of the player's weapon modifiers. */
    readonly GetWeaponModifiers: () => BitFlags<WeaponModifierFlag>;

    /**
     * Returns the item that was used by the player and would be activated again upon using Wild
     * Card.
     *
     * If the player used an active item, its `CollectibleType` is returned. If the player used a
     * consumable, its sub type is returned. If the player used the Question Mark card, 1 is
     * returned. Otherwise, 0 is returned.
     */
    readonly GetWildCardItem: () => CollectibleType | CardType | PillEffect;

    /**
     * Returns the type of item that was last used by the player and would be used again upon using
     * Wild Card. Returns 255 if no item has been used.
     */
    readonly GetWildCardItemType: () => PocketItemType | 255;

    /**
     * Returns a dictionary of the Lemegeton wisps the player has, with the keys being the
     * `CollectibleType` and the value being the corresponding amount.
     */
    readonly GetWispCollectiblesList: () => LuaMap<CollectibleType, int>;

    readonly HasCamoEffect: () => boolean;

    /**
     * Repentogon's modified `EntityPlayer.HasCollectible` method.
     *
     * Behaves the same as `EntityPlayer.HasCollectible` except you can now choose to have it ignore
     * innate items.
     *
     * This method has been renamed to include "Ex" so it can not conflict with the vanilla type
     * definitions. However, when the project compiles the method's name will change to what it's
     * supposed to be.
     *
     * @param collectibleType
     * @param ignoreModifiers If set to true, only counts collectibles the player actually owns and
     *                        ignores effects granted by items like Zodiac, 3 Dollar Bill and
     *                        Lemegeton. Default is false.
     * @param ignoreInnate Optional. If true, the method will not check the player's innate
     *                     collectibles. Default is false.
     * @customName HasCollectible
     */
    readonly HasCollectibleEx: (
      collectibleType: CollectibleType,
      ignoreModifiers?: boolean,
      ignoreInnate?: boolean,
    ) => boolean;

    /**
     * Returns whether the player has a question mark as their extra life count indicating a %
     * chance to revive (i.e. Guppy's Collar).
     */
    readonly HasChanceRevive: () => boolean;

    readonly HasForcedCamoEffect: () => boolean;

    /** Returns whether the player has the golden variant of the provided trinket. */
    readonly HasGoldenTrinket: (trinket: TrinketType) => boolean;

    /**
     * Returns whether the player is in the Lost form triggered by either the white fire in
     * Downpour, using Soul of The Lost, or touching Dark Esau if the player is playing as Tainted
     * Jacob.
     */
    readonly HasInstantDeathCurse: () => boolean;

    /**
     * Behaves the same as `EntityPlayer.HasInvincibility` except it now allows for passing an
     * EntityRef parameter.
     *
     * @param damageFlag Optional. Default is 0.
     * @param source Optional. Default is undefined.
     * @customName HasInvincibility
     */
    readonly HasInvincibilityEx: (
      damageFlag?: BitFlags<DamageFlag>,
      source?: EntityRef,
    ) => boolean;

    /** Returns whether the player is immune to poison. */
    readonly HasPoisonImmunity: () => boolean;

    /** Increments the counter towards a transformation. */
    readonly IncrementPlayerFormCounter: (form: PlayerForm, count: int) => void;

    /**
     * Initializes the "special" tear or weapon type for characters like Forgotten, Lilith, and
     * Azazel.
     *
     * This method should be called after spawning a player using `EntityPlayer.InitTwin`, otherwise
     * their special tear/weapon may not be initialized properly.
     */
    readonly InitPostLevelInitStats: () => void;

    /**
     * Initializes a new player that is controlled by the player's controller.
     *
     * This method is currently bugged as the spawned twin will desyncs upon exiting a run and
     * continuing it. This results in the game prompting the player for a controller, resulting in a
     * soft lock.
     *
     * This method is intended to only work on vanilla characters as this method is hardcoded, as
     * confirmed by _Kilburn.
     */
    readonly InitTwin: (playerType: PlayerType) => EntityPlayer;

    /** Returns whether the animation associated with the collectible is visible. */
    readonly IsCollectibleAnimFinished: (
      collectible: CollectibleType,
      animation: string,
    ) => boolean;

    /**
     * Returns whether the player has blocked the collectible.
     *
     * Blocked collectibles causes the game to think the player does not have the collectible, even
     * if it's in their inventory. However, collectible related callbacks such as
     * `ModCallbackRepentogon.POST_ADD_COLLECTIBLE` will still fire, even if the collectible is
     * blocked.
     *
     * **Example**
     *
     * ```ts
     * const player = Isaac.GetPlayer(0);
     * player.BlockCollectible(CollectibleType.SAD_ONION);
     *
     * print(player.HasCollectible(CollectibleType.SAD_ONION)); // false
     * print(player.GetCollectibleNum(CollectibleType.SAD_ONION)); // 0
     * print(player.IsCollectibleBlocked(CollectibleType.SAD_ONION)); // true
     *
     * player.UnblockCollectible(CollectibleType.SAD_ONION);
     * print(player.HasCollectible(CollectibleType.SAD_ONION)); // true
     * ```
     */
    readonly IsCollectibleBlocked: (collectible: CollectibleType) => boolean;

    /** Returns whether the costume associated with the collectible is visible. */
    readonly IsCollectibleCostumeVisible: (
      collectible: CollectibleType,
      playerSpriteLayerIDOrName: int | string,
    ) => boolean;

    readonly IsEntityValidTarget: (entity: Entity) => boolean;

    /**
     * Returns whether the provided foot has touched the ground for the current animation frame if
     * the player is walking.
     *
     * @param foot Optional. Default is `PlayerFoot.RIGHT`.
     */
    readonly IsFootstepFrame: (foot?: PlayerFoot) => boolean;

    /**
     * Returns whether the player is headless due to collectibles such as Guillotine and Scissors.
     */
    readonly IsHeadless: () => boolean;

    /** Returns whether the player is the non-active form of Tainted Lazarus with Birthright. */
    readonly IsHologram: () => boolean;

    /** Returns whether the invisibility effect of Faded Polaroid/Camo Undies is active. */
    readonly IsInvisible: () => boolean;

    /** Returns whether the costume associated with the `ItemConfigItem` is visible. */
    readonly IsItemCostumeVisible: (
      item: ItemConfigItem,
      playerSpriteLayerIDOrName: int | string,
    ) => boolean;

    /** Returns whether the player is a local player on the machine. */
    readonly IsLocalPlayer: () => boolean;

    /** Returns whether the costume associated with the null item is visible. */
    readonly IsNullItemCostumeVisible: (
      nullItem: NullItemID,
      playerSpriteLayerIDOrName: int | string,
    ) => boolean;

    readonly IsPacifist: () => boolean;
    readonly IsPostLevelInitFinished: () => boolean;

    /** Returns whether the player can no longer shoot due to charging the Kidney Stone item. */
    readonly IsUrethraBlocked: () => boolean;

    /** Turns the player into a co-op ghost. */
    readonly MorphToCoopGhost: () => void;

    /**
     * Plays an animation tied to the provided collectible.
     *
     * @param collectible
     * @param checkBodyLayers
     * @param animationName
     * @param frame Optional. Default is -1.
     */
    readonly PlayCollectibleAnim: (
      collectible: CollectibleType,
      checkBodyLayers: boolean,
      animationName: string,
      frame?: int,
    ) => void;

    /**
     * Plays a sound effect from the player after a delay.
     *
     * @param soundEffect
     * @param soundDelay Optional. How many frames before the sound plays. Default is 0.
     * @param frameDelay Optional. Default is 2.
     * @param volume Optional. Default is 1.
     */
    readonly PlayDelayedSFX: (
      soundEffect: SoundEffect,
      soundDelay?: int,
      frameDelay?: int,
      volume?: number,
    ) => void;

    readonly RemoveCollectibleByHistoryIndex: (index: int) => void;

    /** Removes the pocket item from the provided slot. */
    readonly RemovePocketItem: (slot: PillCardSlot) => void;

    /**
     * Removes the poop spell from the provided queue position. All spells are shifted to fill the
     * space a new spell is added to fill the last position.
     *
     * Poop spells are only used by Tainted Blue Baby.
     *
     * @param queuePosition Optional. Default is 0.
     */
    readonly RemovePoopSpell: (queuePosition?: int) => void;

    /** Rerolls all of the player's collectibles. */
    readonly RerollAllCollectibles: (rng: RNG, includeActiveItems: boolean) => void;

    // ResetPlayer is bugged and currently does nothing.

    /**
     * Revives the player with half a heart if they are a co-op ghost. Returns whether they were
     * successfully revived.
     */
    readonly ReviveCoopGhost: () => boolean;

    /**
     * Spawns a series of pickups the same way Tainted Cain does upon picking up a collectible.
     *
     * @param collectibleType
     * @param position Optional. Default is the player's position.
     * @param rng Optional. Default is the player's drop RNG.
     * @param itemPoolType Optional. Default is `ItemPoolType.NULL`.
     */
    readonly SalvageCollectible: (
      collectibleType: CollectibleType,
      position?: Vector,
      rng?: RNG,
      itemPoolType?: ItemPoolType,
    ) => void;

    /**
     * Spawns a series of pickups the same way Tainted Cain does upon picking up a collectible. The
     * salvaged pickup is removed.
     *
     * The original name of this method was "SalvageCollectible". However, due to TypeScript's poor
     * support with method overloads in interfaces, this overload was renamed to `SalvagePickup`.
     * When the mod is compiled, all references to `SalvagePickup` are renamed to
     * `SalvageCollectible`.
     *
     * @param pickup
     * @param rng Optional. Default is the pickup's drop RNG.
     * @param itemPoolType Optional. Default is `ItemPoolType.NULL`.
     * @customName SalvageCollectible
     */
    readonly SalvagePickup: (
      pickup: EntityPickup,
      rng?: RNG,
      itemPoolType?: ItemPoolType,
    ) => void;

    /** Sets how many frames the player has been holding the drop trinket button. */
    readonly SetActionHoldDrop: (frames: int) => void;

    /** Sets the `VarData` of the collectible at the provided active slot. */
    readonly SetActiveVarData: (varData: int, slot: ActiveSlot) => void;

    readonly SetBabySkin: (skin: BabySubType) => void;

    /** Sets the contents of the player's Bag of Crafting. */
    readonly SetBagOfCraftingContent: (content: readonly BagOfCraftingPickup[]) => void;

    /** Sets the output of the player's Bag of Crafting to the provided collectible. */
    readonly SetBagOfCraftingOutput: (output: CollectibleType) => void;

    /** Sets the provided slot in the player's Bag of Crafting to the provided pickup. */
    readonly SetBagOfCraftingSlot: (
      slotID: int,
      bagOfCraftingPickup: BagOfCraftingPickup,
    ) => void;

    readonly SetBlackHeart: (blackHearts: int) => void;

    /**
     * Sets the player's Bladder Charge. This is used by Kidney Stone.
     *
     * This method is bugged as calling it without having Kidney Stone in the player's inventory
     * causes their head to turn pitch black.
     */
    readonly SetBladderCharge: (charge: int) => void;

    /**
     * Sets how many times the player has hit with Bloody Lust in their inventory. Bloody Lust's
     * color and damage cap is respected.
     *
     * This method does not change the player's damage and color stat immediately. You will need to
     * add the appropriate cache flags and call `EntityPlayer.EvaluateItems` if you wish to
     * immediately change them.
     */
    readonly SetBloodLustCounter: (counter: int) => void;

    /** Sets how many frames until the player can place another bomb. */
    readonly SetBombPlaceDelay: (delay: int) => void;

    /**
     * Sets how much damage the player has taken with Cambion Conception in their inventory.
     *
     * This does not spawn the familiar even if it's set to a value where the player gives birth.
     * The birth is only triggered once the player takes damage.
     */
    readonly SetCambionConceptionState: (state: int) => void;

    /** Sets whether the player can shoot. */
    readonly SetCanShoot: (canShoot: boolean) => void;

    /**
     * Sets which familiars were spawned by Cambion/Immaculate Conception. The familiars only spawn
     * when the familiars cache is evaluated and the player has one of the two collectibles in their
     * inventory.
     */
    readonly SetCambionFamiliarFlags: (
      flags: BitFlags<ConceptionFamiliarFlag> | ConceptionFamiliarFlag,
    ) => void;

    /** Sets how many kills the player got with Charm of the Vampire. */
    readonly SetCharmOfTheVampireKills: (kills: int) => void;

    /** Sets the player's controller index. */
    readonly SetControllerIndex: (index: ControllerIndex) => void;

    readonly SetD8DamageModifier: (modifier: number) => void;
    readonly SetD8FireDelayModifier: (modifier: number) => void;
    readonly SetD8RangeModifier: (modifier: number) => void;
    readonly SetD8SpeedModifier: (modifier: number) => void;

    /** Sets the player's current damage modifier used by Experimental Treatment. */
    readonly SetDamageModifier: (modifier: number) => void;

    /**
     * Sets the offset of the player's damage stat for Eden's random stats. Has no effect if the
     * player isn't Eden or Tainted Eden.
     */
    readonly SetEdenDamage: (damage: number) => void;

    /**
     * Sets the offset of the player's fire delay stat for Eden's random stats. Has no effect if the
     * player isn't Eden or Tainted Eden.
     */
    readonly SetEdenFireDelay: (fireDelay: number) => void;

    /**
     * Sets the offset of the player's luck stat for Eden's random stats. Has no effect if the
     * player isn't Eden or Tainted Eden.
     */
    readonly SetEdenLuck: (luck: number) => void;

    /**
     * Sets the offset of the player's range stat for Eden's random stats. Has no effect if the
     * player isn't Eden or Tainted Eden.
     */
    readonly SetEdenRange: (range: number) => void;

    /**
     * Sets the offset of the player's shot speed stat for Eden's random stats. Has no effect if the
     * player isn't Eden or Tainted Eden.
     */
    readonly SetEdenShotSpeed: (shotSpeed: number) => void;

    /**
     * Sets the offset of the player's speed stat for Eden's random stats. Has no effect if the
     * player isn't Eden or Tainted Eden.
     */
    readonly SetEdenSpeed: (speed: number) => void;

    /** Sets the current charge of Tainted Eve's innate Sumptorium ability. */
    readonly SetEveSumptoriumCharge: (charge: int) => void;

    /** Sets the player's current fire delay modifier used by Experimental Treatment. */
    readonly SetFireDelayModifier: (modifier: number) => void;

    /**
     * Sets the player's footprint color.
     *
     * @param color
     * @param rightFoot Optional. Default is false.
     */
    readonly SetFootprintColor: (color: KColor, rightFoot?: boolean) => void;

    readonly SetForceCamoEffect: (force: boolean) => void;
    readonly SetForgottenSwapFormCooldown: (cooldown: int) => void;
    readonly SetFriendBallEnemy: (desc: EntityDesc) => void;

    /**
     * Sets how many frames the player has been holding still with Gnawed Leaf in their inventory.
     */
    readonly SetGnawedLeafTimer: (timer: int) => void;

    /**
     * Sets how many frames until the player's stat boost from standing in the aura of Hallowed
     * Ground/Star of Bethlehem goes away.
     */
    readonly SetHallowedGroundCountdown: (countdown: int) => void;

    /**
     * Locks the player's head animation to a direction.
     *
     * @param direction
     * @param time
     * @param force Optional. If true, existing head direction locks are overridden. Default is
     *              false.
     */
    readonly SetHeadDirection: (
      direction: Direction,
      time: int,
      force?: boolean,
    ) => void;

    /** Sets how many frames the player's head direction is locked in its current direction. */
    readonly SetHeadDirectionLockTime: (time: int) => void;

    /**
     * Sets how many hearts the player has picked up with Immaculate Conception in their inventory.
     * This is capped at 14.
     *
     * This does not spawn the familiar even if it's set to a value where the player gives birth.
     * The birth is only triggered once the player picks up a heart.
     */
    readonly SetImmaculateConceptionState: (heartsPickedUp: int) => void;

    /**
     * Sets the player's item stat to the provided collectible.
     *
     * Item states are usually used by collectibles that the player holds above their head before
     * activating, such as Bob's Rotten Head and Glass Cannon.
     */
    readonly SetItemState: (collectible: CollectibleType) => void;

    /** Sets the current coin bonus for the player's Keepers Sack collectible. */
    readonly SetKeepersSackBonus: (bonus: int) => void;

    /** Sets the player's laser color. */
    readonly SetLaserColor: (color: Color) => void;

    /** Sets the player's current luck modifier used by Experimental Treatment. */
    readonly SetLuckModifier: (modifier: int) => void;

    /** Sets how many frames until one of Tainted Magdalene's hearts are drained. */
    readonly SetMaggyHealthDrainCooldown: (cooldown: int) => void;

    /** Sets how many frames until Tainted Magdalene's swing attack can be used again. */
    readonly SetMaggySwingCooldown: (cooldown: int) => void;

    /**
     * Sets the maximum charge for when the player stops shooting and charges the Kidney Stone
     * collectible.
     */
    readonly SetMaxBladderCharge: (charge: int) => void;

    /**
     * Sets the countdown in frames until the Mega Blast laser goes away. Setting the countdown to a
     * value above 0 will activate the effects of Mega Blast.
     */
    readonly SetMegaBlastDuration: (countdown: int) => void;

    /**
     * Sets the frame at which the player stops shooting and starts charging the Kidney Stone
     * collectible.
     */
    readonly SetNextUrethraBlockFrame: (frame: int) => void;

    /**
     * Sets the duration of the charge effect used A Pony/White Pony. Calling this method with a
     * positive value will activate the charge effect.
     */
    readonly SetPonyCharge: (time: int) => void;

    /**
     * Sets the provided slot to the provided poop spell. Poop spells are only used by Tainted Blue
     * Baby.
     */
    readonly SetPoopSpell: (slot: int, poopSpellType: PoopSpellType) => void;

    /** Sets the state of the player's Purity collectible. */
    readonly SetPurityState: (state: PurityState) => void;

    /**
     * Sets the duration of the damage bonus given by the Red Stew collectible to the specified
     * amount of frames. Setting the duration above 0 will activate the effect if it wasn't active
     * already.
     */
    readonly SetRedStewBonusDuration: (duration: int) => void;

    readonly SetRevelationCharge: (charge: int) => void;

    readonly SetRockBottomDamage: (damage: number) => void;
    readonly SetRockBottomLuck: (luck: number) => void;
    readonly SetRockBottomMaxFireDelay: (maxFireDelay: number) => void;
    readonly SetRockBottomMoveSpeed: (speed: number) => void;
    readonly SetRockBottomShotSpeed: (shotSpeed: number) => void;
    readonly SetRockBottomTearRange: (range: number) => void;

    /** Sets the player's current shot speed modifier used by Experimental Treatment. */
    readonly SetShotSpeedModifier: (modifier: int) => void;

    /** Sets the player's current speed modifier used by Experimental Treatment. */
    readonly SetSpeedModifier: (modifier: int) => void;

    readonly SetSuplexAimCountdown: (countdown: int) => void;
    readonly SetSuplexLandPosition: (position: Vector) => void;
    readonly SetSuplexState: (state: SuplexState) => void;
    readonly SetSuplexTargetPosition: (position: Vector) => void;

    /** Sets the amount of damage the player's poison tears deals. */
    readonly SetTearPoisonDamage: (damage: number) => void;

    /** Sets the player's current tear range modifier used by Experimental Treatment. */
    readonly SetTearRangeModifier: (modifier: int) => void;

    /**
     * Sets whether the tear spam attack from the Kidney Stone collectible is about to activate. If
     * the player does not have the Kidney Stone collectible, the effect is immediately activated.
     *
     * @param blocked This argument does nothing if it is set to false. This is a bug.
     */
    readonly SetUrethraBlock: (blocked: boolean) => void;

    /** Sets the player's weapon to the provided slot. */
    readonly SetWeapon: (weapon: Weapon, slot: WeaponSlot) => void;

    /** Shoots a blue fire from the Candle collectible from the player. */
    readonly ShootBlueCandle: (direction: Vector) => void;

    /**
     * Shuffles the player's costumes.
     *
     * @param seed Optional. Default is a call to `Random()`.
     */
    readonly ShuffleCostumes: (seed?: Seed) => void;

    /**
     * Spawns an Aquarius creep effect.
     *
     * @param tearParams Optional. Determines the `TearParams` the creep inherits from. Passing
     *                   undefined will have the creep inherit the player's current tear params
     *                   instead. Default is undefined.
     */
    readonly SpawnAquariusCreep: (tearParams?: TearParams) => EntityEffect;

    /**
     * Removes half a heart and spawns a Blood Clot based on the type of heart removed.
     *
     * @param pos
     * @param allowOnDeath Optional. If true, the player can use the Sumptorium with half a heart or
     *                     less, killing them as a result. Otherwise, no clots will spawn if the
     *                     player has half a heart or less. Default is false.
     */
    readonly SpawnClot: (pos: Vector, allowOnDeath?: boolean) => void;

    /**
     * Spawns a ring of tears that orbit around the player akin to the Saturnus collectible. Returns
     * the number of tears fired.
     */
    readonly SpawnSaturnusTears: () => int;

    /**
     * If the player is The Forgotten/The Soul, the two will swap forms. Otherwise, this method does
     * nothing.
     *
     * Returns whether the swap was successful.
     *
     * @param force Optional. If true, the two will swap even if the sub-player doesn't have any
     *              health or while a room/stage transition is active. Default is false.
     * @param noEffects Optional. If true, the dust and fade effect will not play. Default is false.
     */
    readonly SwapForgottenForm: (force?: boolean, noEffects?: boolean) => boolean;

    readonly SyncConsumableCounts: (player: EntityPlayer, collectibleFlags: int) => void;

    /**
     * Teleports the player.
     *
     * @param position
     * @param doEffects Optional. Determines whether the teleport animation and sound plays. Default
     *                  is true.
     * @param teleportTwins Optional. Determines whether twin players (Esau, Tainted Lazarus with
     *                      Birthright, etc) are teleported alongside the player. Default is false.
     */
    readonly Teleport: (
      position: Vector,
      doEffects?: boolean,
      teleportTwins?: boolean,
    ) => void;

    /** Triggers effects on the player as if a room was cleared (i.e Charging active items). */
    readonly TriggerRoomClear: () => void;

    /**
     * Attempts to add the specified pickup to the player's Bag of Crafting. Returns whether the
     * addition was successful.
     */
    readonly TryAddToBagOfCrafting: (pickup: EntityPickup) => boolean;

    /**
     * Attempts to decrease the uses left for the Glowing Hourglass collectible, if the player has
     * it.
     *
     * @param uses This parameter is currently bugged as one use is always decreased no matter what.
     * @param forceHourglass Optional. If true, all charges are instantly removed and the Glowing
     *                       Hourglass is turned into its regular form. Default is false.
     */
    readonly TryDecreaseGlowingHourglassUses: (
      uses: int,
      forceHourglass?: boolean,
    ) => void;

    /**
     * Spawns a copy of the player at its current position. The fake player will play the death
     * sound and animation.
     *
     * Returns whether the fake player was spawned successfully.
     */
    readonly TryFakeDeath: () => boolean;

    /**
     * Attempts to throw Tainted Forgotten in the provided direction if the player is holding him.
     * Returns whether he was thrown.
     */
    readonly TryForgottenThrow: (direction: Vector) => boolean;

    /**
     * Adds a heart container to the player if there are none to prevent death, depending on the
     * player's `HealthType`.
     *
     * Returns whether the death was prevented successfully.
     */
    readonly TryPreventDeath: () => boolean;

    /** Attempts to remove a smelted trinket from the player. */
    readonly TryRemoveSmeltedTrinket: (trinket: TrinketType) => void;

    /**
     * Unblocks the provided collectible.
     *
     * Blocked collectibles causes the game to think the player does not have the collectible, even
     * if it's in their inventory. However, collectible related callbacks such as
     * `ModCallbackRepentogon.POST_ADD_COLLECTIBLE` will still fire, even if the collectible is
     * blocked.
     *
     * **Example**
     *
     * ```ts
     * const player = Isaac.GetPlayer(0);
     * player.BlockCollectible(CollectibleType.SAD_ONION);
     *
     * print(player.HasCollectible(CollectibleType.SAD_ONION)); // false
     * print(player.GetCollectibleNum(CollectibleType.SAD_ONION)); // 0
     * print(player.IsCollectibleBlocked(CollectibleType.SAD_ONION)); // true
     *
     * player.UnblockCollectible(CollectibleType.SAD_ONION);
     * print(player.HasCollectible(CollectibleType.SAD_ONION)); // true
     * ```
     */
    readonly UnblockCollectible: (collectible: CollectibleType) => void;

    /**
     * Updates Isaac's pregnancy state.
     *
     * @param updateCambion If true, the Cambion Conception costume is updated. Otherwise, the
     *                      Immaculate Conception costume is updated.
     */
    readonly UpdateIsaacPregnancy: (updateCambion: boolean) => void;

    /** Returns whether the player has consumed the specified collectible with Void. */
    readonly VoidHasCollectible: (collectible: CollectibleType) => boolean;

    BabySkin: BabySubType;
    FriendBallEnemy: EntityDesc;
  }
}
