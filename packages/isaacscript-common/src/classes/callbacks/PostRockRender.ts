import { ModCallback } from "isaac-typescript-definitions";
import { ModCallbackCustom } from "../../enums/ModCallbackCustom";
import { getRocks } from "../../functions/gridEntitiesSpecific";
import { shouldFireRock } from "../../shouldFire";
import { CustomCallback } from "../private/CustomCallback";

export class PostRockRender extends CustomCallback<ModCallbackCustom.POST_ROCK_RENDER> {
  constructor() {
    super();

    this.callbacksUsed = [
      [ModCallback.POST_RENDER, [this.postRender]], // 2
    ];
  }

  protected override shouldFire = shouldFireRock;

  // ModCallback.POST_RENDER (2)
  private postRender = (): void => {
    for (const rock of getRocks()) {
      this.fire(rock);
    }
  };
}
