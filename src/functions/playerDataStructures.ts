import { DefaultMap } from "../classes/DefaultMap";
import { PlayerIndex } from "../types/PlayerIndex";
import { getPlayerIndex } from "./playerIndex";

/**
 * Helper function to make using default maps with an index of `PlayerIndex` easier. Use this
 * instead of the `DefaultMap.getAndSetDefault` method if you have a default map of this type.
 */
export function defaultMapGetPlayer<V, A extends unknown[]>(
  map: DefaultMap<PlayerIndex, V, A>,
  player: EntityPlayer,
  ...extraArgs: A
): V {
  const playerIndex = getPlayerIndex(player);
  return map.getAndSetDefault(playerIndex, ...extraArgs);
}

/**
 * Helper function to make using maps with an index of `PlayerIndex` easier. Use this instead of the
 * `Map.get` method if you have a map of this type.
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
 * `Map.set` method if you have a map of this type.
 */
export function mapSetPlayer<V>(
  map: Map<PlayerIndex, V>,
  player: EntityPlayer,
  value: V,
): void {
  const playerIndex = getPlayerIndex(player);
  map.set(playerIndex, value);
}

/**
 * Helper function to make using sets with an type of `PlayerIndex` easier. Use this instead of the
 * `Set.add` method if you have a set of this type.
 */
export function setAddPlayer(
  set: Set<PlayerIndex>,
  player: EntityPlayer,
): Set<PlayerIndex> {
  const playerIndex = getPlayerIndex(player);
  return set.add(playerIndex);
}

/**
 * Helper function to make using sets with an type of `PlayerIndex` easier. Use this instead of the
 * `Set.delete` method if you have a set of this type.
 */
export function setDeletePlayer(
  set: Set<PlayerIndex>,
  player: EntityPlayer,
): boolean {
  const playerIndex = getPlayerIndex(player);
  return set.delete(playerIndex);
}

/**
 * Helper function to make using sets with an type of `PlayerIndex` easier. Use this instead of the
 * `Set.has` method if you have a set of this type.
 */
export function setHasPlayer(
  set: Set<PlayerIndex>,
  player: EntityPlayer,
): boolean {
  const playerIndex = getPlayerIndex(player);
  return set.has(playerIndex);
}
