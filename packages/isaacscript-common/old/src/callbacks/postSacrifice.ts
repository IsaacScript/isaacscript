import {
  DamageFlag,
  EntityType,
  ModCallback,
  RoomType,
} from "isaac-typescript-definitions";
import { game } from "../cachedClasses";
import { saveDataManager } from "../features/saveDataManager/exports";
import { hasFlag } from "../functions/flag";
import {
  postSacrificeFire,
  postSacrificeHasSubscriptions,
} from "./subscriptions/postSacrifice";

const v = {
  level: {
    numSacrifices: 0,
  },
};

/** @internal */
export function postSacrificeCallbackInit(mod: Mod): void {
  saveDataManager("postSacrifice", v, hasSubscriptions);

  mod.AddCallback(
    ModCallback.ENTITY_TAKE_DMG,
    entityTakeDmgPlayer,
    EntityType.PLAYER,
  ); // 11
}

function hasSubscriptions() {
  return postSacrificeHasSubscriptions();
}

// ModCallback.ENTITY_TAKE_DMG (11)
// EntityType.PLAYER (1)
function entityTakeDmgPlayer(
  tookDamage: Entity,
  _damageAmount: float,
  damageFlags: BitFlags<DamageFlag>,
  _damageSource: EntityRef,
  _damageCountdownFrames: int,
) {
  if (!hasSubscriptions()) {
    return;
  }

  const player = tookDamage.ToPlayer();
  if (player === undefined) {
    return;
  }

  const room = game.GetRoom();
  const roomType = room.GetType();
  const isSpikeDamage = hasFlag(damageFlags, DamageFlag.SPIKES);

  if (roomType === RoomType.SACRIFICE && isSpikeDamage) {
    v.level.numSacrifices += 1;
    postSacrificeFire(player, v.level.numSacrifices);
  }
}
