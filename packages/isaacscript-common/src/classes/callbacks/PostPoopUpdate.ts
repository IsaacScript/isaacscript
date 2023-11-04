import { ModCallback } from "isaac-typescript-definitions";
import type { ModCallbackCustom } from "../../enums/ModCallbackCustom";
import { getPoops } from "../../functions/gridEntitiesSpecific";
import { shouldFirePoop } from "../../shouldFire";
import { CustomCallback } from "../private/CustomCallback";

export class PostPoopUpdate extends CustomCallback<ModCallbackCustom.POST_POOP_UPDATE> {
  constructor() {
    super();

    this.callbacksUsed = [
      // 1
      [ModCallback.POST_UPDATE, this.postUpdate],
    ];
  }

  protected override shouldFire = shouldFirePoop;

  // ModCallback.POST_UPDATE (1)
  private readonly postUpdate = (): void => {
    for (const poop of getPoops()) {
      this.fire(poop);
    }
  };
}
