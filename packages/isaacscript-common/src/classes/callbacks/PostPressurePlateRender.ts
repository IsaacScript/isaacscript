import { ModCallback } from "isaac-typescript-definitions";
import { ModCallbackCustom } from "../../enums/ModCallbackCustom";
import { getPressurePlates } from "../../functions/gridEntitiesSpecific";
import { shouldFirePressurePlate } from "../../shouldFire";
import { CustomCallback } from "../private/CustomCallback";

export class PostPressurePlateRender extends CustomCallback<ModCallbackCustom.POST_PRESSURE_PLATE_RENDER> {
  constructor() {
    super();

    this.callbacksUsed = [
      [ModCallback.POST_RENDER, [this.postRender]], // 2
    ];
  }

  protected override shouldFire = shouldFirePressurePlate;

  // ModCallback.POST_RENDER (2)
  private postRender = (): void => {
    for (const pressurePlate of getPressurePlates()) {
      this.fire(pressurePlate);
    }
  };
}
