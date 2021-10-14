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
    Sprite: Sprite,
    animationName: string,
    frame: number,
    color: Color | undefined,
  ): {
    id: number | string;
    Sprite: Sprite;
    animationName: string;
    frame: number;
    color: Color | undefined;
  };
  AddMapFlag(
    id: number | string,
    condition: () => boolean,
    sprite: Sprite,
    animName: string,
    animFrame: number | (() => number),
  ): {
    ID: number | string;
    condition: () => boolean;
    sprite: Sprite;
    anim: string;
    frame: number | (() => number);
    color: Color;
  };
  AddPickup(
    id: number | string,
    Icon: string | MinimapAPIIcon,
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
    /** any value. This is used to identify your room later. */
    ID: number | string;
    /** a vector representing the position of the room on the minimap. */
    Position: Vector;
    /**
      a RoomShape enum value that represents the sprite on the minimap and where
      icons will be placed.
     */
    Shape: RoomShape;
    /** Anything below is optional */
    /**
       A RoomType enum value. Optional, but recommended if you want the room to work
      as expected with minimap revealing items.
     */
    Type: RoomType | undefined;
    /**
       A list of strings like above, but this is only shown when the player does not
      know the room's type (eg locked shop, dice room)
     */
    LockedIcons: string[] | undefined;
    /** A list of icon IDs that display on the map (eg keys and hearts). This will be overridden once the player enters this room. */
    ItemIcons: number[] | undefined;
    /**
       The display flags for the room. Matches the format of
      RoomDescriptor.DisplayFlags.
     */
    DisplayFlags: DisplayFlag | undefined;
    /**
       The display flags that this room will take on if seen from an adjacent room.
      This is usually 0 for secret rooms, 3 for locked rooms and 5 for all others.
     */
    AdjacentDisplayFlags: DisplayFlag | undefined;
    /**
       This room is secret. It will not be revealed by the compass or the treasure
      map, and it WILL be revealed by the blue map.
     */
    Hidden: boolean | undefined;
    /** The clear boolean for the room. */
    Clear: boolean | undefined;
    /**
        Whether the room has been visited or not. This will be set to true as soon as
       the player's map position is in line with this room.
     */
    Visited: boolean | undefined;
    /**
        a boolean. If true, then this room's minimap appearance will never be changed
       by the API itself, meaning its display flags, clear status, visited status and pickup icons
       will have to be updated externally.
     */
    NoUpdate: boolean | undefined;
    /** a Color object that is applied when this room is rendered on the map. */
    Color: Color | undefined;
    /**
       a RoomDescriptor object if you are attaching a vanilla room to this table.
      Setting this will cause this room's display flags and clear boolean to be taken from this RoomDescriptor.
     */
    Descriptor: RoomDescriptor | undefined;
    /** optional. The API will automatically remove a room if you add this in the same position, setting this to true will disable this functionality. */
    AllowRoomOverlap: boolean | undefined;
  }): MinimapAPIRoomDescriptor;
  AddRoomShape(
    id: number | string,
    small_anims: RoomAnimsTable,
    large_anims: RoomAnimsTable,
    gridpivot: Vector,
    gridsize: Vector,
    positions: Vector[],
    iconpositions: Vector[],
    iconpositioncenter: Vector,
    largeiconpositions: Vector[],
    largeiconpositioncenter: Vector[],
    adjacentcoords: Vector,
    doorslots: DoorSlot[] | undefined,
  ): void;
  GetConfig(configOption: string): boolean | number | undefined;
  GetCurrentRoom(): MinimapAPIRoomDescriptor | undefined;
  GetLevel(dimension?: Dimension): MinimapAPIRoomDescriptor[];
  GetRoom(position: Vector): MinimapAPIRoomDescriptor | undefined;
  GetRoomAtPosition(position: Vector): MinimapAPIRoomDescriptor | undefined;
  GetRoomById(id: number | string): MinimapAPIRoomDescriptor | undefined;
  GetRoomByIdx(roomIndex: int): MinimapAPIRoomDescriptor | undefined;
  GetPlayerPosition(): Vector;
  GetPositionRelativeToDoor(
    room: MinimapAPIRoomDescriptor,
    doorslot: DoorSlot,
  ): Vector;
  GetSaveTable(menuexit: boolean): LuaTable;
  IsPositionFree(position: Vector): boolean;
  IsPositionFreeNoAlign(
    position: Vector,
    roomshape: RoomShape | undefined,
  ): boolean;
  IsRoomAdjacent(
    room1: MinimapAPIRoomDescriptor,
    room2: MinimapAPIRoomDescriptor,
  ): boolean;
  PlayerInRoom(room: MinimapAPIRoomDescriptor): boolean;
  SetPlayerPosition(position: Vector): void;
  RemoveIcon(id: string | number): void;
  RemoveRoom(position: Vector): void;
  RemoveRoomByID(id: number | string): void;
  Config: {
    Disable: boolean;
    DisplayOnNoHUD: boolean;
    OverrideLost: boolean;
    ShowIcons: boolean;
    ShowShadows: boolean;
    ShowCurrentRoomItems: boolean;
    MapFrameWidth: number;
    MapFrameHeight: number;
    PositionX: number;
    PositionY: number;
    DisplayMode: 0 | 1 | 2;
    ShowLevelFlags: boolean;
    SmoothSlidingSpeed: number;
    HideInCombat: boolean;
    OverrideVoid: boolean;
    DisplayExploredRooms: boolean;
  };
  Debug: {
    Icons(): void;
    Shapes(): void;
    RandomMap(): void;
    Colors(): void;
  };
  Levels: Map<Dimension, MinimapAPIRoomDescriptor[]>;
  OverrideConfig: {
    Disable: boolean | undefined;
    DisplayOnNoHUD: boolean | undefined;
    OverrideLost: boolean | undefined;
    ShowIcons: boolean | undefined;
    ShowShadows: boolean | undefined;
    ShowCurrentRoomItems: boolean | undefined;
    MapFrameWidth: number | undefined;
    MapFrameHeight: number | undefined;
    PositionX: number | undefined;
    PositionY: number | undefined;
    DisplayMode: 0 | 1 | 2 | undefined;
    ShowLevelFlags: boolean | undefined;
    SmoothSlidingSpeed: number | undefined;
    HideInCombat: boolean | undefined;
    OverrideVoid: boolean | undefined;
    DisplayExploredRooms: boolean | undefined;
  };
  ReleaseVersion: number | undefined;
  Version: string | number;
}
interface MinimapAPIIcon {
  sprite: Sprite;
  anim: string;
  frame: number;
  Color: Color;
}
interface RoomAnimsTable {
  RoomUnvisited: { sprite: Sprite; anim: string; frame: number };
  RoomVisited: { sprite: Sprite; anim: string; frame: number };
  RoomCurrent: { sprite: Sprite; anim: string; frame: number };
  RoomSemivisited: { sprite: Sprite; anim: string; frame: number };
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
