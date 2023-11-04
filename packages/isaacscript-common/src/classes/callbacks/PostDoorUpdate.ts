import { ModCallback } from "isaac-typescript-definitions";
import type { ModCallbackCustom } from "../../enums/ModCallbackCustom";
import { getDoors } from "../../functions/doors";
import { shouldFireDoor } from "../../shouldFire";
import { CustomCallback } from "../private/CustomCallback";

export class PostDoorUpdate extends CustomCallback<ModCallbackCustom.POST_DOOR_UPDATE> {
  constructor() {
    super();

    this.callbacksUsed = [
      // 1
      [ModCallback.POST_UPDATE, this.postUpdate],
    ];
  }

  protected override shouldFire = shouldFireDoor;

  // ModCallback.POST_UPDATE (1)
  private readonly postUpdate = (): void => {
    for (const door of getDoors()) {
      this.fire(door);
    }
  };
}
