import { ModCallback } from "isaac-typescript-definitions";
import { ModCallbackCustom2 } from "../../enums/ModCallbackCustom2";
import { shouldFireKnife } from "../../shouldFire";
import { CustomCallback } from "../private/CustomCallback";

export class PostKnifeInitLate extends CustomCallback<ModCallbackCustom2.POST_KNIFE_INIT_LATE> {
  public override v = {
    room: {
      firedSet: new Set<PtrHash>(),
    },
  };

  constructor() {
    super();

    this.callbacksUsed = [
      [ModCallback.POST_KNIFE_UPDATE, [this.postKnifeUpdate]], // 51
    ];
  }

  protected override shouldFire = shouldFireKnife;

  // ModCallback.POST_KNIFE_UPDATE (51)
  private postKnifeUpdate = (knife: EntityKnife): void => {
    const ptrHash = GetPtrHash(knife);
    if (!this.v.room.firedSet.has(ptrHash)) {
      this.v.room.firedSet.add(ptrHash);
      this.fire(knife);
    }
  };
}
