import { saveDataManager } from "../features/saveDataManager/exports";
import { removeCollectibleFromItemTracker } from "../functions/collectibles";
import { removeAllMatchingEntities } from "../functions/entity";
import { getPlayerIndex, PlayerIndex } from "../functions/player";
import { ModCallbacksCustom } from "../types/ModCallbacksCustom";
import { ModUpgraded } from "../types/ModUpgraded";
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
    dyingPlayerIndex: null as PlayerIndex | null,
  },
};

export function customReviveCallbacksInit(mod: ModUpgraded): void {
  saveDataManager("customRevive", v, hasSubscriptions);

  mod.AddCallback(ModCallbacks.MC_POST_RENDER, postRender); // 2
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

// ModCallbacks.MC_POST_NEW_ROOM (19)
function postNewRoom() {
  if (v.run.state === CustomReviveState.CHANGING_ROOMS) {
    // We have entered the previous room after a 1-Up death
    // The player will hold the 1-Up above their head in a few frames from now
    v.run.state = CustomReviveState.WAITING_FOR_ITEM_ANIMATION;
  } else if (v.run.state === CustomReviveState.WAITING_FOR_ITEM_ANIMATION) {
    // We exited the room before the player had a chance to hold up the item
    // Cancel calling the PostCustomReive callback and reset the state
    v.run.state = CustomReviveState.DISABLED;
    v.run.revivalType = null;
    v.run.dyingPlayerIndex = null;
  }
}

// ModCallbacks.MC_POST_PLAYER_UPDATE (31)
function postPlayerUpdateReordered(player: EntityPlayer) {
  if (v.run.state !== CustomReviveState.WAITING_FOR_ITEM_ANIMATION) {
    return;
  }

  if (v.run.dyingPlayerIndex === null) {
    return;
  }

  const playerIndex = getPlayerIndex(player);
  if (playerIndex !== v.run.dyingPlayerIndex) {
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
  v.run.dyingPlayerIndex = null;
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
  v.run.dyingPlayerIndex = getPlayerIndex(player);

  player.AddCollectible(CollectibleType.COLLECTIBLE_1UP, 0, false);
  removeAllMatchingEntities(EntityType.ENTITY_FAMILIAR, FamiliarVariant.ONE_UP);
  removeCollectibleFromItemTracker(CollectibleType.COLLECTIBLE_1UP);
}
