import type {
  DoorSlot,
  DoorSlotFlag,
  RoomShape,
  RoomType,
  StageID,
} from "isaac-typescript-definitions";
import type { GameMode } from "../../../enums/GameMode";

declare global {
  interface LuaRoomSpawnEntryREPENTOGON {
    TYPE: int;
    VARIANT?: int;
    SUBTYPE?: int;
    WEIGHT?: number;
  }

  interface LuaRoomDoorREPENTOGON {
    ISDOOR: true; // cspell:ignore ISDOOR
    EXISTS: boolean;
    SLOT?: DoorSlot;
    GRIDX?: int; // cspell:ignore GRIDX
    GRIDY?: int; // cspell:ignore GRIDY
  }

  interface LuaRoomSpawnREPENTOGON {
    GRIDX: int; // cspell:ignore GRIDX
    GRIDY: int; // cspell:ignore GRIDY
    [index: int]: LuaRoomSpawnEntryREPENTOGON;
  }

  interface LuaRoomREPENTOGON {
    TYPE: RoomType;
    VARIANT: int;
    NAME: string;
    SHAPE: RoomShape;
    SUBTYPE?: int;
    DIFFICULTY?: int;
    WEIGHT?: number;
    [index: int]: LuaRoomDoorREPENTOGON | LuaRoomSpawnREPENTOGON;
  }

  interface RoomConfig extends IsaacAPIClass {
    Mode: int;
  }

  /** @noSelf */
  namespace RoomConfig {
    function AddRooms(
      stbType: StageID,
      gameMode: GameMode | -1,
      rooms: readonly LuaRoomREPENTOGON[],
    ): Array<RoomConfig | undefined>;

    /**
     * @param seed
     * @param reduceWeight
     * @param stage
     * @param roomType
     * @param shape Optional. If undefined, any RoomShape can be chosen.
     * @param minVariant Optional. Default is 0.
     * @param maxVariant Optional. Default is -1.
     * @param minDifficulty Optional. Default is 0.
     * @param maxDifficulty Optional. Default is 10.
     * @param doors Optional. Default allows for any DoorSlots.
     * @param subType Optional. Default is -1.
     * @param gameMode Optional. Default allows any room regardless of the game mode to be chosen.
     */
    function GetRandomRoom(
      seed: Seed,
      reduceWeight: boolean,
      stage: StageID,
      roomType: RoomType,
      shape?: RoomShape,
      minVariant?: int,
      maxVariant?: int,
      minDifficulty?: int,
      maxDifficulty?: int,
      doors?: BitFlags<DoorSlotFlag>,
      subType?: int,
      gameMode?: GameMode,
    ): RoomConfig;

    /**
     * @param stage
     * @param roomType
     * @param variant
     * @param gameMode Optional. Default allows any room regardless of the game mode to be chosen.
     */
    function GetRoomByStageTypeAndVariant(
      stage: StageID,
      roomType: RoomType,
      variant: int,
      gameMode?: GameMode,
    ): RoomConfig | undefined;

    function GetStage(stbType: StageID): RoomConfigStage;
  }
}
