import { ModCallback } from "isaac-typescript-definitions";
import { ModCallbackCustom2 } from "../../enums/ModCallbackCustom2";
import { CustomCallbackBomb } from "./validation/CustomCallbackBomb";

export class PostBombInitLate extends CustomCallbackBomb<ModCallbackCustom2.POST_BOMB_INIT_LATE> {
  override v = {
    room: {
      firedSet: new Set<PtrHash>(),
    },
  };

  constructor() {
    super();

    this.callbacksUsed = [
      [ModCallback.POST_BOMB_UPDATE, [this.postBombUpdate]], // 58
    ];
  }

  // ModCallback.POST_BOMB_UPDATE (58)
  postBombUpdate = (bomb: EntityBomb): void => {
    const ptrHash = GetPtrHash(bomb);
    if (!this.v.room.firedSet.has(ptrHash)) {
      this.v.room.firedSet.add(ptrHash);
      this.fire(bomb);
    }
  };
}
