import { ModCallback } from "isaac-typescript-definitions";
import type { ModCallbackCustom } from "../../enums/ModCallbackCustom";
import { shouldFireTear } from "../../shouldFire";
import { CustomCallback } from "../private/CustomCallback";

export class PostTearInitFilter extends CustomCallback<ModCallbackCustom.POST_TEAR_INIT_FILTER> {
  constructor() {
    super();

    this.callbacksUsed = [
      // 39
      [ModCallback.POST_TEAR_INIT, this.postTearInit],
    ];
  }

  protected override shouldFire = shouldFireTear;

  // ModCallback.POST_TEAR_INIT (39)
  private readonly postTearInit = (tear: EntityTear) => {
    this.fire(tear);
  };
}
