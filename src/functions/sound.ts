import { sfxManager } from "../cachedClasses";
import { getEnumValues } from "./utils";

export function stopAllSoundEffects(): void {
  for (const soundEffect of getEnumValues(SoundEffect)) {
    sfxManager.Stop(soundEffect);
  }
}
