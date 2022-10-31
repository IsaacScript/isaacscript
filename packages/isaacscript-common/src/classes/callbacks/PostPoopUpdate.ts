import { ModCallback } from "isaac-typescript-definitions";
import { ModCallbackCustom } from "../../enums/ModCallbackCustom";
import { getPoops } from "../../functions/gridEntitiesSpecific";
import { shouldFirePoop } from "../../shouldFire";
import { CustomCallback } from "../private/CustomCallback";

export class PostPoopUpdate extends CustomCallback<ModCallbackCustom.POST_POOP_UPDATE> {
  constructor() {
    super();

    this.callbacksUsed = [
      [ModCallback.POST_UPDATE, [this.postUpdate]], // 1
    ];
  }

  protected override shouldFire = shouldFirePoop;

  // ModCallback.POST_UPDATE (1)
  private postUpdate = (): void => {
    for (const poop of getPoops()) {
      this.fire(poop);
    }
  };
}
