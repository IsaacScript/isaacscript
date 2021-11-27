import { getPlayerNumAllHearts, hasLostCurse } from "../functions/player";
import { willPlayerRevive } from "../functions/revive";
import { ModUpgraded } from "../types/ModUpgraded";
import * as postPlayerFatalDamage from "./subscriptions/postPlayerFatalDamage";

export function postPlayerFatalDamageCallbackInit(mod: ModUpgraded): void {
  mod.AddCallback(
    ModCallbacks.MC_ENTITY_TAKE_DMG,
    entityTakeDmgPlayer,
    EntityType.ENTITY_PLAYER,
  );
}

function hasSubscriptions() {
  return postPlayerFatalDamage.hasSubscriptions();
}

// ModCallbacks.MC_ENTITY_TAKE_DMG (11)
// EntityType.ENTITY_PLAYER (1)
function entityTakeDmgPlayer(
  tookDamage: Entity,
  damageAmount: float,
  _damageFlags: int,
  _damageSource: EntityRef,
  _damageCountdownFrames: int,
): boolean | void {
  if (!hasSubscriptions()) {
    return undefined;
  }

  const player = tookDamage.ToPlayer();
  if (player === undefined) {
    return undefined;
  }

  // If we have a revival item, this will not be fatal damage
  if (willPlayerRevive(player)) {
    return undefined;
  }

  // If we are the "Lost Curse" form from touching a white fire, all damage will be fatal
  if (!damageIsFatal(player, damageAmount) && !hasLostCurse(player)) {
    return undefined;
  }

  const shouldSustainDeath = postPlayerFatalDamage.fire(player);
  if (shouldSustainDeath !== undefined) {
    return shouldSustainDeath;
  }

  return undefined;
}

/** Uses the player's current health to determine if incoming damage will be fatal. */
function damageIsFatal(player: EntityPlayer, damageAmount: int) {
  // First, handle the special case of Tainted Jacob's Lost Form
  // In this case, he may have plenty of health left, but will still die in one hit to anything
  const character = player.GetPlayerType();
  if (character === PlayerType.PLAYER_JACOB2_B) {
    return true;
  }

  const playerNumAllHearts = getPlayerNumAllHearts(player);
  if (damageAmount < playerNumAllHearts) {
    return false;
  }

  // Furthermore, this will not be fatal damage if we have two different kinds of hearts
  // e.g. a bomb explosion deals 2 damage,
  // but if the player has one half soul heart and one half red heart,
  // the game will only remove the soul heart
  const hearts = player.GetHearts();
  const eternalHearts = player.GetEternalHearts();
  const soulHearts = player.GetSoulHearts();
  const boneHearts = player.GetBoneHearts();
  if (
    (hearts > 0 && soulHearts > 0) ||
    (hearts > 0 && boneHearts > 0) ||
    (soulHearts > 0 && boneHearts > 0) ||
    (soulHearts > 0 && eternalHearts > 0) ||
    boneHearts >= 2 // Two bone hearts and nothing else should not result in a death
  ) {
    return false;
  }

  return true;
}
