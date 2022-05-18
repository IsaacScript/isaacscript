import {
  CollectibleType,
  FamiliarVariant,
  ModCallback,
  PlayerType,
  SoundEffect,
} from "isaac-typescript-definitions";
import { sfxManager } from "../cachedClasses";
import { ModUpgraded } from "../classes/ModUpgraded";
import { ModCallbackCustom } from "../enums/ModCallbackCustom";
import { runNextGameFrame } from "../features/runInNFrames";
import { saveDataManager } from "../features/saveDataManager/exports";
import { removeCollectibleFromItemTracker } from "../functions/collectibles";
import { removeAllFamiliars } from "../functions/entitySpecific";
import { log, logError } from "../functions/log";
import { isCharacter } from "../functions/player";
import { getPlayerFromIndex, getPlayerIndex } from "../functions/playerIndex";
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

  mod.AddCallback(ModCallback.POST_RENDER, postRender); // 2
  mod.AddCallback(ModCallback.POST_NEW_ROOM, postNewRoom); // 19
  mod.AddCallbackCustom(
    ModCallbackCustom.POST_PEFFECT_UPDATE_REORDERED,
    postPEffectUpdateReordered,
  );
  mod.AddCallbackCustom(
    ModCallbackCustom.POST_PLAYER_FATAL_DAMAGE,
    postPlayerFatalDamage,
  );
  mod.AddCallbackCustom(ModCallbackCustom.PRE_BERSERK_DEATH, preBerserkDeath);
}

function hasSubscriptions() {
  return (
    preCustomReviveHasSubscriptions() || postCustomReviveHasSubscriptions()
  );
}

// ModCallback.POST_RENDER (2)
function postRender() {
  if (v.run.state !== CustomReviveState.WAITING_FOR_ITEM_ANIMATION) {
    return;
  }

  // The 1-up sound will fire before the item holding animation begins, so we mute it on every
  // render frame.
  sfxManager.Stop(SoundEffect.ONE_UP);
}

// ModCallback.POST_NEW_ROOM (19)
function postNewRoom() {
  if (v.run.state !== CustomReviveState.WAITING_FOR_ROOM_TRANSITION) {
    return;
  }

  v.run.state = CustomReviveState.WAITING_FOR_ITEM_ANIMATION;
  logStateChanged();
}

// ModCallbackCustom.POST_PEFFECT_UPDATE_REORDERED
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

  const playerIndex = getPlayerIndex(player);
  if (playerIndex !== v.run.dyingPlayerIndex) {
    return;
  }

  let playerToCheckHoldingItem = player;
  if (isCharacter(player, PlayerType.THE_SOUL_B)) {
    const forgottenBody = player.GetOtherTwin();
    if (forgottenBody !== undefined) {
      playerToCheckHoldingItem = forgottenBody;
    }
  }

  if (!playerToCheckHoldingItem.IsHoldingItem()) {
    return;
  }

  // The player is now playing the animation where they hold the 1-Up item overhead. The
  // `EntityPlayer.StopExtraAnimation` method will not work to stop this animation. End-users are
  // expected to play a new animation in the PostCustomRevive callback, which will overwrite the
  // 1-Up animation.

  if (v.run.revivalType !== null) {
    postCustomReviveFire(playerToCheckHoldingItem, v.run.revivalType);
  }

  v.run.state = CustomReviveState.DISABLED;
  v.run.revivalType = null;
  v.run.dyingPlayerIndex = null;
  logStateChanged();
}

// ModCallbackCustom.POST_PLAYER_FATAL_DAMAGE
function postPlayerFatalDamage(player: EntityPlayer) {
  if (!hasSubscriptions()) {
    return;
  }

  playerIsAboutToDie(player);
}

// ModCallbackCustom.PRE_BERSERK_DEATH
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

  player.AddCollectible(CollectibleType.ONE_UP, 0, false);
  removeAllFamiliars(FamiliarVariant.ONE_UP);
  removeCollectibleFromItemTracker(CollectibleType.ONE_UP);

  // The player should always be dead one frame from now. If they are not, then something has gone
  // wrong, probably with the `isDamageToPlayerFatal` function. Since end-user code is already
  // assuming that a custom revive is occurring, explicitly kill the player.
  const playerIndex = getPlayerIndex(player);
  runNextGameFrame(() => {
    const futurePlayer = getPlayerFromIndex(playerIndex);
    if (futurePlayer === undefined) {
      return;
    }

    if (futurePlayer.IsDead()) {
      return;
    }

    logError(
      "The player is still alive after initializing a custom revive. Explicitly killing the player.",
    );
    futurePlayer.Kill();
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
