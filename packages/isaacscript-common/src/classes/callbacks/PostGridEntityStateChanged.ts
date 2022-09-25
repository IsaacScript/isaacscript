import { ISCFeature } from "../../enums/ISCFeature";
import { ModCallbackCustom2 } from "../../enums/ModCallbackCustom2";
import { CustomCallbackGridEntity } from "./validation/CustomCallbackGridEntity";

export class PostGridEntityStateChanged extends CustomCallbackGridEntity<ModCallbackCustom2.POST_GRID_ENTITY_STATE_CHANGED> {
  constructor() {
    super();

    this.featuresUsed = [ISCFeature.GRID_ENTITY_DETECTION];
  }
}
