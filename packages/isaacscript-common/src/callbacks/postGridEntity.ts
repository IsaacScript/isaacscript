// This provides the logic for the following callbacks:
// - `POST_GRID_ENTITY_INIT`
// - `POST_GRID_ENTITY_CUSTOM_INIT`
// - `POST_GRID_ENTITY_UPDATE`
// - `POST_GRID_ENTITY_CUSTOM_UPDATE`
// - `POST_GRID_ENTITY_REMOVE`
// - `POST_GRID_ENTITY_CUSTOM_REMOVE`
// - `POST_GRID_ENTITY_STATE_CHANGED`
// - `POST_GRID_ENTITY_CUSTOM_STATE_CHANGED`
// - `POST_GRID_ENTITY_BROKEN`
// - `POST_GRID_ENTITY_CUSTOM_BROKEN`

import { GridEntityType, ModCallback } from "isaac-typescript-definitions";
import { ModUpgraded } from "../classes/ModUpgraded";
import { ModCallbackCustom } from "../enums/ModCallbackCustom";
import { getCustomGridEntityType } from "../features/customGridEntity";
import { saveDataManager } from "../features/saveDataManager/exports";
import {
  getGridEntitiesMap,
  isGridEntityBroken,
} from "../functions/gridEntities";
import {
  postGridEntityBrokenFire,
  postGridEntityBrokenHasSubscriptions,
} from "./subscriptions/postGridEntityBroken";
import {
  postGridEntityCustomBrokenFire,
  postGridEntityCustomBrokenHasSubscriptions,
} from "./subscriptions/postGridEntityCustomBroken";
import {
  postGridEntityCustomInitFire,
  postGridEntityCustomInitHasSubscriptions,
} from "./subscriptions/postGridEntityCustomInit";
import {
  postGridEntityCustomRemoveFire,
  postGridEntityCustomRemoveHasSubscriptions,
} from "./subscriptions/postGridEntityCustomRemove";
import {
  postGridEntityCustomStateChangedFire,
  postGridEntityCustomStateChangedHasSubscriptions,
} from "./subscriptions/postGridEntityCustomStateChanged";
import {
  postGridEntityCustomUpdateFire,
  postGridEntityCustomUpdateHasSubscriptions,
} from "./subscriptions/postGridEntityCustomUpdate";
import {
  postGridEntityInitFire,
  postGridEntityInitHasSubscriptions,
} from "./subscriptions/postGridEntityInit";
import {
  postGridEntityRemoveFire,
  postGridEntityRemoveHasSubscriptions,
} from "./subscriptions/postGridEntityRemove";
import {
  postGridEntityStateChangedFire,
  postGridEntityStateChangedHasSubscriptions,
} from "./subscriptions/postGridEntityStateChanged";
import {
  postGridEntityUpdateFire,
  postGridEntityUpdateHasSubscriptions,
} from "./subscriptions/postGridEntityUpdate";

type GridEntityTuple = [
  gridEntityType: GridEntityType,
  gridEntityVariant: int,
  state: int,
];

const v = {
  room: {
    /** Indexed by grid index. */
    initializedGridEntities: new Map<int, GridEntityTuple>(),
  },
};

export function postGridEntityCallbacksInit(mod: ModUpgraded): void {
  saveDataManager("postGridEntity", v, hasSubscriptions);

  mod.AddCallback(ModCallback.POST_UPDATE, postUpdate); // 1
  mod.AddCallbackCustom(
    ModCallbackCustom.POST_NEW_ROOM_REORDERED,
    postNewRoomReordered,
  );
}

function hasSubscriptions() {
  return (
    postGridEntityInitHasSubscriptions() ||
    postGridEntityCustomInitHasSubscriptions() ||
    postGridEntityUpdateHasSubscriptions() ||
    postGridEntityCustomUpdateHasSubscriptions() ||
    postGridEntityRemoveHasSubscriptions() ||
    postGridEntityCustomRemoveHasSubscriptions() ||
    postGridEntityStateChangedHasSubscriptions() ||
    postGridEntityCustomStateChangedHasSubscriptions() ||
    postGridEntityBrokenHasSubscriptions() ||
    postGridEntityCustomBrokenHasSubscriptions()
  );
}

// ModCallback.POST_UPDATE (1)
function postUpdate() {
  if (!hasSubscriptions()) {
    return;
  }

  const gridEntitiesMap = getGridEntitiesMap();

  // We check for removed grid entities first so that grid entities that change type will count as
  // being removed and fire the PostGridEntityRemoved callback.
  checkGridEntitiesRemoved(gridEntitiesMap);

  for (const [gridIndex, gridEntity] of gridEntitiesMap.entries()) {
    checkGridEntityStateChanged(gridIndex, gridEntity);
    checkNewGridEntity(gridIndex, gridEntity);

    const gridEntityTypeCustom = getCustomGridEntityType(gridIndex);
    if (gridEntityTypeCustom === undefined) {
      postGridEntityUpdateFire(gridEntity);
    } else {
      postGridEntityCustomUpdateFire(gridEntity, gridEntityTypeCustom);
    }
  }
}

function checkGridEntitiesRemoved(gridEntitiesMap: Map<int, GridEntity>) {
  for (const [
    gridIndex,
    gridEntityTuple,
  ] of v.room.initializedGridEntities.entries()) {
    const [storedGridEntityType, storedGridEntityVariant] = gridEntityTuple;
    const gridEntity = gridEntitiesMap.get(gridIndex);
    if (
      gridEntity === undefined ||
      gridEntity.GetType() !== storedGridEntityType
    ) {
      v.room.initializedGridEntities.delete(gridIndex);

      const gridEntityTypeCustom = getCustomGridEntityType(gridIndex);
      if (gridEntityTypeCustom === undefined) {
        postGridEntityRemoveFire(
          gridIndex,
          storedGridEntityType,
          storedGridEntityVariant,
        );
      } else {
        postGridEntityCustomRemoveFire(gridIndex, gridEntityTypeCustom);
      }
    }
  }
}

function checkGridEntityStateChanged(gridIndex: int, gridEntity: GridEntity) {
  const gridEntityTuple = v.room.initializedGridEntities.get(gridIndex);
  if (gridEntityTuple === undefined) {
    // This grid entity did not exist a frame ago; we don't want to fire the state changed callback
    // on the first frame that it exists.
    return;
  }

  const [_gridEntityType, _gridEntityVariant, oldState] = gridEntityTuple;
  const newState = gridEntity.State;
  if (oldState !== newState) {
    updateTupleInMap(gridEntity);

    const gridEntityTypeCustom = getCustomGridEntityType(gridEntity);

    if (gridEntityTypeCustom === undefined) {
      postGridEntityStateChangedFire(gridEntity, oldState, newState);
    } else {
      postGridEntityCustomStateChangedFire(
        gridEntity,
        gridEntityTypeCustom,
        oldState,
        newState,
      );
    }

    if (isGridEntityBroken(gridEntity)) {
      if (gridEntityTypeCustom === undefined) {
        postGridEntityBrokenFire(gridEntity);
      } else {
        postGridEntityCustomBrokenFire(gridEntity, gridEntityTypeCustom);
      }
    }
  }
}

function checkNewGridEntity(gridIndex: int, gridEntity: GridEntity) {
  const gridEntityType = gridEntity.GetType();
  const gridEntityTuple = v.room.initializedGridEntities.get(gridIndex);

  if (gridEntityTuple === undefined || gridEntityTuple[0] !== gridEntityType) {
    updateTupleInMap(gridEntity);

    const gridEntityTypeCustom = getCustomGridEntityType(gridEntity);
    if (gridEntityTypeCustom === undefined) {
      postGridEntityInitFire(gridEntity);
    } else {
      postGridEntityCustomInitFire(gridEntity, gridEntityTypeCustom);
    }
  }
}

function updateTupleInMap(gridEntity: GridEntity) {
  const gridEntityType = gridEntity.GetType();
  const gridEntityVariant = gridEntity.GetVariant();
  const gridIndex = gridEntity.GetGridIndex();
  const newTuple: GridEntityTuple = [
    gridEntityType,
    gridEntityVariant,
    gridEntity.State,
  ];
  v.room.initializedGridEntities.set(gridIndex, newTuple);
}

// ModCallbackCustom.POST_NEW_ROOM_REORDERED
function postNewRoomReordered() {
  if (!hasSubscriptions()) {
    return;
  }

  const gridEntitiesMap = getGridEntitiesMap();

  for (const [gridIndex, gridEntity] of gridEntitiesMap.entries()) {
    checkNewGridEntity(gridIndex, gridEntity);
  }
}
