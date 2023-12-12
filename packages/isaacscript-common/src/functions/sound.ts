import type {
  LevelStage,
  Music,
  SoundEffect,
  StageType,
} from "isaac-typescript-definitions";
import { SOUND_EFFECT_VALUES } from "../cachedEnumValues";
import { game, sfxManager } from "../core/cachedClasses";
import { STAGE_TO_MUSIC } from "../objects/stageToMusic";
import type { TranspiledEnum } from "./enums";
import { getEnumValues } from "./enums";

/**
 * Helper function to get the corresponding music value for a stage and stage type combination.
 *
 * @param stage Optional. The stage to get the music for. If not specified, the current stage will
 *              be used.
 * @param stageType Optional. The stage type to get the music for. If not specified, the current
 *                  stage type will be used.
 */
export function getMusicForStage(
  stage?: LevelStage,
  stageType?: StageType,
): Music {
  const level = game.GetLevel();

  if (stage === undefined) {
    stage = level.GetStage();
  }

  if (stageType === undefined) {
    stageType = level.GetStageType();
  }

  const stageTypeToMusic = STAGE_TO_MUSIC[stage];
  return stageTypeToMusic[stageType];
}

/**
 * Helper function to manually stop every vanilla sound effect. If you also want to stop custom
 * sound effects in addition to vanilla ones, then pass the `SoundEffectCustom` enum for your mod.
 *
 * @param soundEffectCustom Optional. The enum that represents all of the custom sound effects for
 *                          your mod.
 */
export function stopAllSoundEffects(soundEffectCustom?: TranspiledEnum): void {
  for (const soundEffect of SOUND_EFFECT_VALUES) {
    sfxManager.Stop(soundEffect);
  }

  if (soundEffectCustom !== undefined) {
    for (const soundEffect of getEnumValues(soundEffectCustom)) {
      sfxManager.Stop(soundEffect as SoundEffect);
    }
  }
}
