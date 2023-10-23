import type { BossID } from "../../enums/collections/roomSubTypes";
import type { SlotVariant } from "../../enums/collections/variants";
import type { EntityCollisionClass } from "../../enums/EntityCollisionClass";
import type { EntityGridCollisionClass } from "../../enums/EntityGridCollisionClass";
import type { EntityType } from "../../enums/EntityType";
import type { DamageFlag } from "../../enums/flags/DamageFlag";
import type { EntityFlag } from "../../enums/flags/EntityFlag";
import type { SortingLayer } from "../../enums/SortingLayer";

declare global {
  interface Entity extends IsaacAPIClass {
    /**
     * Adds a burn effect to the entity.
     *
     * @param source Required. If you do not want the effect to have a source, pass
     *               `EntityRef(undefined)`.
     * @param duration The number of frames that the effect should apply for. The minimum is 2
     *                 frames.
     * @param damage The damage taken per tick. Each damage tick is 20 frames apart.
     */
    AddBurn: (source: EntityRef, duration: int, damage: float) => void;

    /**
     * Adds a charmed effect to the entity.
     *
     * @param source Required. If you do not want the effect to have a source, pass
     *               `EntityRef(undefined)`.
     * @param duration The number of frames that the effect should apply for. If set to -1, the
     *                 effect will be permanent and the entity will follow you to different rooms.
     */
    AddCharmed: (source: EntityRef, duration: int) => void;

    /**
     * Adds a confusion effect to the entity.
     *
     * @param source Required. If you do not want the effect to have a source, pass
     *               `EntityRef(undefined)`.
     * @param duration The number of frames that the effect should apply for. The maximum is 150.
     * @param ignoreBosses
     */
    AddConfusion: (
      source: EntityRef,
      duration: int,
      ignoreBosses: boolean,
    ) => void;

    /**
     * Adds one or more `EntityFlag` to the entity. Flags are used to add specific effects like
     * being friendly or being shrunk.
     */
    AddEntityFlags: (entityFlags: EntityFlag | BitFlags<EntityFlag>) => void;

    /**
     * Adds a fear effect to the entity.
     *
     * @param source Required. If you do not want the effect to have a source, pass
     *               `EntityRef(undefined)`.
     * @param duration The number of frames that the effect should apply for. The maximum is 150.
     */
    AddFear: (source: EntityRef, duration: int) => void;

    /**
     * Adds a freeze effect to the entity.
     *
     * @param source Required. If you do not want the effect to have a source, pass
     *               `EntityRef(undefined)`.
     * @param duration The number of frames that the effect should apply for. The maximum is 150.
     */
    AddFreeze: (source: EntityRef, duration: int) => void;

    /** Heals the entity. */
    AddHealth: (hitPoints: float) => void;

    /**
     * Turns the entity into a gold statue. Effectively, this means that they cannot move, cannot
     * attack, and drop coins when killed.
     *
     * @param source Required. If you do not want the effect to have a source, pass
     *               `EntityRef(undefined)`.
     * @param duration The number of frames that the effect should apply for. The maximum is 150.
     *                 (However, if a value higher than 150 is passed, the freeze will be reduced to
     *                 150 frames, but the gold color will persist for the full duration.)
     */
    AddMidasFreeze: (source: EntityRef, duration: int) => void;

    /**
     * Adds a poison effect to the entity.
     *
     * @param source Required. If you do not want the effect to have a source, pass
     *               `EntityRef(undefined)`.
     * @param duration The number of frames that the effect should apply for. The minimum is 2
     *                 frames. The maximum is 150.
     * @param damage The damage taken per tick. Each damage tick is 20 frames apart.
     */
    AddPoison: (source: EntityRef, duration: int, damage: float) => void;

    /**
     * Adds a shrink effect to the entity.
     *
     * @param source Required. If you do not want the effect to have a source, pass
     *               `EntityRef(undefined)`.
     * @param duration The number of frames that the effect should apply for.
     */
    AddShrink: (source: EntityRef, duration: int) => void;

    /**
     * Adds a slowing effect to the entity.
     *
     * @param source Required. If you do not want the effect to have a source, pass
     *               `EntityRef(undefined)`.
     * @param duration The number of frames that the effect should apply for.
     * @param slowValue This is the multiplier applied to the entity's movement speed. For example,
     *                  a value of 0.5 would slow down the entity by 50%.
     * @param slowColor
     */
    AddSlowing: (
      source: EntityRef,
      duration: int,
      slowValue: float,
      slowColor: Color,
    ) => void;

    AddVelocity: (velocity: Vector) => void;
    BloodExplode: () => void;

    // `CanShutDoors` is deliberately not implemented here because it conflicts with
    // `EntityNPC.CanShutDoors`.

    /** Removes one or more `EntityFlag` from the entity. */
    ClearEntityFlags: (entityFlags: EntityFlag | BitFlags<EntityFlag>) => void;

    /**
     * Returns true if the entity is currently colliding with a valid `GridEntity`, as dictated by
     * its `Entity.GridCollisionClass`.
     */
    CollidesWithGrid: () => boolean;

    Die: () => void;

    /**
     * Checks whether the entity is still spawned in the current room.
     *
     * This is mostly useful in situations where you are unwrapping an `EntityPtr` and the
     * corresponding entity may or may not have been killed in the interim period.
     */
    Exists: () => boolean;

    /**
     * Note that `BossID` is not equal to `EntityType`; see the `BossID` enum.
     *
     * Returns 0 if the entity is not a boss. It will also return 0 if this a custom boss without a
     * "bossID" attribute set in the "entities2.xml" file.
     */
    GetBossID: () => BossID | 0;

    GetColor: () => Readonly<Color>;

    /**
     * Returns a Lua table that contains mod-related data associated with the entity. Initially,
     * this will always be an empty table. Any values stored in the table by mods will persist until
     * the entity is despawned.
     *
     * Since this table can contain anything, the type is annotated as `Record<string, unknown>`. In
     * order to get type safety, you will want to probably want to use a type assertion on the data
     * to convert it to a more specific interface that represents your specific data.
     *
     * For more information, see the tutorial on the IsaacScript website:
     * https://isaacscript.github.io/main/using-get-data/
     */
    GetData: () => Record<string, unknown>;

    GetDropRNG: () => RNG;
    GetEntityFlags: () => EntityFlag | BitFlags<EntityFlag>;

    /**
     * Returns the last child of this entity. This is useful for certain segmented enemies so you
     * can go all the way to the bottom "tail" entity in one method call.
     */
    GetLastChild: () => Entity;

    /**
     * Returns the last parent of this entity. This is useful for certain segmented enemies so you
     * can go all the way to the top "head" entity in one method call.
     */
    GetLastParent: () => Entity;

    GetSprite: () => Sprite;
    HasCommonParentWithEntity: (other: Entity) => boolean;
    HasEntityFlags: (entityFlags: EntityFlag | BitFlags<EntityFlag>) => boolean;
    HasFullHealth: () => boolean;
    HasMortalDamage: () => boolean;

    /**
     * @deprecated Consider using the `isActiveEnemy` helper function from `isaacscript-common`
     *             instead, since it will correctly handle friendly entities, Grimaces, Ultra Greed,
     *             and Mother.
     */
    IsActiveEnemy: (includeDead: boolean) => boolean;

    IsBoss: () => boolean;
    IsDead: () => boolean;
    IsEnemy: () => boolean;
    IsFlying: () => boolean;
    IsFrame: (frame: int, offset: int) => boolean;
    IsInvincible: () => boolean;
    IsVisible: () => boolean;

    /** Returns true for enemies that can be damaged. */
    IsVulnerableEnemy: () => boolean;

    Kill: () => void;
    MultiplyFriction: (value: float) => void;
    PostRender: () => void;
    Remove: () => void;
    RemoveStatusEffects: () => void;
    Render: (offset: Vector) => void;
    RenderShadowLayer: (offset: Vector) => boolean;

    /**
     * @param color
     * @param duration
     * @param priority
     * @param fadeout Default value is false.
     * @param share Default value is false.
     */
    SetColor: (
      color: Color,
      duration: int,
      priority: int,
      fadeout?: boolean,
      share?: boolean,
    ) => void;

    SetSize: (
      size: float,
      sizeMulti: Vector,
      numGridCollisionPoints: int,
    ) => void;
    SetSpriteFrame: (animation: string, frameNum: int) => void;
    SetSpriteOverlayFrame: (animation: string, frameNum: int) => void;

    /**
     * The game adds taken damage to a damage buffer, which gets applied in the next frame.
     * Therefore, this method will not decrement the entity's HP immediately. Rather, it is only
     * updated on the next frame (even if `countdownFrames` is equal to 0).
     *
     * @param amount
     * @param damageFlags
     * @param source Required. If you do not want the effect to have a source, pass
     *               `EntityRef(undefined)`.
     * @param countdownFrames
     */
    TakeDamage: (
      amount: float,
      damageFlags: DamageFlag | BitFlags<DamageFlag>,
      source: EntityRef,
      countdownFrames: int,
    ) => boolean;

    /**
     * Casts an `Entity` into an `EntityBomb`, which has bomb-specific methods and properties. If
     * the associated entity is not a bomb, then this method will return undefined.
     */
    ToBomb: () => EntityBomb | undefined;

    /**
     * Casts an `Entity` into an `EntityEffect`, which has effect-specific methods and properties.
     * If the associated entity is not a effect, then this method will return undefined.
     */
    ToEffect: () => EntityEffect | undefined;

    /**
     * Casts an `Entity` into an `EntityFamiliar`, which has familiar-specific methods and
     * properties. If the associated entity is not a familiar, then this method will return
     * undefined.
     */
    ToFamiliar: () => EntityFamiliar | undefined;

    /**
     * Casts an `Entity` into an `EntityKnife`, which has knife-specific methods and properties. If
     * the associated entity is not a knife, then this method will return undefined.
     */
    ToKnife: () => EntityKnife | undefined;

    /**
     * Casts an `Entity` into an `EntityLaser`, which has laser-specific methods and properties. If
     * the associated entity is not a laser, then this method will return undefined.
     */
    ToLaser: () => EntityLaser | undefined;

    /**
     * Casts an `Entity` into an `EntityNPC`, which has NPC-specific methods and properties. If the
     * associated entity is not an NPC, then this method will return undefined.
     */
    ToNPC: () => EntityNPC | undefined;

    /**
     * Casts an `Entity` into an `EntityPickup`, which has pickup-specific methods and properties.
     * If the associated entity is not a pickup, then this method will return undefined.
     */
    ToPickup: () => EntityPickup | undefined;

    /**
     * Casts an `Entity` into an `EntityPlayer`, which has player-specific methods and properties.
     * If the associated entity is not a player, then this method will return undefined.
     */
    ToPlayer: () => EntityPlayer | undefined;

    /**
     * Casts an `Entity` into an `EntityProjectile`, which has projectile-specific methods and
     * properties. If the associated entity is not a projectile, then this method will return
     * undefined.
     */
    ToProjectile: () => EntityProjectile | undefined;

    /**
     * Casts an `Entity` into an `EntityTear`, which has tear-specific methods and properties. If
     * the associated entity is not a tear, then this method will return undefined.
     */
    ToTear: () => EntityTear | undefined;

    /**
     * Runs the post-update logic for the entity for a single frame, which will cause the associated
     * callback to fire. Mods usually never need to call this function, as it can cause bugs when
     * post-update logic is ran more than once a frame.
     */
    Update: () => void;

    Child?: Entity;
    CollisionDamage: float;

    // `Color` is deliberately not implemented in favor of `GetColor` and `SetColor`.

    DepthOffset: float;
    readonly DropSeed: Seed;
    EntityCollisionClass: EntityCollisionClass;
    FlipX: boolean;
    readonly FrameCount: int;
    Friction: float;
    GridCollisionClass: EntityGridCollisionClass;
    HitPoints: float;
    readonly Index: int;
    readonly InitSeed: Seed;
    Mass: float;
    MaxHitPoints: float;
    Parent?: Entity;
    Position: Vector;
    PositionOffset: Readonly<Vector>;
    RenderZOffset: int;
    Size: float;
    SizeMulti: Vector;
    SortingLayer: SortingLayer;

    /**
     * The room grid index where the entity spawned upon first entering the room.
     *
     * Entities that are spawned after the initial room generation will have a `SpawnGridIndex` of
     * -1.
     */
    readonly SpawnGridIndex: int;

    SpawnerEntity?: Entity;
    SpawnerType: EntityType;
    SpawnerVariant: int;

    /**
     * The color of the gibs when the entity dies.
     *
     * This field is read-only, so if you want to change it, you have to replace the entire thing
     * with a new `Color` object.
     */
    SplatColor: Readonly<Color>;

    SpriteOffset: Vector;
    SpriteRotation: float;

    /**
     * The multiplier for the size of the entity's sprite. This can be used to also scale the shadow
     * of the entity.
     *
     * For `EntityPlayer` specifically, this is a player "size" stat. Only change this in the
     * `EVALUATE_CACHE` callback corresponding to `CacheFlag.SIZE`.
     */
    SpriteScale: Vector;

    SubType: int;
    Target?: Entity;
    TargetPosition: Readonly<Vector>;
    readonly Type: EntityType;
    Variant: int;
    Velocity: Vector;
    Visible: boolean;
  }

  /** For `EntityType.SLOT` (6). */
  interface EntitySlot extends Entity {
    Type: EntityType.SLOT;
    Variant: SlotVariant;
  }
}
