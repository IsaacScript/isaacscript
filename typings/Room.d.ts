declare class Room {
  /**
   * @param position1
   * @param position2
   * @param lineCheckMode
   * @param gridPathThreshold Default is 0.
   * @param ignoreWalls Default is false.
   * @param ignoreCrushable Default is false.
   * @return 2 values:
   * 1) boolean: true if there are no obstructions between Pos1 and Pos2, false otherwise
   * 2) Vector: first hit position from Pos1 to Pos2 (returns Pos2 if the line didn't hit anything)
   */
  CheckLine(
    position1: Vector,
    position2: Vector,
    lineCheckMode: LineCheckMode,
    gridPathThreshold?: int,
    ignoreWalls?: boolean,
    ignoreCrushable?: boolean,
  ): LuaMultiReturn<[boolean, Vector]>;
  DamageGrid(index: int, damage: int): boolean;
  DestroyGrid(index: int, immediate: boolean): boolean;
  EmitBloodFromWalls(duration: int, count: int): void;
  /**
   * @param position
   * @param initialStep Default is 0.
   * @param avoidActiveEntities Default is false.
   * @param allowPits Default is false.
   */
  FindFreePickupSpawnPosition(
    position: Vector,
    initialStep?: float,
    avoidActiveEntities?: boolean,
    allowPits?: boolean,
  ): Vector;
  FindFreeTilePosition(position: Vector, distanceThreshold: float): Vector;
  GetAliveBossesCount(): int;
  GetAliveEnemiesCount(): int;
  GetAwardSeed(): int;
  GetBackdropType(): BackdropType;
  GetBossID(): BossIDs | int;
  GetBottomRightPos(): Vector;
  GetBrokenWatchState(): int;
  GetCenterPos(): Vector;
  GetClampedGridIndex(position: Vector): int;
  GetClampedPosition(position: Vector, margin: float): Vector;
  GetDecorationSeed(): int;
  GetDeliriumDistance(): int;
  GetDevilRoomChance(): float;
  GetDoor(doorSlot: DoorSlot): GridEntityDoor | null;
  GetDoorSlotPosition(doorSlot: DoorSlot): Vector;
  GetDungeonRockIdx(): int;
  /**
   * Using this method can cause the game to crash, so it is forbidden.
   * Use "Isaac.GetRoomEntities()" instead.
   */
  GetEntities(fakeArg: never): EntityList;
  GetFrameCount(): int;
  GetGridCollision(gridIndex: int): GridCollisionClass;
  GetGridCollisionAtPos(position: Vector): GridCollisionClass;
  GetGridEntity(index: int): GridEntity | null;
  GetGridEntityFromPos(position: Vector): GridEntity | null;
  GetGridHeight(): int;
  GetGridIndex(position: Vector): int;
  GetGridPath(index: int): int;
  GetGridPathFromPos(index: int): int;
  GetGridPosition(gridIndex: int): Vector;
  GetGridSize(): int;
  GetGridWidth(): int;
  GetLaserTarget(position: Vector, direction: Vector): Vector;
  GetLightingAlpha(): float;
  // GetLRoomAreaDesc(): LRoomAreaDesc; // LRoomAreaDesc is not implemented
  // GetLRoomTileDesc(): LRoomTileDesc; // LRoomTileDesc is not implemented
  GetNextShockwaveId(): int;
  GetRandomPosition(margin: float): Vector;
  GetRandomTileIndex(seed: int): int;
  GetRedHeartDamage(): boolean;
  GetRenderScrollOffset(): Readonly<Vector>;
  GetRenderSurfaceTopLeft(): Readonly<Vector>;
  GetRoomConfigStage(): int;
  GetRoomShape(): RoomShape;
  GetSecondBossID(): BossIDs | int;
  GetSeededCollectible(seed: int): CollectibleType | int;
  GetShopLevel(): int;
  GetSpawnSeed(): int;
  GetTintedRockIdx(): int;
  GetTopLeftPos(): Vector;
  GetType(): RoomType;
  HasSlowDown(): boolean;
  HasTriggerPressurePlates(): boolean;
  HasWater(): boolean;
  HasWaterPits(): boolean;
  IsAmbushActive(): boolean;
  IsAmbushDone(): boolean;
  IsClear(): boolean;
  IsCurrentRoomLastBoss(): boolean;
  IsDoorSlotAllowed(doorSlot: DoorSlot): boolean;
  IsFirstEnemyDead(): boolean;
  IsFirstVisit(): boolean;
  IsInitialized(): boolean;
  IsLShapedRoom(): boolean;
  IsPositionInRoom(position: Vector, margin: float): boolean;
  IsSacrificeDone(): boolean;
  KeepDoorsClosed(): void;
  MamaMegaExplossion(): void;
  PlayMusic(): void;
  RemoveDoor(doorSlot: DoorSlot): void;
  RemoveGridEntity(
    gridIndex: int,
    pathTrail: int,
    keepDecoration: boolean,
  ): void;
  Render(): void;
  RespawnEnemies(): void;
  ScreenWrapPosition(position: Vector, margin: float): Vector;
  SetAmbushDone(value: boolean): void;
  SetBrokenWatchState(state: int): void;
  SetCardAgainstHumanity(): void;
  SetClear(clear: boolean): void;
  SetFirstEnemyDead(value: boolean): void;
  SetFloorColor(floorColor: Color): void;
  SetGridPath(index: int, value: int): boolean;
  SetRedHeartDamage(): void;
  SetSacrificeDone(done: boolean): void;
  SetShockwaveParam(shockwaveID: int, shockwaveParams: ShockwaveParams): void;
  SetSlowDown(duration: int): void;
  SetWallColor(wallColor: Color): void;
  ShopReshuffle(keepCollectibleIdx: boolean, reselectSaleItem: boolean): void;
  ShopRestockFull(): void;
  ShopRestockPartial(): void;
  SpawnClearAward(): void;
  SpawnGridEntity(
    gridIndex: int,
    gridEntityType: GridEntityType | int,
    variant: GridEntityVariantForAC,
    seed: int,
    varData: int,
  ): boolean;
  TryMakeBridge(pit: GridEntity): boolean;
  TryPlaceLadder(
    playerPos: Vector,
    playerVelocity: Vector,
    ladder: Entity,
  ): void;
  TrySpawnBlueWombDoor(firstTime: boolean, ignoreTime: boolean): boolean;
  TrySpawnBossRushDoor(ignoreTime: boolean): boolean;
  TrySpawnDevilRoomDoor(animate: boolean): boolean;
  TrySpawnMegaSatanRoomDoor(): boolean;
  TrySpawnTheVoidDoor(): boolean;
  TurnGold(): void;
  Update(): void;
  WorldToScreenPosition(worldPos: Vector): Vector;
}
