import { ModCallback } from "isaac-typescript-definitions";
import type { ModCallbackCustom } from "../../enums/ModCallbackCustom";
import { shouldFireFamiliar } from "../../shouldFire";
import { DefaultMap } from "../DefaultMap";
import { CustomCallback } from "../private/CustomCallback";

const v = {
  run: {
    stateMap: new DefaultMap<PtrHash, int, [int]>((state) => state),
  },
};

export class PostFamiliarStateChanged extends CustomCallback<ModCallbackCustom.POST_FAMILIAR_STATE_CHANGED> {
  // ModCallback.POST_FAMILIAR_UPDATE (6)
  private readonly postFamiliarUpdate = (familiar: EntityFamiliar): void => {
    const ptrHash = GetPtrHash(familiar);
    const previousState = v.run.stateMap.getAndSetDefault(
      ptrHash,
      familiar.State,
    );
    const currentState = familiar.State;
    v.run.stateMap.set(ptrHash, currentState);

    if (previousState !== currentState) {
      this.fire(familiar, previousState, currentState);
    }
  };

  public override v = v;

  protected override shouldFire = shouldFireFamiliar;

  constructor() {
    super();

    this.callbacksUsed = [
      // 6
      [ModCallback.POST_FAMILIAR_UPDATE, this.postFamiliarUpdate],
    ];
  }
}
