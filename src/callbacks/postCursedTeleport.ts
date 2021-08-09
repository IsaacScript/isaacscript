import { saveDataManager } from "../features/saveDataManager";
import { hasFlag } from "../functions/flag";
import {
  getPlayerIndex,
  getPlayerNumAllHearts,
  PlayerIndex,
} from "../functions/player";
import * as postCursedTeleport from "./subscriptions/postCursedTeleport";

const v = {
  run: {
    damageFrameMap: new LuaTable<PlayerIndex, int>(),
  },

  level: {
    numSacrifices: 0,
  },
};

export function init(mod: Mod): void {
  saveDataManager("postCursedEyeActivationCallback", v, hasSubscriptions);

  mod.AddCallback(
    ModCallbacks.MC_ENTITY_TAKE_DMG,
    entityTakeDmgPlayer,
    EntityType.ENTITY_PLAYER,
  ); // 11

  mod.AddCallback(
    ModCallbacks.MC_POST_PLAYER_RENDER,
    postPlayerRenderPlayer,
    PlayerVariant.PLAYER, // Co-op babies cannot perform Cursed Eye teleports
  ); // 32
}

function hasSubscriptions() {
  return postCursedTeleport.hasSubscriptions();
}

// ModCallbacks.MC_ENTITY_TAKE_DMG (11)
// EntityType.ENTITY_PLAYER (1)
function entityTakeDmgPlayer(
  tookDamage: Entity,
  _damageAmount: float,
  damageFlags: int,
  _damageSource: EntityRef,
  _damageCountdownFrames: int,
) {
  if (!hasSubscriptions()) {
    return;
  }

  incrementNumSacrifices(damageFlags); // Has to be before setting the damage frame
  setDamageFrame(tookDamage, damageFlags);
}

function setDamageFrame(tookDamage: Entity, damageFlags: int) {
  const game = Game();
  const gameFrameCount = game.GetFrameCount();
  const room = game.GetRoom();
  const roomType = room.GetType();
  const isSpikeDamage = hasFlag(damageFlags, DamageFlag.DAMAGE_SPIKES);
  const player = tookDamage.ToPlayer();
  if (player === null) {
    return;
  }
  const playerIndex = getPlayerIndex(player);

  // Don't record the frame if we are potentially going to the Angel Room or the Dark Room from a
  // Sacrifice Room
  if (
    roomType === RoomType.ROOM_SACRIFICE &&
    isSpikeDamage &&
    (v.level.numSacrifices === 6 || v.level.numSacrifices >= 12)
  ) {
    return;
  }

  v.run.damageFrameMap.set(playerIndex, gameFrameCount);
}

function incrementNumSacrifices(damageFlags: int) {
  const game = Game();
  const room = game.GetRoom();
  const roomType = room.GetType();
  const isSpikeDamage = hasFlag(damageFlags, DamageFlag.DAMAGE_SPIKES);

  if (roomType === RoomType.ROOM_SACRIFICE && isSpikeDamage) {
    v.level.numSacrifices += 1;
  }
}

// ModCallbacks.MC_POST_PLAYER_RENDER (32)
// PlayerVariant.PLAYER (0)
function postPlayerRenderPlayer(player: EntityPlayer) {
  if (!hasSubscriptions()) {
    return;
  }

  if (playerIsTeleportingFromCursedTeleport(player)) {
    postCursedTeleport.fire(player);
  }
}

function playerIsTeleportingFromCursedTeleport(player: EntityPlayer) {
  const game = Game();
  const gameFrameCount = game.GetFrameCount();
  const playerIndex = getPlayerIndex(player);
  const lastDamageFrame = v.run.damageFrameMap.get(playerIndex);
  const sprite = player.GetSprite();

  if (lastDamageFrame !== gameFrameCount || !sprite.IsPlaying("TeleportUp")) {
    return false;
  }

  // Cursed Eye
  if (player.HasCollectible(CollectibleType.COLLECTIBLE_CURSED_EYE)) {
    return true;
  }

  // Cursed Skull
  const numHitsLeft = getPlayerNumAllHearts(player);
  if (
    player.HasTrinket(TrinketType.TRINKET_CURSED_SKULL) &&
    numHitsLeft === 1
  ) {
    return true;
  }

  return false;
}
