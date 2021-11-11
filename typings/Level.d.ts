declare interface Level {
  AddAngelRoomChance(chance: float): void;
  AddCurse(levelCurse: LevelCurse | int, showName: boolean): void;
  ApplyBlueMapEffect(): void;
  ApplyCompassEffect(persistent: boolean): void;
  ApplyMapEffect(): void;
  CanOpenChallengeRoom(roomIndex: int): boolean;
  CanSpawnDevilRoom(): boolean;
  CanStageHaveCurseOfLabyrinth(levelStage: LevelStage): boolean;

  /**
   * @param roomIndex
   * @param dimension Default is Dimension.CURRENT.
   */
  ChangeRoom(roomIndex: int, dimension?: Dimension): void;

  DisableDevilRoom(): void;
  ForceHorsemanBoss(seed: int): boolean;
  GetAbsoluteStage(): LevelStage;
  GetAngelRoomChance(): float;
  GetCanSeeEverything(): boolean;
  GetCurrentRoom(): Room;

  /**
   * Note that this returns a read-only copy of the RoomDescriptor object and writing to any of its
   * properties will fail. If you need to update anything in this object, use the
   * `GetRoomByIdx(currentRoomIndex)` method instead.
   */
  GetCurrentRoomDesc(): RoomDescriptorReadOnly;

  GetCurrentRoomIndex(): int;

  /**
   * Returns the name of the current floor's curse, like "Curse of the Unknown!". If there are two
   * or more curses on the floor, this will only return the name of the curse with the lowest ID.
   * Note that this will return the localized curse name, like "Maldición de oscuridad" for Curse of
   * Darkness in Spanish.
   */
  GetCurseName(): string;

  GetCurses(): LevelCurse | int;
  GetDevilAngelRoomRNG(): RNG;
  GetDungeonPlacementSeed(): int;
  GetEnterPosition(): Vector;
  GetHeartPicked(): boolean;
  GetLastBossRoomListIndex(): int;
  GetLastRoomDesc(): RoomDescriptorReadOnly;

  /**
   * @param levelStage Default value is the current stage.
   * @param stageType Default value is the current stage type.
   * @param curses Default value is the current curses.
   * @param infiniteLevel Default value is the current infinite level setting.
   * @param dyslexia Default value is the current dyslexia setting.
   */
  GetName(
    levelStage?: LevelStage,
    stageType?: StageType,
    curses?: int,
    infiniteLevel?: int,
    dyslexia?: boolean,
  ): string;

  GetNonCompleteRoomIndex(): int;

  /** Returns the probability of getting a Planetarium (in the 0-1 range). */
  GetPlanetariumChance(): float;

  GetPreviousRoomIndex(): int;
  GetRandomRoomIndex(IAmErrorRoom: boolean, seed: int): int;

  /**
   * @param roomIdx
   * @param dimension Default is Dimension.CURRENT.
   */
  GetRoomByIdx(roomIndex: int, dimension?: Dimension): RoomDescriptor;

  GetRoomCount(): int;
  GetRooms(): RoomList;
  GetStage(): LevelStage;
  GetStageType(): StageType;
  GetStartingRoomIndex(): int;
  GetStateFlag(levelStateFlag: LevelStateFlag): boolean;
  HasBossChallenge(): boolean;
  InitializeDevilAngelRoom(forceAngel: boolean, forceDevil: boolean): void;
  IsAltStage(): boolean;

  /** Returns true if the player is in the Ascent. */
  IsAscent(): boolean;

  IsDevilRoomDisabled(): boolean;
  IsNextStageAvailable(): boolean;

  /** Returns true if the player is in the version of Mausoleum/Gehenna leading to the Ascent. */
  IsPreAscent(): boolean;

  /**
   * Attempts to create a red room door in the given room at the given door slot. Returns true on
   * success.
   *
   * Note that this is supposed to be named "MakeRedRoomDoor", but has an accidental typo.
   */
  MakeRedRoomDor(currentRoomIndex: int, doorSlot: DoorSlot): boolean;

  /**
   * @param roomType
   * @param visited
   * @param rng
   * @param ignoreGroup If set to true, includes rooms that do not have the same group ID as the
   * current room. Default is false.
   */
  QueryRoomTypeIndex(
    roomType: RoomType,
    visited: boolean,
    rng: RNG,
    ignoreGroup?: boolean,
  ): int;

  RemoveCompassEffect(): void;

  /** This is currently bugged and maps internally to "RemoveCurse()". The old "RemoveCurses()" is not currently accessible. */
  RemoveCurses(levelCurse: LevelCurse | int): void;

  SetCanSeeEverything(value: boolean): void;
  SetHeartPicked(): void;
  SetNextStage(): void;
  SetRedHeartDamage(): void;
  SetStage(levelStage: LevelStage, stageType: StageType): void;
  SetStateFlag(levelStateFlag: LevelStateFlag, val: boolean): void;
  ShowMap(): void;
  ShowName(sticky: boolean): void;
  UncoverHiddenDoor(currentRoomIdx: int, doorSlot: DoorSlot): void;
  Update(): void;

  /**
   * Call this method to update the mini-map after changing the `DisplayFlags` property of a room.
   */
  UpdateVisibility(): void;

  DungeonReturnPosition: Vector;
  DungeonReturnRoomIndex: int;
  EnterDoor: int;
  GreedModeWave: int;
  LeaveDoor: int;
}
