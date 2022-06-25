import { ModUpgraded } from "./classes/ModUpgraded";
import { characterHealthConversionInit } from "./features/characterHealthConversion";
import { characterStatsInit } from "./features/characterStats";
import { deployJSONRoomInit } from "./features/deployJSONRoom";
import { disableInputsInit } from "./features/disableInputs";
import { disableSoundsInit } from "./features/disableSound";
import { fadeInRemoverInit } from "./features/fadeInRemover";
import { fastResetInit } from "./features/fastReset";
import { forgottenSwitchInit } from "./features/forgottenSwitch";
import { getCollectibleItemPoolTypeInit } from "./features/getCollectibleItemPoolType";
import { getEyeFromTearInit } from "./features/getEyeFromTear";
import { persistentEntitiesInit } from "./features/persistentEntities";
import { playerInventoryInit } from "./features/playerInventory";
import { ponyDetectionInit } from "./features/ponyDetection";
import { preventCollectibleRotationInit } from "./features/preventCollectibleRotation";
import { runInNFramesInit } from "./features/runInNFrames";
import { sirenHelpersInit } from "./features/sirenHelpers";
import { taintedLazarusPlayersInit } from "./features/taintedLazarusPlayers";

export function initFeaturesMajor(mod: ModUpgraded): void {
  deployJSONRoomInit(mod);
  runInNFramesInit(mod);
  characterStatsInit(mod);
  characterHealthConversionInit(mod);
}

export function initFeaturesMinor(mod: ModUpgraded): void {
  disableInputsInit(mod);
  disableSoundsInit(mod);
  fadeInRemoverInit(mod);
  fastResetInit(mod);
  forgottenSwitchInit(mod);
  getCollectibleItemPoolTypeInit(mod);
  getEyeFromTearInit(mod);
  persistentEntitiesInit(mod);
  playerInventoryInit(mod);
  ponyDetectionInit(mod);
  preventCollectibleRotationInit(mod);
  sirenHelpersInit(mod);
  taintedLazarusPlayersInit(mod);
}
