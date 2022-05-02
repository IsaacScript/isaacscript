import { ModUpgraded } from "./classes/ModUpgraded";
import { characterHealthConversionInit } from "./features/characterHealthConversion";
import { characterStatsInit } from "./features/characterStats";
import { debugDisplayInit } from "./features/debugDisplay";
import { deployJSONRoomInit } from "./features/deployJSONRoom";
import { disableInputsInit } from "./features/disableInputs";
import { disableSoundsInit } from "./features/disableSound";
import { fadeInRemoverInit } from "./features/fadeInRemover";
import { fastResetInit } from "./features/fastReset";
import { forgottenSwitchInit } from "./features/forgottenSwitch";
import { getCollectibleItemPoolTypeInit } from "./features/getCollectibleItemPoolType";
import { isPonyActiveInit } from "./features/isPonyActive";
import { playerInventoryInit } from "./features/playerInventory";
import { preventCollectibleRotateInit } from "./features/preventCollectibleRotate";
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
  debugDisplayInit(mod);
  forgottenSwitchInit(mod);
  getCollectibleItemPoolTypeInit(mod);
  isPonyActiveInit(mod);
  playerInventoryInit(mod);
  preventCollectibleRotateInit(mod);
  sirenHelpersInit(mod);
  taintedLazarusPlayersInit(mod);
}
