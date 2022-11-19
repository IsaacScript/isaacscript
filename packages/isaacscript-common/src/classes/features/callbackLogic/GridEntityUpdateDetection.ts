import { GridEntityType, ModCallback } from "isaac-typescript-definitions";
import { ISCFeature } from "../../../enums/ISCFeature";
import { ModCallbackCustom } from "../../../enums/ModCallbackCustom";
import {
  getGridEntitiesMap,
  isGridEntityBroken,
} from "../../../functions/gridEntities";
import { PostGridEntityBroken } from "../../callbacks/PostGridEntityBroken";
import { PostGridEntityCustomBroken } from "../../callbacks/PostGridEntityCustomBroken";
import { PostGridEntityCustomInit } from "../../callbacks/PostGridEntityCustomInit";
import { PostGridEntityCustomRemove } from "../../callbacks/PostGridEntityCustomRemove";
import { PostGridEntityCustomStateChanged } from "../../callbacks/PostGridEntityCustomStateChanged";
import { PostGridEntityCustomUpdate } from "../../callbacks/PostGridEntityCustomUpdate";
import { PostGridEntityInit } from "../../callbacks/PostGridEntityInit";
import { PostGridEntityRemove } from "../../callbacks/PostGridEntityRemove";
import { PostGridEntityStateChanged } from "../../callbacks/PostGridEntityStateChanged";
import { PostGridEntityUpdate } from "../../callbacks/PostGridEntityUpdate";
import { Feature } from "../../private/Feature";
import { CustomGridEntities } from "./CustomGridEntities";

type GridEntityTuple = [
  gridEntityType: GridEntityType,
  variant: int,
  state: int,
];

export class GridEntityUpdateDetection extends Feature {
  public override v = {
    room: {
      /** Indexed by grid index. */
      initializedGridEntities: new Map<int, GridEntityTuple>(),
    },
  };

  private postGridEntityInit: PostGridEntityInit;
  private postGridEntityCustomInit: PostGridEntityCustomInit;
  private postGridEntityUpdate: PostGridEntityUpdate;
  private postGridEntityCustomUpdate: PostGridEntityCustomUpdate;
  private postGridEntityRemove: PostGridEntityRemove;
  private postGridEntityCustomRemove: PostGridEntityCustomRemove;
  private postGridEntityStateChanged: PostGridEntityStateChanged;
  private postGridEntityCustomStateChanged: PostGridEntityCustomStateChanged;
  private postGridEntityBroken: PostGridEntityBroken;
  private postGridEntityCustomBroken: PostGridEntityCustomBroken;
  private customGridEntities: CustomGridEntities;

  constructor(
    postGridEntityInit: PostGridEntityInit,
    postGridEntityCustomInit: PostGridEntityCustomInit,
    postGridEntityUpdate: PostGridEntityUpdate,
    postGridEntityCustomUpdate: PostGridEntityCustomUpdate,
    postGridEntityRemove: PostGridEntityRemove,
    postGridEntityCustomRemove: PostGridEntityCustomRemove,
    postGridEntityStateChanged: PostGridEntityStateChanged,
    postGridEntityCustomStateChanged: PostGridEntityCustomStateChanged,
    postGridEntityBroken: PostGridEntityBroken,
    postGridEntityCustomBroken: PostGridEntityCustomBroken,
    customGridEntities: CustomGridEntities,
  ) {
    super();

    this.featuresUsed = [ISCFeature.RUN_IN_N_FRAMES];

    this.callbacksUsed = [
      [ModCallback.POST_UPDATE, [this.postUpdate]], // 1
    ];

    this.customCallbacksUsed = [
      [ModCallbackCustom.POST_NEW_ROOM_REORDERED, [this.postNewRoomReordered]],
    ];

    this.postGridEntityInit = postGridEntityInit;
    this.postGridEntityCustomInit = postGridEntityCustomInit;
    this.postGridEntityUpdate = postGridEntityUpdate;
    this.postGridEntityCustomUpdate = postGridEntityCustomUpdate;
    this.postGridEntityRemove = postGridEntityRemove;
    this.postGridEntityCustomRemove = postGridEntityCustomRemove;
    this.postGridEntityStateChanged = postGridEntityStateChanged;
    this.postGridEntityCustomStateChanged = postGridEntityCustomStateChanged;
    this.postGridEntityBroken = postGridEntityBroken;
    this.postGridEntityCustomBroken = postGridEntityCustomBroken;
    this.customGridEntities = customGridEntities;
  }

  // ModCallback.POST_UPDATE (1)
  private postUpdate = (): void => {
    const gridEntitiesMap = getGridEntitiesMap();

    // We check for removed grid entities first so that grid entities that change type will count as
    // being removed and fire the PostGridEntityRemoved callback.
    this.checkGridEntitiesRemoved(gridEntitiesMap);

    for (const [gridIndex, gridEntity] of gridEntitiesMap.entries()) {
      this.checkGridEntityStateChanged(gridIndex, gridEntity);
      this.checkNewGridEntity(gridIndex, gridEntity);

      const gridEntityTypeCustom =
        this.customGridEntities.getCustomGridEntityType(gridIndex);
      if (gridEntityTypeCustom === undefined) {
        this.postGridEntityUpdate.fire(gridEntity);
      } else {
        this.postGridEntityCustomUpdate.fire(gridEntity, gridEntityTypeCustom);
      }
    }
  };

  private checkGridEntitiesRemoved(
    gridEntitiesMap: Map<int, GridEntity>,
  ): void {
    for (const [
      gridIndex,
      gridEntityTuple,
    ] of this.v.room.initializedGridEntities.entries()) {
      const [storedGridEntityType, storedGridEntityVariant] = gridEntityTuple;
      const gridEntity = gridEntitiesMap.get(gridIndex);
      if (
        gridEntity === undefined ||
        gridEntity.GetType() !== storedGridEntityType
      ) {
        this.v.room.initializedGridEntities.delete(gridIndex);

        const gridEntityTypeCustom =
          this.customGridEntities.getCustomGridEntityType(gridIndex);
        if (gridEntityTypeCustom === undefined) {
          this.postGridEntityRemove.fire(
            gridIndex,
            storedGridEntityType,
            storedGridEntityVariant,
          );
        } else {
          this.postGridEntityCustomRemove.fire(gridIndex, gridEntityTypeCustom);
        }
      }
    }
  }

  private checkGridEntityStateChanged(
    gridIndex: int,
    gridEntity: GridEntity,
  ): void {
    const gridEntityTuple = this.v.room.initializedGridEntities.get(gridIndex);
    if (gridEntityTuple === undefined) {
      // This grid entity did not exist a frame ago; we don't want to fire the state changed
      // callback on the first frame that it exists.
      return;
    }

    const [_gridEntityType, _gridEntityVariant, oldState] = gridEntityTuple;
    const newState = gridEntity.State;
    if (oldState !== newState) {
      this.updateTupleInMap(gridEntity);

      const gridEntityTypeCustom =
        this.customGridEntities.getCustomGridEntityType(gridEntity);
      if (gridEntityTypeCustom === undefined) {
        this.postGridEntityStateChanged.fire(gridEntity, oldState, newState);
      } else {
        this.postGridEntityCustomStateChanged.fire(
          gridEntity,
          gridEntityTypeCustom,
          oldState,
          newState,
        );
      }

      if (isGridEntityBroken(gridEntity)) {
        if (gridEntityTypeCustom === undefined) {
          this.postGridEntityBroken.fire(gridEntity);
        } else {
          this.postGridEntityCustomBroken.fire(
            gridEntity,
            gridEntityTypeCustom,
          );
        }
      }
    }
  }

  private checkNewGridEntity(gridIndex: int, gridEntity: GridEntity): void {
    const gridEntityType = gridEntity.GetType();
    const gridEntityTuple = this.v.room.initializedGridEntities.get(gridIndex);

    if (
      gridEntityTuple === undefined ||
      gridEntityTuple[0] !== gridEntityType
    ) {
      this.updateTupleInMap(gridEntity);

      const gridEntityTypeCustom =
        this.customGridEntities.getCustomGridEntityType(gridEntity);
      if (gridEntityTypeCustom === undefined) {
        this.postGridEntityInit.fire(gridEntity);
      } else {
        this.postGridEntityCustomInit.fire(gridEntity, gridEntityTypeCustom);
      }
    }
  }

  private updateTupleInMap(gridEntity: GridEntity): void {
    const gridEntityType = gridEntity.GetType();
    const variant = gridEntity.GetVariant();
    const gridIndex = gridEntity.GetGridIndex();
    const newTuple: GridEntityTuple = [
      gridEntityType,
      variant,
      gridEntity.State,
    ];
    this.v.room.initializedGridEntities.set(gridIndex, newTuple);
  }

  // ModCallbackCustom.POST_NEW_ROOM_REORDERED
  private postNewRoomReordered = (): void => {
    const gridEntitiesMap = getGridEntitiesMap();

    for (const [gridIndex, gridEntity] of gridEntitiesMap.entries()) {
      this.checkNewGridEntity(gridIndex, gridEntity);
    }
  };
}
