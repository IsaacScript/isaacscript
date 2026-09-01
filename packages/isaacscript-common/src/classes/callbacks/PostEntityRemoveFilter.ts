import { ModCallback } from "isaac-typescript-definitions";
import type { ModCallbackCustom } from "../../enums/ModCallbackCustom";
import { shouldFireEntity } from "../../shouldFire";
import { CustomCallback } from "../private/CustomCallback";

export class PostEntityRemoveFilter extends CustomCallback<ModCallbackCustom.POST_ENTITY_REMOVE_FILTER> {
  // ModCallback.POST_ENTITY_REMOVE (67)
  private readonly postEntityRemove = (entity: Entity) => {
    this.fire(entity);
  };

  protected override shouldFire = shouldFireEntity;

  constructor() {
    super();

    this.callbacksUsed = [
      // 67
      [ModCallback.POST_ENTITY_REMOVE, this.postEntityRemove],
    ];
  }
}
