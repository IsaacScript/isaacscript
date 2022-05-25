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

/** @internal */
export function postBoneSwingCallbackInit(mod: Mod): void {
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

  // The PostKnifeRender callback cannot be registered with knife variants for some reason.
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
