import { ModCallback } from "isaac-typescript-definitions";
import type { ModCallbackCustom } from "../../enums/ModCallbackCustom";
import { shouldFireEntity } from "../../shouldFire";
import { CustomCallback } from "../private/CustomCallback";

export class PostEntityKillFilter extends CustomCallback<ModCallbackCustom.POST_ENTITY_KILL_FILTER> {
  // ModCallback.POST_ENTITY_KILL (68)
  private readonly postEntityKill = (entity: Entity) => {
    this.fire(entity);
  };

  protected override shouldFire = shouldFireEntity;

  constructor() {
    super();

    this.callbacksUsed = [
      // 68
      [ModCallback.POST_ENTITY_KILL, this.postEntityKill],
    ];
  }
}
