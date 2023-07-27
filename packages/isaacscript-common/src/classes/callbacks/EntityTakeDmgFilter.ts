import type { DamageFlag } from "isaac-typescript-definitions";
import { ModCallback } from "isaac-typescript-definitions";
import type { ModCallbackCustom } from "../../enums/ModCallbackCustom";
import { shouldFireEntity } from "../../shouldFire";
import { CustomCallback } from "../private/CustomCallback";

export class EntityTakeDmgFilter extends CustomCallback<ModCallbackCustom.ENTITY_TAKE_DMG_FILTER> {
  constructor() {
    super();

    this.callbacksUsed = [
      // 11
      [ModCallback.ENTITY_TAKE_DMG, this.entityTakeDmg],
    ];
  }

  protected override shouldFire = shouldFireEntity;

  // ModCallback.ENTITY_TAKE_DMG (11)
  private readonly entityTakeDmg = (
    entity: Entity,
    amount: number,
    damageFlags: BitFlags<DamageFlag>,
    source: EntityRef,
    countdownFrames: number,
  ) => this.fire(entity, amount, damageFlags, source, countdownFrames);
}
