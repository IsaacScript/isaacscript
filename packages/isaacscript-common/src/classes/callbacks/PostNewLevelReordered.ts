import { ISCFeature } from "../../enums/ISCFeature";
import { ModCallbackCustom } from "../../enums/ModCallbackCustom";
import { CustomCallback } from "../private/CustomCallback";

export class PostNewLevelReordered extends CustomCallback<ModCallbackCustom.POST_NEW_LEVEL_REORDERED> {
  constructor() {
    super();

    this.featuresUsed = [ISCFeature.GAME_REORDERED_CALLBACKS];
  }
}
