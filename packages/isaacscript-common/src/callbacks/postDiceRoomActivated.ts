import { EffectVariant, ModCallback } from "isaac-typescript-definitions";
import { saveDataManager } from "../features/saveDataManager/exports";
import { isCloseEnoughToTriggerDiceFloor } from "../functions/effects";
import { getClosestPlayer } from "../functions/players";
import {
  postDiceRoomActivatedFire,
  postDiceRoomActivatedHasSubscriptions,
} from "./subscriptions/postDiceRoomActivated";

const v = {
  room: {
    diceRoomActivated: false,
  },
};

export function postDiceRoomActivatedInit(mod: Mod): void {
  saveDataManager("postDiceRoomActivated", v, hasSubscriptions);

  mod.AddCallback(
    ModCallback.POST_EFFECT_UPDATE,
    postEffectUpdateDiceFloor,
    EffectVariant.DICE_FLOOR,
  ); // 55
}

function hasSubscriptions() {
  return postDiceRoomActivatedHasSubscriptions();
}

// ModCallback.POST_EFFECT_UPDATE (55)
// EffectVariant.DICE_FLOOR (76)
function postEffectUpdateDiceFloor(effect: EntityEffect) {
  const diceFloor = effect as EntityEffectDiceFloor;

  if (!hasSubscriptions()) {
    return;
  }

  if (v.room.diceRoomActivated) {
    return;
  }

  // When using the debug console to go to a dice room, the player can appear on top of the dice
  // floor before they snap to the door.
  if (diceFloor.FrameCount === 0) {
    return;
  }

  const closestPlayer = getClosestPlayer(diceFloor.Position);
  if (isCloseEnoughToTriggerDiceFloor(closestPlayer, diceFloor)) {
    v.room.diceRoomActivated = true;
    postDiceRoomActivatedFire(closestPlayer, diceFloor.SubType);
  }
}
