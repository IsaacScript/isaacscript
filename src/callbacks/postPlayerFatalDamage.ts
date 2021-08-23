import { getPlayerNumAllHearts } from "../functions/player";
import ModUpgraded from "../types/ModUpgraded";
import * as postPlayerFatalDamage from "./subscriptions/postPlayerFatalDamage";

export function init(mod: ModUpgraded): void {
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
  if (player === null) {
    return undefined;
  }

  // Check to see if this is fatal damage
  const playerNumAllHearts = getPlayerNumAllHearts(player);
  if (damageAmount < playerNumAllHearts) {
    return undefined;
  }

  const hearts = player.GetHearts();
  const eternalHearts = player.GetEternalHearts();
  const soulHearts = player.GetSoulHearts();
  const boneHearts = player.GetBoneHearts();
  let extraLives = player.GetExtraLives();

  // Furthermore, this will not be fatal damage if we have two different kinds of hearts
  // e.g. a bomb explosion deals 2 damage,
  // but if the player has one half soul heart and one half red heart,
  // the game will only remove the soul heart
  if (
    (hearts > 0 && soulHearts > 0) ||
    (hearts > 0 && boneHearts > 0) ||
    (soulHearts > 0 && boneHearts > 0) ||
    (soulHearts > 0 && eternalHearts > 0) ||
    boneHearts >= 2 // Two bone hearts and nothing else should not result in a death
  ) {
    return undefined;
  }

  // Having Guppy's Collar causes the extra lives to be incremented by 1,
  // but we cannot detect whether or not Guppy's Collar will actually activate,
  // so just decrement the extra lives
  if (player.HasCollectible(CollectibleType.COLLECTIBLE_GUPPYS_COLLAR)) {
    extraLives -= 1;
  }

  // Having Missing Poster does not affect the extra lives variable, so manually account for this
  if (
    player.HasTrinket(TrinketType.TRINKET_MISSING_POSTER) &&
    // Mysterious Paper has a chance to give Missing Poster on every frame
    !player.HasTrinket(TrinketType.TRINKET_MYSTERIOUS_PAPER)
  ) {
    extraLives += 1;
  }

  if (extraLives > 0) {
    return undefined;
  }

  const returnValue = postPlayerFatalDamage.fire(player);
  if (returnValue === false) {
    return false;
  }

  return undefined;
}
