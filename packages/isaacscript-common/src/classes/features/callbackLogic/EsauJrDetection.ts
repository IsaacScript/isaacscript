import type { ControllerIndex, UseFlag } from "isaac-typescript-definitions";
import { CollectibleType, ModCallback } from "isaac-typescript-definitions";
import { game } from "../../../core/cachedClasses";
import { getPlayersWithControllerIndex } from "../../../functions/players";
import type { PostEsauJr } from "../../callbacks/PostEsauJr";
import type { PostFirstEsauJr } from "../../callbacks/PostFirstEsauJr";
import { Feature } from "../../private/Feature";

const v = {
  run: {
    usedEsauJrFrame: null as int | null,
    usedEsauJrControllerIndex: null as ControllerIndex | null,
    usedEsauJrAtLeastOnce: false,
  },
};

export class EsauJrDetection extends Feature {
  public override v = v;

  private readonly postEsauJr: PostEsauJr;
  private readonly postFirstEsauJr: PostFirstEsauJr;

  constructor(postEsauJr: PostEsauJr, postFirstEsauJr: PostFirstEsauJr) {
    super();

    this.callbacksUsed = [
      // 1
      [ModCallback.POST_UPDATE, this.postUpdate],

      // 3
      [
        ModCallback.POST_USE_ITEM,
        this.postUseItemEsauJr,
        [CollectibleType.ESAU_JR],
      ],
    ];

    this.postEsauJr = postEsauJr;
    this.postFirstEsauJr = postFirstEsauJr;
  }

  // ModCallback.POST_UPDATE (1)
  private readonly postUpdate = (): void => {
    const gameFrameCount = game.GetFrameCount();

    // Check to see if it is the frame after the player has used Esau Jr.
    if (
      v.run.usedEsauJrFrame === null
      || gameFrameCount < v.run.usedEsauJrFrame + 1
    ) {
      return;
    }
    v.run.usedEsauJrFrame = null;

    // Find the player corresponding to the player who used Esau Jr. a frame ago (via matching the
    // ControllerIndex).
    if (v.run.usedEsauJrControllerIndex === null) {
      return;
    }
    const players = getPlayersWithControllerIndex(
      v.run.usedEsauJrControllerIndex,
    );
    v.run.usedEsauJrControllerIndex = null;

    const player = players[0];
    if (player === undefined) {
      return;
    }

    if (!v.run.usedEsauJrAtLeastOnce) {
      v.run.usedEsauJrAtLeastOnce = true;
      this.postFirstEsauJr.fire(player);
    }

    this.postEsauJr.fire(player);
  };

  // ModCallback.POST_USE_ITEM (3)
  // CollectibleType.ESAU_JR (703)
  private readonly postUseItemEsauJr = (
    _collectibleType: CollectibleType,
    _rng: RNG,
    player: EntityPlayer,
    _useFlags: BitFlags<UseFlag>,
    _activeSlot: int,
    _customVarData: int,
  ): boolean | undefined => {
    const gameFrameCount = game.GetFrameCount();

    // The player only changes to Esau Jr. on the frame after the item is used.
    v.run.usedEsauJrFrame = gameFrameCount + 1;
    v.run.usedEsauJrControllerIndex = player.ControllerIndex;

    return undefined;
  };
}
