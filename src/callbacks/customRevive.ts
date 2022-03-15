import { sfxManager } from "../cachedClasses";
import { runNextGameFrame } from "../features/runInNFrames";
import { saveDataManager } from "../features/saveDataManager/exports";
import { removeCollectibleFromItemTracker } from "../functions/collectibles";
import { removeAllFamiliars } from "../functions/familiars";
import { log } from "../functions/log";
import { getPlayerFromIndex, getPlayerIndex } from "../functions/player";
import { ModCallbacksCustom } from "../types/ModCallbacksCustom";
import { ModUpgraded } from "../types/ModUpgraded";
import { PlayerIndex } from "../types/PlayerIndex";
import {
  postCustomReviveFire,
  postCustomReviveHasSubscriptions,
} from "./subscriptions/postCustomRevive";
import {
  preCustomReviveFire,
  preCustomReviveHasSubscriptions,
} from "./subscriptions/preCustomRevive";

const DEBUG = false;

enum CustomReviveState {
  DISABLED,

  /**
   * We can't immediately jump to waiting for an item animation because it is possible for a player
   * to be holding an item above their head as they are dying (e.g. with Razor Blade).
   */
  WAITING_FOR_ROOM_TRANSITION,

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

// ModCallbacks.MC_POST_RENDER (2)
function postRender() {
  if (v.run.state !== CustomReviveState.WAITING_FOR_ITEM_ANIMATION) {
    return;
  }

  // The 1-up sound will fire before the item holding animation begins,
  // so we mute it on every render frame
  sfxManager.Stop(SoundEffect.SOUND_1UP);
}

// ModCallbacks.MC_POST_NEW_ROOM (19)
function postNewRoom() {
  if (v.run.state !== CustomReviveState.WAITING_FOR_ROOM_TRANSITION) {
    return;
  }

  v.run.state = CustomReviveState.WAITING_FOR_ITEM_ANIMATION;
  logStateChanged();
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
  // The "EntityPlayer.StopExtraAnimation" method will not work to stop this animation
  // End-users are expected to play a new animation in the PostCustomRevive callback,
  // which will overwrite the 1-Up animation

  if (v.run.revivalType !== null) {
    postCustomReviveFire(playerToCheckHoldingItem, v.run.revivalType);
  }

  v.run.state = CustomReviveState.DISABLED;
  v.run.revivalType = null;
  v.run.dyingPlayerIndex = null;
  logStateChanged();
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

  v.run.state = CustomReviveState.WAITING_FOR_ROOM_TRANSITION;
  v.run.revivalType = revivalType;
  v.run.dyingPlayerIndex = getPlayerIndex(player);
  logStateChanged();

  player.AddCollectible(CollectibleType.COLLECTIBLE_1UP, 0, false);
  removeAllFamiliars(FamiliarVariant.ONE_UP);
  removeCollectibleFromItemTracker(CollectibleType.COLLECTIBLE_1UP);

  // Handle the special case of the fatal damage activating Tainted Samson's berserk state
  // In this case, the player will be invincible and can potentially not die if they are able to get
  // a new heart before the berserk stat ends
  // This is bad, because end-user code is already assuming that a custom revive is occurring
  // To work around this, immediately end the berserk state, which will kill the player and make the
  // 1-Up immediately activate
  // TODO: update this after the next vanilla patch
  const character = player.GetPlayerType();
  if (character !== PlayerType.PLAYER_SAMSON_B) {
    return;
  }
  const playerIndex = getPlayerIndex(player);
  runNextGameFrame(() => {
    const taintedSamson = getPlayerFromIndex(playerIndex);
    if (taintedSamson === undefined) {
      return;
    }

    const effects = player.GetEffects();
    const isBerserk = effects.HasCollectibleEffect(
      CollectibleType.COLLECTIBLE_BERSERK,
    );
    if (!isBerserk) {
      return;
    }

    effects.RemoveCollectibleEffect(CollectibleType.COLLECTIBLE_BERSERK, -1);

    // The familiar will show up again for some reason, so remove it again
    removeAllFamiliars(FamiliarVariant.ONE_UP);
  });
}

function logStateChanged() {
  if (DEBUG) {
    log(
      `Custom revive state changed: ${CustomReviveState[v.run.state]} (${
        v.run.state
      })`,
    );
  }
}
