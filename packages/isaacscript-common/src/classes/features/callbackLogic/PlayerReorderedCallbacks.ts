// This handles logic for the following callbacks:
// - POST_PEFFECT_UPDATE_REORDERED
// - POST_PLAYER_RENDER_REORDERED
// - POST_PLAYER_UPDATE_REORDERED

import { ModCallback } from "isaac-typescript-definitions";
import { ModCallbackCustom2 } from "../../../enums/ModCallbackCustom2";
import { emptyArray } from "../../../functions/array";
import {
  getPlayerFromIndex,
  getPlayerIndex,
} from "../../../functions/playerIndex";
import { PlayerIndex } from "../../../types/PlayerIndex";
import { PostPEffectUpdateReordered } from "../../callbacks/PostPEffectUpdateReordered";
import { PostPlayerRenderReordered } from "../../callbacks/PostPlayerRenderReordered";
import { PostPlayerUpdateReordered } from "../../callbacks/PostPlayerUpdateReordered";
import { Feature } from "../../private/Feature";

export class PlayerReorderedCallbacks extends Feature {
  public override v = {
    run: {
      postGameStartedFiredOnThisRun: false,

      postPEffectUpdateQueue: [] as PlayerIndex[],
      postPlayerUpdateQueue: [] as PlayerIndex[],
      postPlayerRenderQueue: [] as PlayerIndex[],
    },
  };

  private postPEffectUpdateReordered: PostPEffectUpdateReordered;
  private postPlayerRenderReordered: PostPlayerRenderReordered;
  private postPlayerUpdateReordered: PostPlayerUpdateReordered;

  constructor(
    postPEffectUpdateReordered: PostPEffectUpdateReordered,
    postPlayerRenderReordered: PostPlayerRenderReordered,
    postPlayerUpdateReordered: PostPlayerUpdateReordered,
  ) {
    super();

    this.callbacksUsed = [
      [ModCallback.POST_PEFFECT_UPDATE, [this.postPEffectUpdate]], // 4
      [ModCallback.POST_PLAYER_UPDATE, [this.postPlayerUpdate]], // 31
      [ModCallback.POST_PLAYER_RENDER, [this.postPlayerRender]], // 32
    ];

    this.customCallbacksUsed = [
      [
        ModCallbackCustom2.POST_GAME_STARTED_REORDERED_LAST,
        [this.postGameStartedReorderedLast],
      ], // 19
    ];

    this.postPEffectUpdateReordered = postPEffectUpdateReordered;
    this.postPlayerRenderReordered = postPlayerRenderReordered;
    this.postPlayerUpdateReordered = postPlayerUpdateReordered;
  }

  // ModCallback.POST_PEFFECT_UPDATE (4)
  private postPEffectUpdate = (player: EntityPlayer): void => {
    if (this.v.run.postGameStartedFiredOnThisRun) {
      this.postPEffectUpdateReordered.fire(player);
    } else {
      // Defer callback execution until the `POST_GAME_STARTED` callback fires.
      const playerIndex = getPlayerIndex(player);
      this.v.run.postPEffectUpdateQueue.push(playerIndex);
    }
  };

  // ModCallback.POST_PLAYER_UPDATE (31)
  private postPlayerUpdate = (player: EntityPlayer): void => {
    if (this.v.run.postGameStartedFiredOnThisRun) {
      this.postPlayerUpdateReordered.fire(player);
    } else {
      // Defer callback execution until the `POST_GAME_STARTED` callback fires.
      const playerIndex = getPlayerIndex(player);
      this.v.run.postPlayerUpdateQueue.push(playerIndex);
    }
  };

  // ModCallback.POST_PLAYER_RENDER (32)
  private postPlayerRender = (
    player: EntityPlayer,
    _renderOffset: Vector,
  ): void => {
    if (this.v.run.postGameStartedFiredOnThisRun) {
      this.postPlayerRenderReordered.fire(player);
    } else {
      // Defer callback execution until the `POST_GAME_STARTED` callback fires.
      const playerIndex = getPlayerIndex(player);
      this.v.run.postPlayerRenderQueue.push(playerIndex);
    }
  };

  // ModCallbackCustom.POST_GAME_STARTED_REORDERED_LAST
  private postGameStartedReorderedLast = (): void => {
    this.v.run.postGameStartedFiredOnThisRun = true;

    dequeue(
      this.v.run.postPEffectUpdateQueue,
      this.postPEffectUpdateReordered.fire,
    );
    dequeue(
      this.v.run.postPlayerUpdateQueue,
      this.postPlayerUpdateReordered.fire,
    );
    dequeue(
      this.v.run.postPlayerRenderQueue,
      this.postPlayerRenderReordered.fire,
    );
  };
}

function dequeue(
  playerIndexes: PlayerIndex[],
  fireFunc: (player: EntityPlayer) => void,
) {
  for (const playerIndex of playerIndexes) {
    const player = getPlayerFromIndex(playerIndex);
    if (player !== undefined) {
      fireFunc(player);
    }
  }

  emptyArray(playerIndexes);
}
