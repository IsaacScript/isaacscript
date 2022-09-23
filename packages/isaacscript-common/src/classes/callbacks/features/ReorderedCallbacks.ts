import {
  CollectibleType,
  LevelStage,
  ModCallback,
  StageType,
} from "isaac-typescript-definitions";
import { game } from "packages/isaacscript-common/src/core/cachedClasses";
import { Feature } from "../../private/Feature";
import { PostGameStartedReordered } from "../PostGameStartedReordered";
import { PostGameStartedReorderedLast } from "../PostGameStartedReorderedLast";
import { PostNewLevelReordered } from "../PostNewLevelReordered";
import { PostNewRoomReordered } from "../PostNewRoomReordered";

export class ReorderedCallbacks extends Feature {
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
