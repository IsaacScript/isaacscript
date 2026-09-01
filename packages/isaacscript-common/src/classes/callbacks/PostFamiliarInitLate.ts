import { ModCallback } from "isaac-typescript-definitions";
import type { ModCallbackCustom } from "../../enums/ModCallbackCustom";
import { shouldFireFamiliar } from "../../shouldFire";
import { CustomCallback } from "../private/CustomCallback";

const v = {
  room: {
    firedSet: new Set<PtrHash>(),
  },
};

export class PostFamiliarInitLate extends CustomCallback<ModCallbackCustom.POST_FAMILIAR_INIT_LATE> {
  // ModCallback.POST_FAMILIAR_UPDATE (6)
  private readonly postFamiliarUpdate = (familiar: EntityFamiliar): void => {
    const index = GetPtrHash(familiar);
    if (!v.room.firedSet.has(index)) {
      v.room.firedSet.add(index);
      this.fire(familiar);
    }
  };

  public override v = v;

  protected override shouldFire = shouldFireFamiliar;

  constructor() {
    super();

    this.callbacksUsed = [
      // 6
      [ModCallback.POST_FAMILIAR_UPDATE, this.postFamiliarUpdate],
    ];
  }
}
