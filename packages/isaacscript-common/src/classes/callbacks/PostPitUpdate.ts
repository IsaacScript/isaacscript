import { ModCallback } from "isaac-typescript-definitions";
import { ModCallbackCustom2 } from "../../enums/ModCallbackCustom2";
import { getPits } from "../../functions/gridEntitiesSpecific";
import { CustomCallbackPit } from "./validation/CustomCallbackPit";

export class PostPitUpdate extends CustomCallbackPit<ModCallbackCustom2.POST_PIT_UPDATE> {
  constructor() {
    super();

    this.callbacksUsed = [
      [ModCallback.POST_UPDATE, [this.postUpdate]], // 1
    ];
  }

  // ModCallback.POST_UPDATE (1)
  private postUpdate = (): void => {
    for (const pit of getPits()) {
      this.fire(pit);
    }
  };
}
