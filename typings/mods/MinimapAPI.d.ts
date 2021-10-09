declare const MinimapAPI: MinimapAPIInterface | undefined;

interface MinimapAPIInterface {
  GetRoomByIdx(roomIndex: int): MinimapAPIRoomDescriptor | undefined;

  Config: {
    Disable: boolean;
  };
  Level: MinimapAPIRoomDescriptor[];
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
