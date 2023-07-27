import { ModCallback } from "isaac-typescript-definitions";
import type { ModCallbackCustom } from "../../enums/ModCallbackCustom";
import { shouldFireKnife } from "../../shouldFire";
import { CustomCallback } from "../private/CustomCallback";

const v = {
  room: {
    firedSet: new Set<PtrHash>(),
  },
};

export class PostKnifeInitLate extends CustomCallback<ModCallbackCustom.POST_KNIFE_INIT_LATE> {
  public override v = v;

  constructor() {
    super();

    this.callbacksUsed = [
      // 51
      [ModCallback.POST_KNIFE_UPDATE, this.postKnifeUpdate],
    ];
  }

  protected override shouldFire = shouldFireKnife;

  // ModCallback.POST_KNIFE_UPDATE (51)
  private readonly postKnifeUpdate = (knife: EntityKnife): void => {
    const ptrHash = GetPtrHash(knife);
    if (!v.room.firedSet.has(ptrHash)) {
      v.room.firedSet.add(ptrHash);
      this.fire(knife);
    }
  };
}
