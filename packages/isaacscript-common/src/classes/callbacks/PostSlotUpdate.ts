import { ISCFeature } from "../../enums/ISCFeature";
import { ModCallbackCustom2 } from "../../enums/ModCallbackCustom2";
import { CustomCallbackSlot } from "./validation/CustomCallbackSlot";

export class PostSlotUpdate extends CustomCallbackSlot<ModCallbackCustom2.POST_SLOT_UPDATE> {
  constructor() {
    super();

    this.featuresUsed = [ISCFeature.SLOT_UPDATE_DETECTION];
  }
}
