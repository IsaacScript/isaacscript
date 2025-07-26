import { KnifeVariant, ModCallback } from "isaac-typescript-definitions";
import type { ModCallbackCustom } from "../../enums/ModCallbackCustom";
import { ReadonlySet } from "../../types/ReadonlySet";
import { CustomCallback } from "../private/CustomCallback";

const BONE_SWING_ANIMATIONS = new ReadonlySet<string>([
  "Swing",
  "Swing2",
  "Spin",
]);

const v = {
  room: {
    boneClubAnimations: new Map<PtrHash, string>(),
  },
};

export class PostBoneSwing extends CustomCallback<ModCallbackCustom.POST_BONE_SWING> {
  public override v = v;

  constructor() {
    super();

    this.callbacksUsed = [
      // 52
      [ModCallback.POST_KNIFE_RENDER, this.postKnifeRender],
    ];
  }

  // ModCallback.POST_KNIFE_RENDER (52)
  private readonly postKnifeRender = (knife: EntityKnife): void => {
    // The tertiary argument of the `POST_KNIFE_RENDER` callback takes sub-types instead of knife
    // variants.
    if (knife.Variant === KnifeVariant.BONE_CLUB) {
      this.postKnifeRenderBoneClub(knife);
    }
  };

  // ModCallback.POST_KNIFE_RENDER (52)
  // KnifeVariant.BONE_CLUB (1)
  private postKnifeRenderBoneClub(knife: EntityKnife): void {
    const sprite = knife.GetSprite();
    const animation = sprite.GetAnimation();
    const ptrHash = GetPtrHash(knife);

    const animationOnLastFrame = v.room.boneClubAnimations.get(ptrHash);
    v.room.boneClubAnimations.set(ptrHash, animation);

    if (
      animationOnLastFrame !== undefined
      && animation !== animationOnLastFrame
    ) {
      this.boneClubAnimationChanged(knife, animation);
    }
  }

  private boneClubAnimationChanged(
    knife: EntityKnife,
    animation: string,
  ): void {
    if (BONE_SWING_ANIMATIONS.has(animation)) {
      this.fire(knife);
    }
  }
}
