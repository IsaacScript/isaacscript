import { errorIfFeaturesNotInitialized } from "../featuresInitialized";
import { getDefaultPlayerStat } from "../functions/cacheFlag";
import { addStat } from "../functions/player";

const FEATURE_NAME = "character stat manager";

type StatMap = Map<CacheFlag, number> | ReadonlyMap<CacheFlag, number>;
const charactersStatMap = new Map<PlayerType | int, StatMap>();

/** @internal */
export function characterStatsInit(mod: Mod): void {
  mod.AddCallback(ModCallbacks.MC_EVALUATE_CACHE, evaluateCache); // 8
}

// ModCallbacks.MC_EVALUATE_CACHE (8)
function evaluateCache(player: EntityPlayer, cacheFlag: CacheFlag) {
  const character = player.GetPlayerType();
  const statMap = charactersStatMap.get(character);
  if (statMap === undefined) {
    return;
  }

  const stat = statMap.get(cacheFlag);
  const defaultStat = getDefaultPlayerStat(cacheFlag);
  if (stat === undefined || defaultStat === undefined) {
    return;
  }
  const delta = stat - defaultStat;

  addStat(player, cacheFlag, delta);
}

/**
 * Helper function to manage the stats for a vanilla or custom character. Call this function once at
 * the beginning of your mod to declare the starting stats.
 *
 * You must provide this function with a map of CacheFlag to the default stat amount. For example,
 * the default amount of damage is 3.5. To make a custom character start with 4.5 damage:
 *
 * ```ts
 * const fooDefaultStats = new Map<CacheFlag, number>([
 *   [CacheFlag.CACHE_DAMAGE, 4.5],
 * ])
 * registerCharacterStats(PlayerTypeCustom.FOO, fooDefaultStats);
 * ```
 *
 * Note that the format for the `CacheFlag.CACHE_FIREDELAY` value should be in the tears stat
 * format, not the `MaxFireDelay` format.
 */
export function registerCharacterStats(
  playerType: PlayerType | int,
  statMap: Map<CacheFlag, number> | ReadonlyMap<CacheFlag, number>,
): void {
  errorIfFeaturesNotInitialized(FEATURE_NAME);
  charactersStatMap.set(playerType, statMap);
}
