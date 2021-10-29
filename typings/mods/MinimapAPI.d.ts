declare const MinimapAPI: MinimapAPIInterface | undefined;

interface MinimapAPIInterface {
  AddDisplayFlagsCallback(
    mod: Mod,
    func: (
      room: MinimapAPIRoomDescriptor,
      flags: DisplayFlag,
    ) => DisplayFlag | undefined,
  ): void;

  AddIcon(
    id: number | string,
    sprite: Sprite,
    animationName: string,
    frame: number,
    color: Color | undefined,
  ): {
    Sprite: Sprite;
    animationName: string;
    color: Color | undefined;
    frame: number;
    id: number | string;
  };

  AddMapFlag(
    id: number | string,
    condition: () => boolean,
    sprite: Sprite,
    animName: string,
    animFrame: number | (() => number),
  ): {
    ID: number | string;
    anim: string;
    color: Color;
    condition: () => boolean;
    frame: number | (() => number);
    sprite: Sprite;
  };

  AddPickup(
    id: number | string,
    icon: string | MinimapAPIIcon,
    entityType: EntityType,
    variant: number,
    subtype: number,
    func: (pickup: EntityPickup) => boolean | undefined,
    icongroup: string | number,
    priority: number,
  ): MinimapAPIRoomDescriptor;

  AddPlayerPositionCallback(
    mod: Mod,
    func: (
      room: MinimapAPIRoomDescriptor,
      position: Vector,
    ) => Vector | undefined,
  ): void;

  AddRoom(table: {
    /**
     * The display flags that this room will take on if seen from an adjacent room. This is usually
     * 0 for secret rooms, 3 for locked rooms and 5 for all others.
     */
    AdjacentDisplayFlags: DisplayFlag | undefined;

    /**
     * Optional. The API will automatically remove a room if you add this in the same position,
     * setting this to true will disable this functionality.
     */
    AllowRoomOverlap: boolean | undefined;

    /** The clear boolean for the room. */
    Clear: boolean | undefined;

    /** A Color object that is applied when this room is rendered on the map. */
    Color: Color | undefined;

    /**
     * A RoomDescriptor object if you are attaching a vanilla room to this table. Setting this will
     * cause this room's display flags and clear boolean to be taken from this RoomDescriptor.
     */
    Descriptor: RoomDescriptor | undefined;

    /** The display flags for the room. Matches the format of `RoomDescriptor.DisplayFlags`. */
    DisplayFlags: DisplayFlag | undefined;

    /**
     * This room is secret. It will not be revealed by the compass or the treasure map, and it WILL
     * be revealed by the blue map.
     */
    Hidden: boolean | undefined;

    /** Any value. This is used to identify your room later. */
    ID: number | string;

    /**
     * A list of icon IDs that display on the map (e.g. keys and hearts). This will be overridden
     * once the player enters this room.
     */
    ItemIcons: number[] | undefined;

    /**
     * A list of strings like above, but this is only shown when the player does not know the room's
     * type. (e.g. locked shop, dice room)
     */
    LockedIcons: string[] | undefined;

    /**
     * A boolean. If true, then this room's minimap appearance will never be changed by the API
     * itself, meaning its display flags, clear status, visited status and pickup icons will have to
     * be updated externally.
     */
    NoUpdate: boolean | undefined;

    /** A vector representing the position of the room on the minimap. */
    Position: Vector;

    /**
     * A RoomShape enum value that represents the sprite on the minimap and where icons will be
     * placed.
     */
    Shape: RoomShape;

    /**
     * A RoomType enum value. Optional, but recommended if you want the room to work as expected
     * with minimap revealing items.
     */
    Type: RoomType | undefined;

    /**
     * Whether the room has been visited or not. This will be set to true as soon as the player's
     * map position is in line with this room.
     */
    Visited: boolean | undefined;
  }): MinimapAPIRoomDescriptor;

  AddRoomShape(
    id: number | string,
    smallAnims: RoomAnimsTable,
    largeAnims: RoomAnimsTable,
    gridPivot: Vector,
    gridSize: Vector,
    positions: Vector[],
    iconPositions: Vector[],
    iconPositionCenter: Vector,
    largeIconPositions: Vector[],
    largeIconPositionCenter: Vector[],
    adjacentCoords: Vector,
    doorSlots: DoorSlot[] | undefined,
  ): void;

  GetConfig(configOption: string): boolean | number | undefined;

  GetCurrentRoom(): MinimapAPIRoomDescriptor | undefined;

  GetLevel(dimension?: Dimension): MinimapAPIRoomDescriptor[];

  GetPlayerPosition(): Vector;

  GetPositionRelativeToDoor(
    room: MinimapAPIRoomDescriptor,
    doorslot: DoorSlot,
  ): Vector;

  GetRoom(position: Vector): MinimapAPIRoomDescriptor | undefined;

  GetRoomAtPosition(position: Vector): MinimapAPIRoomDescriptor | undefined;

  GetRoomById(id: number | string): MinimapAPIRoomDescriptor | undefined;

  GetRoomByIdx(roomIndex: int): MinimapAPIRoomDescriptor | undefined;

  GetSaveTable(menuExit: boolean): LuaTable;

  IsPositionFree(position: Vector): boolean;

  IsPositionFreeNoAlign(
    position: Vector,
    roomShape: RoomShape | undefined,
  ): boolean;

  IsRoomAdjacent(
    room1: MinimapAPIRoomDescriptor,
    room2: MinimapAPIRoomDescriptor,
  ): boolean;

  PlayerInRoom(room: MinimapAPIRoomDescriptor): boolean;

  RemoveIcon(id: string | number): void;

  RemoveRoom(position: Vector): void;

  RemoveRoomByID(id: number | string): void;

  SetPlayerPosition(position: Vector): void;

  Config: {
    Disable: boolean;
    DisplayExploredRooms: boolean;
    DisplayMode: 0 | 1 | 2;
    DisplayOnNoHUD: boolean;
    HideInCombat: boolean;
    MapFrameHeight: number;
    MapFrameWidth: number;
    OverrideLost: boolean;
    OverrideVoid: boolean;
    PositionX: number;
    PositionY: number;
    ShowCurrentRoomItems: boolean;
    ShowIcons: boolean;
    ShowLevelFlags: boolean;
    ShowShadows: boolean;
    SmoothSlidingSpeed: number;
  };

  Debug: {
    Colors(): void;
    Icons(): void;
    RandomMap(): void;
    Shapes(): void;
  };

  Levels: Map<Dimension, MinimapAPIRoomDescriptor[]>;

  OverrideConfig: {
    Disable: boolean | undefined;
    DisplayExploredRooms: boolean | undefined;
    DisplayMode: 0 | 1 | 2 | undefined;
    DisplayOnNoHUD: boolean | undefined;
    HideInCombat: boolean | undefined;
    MapFrameHeight: number | undefined;
    MapFrameWidth: number | undefined;
    OverrideLost: boolean | undefined;
    OverrideVoid: boolean | undefined;
    PositionX: number | undefined;
    PositionY: number | undefined;
    ShowCurrentRoomItems: boolean | undefined;
    ShowIcons: boolean | undefined;
    ShowLevelFlags: boolean | undefined;
    ShowShadows: boolean | undefined;
    SmoothSlidingSpeed: number | undefined;
  };
  ReleaseVersion: number | undefined;
  Version: string | number;
}

interface MinimapAPIIcon {
  Color: Color;
  anim: string;
  frame: number;
  sprite: Sprite;
}

interface RoomAnimsTable {
  RoomCurrent: {
    anim: string;
    frame: number;
    sprite: Sprite;
  };

  RoomSemivisited: {
    anim: string;
    frame: number;
    sprite: Sprite;
  };

  RoomUnvisited: {
    anim: string;
    frame: number;
    sprite: Sprite;
  };

  RoomVisited: {
    anim: string;
    frame: number;
    sprite: Sprite;
  };
}

interface MinimapAPIRoomDescriptor {
  GetAdjacentRooms(): MinimapAPIRoomDescriptor[];
  GetDisplayFlags(): int;
  IsClear(): boolean;
  IsIconVisible(): boolean;
  IsShadow(): boolean;
  IsVisible(): boolean;
  IsVisited(): boolean;
  Remove(): void;
  SetPosition(pos: Vector): void;

  AdjacentDisplayFlags: int;
  Clear: boolean;
  Color: Color;
  Descriptor: RoomDescriptor;
  DisplayFlags: int;
  DisplayPosition: Vector;
  Hidden: boolean;
  ID: int;
  ItemIcons: string[];
  LockedIcons: string[];
  NoUpdate: boolean;
  PermanentIcons: string[];
  Position: Vector;
  RenderOffset: Vector;
  Shape: RoomShape;
  TargetRenderOffset: Vector;
  Type: RoomType;
  Visited: boolean;
}
