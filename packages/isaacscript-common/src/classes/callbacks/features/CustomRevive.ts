// This provides the logic for the following callbacks:
// - `PRE_CUSTOM_REVIVE`
// - `POST_CUSTOM_REVIVE`

import {
  CollectibleType,
  FamiliarVariant,
  ModCallback,
  PlayerType,
  SoundEffect,
} from "isaac-typescript-definitions";
import { sfxManager } from "../../../core/cachedClasses";
import { ModCallbackCustom } from "../../../enums/ModCallbackCustom";
import { runNextGameFrame } from "../../../features/runInNFrames";
import { removeCollectibleFromItemTracker } from "../../../functions/collectibles";
import { removeAllFamiliars } from "../../../functions/entitiesSpecific";
import { log } from "../../../functions/log";
import { logError } from "../../../functions/logMisc";
import {
  getPlayerFromIndex,
  getPlayerIndex,
} from "../../../functions/playerIndex";
import { isCharacter } from "../../../functions/players";
import { PlayerIndex } from "../../../types/PlayerIndex";
import { Feature } from "../../Feature";

const DEBUG = false as boolean;

enum CustomReviveState {
  DISABLED,

  /**
   * We can't immediately jump to waiting for an item animation because it is possible for a player
   * to be holding an item above their head as they are dying (e.g. with Razor Blade).
   */
  WAITING_FOR_ROOM_TRANSITION,

  WAITING_FOR_ITEM_ANIMATION,
}

export class CustomRevive extends Feature {
  override v = {
    run: {
      state: CustomReviveState.DISABLED,
      revivalType: null as int | null,
      dyingPlayerIndex: null as PlayerIndex | null,
    },
  };

  constructor() {
    super();

    this.callbacksUsed = [
      [ModCallback.POST_RENDER, [this.postRender]], // 2
    ];

    this.customCallbacksUsed = [
      [ModCallbackCustom.POST_NEW_ROOM_REORDERED, [this.postNewRoomReordered]],
      [
        ModCallbackCustom.POST_PEFFECT_UPDATE_REORDERED,
        [this.postPEffectUpdateReordered],
      ],
      [
        ModCallbackCustom.POST_PLAYER_FATAL_DAMAGE,
        [this.postPlayerFatalDamage],
      ],
      [ModCallbackCustom.PRE_BERSERK_DEATH, [this.preBerserkDeath]],
    ];
  }

  // ModCallback.POST_RENDER (2)
  postRender = (): void => {
    if (this.v.run.state !== CustomReviveState.WAITING_FOR_ITEM_ANIMATION) {
      return;
    }

    // The 1-up sound will fire before the item holding animation begins, so we mute it on every
    // render frame.
    sfxManager.Stop(SoundEffect.ONE_UP);
  };

  // ModCallbackCustom.POST_NEW_ROOM_REORDERED
  postNewRoomReordered = (): void => {
    if (this.v.run.state !== CustomReviveState.WAITING_FOR_ROOM_TRANSITION) {
      return;
    }

    this.v.run.state = CustomReviveState.WAITING_FOR_ITEM_ANIMATION;
    this.logStateChanged();
  };

  // ModCallbackCustom.POST_PEFFECT_UPDATE_REORDERED
  postPEffectUpdateReordered = (player: EntityPlayer): void => {
    this.checkWaitingForItemAnimation(player);
  };

  checkWaitingForItemAnimation(player: EntityPlayer): void {
    if (this.v.run.state !== CustomReviveState.WAITING_FOR_ITEM_ANIMATION) {
      return;
    }

    if (this.v.run.dyingPlayerIndex === null) {
      return;
    }

    const playerIndex = getPlayerIndex(player);
    if (playerIndex !== this.v.run.dyingPlayerIndex) {
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

    if (this.v.run.revivalType !== null) {
      // TODO
      /// postCustomReviveFire(playerToCheckHoldingItem, this.v.run.revivalType);
    }

    this.v.run.state = CustomReviveState.DISABLED;
    this.v.run.revivalType = null;
    this.v.run.dyingPlayerIndex = null;
    this.logStateChanged();
  }

  // ModCallbackCustom.POST_PLAYER_FATAL_DAMAGE
  postPlayerFatalDamage = (player: EntityPlayer): boolean | undefined => {
    this.playerIsAboutToDie(player);
    return undefined;
  };

  // ModCallbackCustom.PRE_BERSERK_DEATH
  preBerserkDeath = (player: EntityPlayer): void => {
    this.playerIsAboutToDie(player);
  };

  /**
   * The player is about to die, which will immediately delete the save data for the run. To prevent
   * this from happening, we grant the 1-Up item.
   */
  playerIsAboutToDie(player: EntityPlayer): void {
    // TODO
    const revivalType = 0;
    /*
    const revivalType = preCustomReviveFire(player);
    if (revivalType === undefined) {
      return;
    }
    */

    this.v.run.state = CustomReviveState.WAITING_FOR_ROOM_TRANSITION;
    this.v.run.revivalType = revivalType;
    this.v.run.dyingPlayerIndex = getPlayerIndex(player);
    this.logStateChanged();

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

  logStateChanged(): void {
    if (DEBUG) {
      log(
        `Custom revive state changed: ${CustomReviveState[this.v.run.state]} (${
          this.v.run.state
        })`,
      );
    }
  }
}
