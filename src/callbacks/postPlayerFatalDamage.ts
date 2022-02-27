import { saveDataManager } from "../features/saveDataManager/exports";
import { getPlayerIndex, isChildPlayer } from "../functions/player";
import { isDamageToPlayerFatal, willPlayerRevive } from "../functions/revive";
import { DefaultMap } from "../types/DefaultMap";
import { ModUpgraded } from "../types/ModUpgraded";
import { PlayerIndex } from "../types/PlayerIndex";
import {
  postPlayerFatalDamageFire,
  postPlayerFatalDamageHasSubscriptions,
} from "./subscriptions/postPlayerFatalDamage";

const v = {
  run: {
    /** Needed to detect if Glass Cannon will kill the player or not. */
    playersLastDamageGameFrame: new DefaultMap<
      PlayerIndex,
      int,
      [gameFrameCount: int]
    >((_key: PlayerIndex, gameFrameCount: int) => gameFrameCount),
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
  damageFlags: int,
  damageSource: EntityRef,
  damageCountdownFrames: int,
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
  const lastDamageGameFrame = v.run.playersLastDamageGameFrame.getAndSetDefault(
    playerIndex,
    gameFrameCount,
  );

  // If the player has a revival item such as Dead Cat, this will not be fatal damage
  if (willPlayerRevive(player)) {
    return undefined;
  }

  if (
    !isDamageToPlayerFatal(
      player,
      damageAmount,
      damageSource,
      lastDamageGameFrame,
    )
  ) {
    return undefined;
  }

  const shouldSustainDeath = postPlayerFatalDamageFire(
    player,
    damageAmount,
    damageFlags,
    damageSource,
    damageCountdownFrames,
  );
  if (shouldSustainDeath !== undefined) {
    return shouldSustainDeath;
  }

  return undefined;
}
