declare interface VanillaStage {
  NormalStage: true;
  Stage: LevelStage;
  StageType: StageType;
}
declare type StageOverrideStage = {
  OverrideStage: LevelStage;
  OverrideStageType: StageType;
  ReplaceWith: CustomStage | VanillaStage;
};
declare interface DoorInfo {
  RequireCurrent?: RoomType[];
  RequireTarget?: RoomType[];
  RequireEither?: RoomType[];
  NotCurrent?: RoomType[];
  NotTarget?: RoomType[];
  NotEither?: RoomType[];
  IsBossAmbush?: boolean;
}
declare interface Backdrop {
  NFloors: string[];
  LFloors: string[];
  Corners: string[];
  Walls: string[];
}
declare interface RoomGfx {
  Backdrop: Sprite;
  GridGfx: Sprite;
  shadingName: string;
  shadingPrefix: string;
}
declare interface RoomsList {
  AddRooms(roomFiles: string[] | CustomRoomConfig[]): void;
}
declare interface RemovedEntityData {
  Type: EntityType;
  Variant: int;
  SubType: int;
  Position: Vector;
  Velocity: Vector;
  Spawner: Entity | null;
  Seed: number;
}

declare interface CustomStage {
  /**
   * Automatically aliases the new stage to the old one, if noSetAlias is not set.
   *
   * This means that IsStage calls on either will return true if either is active.
   *
   * STILL NEEDS A UNIQUE NAME.
   */
  InheritInit(name: string, noSetAlias?: boolean): void;
  /**
   * Sets the internal name/id.
   *
   * MUST BE UNIQUE.
   */
  SetName(name: string): void;
  /** Sets the name displayed to the player. */
  SetDisplayName(name: string): void;
  /** Sets if this is the second half of a stage. */
  SetIsSecondStage(isSecondStage: boolean): void;
  /** Sets the stage's number. */
  SetStageNumber(num: int): void;
  /** Sets the stage this `CustomStage` overrides. */
  SetReplace(stageOverrideStage: StageOverrideStage): void;
  /** Sets the stage after this one. */
  SetNextStage(nextStage: CustomStage | VanillaStage): void;
  /**
   * Sets the {@link RoomGfx} used by the stage.
   *
   * @param RoomTypes the room types these gfx apply to.
   *
   * Can be a string identifier, a {@link RoomType}, or an array of either.
   */
  SetRoomGfx(
    roomGfx: RoomGfx,
    roomTypes: string | int | string[] | int[],
  ): void;
  /** Sets the list room layouts used by the stage. */
  SetRooms(roomsList: RoomsList): void;
  /** Sets the music used by the stage. */
  SetMusic(musicID: int, roomType: RoomType): void;
  /** Sets the boss music used by the stage. */
  SetBossMusic(musicID: int, clearedMusicID: int): void;
  /** Sets the paths to the "spot" graphic, the patch of ground underneath the boss and player sprites in the pre-boss cutscene. */
  SetSpots(bossSpot: string | null, playerSpot: string | null): void;
  /** Sets the available bosses for the stage. */
  SetBosses(bossIDs: int[]): void;
  /** Gets the id of the currently playing music. */
  GetPlayingMusic(): int;
  /**
   * Indicates that this stage overrides alt rock effects.
   *
   * @param rooms If present, only overrides rock alt effects for the specified {@link RoomType RoomTypes}.
   * If absent, overrides alt rocks everywhere.
   *
   * DOES NOT add any new effects on its own.
   */
  OverrideRockAltEffects(rooms?: RoomType[]): void;
  /** Sets the path to the stage transition icon. */
  SetTransitionIcon(iconPath: string): void;
  /** If this {@link CustomStage} is, in fact, a stage. */
  IsStage(noAlias: boolean): boolean;
}

declare interface GridGfx {
  /** Sets the path to the gfx spritesheet for the specified {@link GridEntity}. */
  SetGrid(filename: string, GridEntityType: GridEntityType, variant: int): void;
  /** Sets the path to the rock gfx spritesheet. */
  SetRocks(filename: string): void;
  /**
   * Sets the path to the pit gfx spritesheet
   *
   * Alt Pits are used where water pits would be.
   *
   * @param hasExtraFrames Controls for situations where the base game would not normally tile pits specially.
   */
  SetPits(
    filename: string,
    altPitsFilename?: string,
    hasExtraFrames?: boolean,
  ): void;
  /**
   * Sets the paths to the pit gfx spritesheets.
   *
   * Takes lists of { File, HasExtraFrames }.
   *
   * (Original docs indicate to "see utero override".)
   */
  SetPits(
    filenames: Array<{ File: string; HasExtraFrames?: boolean }>,
    altPitsFilenames: Array<{ File: string; HasExtraFrames?: boolean }>,
  ): void;
  /** Sets the path to the bridge gfx spritesheet. */
  SetBridges(filename: string): void;
  /** Sets the path to the decoration gfx spritesheet. */
  SetDecorations(filename: string): void;
  /** Sets the path to the gfx spritesheet of the specified subset of doors. */
  AddDoors(filename: string, DoorInfo: DoorInfo): void;
  /** Sets the path to the pay-to-play door gfx spritesheet. */
  SetPayToPlayDoor(filename: string): void;
}
