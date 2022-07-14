import { ModUpgraded } from "./classes/ModUpgraded";
import { characterHealthConversionInit } from "./features/characterHealthConversion";
import { characterStatsInit } from "./features/characterStats";
import { collectibleItemPoolTypeInit } from "./features/collectibleItemPoolType";
import { customGridEntityInit } from "./features/customGridEntity";
import { customStageInit } from "./features/customStage/init";
import { deployJSONRoomInit } from "./features/deployJSONRoom";
import { disableAllSoundInit } from "./features/disableAllSound";
import { disableInputsInit } from "./features/disableInputs";
import { fadeInRemoverInit } from "./features/fadeInRemover";
import { fastResetInit } from "./features/fastReset";
import { forgottenSwitchInit } from "./features/forgottenSwitch";
import { persistentEntitiesInit } from "./features/persistentEntities";
import { playerInventoryInit } from "./features/playerInventory";
import { ponyDetectionInit } from "./features/ponyDetection";
import { preventCollectibleRotationInit } from "./features/preventCollectibleRotation";
import { registerHotkeyInit } from "./features/registerHotkey";
import { roomClearFrameInit } from "./features/roomClearFrame";
import { runInNFramesInit } from "./features/runInNFrames";
import { runNextRoomInit } from "./features/runNextRoom";
import { sirenHelpersInit } from "./features/sirenHelpers";
import { stageHistoryInit } from "./features/stageHistory";
import { taintedLazarusPlayersInit } from "./features/taintedLazarusPlayers";

export function initFeaturesMajor(mod: ModUpgraded): void {
  customStageInit(mod);
  deployJSONRoomInit(mod);
  runInNFramesInit(mod);
  characterStatsInit(mod);
  characterHealthConversionInit(mod);
  customGridEntityInit(mod);
}

export function initFeaturesMinor(mod: ModUpgraded): void {
  disableAllSoundInit(mod);
  disableInputsInit(mod);
  fadeInRemoverInit(mod);
  fastResetInit(mod);
  forgottenSwitchInit(mod);
  collectibleItemPoolTypeInit(mod);
  persistentEntitiesInit(mod);
  playerInventoryInit(mod);
  ponyDetectionInit(mod);
  preventCollectibleRotationInit(mod);
  registerHotkeyInit(mod);
  roomClearFrameInit(mod);
  runNextRoomInit(mod);
  sirenHelpersInit(mod);
  stageHistoryInit(mod);
  taintedLazarusPlayersInit(mod);
}
