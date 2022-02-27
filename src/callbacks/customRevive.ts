import { saveDataManager } from "../features/saveDataManager/exports";
import { removeCollectibleFromItemTracker } from "../functions/collectibles";
import { removeAllFamiliars } from "../functions/familiars";
import { getPlayerIndex, PlayerIndex } from "../functions/player";
import { ModCallbacksCustom } from "../types/ModCallbacksCustom";
import { ModUpgraded } from "../types/ModUpgraded";
import {
  postCustomReviveFire,
  postCustomReviveHasSubscriptions,
} from "./subscriptions/postCustomRevive";
import {
  preCustomReviveFire,
  preCustomReviveHasSubscriptions,
} from "./subscriptions/preCustomRevive";

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

/** @internal */
export function customReviveCallbacksInit(mod: ModUpgraded): void {
  saveDataManager("customRevive", v, hasSubscriptions);

  mod.AddCallback(ModCallbacks.MC_POST_RENDER, postRender); // 2
  mod.AddCallback(ModCallbacks.MC_POST_NEW_ROOM, postNewRoom); // 19

  mod.AddCallbackCustom(
    ModCallbacksCustom.MC_POST_PEFFECT_UPDATE_REORDERED,
    postPEffectUpdateReordered,
  );

  mod.AddCallbackCustom(
    ModCallbacksCustom.MC_POST_PLAYER_FATAL_DAMAGE,
    postPlayerFatalDamage,
  );

  mod.AddCallbackCustom(
    ModCallbacksCustom.MC_PRE_BERSERK_DEATH,
    preBerserkDeath,
  );
}

function hasSubscriptions() {
  return (
    preCustomReviveHasSubscriptions() || postCustomReviveHasSubscriptions()
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

// ModCallbacksCustom.MC_POST_PEFFECT_UPDATE_REORDERED
function postPEffectUpdateReordered(player: EntityPlayer) {
  checkWaitingForItemAnimation(player);
}

function checkWaitingForItemAnimation(player: EntityPlayer) {
  if (v.run.state !== CustomReviveState.WAITING_FOR_ITEM_ANIMATION) {
    return;
  }

  if (v.run.dyingPlayerIndex === null) {
    return;
  }

  const character = player.GetPlayerType();
  const playerIndex = getPlayerIndex(player);

  if (playerIndex !== v.run.dyingPlayerIndex) {
    return;
  }

  let playerToCheckHoldingItem = player;
  if (character === PlayerType.PLAYER_THESOUL_B) {
    const forgottenBody = player.GetOtherTwin();
    if (forgottenBody !== undefined) {
      playerToCheckHoldingItem = forgottenBody;
    }
  }

  if (!playerToCheckHoldingItem.IsHoldingItem()) {
    return;
  }

  // The player is now playing the animation where they hold the 1-Up item overhead
  // The "StopExtraAnimation()" method will not work to stop this animation
  // End-users are expected to play a new animation in the PostCustomRevive callback,
  // which will overwrite the 1-Up animation

  if (v.run.revivalType !== null) {
    postCustomReviveFire(playerToCheckHoldingItem, v.run.revivalType);
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

  playerIsAboutToDie(player);
}

// ModCallbacksCustom.MC_PRE_BERSERK_DEATH
function preBerserkDeath(player: EntityPlayer) {
  if (!hasSubscriptions()) {
    return;
  }

  playerIsAboutToDie(player);
}

/**
 * The player is about to die, which will immediately delete the save data for the run. To prevent
 * this from happening, we grant the 1-Up item.
 */
function playerIsAboutToDie(player: EntityPlayer) {
  const revivalType = preCustomReviveFire(player);
  if (revivalType === undefined) {
    return;
  }

  v.run.state = CustomReviveState.CHANGING_ROOMS;
  v.run.revivalType = revivalType;
  v.run.dyingPlayerIndex = getPlayerIndex(player);

  player.AddCollectible(CollectibleType.COLLECTIBLE_1UP, 0, false);
  removeAllFamiliars(FamiliarVariant.ONE_UP);
  removeCollectibleFromItemTracker(CollectibleType.COLLECTIBLE_1UP);
}
