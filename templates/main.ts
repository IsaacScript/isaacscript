const MOD_NAME = RegisterMod("MOD_NAME", 1);

function postGameStarted() {}

MOD_NAME.AddCallback(ModCallbacks.MC_POST_GAME_STARTED, postGameStarted);

Isaac.DebugString("MOD_NAME initialized.");
