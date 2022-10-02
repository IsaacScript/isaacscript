import { ModCallback } from "isaac-typescript-definitions";
import { ModCallbackCustom2 } from "../../enums/ModCallbackCustom2";
import { getRocks } from "../../functions/gridEntitiesSpecific";
import { shouldFireRock } from "../../shouldFire";
import { CustomCallback } from "../private/CustomCallback";

export class PostRockUpdate extends CustomCallback<ModCallbackCustom2.POST_ROCK_UPDATE> {
  constructor() {
    super();

    this.callbacksUsed = [
      [ModCallback.POST_UPDATE, [this.postUpdate]], // 1
    ];
  }

  protected override shouldFire = shouldFireRock;

  // ModCallback.POST_UPDATE (1)
  private postUpdate = (): void => {
    for (const rock of getRocks()) {
      this.fire(rock);
    }
  };
}
