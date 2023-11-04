import type { Dimension } from "../../enums/Dimension";
import type { DoorSlot } from "../../enums/DoorSlot";
import type { EntityType } from "../../enums/EntityType";
import type { DisplayFlag } from "../../enums/flags/DisplayFlag";
import type { GridRoom } from "../../enums/GridRoom";
import type { RoomShape } from "../../enums/RoomShape";
import type { RoomType } from "../../enums/RoomType";

declare global {
  const MinimapAPI: MinimapAPIInterface | undefined;

  interface MinimapAPIInterface {
    AddDisplayFlagsCallback: (
      mod: Mod,
      func: (
        room: MinimapAPIRoomDescriptor,
        flags: BitFlags<DisplayFlag>,
      ) => BitFlags<DisplayFlag> | undefined,
    ) => void;

    AddIcon: (
      id: number | string,
      sprite: Sprite,
      animationName: string,
      frame: number,
      color?: Color,
    ) => {
      Sprite: Sprite;
      animationName: string;
      color?: Color;
      frame: number;
      id: number | string;
    };

    AddMapFlag: (
      id: number | string,
      condition: () => boolean,
      sprite: Sprite,
      animName: string,
      animFrame: number | (() => number),
    ) => {
      ID: number | string;
      anim: string;
      color: Color;
      condition: () => boolean;
      frame: number | (() => number);
      sprite: Sprite;
    };

    AddPickup: (
      id: number | string,
      icon: string | MinimapAPIIcon,
      entityType: EntityType,
      variant: number,
      subtype: number,
      func: (pickup: EntityPickup) => boolean | undefined,
      icongroup: string | number, // cspell:ignore icongroup
      priority: number,
    ) => MinimapAPIRoomDescriptor;

    AddPlayerPositionCallback: (
      mod: Mod,
      func: (
        room: MinimapAPIRoomDescriptor,
        position: Vector,
      ) => Vector | undefined,
    ) => void;

    AddRoom: (table: {
      /**
       * The display flags that this room will take on if seen from an adjacent room. This is
       * usually 0 for secret rooms, 3 for locked rooms and 5 for all others.
       */
      AdjacentDisplayFlags?: DisplayFlag | BitFlags<DisplayFlag>;

      /**
       * The API will automatically remove a room if you add this in the same position, setting this
       * to true will disable this functionality.
       */
      AllowRoomOverlap?: boolean;

      /** The clear boolean for the room. */
      Clear?: boolean;

      /** A Color object that is applied when this room is rendered on the map. */
      Color?: Color;

      /**
       * A RoomDescriptor object if you are attaching a vanilla room to this table. Setting this
       * will cause this room's display flags and clear boolean to be taken from this
       * RoomDescriptor.
       */
      Descriptor?: RoomDescriptor;

      /** The display flags for the room. Matches the format of `RoomDescriptor.DisplayFlags`. */
      DisplayFlags?: DisplayFlag | BitFlags<DisplayFlag>;

      /** See the `Hidden` property of `MinimapAPIRoomDescriptor`. */
      Hidden?: boolean;

      /** Any value. This is used to identify your room later. */
      ID: number | string;

      /**
       * A list of icon IDs that display on the map (e.g. keys and hearts). This will be overridden
       * once the player enters this room.
       */
      ItemIcons?: number[];

      /**
       * A list of strings. This is only shown when the player does not know the room's type (e.g.
       * locked shop, dice room).
       */
      LockedIcons?: string[];

      /**
       * A boolean. If true, then this room's minimap appearance will never be changed by the API
       * itself, meaning its display flags, clear status, visited status and pickup icons will have
       * to be updated externally.
       */
      NoUpdate?: boolean;

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
      Type?: RoomType;

      /**
       * Whether the room has been visited. This will be set to true as soon as the player's map
       * position is in line with this room.
       */
      Visited?: boolean;
    }) => MinimapAPIRoomDescriptor;

    AddRoomShape: (
      id: number | string,
      smallAnims: MinimapAPIRoomAnimsTable, // cspell:ignore Anims
      largeAnims: MinimapAPIRoomAnimsTable,
      gridPivot: Vector,
      gridSize: Vector,
      positions: Vector[],
      iconPositions: Vector[],
      iconPositionCenter: Vector,
      largeIconPositions: Vector[],
      largeIconPositionCenter: Vector[],
      adjacentCoords: Vector,
      doorSlots?: DoorSlot[],
    ) => void;

    GetConfig: (configOption: string) => boolean | number | undefined;

    GetCurrentRoom: () => MinimapAPIRoomDescriptor | undefined;

    GetLevel: (dimension?: Dimension) => MinimapAPIRoomDescriptor[];

    GetPlayerPosition: () => Vector;

    GetPositionRelativeToDoor: (
      room: MinimapAPIRoomDescriptor,
      doorslot: DoorSlot, // cspell:ignore doorslot
    ) => Vector;

    GetRoom: (position: Vector) => MinimapAPIRoomDescriptor | undefined;

    GetRoomAtPosition: (
      position: Vector,
    ) => MinimapAPIRoomDescriptor | undefined;

    GetRoomById: (id: number | string) => MinimapAPIRoomDescriptor | undefined;

    GetRoomByIdx: (
      roomGridIndex: int | GridRoom,
    ) => MinimapAPIRoomDescriptor | undefined;

    GetSaveTable: (menuExit: boolean) => LuaMap;

    IsPositionFree: (position: Vector) => boolean;

    IsPositionFreeNoAlign: (position: Vector, roomShape?: RoomShape) => boolean;

    IsRoomAdjacent: (
      room1: MinimapAPIRoomDescriptor,
      room2: MinimapAPIRoomDescriptor,
    ) => boolean;

    PlayerInRoom: (room: MinimapAPIRoomDescriptor) => boolean;

    RemoveIcon: (id: string | number) => void;

    RemoveRoom: (position: Vector) => void;

    RemoveRoomByID: (id: number | string) => void;

    SetPlayerPosition: (position: Vector) => void;

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
      Colors: () => void;
      Icons: () => void;
      RandomMap: () => void;
      Shapes: () => void;
    };

    Levels: Map<Dimension, MinimapAPIRoomDescriptor[]>;

    OverrideConfig: {
      Disable?: boolean;
      DisplayExploredRooms?: boolean;
      DisplayMode?: 0 | 1 | 2;
      DisplayOnNoHUD?: boolean;
      HideInCombat?: boolean;
      MapFrameHeight?: number;
      MapFrameWidth?: number;
      OverrideLost?: boolean;
      OverrideVoid?: boolean;
      PositionX?: number;
      PositionY?: number;
      ShowCurrentRoomItems?: boolean;
      ShowIcons?: boolean;
      ShowLevelFlags?: boolean;
      ShowShadows?: boolean;
      SmoothSlidingSpeed?: number;
    };

    PickupChestNotCollected: (pickup: EntityPickup) => boolean | undefined;
    PickupNotCollected: (pickup: EntityPickup) => boolean | undefined;
    PickupSlotMachineNotBroken: (slot: Entity) => boolean | undefined;

    ReleaseVersion?: number;
    Version: string | number;
  }

  interface MinimapAPITeleportHandler {
    CanTeleport: (
      room: MinimapAPIRoomDescriptor,
      cheatMode: boolean,
    ) => boolean;
    Teleport: (room: MinimapAPIRoomDescriptor) => void;
  }

  interface MinimapAPIIcon {
    Color: Color;
    anim: string;
    frame: number;
    sprite: Sprite;
  }

  interface MinimapAPIRoomAnimsTable {
    RoomCurrent: {
      anim: string;
      frame: number;
      sprite: Sprite;
    };

    // cspell:ignore Semivisited
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
    AddAdjacentRoom: (room: MinimapAPIRoomDescriptor) => void;
    GetAdjacentRooms: () => MinimapAPIRoomDescriptor[];
    GetColor: () => Color;
    GetDisplayFlags: () => BitFlags<DisplayFlag>;
    GetDisplayPosition: () => Vector;
    GetPosition: () => Vector;
    IsClear: () => boolean;
    IsIconVisible: () => boolean;
    IsShadow: () => boolean;
    IsValidTeleportTarget: () => boolean;
    IsVisible: () => boolean;
    IsVisited: () => boolean;
    Remove: () => void;
    RemoveAdjacentRoom: (
      roomToRemove: MinimapAPIRoomDescriptor,
    ) => MinimapAPIRoomDescriptor;
    Reveal: () => void;
    SetDisplayFlags: (displayFlags: BitFlags<DisplayFlag>) => void;
    SetPosition: (pos: Vector) => void;
    SyncRoomDescriptor: () => void;
    UpdateAdjacentRoomsCache: () => void;
    UpdateType: () => void;

    AdjacentDisplayFlags: BitFlags<DisplayFlag>;
    Clear: boolean;
    Color: Color;
    Descriptor: RoomDescriptor;
    Dimension: int;
    DisplayFlags: BitFlags<DisplayFlag>;
    DisplayPosition: Vector;

    /**
     * External mods can set this to unconditionally hide a specific room (regardless of whether the
     * player is in or next to the room).
     *
     * MinimapAPI does not ever set this internally.
     */
    Hidden: boolean;

    ID: int;
    IgnoreDescriptorFlags: boolean;
    ItemIcons: string[];
    LockedIcons: string[];
    NoUpdate: boolean;
    PermanentIcons: string[];
    Position: Vector;
    RenderOffset: Vector;
    Shape: RoomShape;
    TargetRenderOffset: Vector;
    TeleportHandler: MinimapAPITeleportHandler;
    Type: RoomType;
    Visited: boolean;
    VisitedIcons: string[];
  }
}
