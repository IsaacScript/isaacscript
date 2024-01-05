import type { BossID } from "../../../../enums/collections/roomSubTypes";
import type { EntityTag } from "../../../../enums/mods/repentogon/flags/EntityTag";
import type { GibFlag } from "../../../../enums/mods/repentogon/flags/GibFlag";

/**
 * This class is for REPENTOGON, an exe-hack which expands the modding API.
 *
 * @see https://repentogon.com/index.html
 */
declare global {
  interface EntityConfigEntity {
    CanBeChampion: () => boolean;
    CanBeRerolledInto: () => boolean;
    CanShutDoors: () => boolean;
    GetAnm2Path: () => string;
    GetBaseHP: () => number;
    GetBestiaryAnimation: () => string;
    GetBestiaryAnm2Path: () => string;
    GetBestiaryFloorAlt: () => string;
    GetBestiaryOffset: () => Vector;
    GetBestiaryOverlay: () => string;
    GetBestiaryScale: () => number;
    GetBossID: () => BossID;
    GetCollisionDamage: () => number;
    GetCollisionInterval: () => int;

    /** Also known as "Size". */
    GetCollisionRadius: () => number;

    /** Also known as "SizeMulti". */
    GetCollisionRadiusMultiplier: () => Vector;

    /**
     * Returns an array containing all of the strings specified in the entity's "customtags"
     * attribute in `entities2.xml` Tags are always provided in all lowercase. See the documentation
     * of [entities2.xml](https://repentogon.com/xml/entities.html) for more information.
     */
    GetCustomTags: () => string[];

    GetFriction: () => number;

    /** Returns a bitmask of the entity's GibFlags. */
    GetGibFlags: () => BitFlags<GibFlag>;

    GetGibsAmount: () => int;

    GetGridCollisionPoints: () => int;

    GetMass: () => number;

    /**
     * Returns the name of the mod that the entity is from. Returns undefined if the entity is not
     * from a mod.
     */
    GetModName: () => string | undefined;

    GetPortraitID: () => int;

    /**
     * Note that this value is the "shadowSize" property specified in `entities2.xml` divided by
     * 100.
     */
    GetShadowSize: () => number;

    GetStageHP: () => number;

    GetSubType: () => int;

    GetType: () => int;

    GetVariant: () => int;

    /**
     * Returns true if the entity has the provided string specified in its `customtags` attribute in
     * `entities2.xml`. Capitalization does not matter. See
     * [entities2.xml](https://repentogon.com/xml/entities.html) for more information on
     * `customtags`.
     */
    HasCustomTag: (tag: string) => boolean;

    HasEntityTags: (tag: EntityTag | BitFlags<EntityTag>) => boolean;

    HasFloorAlts: () => boolean;

    HasGibFlags: (flags: GibFlag | BitFlags<GibFlag>) => boolean;

    IsBoss: () => boolean;
  }
}
