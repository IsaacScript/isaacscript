declare const MinimapAPI: MinimapAPIInterface | undefined;

interface MinimapAPIInterface {
  GetRoomByIdx(roomIndex: int): MinimapAPIRoomDescriptor | undefined;
  GetLevel(dimension: Dimension): MinimapAPIRoomDescriptor[];

  Config: {
    Disable: boolean;
  };
  Levels: Map<Dimension, MinimapAPIRoomDescriptor[]>;
}

interface MinimapAPIRoomDescriptor {
  IsVisible(): boolean;
  IsShadow(): boolean;
  IsIconVisible(): boolean;
  IsVisited(): boolean;
  GetAdjacentRooms(): MinimapAPIRoomDescriptor[];
  GetDisplayFlags(): int;
  IsClear(): boolean;
  Remove(): void;

  DisplayFlags: int;
}
