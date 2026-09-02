import type { Dimension } from "../../enums/Dimension";
import type { DoorSlot } from "../../enums/DoorSlot";
import type { EntityType } from "../../enums/EntityType";
import type { DisplayFlag } from "../../enums/flags/DisplayFlag";
import type { GridRoom } from "../../enums/GridRoom";
import type { RoomShape } from "../../enums/RoomShape";
import type { RoomType } from "../../enums/RoomType";

declare global {
  /**
   * This is the global variable exposed by the third-party MiniMAPI mod, which provides
   * descriptions for items and is often utilized by other mods that include items.
   *
   * @see https://steamcommunity.com/sharedfiles/filedetails/?id=1978904635
   */
  const MinimapAPI: MinimapAPIInterface | undefined;

  interface MinimapAPIIcon {
    Color: Color;
    anim: string;
    frame: number;
    sprite: Sprite;
  }

  interface MinimapAPIInterface {
    readonly AddDisplayFlagsCallback: (
      mod: Mod,
      func: (
        room: MinimapAPIRoomDescriptor,
        flags: BitFlags<DisplayFlag>,
      ) => BitFlags<DisplayFlag> | undefined,
    ) => void;

    readonly AddIcon: (
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

    readonly AddMapFlag: (
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

    readonly AddPickup: (
      id: number | string,
      icon: string | MinimapAPIIcon,
      entityType: EntityType,
      variant: number,
      subtype: number,
      func: (pickup: EntityPickup) => boolean | undefined,
      icongroup: string | number, // cspell:ignore icongroup
      priority: number,
    ) => MinimapAPIRoomDescriptor;

    readonly AddPlayerPositionCallback: (
      mod: Mod,
      func: (
        room: MinimapAPIRoomDescriptor,
        position: Vector,
      ) => Vector | undefined,
    ) => void;

    readonly AddRoom: (table: {
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

    readonly AddRoomShape: (
      id: number | string,
      smallAnims: MinimapAPIRoomAnimsTable, // cspell:ignore Anims
      largeAnims: MinimapAPIRoomAnimsTable,
      gridPivot: Vector,
      gridSize: Vector,
      positions: readonly Vector[],
      iconPositions: readonly Vector[],
      iconPositionCenter: Vector,
      largeIconPositions: readonly Vector[],
      largeIconPositionCenter: readonly Vector[],
      adjacentCoords: Vector,
      doorSlots?: readonly DoorSlot[],
    ) => void;

    readonly GetConfig: (configOption: string) => boolean | number | undefined;

    readonly GetCurrentRoom: () => MinimapAPIRoomDescriptor | undefined;

    readonly GetLevel: (dimension?: Dimension) => MinimapAPIRoomDescriptor[];

    readonly GetPlayerPosition: () => Vector;

    readonly GetPositionRelativeToDoor: (
      room: MinimapAPIRoomDescriptor,
      doorslot: DoorSlot, // cspell:ignore doorslot
    ) => Vector;

    readonly GetRoom: (position: Vector) => MinimapAPIRoomDescriptor | undefined;

    readonly GetRoomAtPosition: (
      position: Vector,
    ) => MinimapAPIRoomDescriptor | undefined;

    readonly GetRoomById: (id: number | string) => MinimapAPIRoomDescriptor | undefined;

    readonly GetRoomByIdx: (
      roomGridIndex: int | GridRoom,
    ) => MinimapAPIRoomDescriptor | undefined;

    readonly GetSaveTable: (menuExit: boolean) => LuaMap;

    readonly IsPositionFree: (position: Vector) => boolean;

    readonly IsPositionFreeNoAlign: (position: Vector, roomShape?: RoomShape) => boolean;

    readonly IsRoomAdjacent: (
      room1: MinimapAPIRoomDescriptor,
      room2: MinimapAPIRoomDescriptor,
    ) => boolean;

    readonly PlayerInRoom: (room: MinimapAPIRoomDescriptor) => boolean;

    readonly RemoveIcon: (id: string | number) => void;

    readonly RemoveRoom: (position: Vector) => void;

    readonly RemoveRoomByID: (id: number | string) => void;

    readonly SetPlayerPosition: (position: Vector) => void;

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

    readonly PickupChestNotCollected: (pickup: EntityPickup) => boolean | undefined;
    readonly PickupNotCollected: (pickup: EntityPickup) => boolean | undefined;
    readonly PickupSlotMachineNotBroken: (slot: Entity) => boolean | undefined;

    ReleaseVersion?: number;
    Version: string | number;
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
    readonly AddAdjacentRoom: (room: MinimapAPIRoomDescriptor) => void;
    readonly GetAdjacentRooms: () => MinimapAPIRoomDescriptor[];
    readonly GetColor: () => Color;
    readonly GetDisplayFlags: () => BitFlags<DisplayFlag>;
    readonly GetDisplayPosition: () => Vector;
    readonly GetPosition: () => Vector;
    readonly IsClear: () => boolean;
    readonly IsIconVisible: () => boolean;
    readonly IsShadow: () => boolean;
    readonly IsValidTeleportTarget: () => boolean;
    readonly IsVisible: () => boolean;
    readonly IsVisited: () => boolean;
    readonly Remove: () => void;
    readonly RemoveAdjacentRoom: (
      roomToRemove: MinimapAPIRoomDescriptor,
    ) => MinimapAPIRoomDescriptor;
    readonly Reveal: () => void;
    readonly SetDisplayFlags: (displayFlags: BitFlags<DisplayFlag>) => void;
    readonly SetPosition: (pos: Vector) => void;
    readonly SyncRoomDescriptor: () => void;
    readonly UpdateAdjacentRoomsCache: () => void;
    readonly UpdateType: () => void;

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

  interface MinimapAPITeleportHandler {
    readonly CanTeleport: (
      room: MinimapAPIRoomDescriptor,
      cheatMode: boolean,
    ) => boolean;
    readonly Teleport: (room: MinimapAPIRoomDescriptor) => void;
  }
}
