declare const MinimapAPI: MinimapAPIObject | undefined;

interface MinimapAPIObject {
  Config: {
    Disable: boolean;
  };

  GetRoomByIdx(roomIndex: int): MinimapAPIRoomDescriptor;
}

interface MinimapAPIRoomDescriptor {
  Remove(): void;
  DisplayFlags: int;
}
