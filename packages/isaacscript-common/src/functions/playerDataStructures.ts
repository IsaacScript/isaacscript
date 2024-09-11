import type { DefaultMap } from "../classes/DefaultMap";
import type { PlayerIndex } from "../types/PlayerIndex";
import { getPlayerIndex } from "./playerIndex";

/**
 * Helper function to make using default maps with an index of `PlayerIndex` easier. Use this
 * instead of the `DefaultMap.getAndSetDefault` method if you have a default map of this type.
 *
 * For example:
 *
 * ```ts
 * const v = {
 *   run: {
 *     playersSpeedBoost: new DefaultMap<PlayerIndex, int>(0),
 *   },
 * };
 *
 * function evaluateCacheSpeed(player: EntityPlayer) {
 *   player.MoveSpeed = defaultMapGetPlayer(v.run.playersSpeedBoost, player);
 * }
 * ```
 *
 * @allowEmptyVariadic
 */
export function defaultMapGetPlayer<V, Args extends unknown[]>(
  map: DefaultMap<PlayerIndex, V, Args>,
  player: EntityPlayer,
  ...extraArgs: Args
): V {
  const playerIndex = getPlayerIndex(player);
  return map.getAndSetDefault(playerIndex, ...extraArgs);
}

/**
 * Helper function to make using maps with an index of `PlayerIndex` easier. Use this instead of the
 * `Map.set` method if you have a map of this type.
 *
 * Since `Map` and `DefaultMap` set values in the same way, this function is simply an alias for the
 * `mapSetPlayer` helper function.
 */
export function defaultMapSetPlayer<V>(
  // eslint-disable-next-line complete/prefer-readonly-parameter-types
  map: Map<PlayerIndex, V>,
  player: EntityPlayer,
  value: V,
): void {
  mapSetPlayer(map, player, value);
}

/**
 * Helper function to make using maps with an type of `PlayerIndex` easier. Use this instead of the
 * `Map.delete` method if you have a set of this type.
 */
export function mapDeletePlayer(
  // eslint-disable-next-line complete/prefer-readonly-parameter-types
  map: Map<PlayerIndex, unknown>,
  player: EntityPlayer,
): boolean {
  const playerIndex = getPlayerIndex(player);
  return map.delete(playerIndex);
}

/**
 * Helper function to make using maps with an index of `PlayerIndex` easier. Use this instead of the
 * `Map.get` method if you have a map of this type.
 *
 * For example:
 *
 * ```ts
 * const v = {
 *   run: {
 *     playersSpeedBoost: new Map<PlayerIndex, int>(),
 *   },
 * };
 *
 * function incrementSpeedBoost(player: EntityPlayer) {
 *   const oldSpeedBoost = mapGetPlayer(v.run.playersSpeedBoost, player);
 *   const newSpeedBoost = oldSpeedBoost + 0.1;
 *   mapSetPlayer(v.run.playersSpeedBoost, player);
 * }
 * ```
 */
export function mapGetPlayer<V>(
  map: ReadonlyMap<PlayerIndex, V>,
  player: EntityPlayer,
): V | undefined {
  const playerIndex = getPlayerIndex(player);
  return map.get(playerIndex);
}

/**
 * Helper function to make using maps with an index of `PlayerIndex` easier. Use this instead of the
 * `Map.has` method if you have a map of this type.
 */
export function mapHasPlayer<V>(
  map: ReadonlyMap<PlayerIndex, V>,
  player: EntityPlayer,
): boolean {
  const playerIndex = getPlayerIndex(player);
  return map.has(playerIndex);
}

/**
 * Helper function to make using maps with an index of `PlayerIndex` easier. Use this instead of the
 * `Map.set` method if you have a map of this type.
 *
 * For example:
 *
 * ```ts
 * const v = {
 *   run: {
 *     playersSpeedBoost: new Map<PlayerIndex, int>(),
 *   },
 * };
 *
 * function incrementSpeedBoost(player: EntityPlayer) {
 *   const oldSpeedBoost = mapGetPlayer(v.run.playersSpeedBoost, player);
 *   const newSpeedBoost = oldSpeedBoost + 0.1;
 *   mapSetPlayer(v.run.playersSpeedBoost, player);
 * }
 * ```
 */
export function mapSetPlayer<V>(
  // eslint-disable-next-line complete/prefer-readonly-parameter-types
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
  // eslint-disable-next-line complete/prefer-readonly-parameter-types
  set: Set<PlayerIndex>,
  player: EntityPlayer,
): void {
  const playerIndex = getPlayerIndex(player);
  set.add(playerIndex);
}

/**
 * Helper function to make using sets with an type of `PlayerIndex` easier. Use this instead of the
 * `Set.delete` method if you have a set of this type.
 */
export function setDeletePlayer(
  // eslint-disable-next-line complete/prefer-readonly-parameter-types
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
  set: ReadonlySet<PlayerIndex>,
  player: EntityPlayer,
): boolean {
  const playerIndex = getPlayerIndex(player);
  return set.has(playerIndex);
}
