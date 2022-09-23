import {
  DiceFloorSubType,
  EffectVariant,
  ModCallback,
} from "isaac-typescript-definitions";
import { postDiceRoomActivatedFire } from "../../callbacks/subscriptions/postDiceRoomActivated";
import { ModCallbackCustom2 } from "../../enums/ModCallbackCustom2";
import { isCloseEnoughToTriggerDiceFloor } from "../../functions/effects";
import { getClosestPlayer } from "../../functions/players";
import {
  CustomCallback,
  FireArgs,
  OptionalArgs,
} from "../private/CustomCallback";

type T = ModCallbackCustom2.POST_DICE_ROOM_ACTIVATED;

export class PostDiceRoomActivated extends CustomCallback<T> {
  override v = {
    room: {
      diceRoomActivated: false,
    },
  };

  constructor() {
    super();

    this.callbacksUsed = [
      [
        ModCallback.POST_EFFECT_UPDATE,
        [this.postEffectUpdateDiceFloor, EffectVariant.DICE_FLOOR],
      ], // 55
    ];
  }

  // eslint-disable-next-line class-methods-use-this
  override shouldFire(
    fireArgs: FireArgs<T>,
    optionalArgs: OptionalArgs<T>,
  ): boolean {
    const [callbackDiceFloorSubType] = optionalArgs;
    if (callbackDiceFloorSubType === undefined) {
      return true;
    }

    const [_player, diceFloorSubType] = fireArgs;
    return diceFloorSubType === callbackDiceFloorSubType;
  }

  // ModCallback.POST_EFFECT_UPDATE (55)
  // EffectVariant.DICE_FLOOR (76)
  postEffectUpdateDiceFloor = (effect: EntityEffect): void => {
    if (this.v.room.diceRoomActivated) {
      return;
    }

    // When using the debug console to go to a dice room, the player can appear on top of the dice
    // floor before they snap to the door.
    if (effect.FrameCount === 0) {
      return;
    }

    const closestPlayer = getClosestPlayer(effect.Position);
    if (isCloseEnoughToTriggerDiceFloor(closestPlayer, effect)) {
      this.v.room.diceRoomActivated = true;
      postDiceRoomActivatedFire(
        closestPlayer,
        effect.SubType as DiceFloorSubType,
      );
    }
  };
}
