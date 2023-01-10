import { ModCallback } from "isaac-typescript-definitions";
import { ModCallbackCustom } from "../../enums/ModCallbackCustom";
import { shouldFireFamiliar } from "../../shouldFire";
import { DefaultMap } from "../DefaultMap";
import { CustomCallback } from "../private/CustomCallback";

export class PostFamiliarStateChanged extends CustomCallback<ModCallbackCustom.POST_FAMILIAR_STATE_CHANGED> {
  public override v = {
    run: {
      stateMap: new DefaultMap<PtrHash, int, [int]>((state) => state),
    },
  };

  constructor() {
    super();

    this.callbacksUsed = [
      // 6
      [ModCallback.POST_FAMILIAR_UPDATE, this.postFamiliarUpdate],
    ];
  }

  protected override shouldFire = shouldFireFamiliar;

  // ModCallback.POST_FAMILIAR_UPDATE (6)
  private postFamiliarUpdate = (familiar: EntityFamiliar): void => {
    const ptrHash = GetPtrHash(familiar);
    const previousState = this.v.run.stateMap.getAndSetDefault(
      ptrHash,
      familiar.State,
    );
    const currentState = familiar.State;
    this.v.run.stateMap.set(ptrHash, currentState);

    if (previousState !== currentState) {
      this.fire(familiar, previousState, currentState);
    }
  };
}
