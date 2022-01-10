import { saveDataManager } from "../features/saveDataManager/exports";
import {
  getPlayerIndex,
  isChildPlayer,
  isDamageToPlayerFatal,
  PlayerIndex,
} from "../functions/player";
import { willPlayerRevive } from "../functions/revive";
import { ModUpgraded } from "../types/ModUpgraded";
import {
  postPlayerFatalDamageFire,
  postPlayerFatalDamageHasSubscriptions,
} from "./subscriptions/postPlayerFatalDamage";

const v = {
  run: {
    /** Needed to detect if Glass Cannon will kill the player or not. */
    playerLastDamageFrame: new Map<PlayerIndex, int>(),
  },
};

/** @internal */
export function postPlayerFatalDamageCallbackInit(mod: ModUpgraded): void {
  saveDataManager("postPlayerFatalDamage", v);

  mod.AddCallback(
    ModCallbacks.MC_ENTITY_TAKE_DMG,
    entityTakeDmgPlayer,
    EntityType.ENTITY_PLAYER,
  );
}

function hasSubscriptions() {
  return postPlayerFatalDamageHasSubscriptions();
}

// ModCallbacks.MC_ENTITY_TAKE_DMG (11)
// EntityType.ENTITY_PLAYER (1)
function entityTakeDmgPlayer(
  tookDamage: Entity,
  damageAmount: float,
  _damageFlags: int,
  damageSource: EntityRef,
  _damageCountdownFrames: int,
): boolean | void {
  if (!hasSubscriptions()) {
    return undefined;
  }

  const player = tookDamage.ToPlayer();
  if (player === undefined) {
    return undefined;
  }

  // This callback should not trigger for the Strawman Keeper and other players that are "child"
  // players
  if (isChildPlayer(player)) {
    return undefined;
  }

  const game = Game();
  const gameFrameCount = game.GetFrameCount();
  const playerIndex = getPlayerIndex(player);

  const lastDamageFrame = v.run.playerLastDamageFrame.get(playerIndex);
  v.run.playerLastDamageFrame.set(playerIndex, gameFrameCount);

  // If we have an existing revival item, this will not be fatal damage
  if (willPlayerRevive(player)) {
    return undefined;
  }

  if (
    !isDamageToPlayerFatal(player, damageAmount, damageSource, lastDamageFrame)
  ) {
    return undefined;
  }

  const shouldSustainDeath = postPlayerFatalDamageFire(player);
  if (shouldSustainDeath !== undefined) {
    return shouldSustainDeath;
  }

  return undefined;
}
