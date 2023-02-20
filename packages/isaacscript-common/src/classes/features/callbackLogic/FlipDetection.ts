import {
  CollectibleType,
  ModCallback,
  PlayerType,
  UseFlag,
} from "isaac-typescript-definitions";
import { getPlayersOfType, isTaintedLazarus } from "../../../functions/players";
import { PostFirstFlip } from "../../callbacks/PostFirstFlip";
import { PostFlip } from "../../callbacks/PostFlip";
import { Feature } from "../../private/Feature";

const v = {
  run: {
    /** We don't consider the case of a multiplayer game with more than one Tainted Lazarus. */
    usedFlipAtLeastOnce: false,
  },
};

export class FlipDetection extends Feature {
  public override v = v;

  private postFlip: PostFlip;
  private postFirstFlip: PostFirstFlip;

  constructor(postFlip: PostFlip, postFirstFlip: PostFirstFlip) {
    super();

    this.callbacksUsed = [
      // 3
      [ModCallback.POST_USE_ITEM, this.useItemFlip, [CollectibleType.FLIP]],
    ];

    this.postFlip = postFlip;
    this.postFirstFlip = postFirstFlip;
  }

  // ModCallback.POST_USE_ITEM (3)
  // CollectibleType.FLIP (711)
  private useItemFlip = (
    _collectibleType: CollectibleType,
    _rng: RNG,
    player: EntityPlayer,
    _useFlags: BitFlags<UseFlag>,
    _activeSlot: int,
    _customVarData: int,
  ): boolean | undefined => {
    if (!isTaintedLazarus(player)) {
      return undefined;
    }

    // The player passed as part of the callback will be the old Lazarus that used the Flip item. We
    // pass the new Lazarus to the callback subscribers.
    const newLazarus = getNewLazarus(player);
    if (newLazarus === undefined) {
      return undefined;
    }

    if (!v.run.usedFlipAtLeastOnce) {
      v.run.usedFlipAtLeastOnce = true;
      this.postFirstFlip.fire(newLazarus, player);
    }

    this.postFlip.fire(newLazarus, player);

    return undefined;
  };
}

function getNewLazarus(oldLazarus: EntityPlayer): EntityPlayer | undefined {
  const oldCharacter = oldLazarus.GetPlayerType();

  let newCharacter: PlayerType;
  if (oldCharacter === PlayerType.LAZARUS_B) {
    newCharacter = PlayerType.LAZARUS_2_B;
  } else if (oldCharacter === PlayerType.LAZARUS_2_B) {
    newCharacter = PlayerType.LAZARUS_B;
  } else {
    return undefined;
  }

  const playersOfType = getPlayersOfType(newCharacter);
  return playersOfType.find(
    (player) => player.FrameCount === oldLazarus.FrameCount,
  );
}
