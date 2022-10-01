import { ModCallback } from "isaac-typescript-definitions";
import { ModCallbackCustom2 } from "../../enums/ModCallbackCustom2";
import { getTNT } from "../../functions/gridEntitiesSpecific";
import { CustomCallbackTNT } from "./validation/CustomCallbackTNT";

export class PostTNTUpdate extends CustomCallbackTNT<ModCallbackCustom2.POST_TNT_UPDATE> {
  constructor() {
    super();

    this.callbacksUsed = [
      [ModCallback.POST_UPDATE, [this.postUpdate]], // 1
    ];
  }

  // ModCallback.POST_UPDATE (1)
  private postUpdate = (): void => {
    for (const tnt of getTNT()) {
      this.fire(tnt);
    }
  };
}
