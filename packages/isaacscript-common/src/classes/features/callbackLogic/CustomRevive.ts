import {
  CollectibleType,
  FamiliarVariant,
  ModCallback,
  PlayerType,
  SoundEffect,
} from "isaac-typescript-definitions";
import { sfxManager } from "../../../core/cachedClasses";
import { ISCFeature } from "../../../enums/ISCFeature";
import { ModCallbackCustom } from "../../../enums/ModCallbackCustom";
import { removeCollectibleFromItemTracker } from "../../../functions/collectibles";
import { log } from "../../../functions/log";
import { logError } from "../../../functions/logMisc";
import {
  getPlayerFromIndex,
  getPlayerIndex,
} from "../../../functions/playerIndex";
import { isCharacter } from "../../../functions/players";
import { PlayerIndex } from "../../../types/PlayerIndex";
import { PostCustomRevive } from "../../callbacks/PostCustomRevive";
import { PreCustomRevive } from "../../callbacks/PreCustomRevive";
import { Feature } from "../../private/Feature";
import { RunInNFrames } from "../other/RunInNFrames";

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
  public override v = {
    run: {
      state: CustomReviveState.DISABLED,
      revivalType: null as int | null,
      dyingPlayerIndex: null as PlayerIndex | null,
    },
  };

  private preCustomRevive: PreCustomRevive;
  private postCustomRevive: PostCustomRevive;
  private runInNFrames: RunInNFrames;

  constructor(
    preCustomRevive: PreCustomRevive,
    postCustomRevive: PostCustomRevive,
    runInNFrames: RunInNFrames,
  ) {
    super();

    this.featuresUsed = [ISCFeature.RUN_IN_N_FRAMES];

    this.callbacksUsed = [
      // 2
      [ModCallback.POST_RENDER, this.postRender],

      // 7
      [
        ModCallback.POST_FAMILIAR_INIT,
        this.postFamiliarInitOneUp,
        [FamiliarVariant.ONE_UP],
      ],
    ];

    this.customCallbacksUsed = [
      [ModCallbackCustom.POST_NEW_ROOM_REORDERED, this.postNewRoomReordered],
      [
        ModCallbackCustom.POST_PEFFECT_UPDATE_REORDERED,
        this.postPEffectUpdateReordered,
      ],
      [ModCallbackCustom.POST_PLAYER_FATAL_DAMAGE, this.postPlayerFatalDamage],
      [ModCallbackCustom.PRE_BERSERK_DEATH, this.preBerserkDeath],
    ];

    this.preCustomRevive = preCustomRevive;
    this.postCustomRevive = postCustomRevive;
    this.runInNFrames = runInNFrames;
  }

  // ModCallback.POST_RENDER (2)
  private postRender = (): void => {
    if (this.v.run.state !== CustomReviveState.WAITING_FOR_ITEM_ANIMATION) {
      return;
    }

    // The 1-up sound will fire before the item holding animation begins, so we mute it on every
    // render frame.
    sfxManager.Stop(SoundEffect.ONE_UP);
  };

  // ModCallback.POST_FAMILIAR_INIT (7)
  // FamiliarVariant.ONE_UP (41)
  private postFamiliarInitOneUp = (familiar: EntityFamiliar): void => {
    if (this.v.run.state !== CustomReviveState.WAITING_FOR_ROOM_TRANSITION) {
      return;
    }

    familiar.Remove();
  };

  // ModCallbackCustom.POST_NEW_ROOM_REORDERED
  private postNewRoomReordered = (): void => {
    if (this.v.run.state !== CustomReviveState.WAITING_FOR_ROOM_TRANSITION) {
      return;
    }

    this.v.run.state = CustomReviveState.WAITING_FOR_ITEM_ANIMATION;
    this.logStateChanged();
  };

  // ModCallbackCustom.POST_PEFFECT_UPDATE_REORDERED
  private postPEffectUpdateReordered = (player: EntityPlayer): void => {
    this.checkWaitingForItemAnimation(player);
  };

  private checkWaitingForItemAnimation(player: EntityPlayer): void {
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
    if (isCharacter(player, PlayerType.SOUL_B)) {
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
      this.postCustomRevive.fire(
        playerToCheckHoldingItem,
        this.v.run.revivalType,
      );
    }

    this.v.run.state = CustomReviveState.DISABLED;
    this.v.run.revivalType = null;
    this.v.run.dyingPlayerIndex = null;
    this.logStateChanged();
  }

  // ModCallbackCustom.POST_PLAYER_FATAL_DAMAGE
  private postPlayerFatalDamage = (
    player: EntityPlayer,
  ): boolean | undefined => {
    this.playerIsAboutToDie(player);
    return undefined;
  };

  // ModCallbackCustom.PRE_BERSERK_DEATH
  private preBerserkDeath = (player: EntityPlayer): void => {
    this.playerIsAboutToDie(player);
  };

  /**
   * The player is about to die, which will immediately delete the save data for the run. To prevent
   * this from happening, we grant the 1-Up item.
   */
  private playerIsAboutToDie(player: EntityPlayer): void {
    const revivalType = this.preCustomRevive.fire(player);
    if (revivalType === undefined) {
      return;
    }

    this.v.run.state = CustomReviveState.WAITING_FOR_ROOM_TRANSITION;
    this.v.run.revivalType = revivalType;
    this.v.run.dyingPlayerIndex = getPlayerIndex(player);
    this.logStateChanged();

    player.AddCollectible(CollectibleType.ONE_UP, 0, false);
    removeCollectibleFromItemTracker(CollectibleType.ONE_UP);

    // The player should always be dead one frame from now. If they are not, then something has gone
    // wrong, probably with the `isDamageToPlayerFatal` function. Since end-user code is already
    // assuming that a custom revive is occurring, explicitly kill the player.
    const playerIndex = getPlayerIndex(player);
    this.runInNFrames.runNextGameFrame(() => {
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

  private logStateChanged(): void {
    if (DEBUG) {
      log(
        `Custom revive state changed: ${CustomReviveState[this.v.run.state]} (${
          this.v.run.state
        })`,
      );
    }
  }
}
