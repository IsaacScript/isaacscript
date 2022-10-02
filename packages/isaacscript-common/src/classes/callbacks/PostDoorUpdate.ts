import { ModCallback } from "isaac-typescript-definitions";
import { ModCallbackCustom2 } from "../../enums/ModCallbackCustom2";
import { getDoors } from "../../functions/doors";
import { shouldFireDoor } from "../../shouldFire";
import { CustomCallback } from "../private/CustomCallback";

export class PostDoorUpdate extends CustomCallback<ModCallbackCustom2.POST_DOOR_UPDATE> {
  constructor() {
    super();

    this.callbacksUsed = [[ModCallback.POST_UPDATE, [this.postUpdate]]]; // 1
  }

  protected override shouldFire = shouldFireDoor;

  // ModCallback.POST_UPDATE (1)
  private postUpdate = (): void => {
    for (const door of getDoors()) {
      this.fire(door);
    }
  };
}
