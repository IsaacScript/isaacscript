import { ModCallback } from "isaac-typescript-definitions";
import { ModCallbackCustom2 } from "../../enums/ModCallbackCustom2";
import { shouldFireEffect } from "../../shouldFire";
import { CustomCallback } from "../private/CustomCallback";

export class PostEffectInitLate extends CustomCallback<ModCallbackCustom2.POST_EFFECT_INIT_LATE> {
  public override v = {
    room: {
      firedSet: new Set<PtrHash>(),
    },
  };

  constructor() {
    super();

    this.callbacksUsed = [
      [ModCallback.POST_EFFECT_UPDATE, [this.postEffectUpdate]],
    ]; // 55
  }

  protected override shouldFire = shouldFireEffect;

  // ModCallback.POST_EFFECT_UPDATE (55)
  private postEffectUpdate = (effect: EntityEffect): void => {
    const index = GetPtrHash(effect);
    if (!this.v.room.firedSet.has(index)) {
      this.v.room.firedSet.add(index);
      this.fire(effect);
    }
  };
}
