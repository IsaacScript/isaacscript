import { DefaultMap } from "../types/DefaultMap";
import { PlayerIndex } from "../types/PlayerIndex";
import { getPlayerIndex } from "./player";

/** Helper function to copy a map. (You can also use a Map constructor to accomplish this task.) */
export function copyMap<K, V>(oldMap: Map<K, V>): Map<K, V> {
  const newMap = new Map<K, V>();
  for (const [key, value] of oldMap.entries()) {
    newMap.set(key, value);
  }

  return newMap;
}

/**
 * Helper function to make using default maps with an index of `PlayerIndex` easier. Use this
 * instead of the `DefaultMap.getAndSetDefault` method.
 */
export function defaultMapGetPlayer<V>(
  map: DefaultMap<PlayerIndex, V>,
  player: EntityPlayer,
): V | undefined {
  const playerIndex = getPlayerIndex(player);
  return map.getAndSetDefault(playerIndex);
}

/**
 * Helper function to make using maps with an index of `PlayerIndex` easier. Use this instead of the
 * `Map.get` method.
 */
export function mapGetPlayer<V>(
  map: Map<PlayerIndex, V>,
  player: EntityPlayer,
): V | undefined {
  const playerIndex = getPlayerIndex(player);
  return map.get(playerIndex);
}

/**
 * Helper function to make using maps with an index of `PlayerIndex` easier. Use this instead of the
 * `Map.set` method.
 */
export function mapSetPlayer<V>(
  map: Map<PlayerIndex, V>,
  player: EntityPlayer,
  value: V,
): void {
  const playerIndex = getPlayerIndex(player);
  map.set(playerIndex, value);
}
