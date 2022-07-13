import { EffectVariant } from "isaac-typescript-definitions";
import { game } from "../../cachedClasses";
import { getRandomArrayElement } from "../../functions/array";
import { spawnEffectWithSeed } from "../../functions/entitySpecific";
import { CustomStage } from "../../interfaces/CustomStage";

type BackdropKind = "nFloors" | "lFloors" | "walls" | "corners";

/**
 * Normally, we would make a custom entity to represent a backdrop effect, but we don't want the
 * custom stage feature to make any resource replacements. Thus, we must select a vanilla effect to
 * masquerade as a backdrop effect.
 *
 * We arbitrarily choose a ladder for this purpose because most effects will automatically despawn
 * after a short while, but the ladder effect will stay in the room forever.
 */
const BACKDROP_EFFECT_VARIANT = EffectVariant.LADDER;

export function setBackdrop(customStage: CustomStage): void {
  const room = game.GetRoom();
  const centerPos = room.GetCenterPos();
  const effect = spawnEffectWithSeed(
    BACKDROP_EFFECT_VARIANT,
    0,
    centerPos,
    1 as Seed,
  );

  const sprite = effect.GetSprite();
  const pngPath = getBackdropPNGPath(customStage, "walls"); // TODO
  sprite.ReplaceSpritesheet(0, pngPath);
}

function getBackdropPNGPath(
  customStage: CustomStage,
  backdropKind: BackdropKind,
) {
  const room = game.GetRoom();
  const decorationSeed = room.GetDecorationSeed();
  const pathArray = customStage.backdrop[backdropKind];
  const path = getRandomArrayElement(pathArray, decorationSeed);

  return customStage.backdrop.prefix + path + customStage.backdrop.suffix;
}
