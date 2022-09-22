import { KnifeVariant, ModCallback } from "isaac-typescript-definitions";
import { saveDataManager } from "../features/saveDataManager/exports";
import {
  postBoneSwingFire,
  postBoneSwingHasSubscriptions,
} from "./subscriptions/postBoneSwing";

const BONE_SWING_ANIMATIONS: ReadonlySet<string> = new Set([
  "Swing",
  "Swing2",
  "Spin",
]);

const v = {
  room: {
    boneClubAnimations: new Map<PtrHash, string>(),
  },
};

export function postBoneSwingInit(mod: Mod): void {
  saveDataManager("postBoneSwing", v, hasSubscriptions);

  mod.AddCallback(ModCallback.POST_KNIFE_RENDER, postKnifeRender); // 52
}

function hasSubscriptions() {
  return postBoneSwingHasSubscriptions();
}

// ModCallback.POST_KNIFE_RENDER (52)
function postKnifeRender(knife: EntityKnife) {
  if (!hasSubscriptions()) {
    return;
  }

  // The tertiary argument of the `POST_KNIFE_RENDER` callback takes sub-types instead of knife
  // variants.
  if (knife.Variant !== KnifeVariant.BONE_CLUB) {
    return;
  }

  postKnifeRenderBoneClub(knife);
}

function postKnifeRenderBoneClub(boneClub: EntityKnife) {
  const sprite = boneClub.GetSprite();
  const animation = sprite.GetAnimation();
  const ptrHash = GetPtrHash(boneClub);
  const animationOnLastFrame = v.room.boneClubAnimations.get(ptrHash);
  v.room.boneClubAnimations.set(ptrHash, animation);

  if (
    animationOnLastFrame !== undefined &&
    animation !== animationOnLastFrame
  ) {
    boneClubAnimationChanged(boneClub, animation);
  }
}

function boneClubAnimationChanged(boneClub: EntityKnife, animation: string) {
  if (BONE_SWING_ANIMATIONS.has(animation)) {
    postBoneSwingFire(boneClub);
  }
}
