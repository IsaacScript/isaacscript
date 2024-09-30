import type {
  ActiveSlot,
  BabySubType,
  CacheFlag,
  CardType,
  CollectibleType,
  ControllerIndex,
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
import type { HealthType } from "../../../enums/HealthType";
import type { PillCardSlot } from "../../../enums/PillCardSlot";
import type { PlayerFoot } from "../../../enums/PlayerFoot";
import type { PocketItemType } from "../../../enums/PocketItemType";
import type { PurityState } from "../../../enums/PurityState";
import type { WeaponSlot } from "../../../enums/WeaponSlot";
import type { ConceptionFamiliarFlag } from "../../../enums/flags/ConceptionFamiliarFlag";
import type { WeaponModifierFlag } from "../../../enums/flags/WeaponModifierFlag";

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
     * @param overcharge Optional. Whether to allow leftover charges to overcharge the item. Default
     *                   is false.
     * @param force Optional. Default is false.
     */
    AddActiveCharge: (
      charge: int,
      slot: ActiveSlot,
      flashHUD?: boolean,
      overCharge?: boolean,
      force?: boolean,
    ) => int;

    /** Adds a bone orbital to the player. */
    AddBoneOrbital: (position: Vector) => void;

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
     * @param evaluateItems Optional. Default is false.
     * @customName AddCacheFlags
     */
    AddCacheFlagsEx: (flag: CacheFlag, evaluateItems?: boolean) => void;

    /**
     * Adds a collectible effect associated with the provided `collectibleType`.
     *
     * Collectible effects are not intended to be used as a fake or temporary copy of items. For
     * instance, every single active item grants a collectible effect on use and are often tied
     * to its effect. Therefore, collectible effects can be seen as more tied to an item's state,
     * such as:
     *  - The Holy Mantle tracking how many shield charges the player has.
     *  - How most familiars are granted to the player.
     *  - Activating the effects of Whore of Babylon and Crown of Light.
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
    AddCollectibleEffect: (
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
    AddCustomCacheTag: (
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
     */
    AddInnateCollectible: (collectible: CollectibleType, amount?: int) => void;

    /**
     * Adds a Leprosy orbital to the player. This is capped at a maximum of three Leprosy orbitals.
     * This is capped at a max of three familiars.
     */
    AddLeprosy: () => void;

    /** Adds an item locust to the player. */
    AddLocust: (collectible: CollectibleType, position: Vector) => void;

    /**
     * Adds a collectible effect associated with the provided `nullItemId`.
     *
     * Collectible effects are not intended to be used as a fake or temporary copy of items. For
     * instance, every single active item grants a collectible effect on use and are often tied
     * to its effect. Therefore, collectible effects can be seen as more tied to an item's state,
     * such as:
     *  - The Holy Mantle tracking how many shield charges the player has.
     *  - How most familiars are granted to the player.
     *  - Activating the effects of Whore of Babylon and Crown of Light.
     *
     * This method is a shortcut to `TemporaryEffects.AddNullEffect` with extra cooldown
     * arguments.
     *
     * @param collectibleType
     * @param applyCostume
     * @param cooldown Optional. Default is the cooldown as defined in `items.xml`.
     * @param additive Optional. If true, calling this method will increment the current cooldown.
     *                 Default is true.
     */
    AddNullItemEffect: (
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
    AddSmeltedTrinket: (
      trinket: TrinketType,
      firstTimePickingUp?: boolean,
    ) => boolean;

    /**
     * Adds charges to the player's Urn of Souls if they are currently holding it. This is capped
     * at 20 souls.
     *
     * The game always keeps track of the amount of souls the player has, even if they do not have
     * the Urn of Souls in their inventory.
     *
     * @param count Optional. Default is 0.
     */
    AddUrnSouls: (count?: number) => void;

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
    BlockCollectible: (collectibleType: CollectibleType) => void;

    /** Returns whether the collectible can be added to the player's inventory. */
    CanAddCollectibleToInventory: (collectible: CollectibleType) => boolean;

    /**
     * Returns whether the player can crush rocks and similar grid entities on contact.
     *
     * This method only returns true if:
     *  - The player has Leo or Thunder Thighs in their inventory.
     *  - The effects from The Nail or Mega Mush is active.
     *  - The player has the Stompy transformation.
     */
    CanCrushRocks: () => boolean;

    /** Returns whether the active item at the provided `slot` can be overridden. */
    CanOverrideActiveItem: (slot: ActiveSlot) => boolean;

    /** Returns whether the player can use the provided `pillEffect`. */
    CanUsePill: (pillEffect: PillEffect) => boolean;

    /**
     * Behaves the same as `EntityPlayer.CheckFamiliar` except it returns an array of all of the
     * familiars.
     *
     * @param familiar
     * @param targetCount
     * @param rng
     * @param sourceItem Optional. Default is undefined.
     * @param familiarSubType Optional. Default is -1.
     */
    CheckFamiliarEx: (
      familiar: FamiliarVariant,
      targetCount: int,
      rng: RNG,
      sourceItem?: ItemConfigItem,
      familiarSubType?: int,
    ) => EntityFamiliar[];

    /**
     * Stops the currently playing costume animation tied to the provided `collectible`.
     *
     * This method seems to only apply to costumes where they have multiple animations instead of
     * a single one (i.e Monstros Lung, Larynx, etc.).
     */
    ClearCollectibleAnim: (collectible: CollectibleType) => void;

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
    ClearDeadEyeChargeEx: (force?: boolean) => void;

    /**
     * Stops the currently playing costume animation tied to the provided `collectible`.
     *
     * This method seems to only apply to costumes where they have multiple animations instead of
     * a single one (i.e Monstros Lung, Larynx, etc.).
     */
    ClearItemAnimCollectible: (collectible: CollectibleType) => void;

    /** Stops all playing costume animations tied to Null Items. */
    ClearItemAnimNullItems: () => void;

    /**
     * Removes the player's queued item.
     *
     * When the player touches a collectible item, they are not granted it immediately. Instead, the
     * item is added to a queue for the duration of the animation where the player holds the item
     * above their head. When the animation is finished, the item(s) in the queue will be granted.
     * This method adds a new item to the item queue. If the player is not currently playing an
     * animation, then the queued item will simply be awarded instantly.
     */
    ClearQueueItem: () => void;

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
    DropCollectible: (
      collectible: CollectibleType,
      existingPedestal?: EntityPickupCollectible,
      removeFromPlayerForm?: boolean,
    ) => void;

    /**
     * Removes the collectible from the player's inventory based on the provided index and
     * spawns a pedestal containing the collectible. If `existingPedestal` is defined, this method
     * returns an `EntityPickupCollectible`. Otherwise, this method returns undefined.
     *
     * @param index The history index starts at 0.
     * @param existingPedestal Optional. If defined, the collectible the pedestal contains will be
     *                         swapped out for the dropped collectible instead of a new pedestal
     *                         spawning. Default is undefined.
     */
    DropCollectibleByHistoryIndex: (
      index: int,
      existingPedestal?: EntityPickupCollectible,
    ) => EntityPickupCollectible;

    /** Sets whether the provided `weaponType` is enabled. */
    EnableWeaponType: (weaponType: WeaponType, set: boolean) => void;

    /**
     * Fires a Brimstone ball. If the player has Tech X, they will fire a laser as well, with
     * the brimstone ball being its parent. Returns the spawned Brimstone Ball.
     *
     * @param position
     * @param velocity
     * @param offset Optional. Default is `VectorZero`.
     */
    FireBrimstoneBall: (
      position: Vector,
      velocity: Vector,
      offset?: Vector,
    ) => EntityEffect;

    /**
     * Returns an `ActiveItemDesc` corresponding to the provided `activeSlot`.
     *
     * @param activeSlot Optional. Default is `ActiveSlot.PRIMARY`.
     */
    GetActiveItemDesc: (activeSlot?: ActiveSlot) => ActiveItemDesc;

    /**
     * Returns the `ActiveSlot` that the player has the provided `collectibleType` in. -1 if the
     * player does not have the collectible in any slot.
     *
     * If the player has multiple copies of the collectible, this method only returns the slot with
     * the highest priority depending on its value, with `ActiveSlot.PRIMARY` being the highest and
     * `ActiveSlot.POCKET_SINGLE_USE` being the lowest. If you need to get all of the active slots,
     * use Isaacscript Common's `getActiveItemSlots` helper function instead.
     *
     */
    GetActiveItemSlot: (collectibleType: CollectibleType) => ActiveSlot | -1;

    /**
     * Returns the maximum amount of charges the collectible in the provided slot has. This does not
     * account for overcharging. Returns 0 if there is no collectible in the slot.
     */
    GetActiveMaxCharge: (slot: ActiveSlot) => int;

    /**
     * Returns the minimum amount of charges the collectible in the provided slot needs in order for
     * it to be used. Returns 0 if there is no collectible in the slot.
     */
    GetActiveMinUsableCharge: (slot: ActiveSlot) => int;

    /**
     * Returns how many times the player has attacked with their currently active weapon. The value
     * resets if the player's current weapon changes or they exit the run.
     */
    GetActiveWeaponNumFired: () => int;

    /** Returns an array containing the contents of the player's Bag of Crafting. */
    GetBagOfCraftingContent: () => BagOfCraftingPickup[];

    /**
     * Returns the current output collectible in the player's Bag of Crafting. Returns
     * `CollectibleType.NULL` if there is no output collectible.
     */
    GetBagOfCraftingOutput: () => CollectibleType;

    /**
     * Returns the `BagOfCraftingPickup` in the player's Bag of Crafting at the provided index.
     */
    GetBagOfCraftingSlot: (slot: int) => BagOfCraftingPickup;

    /**
     * Returns the current charge for when the player stops shooting and charges the Kidney Stone
     * collectible. This is normally capped at 90 but can be overridden through the
     * `EntityPlayer.SetBladderCharge` method.
     */
    GetBladderCharge: () => int;

    /**
     * Returns how many times the player has taken damage in the current floor while having Bloody
     * Lust in their inventory.
     */
    GetBloodLustCounter: () => int;

    /** Returns the direction the player's body is moving. */
    GetBodyMoveDirection: () => Vector;

    /** Returns the number of frames until the player can place another bomb. */
    GetBombPlaceDelay: () => int;

    /**
     * Returns how many times the player has taken damage while having Cambion Conception in their
     * inventory.
     */
    GetCambionConceptionState: () => int;

    /** Returns the current visible state of Cambion Conception's costume. */
    GetCambionPregnancyLevel: () => CambionPregnancyLevel;

    /**
     * Returns a dictionary with the keys being a collectible and their value being how many of the
     * collectible the player has in their inventory. Innate collectibles are not counted.
     */
    GetCollectiblesList: () => LuaTable<CollectibleType, int>;

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
    GetCollectibleNumEx: (
      collectibleType: CollectibleType,
      onlyCountTrueItems?: boolean,
      ignoreInnate?: boolean,
    ) => int;

    /**
     * Returns a bitmask corresponding to which familiars have been spawned by Cambion Conception
     * or Immaculate Conception.
     */
    GetConceptionFamiliarFlags: () => BitFlags<ConceptionFamiliarFlag>;

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
    GetCostumeLayerMap: () => {
      costumeIndex: int;
      layerID: int;
      priority: int;
      isBodyLayer: boolean;
    }[];

    /** Returns an array of all of the player's `CostumeSpriteDesc`. */
    GetCostumeSpriteDescs: () => CostumeSpriteDesc[];

    /**
     * Returns the value corresponding to the custom cache tag. Returns 0 if the value does not
     * exist.
     */
    GetCustomCacheValue: (customCacheTag: string) => number;

    /** Returns the damage modifier used by the D8. */
    GetD8DamageModifier: () => number;

    /** Returns the fire delay modifier used by the D8. */
    GetD8FireDelayModifier: () => number;

    /** Returns the range modifier used by the D8. */
    GetD8RangeModifier: () => number;

    /** Returns the speed modifier used by the D8. */
    GetD8SpeedModifier: () => number;

    /**
     * Returns the player's current damage modifier. The damage modifier is either set through
     * Experimental Treatment or `EntityPlayer.SetDamageModifier`.
     */
    GetDamageModifier: () => number;

    /** Returns the current charge of Dead Eye. */
    GetDeadEyeCharge: () => int;

    /** Returns the name of the player's death animation. */
    GetDeathAnimName: () => DeathAnimationName;

    /** Returns the offset of the player's damage stat for Eden's random stats. */
    GetEdenDamage: () => number;

    /** Returns the offset of the player's fire delay stat for Eden's random stats. */
    GetEdenFireDelay: () => number;

    /** Returns the offset of the player's luck stat for Eden's random stats. */
    GetEdenLuck: () => number;

    /** Returns the offset of the player's range stat for Eden's random stats. */
    GetEdenRange: () => number;

    /** Returns the offset of the player's shot speed stat for Eden's random stats. */
    GetEdenShotSpeed: () => number;

    /** Returns the offset of the player's speed stat for Eden's random states. */
    GetEdenSpeed: () => number;

    GetEnterPosition: () => Vector;

    /** Returns the player's `EntityConfigPlayer`. */
    GetEntityConfigPlayer: () => EntityConfigPlayer;

    /**
     * Returns how many frames the player has been firing in one direction with Epiphora in their
     * inventory. The charge stops increasing when the player's fire rate can no longer increase
     * from the effect.
     */
    GetEpiphoraCharge: () => int;

    /** Returns how many frames Tainted Eve's innate Sumptorium has been charging. */
    GetEveSumptoriumCharge: () => int;

    /**
     * Returns the player's current fire delay modifier. The fire delay modifier is either set
     * through Experimental Treatment or `EntityPlayer.SetFireDelayModifier`.
     */
    GetFireDelayModifier: () => int;

    /**
     * Returns the player's flipped form. Returns undefined if the player does not have a flipped
     * form.
     *
     * This is only used by Tainted Lazarus.
     */
    GetFlippedForm: () => EntityPlayer | undefined;

    /**
     * Returns the entity used by Active Camera to determine where the camera should focus. This can
     * either be the Marked target `EntityEffect` or a weapon's entity. Returns undefined if no
     * entity exists.
     */
    GetFocusEntity: () => Entity | undefined;

    /** Returns the color of the player's footprint. */
    GetFootprintColor: (useLeftFootprint: boolean) => KColor;

    /** Returns the SubType of the glitched baby. */
    GetGlitchBabySubType: () => BabySubType;

    /**
     * Returns an array containing what pickup Glyph of Balance will drop upon the room being
     * cleared.
     *
     * @param variant Optional. Default is -1.
     * @param subType Optional. Default is -1.
     */
    GetGlyphOfBalanceDrop: (
      variant: PickupVariant,
      subType: int,
    ) => [PickupVariant, int];

    /**
     * Returns how many frames the player has been holding still with Gnawed Leaf in their
     * inventory.
     */
    GetGnawedLeafTimer: () => int;

    /** Returns the amount of heart containers the player has that were given by Greed's Gullet. */
    GetGreedsGulletHearts: () => int;

    /**
     * Returns the amount of frames until the player loses their stat boost from the aura used by
     * Hallowed Ground and Star of Bethlehem. The countdown decreases when they leave the aura.
     */
    GetHallowedGroundCountdown: () => int;

    /**
     * Returns the number of frames the player's head was forced to stay in a specific direction.
     * Returns -1 or lower if the direction is not locked.
     */
    GetHeadDirectionLockTime: () => int;

    /** Returns the player's health type. */
    GetHealthType: () => HealthType;

    /**
     * Returns the entity the player is holding over their head. Returns undefined if no entity is
     * being held.
     */
    GetHeldEntity: () => Entity | undefined;

    /**
     * Returns the `Sprite` used for when the player is doing an animation that involves holding a
     * sprite over their head, such as active item usage.
     */
    GetHeldSprite: () => Sprite;

    /**
     * Returns the player's `History`. This is used to keep track of the collectibles the player
     * has gotten throughout the run.
     */
    GetHistory: () => History;

    /**
     * Returns how many hearts have been collected with Immaculate Conception in the player's
     * inventory.
     */
    GetImmaculateConceptionState: () => int;

    /** Returns the number of coins spent while possessing Keeper's Sack. */
    GetKeepersSackBonus: () => int;

    /** Returns the player's laser color. */
    GetLaserColor: () => Color;

    /**
     * Returns the player's current luck modifier. The luck modifier is either set through
     * Experimental Treatment or `EntityPlayer.SetLuckModifier`.
     */
    GetLuckModifier: () => number;

    /**
     * Returns how many frames are left until Tainted Magdalene's swing attack can be used again.
     * Returns 0 if the player is not Tainted Magdalene.
     */
    GetMaggySwingCooldown: () => int;

    /** Returns the Marked target effect, if it exists. Otherwise, returns undefined. */
    GetMarkedTarget: () => EntityEffect | undefined;

    /**
     * Returns the maximum amount of charge until the player stops shooting and charges the Kidney
     * Stone collectible.
     */
    GetMaxBladderCharge: () => int;

    /** Returns the maximum amount of bombs the player can have. */
    GetMaxBombs: () => int;

    /** Returns the maximum amount of coins the player can have. */
    GetMaxCoins: () => int;

    /** Returns the maximum amount of keys the player can have. */
    GetMaxKeys: () => int;

    /** Returns the maximum duration of the Kidney Stone collectible. */
    GetMaxPeeBurstCooldown: () => int;

    /** Returns the maximum amount of pocket items. */
    GetMaxPocketItems: () => int;

    /** Returns how many frames until the effects of Mega Blast stop. */
    GetMegaBlastDuration: () => int;

    /** Returns the `CollectibleType` of the last collectible given by Metronome. */
    GetMetronomeCollectibleID: () => CollectibleType;

    /**
     * Returns the `EntitiesSaveStateVector` corresponding to the pickups the player has stored
     * using the Moving Box collectible.
     */
    GetMovingBoxContents: () => EntitiesSaveStateVector[];

    /** Returns the `MultiShotParams` of the provided `weaponType`. */
    GetMultiShotParams: (weaponType: WeaponType) => MultiShotParams;

    GetMultiShotPositionVelocity: (
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
    GetNextUrethraBlockFrame: () => int;

    /** Returns the attack duration of the Kidney Stone item. */
    GetPeeBurstCooldown: () => int;

    /** Returns the amount of collectibles the player has tied to the specified transformation. */
    GetPlayerFormCounter: (playerFormID: PlayerForm) => void;

    /**
     * Returns the player's index.
     *
     * This method should not be confused with Isaacscript Common's `getPlayerIndex` helper
     * function. If you need to store any data pertaining to a player, use `getPlayerIndex` over
     * this.
     */
    GetPlayerIndex: (player: EntityPlayer) => int;

    /** Returns the `PocketItem` from the provided `slotId`. */
    GetPocketItem: (slotId: PillCardSlot) => PocketItem;

    /**
     * Returns the amount of frames left until the charging effect from the A Pony or White Pony
     * item deactivates.
     */
    GetPonyCharge: () => int;

    /**
     * Returns the state in which the Purity item effect currently is. Returns `PurityState.BLUE` if
     * the player does not have the Purity collectible.
     */
    GetPurityState: () => PurityState;

    /** Returns the frames left until the damage bonus from Red Stew expires. */
    GetRedStewBonusDuration: () => int;

    /**
     * Returns the player's current shot speed modifier. The shot speed modifier is either set
     * through Experimental Treatment or `EntityPlayer.SetShotSpeedModifier`.
     */
    GetShotSpeedModifier: () => number;

    /**
     * Returns a table with the keys being the `TrinketType` and the value being being a table with
     * the corresponding amount of smelted trinkets.
     */
    GetSmeltedTrinket: () => LuaTable<
      TrinketType,
      { trinketAmount: int; goldenTrinketAmount: int }
    >;

    /** @param position Optional. Default is the player's position. */
    GetSpecialGridCollision: (position?: Vector) => EntityGridCollisionClass;

    /**
     * Returns the player's current speed modifier. The speed modifier is either set through
     * Experimental Treatment or `EntityPlayer.SetSpeedModifier`.
     */
    GetSpeedModifier: () => number;

    /** Returns an array containing information of all of the player's innate collectibles. */
    GetSpoofedCollectiblesList: () => Array<{
      CollectibleID: CollectibleType;
      AppendedCount: int;
      IsBlocked: boolean;
    }>;

    /**
     * Returns the player's tear displacement. The displacement corresponds to the eye the tear is
     * being fired from, with 1 being the right eye and -1 being the left eye.
     */
    GetTearDisplacement: () => number;

    /**
     * Returns the amount of charges the collectible in the provided slot has. Returns 0 if there is
     * no collectible in the slot.
     */
    GetTotalActiveCharge: (slot: ActiveSlot) => void;

    /** Returns the amount charges the player has for the Urn of Souls item. */
    GetUrnSouls: () => int;

    /** Returns an array of all active items that were consumed by the Void item. */
    GetVoidedCollectiblesList: () => CollectibleType[];

    /** Returns a Weapon from the provided slot. Returns undefined if no weapon is in the slot. */
    GetWeapon: (slot: WeaponSlot) => Weapon | undefined;

    /** Returns a bitmask of the player's weapon modifiers. */
    GetWeaponModifiers: () => BitFlags<WeaponModifierFlag>;

    /**
     * Returns the item that was used by the player and would be activated again upon using Wild
     * Card.
     *
     * If the player used an active item, its `CollectibleType` is returned. If the player used a
     * consumable, its sub type is returned. If the player used the Question Mark card, 1 is
     * returned. Otherwise, 0 is returned.
     */
    GetWildCardItem: () => CollectibleType | CardType | PillEffect | 0;

    /**
     * Returns the type of item that was last used by the player and would be used again upon using
     * Wild Card. Returns 255 if no item has been used.
     */
    GetWildCardItemType: () => PocketItemType | 255;

    /**
     * Returns a dictionary of the Lemegeton wisps the player has, with the keys being the
     * `CollectibleType` and the value being the corresponding amount.
     */
    GetWispCollectiblesList: () => LuaMap<CollectibleType, int>;

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
    HasCollectibleEx: (
      collectibleType: CollectibleType,
      ignoreModifiers?: boolean,
      ignoreInnate?: boolean,
    ) => boolean;

    /**
     * Returns whether the player has a question mark as their extra life count indicating a %
     * chance to revive (i.e. Guppy's Collar).
     */
    HasChanceRevive: () => boolean;

    /** Returns whether the player has the golden variant of the provided trinket. */
    HasGoldenTrinket: (trinket: TrinketType) => boolean;

    /**
     * Returns whether the player is in the Lost form triggered by either the white fire in
     * Downpour, using Soul of The Lost, or touching Dark Esau if the player is playing as Tainted
     * Jacob.
     */
    HasInstantDeathCurse: () => boolean;

    /** Returns whether the player is immune to poison. */
    HasPoisonImmunity: () => boolean;

    /** Increments the counter towards a transformation. */
    IncrementPlayerFormCounter: (form: PlayerForm, count: int) => void;

    /**
     * Initializes the "special" tear or weapon type for characters like Forgotten, Lilith, and
     * Azazel.
     *
     * This method should be called after spawning a player using `EntityPlayer.InitTwin`, otherwise
     * their special tear/weapon may not be initialized properly.
     */
    InitPostLevelInitStats: () => void;

    /**
     * Initializes a new player that is controlled by the player's controller.
     *
     * This method is currently bugged as the spawned twin will desyncs upon exiting a run and
     * continuing it. This results in the game prompting the player for a controller, resulting in
     * a soft lock.
     *
     * This method is intended to only work on vanilla characters as this method is hardcoded, as
     * confirmed by _Kilburn.
     */
    InitTwin: (playerType: PlayerType) => EntityPlayer;

    /** Returns whether the animation associated with the collectible is visible. */
    IsCollectibleAnimFinished: (
      collectible: CollectibleType,
      animation: string,
    ) => void;

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
    IsCollectibleBlocked: (collectible: CollectibleType) => boolean;

    /** Returns whether the costume associated with the collectible is visible. */
    IsCostumeVisible: (
      collectible: CollectibleType,
      playerSpriteLayerIDOrName: int | string,
    ) => boolean;

    IsEntityValidTarget: (entity: Entity) => boolean;

    /**
     * Returns whether the provided foot has touched the ground for the current animation frame if
     * the player is walking.
     *
     * @param foot Optional. Default is `PlayerFoot.RIGHT`.
     */
    IsFootstepFrame: (foot?: PlayerFoot) => boolean;

    /**
     * Returns whether the player is headless due to collectibles such as Guillotine and Scissors.
     */
    IsHeadless: () => boolean;

    /** Returns whether the player is the non-active form of Tainted Lazarus with Birthright. */
    IsHologram: () => boolean;

    /** Returns whether the invisibility effect of Faded Polaroid/Camo Undies is active. */
    IsInvisible: () => boolean;

    /** Returns whether the costume associated with the `ItemConfigItem` is visible. */
    IsItemCostumeVisible: (
      item: ItemConfigItem,
      playerSpriteLayerIDOrName: int | string,
    ) => boolean;

    /** Returns whether the player is a local player on the machine. */
    IsLocalPlayer: () => boolean;

    /** Returns whether the costume associated with the null item is visible. */
    IsNullCostumeVisible: (
      nullItem: NullItemID,
      playerSpriteLayerIDOrName: int | string,
    ) => boolean;

    /** Returns whether the player can no longer shoot due to charging the Kidney Stone item. */
    IsUrethraBlocked: () => boolean;

    /** Turns the player into a co-op ghost. */
    MorphToCoopGhost: () => boolean;

    /**
     * Plays an animation tied to the provided collectible.
     *
     * @param collectible
     * @param checkBodyLayers
     * @param animationName
     * @param frame Optional. Default is -1.
     */
    PlayCollectibleAnim: (
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
    PlayDelayedSFX: (
      soundEffect: SoundEffect,
      soundDelay?: int,
      frameDelay?: int,
      volume?: number,
    ) => void;

    /** Removes the pocket item from the provided slot. */
    RemovePocketItem: (slot: PillCardSlot) => void;

    /**
     * Removes the poop spell from the provided queue position. All spells are shifted to fill the
     * space a new spell is added to fill the last position.
     *
     * Poop spells are only used by Tainted Blue Baby.
     *
     * @param queuePosition Optional. Default is 0.
     *
     */
    RemovePoopSpell: (queuePosition?: int) => void;

    /** Rerolls all of the player's collectibles. */
    RerollAllCollectibles: (rng: RNG, includeActiveItems: boolean) => void;

    // ResetPlayer is bugged and currently does nothing.

    /**
     * Revives the player with half a heart if they are a co-op ghost. Returns whether they were
     * successfully revived.
     */
    ReviveCoopGhost: () => boolean;

    /**
     * Spawns a series of pickups the same way Tainted Cain does upon picking up a collectible.
     *
     * @param collectible
     * @param position Optional. Default is the player's position.
     * @param rng Optional. Default is the player's drop RNG.
     * @param pool Optional. Default is `ItemPoolType.NULL`.
     */
    SalvageCollectible: (
      collectible: CollectibleType,
      position?: Vector,
      rng?: RNG,
      itemPool?: ItemPoolType,
    ) => void;

    /**
     * Spawns a series of pickups the same way Tainted Cain does upon picking up a collectible.
     * The salvaged pickup is removed.
     *
     * The original name of this method was "SalvageCollectible". However, due to Typescript's poor
     * support with method overloads in interfaces, this overload was renamed to `SalvagePickup`.
     * When the mod is compiled, all references to `SalvagePickup" are renamed to
     * "SalvageCollectible".
     *
     * @param pickup
     * @param rng Optional. Default is the pickup's drop RNG.
     * @param pool Optional. Default is `ItemPoolType.NULL`.
     * @customName SalvageCollectible
     */
    SalvagePickup: (
      pickup: EntityPickup,
      rng?: RNG,
      itemPool?: ItemPoolType,
    ) => void;

    /** Sets the `VarData` of the collectible at the provided active slot. */
    SetActiveVarData: (varData: int, slot: ActiveSlot) => void;

    /** Sets the contents of the player's Bag of Crafting. */
    SetBagOfCraftingContent: (content: readonly BagOfCraftingPickup[]) => void;

    /** Sets the output of the player's Bag of Crafting to the provided collectible. */
    SetBagOfCraftingOutput: (output: CollectibleType) => void;

    /** Sets the provided slot in the player's Bag of Crafting to the provided pickup. */
    SetBagOfCraftingSlot: (
      slotID: int,
      bagOfCraftingPickup: BagOfCraftingPickup,
    ) => void;

    SetBlackHeart: (blackHearts: int) => void;

    /**
     * Sets the player's Bladder Charge. This is used by Kidney Stone.
     *
     * This method is bugged as calling it without having Kidney Stone in the player's inventory
     * causes their head to turn pitch black.
     */
    SetBladderCharge: (charge: int) => void;

    /**
     * Sets how many times the player has hit with Bloody Lust in their inventory. Bloody Lust's
     * color and damage cap is respected.
     *
     * This method does not change the player's damage and color stat immediately. You will need to
     * add the appropriate cache flags and call `EntityPlayer.EvaluateItems` if you wish to
     * immediately change them.
     *
     */
    SetBloodLustCounter: (counter: int) => void;

    /** Sets how many frames until the player can place another bomb. */
    SetBombPlaceDelay: (delay: int) => void;

    /**
     * Sets how much damage the player has taken with Cambion Conception in their inventory.
     *
     * This does not spawn the familiar even if it's set to a value where the player gives birth.
     * The birth is only triggered once the player takes damage.
     */
    SetCambionConceptionState: (damage: int) => void;

    /** Sets whether the player can shoot. */
    SetCanShoot: (canShoot: boolean) => void;

    /**
     * Sets which familiars were spawned by Cambion/Immaculate Conception. The familiars only spawn
     * when the familiars cache is evaluated and the player has one of the two collectibles in their
     * inventory.
     */
    SetCambionFamiliarFlags: (
      flags: BitFlags<ConceptionFamiliarFlag> | ConceptionFamiliarFlag,
    ) => void;

    /** Sets the player's controller index. */
    SetControllerIndex: (index: ControllerIndex) => void;

    /** Sets the player's current damage modifier used by Experimental Treatment. */
    SetDamageModifier: (modifier: number) => void;

    /**
     * Sets the offset of the player's damage stat for Eden's random stats. Has no effect if the
     * player isn't Eden or Tainted Eden.
     */
    SetEdenDamage: (damage: number) => void;

    /**
     * Sets the offset of the player's fire delay stat for Eden's random stats. Has no effect if
     * the player isn't Eden or Tainted Eden.
     */
    SetEdenFireDelay: (fireDelay: number) => void;

    /**
     * Sets the offset of the player's luck stat for Eden's random stats. Has no effect if the
     * player isn't Eden or Tainted Eden.
     */
    SetEdenLuck: (luck: number) => void;

    /**
     * Sets the offset of the player's range stat for Eden's random stats. Has no effect if the
     * player isn't Eden or Tainted Eden.
     */
    SetEdenRange: (range: number) => void;

    /**
     * Sets the offset of the player's shot speed stat for Eden's random stats. Has no effect if the
     * player isn't Eden or Tainted Eden.
     */
    SetEdenShotSpeed: (shotSpeed: number) => void;

    /**
     * Sets the offset of the player's speed stat for Eden's random stats. Has no effect if the
     * player isn't Eden or Tainted Eden.
     */
    SetEdenSpeed: (speed: number) => void;

    /** Sets the current charge of Tainted Eve's innate Sumptorium ability. */
    SetEveSumptoriumCharge: (charge: int) => void;

    /** Sets the player's current fire delay modifier used by Experimental Treatment. */
    SetFireDelayModifier: (modifier: number) => void;

    /**
     * Sets the player's footprint color.
     *
     * @param color
     * @param rightFoot Optional. Default is false.
     */
    SetFootprintColor: (color: KColor, rightFoot?: boolean) => void;

    /**
     * Sets how many frames the player has been holding still with Gnawed Leaf in their inventory.
     */
    SetGnawedLeafTimer: (timer: int) => void;

    /**
     * Sets how many frames until the player's stat boost from standing in the aura of
     * Hallowed Ground/Star of Bethlehem goes away.
     */
    SetHallowedGroundCountdown: (countdown: int) => void;

    /**
     * Locks the player's head animation to a direction.
     *
     * @param direction
     * @param time
     * @param force Optional. If true, existing head direction locks are overridden. Default is
     *              false.
     */
    SetHeadDirection: (direction: Direction, time: int, force: boolean) => void;

    /** Sets how many frames the player's head direction is locked in its current direction. */
    SetHeadDirectionLockTime: (time: int) => void;

    /**
     * Sets how many hearts the player has picked up with Immaculate Conception in their inventory.
     * This is capped at 14.
     *
     * This does not spawn the familiar even if it's set to a value where the player gives birth.
     * The birth is only triggered once the player picks up a heart.
     */
    SetImmaculateConceptionState: (heartsPickedUp: int) => void;

    /**
     * Sets the player's item stat to the provided collectible.
     *
     * Item states are usually used by collectibles that the player holds above their head before
     * activating, such as Bob's Rotten Head and Glass Cannon.
     */
    SetItemState: (collectible: CollectibleType) => void;

    /** Sets the current coin bonus for the player's Keepers Sack collectible. */
    SetKeepersSackBonus: (bonus: int) => void;

    /** Sets the player's laser color. */
    SetLaserColor: (color: Color) => void;

    /** Sets the player's current luck modifier used by Experimental Treatment. */
    SetLuckModifier: (modifier: int) => void;

    /** Sets how many frames until Tainted Maggy's swing attack can be used again. */
    SetMaggySwingCooldown: (cooldown: int) => void;

    /**
     * Sets the maximum charge for when the player stops shooting and charges the Kidney Stone
     * collectible.
     */
    SetMaxBladderCharge: (charge: int) => void;

    /**
     * Sets the countdown in frames until the Mega Blast laser goes away. Setting the countdown to a
     * value above 0 will activate the effects of Mega Blast.
     *
     * This method has a bug where setting the countdown to a value lower than its current countdown
     * causes the laser to persist indefinitely until the player leaves the room. Before calling
     * this method, you should check to see if the laser is active by using
     * `EntityPlayer.GetMegaBlastDuration`.
     */
    SetMegaBlastDuration: (countdown: int) => void;

    /**
     * Sets the frame at which the player stops shooting and starts charging the Kidney Stone
     * collectible.
     */
    SetNextUrethraBlockFrame: (frame: int) => void;

    /**
     * Sets the duration of the charge effect used A Pony/White Pony. Calling this method with a
     * positive value will activate the charge effect.
     */
    SetPonyCharge: (time: int) => void;

    /**
     * Sets the provided slot to the provided poop spell. Poop spells are only used by Tainted Blue
     * Baby.
     */
    SetPoopSpell: (slot: int, poopSpellType: PoopSpellType) => void;

    /** Sets the state of the player's Purity collectible. */
    SetPurityState: (state: PurityState) => void;

    /**
     * Sets the duration of the damage bonus given by the Red Stew collectible to the specified
     * amount of frames. Setting the duration above 0 will activate the effect if it wasn't active
     * already.
     */
    SetRedStewBonusDuration: (duration: int) => void;

    /** Sets the player's current shot speed modifier used by Experimental Treatment. */
    SetShotSpeedModifier: (modifier: int) => void;

    /** Sets the player's current speed modifier used by Experimental Treatment. */
    SetSpeedModifier: (modifier: int) => void;

    /** Sets the amount of damage the player's poison tears deals. */
    SetTearPoisonDamage: (damage: number) => void;

    /** Sets the player's current tear range modifier used by Experimental Treatment. */
    SetTearRangeModifier: (modifier: int) => void;

    /**
     * Sets whether the tear spam attack from the Kidney Stone collectible is about to activate. If
     * the player does not have the Kidney Stone collectible, the effect is immediately activated.
     *
     * @param blocked This argument does nothing if it is set to false. This is a bug.
     */
    SetUrethraBlock: (blocked: boolean) => void;

    /** Sets the player's weapon to the provided slot. */
    SetWeapon: (weapon: Weapon, slot: WeaponSlot) => void;

    /** Shoots a blue fire from the Candle collectible from the player. */
    ShootBlueCandle: (direction: Vector) => void;

    /**
     * Shuffles the player's costumes.
     *
     * @param seed Optional. Default is a call to `Random()`.
     */
    ShuffleCostumes: (seed?: Seed) => void;

    /**
     * Spawns an Aquarius creep effect.
     *
     * @param tearParams Optional. Determines the `TearParams` the creep inherits from. Passing
     *                   undefined will have the creep inherit the player's current tear params
     *                   instead. Default is undefined.
     */
    SpawnAquariusCreep: (tearParams: TearParams) => EntityEffect;

    /**
     * Removes half a heart and spawns a Blood Clot based on the type of heart removed.
     *
     * @param pos
     * @param allowOnDeath Optional. If true, the player can use the Sumptorium with half a heart or
     *                     less, killing them as a result. Otherwise, no clots will spawn if the
     *                     player has half a heart or less. Default is false.
     */
    SpawnClot: (pos: Vector, allowOnDeath?: boolean) => void;

    /**
     * Spawns a ring of tears that orbit around the player akin to the Saturnus collectible. Returns
     * the number of tears fired.
     */
    SpawnSaturnusTears: () => int;

    /**
     * If the player is The Forgotten/The Soul, the two will swap forms. Otherwise, this method does
     * nothing.
     *
     * @param force Optional. If true, the two will swap even if the sub-player doesn't have any
     *              health or while a room/stage transition is active. Default is false.
     * @param noEffects Optional. If true, the dust and fade effect will not play. Default is false.
     */
    SwapForgottenForm: (force?: boolean, noEffects?: boolean) => void;

    SyncConsumableCounts: (player: EntityPlayer, collectibleFlags: int) => void;

    /**
     * Teleports the player.
     *
     * @param position
     * @param doEffects Optional. Determines whether the teleport animation and sound plays. Default
     *                  is true.
     * @param teleportTwins Optional. Determines whether twin players (Esau, Tainted Lazarus with
     *                      Birthright, etc) are teleported alongside the player. Default is false.
     */
    Teleport: (
      position: Vector,
      doEffects?: boolean,
      teleportTwins?: boolean,
    ) => void;

    /** Triggers effects on the player as if a room was cleared (i.e Charging active items). */
    TriggerRoomClear: () => void;

    /** Attempts to add the specified pickup to the player's Bag of Crafting. */
    TryAddToBagOfCrafting: (pickup: EntityPickup) => void;

    /**
     * Attempts to decrease the uses left for the Glowing Hourglass collectible, if the player has
     * it.
     *
     * @param uses This parameter is currently bugged as one use is always decreased no matter what.
     * @param forceHourglass Optional. If true, all charges are instantly removed and the Glowing
     *                       Hourglass is turned into its regular form. Default is false.
     */
    TryDecreaseGlowingHourglassUses: (
      uses: int,
      forceHourglass?: boolean,
    ) => void;

    /**
     * Spawns a copy of the player at its current position. The fake player will play the
     * death sound and animation.
     *
     * Returns whether the fake player was spawned successfully.
     */
    TryFakeDeath: () => boolean;

    /**
     * Attempts to throw Tainted Forgotten in the provided direction if the player is holding him.
     * Returns whether he was thrown.
     */
    TryForgottenThrow: (direction: Vector) => boolean;

    /**
     * Adds a heart container to the player if there are none to prevent death, depending on the
     * player's `HealthType`.
     *
     * Returns whether the death was prevented successfully.
     */
    TryPreventDeath: () => boolean;

    /** Attempts to remove a smelted trinket from the player. */
    TryRemoveSmeltedTrinket: (trinket: TrinketType) => void;

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
    UnblockCollectible: (collectible: CollectibleType) => void;

    /**
     * Updates Isaac's pregnancy state.
     *
     * @param updateCambion If true, the Cambion Conception costume is updated. Otherwise, the
     *                      Immaculate Conception costume is updated.
     */
    UpdateIsaacPregnancy: (updateCambion: boolean) => void;

    /** Returns whether the player has consumed the specified collectible with Void. */
    VoidHasCollectible: (collectible: CollectibleType) => boolean;

    BabySkin: BabySubType;
  }
}
