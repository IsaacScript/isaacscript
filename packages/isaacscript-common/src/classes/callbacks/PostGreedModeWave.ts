import { ModCallback } from "isaac-typescript-definitions";
import { game } from "../../core/cachedClasses";
import type { ModCallbackCustom } from "../../enums/ModCallbackCustom";
import { CustomCallback } from "../private/CustomCallback";

const v = {
  run: {
    currentGreedWave: 0,
  },
};

export class PostGreedModeWave extends CustomCallback<ModCallbackCustom.POST_GREED_MODE_WAVE> {
  public override v = v;

  constructor() {
    super();

    this.callbacksUsed = [
      // 1
      [ModCallback.POST_UPDATE, this.postUpdate],
    ];
  }

  // ModCallback.POST_UPDATE (1)
  private readonly postUpdate = (): void => {
    if (!game.IsGreedMode()) {
      return;
    }

    const level = game.GetLevel();
    const newWave = level.GreedModeWave;
    const oldWave = v.run.currentGreedWave;
    v.run.currentGreedWave = newWave;

    if (newWave > oldWave) {
      this.fire(oldWave, newWave);
    }
  };
}
