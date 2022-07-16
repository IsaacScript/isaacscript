import {
  DoorSlotFlag,
  GridEntityType,
  ModCallback,
  RoomShape,
  RoomType,
} from "isaac-typescript-definitions";
import { game } from "../../cachedClasses";
import { ModUpgraded } from "../../classes/ModUpgraded";
import { ModCallbackCustom } from "../../enums/ModCallbackCustom";
import { isArray } from "../../functions/array";
import { CustomStage, RoomTypeMap } from "../../interfaces/CustomStage";
import {
  CustomStageLua,
  CustomStageRoomMetadata,
} from "../../interfaces/CustomStageLua";
import { saveDataManager } from "../saveDataManager/exports";
import { setBackdrop } from "./backdrop";
import {
  removeUrnRewards,
  setCustomDecorationGraphics,
  setCustomDoorGraphics,
  setCustomPitGraphics,
  setCustomRockGraphics,
} from "./gridEntities";
import * as metadataJSON from "./metadata.json"; // This will correspond to "metadata.lua" at run-time.
import { setShadows, shadowsPostRender } from "./shadows";
import { streakTextPostRender } from "./streakText";
import v, { customStagesMap } from "./v";
import {
  playVersusScreenAnimation,
  versusScreenPostRender,
} from "./versusScreen";

export function customStageInit(mod: ModUpgraded): void {
  saveDataManager("customStage", v);
  initRoomTypeMaps();

  mod.AddCallback(ModCallback.POST_RENDER, postRender); // 2

  mod.AddCallback(ModCallback.GET_SHADER_PARAMS, getShaderParams); // 21

  mod.AddCallbackCustom(
    ModCallbackCustom.POST_GRID_ENTITY_BROKEN,
    postGridEntityBrokenRockAlt,
    GridEntityType.ROCK_ALT,
  );

  mod.AddCallbackCustom(
    ModCallbackCustom.POST_GRID_ENTITY_INIT,
    postGridEntityBrokenInit,
  );

  mod.AddCallbackCustom(
    ModCallbackCustom.POST_NEW_ROOM_REORDERED,
    postNewRoomReordered,
  );
}

function initRoomTypeMaps() {
  if (!isArray(metadataJSON)) {
    error(
      'The IsaacScript standard library attempted to read the custom stage metadata from the "metadata.lua" file, but it was not an array.',
    );
  }
  const customStagesLua = metadataJSON as CustomStageLua[];

  for (const customStageLua of customStagesLua) {
    const roomTypeMap = getRoomTypeMap(customStageLua);
    const customStage: CustomStage = {
      ...customStageLua,
      roomTypeMap,
    };
    customStagesMap.set(customStage.name, customStage);
  }
}

function getRoomTypeMap(customStageLua: CustomStageLua): RoomTypeMap {
  const roomTypeMap = new Map<
    RoomType,
    Map<RoomShape, Map<DoorSlotFlag, CustomStageRoomMetadata[]>>
  >();

  for (const roomMetadata of customStageLua.roomsMetadata) {
    const roomType = roomMetadata.type as RoomType;

    let roomShapeMap = roomTypeMap.get(roomType);
    if (roomShapeMap === undefined) {
      roomShapeMap = new Map<
        RoomShape,
        Map<DoorSlotFlag, CustomStageRoomMetadata[]>
      >();
      roomTypeMap.set(roomType, roomShapeMap);
    }

    const roomShape = roomMetadata.shape as RoomShape;

    let roomDoorSlotFlagMap = roomShapeMap.get(roomShape);
    if (roomDoorSlotFlagMap === undefined) {
      roomDoorSlotFlagMap = new Map<
        BitFlags<DoorSlotFlag>,
        CustomStageRoomMetadata[]
      >();
      roomShapeMap.set(roomShape, roomDoorSlotFlagMap);
    }

    const doorSlotFlags = roomMetadata.doorSlotFlags as BitFlags<DoorSlotFlag>;
    let rooms = roomDoorSlotFlagMap.get(doorSlotFlags);
    if (rooms === undefined) {
      rooms = [];
      roomDoorSlotFlagMap.set(doorSlotFlags, rooms);
    }

    rooms.push(roomMetadata);
  }

  return roomTypeMap;
}

// ModCallback.POST_RENDER (2)
function postRender() {
  const customStage = v.run.currentCustomStage;
  if (customStage === null) {
    return;
  }

  const isPaused = game.IsPaused();
  if (isPaused) {
    return;
  }

  streakTextPostRender(customStage);
  shadowsPostRender(customStage);
  versusScreenPostRender();
}

// ModCallback.GET_SHADER_PARAMS (22)
function getShaderParams(
  shaderName: string,
): Record<string, unknown> | undefined {
  /// return streakTextGetShaderParams(shaderName);
  return undefined;
}

// ModCallbackCustom.POST_GRID_ENTITY_BROKEN
// GridEntityType.ROCK_ALT
function postGridEntityBrokenRockAlt(gridEntity: GridEntity) {
  const customStage = v.run.currentCustomStage;
  if (customStage === null) {
    return;
  }

  removeUrnRewards(customStage, gridEntity);
}

// ModCallbackCustom.POST_GRID_ENTITY_INIT
function postGridEntityBrokenInit(gridEntity: GridEntity) {
  const customStage = v.run.currentCustomStage;
  if (customStage === null) {
    return;
  }

  setCustomDecorationGraphics(customStage, gridEntity);
  setCustomRockGraphics(customStage, gridEntity);
  setCustomPitGraphics(customStage, gridEntity);
  setCustomDoorGraphics(customStage, gridEntity);
}

// ModCallbackCustom.POST_NEW_ROOM_REORDERED
function postNewRoomReordered() {
  const customStage = v.run.currentCustomStage;
  if (customStage === null) {
    return;
  }

  setBackdrop(customStage);
  setShadows(customStage);
  playVersusScreenAnimation(customStage);
}
