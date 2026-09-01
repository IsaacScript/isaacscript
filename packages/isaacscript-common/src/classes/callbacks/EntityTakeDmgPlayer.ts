import type { DamageFlag } from "isaac-typescript-definitions";
import { EntityType, ModCallback } from "isaac-typescript-definitions";
import type { ModCallbackCustom } from "../../enums/ModCallbackCustom";
import { shouldFirePlayer } from "../../shouldFire";
import { CustomCallback } from "../private/CustomCallback";

export class EntityTakeDmgPlayer extends CustomCallback<ModCallbackCustom.ENTITY_TAKE_DMG_PLAYER> {
  // ModCallback.ENTITY_TAKE_DMG (11)
  private readonly entityTakeDmgPlayer = (
    entity: Entity,
    amount: number,
    damageFlags: BitFlags<DamageFlag>,
    source: EntityRef,
    countdownFrames: number,
  ) => {
    const player = entity.ToPlayer();
    if (player === undefined) {
      return undefined;
    }

    return this.fire(player, amount, damageFlags, source, countdownFrames);
  };

  protected override shouldFire = shouldFirePlayer;

  constructor() {
    super();

    this.callbacksUsed = [
      // 11
      [
        ModCallback.ENTITY_TAKE_DMG,
        this.entityTakeDmgPlayer,
        [EntityType.PLAYER],
      ],
    ];
  }
}
