import { ModCallback } from "isaac-typescript-definitions";
import { ModCallbackCustom } from "../../enums/ModCallbackCustom";
import { shouldFireKnife } from "../../shouldFire";
import { CustomCallback } from "../private/CustomCallback";

export class PostKnifeInitFilter extends CustomCallback<ModCallbackCustom.POST_KNIFE_INIT_FILTER> {
  constructor() {
    super();

    this.callbacksUsed = [
      // 50
      [ModCallback.POST_KNIFE_INIT, this.postKnifeInit],
    ];
  }

  protected override shouldFire = shouldFireKnife;

  // ModCallback.POST_KNIFE_INIT (50)
  private postKnifeInit = (knife: EntityKnife) => {
    this.fire(knife);
  };
}
