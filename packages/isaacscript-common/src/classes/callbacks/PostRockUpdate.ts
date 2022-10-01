import { ModCallback } from "isaac-typescript-definitions";
import { ModCallbackCustom2 } from "../../enums/ModCallbackCustom2";
import { getRocks } from "../../functions/gridEntitiesSpecific";
import { CustomCallbackRock } from "./validation/CustomCallbackRock";

export class PostRockUpdate extends CustomCallbackRock<ModCallbackCustom2.POST_ROCK_UPDATE> {
  constructor() {
    super();

    this.callbacksUsed = [
      [ModCallback.POST_UPDATE, [this.postUpdate]], // 1
    ];
  }

  // ModCallback.POST_UPDATE (1)
  private postUpdate = (): void => {
    for (const rock of getRocks()) {
      this.fire(rock);
    }
  };
}
