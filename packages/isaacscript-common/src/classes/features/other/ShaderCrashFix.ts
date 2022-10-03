import { EntityType, ModCallback } from "isaac-typescript-definitions";
import { Feature } from "../../private/Feature";

/**
 * Using the "luamod" console command with a mod that has custom shaders can crash the game. A
 * simple fix for this is automatically applied to any upgraded mods. This method was originally
 * discovered by AgentCucco.
 *
 * This feature is automatically applied to every upgraded mod, so there is no need to explicitly
 * include it when upgrading.
 */
export class ShaderCrashFix extends Feature {
  constructor() {
    super();

    this.callbacksUsed = [
      [ModCallback.POST_PLAYER_INIT, [this.postPlayerInit]], // 9
    ];
  }

  // ModCallback.POST_PLAYER_INIT (9)
  // eslint-disable-next-line class-methods-use-this
  private postPlayerInit = () => {
    const players = Isaac.FindByType(EntityType.PLAYER);
    if (players.length === 0) {
      Isaac.ExecuteCommand("reloadshaders");
    }
  };
}
