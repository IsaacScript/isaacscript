import { DamageFlag, ModCallback } from "isaac-typescript-definitions";
import { ModCallbackCustom } from "../../enums/ModCallbackCustom";
import { shouldFireEntity } from "../../shouldFire";
import { CustomCallback } from "../private/CustomCallback";

export class EntityTakeDmgFilter extends CustomCallback<ModCallbackCustom.ENTITY_TAKE_DMG_FILTER> {
  constructor() {
    super();

    this.callbacksUsed = [
      // 11
      [ModCallback.ENTITY_TAKE_DMG, [this.entityTakeDmg]],
    ];
  }

  protected override shouldFire = shouldFireEntity;

  // ModCallback.ENTITY_TAKE_DMG (11)
  private entityTakeDmg = (
    entity: Entity,
    amount: number,
    damageFlags: BitFlags<DamageFlag>,
    source: EntityRef,
    countdownFrames: number,
  ) => this.fire(entity, amount, damageFlags, source, countdownFrames);
}
