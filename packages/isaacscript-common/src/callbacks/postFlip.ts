// This provides the logic for the following callbacks:
// - `POST_FLIP`
// - `POST_FIRST_FLIP`

import {
  CollectibleType,
  ModCallback,
  PlayerType,
  UseFlag,
} from "isaac-typescript-definitions";
import { saveDataManager } from "../features/saveDataManager/exports";
import { getPlayersOfType, isTaintedLazarus } from "../functions/players";
import {
  postFirstFlipFire,
  postFirstFlipHasSubscriptions,
} from "./subscriptions/postFirstFlip";
import {
  postFlipFire,
  postFlipHasSubscriptions,
} from "./subscriptions/postFlip";

const v = {
  run: {
    /** We don't consider the case of a multiplayer game with more than one Tainted Lazarus. */
    usedFlipAtLeastOnce: false,
  },
};

/** @internal */
export function postFlipCallbacksInit(mod: Mod): void {
  saveDataManager("postFlip", v, hasSubscriptions);

  mod.AddCallback(ModCallback.POST_USE_ITEM, useItemFlip, CollectibleType.FLIP); // 3
}

function hasSubscriptions() {
  return postFlipHasSubscriptions() || postFirstFlipHasSubscriptions();
}

// ModCallback.POST_USE_ITEM (3)
// CollectibleType.FLIP (711)
function useItemFlip(
  _collectibleType: CollectibleType,
  _rng: RNG,
  player: EntityPlayer,
  _useFlags: BitFlags<UseFlag>,
  _activeSlot: int,
  _customVarData: int,
): boolean | undefined {
  if (!hasSubscriptions()) {
    return undefined;
  }

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
    postFirstFlipFire(newLazarus, player);
  }

  postFlipFire(newLazarus, player);

  return undefined;
}

function getNewLazarus(oldLazarus: EntityPlayer) {
  const oldCharacter = oldLazarus.GetPlayerType();

  let newCharacter: PlayerType;
  if (oldCharacter === PlayerType.LAZARUS_B) {
    newCharacter = PlayerType.LAZARUS_2_B;
  } else if (oldCharacter === PlayerType.LAZARUS_2_B) {
    newCharacter = PlayerType.LAZARUS_B;
  } else {
    error("Failed to determine the character in the postFlip callback.");
  }

  const playersOfType = getPlayersOfType(newCharacter);
  return playersOfType.find(
    (player) => player.FrameCount === oldLazarus.FrameCount,
  );
}
