// This provides the logic for the following callbacks:
// - `POST_GAME_STARTED_REORDERED`
// - `POST_GAME_STARTED_REORDERED_LAST`
// - `POST_NEW_LEVEL_REORDERED`
// - `POST_NEW_ROOM_REORDERED`

// By default, callbacks fire in the following order:
// - `POST_NEW_ROOM` --> `POST_NEW_LEVEL` --> `POST_GAME_STARTED`

// It is easier to write mod code if the callbacks run in a more logical order:
// - `POST_GAME_STARTED` --> `POST_NEW_LEVEL` --> `POST_NEW_ROOM`

// Manually reorganize the callback execution so that this is the case.

import {
  CollectibleType,
  LevelStage,
  ModCallback,
  StageType,
} from "isaac-typescript-definitions";
import { game } from "../../../core/cachedClasses";
import { PostGameStartedReordered } from "../../callbacks/PostGameStartedReordered";
import { PostGameStartedReorderedLast } from "../../callbacks/PostGameStartedReorderedLast";
import { PostNewLevelReordered } from "../../callbacks/PostNewLevelReordered";
import { PostNewRoomReordered } from "../../callbacks/PostNewRoomReordered";
import { Feature } from "../../private/Feature";

export class GameReorderedCallbacks extends Feature {
  currentStage: int | null = null;
  currentStageType: int | null = null;
  usedGlowingHourGlass = false;
  forceNewLevel = false;
  forceNewRoom = false;

  postGameStartedReordered: PostGameStartedReordered;
  postNewLevelReordered: PostNewLevelReordered;
  postNewRoomReordered: PostNewRoomReordered;
  postGameStartedReorderedLast: PostGameStartedReorderedLast;

  constructor(
    postGameStartedReordered: PostGameStartedReordered,
    postNewLevelReordered: PostNewLevelReordered,
    postNewRoomReordered: PostNewRoomReordered,
    postGameStartedReorderedLast: PostGameStartedReorderedLast,
  ) {
    super();

    this.callbacksUsed = [
      [
        ModCallback.POST_USE_ITEM,
        [this.useItemGlowingHourGlass, CollectibleType.GLOWING_HOUR_GLASS],
      ], // 3
      [ModCallback.POST_GAME_STARTED, [this.postGameStarted]], // 15
      [ModCallback.POST_NEW_LEVEL, [this.postNewLevel]], // 18
      [ModCallback.POST_NEW_ROOM, [this.postNewRoom]], // 19
    ];

    this.postGameStartedReordered = postGameStartedReordered;
    this.postNewLevelReordered = postNewLevelReordered;
    this.postNewRoomReordered = postNewRoomReordered;
    this.postGameStartedReorderedLast = postGameStartedReorderedLast;
  }

  // ModCallback.POST_USE_ITEM (3)
  // CollectibleType.GLOWING_HOUR_GLASS (422)
  useItemGlowingHourGlass = (): boolean | undefined => {
    // If Glowing Hour Glass is used on the first room of a floor, it will send the player to the
    // previous floor without triggering the `POST_NEW_LEVEL` callback. Manually check for this.
    this.usedGlowingHourGlass = true;

    return undefined;
  };

  // ModCallback.POST_GAME_STARTED (15)
  postGameStarted = (isContinued: boolean): void => {
    this.recordCurrentStage();
    this.postGameStartedReordered.fire(isContinued);
    this.postNewLevelReordered.fire();
    this.postNewRoomReordered.fire();
    this.postGameStartedReorderedLast.fire(isContinued);
  };

  // ModCallback.POST_NEW_LEVEL (18)
  postNewLevel = (): void => {
    const gameFrameCount = game.GetFrameCount();

    if (gameFrameCount === 0 && !this.forceNewLevel) {
      // Wait for the `POST_GAME_STARTED` callback to fire.
      return;
    }
    this.forceNewLevel = false;

    this.recordCurrentStage();
    this.postNewLevelReordered.fire();
    this.postNewRoomReordered.fire();
  };

  // ModCallback.POST_NEW_ROOM (19)
  postNewRoom = (): void => {
    const gameFrameCount = game.GetFrameCount();
    const level = game.GetLevel();
    const stage = level.GetStage();
    const stageType = level.GetStageType();

    if (this.usedGlowingHourGlass) {
      this.usedGlowingHourGlass = false;

      if (this.currentStage !== stage || this.currentStageType !== stageType) {
        // The player has used the Glowing Hour Glass to take them to the previous floor (which does
        // not trigger the `POST_NEW_LEVEL` callback). Emulate what happens in the `POST_NEW_LEVEL`
        // callback.
        this.recordCurrentStage();
        this.postNewLevelReordered.fire();
        this.postNewRoomReordered.fire();
        return;
      }
    }

    if (
      (gameFrameCount === 0 ||
        this.currentStage !== stage ||
        this.currentStageType !== stageType) &&
      !this.forceNewRoom
    ) {
      return;
    }
    this.forceNewRoom = false;

    this.postNewRoomReordered.fire();
  };

  recordCurrentStage(): void {
    const level = game.GetLevel();
    const stage = level.GetStage();
    const stageType = level.GetStageType();

    this.currentStage = stage;
    this.currentStageType = stageType;
  }

  public forceNewLevelCallback(): void {
    this.forceNewLevel = true;
  }

  public forceNewRoomCallback(): void {
    this.forceNewRoom = true;
  }

  public reorderedCallbacksSetStage(
    stage: LevelStage,
    stageType: StageType,
  ): void {
    this.currentStage = stage;
    this.currentStageType = stageType;
  }
}
