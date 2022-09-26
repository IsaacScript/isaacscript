import { ModCallback } from "isaac-typescript-definitions";
import { ModCallbackCustom2 } from "../../enums/ModCallbackCustom2";
import { getDoors } from "../../functions/doors";
import { CustomCallbackDoor } from "./validation/CustomCallbackDoor";

export class PostDoorUpdate extends CustomCallbackDoor<ModCallbackCustom2.POST_DOOR_UPDATE> {
  constructor() {
    super();

    this.callbacksUsed = [[ModCallback.POST_UPDATE, [this.postUpdate]]]; // 1
  }

  // ModCallback.POST_UPDATE (1)
  private postUpdate = (): void => {
    for (const door of getDoors()) {
      this.fire(door);
    }
  };
}
