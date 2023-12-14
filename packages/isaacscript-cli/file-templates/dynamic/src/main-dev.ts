import { Keyboard, ModCallback } from "isaac-typescript-definitions";
import {
  ISCFeature,
  log,
  setLogFunctionsGlobal,
  setTracebackFunctionsGlobal,
  upgradeMod,
} from "isaacscript-common";
import { name } from "../package.json";

export function main() {
  const modVanilla = RegisterMod(name, 1);
  const features = [
    ISCFeature.FADE_IN_REMOVER,
    ISCFeature.FAST_RESET,
    ISCFeature.CUSTOM_HOTKEYS,
    ISCFeature.SAVE_DATA_MANAGER,
  ] as const;
  const mod = upgradeMod(modVanilla, features);

  // Enable dev features.
  setLogFunctionsGlobal();
  setTracebackFunctionsGlobal();
  mod.saveDataManagerSetGlobal();
  mod.enableFastReset();
  mod.removeFadeIn();
  mod.setHotkey(Keyboard.F2, debugHotkey);

  // Add callbacks.
  mod.AddCallback(ModCallback.POST_PLAYER_INIT, postPlayerInit); // 9
  mod.AddCallback(ModCallback.POST_GAME_STARTED, postGameStarted); // 15
  mod.AddCallback(ModCallback.POST_NEW_LEVEL, postNewLevel); // 18
  mod.AddCallback(ModCallback.POST_NEW_ROOM, postNewRoom); // 19

  log(`${name} initialized.`);
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

/** Currently, F2 is set to execute this function. */
function debugHotkey() {
  // Add code here.
}
