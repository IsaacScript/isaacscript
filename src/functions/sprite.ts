import { EMPTY_PNG_PATH } from "../constants";
import { range } from "./math";

/**
 * Helper function to clear a specific layer from a sprite. This function is variadic, so pass as
 * many layer IDs as you want to clear. If no specific layers are passed, it will clear every layer.
 *
 * Since there is no official API method to "clear" a sprite, we can work around it by setting the
 * spritesheet to a non-existent or completely transparent file. If the path to the spritesheet does
 * not exist, then this function might cause spurious errors to appear in the "log.txt file". To
 * silence these errors, create a transparent 1 pixel PNG file in your mod's resources folder at the
 * path corresponding to the "EMPTY_PNG_PATH" constant.
 */
export function clearSprite(sprite: Sprite, ...layerIDs: int[]): void {
  if (layerIDs.length === 0) {
    const numLayers = sprite.GetLayerCount();
    layerIDs = range(0, numLayers - 1);
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
 * `SetFrame()` method will reset the internal accumulator used to slow down the playback speed of
 * the animation. (The `PlaybackSpeed` property of the sprite is not used.) Thus, it is only safe to
 * use this function on animations that are not slowed down by Stop Watch or Broken Watch, such as
 * player animations.
 */
export function getFinalFrameOfAnimation(
  sprite: Sprite,
  animation?: string,
): int {
  // Record the current sprite status
  const currentAnimation = sprite.GetAnimation();
  const currentFrame = sprite.GetFrame();

  // Get the final frame
  if (animation !== undefined && animation !== currentAnimation) {
    sprite.SetAnimation(animation);
  }
  sprite.SetLastFrame();
  const finalFrame = sprite.GetFrame();

  // Set the sprite back to the way it was
  if (animation !== undefined && animation !== currentAnimation) {
    sprite.Play(currentAnimation, true);
  }
  sprite.SetFrame(currentFrame);

  return finalFrame;
}
