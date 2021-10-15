declare const StageAPI: StageAPIInterface | undefined;

interface StageAPICallbackParameters {
  [StageAPICallback.POST_CHANGE_ROOM_GFX]: [callback: () => void];
  [StageAPICallback.POST_OVERRIDDEN_GRID_BREAK]: [
    callback: (
      gridIndex: int,
      grid: GridEntity,
      justBrokenGridSpawns:
        | LuaTable<int, StageAPIRemovedEntityData>
        | undefined,
    ) => false | void,
  ];
  [StageAPICallback.POST_ROOM_INIT]: [
    room: unknown,
    fromSaveData: unknown,
    saveData: unknown,
  ];
  [StageAPICallback.POST_ROOM_LOAD]: [
    callback: (
      room: unknown,
      isFirstLoad: boolean,
      isExtraRoom: boolean,
    ) => void,
  ];
  [StageAPICallback.PRE_ROOM_LAYOUT_CHOOSE]: [
    callback: (
      currentRoom: unknown,
      roomsList: unknown,
    ) => StageAPICustomRoomConfig | undefined,
  ];
  [StageAPICallback.PRE_SPAWN_GRID]: [
    callback: (
      gridData: unknown,
      gridInformation: unknown,
      entities: unknown,
      gridSpawnRNG: RNG,
    ) => boolean | undefined,
  ];
  [StageAPICallback.PRE_STAGEAPI_NEW_ROOM]: [callback: () => void];
}

/** @noSelf */
interface StageAPIInterface {
  /**
   * Stores a function and its params in a table indexed by `ID` and sorted by `priority`,
   * where low priority is at the start.
   */
  AddCallback<T extends StageAPICallback>(
    modID: string,
    id: T,
    priority: int,
    ...args: StageAPICallbackParameters[T]
  ): void;

  /**
   * Convenience function that assembles filenames and packages them in a {@link Backdrop} for
   * you.
   *
   * @param prefix the path to the directory containing the backdrop spritesheets,
   * as well as any shared prefix.
   *
   *  Ex: "gfx/backdrop/revel1/glacier/main_"
   * @param suffix Generally the file extension, i.e. `".png"`.
   */
  BackdropHelper(
    backdrop: StageAPIBackdrop | StageAPIBackdrop[],
    prefix: string,
    suffix: string,
  ): StageAPIBackdrop[];

  ChangeBackdrop(
    backdrop: StageAPIBackdrop,
    justWalls?: boolean,
    storeBackdropEntities?: false,
  ): void;
  ChangeBackdrop(
    backdrop: StageAPIBackdrop,
    justWalls: boolean,
    storeBackdropEntities: true,
  ): Entity[];

  /** Function to create a custom floor layout. */
  CreateMapFromRoomsList(roomsList: StageAPIRoomsList): StageAPILevelMap;

  /**
   * Creates a new custom stage.
   *
   * @param name MUST BE UNIQUE. USED TO IDENTIFY STAGE AND FOR SAVING CURRENT STAGE.
   * @param noSetReplaces Replaces defaults to catacombs one if noSetReplaces is not set.
   */
  CustomStage(
    name: string,
    stageOverrideStage?: StageAPIStageOverrideStage,
    noSetReplaces?: boolean,
  ): StageAPICustomStage;

  /** Used to go to a specific room when on a custom StageAPI floor. */
  ExtraRoomTransition(
    levelMapRoomID: int,
    direction: Direction,
    transitionType: RoomTransitionAnim,
    levelMapID: unknown,
    leaveDoor?: int,
    enterDoor?: int,
    setPlayerPosition?: unknown,
    extraRoomBaseType?: unknown,
  ): void;

  /**
   * On the first run after opening the game for the first time, StageAPI gathers a bunch of data
   * from vanilla rooms so that it can properly build custom stages. If a mod is initializing a
   * custom stage, they must first check on every PostRender frame until this method returns true.
   */
  FinishedLoadingData(): boolean;

  GetCurrentLevelMap(): StageAPILevelMap;

  GetCurrentRoom(): StageAPIRoom | undefined;

  /** Roughly analogous to the vanilla `Level.GetCurrentRoomIndex` function. */
  GetCurrentRoomID(): int;

  GetCustomGrids(
    index: int | undefined,
    name: string,
  ): StageAPICustomGridEntity[];

  /** Teleports the player(s) to a specified stage */
  GotoCustomStage(
    customStage: StageAPICustomStage,
    playTransition?: boolean,
    noForgetSeed?: boolean,
  ): void;

  GridGfx(): StageAPIGridGfx;

  InitCustomLevel(levelMap: StageAPILevelMap, levelStartRoom: boolean): void;

  /** Constructor for the RoomGfx object. */
  RoomGfx(
    backdrop: StageAPIBackdrop,
    gridGfx: StageAPIGridGfx | undefined,
    shadingName: string,
    shadingPrefix: string,
  ): StageAPIRoomGfx;

  RoomsList(name: string, ...layouts: unknown[]): StageAPIRoomsList;

  /** Unregisters all mod callbacks, should be used when a mod loads, useful for `luamod`. */
  UnregisterCallbacks(modID: string): void;

  Callbacks: Record<StageAPICallback, unknown>;

  StageOverride: {
    CatacombsOne: 1;
    CatacombsTwo: 2;
  };
}
