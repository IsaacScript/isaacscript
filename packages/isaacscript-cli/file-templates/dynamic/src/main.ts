import { ModCallback } from "isaac-typescript-definitions";

const MOD_NAME = "MOD-NAME-TO-REPLACE";

main();

function main() {
  // Instantiate a new mod object, which grants the ability to add callback functions that
  // correspond to in-game events.
  const mod = RegisterMod(MOD_NAME, 1);

  // Register a callback function that corresponds to when a new run is started.
  mod.AddCallback(ModCallback.POST_GAME_STARTED, postGameStarted);

  // Print an message to the "log.txt" file.
  Isaac.DebugString(`${MOD_NAME} initialized.`);
}

function postGameStarted() {
  Isaac.DebugString("Callback triggered: POST_GAME_STARTED");
}
