import { ModCallback } from "isaac-typescript-definitions";
import { ModCallbackCustom2 } from "../../enums/ModCallbackCustom2";
import { CustomCallbackKnife } from "./validation/CustomCallbackKnife";

export class PostKnifeInitLate extends CustomCallbackKnife<ModCallbackCustom2.POST_KNIFE_INIT_LATE> {
  override v = {
    room: {
      firedSet: new Set<PtrHash>(),
    },
  };

  constructor() {
    super();

    this.otherCallbacksUsed = [
      [ModCallback.POST_KNIFE_UPDATE, [this.postKnifeUpdate]], // 51
    ];
  }

  // ModCallback.POST_KNIFE_UPDATE (51)
  postKnifeUpdate = (knife: EntityKnife): void => {
    const ptrHash = GetPtrHash(knife);
    if (!this.v.room.firedSet.has(ptrHash)) {
      this.v.room.firedSet.add(ptrHash);
      this.fire(knife);
    }
  };
}
