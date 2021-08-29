import { removeAllMatchingEntities } from "../functions/entity";
import { removeItemFromItemTracker } from "../functions/items";
import { getPlayerFromEntityPtr } from "../functions/player";
import ModCallbacksCustom from "../types/ModCallbacksCustom";
import ModUpgraded from "../types/ModUpgraded";
import * as postCustomRevive from "./subscriptions/postCustomRevive";
import * as preCustomRevive from "./subscriptions/preCustomRevive";

enum CustomReviveState {
  DISABLED,
  CHANGING_ROOMS,
  WAITING_FOR_ITEM_ANIMATION,
}

const v = {
  run: {
    state: CustomReviveState.DISABLED,
    revivalType: null as int | null,
  },

  playerPtr: null as EntityPtr | null,
};

export function init(mod: ModUpgraded): void {
  mod.AddCallback(ModCallbacks.MC_POST_RENDER, postRender); // 2

  mod.AddCallback(ModCallbacks.MC_POST_GAME_STARTED, postGameStarted); // 15

  mod.AddCallback(ModCallbacks.MC_POST_NEW_ROOM, postNewRoom); // 19

  mod.AddCallbackCustom(
    ModCallbacksCustom.MC_POST_PLAYER_UPDATE_REORDERED,
    postPlayerUpdateReordered,
  );

  mod.AddCallbackCustom(
    ModCallbacksCustom.MC_POST_PLAYER_FATAL_DAMAGE,
    postPlayerFatalDamage,
  );
}

function hasSubscriptions() {
  return (
    preCustomRevive.hasSubscriptions() || postCustomRevive.hasSubscriptions()
  );
}

// ModCallbacks.MC_POST_RENDER
function postRender() {
  if (v.run.state !== CustomReviveState.WAITING_FOR_ITEM_ANIMATION) {
    return;
  }

  // The 1-up sound will fire before the item holding animation begins,
  // so we mute it on every render frame
  const sfx = SFXManager();
  sfx.Stop(SoundEffect.SOUND_1UP);
}

// ModCallbacks.MC_POST_GAME_STARTED (15)
function postGameStarted() {
  v.playerPtr = null;
}

// ModCallbacks.MC_POST_NEW_ROOM (19)
function postNewRoom() {
  if (v.run.state !== CustomReviveState.CHANGING_ROOMS) {
    return;
  }

  v.run.state = CustomReviveState.WAITING_FOR_ITEM_ANIMATION;
}

// ModCallbacks.MC_POST_PLAYER_UPDATE (31)
function postPlayerUpdateReordered(player: EntityPlayer) {
  if (v.run.state !== CustomReviveState.WAITING_FOR_ITEM_ANIMATION) {
    return;
  }

  const playerHash = GetPtrHash(player);
  const storedPlayer = getPlayerFromEntityPtr(v.playerPtr);
  const storedPlayerHash = GetPtrHash(storedPlayer);

  if (playerHash !== storedPlayerHash) {
    return;
  }

  if (!player.IsHoldingItem()) {
    return;
  }

  // The player is now playing the animation where they hold the 1-Up item overhead
  // The "StopExtraAnimation()" method will not work to stop this animation
  // End-users are expected to play a new animation in the PostCustomRevive callback,
  // which will overwrite the 1-Up animation

  if (v.run.revivalType !== null) {
    postCustomRevive.fire(player, v.run.revivalType);
  }

  v.run.state = CustomReviveState.DISABLED;
  v.run.revivalType = null;
  v.playerPtr = null;
}

// ModCallbacksCustom.MC_POST_PLAYER_FATAL_DAMAGE
function postPlayerFatalDamage(player: EntityPlayer) {
  if (!hasSubscriptions()) {
    return;
  }

  const revivalType = preCustomRevive.fire(player);
  if (revivalType === undefined) {
    return;
  }

  v.run.state = CustomReviveState.CHANGING_ROOMS;
  v.run.revivalType = revivalType;
  v.playerPtr = EntityPtr(player);

  player.AddCollectible(CollectibleType.COLLECTIBLE_1UP, 0, false);
  removeAllMatchingEntities(EntityType.ENTITY_FAMILIAR, FamiliarVariant.ONE_UP);
  removeItemFromItemTracker(CollectibleType.COLLECTIBLE_1UP);
}
