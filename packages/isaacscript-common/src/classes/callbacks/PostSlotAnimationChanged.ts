import { ISCFeature } from "../../enums/ISCFeature";
import { ModCallbackCustom2 } from "../../enums/ModCallbackCustom2";
import { CustomCallbackSlot } from "./validation/CustomCallbackSlot";

export class PostSlotAnimationChanged extends CustomCallbackSlot<ModCallbackCustom2.POST_SLOT_ANIMATION_CHANGED> {
  constructor() {
    super();

    this.featuresUsed = [ISCFeature.SLOT_RENDER_DETECTION];
  }
}
