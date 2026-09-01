import { ModCallback } from "isaac-typescript-definitions";
import type { ModCallbackCustom } from "../../enums/ModCallbackCustom";
import { getDoors } from "../../functions/doors";
import { shouldFireDoor } from "../../shouldFire";
import { CustomCallback } from "../private/CustomCallback";

export class PostDoorRender extends CustomCallback<ModCallbackCustom.POST_DOOR_RENDER> {
  // ModCallback.POST_RENDER (2)
  private readonly postRender = (): void => {
    for (const door of getDoors()) {
      this.fire(door);
    }
  };

  protected override shouldFire = shouldFireDoor;

  constructor() {
    super();

    this.callbacksUsed = [
      // 2
      [ModCallback.POST_RENDER, this.postRender],
    ];
  }
}
