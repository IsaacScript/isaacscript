import { ModCallback } from "isaac-typescript-definitions";
import { ModCallbackCustom } from "../../enums/ModCallbackCustom";
import { getLastFrameOfAnimation } from "../../functions/sprites";
import { getEffectiveStage } from "../../functions/stage";
import { CustomCallback } from "../private/CustomCallback";

const TRAVELING_TO_NEXT_FLOOR_ANIMATIONS: ReadonlySet<string> = new Set([
  "Trapdoor",
  "LightTravel",
]);

export class PreNewLevel extends CustomCallback<ModCallbackCustom.PRE_NEW_LEVEL> {
  public override v = {
    run: {
      firedOnStage: null as int | null,
    },
  };

  constructor() {
    super();

    this.callbacksUsed = [
      // 32
      [ModCallback.POST_PLAYER_RENDER, this.postPlayerRender],
    ];
  }

  // ModCallback.POST_PLAYER_RENDER (32)
  private postPlayerRender = (player: EntityPlayer) => {
    const effectiveStage = getEffectiveStage();
    if (effectiveStage === this.v.run.firedOnStage) {
      return;
    }

    const sprite = player.GetSprite();
    const animation = sprite.GetAnimation();
    if (!TRAVELING_TO_NEXT_FLOOR_ANIMATIONS.has(animation)) {
      return;
    }

    // We can't use the `Sprite.IsFinished` method to detect when we are at the end of the animation
    // because the player will stop rendering at that point. Thus, revert to checking for the final
    // frame manually.
    const frame = sprite.GetFrame();
    const finalFrame = getLastFrameOfAnimation(sprite);
    if (frame === finalFrame) {
      this.v.run.firedOnStage = effectiveStage;
      this.fire(player);
    }
  };
}
