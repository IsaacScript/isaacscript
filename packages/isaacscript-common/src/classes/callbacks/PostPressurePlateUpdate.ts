import { ModCallback } from "isaac-typescript-definitions";
import type { ModCallbackCustom } from "../../enums/ModCallbackCustom";
import { getPressurePlates } from "../../functions/gridEntitiesSpecific";
import { shouldFirePressurePlate } from "../../shouldFire";
import { CustomCallback } from "../private/CustomCallback";

export class PostPressurePlateUpdate extends CustomCallback<ModCallbackCustom.POST_PRESSURE_PLATE_UPDATE> {
  constructor() {
    super();

    this.callbacksUsed = [
      // 1
      [ModCallback.POST_UPDATE, this.postUpdate],
    ];
  }

  protected override shouldFire = shouldFirePressurePlate;

  // ModCallback.POST_UPDATE (1)
  private readonly postUpdate = (): void => {
    for (const pressurePlate of getPressurePlates()) {
      this.fire(pressurePlate);
    }
  };
}
