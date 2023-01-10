import { ModCallback } from "isaac-typescript-definitions";
import { ModCallbackCustom } from "../../enums/ModCallbackCustom";
import { shouldFireEffect } from "../../shouldFire";
import { DefaultMap } from "../DefaultMap";
import { CustomCallback } from "../private/CustomCallback";

export class PostEffectStateChanged extends CustomCallback<ModCallbackCustom.POST_EFFECT_STATE_CHANGED> {
  public override v = {
    run: {
      stateMap: new DefaultMap<PtrHash, int, [int]>((state) => state),
    },
  };

  constructor() {
    super();

    this.callbacksUsed = [
      // 55
      [ModCallback.POST_EFFECT_UPDATE, this.postEffectUpdate],
    ];
  }

  protected override shouldFire = shouldFireEffect;

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
