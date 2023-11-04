// cspell:ignore STAGEAPI GRIDENTITY

import type { DoorSlot } from "../../enums/DoorSlot";

declare global {
  type StageAPICustomRoomConfig = LuaMap<
    number | string,
    StageAPILuaRoomGenericEntity | number | string
  >;

  interface StageAPILuaRoomDoor extends StageAPILuaRoomGenericEntity {
    EXISTS: boolean;
    SLOT: DoorSlot;
  }

  interface StageAPILuaRoomEntity extends StageAPILuaRoomGenericEntity {
    1: {
      TYPE: int;
      VARIANT: int;
      SUBTYPE: int;
      WEIGHT: float;
      METADATA?: unknown;
    };
  }

  interface StageAPILuaRoomGenericEntity {
    GRIDX: int; // cspell:ignore GRIDX
    GRIDY: int; // cspell:ignore GRIDY
    ISDOOR: boolean; // cspell:ignore ISDOOR
  }
}
