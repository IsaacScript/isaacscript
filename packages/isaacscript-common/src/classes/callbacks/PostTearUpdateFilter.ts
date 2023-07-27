import { ModCallback } from "isaac-typescript-definitions";
import type { ModCallbackCustom } from "../../enums/ModCallbackCustom";
import { shouldFireTear } from "../../shouldFire";
import { CustomCallback } from "../private/CustomCallback";

export class PostTearUpdateFilter extends CustomCallback<ModCallbackCustom.POST_TEAR_UPDATE_FILTER> {
  constructor() {
    super();

    this.callbacksUsed = [
      // 40
      [ModCallback.POST_TEAR_UPDATE, this.postTearUpdate],
    ];
  }

  protected override shouldFire = shouldFireTear;

  // ModCallback.POST_TEAR_UPDATE (40)
  private readonly postTearUpdate = (tear: EntityTear) => {
    this.fire(tear);
  };
}
