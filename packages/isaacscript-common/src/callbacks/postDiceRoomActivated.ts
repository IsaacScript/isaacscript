import {
  DiceFloorSubType,
  EffectVariant,
  ModCallback,
} from "isaac-typescript-definitions";
import { DICE_FLOOR_TRIGGER_DISTANCE } from "../constants";
import { saveDataManager } from "../features/saveDataManager/exports";
import { getClosestPlayer } from "../functions/player";
import {
  postDiceRoomActivatedFire,
  postDiceRoomActivatedHasSubscriptions,
} from "./subscriptions/postDiceRoomActivated";

const v = {
  room: {
    diceRoomActivated: false,
  },
};

/** @internal */
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
  if (!hasSubscriptions()) {
    return;
  }

  if (v.room.diceRoomActivated) {
    return;
  }

  const closestPlayer = getClosestPlayer(effect.Position);
  const distance = effect.Position.Distance(closestPlayer.Position);
  if (distance <= DICE_FLOOR_TRIGGER_DISTANCE) {
    v.room.diceRoomActivated = true;
    postDiceRoomActivatedFire(
      closestPlayer,
      effect.SubType as DiceFloorSubType,
    );
  }
}
