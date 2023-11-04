import { EffectVariant, RoomShape } from "isaac-typescript-definitions";
import { game } from "../../../../core/cachedClasses";
import { LadderSubTypeCustom } from "../../../../enums/LadderSubTypeCustom";
import { getRandomArrayElement } from "../../../../functions/array";
import { spawnEffectWithSeed } from "../../../../functions/entitiesSpecific";
import { removeCharactersBefore } from "../../../../functions/string";
import type { CustomStage } from "../../../../interfaces/private/CustomStage";
import { ISAACSCRIPT_CUSTOM_STAGE_GFX_PATH } from "./constants";

type ShadowAnimation = "1x1" | "1x2" | "2x1" | "2x2";

/**
 * Normally, we would make a custom entity to represent a shadow effect, but we don't want to
 * interfere with the "entities2.xml" file in end-user mods. Thus, we must select a vanilla effect
 * to masquerade as a backdrop effect.
 *
 * We arbitrarily choose a ladder for this purpose because it will not automatically despawn after
 * time passes, like most other effects.
 */
const SHADOW_EFFECT_VARIANT = EffectVariant.LADDER;
const SHADOW_EFFECT_SUB_TYPE = LadderSubTypeCustom.CUSTOM_SHADOW;

/** The animation comes from StageAPI. */
const ROOM_SHAPE_TO_SHADOW_ANIMATION = {
  [RoomShape.SHAPE_1x1]: "1x1", // 1
  [RoomShape.IH]: "1x1", // 2
  [RoomShape.IV]: "1x1", // 3
  [RoomShape.SHAPE_1x2]: "1x2", // 4
  [RoomShape.IIV]: "1x2", // 5
  [RoomShape.SHAPE_2x1]: "2x1", // 6
  [RoomShape.IIH]: "2x1", // 7
  [RoomShape.SHAPE_2x2]: "2x2", // 8
  [RoomShape.LTL]: "2x2", // 9
  [RoomShape.LTR]: "2x2", // 10
  [RoomShape.LBL]: "2x2", // 11
  [RoomShape.LBR]: "2x2", // 12
} as const satisfies Record<RoomShape, ShadowAnimation>;

const FADED_BLACK = Color(0, 0, 0, 0.25);

export function setShadows(customStage: CustomStage): void {
  if (customStage.shadows === undefined) {
    return;
  }

  const room = game.GetRoom();
  const roomShape = room.GetRoomShape();
  const centerPos = room.GetCenterPos();
  const animation = ROOM_SHAPE_TO_SHADOW_ANIMATION[roomShape];
  const shadows = customStage.shadows[animation];
  if (shadows === undefined) {
    return;
  }

  // We spawn an effect instead of simply rendering a static sprite so that the effect will properly
  // slide in during a room transition animation. (It looks stupid if the shadow stays statically
  // rendering throughout this animation.)
  const seed = 1 as Seed;
  const shadowEffect = spawnEffectWithSeed(
    SHADOW_EFFECT_VARIANT,
    SHADOW_EFFECT_SUB_TYPE,
    centerPos,
    seed,
  );

  const sprite = shadowEffect.GetSprite();
  sprite.Load(`${ISAACSCRIPT_CUSTOM_STAGE_GFX_PATH}/stage-shadow.anm2`, false);
  const decorationSeed = room.GetDecorationSeed();
  const shadow = getRandomArrayElement(shadows, decorationSeed);
  const pngPath = removeCharactersBefore(shadow.pngPath, "gfx/");
  sprite.ReplaceSpritesheet(0, pngPath);
  sprite.LoadGraphics();
  sprite.SetFrame(animation, 0);
  sprite.Color =
    shadow.color === undefined
      ? FADED_BLACK
      : Color(shadow.color.r, shadow.color.g, shadow.color.b, shadow.color.a);
}
