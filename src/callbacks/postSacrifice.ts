import { saveDataManager } from "../features/saveDataManager";
import { hasFlag } from "../functions/flag";
import * as postSacrifice from "./subscriptions/postSacrifice";

const v = {
  level: {
    numSacrifices: 0,
  },
};

export function init(mod: Mod): void {
  saveDataManager("postSacrificeCallback", v, hasSubscriptions);

  mod.AddCallback(
    ModCallbacks.MC_ENTITY_TAKE_DMG,
    entityTakeDmgPlayer,
    EntityType.ENTITY_PLAYER,
  ); // 11
}

function hasSubscriptions() {
  return postSacrifice.hasSubscriptions();
}

// ModCallbacks.MC_ENTITY_TAKE_DMG (11)
// EntityType.ENTITY_PLAYER (1)
function entityTakeDmgPlayer(
  tookDamage: Entity,
  _damageAmount: float,
  damageFlags: int,
  _damageSource: EntityRef,
  _damageCountdownFrames: int,
) {
  if (!hasSubscriptions()) {
    return;
  }

  const game = Game();
  const room = game.GetRoom();
  const roomType = room.GetType();
  const player = tookDamage.ToPlayer();

  if (player === null) {
    return;
  }

  if (roomType !== RoomType.ROOM_SACRIFICE) {
    return;
  }

  if (hasFlag(damageFlags, DamageFlag.DAMAGE_SPIKES)) {
    v.level.numSacrifices += 1;
    postSacrifice.fire(player, v.level.numSacrifices);
  }
}
