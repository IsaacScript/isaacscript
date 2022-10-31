import { KnifeVariant, ModCallback } from "isaac-typescript-definitions";
import { ModCallbackCustom } from "../../enums/ModCallbackCustom";
import { CustomCallback } from "../private/CustomCallback";

const BONE_SWING_ANIMATIONS: ReadonlySet<string> = new Set([
  "Swing",
  "Swing2",
  "Spin",
]);

export class PostBoneSwing extends CustomCallback<ModCallbackCustom.POST_BONE_SWING> {
  public override v = {
    room: {
      boneClubAnimations: new Map<PtrHash, string>(),
    },
  };

  constructor() {
    super();

    this.callbacksUsed = [
      [ModCallback.POST_KNIFE_RENDER, [this.postKnifeRender]], // 52
    ];
  }

  // ModCallback.POST_KNIFE_RENDER (52)
  private postKnifeRender = (knife: EntityKnife): void => {
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

    const animationOnLastFrame = this.v.room.boneClubAnimations.get(ptrHash);
    this.v.room.boneClubAnimations.set(ptrHash, animation);

    if (
      animationOnLastFrame !== undefined &&
      animation !== animationOnLastFrame
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
