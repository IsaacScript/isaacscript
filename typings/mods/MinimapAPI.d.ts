declare const MinimapAPI: MinimapAPIInterface | undefined;

interface MinimapAPIInterface {
  GetRoomByIdx(roomIndex: int): MinimapAPIRoomDescriptor | undefined;
  GetLevel(dimension?: Dimension): MinimapAPIRoomDescriptor[];

  Config: {
    Disable: boolean;
  };
  Levels: Map<Dimension, MinimapAPIRoomDescriptor[]>;
}

interface MinimapAPIRoomDescriptor {
  GetAdjacentRooms(): MinimapAPIRoomDescriptor[];
  GetConfig(configOption: string): unknown;
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
  OverrideConfig: Record<string, unknown>;
  PermanentIcons: unknown[];
  Position: Vector;
  RenderOffset: Vector;
  Shape: RoomShape;
  TargetRenderOffset: Vector;
  Type: RoomType;
  Visited: boolean;
}
