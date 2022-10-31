import { ModCallback } from "isaac-typescript-definitions";
import {
  enableDevFeatures,
  log,
  ModUpgraded,
  upgradeMod,
} from "isaacscript-common";

const MOD_NAME = "test-mod";

main();

function main() {
  const modVanilla = RegisterMod(MOD_NAME, 1);
  const mod = upgradeMod(modVanilla);
  enableDevFeatures(mod);
  addCallbacks(mod);

  log(`${MOD_NAME} initialized.`);
}

function addCallbacks(mod: ModUpgraded) {
  mod.AddCallback(ModCallback.POST_PLAYER_INIT, postPlayerInit); // 9
  mod.AddCallback(ModCallback.POST_GAME_STARTED, postGameStarted); // 15
  mod.AddCallback(ModCallback.POST_NEW_LEVEL, postNewLevel); // 18
  mod.AddCallback(ModCallback.POST_NEW_ROOM, postNewRoom); // 19
}

// ModCallback.POST_PLAYER_INIT (9)
function postPlayerInit(_player: EntityPlayer) {
  log("ModCallback.POST_PLAYER_INIT");
}

// ModCallback.POST_GAME_STARTED (15)
function postGameStarted(_isContinued: boolean) {
  log("ModCallback.POST_GAME_STARTED");
}

// ModCallback.POST_NEW_LEVEL (18)
function postNewLevel() {
  log("ModCallback.POST_NEW_LEVEL");
}

// ModCallback.POST_NEW_ROOM (19)
function postNewRoom() {
  log("ModCallback.POST_NEW_ROOM");
}
