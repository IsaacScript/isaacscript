import { ModCallback } from "isaac-typescript-definitions";
import type { ModCallbackCustom } from "../../enums/ModCallbackCustom";
import { shouldFireBomb } from "../../shouldFire";
import { CustomCallback } from "../private/CustomCallback";

const v = {
  room: {
    firedSet: new Set<PtrHash>(),
  },
};

export class PostBombInitLate extends CustomCallback<ModCallbackCustom.POST_BOMB_INIT_LATE> {
  public override v = v;

  constructor() {
    super();

    this.callbacksUsed = [
      // 58
      [ModCallback.POST_BOMB_UPDATE, this.postBombUpdate],
    ];
  }

  protected override shouldFire = shouldFireBomb;

  // ModCallback.POST_BOMB_UPDATE (58)
  private readonly postBombUpdate = (bomb: EntityBomb): void => {
    const ptrHash = GetPtrHash(bomb);
    if (!v.room.firedSet.has(ptrHash)) {
      v.room.firedSet.add(ptrHash);
      this.fire(bomb);
    }
  };
}
