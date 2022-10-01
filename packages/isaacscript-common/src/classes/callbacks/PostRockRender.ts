import { ModCallback } from "isaac-typescript-definitions";
import { ModCallbackCustom2 } from "../../enums/ModCallbackCustom2";
import { getRocks } from "../../functions/gridEntitiesSpecific";
import { CustomCallbackRock } from "./validation/CustomCallbackRock";

export class PostRockRender extends CustomCallbackRock<ModCallbackCustom2.POST_ROCK_RENDER> {
  constructor() {
    super();

    this.callbacksUsed = [
      [ModCallback.POST_RENDER, [this.postRender]], // 2
    ];
  }

  // ModCallback.POST_RENDER (2)
  private postRender = (): void => {
    for (const rock of getRocks()) {
      this.fire(rock);
    }
  };
}
