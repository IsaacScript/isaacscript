declare class Level {
  Update(): void;
  SetStage(levelStage: LevelStage, stageType: StageType): void;
  SetNextStage(): void;
  GetName(
    levelStage: LevelStage,
    stageType: StageType,
    curses: int,
    infiniteLevel: int,
    dyslexia: boolean,
  ): string;
  CanStageHaveCurseOfLabyrinth(levelStage: LevelStage): boolean;
  GetCurseName(): string;
  ShowName(sticky: boolean): void;
  GetStateFlag(levelStateFlag: LevelStateFlag): boolean;
  SetStateFlag(levelStateFlag: LevelStateFlag, val: boolean): void;
  GetCurrentRoom(): Room;
  GetPreviousRoomIndex(): int;
  GetCurrentRoomIndex(): int;
  GetRoomCount(): int;
  GetRandomRoomIndex(IAmErrorRoom: boolean, seed: int): int;
  GetNonCompleteRoomIndex(): int;
  GetRoomByIdx(roomIdx: int): RoomDescriptor;
  GetCurrentRoomDesc(): Readonly<RoomDescriptor>;
  GetLastRoomDesc(): Readonly<RoomDescriptor>;
  GetRooms(): RoomList;
  GetStartingRoomIndex(): int;
  QueryRoomTypeIndex(roomType: RoomType, visited: boolean, rng: RNG): int;
  GetLastBossRoomListIndex(): int;
  CanOpenChallengeRoom(roomIndex: int): boolean;
  GetEnterPosition(): Vector;
  ChangeRoom(roomIndex: int): void;
  ForceHorsemanBoss(seed: int): boolean;
  GetStage(): LevelStage;
  GetCurses(): int;
  IsAltStage(): boolean;
  GetStageType(): StageType;
  HasBossChallenge(): boolean;
  IsDevilRoomDisabled(): boolean;
  DisableDevilRoom(): void;
  UpdateVisibility(): void;
  ApplyMapEffect(): void;
  ApplyBlueMapEffect(): void;
  ApplyCompassEffect(persistent: boolean): void;
  RemoveCompassEffect(): void;
  ShowMap(): void;
  SetHeartPicked(): void;
  GetHeartPicked(): boolean;
  GetCanSeeEverything(): boolean;
  SetCanSeeEverything(value: boolean): void;
  AddCurse(levelCurse: LevelCurse, showName: boolean): void;
  RemoveCurses(): void;
  RemoveCurse(levelCurse: LevelCurse): void;
  GetDungeonPlacementSeed(): int;
  GetDevilAngelRoomRNG(): RNG;
  CanSpawnDevilRoom(): boolean;
  InitializeDevilAngelRoom(forceAngel: boolean, forceDevil: boolean): void;
  UncoverHiddenDoor(currentRoomIdx: int, doorSlot: DoorSlot): void;
  SetRedHeartDamage(): void;
  IsNextStageAvailable(): boolean;
  GetAbsoluteStage(): LevelStage;
  AddAngelRoomChance(chance: float): void;
  GetAngelRoomChance(): float;

  EnterDoor: int;
  LeaveDoor: int;
  DungeonReturnPosition: Vector;
  DungeonReturnRoomIndex: int;
  GreedModeWave: int;
}
