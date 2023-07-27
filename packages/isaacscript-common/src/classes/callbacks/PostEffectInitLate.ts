import { ModCallback } from "isaac-typescript-definitions";
import type { ModCallbackCustom } from "../../enums/ModCallbackCustom";
import { shouldFireEffect } from "../../shouldFire";
import { CustomCallback } from "../private/CustomCallback";

const v = {
  room: {
    firedSet: new Set<PtrHash>(),
  },
};

export class PostEffectInitLate extends CustomCallback<ModCallbackCustom.POST_EFFECT_INIT_LATE> {
  public override v = v;

  constructor() {
    super();

    this.callbacksUsed = [
      // 55
      [ModCallback.POST_EFFECT_UPDATE, this.postEffectUpdate],
    ];
  }

  protected override shouldFire = shouldFireEffect;

  // ModCallback.POST_EFFECT_UPDATE (55)
  private readonly postEffectUpdate = (effect: EntityEffect): void => {
    const index = GetPtrHash(effect);
    if (!v.room.firedSet.has(index)) {
      v.room.firedSet.add(index);
      this.fire(effect);
    }
  };
}
