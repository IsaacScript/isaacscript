import { ModCallback } from "isaac-typescript-definitions";
import type { ModCallbackCustom } from "../../enums/ModCallbackCustom";
import { getTNT } from "../../functions/gridEntitiesSpecific";
import { shouldFireTNT } from "../../shouldFire";
import { CustomCallback } from "../private/CustomCallback";

export class PostTNTUpdate extends CustomCallback<ModCallbackCustom.POST_TNT_UPDATE> {
  // ModCallback.POST_UPDATE (1)
  private readonly postUpdate = (): void => {
    for (const tnt of getTNT()) {
      this.fire(tnt);
    }
  };

  protected override shouldFire = shouldFireTNT;

  constructor() {
    super();

    this.callbacksUsed = [
      // 1
      [ModCallback.POST_UPDATE, this.postUpdate],
    ];
  }
}
