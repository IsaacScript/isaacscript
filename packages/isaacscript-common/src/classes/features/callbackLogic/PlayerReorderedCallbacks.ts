// This handles logic for the following callbacks:
// - POST_PEFFECT_UPDATE_REORDERED
// - POST_PLAYER_RENDER_REORDERED
// - POST_PLAYER_UPDATE_REORDERED

import { ModCallback } from "isaac-typescript-definitions";
import { VectorZero } from "../../../core/constants";
import { ModCallbackCustom } from "../../../enums/ModCallbackCustom";
import { emptyArray } from "../../../functions/array";
import {
  getPlayerFromIndex,
  getPlayerIndex,
} from "../../../functions/playerIndex";
import type { PlayerIndex } from "../../../types/PlayerIndex";
import type { PostPEffectUpdateReordered } from "../../callbacks/PostPEffectUpdateReordered";
import type { PostPlayerRenderReordered } from "../../callbacks/PostPlayerRenderReordered";
import type { PostPlayerUpdateReordered } from "../../callbacks/PostPlayerUpdateReordered";
import { Feature } from "../../private/Feature";

interface QueueElement {
  playerIndex: PlayerIndex;
  renderOffset: Vector;
}

const v = {
  run: {
    postGameStartedFiredOnThisRun: false,

    postPEffectUpdateQueue: [] as QueueElement[],
    postPlayerUpdateQueue: [] as QueueElement[],
    postPlayerRenderQueue: [] as QueueElement[],
  },
};

export class PlayerReorderedCallbacks extends Feature {
  public override v = v;

  private readonly postPEffectUpdateReordered: PostPEffectUpdateReordered;
  private readonly postPlayerRenderReordered: PostPlayerRenderReordered;
  private readonly postPlayerUpdateReordered: PostPlayerUpdateReordered;

  constructor(
    postPEffectUpdateReordered: PostPEffectUpdateReordered,
    postPlayerRenderReordered: PostPlayerRenderReordered,
    postPlayerUpdateReordered: PostPlayerUpdateReordered,
  ) {
    super();

    this.callbacksUsed = [
      // 4
      // eslint-disable-next-line deprecation/deprecation
      [ModCallback.POST_PEFFECT_UPDATE, this.postPEffectUpdate],

      // 31
      // eslint-disable-next-line deprecation/deprecation
      [ModCallback.POST_PLAYER_UPDATE, this.postPlayerUpdate],

      // 32
      // eslint-disable-next-line deprecation/deprecation
      [ModCallback.POST_PLAYER_RENDER, this.postPlayerRender],
    ];

    this.customCallbacksUsed = [
      [
        ModCallbackCustom.POST_GAME_STARTED_REORDERED_LAST,
        this.postGameStartedReorderedLast,
      ],
    ];

    this.postPEffectUpdateReordered = postPEffectUpdateReordered;
    this.postPlayerRenderReordered = postPlayerRenderReordered;
    this.postPlayerUpdateReordered = postPlayerUpdateReordered;
  }

  // ModCallback.POST_PEFFECT_UPDATE (4)
  private readonly postPEffectUpdate = (player: EntityPlayer): void => {
    if (v.run.postGameStartedFiredOnThisRun) {
      this.postPEffectUpdateReordered.fire(player);
    } else {
      // Defer callback execution until the `POST_GAME_STARTED` callback fires.
      const playerIndex = getPlayerIndex(player);
      v.run.postPEffectUpdateQueue.push({
        playerIndex,
        renderOffset: VectorZero,
      });
    }
  };

  // ModCallback.POST_PLAYER_UPDATE (31)
  private readonly postPlayerUpdate = (player: EntityPlayer): void => {
    if (v.run.postGameStartedFiredOnThisRun) {
      this.postPlayerUpdateReordered.fire(player);
    } else {
      // Defer callback execution until the `POST_GAME_STARTED` callback fires.
      const playerIndex = getPlayerIndex(player);
      v.run.postPlayerUpdateQueue.push({
        playerIndex,
        renderOffset: VectorZero,
      });
    }
  };

  // ModCallback.POST_PLAYER_RENDER (32)
  private readonly postPlayerRender = (
    player: EntityPlayer,
    renderOffset: Vector,
  ): void => {
    if (v.run.postGameStartedFiredOnThisRun) {
      this.postPlayerRenderReordered.fire(player, renderOffset);
    } else {
      // Defer callback execution until the `POST_GAME_STARTED` callback fires.
      const playerIndex = getPlayerIndex(player);
      v.run.postPlayerRenderQueue.push({ playerIndex, renderOffset });
    }
  };

  // ModCallbackCustom.POST_GAME_STARTED_REORDERED_LAST
  private readonly postGameStartedReorderedLast = (): void => {
    v.run.postGameStartedFiredOnThisRun = true;

    dequeue(v.run.postPEffectUpdateQueue, this.postPEffectUpdateReordered.fire);
    dequeue(v.run.postPlayerUpdateQueue, this.postPlayerUpdateReordered.fire);
    dequeue(v.run.postPlayerRenderQueue, this.postPlayerRenderReordered.fire);
  };
}

function dequeue(
  queue: QueueElement[],
  fireFunc: (player: EntityPlayer, renderOffset: Vector) => void,
) {
  for (const element of queue) {
    const { playerIndex, renderOffset } = element;
    const player = getPlayerFromIndex(playerIndex);
    if (player !== undefined) {
      fireFunc(player, renderOffset);
    }
  }

  emptyArray(queue);
}
