import type { EntityType } from "../../../enums/EntityType";
import type { BossID } from "../../../enums/collections/roomSubTypes";
import type { EntityFlag } from "../../../enums/flags/EntityFlag";
import type { EntityTag } from "../../../enums/repentogon/EntityTag";
import type { GibFlag } from "../../../enums/repentogon/GibFlag";

declare global {
  interface EntityConfigEntity extends IsaacAPIClass {
    /** Returns true if the entity can be a champion, as defined in `entities2.xml`. */
    CanBeChampion: () => boolean;

    /**
     * Returns true if the entity can be rerolled into another entity, as defined in
     * `entities2.xml`.
     */
    CanBeReRolledInto: () => boolean;

    /**
     * Returns true if the entity causes the doors in an uncleared room to close while alive, as
     * defined in `entities2.xml`.
     */
    CanShutDoors: () => boolean;

    /** Returns a path to the entity's .anm2 file, , as defined in `entities2.xml`. */
    GetAnm2Path: () => string;

    /** Returns the entity's base HP, as defined in `entities2.xml`. */
    GetBaseHP: () => number;

    /** Returns the name of the entity's bestiary animation, as defined in `entities2.xml`. */
    GetBestiaryAnimation: () => string;

    /** Returns a path to the entity's bestiary .anm2 file, as defined in `entities2.xml`. */
    GetBestiaryAnm2Path: () => string;

    /**
     * Returns the entity's floor alt to be displayed in the bestiary, as defined in
     * `entities2.xml`.
     */
    GetBestiaryFloorAlt: () => string;

    /**
     * Returns a readonly Vector of the entity's bestiary sprite offset, as defined in
     * `entities2.xml`.
     */
    GetBestiaryOffset: () => Readonly<Vector>;

    /** Returns the scale of the entity's bestiary sprite, as defined in `entities2.xml`. */
    GetBestiaryScale: () => number;

    /** Returns the BossID associated with the entity, as defined in `entities2.xml`. */
    GetBossID: () => BossID;

    /**
     * Returns the base amount of damage the entity does when touching a player, as defined in
     * `entities2.xml`.
     */
    GetCollisionDamage: () => number;

    /** Returns the entity's collision interval, as defined in `entities2.xml`. */
    GetCollisionInterval: () => int;

    /** Returns the entity's collision radius, as defined in `entities2.xml`. */
    GetCollisionRadius: () => int;

    /**
     * Returns a readonly vector of the entity's collision radius multiplier, , as defined in
     * `entities2.xml`.
     */
    readonly GetCollisionRadiusMultiplier: () => Vector;

    /**
     * Returns an array containing all of the tags defined in the entity's `customtags` attribute in
     * `entities2.xml`. Tags are always provided in all lowercase.
     */
    GetCustomTags: () => string[];

    /** Returns a bitmask containing the entity's tags, as defined in `entities2.xml`. */
    GetEntityTags: () => BitFlags<EntityFlag>;

    /** Returns the entity's friction, as defined in `entities2.xml`. */
    GetFriction: () => number;

    /** Returns a bitmask of the entity's gib flags, as defined in `entities2.xml`. */
    GetGibFlags: () => BitFlags<GibFlag>;

    /** Returns the amount of gibs the entity leaves, as defined in `entities2.xml`. */
    GetGibAmount: () => int;

    /** Returns the entity's mass, as defined in `entities2.xml`. */
    GetMass: () => number;

    /** Returns the name of the mod the entity is from. Returns undefined for vanilla entities. */
    GetModName: () => string | undefined;

    /** Returns the entity's name, as defined in `entities2.xml`. */
    GetName: () => string;

    /** Returns the entity's portrait id, as defined in `entities2.xml`. */
    GetPortraitID: () => int;

    /**
     * Returns the entity's shadow size. The value is the "shadowSize" attribute in `entities2.xml`
     * divided by 100.
     */
    GetShadowSize: () => number;

    /** Returns the amount of armor the entity has, as defined in `entities2.xml`. */
    GetShieldStrength: () => number;

    /** Returns the entity's Stage HP, as defined in `entities2.xml`. */
    GetStageHP: () => number;

    /** Returns the entity's EntityType. */
    GetType: () => EntityType;

    /** Returns the entity's variant. */
    GetVariant: () => int;

    /**
     * Returns true if the entity has the provided tag in its `customtags` attribute in the
     * `entities2.xml` file. This is not case sensitive.
     */
    HasCustomTag: (tag: string) => boolean;

    /** Returns true if the entity has all of the entity tags in the provided bitset. */
    HasEntityTags: (tags: BitFlags<EntityTag>) => boolean;

    /** Returns true if the entity is a boss, as defined in `entities2.xml`. */
    IsBoss: () => boolean;
  }
}
