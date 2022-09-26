import { ModCallback } from "isaac-typescript-definitions";
import { ModCallbackCustom2 } from "../../enums/ModCallbackCustom2";
import { DefaultMap } from "../DefaultMap";
import { CustomCallbackEffect } from "./validation/CustomCallbackEffect";

export class PostEffectStateChanged extends CustomCallbackEffect<ModCallbackCustom2.POST_EFFECT_STATE_CHANGED> {
  public override v = {
    run: {
      stateMap: new DefaultMap<PtrHash, int, [int]>((state) => state),
    },
  };

  constructor() {
    super();

    this.callbacksUsed = [
      [ModCallback.POST_EFFECT_UPDATE, [this.postEffectUpdate]],
    ]; // 55
  }

  // ModCallback.POST_EFFECT_UPDATE (55)
  private postEffectUpdate = (effect: EntityEffect): void => {
    const ptrHash = GetPtrHash(effect);
    const previousState = this.v.run.stateMap.getAndSetDefault(
      ptrHash,
      effect.State,
    );
    const currentState = effect.State;
    this.v.run.stateMap.set(ptrHash, currentState);

    if (previousState !== currentState) {
      this.fire(effect, previousState, currentState);
    }
  };
}
