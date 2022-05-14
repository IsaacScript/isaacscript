/* eslint-disable sort-exports/sort-exports */

// `isaac-typescript-definitions` exports a mix of declarations and real Lua code. We export the
// declarations first with a triple slash directive; they must come before the normal code exports.
// (Triple slash directives must be at the top of the file.)

import { Music } from "./enums/Music";

export * from "./enums/ActiveSlot";
export * from "./enums/BackdropType";
export * from "./enums/BrokenWatchState";
export * from "./enums/ButtonAction";
export * from "./enums/Challenge";
export * from "./enums/ChampionColor";
export * from "./enums/CollectibleAnimation";
export * from "./enums/CollectiblePedestalType";
export * from "./enums/collections/entityState";
export * from "./enums/collections/gridEntityState";
export * from "./enums/collections/gridEntityVariants";
export * from "./enums/collections/roomSubTypes";
export * from "./enums/collections/subTypes";
export * from "./enums/collections/variants";
export * from "./enums/Controller";
export * from "./enums/ControllerIndex";
export * from "./enums/Difficulty";
export * from "./enums/Dimension";
export * from "./enums/Direction";
export * from "./enums/DoorSlot";
export * from "./enums/Ending";
export * from "./enums/EntityCollisionClass";
export * from "./enums/EntityGridCollisionClass";
export * from "./enums/EntityType";
export * from "./enums/FadeoutTarget";
export * from "./enums/flags/ActionTrigger";
export * from "./enums/flags/CacheFlag";
export * from "./enums/flags/DamageFlag";
export * from "./enums/flags/DisplayFlag";
export * from "./enums/flags/DoorSlotFlag";
export * from "./enums/flags/EntityFlag";
export * from "./enums/flags/EntityPartition";
export * from "./enums/flags/ItemConfigTag";
export * from "./enums/flags/LevelCurse";
export * from "./enums/flags/ProjectileFlag";
export * from "./enums/flags/RoomDescriptorFlag";
export * from "./enums/flags/TargetFlag";
export * from "./enums/flags/TearFlag";
export * from "./enums/flags/UseFlag";
export * from "./enums/GameStateFlag";
export * from "./enums/GridCollisionClass";
export * from "./enums/GridEntityType";
export * from "./enums/GridEntityXMLType";
export * from "./enums/GridPath";
export * from "./enums/GridRoom";
export * from "./enums/InputHook";
export * from "./enums/ItemConfigCardType";
export * from "./enums/ItemConfigChargeType";
export * from "./enums/ItemConfigPillEffectClass";
export * from "./enums/ItemConfigPillEffectType";
export * from "./enums/ItemPoolType";
export * from "./enums/ItemType";
export * from "./enums/Keyboard";
export * from "./enums/LanguageAbbreviation";
export * from "./enums/LaserOffset";
export * from "./enums/LevelStage";
export * from "./enums/LevelStateFlag";
export * from "./enums/LineCheckMode";
export * from "./enums/ModCallback";
export * from "./enums/Mouse";
export * from "./enums/Music";
export * from "./enums/NpcState";
export * from "./enums/NullItemID";
export * from "./enums/PickupPrice";
export * from "./enums/PillEffect";
export * from "./enums/PlayerForm";
export * from "./enums/PlayerItemAnimation";
export * from "./enums/PlayerSpriteLayer";
export * from "./enums/PocketItemSlot";
export * from "./enums/PoopSpellType";
export * from "./enums/ProjectilesMode";
export * from "./enums/RenderMode";
export * from "./enums/RoomDescriptorDisplayType";
export * from "./enums/RoomDifficulty";
export * from "./enums/RoomShape";
export * from "./enums/RoomTransitionAnim";
export * from "./enums/RoomType";
export * from "./enums/SeedEffect";
export * from "./enums/SkinColor";
export * from "./enums/SortingLayer";
export * from "./enums/SoundEffect";
export * from "./enums/StageID";
export * from "./enums/StageTransition";
export * from "./enums/StageType";
export * from "./enums/TrinketSlot";
export * from "./enums/WeaponType";

declare global {
  type int = number; // eslint-disable-line @typescript-eslint/naming-convention
  type float = number; // eslint-disable-line @typescript-eslint/naming-convention

  function MusicManager(this: void): MusicManager;

  interface MusicManager {
    /**
     * @param music
     * @param fadeRate Default is 0.08.
     */
    Crossfade(music: Music | int, fadeRate?: float): void;

    Disable(): void;

    /**
     * @param layerID Default is 0.
     */
    DisableLayer(layerID?: int): void;

    Enable(): void;

    /**
     * @param layerID Default is 0.
     * @param instant Default is false.
     */
    EnableLayer(layerID?: int, instant?: boolean): void;

    /**
     * @param music
     * @param volume Default is 1.
     * @param fadeRate Default is 0.08.
     */
    Fadein(music: Music | int, volume?: float, fadeRate?: float): void;

    /**
     * @param fadeRate Default is 0.08.
     */
    Fadeout(fadeRate?: float): void;

    GetCurrentMusicID(): Music | int;
    GetQueuedMusicID(): Music | int;
    IsEnabled(): boolean;

    /**
     * @param layerID Default is 0.
     */
    IsLayerEnabled(layerID?: int): boolean;

    Pause(): void;
    PitchSlide(targetPitch: float): void;
    Play(music: Music, volume: float): void;
    Queue(music: Music | int): void;
    ResetPitch(): void;
    Resume(): void;
    UpdateVolume(): void;

    /**
     * @param targetVolume
     * @param fadeRate Default is 0.08.
     */
    VolumeSlide(targetVolume: float, fadeRate?: float): void;
  }
}
