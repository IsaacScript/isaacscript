import { SoundEffect } from "isaac-typescript-definitions";
import { sfxManager } from "../cachedClasses";
import { getEnumValues } from "./enums";

export function stopAllSoundEffects(): void {
  for (const soundEffect of getEnumValues(SoundEffect)) {
    sfxManager.Stop(soundEffect);
  }
}
