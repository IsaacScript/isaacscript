import { ModCallback } from "isaac-typescript-definitions";
import { ModCallbackCustom2 } from "../../enums/ModCallbackCustom2";
import { getPressurePlates } from "../../functions/gridEntitiesSpecific";
import { CustomCallbackPressurePlate } from "./validation/CustomCallbackPressurePlate";

export class PostPressurePlateRender extends CustomCallbackPressurePlate<ModCallbackCustom2.POST_PRESSURE_PLATE_RENDER> {
  constructor() {
    super();

    this.callbacksUsed = [
      [ModCallback.POST_RENDER, [this.postRender]], // 2
    ];
  }

  // ModCallback.POST_RENDER (2)
  private postRender = (): void => {
    for (const pressurePlate of getPressurePlates()) {
      this.fire(pressurePlate);
    }
  };
}
