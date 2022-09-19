import { ModUpgraded } from "./classes/ModUpgraded";
import { characterHealthConversionInit } from "./features/characterHealthConversion";
import { characterStatsInit } from "./features/characterStats";
import { collectibleItemPoolTypeInit } from "./features/collectibleItemPoolType";
import { customGridEntityInit } from "./features/customGridEntity";
import { customHotkeysInit } from "./features/customHotkeys";
import { customPickupInit } from "./features/customPickup";
import { customStageInit } from "./features/customStage/init";
import { customTrapdoorInit } from "./features/customTrapdoor/init";
import { deployJSONRoomInit } from "./features/deployJSONRoom";
import { disableAllSoundInit } from "./features/disableAllSound";
import { disableInputsInit } from "./features/disableInputs";
import { fadeInRemoverInit } from "./features/fadeInRemover";
import { fastResetInit } from "./features/fastReset";
import { firstLastInit } from "./features/firstLast";
import { forgottenSwitchInit } from "./features/forgottenSwitch";
import { pauseInit } from "./features/pause";
import { persistentEntitiesInit } from "./features/persistentEntities";
import { pickupIndexInit } from "./features/pickupIndex";
import { playerInventoryInit } from "./features/playerInventory";
import { ponyDetectionInit } from "./features/ponyDetection";
import { preventChildEntitiesInit } from "./features/preventChildEntities";
import { preventCollectibleRotationInit } from "./features/preventCollectibleRotation";
import { roomClearFrameInit } from "./features/roomClearFrame";
import { roomHistoryInit } from "./features/roomHistory";
import { runInNFramesInit } from "./features/runInNFrames";
import { runNextRoomInit } from "./features/runNextRoom";
import { sirenHelpersInit } from "./features/sirenHelpers";
import { stageHistoryInit } from "./features/stageHistory";
import { taintedLazarusPlayersInit } from "./features/taintedLazarusPlayers";

export function initFeatures(mod: ModUpgraded): void {
  initFeaturesMajor(mod);
  initFeaturesMinor(mod);
}

function initFeaturesMajor(mod: ModUpgraded) {
  customStageInit(mod);
  deployJSONRoomInit(mod);
  runInNFramesInit(mod);
  characterStatsInit(mod);
  characterHealthConversionInit(mod);
  customGridEntityInit(mod);
}

function initFeaturesMinor(mod: ModUpgraded) {
  customHotkeysInit(mod);
  customPickupInit(mod);
  customTrapdoorInit(mod);
  disableAllSoundInit(mod);
  disableInputsInit(mod);
  fadeInRemoverInit(mod);
  fastResetInit(mod);
  firstLastInit(mod);
  forgottenSwitchInit(mod);
  collectibleItemPoolTypeInit(mod);
  pauseInit(mod);
  persistentEntitiesInit(mod);
  pickupIndexInit(mod);
  playerInventoryInit(mod);
  ponyDetectionInit(mod);
  preventChildEntitiesInit(mod);
  preventCollectibleRotationInit(mod);
  roomClearFrameInit(mod);
  roomHistoryInit(mod);
  runNextRoomInit(mod);
  sirenHelpersInit(mod);
  stageHistoryInit(mod);
  taintedLazarusPlayersInit(mod);
}
