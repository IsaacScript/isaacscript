import { ModCallback } from "isaac-typescript-definitions";
import type { ModCallbackCustom } from "../../enums/ModCallbackCustom";
import { shouldFireKnife } from "../../shouldFire";
import { CustomCallback } from "../private/CustomCallback";

export class PostKnifeUpdateFilter extends CustomCallback<ModCallbackCustom.POST_KNIFE_UPDATE_FILTER> {
  // ModCallback.POST_KNIFE_UPDATE (51)
  private readonly postKnifeUpdate = (knife: EntityKnife) => {
    this.fire(knife);
  };

  protected override shouldFire = shouldFireKnife;

  constructor() {
    super();

    this.callbacksUsed = [
      // 51
      [ModCallback.POST_KNIFE_UPDATE, this.postKnifeUpdate],
    ];
  }
}
