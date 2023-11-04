import { ISCFeature } from "../../enums/ISCFeature";
import type { ModCallbackCustom } from "../../enums/ModCallbackCustom";
import { shouldFireRoom } from "../../shouldFire";
import { CustomCallback } from "../private/CustomCallback";

export class PostNewRoomReordered extends CustomCallback<ModCallbackCustom.POST_NEW_ROOM_REORDERED> {
  constructor() {
    super();

    this.featuresUsed = [ISCFeature.GAME_REORDERED_CALLBACKS];
  }

  protected override shouldFire = shouldFireRoom;
}
