declare const MinimapAPI: MinimapAPIInterface | undefined;

interface MinimapAPIInterface {
  GetConfig(configOption: string): unknown;
  GetLevel(dimension?: Dimension): MinimapAPIRoomDescriptor[];
  GetRoomByIdx(roomIndex: int): MinimapAPIRoomDescriptor | undefined;

  Config: {
    Disable: boolean;
  };
  Levels: Map<Dimension, MinimapAPIRoomDescriptor[]>;
  OverrideConfig: Record<string, unknown>;
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

  AdjacentDisplayFlags: int;
  Clear: boolean;
  Color: Color;
  Descriptor: RoomDescriptor;
  DisplayFlags: int;
  DisplayPosition: Vector;
  Hidden: boolean;
  ID: int;
  ItemIcons: unknown[];
  LockedIcons: unknown[];
  NoUpdate: boolean;
  PermanentIcons: unknown[];
  Position: Vector;
  RenderOffset: Vector;
  Shape: RoomShape;
  TargetRenderOffset: Vector;
  Type: RoomType;
  Visited: boolean;
}
