import {
  DamageFlag,
  EntityType,
  ModCallback,
  RoomType,
} from "isaac-typescript-definitions";
import { game } from "../core/cachedClasses";
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

export function postSacrificeInit(mod: Mod): void {
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
  entity: Entity,
  _amount: float,
  damageFlags: BitFlags<DamageFlag>,
  _source: EntityRef,
  _countdownFrames: int,
): boolean | undefined {
  if (!hasSubscriptions()) {
    return undefined;
  }

  const player = entity.ToPlayer();
  if (player === undefined) {
    return undefined;
  }

  const room = game.GetRoom();
  const roomType = room.GetType();
  const isSpikeDamage = hasFlag(damageFlags, DamageFlag.SPIKES);

  if (roomType === RoomType.SACRIFICE && isSpikeDamage) {
    v.level.numSacrifices++;
    postSacrificeFire(player, v.level.numSacrifices);
  }

  return undefined;
}
