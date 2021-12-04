import { saveDataManager } from "../features/saveDataManager/exports";
import {
  getPlayerAvailableHeartSlots,
  getPlayerIndex,
  getPlayerNumAllHearts,
  hasLostCurse,
  isChildPlayer,
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

  // This callback should not trigger for co-op babies
  if (player.Variant !== PlayerVariant.PLAYER) {
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

  // If we have a revival item, this will not be fatal damage
  if (willPlayerRevive(player)) {
    return undefined;
  }

  // If we are the "Lost Curse" form from touching a white fire, all damage will be fatal
  if (
    !damageIsFatal(player, damageAmount, lastDamageFrame) &&
    !hasLostCurse(player)
  ) {
    return undefined;
  }

  const shouldSustainDeath = postPlayerFatalDamageFire(player);
  if (shouldSustainDeath !== undefined) {
    return shouldSustainDeath;
  }

  return undefined;
}

/** Uses the player's current health to determine if incoming damage will be fatal. */
function damageIsFatal(
  player: EntityPlayer,
  damageAmount: int,
  lastDamageFrame: int | undefined,
) {
  const game = Game();
  const gameFrameCount = game.GetFrameCount();

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

  // This will not be fatal damage if the player has Heartbreak and two slots open for broken hearts
  const playerAvailableHeartSlots = getPlayerAvailableHeartSlots(player);
  if (
    player.HasCollectible(CollectibleType.COLLECTIBLE_HEARTBREAK) &&
    playerAvailableHeartSlots >= 2
  ) {
    return false;
  }

  // Furthermore, this will not be fatal damage if we have Glass Cannon and this is the second time
  // we are taking damage on the same frame
  if (
    player.HasCollectible(CollectibleType.COLLECTIBLE_BROKEN_GLASS_CANNON) &&
    gameFrameCount === lastDamageFrame
  ) {
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
