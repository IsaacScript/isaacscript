import { ModCallback } from "isaac-typescript-definitions";
import type { ModCallbackCustom } from "../../enums/ModCallbackCustom";
import { shouldFireFamiliar } from "../../shouldFire";
import { CustomCallback } from "../private/CustomCallback";

export class PostFamiliarInitFilter extends CustomCallback<ModCallbackCustom.POST_FAMILIAR_INIT_FILTER> {
  // ModCallback.POST_FAMILIAR_INIT (7)
  private readonly postFamiliarInit = (familiar: EntityFamiliar) => {
    this.fire(familiar);
  };

  protected override shouldFire = shouldFireFamiliar;

  constructor() {
    super();

    this.callbacksUsed = [
      // 7
      [ModCallback.POST_FAMILIAR_INIT, this.postFamiliarInit],
    ];
  }
}
