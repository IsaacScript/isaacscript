import { ModCallback } from "isaac-typescript-definitions";
import { ModCallbackCustom2 } from "../../enums/ModCallbackCustom2";
import { getPressurePlates } from "../../functions/gridEntitiesSpecific";
import { shouldFirePressurePlate } from "../../shouldFire";
import { CustomCallback } from "../private/CustomCallback";

export class PostPressurePlateUpdate extends CustomCallback<ModCallbackCustom2.POST_PRESSURE_PLATE_UPDATE> {
  constructor() {
    super();

    this.callbacksUsed = [
      [ModCallback.POST_UPDATE, [this.postUpdate]], // 1
    ];
  }

  protected override shouldFire = shouldFirePressurePlate;

  // ModCallback.POST_UPDATE (1)
  private postUpdate = (): void => {
    for (const pressurePlate of getPressurePlates()) {
      this.fire(pressurePlate);
    }
  };
}
