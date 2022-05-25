// This is "RoomConfigRoom" in the docs:
// https://wofsauge.github.io/IsaacDocs/rep/RoomConfig_Room.html

import { DoorSlotFlag } from "../enums/flags/DoorSlotFlag";
import { RoomDifficulty } from "../enums/RoomDifficulty";
import { RoomShape } from "../enums/RoomShape";
import { RoomType } from "../enums/RoomType";
import { StageID } from "../enums/StageID";

declare global {
  interface RoomConfig {
    Difficulty: RoomDifficulty;
    Doors: BitFlags<DoorSlotFlag>;
    Height: int;
    InitialWeight: float;
    Name: string;
    Shape: RoomShape;
    SpawnCount: int;
    Spawns: SpawnList;
    StageID: StageID;
    Subtype: int;
    Type: RoomType;
    Variant: int;
    Weight: float;
    Width: int;
  }
}
