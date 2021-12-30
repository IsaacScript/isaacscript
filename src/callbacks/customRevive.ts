import { saveDataManager } from "../features/saveDataManager/exports";
import { removeCollectibleFromItemTracker } from "../functions/collectibles";
import { removeAllFamiliars } from "../functions/entity";
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
  WAITING_FOR_BERSERK_TO_END,
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
  postPEffectUpdateReorderedWaitingForBerserkToEnd(player);
  postPEffectUpdateReorderedWaitingForItemAnimation(player);
}

function postPEffectUpdateReorderedWaitingForBerserkToEnd(
  player: EntityPlayer,
) {
  if (v.run.state !== CustomReviveState.WAITING_FOR_BERSERK_TO_END) {
    return;
  }

  if (v.run.dyingPlayerIndex === null) {
    return;
  }

  const playerIndex = getPlayerIndex(player);
  const effects = player.GetEffects();

  if (playerIndex !== v.run.dyingPlayerIndex) {
    return;
  }

  // During the Berserk! effect, the familiar cache can be updated,
  // which will make the 1-Up re-appear
  // Thus, remove all 1-Up familiars on every frame to account for this
  // (we can't defer giving the 1-Up until later because by then it will be too late and the current
  // run's data will have been deleted)
  removeAllFamiliars(FamiliarVariant.ONE_UP);

  const isBerserk = effects.HasCollectibleEffect(
    CollectibleType.COLLECTIBLE_BERSERK,
  );
  if (isBerserk) {
    return;
  }

  v.run.state = CustomReviveState.CHANGING_ROOMS;
}

function postPEffectUpdateReorderedWaitingForItemAnimation(
  player: EntityPlayer,
) {
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

  const revivalType = preCustomReviveFire(player);
  if (revivalType === undefined) {
    return;
  }

  // In the special case of the player being berserk,
  // fatal damage will not cause them to immediately die
  // In this case, send the player to an intermediary state to wait for the berserk effect to finish
  const effects = player.GetEffects();
  const isBerserk = effects.HasCollectibleEffect(
    CollectibleType.COLLECTIBLE_BERSERK,
  );
  const newState = isBerserk
    ? CustomReviveState.WAITING_FOR_BERSERK_TO_END
    : CustomReviveState.CHANGING_ROOMS;

  v.run.state = newState;
  v.run.revivalType = revivalType;
  v.run.dyingPlayerIndex = getPlayerIndex(player);

  player.AddCollectible(CollectibleType.COLLECTIBLE_1UP, 0, false);
  removeAllFamiliars(FamiliarVariant.ONE_UP);
  removeCollectibleFromItemTracker(CollectibleType.COLLECTIBLE_1UP);
}
