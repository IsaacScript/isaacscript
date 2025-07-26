import type { DiceFloorSubType } from "isaac-typescript-definitions";
import { EffectVariant, ModCallback } from "isaac-typescript-definitions";
import type { ModCallbackCustom } from "../../enums/ModCallbackCustom";
import { isCloseEnoughToTriggerDiceFloor } from "../../functions/effects";
import { getClosestPlayer } from "../../functions/players";
import type { FireArgs, OptionalArgs } from "../private/CustomCallback";
import { CustomCallback } from "../private/CustomCallback";

type T = ModCallbackCustom.POST_DICE_ROOM_ACTIVATED;

const v = {
  room: {
    diceRoomActivated: false,
  },
};

export class PostDiceRoomActivated extends CustomCallback<T> {
  public override v = v;

  constructor() {
    super();

    this.callbacksUsed = [
      // 55
      [
        ModCallback.POST_EFFECT_UPDATE,
        this.postEffectUpdateDiceFloor,
        [EffectVariant.DICE_FLOOR],
      ],
    ];
  }

  protected override shouldFire = (
    fireArgs: FireArgs<T>,
    optionalArgs: OptionalArgs<T>,
  ): boolean => {
    const [_player, diceFloorSubType] = fireArgs;
    const [callbackDiceFloorSubType] = optionalArgs;

    return (
      callbackDiceFloorSubType === undefined
      || diceFloorSubType === callbackDiceFloorSubType
    );
  };

  // ModCallback.POST_EFFECT_UPDATE (55)
  // EffectVariant.DICE_FLOOR (76)
  private readonly postEffectUpdateDiceFloor = (effect: EntityEffect): void => {
    if (v.room.diceRoomActivated) {
      return;
    }

    // When using the debug console to go to a dice room, the player can appear on top of the dice
    // floor before they snap to the door.
    if (effect.FrameCount === 0) {
      return;
    }

    const closestPlayer = getClosestPlayer(effect.Position);
    if (isCloseEnoughToTriggerDiceFloor(closestPlayer, effect)) {
      v.room.diceRoomActivated = true;
      this.fire(closestPlayer, effect.SubType as DiceFloorSubType);
    }
  };
}
