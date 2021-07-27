export {};

interface StageAPICallbackParameters {
  [StageCallback.PRE_ROOM_LAYOUT_CHOOSE]: [
    callback: (
      currentRoom: unknown,
      roomsList: unknown,
    ) => CustomRoomConfig | null,
  ];
  [StageCallback.PRE_SPAWN_GRID]: [
    callback: (
      gridData: unknown,
      gridInformation: unknown,
      entities: unknown,
      gridSpawnRNG: RNG,
    ) => boolean | null,
  ];
  [StageCallback.POST_CHANGE_ROOM_GFX]: [callback: () => void];
  [StageCallback.PRE_STAGEAPI_NEW_ROOM]: [callback: () => void];
  [StageCallback.POST_OVERRIDDEN_GRID_BREAK]: [
    callback: (
      gridIndex: int,
      grid: GridEntity,
      justBrokenGridSpawns: LuaTable<int, RemovedEntityData> | null,
    ) => false | void,
  ];
}

declare global {
  /** @noSelf */
  namespace StageAPI {
    const StageOverride: {
      CatacombsOne: 1;
      CatacombsTwo: 2;
    };

    /**
     * Creates a new custom stage.
     *
     * @param name MUST BE UNIQUE. USED TO IDENTIFY STAGE AND FOR SAVING CURRENT STAGE.
     * @param noSetReplaces Replaces defaults to catacombs one if noSetReplaces is not set.
     */
    function CustomStage(
      name: string,
      StageOverrideStage?: StageOverrideStage,
      noSetReplaces?: boolean,
    ): CustomStage;

    function RoomGfx(
      Backdrop: Backdrop,
      GridGfx: GridGfx | null,
      shadingName: string,
      shadingPrefix: string,
    ): RoomGfx;

    function RoomsList(name: string, ...layouts: unknown[]): RoomsList;
    function GridGfx(): GridGfx;

    /**
     * Stores a function and its params in a table indexed by `ID` and sorted by `priority`,
     * where low priority is at the start.
     */
    function AddCallback<T extends keyof StageAPICallbackParameters>(
      modID: string,
      id: T,
      priority: int,
      ...args: StageAPICallbackParameters[T]
    ): void;

    /** Unregisters all mod callbacks, should be used when a mod loads, useful for `luamod`. */
    function UnregisterCallbacks(modID: Mod): void;

    /** Teleports the player(s) to a specified stage */
    function GotoCustomStage(
      CustomStage: CustomStage,
      playTransition?: boolean,
      noForgetSeed?: boolean,
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
    function BackdropHelper(
      backdrop: {
        Walls: string[];
        NFloors: string[];
        LFloors: string[];
        Corners: string[];
      },
      prefix: string,
      suffix: string,
    ): Backdrop;
  }
}
