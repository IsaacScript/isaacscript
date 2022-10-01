import {
  DamageFlag,
  EntityType,
  ModCallback,
  RoomType,
} from "isaac-typescript-definitions";
import { game } from "../../core/cachedClasses";
import { ModCallbackCustom2 } from "../../enums/ModCallbackCustom2";
import { hasFlag } from "../../functions/flag";
import {
  CustomCallback,
  FireArgs,
  OptionalArgs,
} from "../private/CustomCallback";

type T = ModCallbackCustom2.POST_SACRIFICE;

// We don't extend from `CustomCallbackPlayer` since there is a function type overlap with
// `ModCallbackCustom2.POST_CUSTOM_REVIVE`. (Even though that callback does not extend from
// `CustomCallbackPlayer`, including this callback's signature in the list of function signatures
// will cause it to match.)
export class PostSacrifice extends CustomCallback<T> {
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

  // eslint-disable-next-line class-methods-use-this
  protected override shouldFire(
    fireArgs: FireArgs<T>,
    optionalArgs: OptionalArgs<T>,
  ): boolean {
    const [player] = fireArgs;
    const [callbackPlayerVariant, callbackCharacter] = optionalArgs;

    if (
      callbackPlayerVariant !== undefined &&
      callbackPlayerVariant !== player.Variant
    ) {
      return false;
    }

    const character = player.GetPlayerType();

    if (callbackCharacter !== undefined && callbackCharacter !== character) {
      return false;
    }

    return true;
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
