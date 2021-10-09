declare const MinimapAPI: MinimapAPIInterface | undefined;

interface MinimapAPIInterface {
  Config: {
    Disable: boolean;
  };

  GetRoomByIdx(roomIndex: int): MinimapAPIRoomDescriptor | undefined;
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
  Level: MinimapAPIRoomDescriptor[];
}
