import { ModCallback } from "isaac-typescript-definitions";
import { ModCallbackCustom2 } from "../../enums/ModCallbackCustom2";
import { getTNT } from "../../functions/gridEntitiesSpecific";
import { shouldFireTNT } from "../../shouldFire";
import { CustomCallback } from "../private/CustomCallback";

export class PostTNTUpdate extends CustomCallback<ModCallbackCustom2.POST_TNT_UPDATE> {
  constructor() {
    super();

    this.callbacksUsed = [
      [ModCallback.POST_UPDATE, [this.postUpdate]], // 1
    ];
  }

  protected override shouldFire = shouldFireTNT;

  // ModCallback.POST_UPDATE (1)
  private postUpdate = (): void => {
    for (const tnt of getTNT()) {
      this.fire(tnt);
    }
  };
}
