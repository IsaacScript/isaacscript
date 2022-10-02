import { ModCallback } from "isaac-typescript-definitions";
import { ModCallbackCustom2 } from "../../enums/ModCallbackCustom2";
import { getDoors } from "../../functions/doors";
import { shouldFireDoor } from "../../shouldFire";
import { CustomCallback } from "../private/CustomCallback";

export class PostDoorRender extends CustomCallback<ModCallbackCustom2.POST_DOOR_RENDER> {
  constructor() {
    super();

    this.callbacksUsed = [[ModCallback.POST_RENDER, [this.postRender]]]; // 2
  }

  protected override shouldFire = shouldFireDoor;

  // ModCallback.POST_RENDER (2)
  private postRender = (): void => {
    for (const door of getDoors()) {
      this.fire(door);
    }
  };
}
