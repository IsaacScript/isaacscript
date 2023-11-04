import { ModCallback } from "isaac-typescript-definitions";
import type { ModCallbackCustom } from "../../enums/ModCallbackCustom";
import { shouldFireBomb } from "../../shouldFire";
import { CustomCallback } from "../private/CustomCallback";

export class PreBombCollisionFilter extends CustomCallback<ModCallbackCustom.PRE_BOMB_COLLISION_FILTER> {
  constructor() {
    super();

    this.callbacksUsed = [
      // 60
      [ModCallback.PRE_BOMB_COLLISION, this.preBombCollision],
    ];
  }

  protected override shouldFire = shouldFireBomb;

  // ModCallback.PRE_BOMB_COLLISION (60)
  private readonly preBombCollision = (
    bomb: EntityBomb,
    collider: Entity,
    low: boolean,
  ): boolean | undefined => this.fire(bomb, collider, low);
}
