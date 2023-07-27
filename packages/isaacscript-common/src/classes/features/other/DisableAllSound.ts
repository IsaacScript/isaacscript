import { ModCallback } from "isaac-typescript-definitions";
import { musicManager } from "../../../core/cachedClasses";
import { Exported } from "../../../decorators";
import { stopAllSoundEffects } from "../../../functions/sound";
import { Feature } from "../../private/Feature";

const v = {
  run: {
    disableSoundSet: new Set<string>(),
  },
};

export class DisableAllSound extends Feature {
  /** @internal */
  public override v = v;

  private musicWasEnabled = false;

  /** @internal */
  constructor() {
    super();

    this.callbacksUsed = [
      // 2
      [ModCallback.POST_RENDER, this.postRender],
    ];
  }

  // ModCallback.POST_RENDER (2)
  private readonly postRender = () => {
    if (v.run.disableSoundSet.size === 0) {
      return;
    }

    stopAllSoundEffects();
  };

  /**
   * Helper function to stop muting all sound effects and music.
   *
   * Use this function to set things back to normal after having used `disableAllSounds`.
   *
   * In order to use this function, you must upgrade your mod with `ISCFeature.DISABLE_ALL_SOUND`.
   *
   * @param key The name of the mod feature that is requesting the enable/disable. For example, if
   *            this was part of the code for a custom enemy called "Super Gaper", then you could
   *            use a key of "SuperGaper". The name is necessary so that multiple mod features can
   *            work in tandem.
   */
  @Exported
  public enableAllSound(key: string): void {
    if (!v.run.disableSoundSet.has(key)) {
      return;
    }
    v.run.disableSoundSet.delete(key);

    if (v.run.disableSoundSet.size === 0 && this.musicWasEnabled) {
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
   * In order to use this function, you must upgrade your mod with `ISCFeature.DISABLE_ALL_SOUND`.
   *
   * @param key The name of the mod feature that is requesting the enable/disable. For example, if
   *            this was part of the code for a custom enemy called "Super Gaper", then you could
   *            use a key of "SuperGaper". The name is necessary so that multiple mod features can
   *            work in tandem.
   */
  @Exported
  public disableAllSound(key: string): void {
    if (v.run.disableSoundSet.size === 0) {
      this.musicWasEnabled = musicManager.IsEnabled();
    }

    v.run.disableSoundSet.add(key);

    // Stop all sound effects that were initialized prior to disabling sounds.
    stopAllSoundEffects();
  }
}
