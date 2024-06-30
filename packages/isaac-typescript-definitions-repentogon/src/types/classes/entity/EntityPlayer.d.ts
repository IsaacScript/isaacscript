import type {
  ActiveSlot,
  BabySubType,
  CacheFlag,
  CollectibleType,
  FamiliarVariant,
  PickupVariant,
  PillEffect,
  PlayerForm,
  TrinketType,
  WeaponType,
} from "isaac-typescript-definitions";
import type { BagOfCraftingPickup } from "../../../enums/BagOfCraftingPickup";
import type { DeathAnimationName } from "../../../enums/DeathAnimationName";
import type { HealthType } from "../../../enums/HealthType";
import type { PurityState } from "../../../enums/PurityState";
import type { ConceptionFamiliarFlag } from "../../../enums/flags/ConceptionFamiliarFlag";

declare global {
  interface EntityPlayer extends Entity {
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

    BlockCollectible: (collectible: CollectibleType) => void;

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

    GetMultiShotParams: (weaponType: WeaponType) => MultiShotParams;
    GetMultiShotPositionVelocity: (
      loopIndex: int,
      weaponType: WeaponType,
      shotDirection: Vector,
      shotSpeed: number,
      params: MultiShotParams,
    ) => PosVel;
    GetPocketItem: (slotId: ActiveSlot) => PocketItem;

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
     * Adds an innate collectible to the player. Innate collectibles grant the effects of a
     * collectible but the collectible itself is not added to the player's inventory, akin to an
     * item wisp.
     *
     * This method is currently partially bugged as it directly modifies the array returned by
     * `EntityPlayer.GetWispCollectiblesList`. Furthermore, added innate items are not saved when
     * exiting a run.
     *
     * @param collectible
     * @param amount Optional. Default is 1.
     */
    AddInnateCollectible: (collectible: CollectibleType, amount?: int) => void;

    /** This is capped at a max of three familiars. */
    AddLeprosy: () => void;

    /** Adds an item locust to the player. */
    AddLocust: (collectible: CollectibleType, position: Vector) => void;

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
    ) => void;

    /**
     * Adds charges to the player's Urn of Souls if they are currently holding it.
     *
     * @param count Optional. Default is 0.
     */
    AddUrnSouls: (count?: number) => void;

    /** Returns whether the collectible can be added to the player's inventory. */
    CanAddCollectibleToInventory: (collectible: CollectibleType) => boolean;

    /** Returns whether the player can crush rocks and similar grid entities on contact. */
    CanCrushRocks: () => boolean;

    CanOverrideActiveItem: (collectible: CollectibleType) => boolean;
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

    ClearCollectibleAnim: (collectible: CollectibleType) => void;
    ClearItemAnimCollectible: (collectible: CollectibleType) => void;
    ClearItemAnimNullItems: () => void;
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
     * Removes the collectible from the player's inventory based on the specified history index and
     * spawns a pedestal containing the collectible.
     *
     * @param index
     * @param existingPedestal Optional. If defined, the collectible the pedestal contains will be
     *                         swapped out for the dropped collectible instead of a new pedestal
     *                         spawning. Default is undefined.
     */
    DropCollectibleByHistoryIndex: (
      index: int,
      existingPedestal: EntityPickupCollectible,
    ) => void;

    EnableWeaponType: (weapon: WeaponType, set: boolean) => void;

    /**
     * Fires a Brimstone ball. If the player has Tech X, the fire will fire a laser as well, with
     * the brimstone ball as its parent.
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

    /** @param slot Optional. Default is `ActiveSlot.PRIMARY`. */
    GetActiveItemDesc: (slot?: ActiveSlot) => ActiveItemDesc;

    /** Returns -1 if the provided collectible is not in any of the player's active slots. */
    GetActiveItemSlot: (collectible: CollectibleType) => ActiveSlot | -1;

    GetActiveMaxCharge: (slot: ActiveSlot) => int;
    GetActiveMinUsableCharge: (slot: ActiveSlot) => int;
    GetActiveWeaponNumFired: () => int;

    /** Returns the contents of the player's Bag of Crafting. */
    GetBagOfCraftingContent: () => BagOfCraftingPickup[];

    /** Returns the player's Bag Of Crafting output. */
    GetBagOfCraftingOutput: () => int;

    /**
     * Returns the `BagOfCraftingPickup` in the player's Bag of Crafting from the specified index.
     */
    GetBagOfCraftingSlot: (slot: int) => BagOfCraftingPickup;

    GetBladderCharge: () => int;

    GetBloodLustCounter: () => int;

    /** Returns the direction the player's body is moving. */
    GetBodyMoveDirection: () => Vector;

    GetBombPlaceDelay: () => int;

    GetHallowedGroundCountdown: () => int;

    GetCambionConceptionState: () => int;
    GetCambionFamiliarFlags: () => BitFlags<ConceptionFamiliarFlag>;
    GetCambionPregnancyLevel: () => int;

    /**
     * Returns a dictionary containing all of the player's collectibles and the amount for each one
     * being held.
     */
    GetCollectiblesList: () => LuaTable<CollectibleType, int>;

    /**
     * Repentogon's modified `EntityPlayer.GetCollectibleNum` method.
     *
     * Behaves the same as `EntityPlayer.GetCollectibleNum` except you can now choose to have it
     * ignore blocked items.
     *
     * This method has been renamed to include "Ex" so it can not conflict with the vanilla type
     * definitions. However, when the project compiles the method's name will change to what it's
     * supposed to be.
     *
     * @param collectibleType
     * @param onlyCountTrueItems If set to true, the function only counts collectibles that the
     *                           player actually owns and ignores things like Lilith's Incubus,
     *                           items granted by 3 Dollar Bill, and so forth.
     * @param ignoreBlocked Optional. Default is false.
     * @customName GetCollectibleNum
     */
    GetCollectibleNumEx: (
      collectibleType: CollectibleType,
      onlyCountTrueItems?: boolean,
      ignoreBlocked?: boolean,
    ) => int;

    /** Return the player's sprite layer data for costumes. */
    GetCostumeLayerMap: () => {
      costumeIndex: int;
      layerID: int;
      priority: int;
      isBodyLayer: boolean;
    };

    GetCostumeSpriteDescs: () => CostumeSpriteDesc[];

    GetD8DamageModifier: () => int;
    GetD8FireDelayModifier: () => int;
    GetD8RangeModifier: () => int;
    GetD8SpeedModifier: () => int;
    GetDamageModifier: () => int;
    GetDeadEyeCharge: () => int;
    GetDeathAnimName: () => DeathAnimationName;

    /** Returns the offset of the player's damage stat for Eden's random states. */
    GetEdenDamage: () => number;

    /** Returns the offset of the player's fire delay stat for Eden's random states. */
    GetEdenFireDelay: () => number;

    /** Returns the offset of the player's luck stat for Eden's random states. */
    GetEdenLuck: () => number;

    /** Returns the offset of the player's shot speed stat for Eden's random states. */
    GetEdenShotSpeed: () => number;

    /** Returns the offset of the player's speed stat for Eden's random states. */
    GetEdenSpeed: () => number;

    GetEnterPosition: () => Vector;

    /** Returns the player's `EntityConfigPlayer`. */
    GetEntityConfigPlayer: () => EntityConfigPlayer;

    GetEpiphoraCharge: () => int;

    /** Returns the current charge of Tainted Eve's innate Sumptorium ability. */
    GetEveSumptoriumCharge: () => int;

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

    GetFootprintColor: (useLeftFootprint: boolean) => Color;
    GetGlitchBabySubType: () => BabySubType;
    GetGlyphOfBalanceDrop: (
      variant: PickupVariant,
      subType: int,
    ) => [PickupVariant, int];
    GetGnawedLeafTimer: () => int;
    GetGreedsGulletHearts: () => int;

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

    GetHistory: () => History;

    /** Returns how many hearts have been collected with Immaculate Conception. */
    GetImmaculateConceptionState: () => int;

    SetItemState: (collectible: CollectibleType) => void;

    /** Returns the number of coins spent while possessing Keeper's Sack. */
    GetKeepersSackBonus: () => int;

    /** Returns the player's laser color. */
    GetLaserColor: () => Color;

    GetLuckModifier: () => int;

    /**
     * Returns how many frames are left until Tainted Magdalene's swing attack can be used again.
     * Returns 0 if the player is not Tainted Magdalene.
     */
    GetMaggySwingCooldown: () => int;

    /** Returns the Marked target effect, if it exists. Otherwise, returns undefined. */
    GetMarkedTarget: () => EntityEffect | undefined;

    GetMaxBladderCharge: () => int;
    GetMaxPeeBurstCooldown: () => int;
    GetMaxPocketItems: () => int;

    /** Returns how many frames until the effects of Mega Blast stop. */
    GetMegaBlastDuration: () => int;

    GetMetronomeCollectibleID: () => CollectibleType;

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
     * Returns the amount of frames left until the charging effect from the A Pony or White Pony
     * item deactivates.
     */
    GetPonyCharge: () => int;

    /**
     * Returns the state in which the Purity item effect currently is. Returns `PurityState.BLUE` if
     * the player does not have the Purity collectible.
     */
    GetPurityState: () => PurityState;

    /**
     * Repentogon's modified `EntityPlayer.HasCollectible` method.
     *
     * Behaves the same as `EntityPlayer.AddCacheFlags` except you can now choose to have it ignore
     * blocked items.
     *
     * This method has been renamed to include "Ex" so it can not conflict with the vanilla type
     * definitions. However, when the project compiles the method's name will change to what it's
     * supposed to be.
     *
     * @param collectibleType
     * @param ignoreModifiers If set to true, only counts collectibles the player actually owns and
     *                        ignores effects granted by items like Zodiac, 3 Dollar Bill and
     *                        Lemegeton. Default is false.
     * @param ignoreBlocked Optional. Default is false.
     * @customName HasCollectible
     */
    HasCollectibleEx: (
      collectibleType: CollectibleType,
      ignoreModifiers?: boolean,
      ignoreBlocked?: boolean,
    ) => boolean;

    /**
     * Returns whether the player has a question mark as their extra life count indicating a %
     * chance to revive (i.e. Guppy's Collar).
     */
    HasChanceRevive: () => boolean;

    HasGoldenTrinket: (trinket: TrinketType) => boolean;

    IsCollectibleBlocked: (collectible: CollectibleType) => boolean;

    SetBlackHeart: (blackHearts: int) => void;
    SetBloodLustCounter: (counter: int) => void;
    SetBombPlaceDelay: (delay: int) => void;
    SetCambionFamiliarFlags: (flags: BitFlags<ConceptionFamiliarFlag>) => void;
    SetHallowedGroundCountdown: (countdown: int) => void;

    /**
     * Sets the duration of the damage bonus given by the Red Stew collectible to the specified
     * amount of frames. Setting the duration above 0 will activate the effect if it wasn't active
     * already.
     */
    SetRedStewBonusDuration: (duration: int) => void;

    SetShotSpeedModifier: (modifier: int) => void;
    SetSpeedModifier: (modifier: int) => void;

    GetSpoofedCollectiblesList: () => Array<{
      CollectibleID: CollectibleType;
      AppendedCount: int;
      IsBlocked: boolean;
    }>;

    SetTearPoisonDamage: (damage: number) => void;
    SetTearRangeModifier: (modifier: int) => void;

    /**
     * Sets whether the tear spam attack from the Kidney Stone collectible is about to activate. If
     * the player does not have the Kidney Stone collectible, the effect is immediately activated.
     *
     * @param blocked This argument does nothing if it is set to false. This is a bug.
     */
    SetUrethraBlock: (blocked: boolean) => void;

    SetWeapon: (weapon: Weapon, slot: int) => void;

    /** Shoots a blue flame from the Candle collectible. */
    ShootBlueCandle: (direction: Vector) => void;

    /**
     * Randomizes the player's current costumes.
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

    /** Spawns a ring of tears that orbit around the player akin to the Saturnus collectible. */
    SpawnSaturnusTears: () => void;

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

    /** Triggers the room clear events. */
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
     * Adds a heart container to the player if there are none to prevent death, depending on the
     * player's `HealthType`.
     *
     * Returns whether the death was prevented successfully.
     */
    TryPreventDeath: () => boolean;

    /** Attempts to remove a smelted trinket from the player. */
    TryRemoveSmeltedTrinket: (trinket: TrinketType) => void;

    UnblockCollectible: (collectible: CollectibleType) => void;

    UpdateIsaacPregnancy: (updateCambion: boolean) => void;

    /** Returns whether the player has consumed the specified collectible with Void. */
    VoidHasCollectible: (collectible: CollectibleType) => boolean;

    BabySkin: BabySubType;
  }
}
