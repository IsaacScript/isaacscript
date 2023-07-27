import type { Dimension } from "../../enums/Dimension";
import type { EntityType } from "../../enums/EntityType";
import type { GridEntityType } from "../../enums/GridEntityType";
import type { LevelStage } from "../../enums/LevelStage";
import type { RoomShape } from "../../enums/RoomShape";
import type { RoomType } from "../../enums/RoomType";
import type { StageType } from "../../enums/StageType";

declare global {
  interface StageAPIBackdrop {
    Corners: string[];
    LFloors: string[];
    NFloors: string[];
    Walls: string[];
  }

  interface StageAPICustomDoor {
    AlwaysOpen: boolean;
    Anm2: string;
    CloseAnim: string;
    ClosedAnim: string;
    DirectionOffsets: unknown;
    ExitFunction: string;
    Name: string;
    NoAutoHandling: boolean;
    OpenAnim: string;
    OpenedAnim: string;
    TransitionAnim: int;
  }

  interface StageAPICustomGrid {
    Spawn: (
      grindex: number, // cspell:ignore grindex
      force: boolean,
      reSpawning: boolean,
      initialPersistData: unknown,
    ) => StageAPICustomGridEntity;
  }

  interface StageAPICustomGridEntity {
    Remove: (keepBaseGrid: boolean) => void;
    Data: Record<string, unknown>;
    GridConfig: StageAPICustomGrid;
    GridIndex: int;
    PersistentData: Record<string, unknown>;
  }

  interface StageAPIEntityInfo {
    Data: StageAPIEntityData;
    Persistent: boolean;
    PersistentData: boolean;
    PersistentIndex: int;
  }

  interface StageAPICustomStage {
    /** Gets the ID of the currently playing music. */
    GetPlayingMusic: () => int;

    /**
     * Automatically aliases the new stage to the old one, if noSetAlias is not set.
     *
     * This means that IsStage calls on either will return true if either is active.
     *
     * STILL NEEDS A UNIQUE NAME.
     */
    InheritInit: (name: string, noSetAlias?: boolean) => void;

    /** If this CustomStage is, in fact, a stage. */
    IsStage: (noAlias: boolean) => boolean;

    /**
     * Indicates that this stage overrides alt rock effects.
     *
     * @param rooms If present, only overrides rock alt effects for the specified RoomTypes. If
     *              absent, overrides alt rocks everywhere.
     *
     * DOES NOT add any new effects on its own.
     */
    OverrideRockAltEffects: (rooms?: RoomType[]) => void;

    /** Sets the boss music used by the stage. */
    SetBossMusic: (
      musicID: int,
      clearedMusicID: int,
      introMusicID: int,
      outroMusicID: int,
    ) => void;

    /** Sets the available bosses for the stage. */
    SetBosses: (bossIDs: string[]) => void;

    /** Sets the name displayed to the player. */
    SetDisplayName: (name: string) => void;

    /** Sets if this is the second half of a stage. */
    SetIsSecondStage: (isSecondStage: boolean) => void;

    /** Sets the music used by the stage. */
    SetMusic: (musicID: int, roomType: RoomType) => void;

    /**
     * Sets the internal name/id.
     *
     * MUST BE UNIQUE.
     */
    SetName: (name: string) => void;

    /** Sets the stage after this one. */
    SetNextStage: (
      nextStage: StageAPICustomStage | StageAPIVanillaStage,
    ) => void;

    /** Sets the stage this `CustomStage` overrides. */
    SetReplace: (stageOverrideStage: StageAPIStageOverrideStage) => void;

    /**
     * Sets the RoomGfx used by the stage.
     *
     * @param RoomTypes The room types these gfx apply to.
     *
     * Can be a string identifier, a `RoomType`, or an array of either.
     */
    SetRoomGfx: (
      roomGfx: StageAPIRoomGfx,
      roomTypes: string | RoomType | string[] | RoomType[],
    ) => void;

    /** Sets the list room layouts used by the stage. */
    SetRooms: (roomsList: StageAPIRoomsList) => void;

    /**
     * Sets the paths to the "spot" graphic, the patch of ground underneath the boss, and player
     * sprites in the pre-boss cutscene.
     */
    SetSpots: (
      bossSpot?: string,
      playerSpot?: string,
      bgColor?: Color,
      dirtColor?: Color,
    ) => void;

    /** Sets the stage's music. */
    SetStageMusic: (music: number, types: RoomType[]) => void;

    /** Sets the stage's number. */
    SetStageNumber: (num: int) => void;

    /** Sets the path to the stage transition icon. */
    SetTransitionIcon: (iconPath: string) => void;
  }

  interface StageAPIDoorInfo {
    IsBossAmbush?: boolean;
    NotCurrent?: RoomType[];
    NotEither?: RoomType[];
    NotTarget?: RoomType[];
    RequireCurrent?: RoomType[];
    RequireEither?: RoomType[];
    RequireTarget?: RoomType[];
  }

  interface StageAPIGridContainer {
    Desc: GridEntityDesc;
    Grid: GridEntity;
    Index: int;
    Type: GridEntityType;
  }

  interface StageAPIGridGfx {
    /** Sets the path to the gfx sprite sheet of the specified subset of doors. */
    AddDoors: (filename: string, DoorInfo: StageAPIDoorInfo) => void;

    /** Sets the path to the bridge gfx sprite sheet. */
    SetBridges: (filename: string) => void;

    /** Sets the path to the decoration gfx sprite sheet. */
    SetDecorations: (filename: string) => void;

    /** Sets the path to the gfx sprite sheet for the specified `GridEntityType`. */
    SetGrid: (
      filename: string,
      GridEntityType: GridEntityType,
      variant: int,
    ) => void;

    /** Sets the path to the pay-to-play door gfx sprite sheet. */
    SetPayToPlayDoor: (filename: string) => void;

    /**
     * Sets the path to the pit gfx sprite sheet.
     *
     * Alt Pits are used where water pits would be.
     *
     * @param hasExtraFrames Controls for situations where the base game would not normally tile
     *                       pits specially.
     */
    SetPits: ((
      filename: string,
      altPitsFilename?: string,
      hasExtraFrames?: boolean,
    ) => void) &
      ((
        filenames: Array<{ filename: string; hasExtraFrames?: boolean }>,
        altPitsFilenames: Array<{ filename: string; hasExtraFrames?: boolean }>,
      ) => void);

    /** Sets the path to the rock gfx sprite sheet. */
    SetRocks: (filename: string) => void;
  }

  interface StageAPILevelMap {
    GetCurrentRoomData: () => StageAPIRoomData;
    GetRoom: (roomData: StageAPIRoomData) => StageAPILevelRoom;
    Map: StageAPIRoomData[];
  }

  interface StageAPIEntityData {
    GridX: int;
    GridY: int;
    Index: int;
    SubType: int;
    Type: int;
    Variant: int;
  }

  interface StageAPILevelRoom {
    SetTypeOverride: (typeOverride: RoomType) => void;
    AvoidSpawning: unknown;
    AwardSeed: Seed;
    ClearCount: int;
    Data: unknown;
    DecorationSeed: Seed;
    Dimension: Dimension;
    Doors: unknown;
    ExtraSpawn: unknown;
    FirstLoad: boolean;
    Layout: {
      Name: string;
      Variant: int;
    };
    PersistenceData: unknown;
    PersistentData: unknown;
    RoomType: RoomType;
    RoomsListName: string;
    Seed: Seed;
    Shape: RoomShape;
    SpawnSeed: Seed;
    SurpriseMiniboss: boolean;
    VisitCount: int;
  }

  interface StageAPIOverlay {
    Fade: (total: int, time: int, step: int) => void;
    Render: (noCenterCorrect: boolean) => void;
    SetAlpha: (alpha: int, noCancelFade: boolean) => void;
    Anm2: string;
    Offset?: Vector;
    Size?: Vector;
    Velocity?: Vector;
  }

  interface StageAPIRemovedEntityData {
    Position: Vector;
    Seed: Seed;
    Spawner?: Entity;
    SubType: int;
    Type: EntityType;
    Variant: int;
    Velocity: Vector;
  }

  interface StageAPIRoomData {
    MapID: int;
    RoomID: int;
    X: int;
    Y: int;
  }

  interface StageAPIRoomGfx {
    Backdrop: Sprite;
    GridGfx: Sprite;
    shadingName: string;
    shadingPrefix: string;
  }

  interface StageAPIGridData {
    GridX: int;
    GridY: int;
    Index: int;
    Type: int;
    Variant: int;
  }

  interface StageAPIRoomsList {
    AddRooms: (roomFiles: string[] | StageAPICustomRoomConfig[]) => void;
  }

  interface StageAPIStageOverrideStage {
    OverrideStage: LevelStage;
    OverrideStageType: StageType;
    ReplaceWith: StageAPICustomStage | StageAPIVanillaStage;
  }

  interface StageAPITextStreakParams {
    Color?: Color;
    ExtraFontScale?: Vector;
    ExtraOffset?: Vector;
    Font?: Font;
    Hold?: boolean;
    HoldFrames?: int;
    LineSpacing?: int;
    RenderPos?: Vector;
    SmallFont?: Font;
    SpriteOffset?: Vector;
    Spritesheet?: string;
    Text: string;
    TextOffset: Vector;
  }

  interface StageAPIVanillaStage {
    NormalStage: true;
    Stage: LevelStage;
    StageType: StageType;
  }

  interface StageAPIBossData {
    Bossname: string; // cspell:ignore Bossname
    Entity?: {
      Type: EntityType;
      Variant: number;
    };
    Name: string;
    Offset?: Vector;
    Portrait: string;
    Rooms: StageAPIRoomsList;
  }

  interface StageAPIPoolEntry {
    AlwaysReplaceHorsemen?: boolean;
    AlwaysReplaceSubtype?: int;
    BossID: string;
    Horseman?: boolean;
    OnlyReplaceSubtype?: int;
    Weight?: int;
  }
}
