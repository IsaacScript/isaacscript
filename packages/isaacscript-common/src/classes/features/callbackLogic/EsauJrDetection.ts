// This provides the logic for the following callbacks:
// - `POST_ESAU_JR`
// - `POST_FIRST_ESAU_JR`

import {
  CollectibleType,
  ControllerIndex,
  ModCallback,
  UseFlag,
} from "isaac-typescript-definitions";
import { game } from "../../../core/cachedClasses";
import { getPlayersWithControllerIndex } from "../../../functions/players";
import { PostEsauJr } from "../../callbacks/PostEsauJr";
import { PostFirstEsauJr } from "../../callbacks/PostFirstEsauJr";
import { Feature } from "../../private/Feature";

export class EsauJrDetection extends Feature {
  public override v = {
    run: {
      usedEsauJrFrame: null as int | null,
      usedEsauJrControllerIndex: null as ControllerIndex | null,
      usedEsauJrAtLeastOnce: false,
    },
  };

  private postEsauJr: PostEsauJr;
  private postFirstEsauJr: PostFirstEsauJr;

  constructor(postEsauJr: PostEsauJr, postFirstEsauJr: PostFirstEsauJr) {
    super();

    this.callbacksUsed = [
      [ModCallback.POST_UPDATE, [this.postUpdate]], // 1
      [
        ModCallback.POST_USE_ITEM,
        [this.useItemEsauJr, CollectibleType.ESAU_JR],
      ],
    ];

    this.postEsauJr = postEsauJr;
    this.postFirstEsauJr = postFirstEsauJr;
  }

  // ModCallback.POST_UPDATE (1)
  private postUpdate = (): void => {
    const gameFrameCount = game.GetFrameCount();

    // Check to see if it is the frame after the player has used Esau Jr.
    if (
      this.v.run.usedEsauJrFrame === null ||
      gameFrameCount < this.v.run.usedEsauJrFrame + 1
    ) {
      return;
    }
    this.v.run.usedEsauJrFrame = null;

    // Find the player corresponding to the player who used Esau Jr. a frame ago (via matching the
    // ControllerIndex).
    if (this.v.run.usedEsauJrControllerIndex === null) {
      return;
    }
    const players = getPlayersWithControllerIndex(
      this.v.run.usedEsauJrControllerIndex,
    );
    this.v.run.usedEsauJrControllerIndex = null;

    const player = players[0];
    if (player === undefined) {
      return;
    }

    if (!this.v.run.usedEsauJrAtLeastOnce) {
      this.v.run.usedEsauJrAtLeastOnce = true;
      this.postFirstEsauJr.fire(player);
    }

    this.postEsauJr.fire(player);
  };

  // ModCallback.POST_USE_ITEM (3)
  // CollectibleType.ESAU_JR (703)
  private useItemEsauJr = (
    _collectibleType: CollectibleType,
    _rng: RNG,
    player: EntityPlayer,
    _useFlags: BitFlags<UseFlag>,
    _activeSlot: int,
    _customVarData: int,
  ): boolean | undefined => {
    const gameFrameCount = game.GetFrameCount();

    // The player only changes to Esau Jr. on the frame after the item is used.
    this.v.run.usedEsauJrFrame = gameFrameCount + 1;
    this.v.run.usedEsauJrControllerIndex = player.ControllerIndex;

    return undefined;
  };
}
