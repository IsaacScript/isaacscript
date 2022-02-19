import { getEnumValues } from "./util";

export function stopAllSoundEffects(): void {
  const sfxManager = SFXManager();

  for (const soundEffect of getEnumValues(SoundEffect)) {
    sfxManager.Stop(soundEffect);
  }
}
