import { ModCallback } from "isaac-typescript-definitions";
import type { ModCallbackCustom } from "../../enums/ModCallbackCustom";
import { getRocks } from "../../functions/gridEntitiesSpecific";
import { shouldFireRock } from "../../shouldFire";
import { CustomCallback } from "../private/CustomCallback";

export class PostRockRender extends CustomCallback<ModCallbackCustom.POST_ROCK_RENDER> {
  constructor() {
    super();

    this.callbacksUsed = [
      // 2
      [ModCallback.POST_RENDER, this.postRender],
    ];
  }

  protected override shouldFire = shouldFireRock;

  // ModCallback.POST_RENDER (2)
  private readonly postRender = (): void => {
    for (const rock of getRocks()) {
      this.fire(rock);
    }
  };
}
