/**
 * Helper function to play a sound using the correct volume (with respect to the user's volume
 * setting). Use this function over calling `SFXManager().Play()` directly because calling it
 * directly will not respect the current volume.
 */
export function playSound(soundEffect: SoundEffect | int): void {
  const sfx = SFXManager();
  sfx.Play(soundEffect, Options.SFXVolume);
}
