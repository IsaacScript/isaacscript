import { DamageFlag, RoomType } from "isaac-typescript-definitions";
import { game } from "../../core/cachedClasses";
import { ModCallbackCustom } from "../../enums/ModCallbackCustom";
import { hasFlag } from "../../functions/flag";
import { shouldFirePlayer } from "../../shouldFire";
import { CustomCallback } from "../private/CustomCallback";

const v = {
  level: {
    numSacrifices: 0,
  },
};

export class PostSacrifice extends CustomCallback<ModCallbackCustom.POST_SACRIFICE> {
  // ModCallbackCustom.ENTITY_TAKE_DMG
  private readonly entityTakeDmgPlayer = (
    player: EntityPlayer,
    _amount: float,
    damageFlags: BitFlags<DamageFlag>,
    _source: EntityRef,
    _countdownFrames: int,
  ): boolean | undefined => {
    const room = game.GetRoom();
    const roomType = room.GetType();
    const isSpikeDamage = hasFlag(damageFlags, DamageFlag.SPIKES);

    if (roomType === RoomType.SACRIFICE && isSpikeDamage) {
      v.level.numSacrifices++;
      this.fire(player, v.level.numSacrifices);
    }

    return undefined;
  };

  public override v = v;

  protected override shouldFire = shouldFirePlayer;

  constructor() {
    super();

    this.customCallbacksUsed = [
      [ModCallbackCustom.ENTITY_TAKE_DMG_PLAYER, this.entityTakeDmgPlayer],
    ];
  }
}
