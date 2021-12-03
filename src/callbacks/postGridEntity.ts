// This provides the logic for PostGridEntityInit, PostGridEntityUpdate, and PostGridEntityRemove

import { saveDataManager } from "../features/saveDataManager/exports";
import { getGridEntities } from "../functions/gridEntity";
import {
  postGridEntityInitFire,
  postGridEntityInitHasSubscriptions,
} from "./subscriptions/postGridEntityInit";
import {
  postGridEntityRemoveFire,
  postGridEntityRemoveHasSubscriptions,
} from "./subscriptions/postGridEntityRemove";
import {
  postGridEntityUpdateFire,
  postGridEntityUpdateHasSubscriptions,
} from "./subscriptions/postGridEntityUpdate";

const v = {
  room: {
    initializedGridEntities: new Map<int, GridEntityType>(),
  },
};

/** @internal */
export function postGridEntityCallbacksInit(mod: Mod): void {
  saveDataManager("postGridEntity", v, hasSubscriptions);

  mod.AddCallback(ModCallbacks.MC_POST_UPDATE, postUpdate); // 1
  mod.AddCallback(ModCallbacks.MC_POST_NEW_ROOM, postNewRoom); // 9
}

function hasSubscriptions() {
  return (
    postGridEntityInitHasSubscriptions() ||
    postGridEntityUpdateHasSubscriptions() ||
    postGridEntityRemoveHasSubscriptions()
  );
}

// ModCallbacks.MC_POST_UPDATE (1)
function postUpdate() {
  if (!hasSubscriptions()) {
    return;
  }

  for (const gridEntity of getGridEntities()) {
    checkNewGridEntity(gridEntity);
    postGridEntityUpdateFire(gridEntity);
  }

  checkGridEntityRemoved();
}

function checkGridEntityRemoved() {
  const game = Game();
  const room = game.GetRoom();

  for (const [
    gridIndex,
    gridEntityType,
  ] of v.room.initializedGridEntities.entries()) {
    const gridEntity = room.GetGridEntity(gridIndex);
    if (gridEntity === undefined || gridEntity.GetType() !== gridEntityType) {
      v.room.initializedGridEntities.delete(gridIndex);
      postGridEntityRemoveFire(gridIndex, gridEntityType);
    }
  }
}

// ModCallbacks.MC_POST_NEW_ROOM (9)
function postNewRoom() {
  if (!hasSubscriptions()) {
    return;
  }

  for (const gridEntity of getGridEntities()) {
    checkNewGridEntity(gridEntity);
  }
}

function checkNewGridEntity(gridEntity: GridEntity) {
  const gridIndex = gridEntity.GetGridIndex();
  const gridEntityType = gridEntity.GetType();
  const storedGridEntityType = v.room.initializedGridEntities.get(gridIndex);
  if (storedGridEntityType !== gridEntityType) {
    v.room.initializedGridEntities.set(gridIndex, gridEntityType);
    postGridEntityInitFire(gridEntity);
  }
}
