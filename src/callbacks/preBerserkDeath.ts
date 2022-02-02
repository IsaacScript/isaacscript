import { getPlayerNumAllHearts, isChildPlayer } from "../functions/player";
import { willPlayerRevive } from "../functions/revive";
import { ModCallbacksCustom } from "../types/ModCallbacksCustom";
import { ModUpgraded } from "../types/ModUpgraded";
import {
  preBerserkDeathFire,
  preBerserkDeathHasSubscriptions,
} from "./subscriptions/preBerserkDeath";

/** @internal */
export function preBerserkDeathCallbackInit(mod: ModUpgraded): void {
  mod.AddCallbackCustom(
    ModCallbacksCustom.MC_POST_PEFFECT_UPDATE_REORDERED,
    postPEffectUpdateReordered,
  );
}

function hasSubscriptions() {
  return preBerserkDeathHasSubscriptions();
}

// ModCallbacksCustom.MC_POST_PEFFECT_UPDATE_REORDERED
function postPEffectUpdateReordered(player: EntityPlayer) {
  if (!hasSubscriptions()) {
    return;
  }

  // This callback should not trigger for the Strawman Keeper and other players that are "child"
  // players
  if (isChildPlayer(player)) {
    return;
  }

  const effects = player.GetEffects();
  const berserkEffect = effects.GetCollectibleEffect(
    CollectibleType.COLLECTIBLE_BERSERK,
  );
  const playerNumAllHearts = getPlayerNumAllHearts(player);

  // If the Berserk! effect will end on the next frame and we have no hearts left
  if (
    berserkEffect !== undefined &&
    berserkEffect.Cooldown === 1 &&
    playerNumAllHearts === 0 &&
    !willPlayerRevive(player)
  ) {
    preBerserkDeathFire(player);
  }
}
