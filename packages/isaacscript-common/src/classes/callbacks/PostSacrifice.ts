import {
  DamageFlag,
  EntityType,
  ModCallback,
  RoomType,
} from "isaac-typescript-definitions";
import { game } from "../../core/cachedClasses";
import { ModCallbackCustom2 } from "../../enums/ModCallbackCustom2";
import { hasFlag } from "../../functions/flag";
import { CustomCallbackPlayer } from "./validation/CustomCallbackPlayer";

export class PostSacrifice extends CustomCallbackPlayer<ModCallbackCustom2.POST_SACRIFICE> {
  public override v = {
    level: {
      numSacrifices: 0,
    },
  };

  constructor() {
    super();

    this.callbacksUsed = [
      [
        ModCallback.ENTITY_TAKE_DMG,
        [this.entityTakeDmgPlayer, EntityType.PLAYER],
      ], // 11
    ];
  }

  // ModCallback.ENTITY_TAKE_DMG (11)
  // EntityType.PLAYER (1)
  private entityTakeDmgPlayer = (
    entity: Entity,
    _amount: float,
    damageFlags: BitFlags<DamageFlag>,
    _source: EntityRef,
    _countdownFrames: int,
  ): boolean | undefined => {
    const player = entity.ToPlayer();
    if (player === undefined) {
      return undefined;
    }

    const room = game.GetRoom();
    const roomType = room.GetType();
    const isSpikeDamage = hasFlag(damageFlags, DamageFlag.SPIKES);

    if (roomType === RoomType.SACRIFICE && isSpikeDamage) {
      this.v.level.numSacrifices++;
      this.fire(player, this.v.level.numSacrifices);
    }

    return undefined;
  };
}
