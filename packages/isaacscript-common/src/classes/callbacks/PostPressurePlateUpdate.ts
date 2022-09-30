import { ModCallback } from "isaac-typescript-definitions";
import { ModCallbackCustom2 } from "../../enums/ModCallbackCustom2";
import { getPressurePlates } from "../../functions/gridEntitiesSpecific";
import { CustomCallbackPressurePlate } from "./validation/CustomCallbackPressurePlate";

export class PostPressurePlateUpdate extends CustomCallbackPressurePlate<ModCallbackCustom2.POST_PRESSURE_PLATE_UPDATE> {
  constructor() {
    super();

    this.callbacksUsed = [
      [ModCallback.POST_UPDATE, [this.postUpdate]], // 1
    ];
  }

  // ModCallback.POST_UPDATE (1)
  private postUpdate = (): void => {
    for (const pressurePlate of getPressurePlates()) {
      this.fire(pressurePlate);
    }
  };
}
