import { ModCallback } from "isaac-typescript-definitions";
import type { ModCallbackCustom } from "../../enums/ModCallbackCustom";
import { shouldFireFamiliar } from "../../shouldFire";
import { CustomCallback } from "../private/CustomCallback";

export class PostFamiliarUpdateFilter extends CustomCallback<ModCallbackCustom.POST_FAMILIAR_UPDATE_FILTER> {
  constructor() {
    super();

    this.callbacksUsed = [
      // 6
      [ModCallback.POST_FAMILIAR_UPDATE, this.postFamiliarUpdate],
    ];
  }

  protected override shouldFire = shouldFireFamiliar;

  // ModCallback.POST_FAMILIAR_UPDATE (6)
  private readonly postFamiliarUpdate = (familiar: EntityFamiliar) => {
    this.fire(familiar);
  };
}
