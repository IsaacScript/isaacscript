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
