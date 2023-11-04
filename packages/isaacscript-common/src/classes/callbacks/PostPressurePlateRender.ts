import { ModCallback } from "isaac-typescript-definitions";
import type { ModCallbackCustom } from "../../enums/ModCallbackCustom";
import { getPressurePlates } from "../../functions/gridEntitiesSpecific";
import { shouldFirePressurePlate } from "../../shouldFire";
import { CustomCallback } from "../private/CustomCallback";

export class PostPressurePlateRender extends CustomCallback<ModCallbackCustom.POST_PRESSURE_PLATE_RENDER> {
  constructor() {
    super();

    this.callbacksUsed = [
      // 2
      [ModCallback.POST_RENDER, this.postRender],
    ];
  }

  protected override shouldFire = shouldFirePressurePlate;

  // ModCallback.POST_RENDER (2)
  private readonly postRender = (): void => {
    for (const pressurePlate of getPressurePlates()) {
      this.fire(pressurePlate);
    }
  };
}
