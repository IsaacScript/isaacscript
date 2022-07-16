import {
  CollectibleType,
  DoorSlotFlag,
  EntityType,
  GridEntityType,
  ModCallback,
  RoomShape,
  RoomType,
  TrinketType,
} from "isaac-typescript-definitions";
import { ModUpgraded } from "../../classes/ModUpgraded";
import { ModCallbackCustom } from "../../enums/ModCallbackCustom";
import { isArray } from "../../functions/array";
import { removeEntities } from "../../functions/entity";
import { getNPCs } from "../../functions/entitySpecific";
import {
  getCoins,
  getCollectibles,
  getTrinkets,
} from "../../functions/pickups";
import { vectorEquals } from "../../functions/vector";
import { CustomStage, RoomTypeMap } from "../../interfaces/CustomStage";
import {
  CustomStageLua,
  CustomStageRoomMetadata,
} from "../../interfaces/CustomStageLua";
import { saveDataManager } from "../saveDataManager/exports";
import { setBackdrop } from "./backdrop";
import * as metadataJSON from "./metadata.json"; // This will correspond to "metadata.lua" at run-time.
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

  mod.AddCallbackCustom(
    ModCallbackCustom.POST_GRID_ENTITY_BROKEN,
    postGridEntityBrokenRockAlt,
    GridEntityType.ROCK_ALT,
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

  streakTextPostRender(customStage);
  versusScreenPostRender();
}

// ModCallbackCustom.POST_GRID_ENTITY_BROKEN
// GridEntityType.ROCK_ALT
function postGridEntityBrokenRockAlt(gridEntity: GridEntity) {
  const customStage = v.run.currentCustomStage;
  if (customStage === null) {
    return;
  }

  removeUrnRewards(gridEntity);
}

/**
 * The rewards are based on the ones from the wiki:
 * https://bindingofisaacrebirth.fandom.com/wiki/Rocks#Urns
 *
 * On the bugged stage of -1, only urns will spawn, so we do not have to handle the case of mushroom
 * rewards, skull rewards, and so on.
 */
function removeUrnRewards(gridEntity: GridEntity) {
  // Spiders
  const spiders = getNPCs(EntityType.SPIDER);
  removeEntitiesSpawnedFromGridEntity(spiders, gridEntity);

  // Coins
  const coins = getCoins();
  removeEntitiesSpawnedFromGridEntity(coins, gridEntity);

  // A Quarter
  const quarters = getCollectibles(CollectibleType.QUARTER);
  removeEntitiesSpawnedFromGridEntity(quarters, gridEntity);

  // Swallowed Penny
  const swallowedPennies = getTrinkets(TrinketType.SWALLOWED_PENNY);
  removeEntitiesSpawnedFromGridEntity(swallowedPennies, gridEntity);
}

function removeEntitiesSpawnedFromGridEntity(
  entities: Entity[],
  gridEntity: GridEntity,
) {
  const entitiesFromGridEntity = entities.filter(
    (entity) =>
      entity.FrameCount === 0 &&
      vectorEquals(entity.Position, gridEntity.Position),
  );
  removeEntities(entitiesFromGridEntity);
}

// ModCallbackCustom.POST_NEW_ROOM_REORDERED
function postNewRoomReordered() {
  const customStage = v.run.currentCustomStage;
  if (customStage === null) {
    return;
  }

  setBackdrop(customStage);
  playVersusScreenAnimation(customStage);
}
