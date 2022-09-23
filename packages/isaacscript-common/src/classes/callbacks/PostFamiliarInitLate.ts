import { ModCallback } from "isaac-typescript-definitions";
import { ModCallbackCustom2 } from "../../enums/ModCallbackCustom2";
import { CustomCallbackFamiliar } from "./validation/CustomCallbackFamiliar";

export class PostFamiliarInitLate extends CustomCallbackFamiliar<ModCallbackCustom2.POST_FAMILIAR_INIT_LATE> {
  override v = {
    room: {
      firedSet: new Set<PtrHash>(),
    },
  };

  constructor() {
    super();

    this.callbacksUsed = [
      [ModCallback.POST_FAMILIAR_UPDATE, [this.postFamiliarUpdate]],
    ]; // 6
  }

  // ModCallback.POST_FAMILIAR_UPDATE (6)
  postFamiliarUpdate = (familiar: EntityFamiliar): void => {
    const index = GetPtrHash(familiar);
    if (!this.v.room.firedSet.has(index)) {
      this.v.room.firedSet.add(index);
      this.fire(familiar);
    }
  };
}
