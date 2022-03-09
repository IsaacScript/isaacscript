declare interface Room {
  /**
   * @param position1
   * @param position2
   * @param lineCheckMode
   * @param gridPathThreshold Default is 0.
   * @param ignoreWalls Default is false.
   * @param ignoreCrushable Default is false.
   * @returns 2 values:
   * 1) boolean: true if there are no obstructions between Pos1 and Pos2, false otherwise
   * 2) Vector: first hit position from pos1 to pos2 (returns pos2 if the line didn't hit anything)
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
  GetAwardSeed(): Seed;
  GetBackdropType(): BackdropType;
  GetBossID(): BossID | int;
  GetBottomRightPos(): Vector;
  GetBrokenWatchState(): int;
  GetCenterPos(): Vector;
  GetClampedGridIndex(position: Vector): int;
  GetClampedPosition(position: Vector, margin: float): Vector;
  GetDecorationSeed(): Seed;
  GetDeliriumDistance(): int;
  GetDevilRoomChance(): float;
  GetDoor(doorSlot: DoorSlot): GridEntityDoor | undefined;
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
  GetGridEntity(gridIndex: int): GridEntity | undefined;
  GetGridEntityFromPos(position: Vector): GridEntity | undefined;
  GetGridHeight(): int;
  GetGridIndex(position: Vector): int;
  GetGridPath(index: int): int;
  GetGridPathFromPos(position: Vector): int;
  GetGridPosition(gridIndex: int): Vector;
  GetGridSize(): int;

  /** Note that if you call this in the main menu, the game will sometimes crash. */
  GetGridWidth(): int;

  GetLaserTarget(position: Vector, direction: Vector): Vector;

  /**
   * Usually returns 1, unless the lava is in the process of being cooled down by Flush! or other
   * room flooding effects, in which case this will gradually decrease down to 0.
   */
  GetLavaIntensity(): float;

  GetLightingAlpha(): float;

  // GetLRoomAreaDesc(): LRoomAreaDesc; // LRoomAreaDesc is not implemented
  // GetLRoomTileDesc(): LRoomTileDesc; // LRoomTileDesc is not implemented

  GetNextShockwaveId(): int;
  GetRandomPosition(margin: float): Vector;
  GetRandomTileIndex(seed: Seed): int;
  GetRedHeartDamage(): boolean;

  /**
   * Returns the current render mode, which can be used to render entities differently depending on
   * the context (i.e. custom water reflections).
   */
  GetRenderMode(): RenderMode;

  GetRenderScrollOffset(): Readonly<Vector>;
  GetRenderSurfaceTopLeft(): Readonly<Vector>;
  GetRoomConfigStage(): int;
  GetRoomShape(): RoomShape;
  GetSecondBossID(): BossID | int;
  GetSeededCollectible(seed: Seed): CollectibleType | int;
  GetShopLevel(): int;
  GetSpawnSeed(): Seed;
  GetTintedRockIdx(): int;
  GetTopLeftPos(): Vector;
  GetType(): RoomType;

  /** Returns a vector corresponding to any water current in the room. */
  GetWaterCurrent(): Vector;

  /** Returns true if the player is inside the abandoned mineshaft. */
  HasCurseMist(): boolean;

  /** Returns true if the room contains lava pits. */
  HasLava(): boolean;

  HasSlowDown(): boolean;
  HasTriggerPressurePlates(): boolean;
  HasWater(): boolean;
  HasWaterPits(): boolean;

  /** Causes chest previews from Guppy's Eye to be updated on the next frame. */
  InvalidatePickupVision(): void;

  IsAmbushActive(): boolean;
  IsAmbushDone(): boolean;
  IsClear(): boolean;
  IsCurrentRoomLastBoss(): boolean;
  IsDoorSlotAllowed(doorSlot: DoorSlot): boolean;
  IsFirstEnemyDead(): boolean;
  IsFirstVisit(): boolean;
  IsInitialized(): boolean;
  IsLShapedRoom(): boolean;

  /** Returns true if the player is inside the mirror dimension. */
  IsMirrorWorld(): boolean;

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
  SetBrokenWatchState(brokenWatchState: BrokenWatchState): void;
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
    gridEntityType: GridEntityType,
    variant: int,
    seed: Seed,
    varData: int,
  ): boolean;

  /** Stops any rain effects in the room. */
  StopRain(): void;

  /**
   * Triggers all room clear effects (e.g. Sack of Pennies dropping coins). Does not actually clear
   * the room.
   *
   * @param silent Default is false. Set to true to mute the door opening sounds.
   */
  TriggerClear(silent?: boolean): void;

  /**
   * This function was updated to take two arguments in Repentance. The reason for this is that
   * bridges can be spike bridges, so the specifying the type of rock is necessary.
   */
  TryMakeBridge(pit: GridEntity, rock: GridEntity): boolean;

  TryPlaceLadder(
    playerPos: Vector,
    playerVelocity: Vector,
    ladder: Entity,
  ): void;

  /**
   * Attempts to spawn a door to the Blue Womb. This usually does nothing outside of the Mom's
   * Heart's boss room unless `force` is set to true.
   *
   * @param firstTime Default is true.
   * @param ignoreTime Default is false.
   * @param force Default is false.
   */
  TrySpawnBlueWombDoor(
    firstTime?: boolean,
    ignoreTime?: boolean,
    force?: boolean,
  ): boolean;

  /**
   * Attempts to spawn a door to the Boss Rush. This usually does nothing outside of the Mom Boss
   * Room unless `force` is set to true.
   *
   * @param ignoreTime Default is false.
   * @param force Default is false.
   */
  TrySpawnBossRushDoor(ignoreTime?: boolean, force?: boolean): boolean;

  /**
   * Attempts to spawn a door to the devil or angel room. This usually does nothing inside of
   * non-boss rooms unless `force` is set to true.
   *
   * @param animate Default is false.
   * @param force Default is false.
   */
  TrySpawnDevilRoomDoor(animate?: boolean, force?: boolean): boolean;

  /**
   * Attempts to spawn a door to Mega Satan. This usually does nothing outside of the starting room
   * of the Chest / Dark Room unless `force` is set to true.
   *
   * @param force Default is false.
   */
  TrySpawnMegaSatanRoomDoor(force?: boolean): boolean;

  /**
   * Attempts to spawn a door to the Downpour, Mines, or Mausoleum, depending on the current floor.
   * This usually does nothing outside of boss rooms unless `force` is set to true.
   *
   * @param animate Default is false.
   * @param force Default is false.
   */
  TrySpawnSecretExit(animate?: boolean, force?: boolean): void;

  /**
   * Attempts to spawn a trapdoor to the Member Card shop within the current room. This usually does
   * nothing outside of shops (or if the player does not have a Member Card) unless `force` is set
   * to true.
   *
   * @param force Default is false.
   */
  TrySpawnSecretShop(force?: boolean): void;

  /**
   * Attempts to spawn a door to the Mirror Dimension in Downpour or the abandoned mineshaft in the
   * Mines.
   */
  TrySpawnSpecialQuestDoor(): void;

  /**
   * Attempts to spawn a door to a room containing a Void portal. This usually does nothing
   * outside of Hush's boss room unless `force` is set to true.
   *
   * @param force Default is false.
   */
  TrySpawnTheVoidDoor(force?: boolean): boolean;

  TurnGold(): void;
  Update(): void;
  WorldToScreenPosition(worldPos: Vector): Vector;
}
