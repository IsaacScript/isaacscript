import { EntityType, ModCallback } from "isaac-typescript-definitions";

/**
 * Using the "luamod" console command with a mod that has custom shaders can crash the game. A
 * simple fix for this is automatically applied to any upgraded mods. This method was originally
 * discovered by AgentCucco.
 */
export function loadShaderCrashFix(mod: Mod): void {
  mod.AddCallback(ModCallback.POST_PLAYER_INIT, postPlayerInit); // 9
}

// ModCallback.POST_PLAYER_INIT (9)
function postPlayerInit() {
  const players = Isaac.FindByType(EntityType.PLAYER);
  if (players.length === 0) {
    Isaac.ExecuteCommand("reloadshaders");
  }
}
