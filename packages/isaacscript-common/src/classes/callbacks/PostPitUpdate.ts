import { ModCallback } from "isaac-typescript-definitions";
import { ModCallbackCustom } from "../../enums/ModCallbackCustom";
import { getPits } from "../../functions/gridEntitiesSpecific";
import { shouldFirePit } from "../../shouldFire";
import { CustomCallback } from "../private/CustomCallback";

export class PostPitUpdate extends CustomCallback<ModCallbackCustom.POST_PIT_UPDATE> {
  constructor() {
    super();

    this.callbacksUsed = [
      [ModCallback.POST_UPDATE, [this.postUpdate]], // 1
    ];
  }

  protected override shouldFire = shouldFirePit;

  // ModCallback.POST_UPDATE (1)
  private postUpdate = (): void => {
    for (const pit of getPits()) {
      this.fire(pit);
    }
  };
}
