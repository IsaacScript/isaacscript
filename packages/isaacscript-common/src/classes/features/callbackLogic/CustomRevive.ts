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
import { rebirthItemTrackerRemoveCollectible } from "../../../functions/external";
import { log, logError } from "../../../functions/log";
import {
  getPlayerFromIndex,
  getPlayerIndex,
} from "../../../functions/playerIndex";
import { isCharacter } from "../../../functions/players";
import type { PlayerIndex } from "../../../types/PlayerIndex";
import type { PostCustomRevive } from "../../callbacks/PostCustomRevive";
import type { PreCustomRevive } from "../../callbacks/PreCustomRevive";
import { Feature } from "../../private/Feature";
import type { RunInNFrames } from "../other/RunInNFrames";

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

const v = {
  run: {
    state: CustomReviveState.DISABLED,
    revivalType: null as int | null,
    dyingPlayerIndex: null as PlayerIndex | null,
  },
};

export class CustomRevive extends Feature {
  public override v = v;

  private readonly preCustomRevive: PreCustomRevive;
  private readonly postCustomRevive: PostCustomRevive;
  private readonly runInNFrames: RunInNFrames;

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
  private readonly postRender = (): void => {
    if (v.run.state !== CustomReviveState.WAITING_FOR_ITEM_ANIMATION) {
      return;
    }

    // The 1-up sound will fire before the item holding animation begins, so we mute it on every
    // render frame.
    sfxManager.Stop(SoundEffect.ONE_UP);
  };

  // ModCallback.POST_FAMILIAR_INIT (7)
  // FamiliarVariant.ONE_UP (41)
  private readonly postFamiliarInitOneUp = (familiar: EntityFamiliar): void => {
    if (v.run.state !== CustomReviveState.WAITING_FOR_ROOM_TRANSITION) {
      return;
    }

    familiar.Remove();
  };

  // ModCallbackCustom.POST_NEW_ROOM_REORDERED
  private readonly postNewRoomReordered = (): void => {
    if (v.run.state !== CustomReviveState.WAITING_FOR_ROOM_TRANSITION) {
      return;
    }

    v.run.state = CustomReviveState.WAITING_FOR_ITEM_ANIMATION;
    this.logStateChanged();
  };

  // ModCallbackCustom.POST_PEFFECT_UPDATE_REORDERED
  private readonly postPEffectUpdateReordered = (
    player: EntityPlayer,
  ): void => {
    this.checkWaitingForItemAnimation(player);
  };

  private checkWaitingForItemAnimation(player: EntityPlayer): void {
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

    if (v.run.revivalType !== null) {
      this.postCustomRevive.fire(playerToCheckHoldingItem, v.run.revivalType);
    }

    v.run.state = CustomReviveState.DISABLED;
    v.run.revivalType = null;
    v.run.dyingPlayerIndex = null;
    this.logStateChanged();
  }

  // ModCallbackCustom.POST_PLAYER_FATAL_DAMAGE
  private readonly postPlayerFatalDamage = (
    player: EntityPlayer,
  ): boolean | undefined => {
    this.playerIsAboutToDie(player);
    return undefined;
  };

  // ModCallbackCustom.PRE_BERSERK_DEATH
  private readonly preBerserkDeath = (player: EntityPlayer): void => {
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

    v.run.state = CustomReviveState.WAITING_FOR_ROOM_TRANSITION;
    v.run.revivalType = revivalType;
    v.run.dyingPlayerIndex = getPlayerIndex(player);
    this.logStateChanged();

    player.AddCollectible(CollectibleType.ONE_UP, 0, false);
    rebirthItemTrackerRemoveCollectible(CollectibleType.ONE_UP);

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
        `Custom revive state changed: ${CustomReviveState[v.run.state]} (${
          v.run.state
        })`,
      );
    }
  }
}
