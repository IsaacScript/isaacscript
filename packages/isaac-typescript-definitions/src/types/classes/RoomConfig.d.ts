import type { DoorSlotFlag } from "../../enums/flags/DoorSlotFlag";
import type { RoomDifficulty } from "../../enums/RoomDifficulty";
import type { RoomShape } from "../../enums/RoomShape";
import type { RoomType } from "../../enums/RoomType";
import type { StageID } from "../../enums/StageID";

declare global {
  /**
   * This is equal to `RoomConfigRoom` in the docs:
   * https://wofsauge.github.io/IsaacDocs/rep/RoomConfig_Room.html
   */
  interface RoomConfig extends IsaacAPIClass {
    readonly Difficulty: RoomDifficulty;

    /**
     * This does not match the actual doors in the room, but rather the valid door positions from
     * the STB for this room.
     */
    readonly Doors: BitFlags<DoorSlotFlag>;

    readonly Height: int;
    readonly InitialWeight: float;

    // Mode is not implemented since it returns useless userdata.

    readonly Name: string;
    readonly OriginalVariant: int;
    readonly Shape: RoomShape;
    readonly SpawnCount: int;
    readonly Spawns: SpawnList;
    readonly StageID: StageID;
    readonly Subtype: int;
    readonly Type: RoomType;
    readonly Variant: int;
    readonly Weight: float;
    readonly Width: int;
  }
}
