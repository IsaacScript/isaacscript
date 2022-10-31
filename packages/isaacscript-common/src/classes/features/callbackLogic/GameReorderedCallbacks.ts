import {
  CollectibleType,
  LevelStage,
  ModCallback,
  StageType,
} from "isaac-typescript-definitions";
import { game } from "../../../core/cachedClasses";
import { Exported } from "../../../decorators";
import { PostGameStartedReordered } from "../../callbacks/PostGameStartedReordered";
import { PostGameStartedReorderedLast } from "../../callbacks/PostGameStartedReorderedLast";
import { PostNewLevelReordered } from "../../callbacks/PostNewLevelReordered";
import { PostNewRoomReordered } from "../../callbacks/PostNewRoomReordered";
import { Feature } from "../../private/Feature";

/**
 * By default, callbacks fire in the following order:
 * - `POST_NEW_ROOM` --> `POST_NEW_LEVEL` --> `POST_GAME_STARTED`
 *
 * It is easier to write mod code if the callbacks run in a more logical order:
 * - `POST_GAME_STARTED` --> `POST_NEW_LEVEL` --> `POST_NEW_ROOM`
 *
 * `isaacscript-common` provides three new callbacks that change the order to this:
 * - `POST_GAME_STARTED_REORDERED`
 * - `POST_NEW_LEVEL_REORDERED`
 * - `POST_NEW_ROOM_REORDERED`
 *
 * Additionally, there are some helper functions listed below that can deal with some edge cases
 * that you may run into with these callbacks.
 */
export class GameReorderedCallbacks extends Feature {
  private currentStage: int | null = null;
  private currentStageType: int | null = null;
  private usedGlowingHourGlass = false;
  private forceNewLevel = false;
  private forceNewRoom = false;

  private postGameStartedReordered: PostGameStartedReordered;
  private postNewLevelReordered: PostNewLevelReordered;
  private postNewRoomReordered: PostNewRoomReordered;
  private postGameStartedReorderedLast: PostGameStartedReorderedLast;

  /** @internal */
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
  private useItemGlowingHourGlass = (): boolean | undefined => {
    // If Glowing Hour Glass is used on the first room of a floor, it will send the player to the
    // previous floor without triggering the `POST_NEW_LEVEL` callback. Manually check for this.
    this.usedGlowingHourGlass = true;

    return undefined;
  };

  // ModCallback.POST_GAME_STARTED (15)
  private postGameStarted = (isContinued: boolean): void => {
    this.recordCurrentStage();
    this.postGameStartedReordered.fire(isContinued);
    this.postNewLevelReordered.fire();
    this.postNewRoomReordered.fire();
    this.postGameStartedReorderedLast.fire(isContinued);
  };

  // ModCallback.POST_NEW_LEVEL (18)
  private postNewLevel = (): void => {
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
  private postNewRoom = (): void => {
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

  private recordCurrentStage(): void {
    const level = game.GetLevel();
    const stage = level.GetStage();
    const stageType = level.GetStageType();

    this.currentStage = stage;
    this.currentStageType = stageType;
  }

  /**
   * Helper function to tell the `POST_NEW_LEVEL_REORDERED` callback that it should always fire on
   * the next `POST_NEW_LEVEL`.
   *
   * If some specific cases, mods can change the current level during run initialization on the 0th
   * frame. (For example, if you had a mod that made the player start the run in Caves instead of
   * Basement.) However, due to how the callback reordering works, the `POST_NEW_LEVEL_REORDERED`
   * callback will never fire on the 0th frame. To get around this, call this function before
   * changing levels to temporarily force the callback to fire.
   *
   * In order to use this function, you must upgrade your mod with
   * `ISCFeature.GAME_REORDERED_CALLBACKS`.
   */
  @Exported
  public forceNewLevelCallback(): void {
    this.forceNewLevel = true;
  }

  /**
   * Helper function to tell the `POST_NEW_ROOM_REORDERED` callback that it should always fire on
   * the next `POST_NEW_ROOM`.
   *
   * If some specific cases, mods can change the current room during run initialization on the 0th
   * frame. (For example, if you had a mod that made the player start the Treasure Room of Basement
   * 1 instead of the normal starting room.) However, due to how the callback reordering works, the
   * `POST_NEW_ROOM_REORDERED` callback will never fire on the 0th frame. To get around this, call
   * this function before changing rooms to temporarily force the callback to fire.
   *
   * In order to use this function, you must upgrade your mod with
   * `ISCFeature.GAME_REORDERED_CALLBACKS`.
   */
  @Exported
  public forceNewRoomCallback(): void {
    this.forceNewRoom = true;
  }

  /**
   * Helper function to manually set the variables that the reordered callback logic uses to track
   * the current stage and stage type.
   *
   * This is useful because if the stage is changed with the `Game.SetStage` method (or the
   * `setStage` helper function), the reordered callbacks will stop working.
   *
   * In order to use this function, you must upgrade your mod with
   * `ISCFeature.GAME_REORDERED_CALLBACKS`.
   */
  @Exported
  public reorderedCallbacksSetStage(
    stage: LevelStage,
    stageType: StageType,
  ): void {
    this.currentStage = stage;
    this.currentStageType = stageType;
  }
}
