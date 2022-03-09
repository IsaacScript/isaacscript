// Detecting whether or not A Pony or White Pony is active is difficult with the vanilla API
// Normally, activation will cause the player to have the respective temporary collectible effect
// However, this effect is lost if the player enters a new room (but the effect will still be
// active)
// When the effect is active, the player will have some specific entity flags
// Thus, we can work around the problem by checking to see if the player has these entity flags and
// has had a collectible effect on a previous frame

import { getUpgradeErrorMsg } from "../errors";
import { hasFlag } from "../functions/flag";
import { getPlayerIndex } from "../functions/player";
import {
  setAddPlayer,
  setDeletePlayer,
  setHasPlayer,
} from "../functions/playerDataStructures";
import { PlayerIndex } from "../types/PlayerIndex";
import { saveDataManager } from "./saveDataManager/exports";

const FEATURE_NAME = "pony activation detector";

const FLAGS_WHEN_PONY_IS_ACTIVE: readonly EntityFlag[] = [
  EntityFlag.FLAG_NO_KNOCKBACK, // 1 << 26
  EntityFlag.FLAG_NO_PHYSICS_KNOCKBACK, // 1 << 30
  EntityFlag.FLAG_NO_DAMAGE_BLINK, // 1 << 36
];

let initialized = false;

const v = {
  run: {
    playersIsPonyActive: new Set<PlayerIndex>(),
  },
};

/** @internal */
export function isPonyActiveInit(mod: Mod): void {
  initialized = true;
  saveDataManager("isPonyActive", v);

  mod.AddCallback(
    ModCallbacks.MC_POST_PEFFECT_UPDATE, // 4
    postPEffectUpdate,
  );
}

// ModCallbacks.MC_POST_PEFFECT_UPDATE (4)
function postPEffectUpdate(player: EntityPlayer) {
  const effects = player.GetEffects();
  const entityFlags = player.GetEntityFlags();
  const hasPonyCollectibleEffect =
    effects.HasCollectibleEffect(CollectibleType.COLLECTIBLE_PONY) ||
    effects.HasCollectibleEffect(CollectibleType.COLLECTIBLE_WHITE_PONY);
  const isPonyActiveOnPreviousFrame = setHasPlayer(
    v.run.playersIsPonyActive,
    player,
  );
  const hasPonyFlags = hasFlag(entityFlags, ...FLAGS_WHEN_PONY_IS_ACTIVE);

  const isPonyActiveNow =
    hasPonyCollectibleEffect || (isPonyActiveOnPreviousFrame && hasPonyFlags);
  if (isPonyActiveNow) {
    setAddPlayer(v.run.playersIsPonyActive, player);
  } else {
    setDeletePlayer(v.run.playersIsPonyActive, player);
  }
}

/**
 * When used on The Forgotten, switches to The Soul. When used on The Soul, switches to The
 * Forgotten. This takes 1 game frame to take effect.
 */
export function isPonyActive(player: EntityPlayer): boolean {
  if (!initialized) {
    const msg = getUpgradeErrorMsg(FEATURE_NAME);
    error(msg);
  }

  const playerIndex = getPlayerIndex(player);
  return v.run.playersIsPonyActive.has(playerIndex);
}
