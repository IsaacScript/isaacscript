import { ModCallback } from "isaac-typescript-definitions";
import { ModCallbackCustom } from "../../enums/ModCallbackCustom";
import { shouldFireFamiliar } from "../../shouldFire";
import { CustomCallback } from "../private/CustomCallback";

export class PostFamiliarInitLate extends CustomCallback<ModCallbackCustom.POST_FAMILIAR_INIT_LATE> {
  public override v = {
    room: {
      firedSet: new Set<PtrHash>(),
    },
  };

  constructor() {
    super();

    this.callbacksUsed = [
      // 6
      [ModCallback.POST_FAMILIAR_UPDATE, [this.postFamiliarUpdate]],
    ];
  }

  protected override shouldFire = shouldFireFamiliar;

  // ModCallback.POST_FAMILIAR_UPDATE (6)
  private postFamiliarUpdate = (familiar: EntityFamiliar): void => {
    const index = GetPtrHash(familiar);
    if (!this.v.room.firedSet.has(index)) {
      this.v.room.firedSet.add(index);
      this.fire(familiar);
    }
  };
}
