import { EntityType, ModCallback } from "isaac-typescript-definitions";

/**
 * Using the "luamod" console command with a mod that has custom shaders can crash the game. A
 * simple fix for this is automatically applied to any upgraded mods. This method was originally
 * discovered by AgentCucco.
 *
 * This code is not put inside of a feature class because we want it to apply to every upgraded mod,
 * but we do not want to have any mandatory features. Mandatory features are confusing for end-users
 * since the type of their upgraded mod would contain features that they did not explicitly enable.
 */
export function applyShaderCrashFix(mod: Mod): void {
  mod.AddCallback(ModCallback.POST_PLAYER_INIT, postPlayerInit); // 9
}

// ModCallback.POST_PLAYER_INIT (9)
function postPlayerInit(_player: EntityPlayer) {
  const players = Isaac.FindByType(EntityType.PLAYER);
  if (players.length === 0) {
    Isaac.ExecuteCommand("reloadshaders");
  }
}
