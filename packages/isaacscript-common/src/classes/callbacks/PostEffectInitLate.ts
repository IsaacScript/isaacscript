import { ModCallback } from "isaac-typescript-definitions";
import { ModCallbackCustom2 } from "../../enums/ModCallbackCustom2";
import { CustomCallbackEffect } from "./validation/CustomCallbackEffect";

export class PostEffectInitLate extends CustomCallbackEffect<ModCallbackCustom2.POST_EFFECT_INIT_LATE> {
  override v = {
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

  // ModCallback.POST_EFFECT_UPDATE (55)
  postEffectUpdate = (effect: EntityEffect): void => {
    const index = GetPtrHash(effect);
    if (!this.v.room.firedSet.has(index)) {
      this.v.room.firedSet.add(index);
      this.fire(effect);
    }
  };
}
