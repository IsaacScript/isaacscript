import { ModCallback } from "isaac-typescript-definitions";
import { ModCallbackCustom2 } from "../../enums/ModCallbackCustom2";
import { getDoors } from "../../functions/doors";
import { CustomCallbackDoor } from "./validation/CustomCallbackDoor";

export class PostDoorRender extends CustomCallbackDoor<ModCallbackCustom2.POST_DOOR_RENDER> {
  constructor() {
    super();

    this.callbacksUsed = [[ModCallback.POST_RENDER, [this.postRender]]]; // 2
  }

  // ModCallback.POST_RENDER (2)
  postRender = (): void => {
    for (const door of getDoors()) {
      this.fire(door);
    }
  };
}
