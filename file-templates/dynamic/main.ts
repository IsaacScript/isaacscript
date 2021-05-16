// Define imports
import isaacScriptInit from "./isaacScriptInit";

// Initialize some IsaacScript-specific functions
isaacScriptInit();

// Register the mod
// (which will make it show up in the list of mods on the mod screen in the main menu)
const MOD_NAME = RegisterMod("MOD_NAME", 1);

// Define callback functions
function postGameStarted() {
  Isaac.DebugString("Callback triggered: MC_POST_GAME_STARTED");
}

// Register callbacks
MOD_NAME.AddCallback(ModCallbacks.MC_POST_GAME_STARTED, postGameStarted);

// Print an initialization message to the "log.txt" file
Isaac.DebugString("MOD_NAME initialized.");
