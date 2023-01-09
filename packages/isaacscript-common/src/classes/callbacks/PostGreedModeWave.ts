import { ModCallback } from "isaac-typescript-definitions";
import { game } from "../../core/cachedClasses";
import { ModCallbackCustom } from "../../enums/ModCallbackCustom";
import { isGreedMode } from "../../functions/run";
import { CustomCallback } from "../private/CustomCallback";

export class PostGreedModeWave extends CustomCallback<ModCallbackCustom.POST_GREED_MODE_WAVE> {
  public override v = {
    run: {
      currentGreedWave: 0,
    },
  };

  constructor() {
    super();

    this.callbacksUsed = [
      // 1
      [ModCallback.POST_UPDATE, [this.postUpdate]],
    ];
  }

  // ModCallback.POST_UPDATE (1)
  private postUpdate = (): void => {
    if (!isGreedMode()) {
      return;
    }

    const level = game.GetLevel();
    const newWave = level.GreedModeWave;
    const oldWave = this.v.run.currentGreedWave;
    this.v.run.currentGreedWave = newWave;

    if (newWave > oldWave) {
      this.fire(oldWave, newWave);
    }
  };
}
