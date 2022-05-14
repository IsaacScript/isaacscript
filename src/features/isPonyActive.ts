// Detecting whether or not A Pony or White Pony is active is difficult with the vanilla API.
// Normally, activation will cause the player to have the respective temporary collectible effect
// However, this effect is lost if the player enters a new room (but the effect will still be
// active). When the effect is active, the player will have some specific entity flags. Thus, we can
// work around the problem by checking to see if the player has these entity flags and has had a
// collectible effect on a previous frame.

import { CollectibleType, EntityFlag } from "isaac-typescript-definitions";
import { ModUpgraded } from "../classes/ModUpgraded";
import { ModCallbacksCustom } from "../enums/ModCallbacksCustom";
import { errorIfFeaturesNotInitialized } from "../featuresInitialized";
import { hasFlag } from "../functions/flag";
import {
  setAddPlayer,
  setDeletePlayer,
  setHasPlayer,
} from "../functions/playerDataStructures";
import { PlayerIndex } from "../types/PlayerIndex";
import { saveDataManager } from "./saveDataManager/exports";

const FEATURE_NAME = "pony activation detector";

const FLAGS_WHEN_PONY_IS_ACTIVE: readonly EntityFlag[] = [
  EntityFlag.NO_KNOCKBACK, // 1 << 26
  EntityFlag.NO_PHYSICS_KNOCKBACK, // 1 << 30
  EntityFlag.NO_DAMAGE_BLINK, // 1 << 36
];

const v = {
  run: {
    playersIsPonyActive: new Set<PlayerIndex>(),
  },
};

/** @internal */
export function isPonyActiveInit(mod: ModUpgraded): void {
  saveDataManager("isPonyActive", v);

  mod.AddCallbackCustom(
    ModCallbacksCustom.POST_PEFFECT_UPDATE_REORDERED,
    postPEffectUpdateReordered,
  );
}

// ModCallbacksCustom.POST_PEFFECT_UPDATE_REORDERED
function postPEffectUpdateReordered(player: EntityPlayer) {
  const effects = player.GetEffects();
  const entityFlags = player.GetEntityFlags();
  const hasPonyCollectibleEffect =
    effects.HasCollectibleEffect(CollectibleType.PONY) ||
    effects.HasCollectibleEffect(CollectibleType.WHITE_PONY);
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
 * Helper function to see if the player is under the effects of A Pony or White Pony charge.
 * Detecting this is difficult, as the temporary effect will disappear upon entering a new room.
 */
export function isPonyActive(player: EntityPlayer): boolean {
  errorIfFeaturesNotInitialized(FEATURE_NAME);
  return setHasPlayer(v.run.playersIsPonyActive, player);
}
