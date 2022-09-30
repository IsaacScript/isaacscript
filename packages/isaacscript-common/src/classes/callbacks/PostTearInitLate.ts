import { ModCallback } from "isaac-typescript-definitions";
import { ModCallbackCustom2 } from "../../enums/ModCallbackCustom2";
import { CustomCallbackTear } from "./validation/CustomCallbackTear";

export class PostTearInitLate extends CustomCallbackTear<ModCallbackCustom2.POST_TEAR_INIT_LATE> {
  public override v = {
    room: {
      firedSet: new Set<PtrHash>(),
    },
  };

  constructor() {
    super();

    this.callbacksUsed = [
      [ModCallback.POST_TEAR_UPDATE, [this.postTearUpdate]], // 40
    ];
  }

  // ModCallback.POST_TEAR_UPDATE (40)
  private postTearUpdate = (tear: EntityTear): void => {
    const ptrHash = GetPtrHash(tear);
    if (!this.v.room.firedSet.has(ptrHash)) {
      this.v.room.firedSet.add(ptrHash);
      this.fire(tear);
    }
  };
}
