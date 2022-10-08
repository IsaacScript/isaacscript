import { ModCallback } from "isaac-typescript-definitions";
import { musicManager } from "../../../core/cachedClasses";
import { Exported } from "../../../decorators";
import { stopAllSoundEffects } from "../../../functions/sound";
import { Feature } from "../../private/Feature";

export class DisableAllSound extends Feature {
  /** @internal */
  public override v = {
    run: {
      disableSoundSet: new Set<string>(),
    },
  };

  private musicWasEnabled = false;

  /** @internal */
  constructor() {
    super();

    this.callbacksUsed = [
      [ModCallback.POST_RENDER, [this.postRender]], // 2
    ];
  }

  // ModCallback.POST_RENDER (2)
  private postRender = () => {
    if (this.v.run.disableSoundSet.size === 0) {
      return;
    }

    stopAllSoundEffects();
  };

  /**
   * Helper function to stop muting all sound effects and music.
   *
   * Use this function to set things back to normal after having used `disableAllSounds`.
   *
   * @param key The name of the mod feature that is requesting the enable/disable. This is needed so
   *            that multiple mod features can work in tandem.
   */
  @Exported
  public enableAllSound(key: string): void {
    if (!this.v.run.disableSoundSet.has(key)) {
      return;
    }
    this.v.run.disableSoundSet.delete(key);

    if (this.v.run.disableSoundSet.size === 0 && this.musicWasEnabled) {
      musicManager.Enable();
    }

    // Stop all sound effects that were initialized prior to enabling sounds (in case there was a
    // sound played played previously on this render frame).
    stopAllSoundEffects();
  }

  /**
   * Helper function to disable all sound effects and music (by constantly musting them).
   *
   * Use the `enableAllSounds` helper function to set things back to normal.
   *
   * @param key The name of the mod feature that is requesting the enable/disable. This is needed so
   *            that multiple mod features can work in tandem.
   */
  @Exported
  public disableAllSound(key: string): void {
    if (this.v.run.disableSoundSet.size === 0) {
      this.musicWasEnabled = musicManager.IsEnabled();
    }

    this.v.run.disableSoundSet.add(key);

    // Stop all sound effects that were initialized prior to disabling sounds.
    stopAllSoundEffects();
  }
}
