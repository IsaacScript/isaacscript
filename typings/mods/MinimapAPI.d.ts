declare const MinimapAPI: MinimapAPIInterface | undefined;

interface MinimapAPIInterface {
  Config: {
    Disable: boolean;
  };

  GetRoomByIdx(roomIndex: int): MinimapAPIRoomDescriptor | undefined;
}

interface MinimapAPIRoomDescriptor {
  Remove(): void;
  DisplayFlags: int;
}
