/**
 * Helper function that returns the number of the final frame in a particular animation for a
 * sprite. By default, it will use the currently playing animation, but you can also specify a
 * specific animation to check.
 *
 * For example, this can be useful to know how many frames in the future that a particular dying NPC
 * will disappear.
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
