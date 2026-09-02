import type { ActiveSlot } from "../../enums/ActiveSlot";
import type { CollectibleAnimation } from "../../enums/CollectibleAnimation";
import type {
  BabySubType,
  CardType,
  CollectibleType,
  DipFamiliarSubType,
  PillColor,
  PlayerType,
  TrinketType,
} from "../../enums/collections/subTypes";
import type {
  BombVariant,
  FamiliarVariant,
  PlayerVariant,
} from "../../enums/collections/variants";
import type { ControllerIndex } from "../../enums/ControllerIndex";
import type { Direction } from "../../enums/Direction";
import type { CacheFlag } from "../../enums/flags/CacheFlag";
import type { DamageFlag } from "../../enums/flags/DamageFlag";
import type { TearFlag } from "../../enums/flags/TearFlag";
import type { UseFlag } from "../../enums/flags/UseFlag";
import type { ItemPoolType } from "../../enums/ItemPoolType";
import type { LaserOffset } from "../../enums/LaserOffset";
import type { NullItemID } from "../../enums/NullItemID";
import type { PillEffect } from "../../enums/PillEffect";
import type { PlayerForm } from "../../enums/PlayerForm";
import type { PlayerItemAnimation } from "../../enums/PlayerItemAnimation";
import type { PocketItemSlot } from "../../enums/PocketItemSlot";
import type { PoopSpellType } from "../../enums/PoopSpellType";
import type { SkinColor } from "../../enums/SkinColor";
import type { TrinketSlot } from "../../enums/TrinketSlot";
import type { WeaponType } from "../../enums/WeaponType";

declare global {
  interface EntityPlayer extends Entity {
    /** 1 unit is half a heart. Remove them with negative numbers. */
    readonly AddBlackHearts: (blackHearts: int) => void;

    /** Adds Tainted Bethany's blood charges. Only works on Tainted Bethany. */
    readonly AddBloodCharge: (num: int) => void;

    /**
     * @param amount
     * @param position
     * @param target This argument is not optional. If you want to spawn a fly without a target,
     *               then you must explicitly pass undefined.
     */
    readonly AddBlueFlies: (
      amount: int,
      position: Vector,
      target: Entity | undefined,
    ) => Entity;

    readonly AddBlueSpider: (position: Vector) => Entity;

    /** Remove them with negative numbers. */
    readonly AddBombs: (amount: int) => void;

    /** Remove them with negative numbers. */
    readonly AddBoneHearts: (hearts: int) => void;

    /** Remove them with negative numbers. */
    readonly AddBrokenHearts: (hearts: int) => void;

    /**
     * Used to specify the kinds of stats that should be evaluated the next time the
     * `EntityPlayer.EvaluateCache` method is run.
     */
    readonly AddCacheFlags: (
      cacheFlags: CacheFlag | BitFlags<CacheFlag>,
    ) => void;

    readonly AddCard: (cardType: CardType) => void;

    /** Remove them with negative numbers. */
    readonly AddCoins: (amount: int) => void;

    /**
     * Note that adding a collectible to `ActiveSlot.POCKET` or `ActiveSlot.POCKET_SINGLE_USE` will
     * not work properly. For those cases, use `EntityPlayer.SetPocketActiveItem` instead.
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
     * @param itemPoolType This parameter was added in Repentance+.
     */
    readonly AddCollectible: (
      collectibleType: CollectibleType,
      charge?: int,
      firstTimePickingUp?: boolean,
      activeSlot?: ActiveSlot.PRIMARY | ActiveSlot.SECONDARY,
      varData?: int,
      itemPoolType?: ItemPoolType,
    ) => void;

    readonly AddControlsCooldown: (cooldown: int) => void;
    readonly AddCostume: (
      itemConfigItem: ItemConfigItem,
      itemStateOnly: boolean,
    ) => void;

    /**
     * Disables all item effects, similar to what happens in the abandoned mineshaft in Mines II.
     * This also temporarily removes consumables and pocket items.
     */
    readonly AddCurseMistEffect: () => void;

    readonly AddDeadEyeCharge: () => void;
    readonly AddDollarBillEffect: () => void;

    /** Remove them with negative numbers. */
    readonly AddEternalHearts: (eternalHearts: int) => void;

    /** Spawns a friendly dip from Dirty Mind. */
    readonly AddFriendlyDip: (
      subType: DipFamiliarSubType,
      position: Vector,
    ) => EntityFamiliar;

    /**
     * Turns the given number of bombs into giga bombs.
     *
     * This does not actually increase the number of bombs held. To actually add bombs, the
     * `EntityPlayer.AddBombs` method should be called first.
     *
     * @param num
     */
    readonly AddGigaBombs: (num: int) => void;

    /** Remove them with negative numbers. */
    readonly AddGoldenBomb: () => void;

    readonly AddGoldenHearts: (hearts: int) => void;
    readonly AddGoldenKey: () => void;

    /**
     * Adds red hearts to the player if there are any empty heart containers. 1 unit is half a
     * heart. Remove health with negative numbers.
     */
    readonly AddHearts: (hearts: int) => void;

    /**
     * Spawns a Lemegeton wisp.
     *
     * @param subType The ID of the passive item to mimic.
     * @param position
     * @param adjustOrbitLayer Default is false.
     */
    readonly AddItemWisp: (
      subType: int,
      position: Vector,
      adjustOrbitLayer?: boolean,
    ) => EntityFamiliar;

    readonly AddJarFlies: (flies: int) => void;
    readonly AddJarHearts: (hearts: int) => void;

    /** Remove them with negative numbers. */
    readonly AddKeys: (amount: int) => void;

    /**
     * Adds heart containers to the player. 2 units is a full heart container.
     *
     * Remove them with negative numbers.
     */
    readonly AddMaxHearts: (maxHearts: int, ignoreKeeper: boolean) => void;

    /**
     * Spawns a mini Isaac from Giant Cell.
     *
     * @param position
     * @param playAnim If false, skips the appear animation for the familiars.
     */
    readonly AddMinisaac: (
      position: Vector,
      playAnim?: boolean,
    ) => EntityFamiliar;

    readonly AddNullCostume: (nullItemID: NullItemID) => void;
    readonly AddPill: (pillColor: PillColor) => void;
    readonly AddPlayerFormCostume: (playerForm: PlayerForm) => void;

    /** Adds (or removes) poop consumables from the player. */
    readonly AddPoopMana: (num: int) => void;

    readonly AddPrettyFly: () => void;

    /**
     * Remove them with negative numbers.
     *
     * Note that this method is not actually equivalent to picking up a rotten heart, since it will
     * only grant one rotten heart to Tainted Magdalene (whereas picking up a rotten heart would
     * grant two).
     *
     * @param hearts Rotten hearts must be specified in a multiple of 2. For example,
     *               `AddRottenHearts(4)` will add 2 rotten hearts.
     */
    readonly AddRottenHearts: (hearts: int) => void;

    /** Adds Bethany's soul heart charges. Only works on Bethany. */
    readonly AddSoulCharge: (num: int) => void;

    /** 1 unit is half a heart. Remove them with negative numbers. */
    readonly AddSoulHearts: (soulHearts: int) => void;

    /** Spawns a defensive fly from The Swarm. */
    readonly AddSwarmFlyOrbital: (position: Vector) => EntityFamiliar;

    /**
     * - If the player does not have any open trinket slots, this function will do nothing.
     * - If the player has an open trinket slot but already has a trinket, the new trinket will go
     *   to the first slot and the existing trinket will get pushed back to the second slot.
     * - If you provide an argument of 0 or an otherwise invalid trinket ID, the game will crash.
     *
     * @param trinketType
     * @param firstTimePickingUp Setting this to false will not spawn or add pickups for the item
     *                           and will not cause it to count towards transformations. Default is
     *                           true.
     */
    readonly AddTrinket: (
      trinketType: TrinketType,
      firstTimePickingUp?: boolean,
    ) => void;

    /**
     * Spawns a Book of Virtues wisp.
     *
     * @param subType The ID of the active item to spawn a wisp from. Wisps with a special ID (for
     *                example "s0" in wisps.xml) can be spawned with the subtype 65536 + X where X
     *                is the number after the "s".
     * @param position
     * @param adjustOrbitLayer If true, allows wisps to spawn outside of their usual orbit if their
     *                         assigned orbit is full. Default is false.
     * @param dontUpdate If true, the spawned wisp will not update immediately. This allows certain
     *                   properties to be set on the first frame before the wisp is fully
     *                   initialized. Default is false.
     */
    readonly AddWisp: (
      subType: int,
      position: Vector,
      adjustOrbitLayer?: boolean,
      dontUpdate?: boolean,
    ) => EntityFamiliar;

    /**
     * Play the animation that is normally played at the beginning of a stage (where Isaac is laying
     * down).
     */
    readonly AnimateAppear: () => void;

    /**
     * @param cardType
     * @param playerItemAnimation Default is "Pickup".
     */
    readonly AnimateCard: (
      cardType: CardType,
      playerItemAnimation?: PlayerItemAnimation,
    ) => void;

    /**
     * @param collectibleType
     * @param playerItemAnimation Default is "Pickup".
     * @param collectibleAnimation Default is "PlayerPickupSparkle".
     */
    readonly AnimateCollectible: (
      collectibleType: CollectibleType,
      playerItemAnimation?: PlayerItemAnimation,
      collectibleAnimation?: CollectibleAnimation,
    ) => void;

    /** Plays the "thumbs up" animation. Also plays `SoundEffect.THUMBS_UP`. */
    readonly AnimateHappy: () => void;

    /** Play the animation where Isaac steps into a beam of light (e.g. at the end of Womb 2). */
    readonly AnimateLightTravel: () => void;

    /**
     * Plays a pickup animation using any supplied Sprite object.
     *
     * @param sprite
     * @param hideShadow Default is false. This should be usually set to true when rendering a
     *                   sprite with a custom shadow layer.
     * @param animation Default is "Pickup".
     */
    readonly AnimatePickup: (
      sprite: Sprite,
      hideShadow?: boolean,
      animation?: string,
    ) => void;

    /**
     * @param pillColor
     * @param playerItemAnimation Default is "Pickup".
     */
    readonly AnimatePill: (
      pillColor: PillColor,
      playerItemAnimation?: PlayerItemAnimation,
    ) => void;

    readonly AnimatePitfallIn: () => void;
    readonly AnimatePitfallOut: () => void;

    /**
     * Play the animation where Isaac holds his head in his hands. Also plays
     * `SoundEffect.SOUND_THUMBS_DOWN`.
     */
    readonly AnimateSad: () => void;

    readonly AnimateTeleport: (up: boolean) => void;
    readonly AnimateTrapdoor: () => void;

    /**
     * @param trinketType
     * @param playerItemAnimation Default is "Pickup".
     * @param spriteAnimation Default is "PlayerPickupSparkle".
     */
    readonly AnimateTrinket: (
      trinketType: TrinketType,
      playerItemAnimation?: PlayerItemAnimation,
      spriteAnimation?: string,
    ) => void;

    readonly AreControlsEnabled: () => boolean;
    readonly AreOpposingShootDirectionsPressed: () => boolean;

    /** @param collectibleType Default is `CollectibleType.NULL`. */
    readonly CanAddCollectible: (collectibleType?: CollectibleType) => boolean;

    /** Returns true if the player can pick up black hearts, false otherwise. */
    readonly CanPickBlackHearts: () => boolean;

    /** Returns true if the player can pick up bone hearts, false otherwise. */
    readonly CanPickBoneHearts: () => boolean;

    /** Returns true if the player can pick up golden hearts, false otherwise. */
    readonly CanPickGoldenHearts: () => boolean;

    /** Returns true if the player can pick up red hearts, false otherwise. */
    readonly CanPickRedHearts: () => boolean;

    /** Returns true if the player can pick up rotten hearts, false otherwise. */
    readonly CanPickRottenHearts: () => boolean;

    /** Returns true if the player can pick up soul hearts, false otherwise. */
    readonly CanPickSoulHearts: () => boolean;

    readonly CanPickupItem: () => boolean;
    readonly CanShoot: () => boolean;

    /**
     * When the player presses the different shoot buttons, Isaac will normally turn his head to
     * face the direction that he is supposed to shoot in. This returns true if head will react to
     * shooting, false otherwise.
     */
    readonly CanTurnHead: () => boolean;

    /**
     * Changes the current character of the player. This will attempt to merge forms when called on
     * characters like Jacob and Esau. This does not work correctly when changing from/to certain
     * characters (i.e. Tainted Isaac).
     *
     * If you attempt to change to an invalid character, the game will crash.
     */
    readonly ChangePlayerType: (character: PlayerType) => void;

    /**
     * Spawns the appropriate amount of familiars associated with a custom collectible.
     *
     * - If the target count specified is less than the current amount of familiars, it will spawn
     *   more until the target count is met.
     * - If the target count specified is than the current amount of familiars, it will despawn
     *   familiars until the target count is met.
     *
     * Note that this function is bugged in that it will not increment the provided RNG. This is bad
     * because if you provide the player's collectible RNG as the argument for `rng`, all of the
     * resulting spawned familiars will have the same `InitSeed`. Since `InitSeed` is the main way
     * to identify unique familiars, it is important that each familiar has a unique `InitSeed`.
     * Thus, a brand new RNG object should always be passed to the `EntityPlayer.CheckFamiliar`
     * method so that each new spawned familiar will have a new, random `InitSeed`. Subsequently,
     * you should handle random familiar events not with an RNG object based on the familiar's
     * `InitSeed`, but with a data structure that maps familiar `InitSeed` to RNG objects that are
     * initialized based on the seed from the `EntityPlayer.GetCollectibleRNG` method.
     *
     * It is recommended to avoid using this method directly and use the `checkFamiliar` or
     * `checkFamiliarFromCollectible` helper functions from the IsaacScript standard library
     * instead.
     *
     * @param familiarVariant In most cases, use the familiar variant for your custom familiar.
     * @param targetCount The expected amount of this `FamiliarVariant` that this `EntityPlayer`
     *                    should have. This argument can simply be how many of an item that the
     *                    current EntityPlayer owns. However, if you want your familiar to synergize
     *                    with Monster Manual and Box of Friends, then this argument should be
     *                    `EntityPlayer.GetCollectibleNum(collectibleType) +
     *                    EntityPlayer.GetEffects().GetCollectibleEffectNum(collectibleType)`.
     * @param rng Always use a brand new RNG object. (See the previous explanation on why you should
     *            not use the RNG from the `EntityPlayer.GetCollectibleRNG` method.)
     * @param sourceItemConfigItem The `ItemConfigItem` that this familiar was created by. Default
     *                             is undefined. This should always be specified so that Sacrificial
     *                             Altar will work properly. (It informs the game which collectible
     *                             should be removed if the familiar is tagged with the
     *                             "cansacrifice" entity tag.) This can be obtained with:
     * `Isaac.GetItemConfig().GetCollectible(collectibleType)`
     * @param familiarSubType The subtype of the familiar to check. Default is -1, which matches
     *                        every sub-type.
     */
    readonly CheckFamiliar: (
      familiarVariant: FamiliarVariant,
      targetCount: int,
      rng: RNG,
      sourceItemConfigItem?: ItemConfigItem,
      familiarSubType?: int,
    ) => void;

    readonly ClearCostumes: () => void;
    readonly ClearDeadEyeCharge: () => void;

    /** Called automatically by the game when the player exits a room. */
    readonly ClearTemporaryEffects: () => void;

    /**
     * Sets the charge of the active item to 0 without triggering the active item effect.
     *
     * @param activeSlot Default is `ActiveSlot.SLOT_PRIMARY`.
     */
    readonly DischargeActiveItem: (activeSlot?: ActiveSlot) => void;

    readonly DoZitEffect: (direction: Vector) => void;
    readonly DonateLuck: (luck: int) => void;
    readonly DropPocketItem: (
      pocketItemSlot: PocketItemSlot,
      position: Vector,
    ) => void;

    /** If the player does not currently have a trinket, this function will be a no-op. */
    readonly DropTrinket: (dropPos: Vector, replaceTick: boolean) => void;

    /**
     * Triggers the `EVALUATE_CACHE` callback. Before calling this function, you need to set the
     * appropriate cache flags by using the `EntityPlayer.AddCacheFlag` method.
     */
    readonly EvaluateItems: () => void;

    /**
     * @param position
     * @param velocity
     * @param source Default is undefined.
     */
    readonly FireBomb: (
      position: Vector,
      velocity: Vector,
      source?: Entity,
    ) => EntityBomb;

    /**
     * @param direction
     * @param source Default is undefined.
     * @param damageMultiplier Default is 1.
     */
    readonly FireBrimstone: (
      direction: Vector,
      source?: Entity,
      damageMultiplier?: float,
    ) => EntityLaser;

    readonly FireDelayedBrimstone: (
      angle: float,
      parent: Entity,
    ) => EntityLaser;

    /**
     * @param parent
     * @param rotationOffset Default is 0.
     * @param cantOverwrite Default is false.
     * @param subType Default is 0.
     * @param variant Default is 0.
     */
    readonly FireKnife: (
      parent: Entity,
      rotationOffset?: float,
      cantOverwrite?: boolean,
      subType?: int,
      variant?: int,
    ) => EntityKnife;

    /**
     * @param position
     * @param velocity
     * @param canBeEye Default is true.
     * @param noTractorBeam Default is false.
     * @param canTriggerStreakEnd Default is true.
     * @param source Default is undefined.
     * @param damageMultiplier Default is 1.
     */
    readonly FireTear: (
      position: Vector,
      velocity: Vector,
      canBeEye?: boolean,
      noTractorBeam?: boolean,
      canTriggerStreakEnd?: boolean,
      source?: Entity,
      damageMultiplier?: float,
    ) => EntityTear;

    /**
     * @param position
     * @param laserOffset
     * @param direction
     * @param leftEye
     * @param oneHit Default is false.
     * @param source Default is undefined.
     * @param damageMultiplier Default is 1.
     */
    readonly FireTechLaser: (
      position: Vector,
      laserOffset: LaserOffset,
      direction: Vector,
      leftEye: boolean,
      oneHit?: boolean,
      source?: Entity,
      damageMultiplier?: float,
    ) => EntityLaser;

    /**
     * @param position
     * @param direction
     * @param radius
     * @param source Default is undefined.
     * @param damageMultiplier Default is 1.
     */
    readonly FireTechXLaser: (
      position: Vector,
      direction: Vector,
      radius: float,
      source?: Entity,
      damageMultiplier?: float,
    ) => EntityLaser;

    readonly FlushQueueItem: () => boolean;

    /**
     * @param activeSlot Default is `ActiveSlot.SLOT_PRIMARY`.
     * @param force If set, items will always be charged even if they normally cannot be recharged
     *              by batteries.
     */
    readonly FullCharge: (activeSlot?: ActiveSlot, force?: boolean) => boolean;

    /** @param activeSlot Default is `ActiveSlot.SLOT_PRIMARY`. */
    readonly GetActiveCharge: (activeSlot?: ActiveSlot) => int;

    /**
     * Returns `CollectibleType.NULL` (0) if no item is held.
     *
     * @param activeSlot Default is `ActiveSlot.SLOT_PRIMARY`.
     */
    readonly GetActiveItem: (activeSlot?: ActiveSlot) => CollectibleType;

    /**
     * Returns 0 if there is no active item in the specified slot.
     *
     * @param activeSlot Default is ActiveSlot.SLOT_PRIMARY.
     */
    readonly GetActiveSubCharge: (activeSlot?: ActiveSlot) => int;

    readonly GetActiveWeaponEntity: () => Entity;
    readonly GetAimDirection: () => Readonly<Vector>;
    readonly GetBabySkin: () => BabySubType;

    /** @param activeSlot Default is ActiveSlot.SLOT_PRIMARY. */
    readonly GetBatteryCharge: (activeSlot?: ActiveSlot) => int;

    /** Returns the bit mask for which soul hearts are black hearts. */
    readonly GetBlackHearts: () => int;

    /**
     * Gets Tainted Bethany's blood charges. Returns 0 on characters other than Tainted Bethany. (It
     * is unknown how this method is different from `EntityPlayer.GetEffectiveBloodCharge`.)
     */
    readonly GetBloodCharge: () => int;

    readonly GetBodyColor: () => SkinColor;

    /** There is no separate `BombFlag` enum, so bombs use `TearFlag`. */
    readonly GetBombFlags: () => BitFlags<TearFlag>;

    readonly GetBombVariant: (
      tearFlags: TearFlag | BitFlags<TearFlag>,
      forceSmallBomb: boolean,
    ) => BombVariant;

    /**
     * Returns the amount of bone hearts that the player has. This is not doubled like the
     * `EntityPlayer.GetMaxHearts` method is, so if e.g. the player has 3 bone hearts, this will
     * return 3.
     */
    readonly GetBoneHearts: () => int;

    /**
     * Returns the amount of broken hearts that the player has. This is not doubled like the
     * `EntityPlayer.GetMaxHearts` method is, so if e.g. the player has 3 broken hearts, this will
     * return 3.
     */
    readonly GetBrokenHearts: () => int;

    /** Returns `CardType.NULL` (0) if there is no card. */
    readonly GetCard: (pocketItemSlot: PocketItemSlot) => CardType;

    readonly GetCardRNG: (cardType: CardType) => RNG;

    /**
     * Returns the total amount of collectibles that the player has. For example, if the player has
     * 1 Sad Onion and 2 Inner Eyes, then this function will return 3.
     */
    readonly GetCollectibleCount: () => int;

    /**
     * @param collectibleType
     * @param onlyCountTrueItems If set to true, the function only counts collectibles that the
     *                           player actually owns and ignores things like Lilith's Incubus,
     *                           items granted by 3 Dollar Bill, and so forth.
     */
    readonly GetCollectibleNum: (
      collectibleType: CollectibleType,
      onlyCountTrueItems?: boolean,
    ) => int;

    readonly GetCollectibleRNG: (collectibleType: CollectibleType) => RNG;

    readonly GetCostumeNullPos: (
      nullFrameName: string,
      headScale: boolean,
      direction: Vector,
    ) => Vector;

    /**
     * When the player is hit, they will flash a different color and receive invulnerability frames.
     * This method returns the amount of invulnerability frames. Normally, the player will receive
     * 60 invulnerability frames when dealt a half-heart of damage or 120 invulnerability frames
     * when dealt a full heart of damage. Additionally, the Blind Rage trinket can affect how
     * invulnerability frames are granted.
     *
     * Note that the frames returned by this function are render frames, not game frames.
     */
    readonly GetDamageCooldown: () => int;

    /**
     * Gets Tainted Bethany's blood charges. Returns 0 on characters other than Tainted Bethany. (It
     * is unknown how this method is different from `EntityPlayer.GetBloodCharge`.)
     */
    readonly GetEffectiveBloodCharge: () => int;

    /**
     * Returns the amount of red hearts the player can have in their normal heart containers and
     * bone heart containers. 1 unit is half a red heart. For example, if you have 3 red heart
     * containers and 1 bone heart container, then this function would return 8 (i.e. 6 + 2).
     */
    readonly GetEffectiveMaxHearts: () => int;

    /**
     * Gets Bethany's soul heart charges. Returns 0 on characters other than Bethany. (It is unknown
     * how this function is different from `EntityPlayer.GetSoulCharge`.)
     */
    readonly GetEffectiveSoulCharge: () => int;

    readonly GetEffects: () => TemporaryEffects;
    readonly GetEternalHearts: () => int;
    readonly GetExtraLives: () => int;
    readonly GetFireDirection: () => Direction;
    readonly GetFlyingOffset: () => Vector;
    readonly GetGoldenHearts: () => int;
    readonly GetGreedDonationBreakChance: () => float;
    readonly GetHeadColor: () => SkinColor;
    readonly GetHeadDirection: () => Direction;

    /**
     * Returns the maximum heart containers that the provided player can have. Normally, this is 12,
     * but it can change depending on the character (e.g. Keeper) and other things (e.g. Mother's
     * Kiss).
     *
     * This function automatically accounts for Broken Hearts. For example, if Isaac has one broken
     * heart, this function will return 22 instead of 24.
     */
    readonly GetHeartLimit: () => int;

    /**
     * Returns the amount of red hearts the player has inside their heart containers and bone
     * hearts. 1 unit is half a heart.
     */
    readonly GetHearts: () => int;

    readonly GetItemState: () => CollectibleType;
    readonly GetJarFlies: () => int;
    readonly GetJarHearts: () => int;
    readonly GetLaserOffset: (
      laserOffset: LaserOffset,
      direction: Vector,
    ) => Vector;
    readonly GetLastActionTriggers: () => int;
    readonly GetLastDamageFlags: () => BitFlags<DamageFlag>;
    readonly GetLastDamageSource: () => Readonly<EntityRef>;
    readonly GetLastDirection: () => Readonly<Vector>;

    /**
     * - When called on Jacob or Esau, returns Jacob.
     * - When called on Tainted Forgotten or Tainted Forgotten's Soul, returns Tainted Forgotten.
     * - When called on any other character, returns that character.
     */
    readonly GetMainTwin: () => EntityPlayer;

    /**
     * Returns the amount of heart containers that the player has. 1 unit is half a heart container.
     */
    readonly GetMaxHearts: () => int;

    /**
     * Returns the maximum number of pocket items + pocket actives that the player can currently
     * hold.
     *
     * - Usually, this will return 1.
     * - If the player has Polydactyly, Starter Deck, or Little Baggy, it will increment the number
     *   by 1.
     * - If the player has a pocket active item, it will increment the number by 1.
     * - If the player has a dice from the Dice Bag trinket, it will increment the number by 1.
     * - The maximum number this can return is 4.
     */
    readonly GetMaxPocketItems: () => int;

    /** Returns the max amount of poop consumables that can be held by the player. */
    readonly GetMaxPoopMana: () => int;

    /**
     * Returns the maximum number of trinkets that the player can currently hold. Usually, this will
     * return 1, but the player can hold up to 2 trinkets under certain conditions (e.g. having
     * Mom's Purse).
     */
    readonly GetMaxTrinkets: () => int;

    /**
     * Returns the current passive item mimicked by Modeling Clay or CollectibleType.NULL if no
     * effect is being mimicked.
     */
    readonly GetModelingClayEffect: () => CollectibleType;

    readonly GetMovementDirection: () => Direction;
    readonly GetMovementInput: () => Vector;
    readonly GetMovementJoystick: () => Vector;
    readonly GetMovementVector: () => Readonly<Vector>;

    // `GetMultiShotParams` used to be used for the `GetMultiShotPositionVelocity` method, but since
    // that method is now removed, `GetMultiShotParams` has no purpose.

    /**
     * Normally, this function returns the player. However, in some cases, NPCs can be redirected to
     * attack another target, in which case this function will return the alternate target (e.g.
     * after using Best Friend).
     */
    readonly GetNPCTarget: () => Entity;

    /**
     * Returns the character name, like "Isaac" or "Cain". Note that this will return the localized
     * version of the character's name, e.g. "Magdalena" for Magdalene in Spanish.
     */
    readonly GetName: () => string;

    readonly GetNumBlueFlies: () => int;
    readonly GetNumBlueSpiders: () => int;
    readonly GetNumBombs: () => int;
    readonly GetNumCoins: () => int;

    /** Returns the number of giga bombs held. */
    readonly GetNumGigaBombs: () => int;

    readonly GetNumKeys: () => int;

    /**
     * - When called on Jacob, returns Esau.
     * - When called on Esau, returns Jacob.
     * - When called on Tainted Forgotten, returns Tainted Forgotten's Soul.
     * - When called on Tainted Forgotten's Soul, returns Tainted Forgotten.
     * - When called on any other character, returns undefined.
     */
    readonly GetOtherTwin: () => EntityPlayer | undefined;

    /** Returns `PillColor.NULL` (0) if there is no pill. */
    readonly GetPill: (pocketItemSlot: PocketItemSlot) => PillColor;

    readonly GetPillRNG: (pillEffect: PillEffect) => RNG;

    /** The player type is the sub-type of the player. This is equal to what character they are. */
    readonly GetPlayerType: () => PlayerType;

    // GetPocketItem is not implemented.

    /** Returns how many poop consumables the player is currently holding. */
    readonly GetPoopMana: () => int;

    /** Returns the poop spell at the given position in the player's spell queue. */
    readonly GetPoopSpell: (position: int) => PoopSpellType;

    /**
     * Returns the joystick direction that drives player movement, taking into account certain
     * modifiers like disabled controls and seed effects.
     */
    readonly GetRecentMovementVector: () => Readonly<Vector>;

    /**
     * This returns the number of rotten hearts.
     *
     * Unlike other heart functions, it returns the actual number of rotten hearts. For example,
     * this returns 2 if the player has 2 rotten hearts.
     */
    readonly GetRottenHearts: () => int;

    readonly GetShootingInput: () => Vector;
    readonly GetShootingJoystick: () => Vector;
    readonly GetSmoothBodyRotation: () => float;

    /**
     * Gets Bethany's soul heart charges. Returns 0 on characters other than Bethany. (It is unknown
     * how this function is different from `EntityPlayer.GetEffectiveSoulCharge`.)
     */
    readonly GetSoulCharge: () => int;

    /**
     * 1 unit is half a heart. Black hearts count toward this total.
     *
     * Remove them with negative numbers.
     */
    readonly GetSoulHearts: () => int;

    /**
     * - When on The Forgotten, returns the sub-player object for The Soul.
     * - When on The Soul, returns the sub-player object for The Forgotten.
     * - Otherwise, returns undefined.
     * - This will always return undefined if you call it on a sub-player. To get the "parent"
     *   player, use the `getSubPlayerParent` helper function.
     */
    readonly GetSubPlayer: () => EntitySubPlayer | undefined;

    /**
     * Used for tear parameters that are calculated on hit (e.g. Tough Love, Common Cold).
     *
     * @param weaponType
     * @param damageScale Default is 1.
     * @param tearDisplacement Default is 1.
     * @param source Default is undefined.
     */
    readonly GetTearHitParams: (
      weaponType: WeaponType,
      damageScale?: float,
      tearDisplacement?: int,
      source?: Entity,
    ) => TearParams;

    readonly GetTearMovementInheritance: (shotDirection: Vector) => Vector;
    readonly GetTearPoisonDamage: () => float;
    readonly GetTearRangeModifier: () => int;
    readonly GetTotalDamageTaken: () => int;
    readonly GetTractorBeam: () => Entity;

    /** Returns `TrinketType.NULL` (0) if there is no trinket. */
    readonly GetTrinket: (trinketSlot: TrinketSlot) => TrinketType;

    /**
     * This is the number of times that the trinket effect is applied.
     *
     * Returns 0 if the player does not have the particular trinket.
     */
    readonly GetTrinketMultiplier: (trinketType: TrinketType) => int;

    readonly GetTrinketRNG: (trinketType: TrinketType) => RNG;
    readonly GetVelocityBeforeUpdate: () => Readonly<Vector>;
    readonly GetZodiacEffect: () => ZodiacCollectibleType;

    /**
     * @param collectibleType
     * @param ignoreModifiers If set to true, only counts collectibles the player actually owns and
     *                        ignores effects granted by items like Zodiac, 3 Dollar Bill and
     *                        Lemegeton. Default is false.
     */
    readonly HasCollectible: (
      collectibleType: CollectibleType,
      ignoreModifiers?: boolean,
    ) => boolean;

    /** Returns true if the player's item effects are currently being disabled. */
    readonly HasCurseMistEffect: () => boolean;

    /** Returns true if all of the player's red heart containers are filled. */
    readonly HasFullHearts: () => boolean;

    /**
     * Returns true if the combined value of the player's red hearts and soul hearts is equal to or
     * greater than the value of the player's max hearts.
     */
    readonly HasFullHeartsAndSoulHearts: () => boolean;

    readonly HasGoldenBomb: () => boolean;
    readonly HasGoldenKey: () => boolean;

    /** @param damageFlag Default is 0. */
    readonly HasInvincibility: (
      damageFlag?: DamageFlag | BitFlags<DamageFlag>,
    ) => boolean;

    readonly HasPlayerForm: (playerForm: PlayerForm) => boolean;
    readonly HasTimedItem: () => boolean;

    /**
     * @param trinketType
     * @param ignoreModifiers If set to true, only counts trinkets the player actually holds and
     *                        ignores effects granted by other items. Default is false.
     */
    readonly HasTrinket: (
      trinketType: TrinketType,
      ignoreModifiers?: boolean,
    ) => boolean;

    readonly HasWeaponType: (weaponType: WeaponType) => boolean;
    readonly InitBabySkin: () => void;
    readonly IsBlackHeart: (heart: int) => boolean;
    readonly IsBoneHeart: (heartSlot: int) => boolean;

    /**
     * In a multiplayer game, if a player dies, they will return as a tiny ghost. This method
     * returns true if the player is a co-op ghost.
     */
    readonly IsCoopGhost: () => boolean;

    readonly IsExtraAnimationFinished: () => boolean;
    readonly IsFullSpriteRendering: () => boolean;
    readonly IsHeldItemVisible: () => boolean;

    /** Is the player holding up an item (card/collectible/etc.)? */
    readonly IsHoldingItem: () => boolean;

    readonly IsItemQueueEmpty: () => boolean;
    readonly IsP2Appearing: () => boolean;
    readonly IsPosInSpotLight: (position: Vector) => boolean;

    /**
     * Returns true for The Soul. Otherwise, returns false.
     *
     * Additionally, this also returns true for the player object representing Dead Tainted Lazarus
     * that fires at the beginning of the run in the `POST_PLAYER_INIT` callback. (The
     * `POST_PLAYER_INIT` callback fires first for Dead Tainted Lazarus before firing for the normal
     * Tainted Lazarus.)
     */
    readonly IsSubPlayer: () => boolean;

    /**
     * This will always return false for active items that have `chargetype="special"` set in the
     * `items.xml` file, even if they are not fully charged.
     *
     * @param activeSlot Default is `ActiveSlot.SLOT_PRIMARY`.
     */
    readonly NeedsCharge: (activeSlot?: ActiveSlot) => boolean;

    readonly PlayExtraAnimation: (animation: string) => void;
    readonly QueueExtraAnimation: (animation: string) => void;

    /**
     * When the player touches a collectible item, they are not granted it immediately. Instead, the
     * item is added to a queue for the duration of the animation where the player holds the item
     * above their head. When the animation is finished, the item(s) in the queue will be granted.
     * This method adds a new item to the item queue. If the player is not currently playing an
     * animation, then the queued item will simply be awarded instantly.
     *
     * @param itemConfigItem
     * @param charge Default is 0.
     * @param touched Default is false.
     * @param golden Default is false.
     * @param varData Default is false.
     */
    readonly QueueItem: (
      itemConfigItem: ItemConfigItem,
      charge?: int,
      touched?: boolean,
      golden?: boolean,
      varData?: int,
    ) => void;

    readonly RemoveBlackHeart: (blackHeart: int) => void;
    readonly RemoveBlueFly: () => void;
    readonly RemoveBlueSpider: () => void;

    /**
     * @param collectibleType
     * @param ignoreModifiers Ignores collectible effects granted by other items (i.e. Void).
     *                        Default is false.
     * @param activeSlot Sets the active slot this collectible should be removed from. Default is
     *                   `ActiveSlot.SLOT_PRIMARY`.
     * @param removeFromPlayerForm If successfully removed and part of a transformation, decrease
     *                             that transformation's counter by 1. Default is true.
     */
    readonly RemoveCollectible: (
      collectibleType: CollectibleType,
      ignoreModifiers?: boolean,
      activeSlot?: ActiveSlot,
      removeFromPlayerForm?: boolean,
    ) => void;

    readonly RemoveCostume: (itemConfigItem: ItemConfigItem) => void;

    /**
     * Re-enables item effects, consumables, and pocket items removed by
     * `EntityPlayer.AddCurseMistEffect`.
     */
    readonly RemoveCurseMistEffect: () => void;

    readonly RemoveGoldenBomb: () => void;
    readonly RemoveGoldenKey: () => void;

    /** Removes player-specific costumes like Magdalene's hair or Cain's eyepatch. */
    readonly RemoveSkinCostume: () => void;

    readonly RenderBody: (position: Vector) => void;
    readonly RenderGlow: (position: Vector) => void;
    readonly RenderHead: (position: Vector) => void;
    readonly RenderTop: (position: Vector) => void;

    readonly ReplaceCostumeSprite: (
      itemConfigItem: ItemConfigItem,
      spritePath: string,
      spriteID: int,
    ) => void;

    readonly ResetDamageCooldown: () => void;
    readonly ResetItemState: () => void;
    readonly RespawnFamiliars: () => void;
    readonly Revive: () => void;

    /**
     * @param charge
     * @param activeSlot Default is `ActiveSlot.SLOT_PRIMARY`.
     */
    readonly SetActiveCharge: (charge: int, activeSlot?: ActiveSlot) => void;

    /** This sets Tainted Bethany's blood charges. Only works on Tainted Bethany. */
    readonly SetBloodCharge: (num: int) => void;

    readonly SetCard: (
      pocketItemSlot: PocketItemSlot,
      cardType: CardType,
    ) => void;
    readonly SetFullHearts: () => void;
    readonly SetMinDamageCooldown: (damageCooldown: int) => void;
    readonly SetPill: (
      pocketItemSlot: PocketItemSlot,
      pillColor: PillColor,
    ) => void;

    /**
     * Sets the player's pocket active item to the given collectible.
     *
     * Items added to `ActiveSlot.POCKET_SINGLE_USE` will always be removed upon being used.
     *
     * Note that unlike the `EntityPlayer.AddCollectible` method, this function will remove the
     * collectible from pools by default.
     *
     * @param collectibleType
     * @param slot Can be either ActiveSlot.SLOT_POCKET or ActiveSlot.SLOT_POCKET2. Default is
     *             `ActiveSlot.SLOT_POCKET`.
     * @param keepInPools If true, the item will not be removed from the item pools. Default is
     *                    false.
     */
    readonly SetPocketActiveItem: (
      collectibleType: CollectibleType,
      slot?: ActiveSlot.POCKET | ActiveSlot.POCKET_SINGLE_USE,
      keepInPools?: boolean,
    ) => void;

    readonly SetShootingCooldown: (cooldown: int) => void;

    /**
     * This sets Bethany's soul heart charges.
     *
     * @param num
     */
    readonly SetSoulCharge: (num: int) => void;

    readonly SetTargetTrapDoor: (trapDoor: GridEntity) => void;
    readonly ShootRedCandle: (direction: Vector) => void;
    readonly SpawnMawOfVoid: (durationGameFrames: int) => EntityLaser;
    readonly StopExtraAnimation: () => void;

    /** This will do nothing if the player does not have a Schoolbag. */
    readonly SwapActiveItems: () => void;

    readonly ThrowBlueSpider: (position: Vector, target: Vector) => Entity;

    /**
     * Spawns a friendly dip (from Dirty Mind) and throws it towards the specified target.
     *
     * @param subType
     * @param position
     * @param target If Vector.Zero, throws the spawned dip in a random direction.
     */
    readonly ThrowFriendlyDip: (
      subType: DipFamiliarSubType,
      position: Vector,
      target: Vector,
    ) => EntityFamiliar;

    /**
     * If holding an entity, throws it in the specified direction and returns it. Otherwise, returns
     * undefined.
     *
     * @param velocity
     */
    readonly ThrowHeldEntity: (velocity: Vector) => Entity;

    /**
     * Triggers the extra effect granted by Book of Virtues for the given active item.
     *
     * @param collectibleType Default is `CollectibleType.NULL`.
     * @param charge Default is 0.
     */
    readonly TriggerBookOfVirtues: (
      collectibleType?: CollectibleType,
      charge?: int,
    ) => void;

    /**
     * Attempts to pick up the given entity, returns true on success.
     *
     * Currently only works with some entity types (mainly bombs and enemies).
     */
    readonly TryHoldEntity: (entity: Entity) => boolean;

    readonly TryHoldTrinket: (trinketType: TrinketType) => boolean;

    /**
     * This method will crash the game if you provide it an invalid collectible type, such as -1 or
     * 43. (Using 0 will not cause a crash.) Thus, it is safer to use the `RemoveCostume` method
     * instead.
     *
     * @param collectibleType
     * @param keepPersistent If set to false, this method will only remove temporary costumes.
     */
    readonly TryRemoveCollectibleCostume: (
      collectibleType: CollectibleType,
      keepPersistent: boolean,
    ) => void;

    readonly TryRemoveNullCostume: (nullItemID: NullItemID) => void;

    /**
     * Will remove the specified trinket, if it exists. This will also remove The Tick and smelted
     * trinkets.
     *
     * @param trinketType If you provide an argument of 0 or an otherwise invalid trinket ID, the
     *                    game will crash.
     * @returns Whether the specified trinket was removed successfully.
     */
    readonly TryRemoveTrinket: (trinketType: TrinketType) => boolean;

    /**
     * This method will crash the game if you provide it an invalid trinket type, such as -1, 0, or
     * 500. Thus, it is safer to use the `RemoveCostume` method instead.
     */
    readonly TryRemoveTrinketCostume: (trinketType: TrinketType) => void;

    readonly TryUseKey: () => boolean;
    readonly UpdateCanShoot: () => void;

    /**
     * @param collectibleType
     * @param useFlag Default is 0.
     * @param activeSlot The active slot this item was used from. (Set to -1 if this item was not
     *                   triggered by any active slot.) Default is `ActiveSlot.SLOT_PRIMARY`.
     * @param customVarData Default is 0.
     */
    readonly UseActiveItem: ((
      collectibleType: CollectibleType,
      useFlag?: UseFlag | BitFlags<UseFlag>,
      activeSlot?: ActiveSlot | -1,
      customVarData?: int,
    ) => void)
      & ((
        collectibleType: CollectibleType,
        showAnim: boolean,
        keepActiveItem: boolean,
        allowNonMainPlayer: boolean,
        toAddCostume: boolean,
        activeSlot?: ActiveSlot | -1,
        customVarData?: int,
      ) => void);

    /**
     * @param cardType
     * @param useFlag Default is 0.
     */
    readonly UseCard: (
      cardType: CardType,
      useFlag?: UseFlag | BitFlags<UseFlag>,
    ) => void;

    /**
     * @param pillEffect
     * @param pillColor
     * @param useFlag Default is 0.
     */
    readonly UsePill: (
      pillEffect: PillEffect,
      pillColor: PillColor,
      useFlag?: UseFlag | BitFlags<UseFlag>,
    ) => void;

    /** Triggers one of Tainted Blue Baby's poop spells. */
    readonly UsePoopSpell: (poopSpellType: PoopSpellType) => void;

    /**
     * This function will return true if the player has one or more extra lives or if a conditional
     * revival item will work on the next death.
     *
     * Right now, there are 3 items that grant conditional extra lives:
     *
     * - Guppy's Collar - This function will successfully predict whether the next revive from
     *   Guppy's Collar will work (50% chance).
     * - Broken Ankh - This function will successfully predict whether the next revive from Broken
     *   Ankh will work (22.22% chance).
     * - Mysterious Paper - This function will only successfully predict the revive from Missing
     *   Poster every 4 frames, because it evaluates only one of its 4 possible item effects each
     *   frame.
     */
    readonly WillPlayerRevive: () => boolean;

    BabySkin: BabySubType;

    /** Only change this in the `EVALUATE_CACHE` callback corresponding to `CacheFlag.FLYING`. */
    CanFly: boolean;

    readonly ControllerIndex: ControllerIndex;
    ControlsCooldown: int;
    ControlsEnabled: boolean;

    /** Only change this in the `EVALUATE_CACHE` callback corresponding to `CacheFlag.DAMAGE`. */
    Damage: float;

    FireDelay: int;

    // FriendBallEnemy is not implemented.

    HeadFrameDelay: int;

    /** Internally used by IBS. Increases based on damage dealt. Range is from 0-1. */
    IBSCharge: float;

    ItemHoldCooldown: int;
    LaserColor: Color;

    /** Only change this in the `EVALUATE_CACHE` callback corresponding to `CacheFlag.LUCK`. */
    Luck: float;

    /**
     * Only change this in the `EVALUATE_CACHE` callback corresponding to `CacheFlag.FIRE_DELAY`.
     */
    MaxFireDelay: int;

    /** Only change this in the `EVALUATE_CACHE` callback corresponding to `CacheFlag.SPEED`. */
    MoveSpeed: float;

    QueuedItem: QueueItemData;

    /**
     * Internally used by Tainted Samson. Increases based on damage dealt. Range is from 0-100000.
     */
    SamsonBerserkCharge: int;

    /**
     * Only change this in the `EVALUATE_CACHE` callback corresponding to `CacheFlag.SHOT_SPEED`.
     */
    ShotSpeed: float;

    /**
     * Only change this in the `EVALUATE_CACHE` callback corresponding to `CacheFlag.TEAR_COLOR`.
     */
    TearColor: Color;

    /** Only change this in the `EVALUATE_CACHE` callback corresponding to `CacheFlag.RANGE`. */
    TearFallingAcceleration: float;

    /** Only change this in the `EVALUATE_CACHE` callback corresponding to `CacheFlag.RANGE`. */
    TearFallingSpeed: float;

    /** Only change this in the `EVALUATE_CACHE` callback corresponding to `CacheFlag.TEAR_FLAG`. */
    TearFlags: BitFlags<TearFlag>;

    /**
     * This is equal to the range stat multiplied by -1.
     *
     * Only change this in the `EVALUATE_CACHE` callback corresponding to `CacheFlag.RANGE`.
     */
    TearHeight: float;

    /**
     * This is equal to the range stat multiplied by 40.
     *
     * Only change this in the `EVALUATE_CACHE` callback corresponding to `CacheFlag.RANGE`.
     */
    TearRange: float;

    TearsOffset: Readonly<Vector>;
    Variant: PlayerVariant;
  }
}
