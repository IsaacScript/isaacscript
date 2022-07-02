/*
import { TrapdoorState } from "isaac-typescript-definitions";
import { FastTravelEntityType } from "../../../../enums/FastTravelEntityType";
import { FAST_TRAVEL_DEBUG } from "./constants";
import { setFadingToBlack } from "./setNewState";
import * as fastTravel from "./stageTravel";
import * as state from "./state";
import v from "./v";

const FAST_TRAVEL_ENTITY_TYPE = FastTravelEntityType.TRAPDOOR;

// ModCallbackCustom.POST_GRID_ENTITY_INIT
// GridEntityType.TRAPDOOR (17)
export function postGridEntityInitTrapdoor(gridEntity: GridEntity): void {
  fastTravel.init(gridEntity, FAST_TRAVEL_ENTITY_TYPE, shouldSpawnOpen);
}

// ModCallbackCustom.POST_GRID_ENTITY_UPDATE
// GridEntityType.TRAPDOOR (17)
export function postGridEntityUpdateTrapdoor(gridEntity: GridEntity): void {
  if (shouldIgnore(gridEntity)) {
    return;
  }

  // Ensure that the fast-travel entity has been initialized.
  const gridIndex = gridEntity.GetGridIndex();
  const entry = v.room.trapdoors.get(gridIndex);
  if (entry === undefined) {
    return;
  }

  // Keep it closed on every frame so that we can implement our own custom functionality.
  gridEntity.State = TrapdoorState.CLOSED;

  fastTravel.checkShouldOpen(gridEntity, FAST_TRAVEL_ENTITY_TYPE);
  fastTravel.checkPlayerTouched(gridEntity, FAST_TRAVEL_ENTITY_TYPE, touched);
}

// ModCallbackCustom.POST_GRID_ENTITY_REMOVE
// GridEntityType.TRAPDOOR (17)
export function postGridEntityRemoveTrapdoor(gridIndex: int): void {
  state.deleteDescription(gridIndex, FAST_TRAVEL_ENTITY_TYPE);
}

function touched(entity: GridEntity | EntityEffect, player: EntityPlayer) {
  if (FAST_TRAVEL_DEBUG) {
    log("Touched a trapdoor.");
  }

  setFadingToBlack(player, entity.Position, false);
}
*/
