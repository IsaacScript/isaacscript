import type { DefaultMap } from "../classes/DefaultMap";

/**
 * Helper function to make using default maps with an index of `PtrHash` easier. Use this instead of
 * the `DefaultMap.getAndSetDefault` method if you have a default map of this type.
 *
 * For example:
 *
 * ```ts
 * const v = {
 *   run: {
 *     npcsSpeedBoost: new DefaultMap<PtrHash, int>(0),
 *   },
 * };
 *
 * function npcUpdate(npc: EntityNPC) {
 *   const speedBoost = defaultMapGetNPC(v.run.npcsSpeedBoost, npc);
 *   // Do something with the speed boost.
 * }
 * ```
 *
 * Note that not all NPCs should be stored in a map with a `PtrHash` as an index, so only use this
 * in the situations where that would be okay. (For example, Dark Esau should never be stored in a
 * map like this, because the scope of `PtrHash` is per room and Dark Esau is persistent between
 * rooms.)
 */
export function defaultMapGetNPC<V, Args extends unknown[]>(
  map: DefaultMap<PtrHash, V, Args>,
  npc: EntityNPC,
  ...extraArgs: Args
): V {
  const ptrHash = GetPtrHash(npc);
  return map.getAndSetDefault(ptrHash, ...extraArgs);
}

/**
 * Helper function to make using maps with an index of `PtrHash` easier. Use this instead of the
 * `Map.set` method if you have a map of this type.
 *
 * Since `Map` and `DefaultMap` set values in the same way, this function is simply an alias for the
 * `mapSetNPC` helper function.
 */
export function defaultMapSetNPC<V>(
  // eslint-disable-next-line complete/prefer-readonly-parameter-types
  map: Map<PtrHash, V>,
  npc: EntityNPC,
  value: V,
): void {
  mapSetNPC(map, npc, value);
}

/**
 * Helper function to make using maps with an type of `PtrHash` easier. Use this instead of the
 * `Map.delete` method if you have a set of this type.
 */
export function mapDeleteNPC(
  // eslint-disable-next-line complete/prefer-readonly-parameter-types
  map: Map<PtrHash, unknown>,
  npc: EntityNPC,
): boolean {
  const ptrHash = GetPtrHash(npc);
  return map.delete(ptrHash);
}

/**
 * Helper function to make using maps with an index of `PtrHash` easier. Use this instead of the
 * `Map.get` method if you have a map of this type.
 *
 * For example:
 *
 * ```ts
 * const v = {
 *   run: {
 *     npcsSpeedBoost: new Map<PtrHash, int>(),
 *   },
 * };
 *
 * function incrementSpeedBoost(npc: EntityNPC) {
 *   const oldSpeedBoost = mapGetNPC(v.run.npcsSpeedBoost, npc);
 *   const newSpeedBoost = oldSpeedBoost + 0.1;
 *   mapSetNPC(v.run.npcsSpeedBoost, npc);
 * }
 * ```
 */
export function mapGetNPC<V>(
  map: ReadonlyMap<PtrHash, V>,
  npc: EntityNPC,
): V | undefined {
  const ptrHash = GetPtrHash(npc);
  return map.get(ptrHash);
}

/**
 * Helper function to make using maps with an index of `PtrHash` easier. Use this instead of the
 * `Map.has` method if you have a map of this type.
 */
export function mapHasNPC<V>(
  map: ReadonlyMap<PtrHash, V>,
  npc: EntityNPC,
): boolean {
  const ptrHash = GetPtrHash(npc);
  return map.has(ptrHash);
}

/**
 * Helper function to make using maps with an index of `PtrHash` easier. Use this instead of the
 * `Map.set` method if you have a map of this type.
 *
 * For example:
 *
 * ```ts
 * const v = {
 *   run: {
 *     npcsSpeedBoost: new Map<PtrHash, int>(),
 *   },
 * };
 *
 * function incrementSpeedBoost(npc: EntityNPC) {
 *   const oldSpeedBoost = mapGetNPC(v.run.npcsSpeedBoost, npc);
 *   const newSpeedBoost = oldSpeedBoost + 0.1;
 *   mapSetNPC(v.run.npcsSpeedBoost, npc);
 * }
 * ```
 */
export function mapSetNPC<V>(
  // eslint-disable-next-line complete/prefer-readonly-parameter-types
  map: Map<PtrHash, V>,
  npc: EntityNPC,
  value: V,
): void {
  const ptrHash = GetPtrHash(npc);
  map.set(ptrHash, value);
}

/**
 * Helper function to make using sets with an type of `PtrHash` easier. Use this instead of the
 * `Set.add` method if you have a set of this type.
 */
// eslint-disable-next-line complete/prefer-readonly-parameter-types
export function setAddNPC(set: Set<PtrHash>, npc: EntityNPC): void {
  const ptrHash = GetPtrHash(npc);
  set.add(ptrHash);
}

/**
 * Helper function to make using sets with an type of `PtrHash` easier. Use this instead of the
 * `Set.delete` method if you have a set of this type.
 */
// eslint-disable-next-line complete/prefer-readonly-parameter-types
export function setDeleteNPC(set: Set<PtrHash>, npc: EntityNPC): boolean {
  const ptrHash = GetPtrHash(npc);
  return set.delete(ptrHash);
}

/**
 * Helper function to make using sets with an type of `PtrHash` easier. Use this instead of the
 * `Set.has` method if you have a set of this type.
 */
export function setHasNPC(set: ReadonlySet<PtrHash>, npc: EntityNPC): boolean {
  const ptrHash = GetPtrHash(npc);
  return set.has(ptrHash);
}
