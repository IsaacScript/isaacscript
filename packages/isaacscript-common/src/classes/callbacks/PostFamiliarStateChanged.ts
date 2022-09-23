import { ModCallback } from "isaac-typescript-definitions";
import { ModCallbackCustom2 } from "../../enums/ModCallbackCustom2";
import { DefaultMap } from "../DefaultMap";
import { CustomCallbackFamiliar } from "./validation/CustomCallbackFamiliar";

export class PostFamiliarStateChanged extends CustomCallbackFamiliar<ModCallbackCustom2.POST_FAMILIAR_STATE_CHANGED> {
  override v = {
    run: {
      stateMap: new DefaultMap<PtrHash, int, [int]>((state) => state),
    },
  };

  constructor() {
    super();

    this.callbacksUsed = [
      [ModCallback.POST_FAMILIAR_UPDATE, [this.postFamiliarUpdate]],
    ]; // 6
  }

  // ModCallback.POST_FAMILIAR_UPDATE (6)
  postFamiliarUpdate = (familiar: EntityFamiliar): void => {
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
