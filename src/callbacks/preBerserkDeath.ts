import { CollectibleType } from "isaac-typescript-definitions";
import { ModUpgraded } from "../classes/ModUpgraded";
import { ModCallbacksCustom } from "../enums/ModCallbacksCustom";
import { getPlayerNumHitsRemaining } from "../functions/player";
import { isChildPlayer } from "../functions/playerIndex";
import { willPlayerRevive } from "../functions/revive";
import {
  preBerserkDeathFire,
  preBerserkDeathHasSubscriptions,
} from "./subscriptions/preBerserkDeath";

/** @internal */
export function preBerserkDeathCallbackInit(mod: ModUpgraded): void {
  mod.AddCallbackCustom(
    ModCallbacksCustom.POST_PEFFECT_UPDATE_REORDERED,
    postPEffectUpdateReordered,
  );
}

function hasSubscriptions() {
  return preBerserkDeathHasSubscriptions();
}

// ModCallbacksCustom.POST_PEFFECT_UPDATE_REORDERED
function postPEffectUpdateReordered(player: EntityPlayer) {
  if (!hasSubscriptions()) {
    return;
  }

  // This callback should not trigger for the Strawman Keeper and other players that are "child"
  // players.
  if (isChildPlayer(player)) {
    return;
  }

  const effects = player.GetEffects();
  const berserkEffect = effects.GetCollectibleEffect(CollectibleType.BERSERK);
  const numHitsRemaining = getPlayerNumHitsRemaining(player);

  // If the Berserk! effect will end on the next frame and we have no hearts left
  if (
    berserkEffect !== undefined &&
    berserkEffect.Cooldown === 1 &&
    numHitsRemaining === 0 &&
    !willPlayerRevive(player)
  ) {
    preBerserkDeathFire(player);
  }
}
