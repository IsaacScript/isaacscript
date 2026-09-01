import { ModCallback } from "isaac-typescript-definitions";
import type { ModCallbackCustom } from "../../enums/ModCallbackCustom";
import { getPressurePlates } from "../../functions/gridEntitiesSpecific";
import { shouldFirePressurePlate } from "../../shouldFire";
import { CustomCallback } from "../private/CustomCallback";

export class PostPressurePlateRender extends CustomCallback<ModCallbackCustom.POST_PRESSURE_PLATE_RENDER> {
  // ModCallback.POST_RENDER (2)
  private readonly postRender = (): void => {
    for (const pressurePlate of getPressurePlates()) {
      this.fire(pressurePlate);
    }
  };

  protected override shouldFire = shouldFirePressurePlate;

  constructor() {
    super();

    this.callbacksUsed = [
      // 2
      [ModCallback.POST_RENDER, this.postRender],
    ];
  }
}
