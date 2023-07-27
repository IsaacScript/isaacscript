import { ModCallbackCustom } from "../../enums/ModCallbackCustom";
import { getLastFrameOfAnimation } from "../../functions/sprites";
import { getEffectiveStage } from "../../functions/stage";
import { ReadonlySet } from "../../types/ReadonlySet";
import { CustomCallback } from "../private/CustomCallback";

const TRAVELING_TO_NEXT_FLOOR_ANIMATIONS = new ReadonlySet<string>([
  "Trapdoor",
  "LightTravel",
]);

const v = {
  run: {
    firedOnStage: null as int | null,
  },
};

export class PreNewLevel extends CustomCallback<ModCallbackCustom.PRE_NEW_LEVEL> {
  public override v = v;

  constructor() {
    super();

    this.customCallbacksUsed = [
      [
        ModCallbackCustom.POST_PLAYER_RENDER_REORDERED,
        this.postPlayerRenderReordered,
      ],
    ];
  }

  // ModCallbackCustom.POST_PLAYER_RENDER_REORDERED
  private readonly postPlayerRenderReordered = (player: EntityPlayer) => {
    const effectiveStage = getEffectiveStage();
    if (effectiveStage === v.run.firedOnStage) {
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
      v.run.firedOnStage = effectiveStage;
      this.fire(player);
    }
  };
}
