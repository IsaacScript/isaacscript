import { EMPTY_PNG_PATH, VectorZero } from "../core/constants";
import { copyColor } from "./color";
import { kColorEquals } from "./kColor";
import { eRange } from "./utils";

/**
 * Helper function to clear all layers or specific layers from a sprite without unloading the
 * attached anm2 file.
 *
 * This function is variadic, which means you can pass as many layer IDs as you want to clear. If no
 * specific layers are passed, the function will clear every layer.
 *
 * If you want to clear all of the layers of a sprite and don't care about unloading the attached
 * anm2 file, then use the `Sprite.Reset` method instead.
 *
 * Since there is no official API method to clear specific layers from a sprite, we work around it
 * by setting the spritesheet to a transparent PNG file corresponding to the `EMPTY_PNG_PATH`
 * constant.
 *
 * This function will still work identically if PNG file does not exist, but it will cause a
 * spurious error to appear in the "log.txt" file. If silencing these errors is desired, you can
 * create a transparent 1 pixel PNG file in your mod's resources folder at `EMPTY_PNG_PATH`.
 *
 * @allowEmptyVariadic
 */
export function clearSprite(sprite: Sprite, ...layerIDs: readonly int[]): void {
  if (layerIDs.length === 0) {
    const numLayers = sprite.GetLayerCount();
    layerIDs = eRange(numLayers);
  }

  for (const layerID of layerIDs) {
    sprite.ReplaceSpritesheet(layerID, EMPTY_PNG_PATH);
  }

  sprite.LoadGraphics();
}

/**
 * Helper function that returns the number of the final frame in a particular animation for a
 * sprite. By default, it will use the currently playing animation, but you can also specify a
 * specific animation to check.
 *
 * Note that this function is bugged with the Stop Watch or the Broken Watch, since using the
 * `Sprite.SetFrame` method will reset the internal accumulator used to slow down the playback speed
 * of the animation. (The `PlaybackSpeed` field of the sprite is not used.) Thus, it is only safe to
 * use this function on animations that are not slowed down by Stop Watch or Broken Watch, such as
 * player animations.
 */
export function getLastFrameOfAnimation(
  sprite: Sprite,
  animation?: string,
): int {
  // Record the current sprite status.
  const currentAnimation = sprite.GetAnimation();
  const currentFrame = sprite.GetFrame();

  // Get the final frame.
  if (animation !== undefined && animation !== currentAnimation) {
    sprite.SetAnimation(animation);
  }
  sprite.SetLastFrame();
  const finalFrame = sprite.GetFrame();

  // Set the sprite back to the way it was.
  if (animation !== undefined && animation !== currentAnimation) {
    sprite.Play(currentAnimation, true);
  }
  sprite.SetFrame(currentFrame);

  return finalFrame;
}

/**
 * Helper function to load a new sprite and play its default animation.
 *
 * @param anm2Path The path to the "anm2" file that should be loaded.
 * @param pngPath Optional. The path to a custom PNG file that should be loaded on layer 0 of the
 *                sprite.
 */
export function newSprite(anm2Path: string, pngPath?: string): Sprite {
  const sprite = Sprite();

  if (pngPath === undefined) {
    sprite.Load(anm2Path, true);
  } else {
    sprite.Load(anm2Path, false);
    sprite.ReplaceSpritesheet(0, pngPath);
    sprite.LoadGraphics();
  }

  const defaultAnimation = sprite.GetDefaultAnimation();
  sprite.Play(defaultAnimation, true);

  return sprite;
}

/**
 * Helper function to keep a sprite's color the same values as it already is but set the opacity to
 * a specific value.
 *
 * @param sprite The sprite to set.
 * @param alpha A value between 0 and 1 that represents the fade amount.
 */
export function setSpriteOpacity(sprite: Sprite, alpha: float): void {
  const fadedColor = copyColor(sprite.Color);
  fadedColor.A = alpha;
  sprite.Color = fadedColor;
}

/**
 * Helper function to check if two sprite layers have the same sprite sheet by using the
 * `Sprite.GetTexel` method.
 *
 * Since checking every single texel in the entire sprite is very expensive, this function requires
 * that you provide a range of specific texels to check.
 */
export function spriteEquals(
  sprite1: Sprite,
  sprite2: Sprite,
  layerID: int,
  xStart: int,
  xFinish: int,
  xIncrement: int,
  yStart: int,
  yFinish: int,
  yIncrement: int,
): boolean {
  // Iterate over N texels, checking for equality at each step. The center of the sprite is equal to
  // the "pivot" point in the anm2 file.
  for (let x = xStart; x <= xFinish; x += xIncrement) {
    for (let y = yStart; y <= yFinish; y += yIncrement) {
      const position = Vector(x, y);
      if (!texelEquals(sprite1, sprite2, position, layerID)) {
        return false;
      }
    }
  }

  return true;
}

/** Helper function to check if two texels on a sprite are equivalent to each other. */
export function texelEquals(
  sprite1: Sprite,
  sprite2: Sprite,
  position: Vector,
  layerID: int,
): boolean {
  const kColor1 = sprite1.GetTexel(position, VectorZero, 1, layerID);
  const kColor2 = sprite2.GetTexel(position, VectorZero, 1, layerID);
  return kColorEquals(kColor1, kColor2);
}
