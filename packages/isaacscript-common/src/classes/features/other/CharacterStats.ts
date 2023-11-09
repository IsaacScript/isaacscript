import type { CacheFlag, PlayerType } from "isaac-typescript-definitions";
import { ModCallback } from "isaac-typescript-definitions";
import { Exported } from "../../../decorators";
import { addPlayerStat, getDefaultPlayerStat } from "../../../functions/stats";
import { Feature } from "../../private/Feature";

type StatMap = Map<CacheFlag, number> | ReadonlyMap<CacheFlag, number>;

/** Easily create custom characters that have base stats different from that of Isaac. */
export class CharacterStats extends Feature {
  private readonly charactersStatMap = new Map<PlayerType, StatMap>();

  /** @internal */
  constructor() {
    super();

    this.callbacksUsed = [
      // 8
      [ModCallback.EVALUATE_CACHE, this.evaluateCache],
    ];
  }

  // ModCallback.EVALUATE_CACHE (8)
  private readonly evaluateCache = (
    player: EntityPlayer,
    cacheFlag: CacheFlag,
  ) => {
    const character = player.GetPlayerType();
    const statMap = this.charactersStatMap.get(character);
    if (statMap === undefined) {
      return;
    }

    const stat = statMap.get(cacheFlag);
    const defaultStat = getDefaultPlayerStat(cacheFlag);
    if (stat === undefined || defaultStat === undefined) {
      return;
    }
    const delta = stat - defaultStat;

    addPlayerStat(player, cacheFlag, delta);
  };

  /**
   * Helper function to manage the stats for a vanilla or custom character. Call this function once
   * at the beginning of your mod to declare the starting stats.
   *
   * You must provide this function with a map of CacheFlag to the default stat amount. For example,
   * the default amount of damage is 3.5. To make a custom character start with 4.5 damage:
   *
   * ```ts
   * const fooDefaultStats = new Map<CacheFlag, number>([
   *   [CacheFlag.DAMAGE, 4.5],
   * ])
   * registerCharacterStats(PlayerTypeCustom.FOO, fooDefaultStats);
   * ```
   *
   * Note that the format for the `CacheFlag.FIRE_DELAY` value should be in the tears stat format,
   * not the `MaxFireDelay` format.
   *
   * In order to use this function, you must upgrade your mod with `ISCFeature.CHARACTER_STATS`.
   *
   * @public
   */
  @Exported
  public registerCharacterStats(
    playerType: PlayerType,
    statMap: Map<CacheFlag, number> | ReadonlyMap<CacheFlag, number>,
  ): void {
    this.charactersStatMap.set(playerType, statMap);
  }
}
