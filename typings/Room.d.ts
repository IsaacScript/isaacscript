declare class Room {
  // GetBackdropType(): Backdrop; // Backdrop is not implemented
  Update(): void;
  Render(): void;
  IsInitialized(): boolean;
  GetGridCollision(gridIndex: int): GridCollisionClass;
  GetGridCollisionAtPos(position: Vector): GridCollisionClass;
  GetDoor(doorSlot: DoorSlot): GridEntityDoor | null;
  GetDoorSlotPosition(doorSlot: DoorSlot): Vector;
  IsDoorSlotAllowed(doorSlot: DoorSlot): boolean;
  RemoveDoor(doorSlot: DoorSlot): void;
  KeepDoorsClosed(): void;
  GetType(): RoomType;
  GetDecorationSeed(): int;
  GetSpawnSeed(): int;
  GetAwardSeed(): int;
  GetRoomShape(): RoomShape;
  GetRoomConfigStage(): int;
  GetGridPath(index: int): int;
  GetGridPathFromPos(index: int): int;
  SetGridPath(index: int, value: int): boolean;
  DamageGrid(index: int, damage: int): boolean;
  DestroyGrid(index: int, immediate: boolean): boolean;
  CheckLine(
    position1: Vector,
    position2: Vector,
    lineCheckMode: LineCheckMode,
    gridPathThreshold: int,
    ignoreWalls: boolean,
    ignoreCrushable: boolean,
  ): boolean;
  GetLaserTarget(position: Vector, direction: Vector): Vector;
  GetGridEntity(index: int): GridEntity | null;
  GetGridEntityFromPos(position: Vector): GridEntity | null;
  GetGridWidth(): int;
  GetGridHeight(): int;
  GetGridSize(): int;
  IsClear(): boolean;
  SetClear(clear: boolean): void;
  FindFreePickupSpawnPosition(
    position: Vector,
    initialStep: float,
    avoidActiveEntities: boolean,
  ): Vector;
  FindFreeTilePosition(position: Vector, distanceThreshold: float): Vector;
  GetGridIndex(position: Vector): int;
  GetClampedGridIndex(position: Vector): int;
  GetGridPosition(gridIndex: int): Vector;
  GetClampedPosition(position: Vector, margin: float): Vector;
  IsPositionInRoom(position: Vector, margin: float): boolean;
  ScreenWrapPosition(position: Vector, margin: float): Vector;
  IsLShapedRoom(): boolean;
  // GetLRoomAreaDesc(): LRoomAreaDesc; // LRoomAreaDesc is not implemented
  // GetLRoomTileDesc(): LRoomTileDesc; // LRoomTileDesc is not implemented
  GetTopLeftPos(): Vector;
  GetBottomRightPos(): Vector;
  GetCenterPos(): Vector;
  SpawnGridEntity(
    gridIndex: int,
    gridEntityType: GridEntityType | int,
    variant: GridEntityVariantForAC,
    seed: int,
    varData: int,
  ): boolean;
  RemoveGridEntity(
    gridIndex: int,
    pathTrail: int,
    keepDecoration: boolean,
  ): void;
  GetFrameCount(): int;
  GetEntities(): EntityList;
  GetAliveEnemiesCount(): int;
  GetAliveBossesCount(): int;
  GetBossID(): BossIDs | int;
  GetSecondBossID(): BossIDs | int;
  TryPlaceLadder(
    playerPos: Vector,
    playerVelocity: Vector,
    ladder: Entity,
  ): void;
  SetSacrificeDone(done: boolean): void;
  IsSacrificeDone(): boolean;
  IsAmbushDone(): boolean;
  SetAmbushDone(value: boolean): void;
  IsAmbushActive(): boolean;
  ShopRestockPartial(): void;
  ShopRestockFull(): void;
  ShopReshuffle(keepCollectibleIdx: boolean, reselectSaleItem: boolean): void;
  TrySpawnDevilRoomDoor(animate: boolean): boolean;
  GetDevilRoomChance(): float;
  TrySpawnBossRushDoor(ignoreTime: boolean): boolean;
  TrySpawnMegaSatanRoomDoor(): boolean;
  TrySpawnBlueWombDoor(firstTime: boolean, ignoreTime: boolean): boolean;
  TrySpawnTheVoidDoor(): boolean;
  PlayMusic(): void;
  SetRedHeartDamage(): void;
  GetRedHeartDamage(): boolean;
  GetBrokenWatchState(): int;
  SetBrokenWatchState(state: int): void;
  IsFirstVisit(): boolean;
  GetRenderSurfaceTopLeft(): Readonly<Vector>;
  GetRenderScrollOffset(): Readonly<Vector>;
  HasWaterPits(): boolean;
  GetSeededCollectible(seed: int): CollectibleType | int;
  GetShopLevel(): int;
  SetShockwaveParam(shockwaveID: int, shockwaveParams: ShockwaveParams): void;
  GetNextShockwaveId(): int;
  SetCardAgainstHumanity(): void;
  EmitBloodFromWalls(duration: int, count: int): void;
  SpawnClearAward(): void;
  GetLightingAlpha(): float;
  TryMakeBridge(pit: GridEntity): boolean;
  GetDungeonRockIdx(): int;
  GetTintedRockIdx(): int;
  HasSlowDown(): boolean;
  SetSlowDown(duration: int): void;
  GetRandomPosition(margin: float): Vector;
  GetRandomTileIndex(seed: int): int;
  RespawnEnemies(): void;
  HasWater(): boolean;
  HasTriggerPressurePlates(): boolean;
  IsCurrentRoomLastBoss(): boolean;
  IsFirstEnemyDead(): boolean;
  SetFirstEnemyDead(value: boolean): void;
  MamaMegaExplossion(): void;
  GetDeliriumDistance(): int;
  TurnGold(): void;
  SetFloorColor(floorColor: Color): void;
  SetWallColor(wallColor: Color): void;
  WorldToScreenPosition(worldPos: Vector): Vector;
}
