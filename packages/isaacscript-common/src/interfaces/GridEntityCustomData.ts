import type {
  GridCollisionClass,
  GridEntityType,
} from "isaac-typescript-definitions";

/**
 * This is meta-data that describes a custom grid entity.
 *
 * (One of the extra features that the standard library offers is the ability to spawn custom grid
 * entities with the `spawnCustomGridEntity` helper function.)
 */
export interface GridEntityCustomData {
  /**
   * This is not a real `GridEntityType`; rather it is an arbitrary integer selected by end-user
   * mods.
   */
  gridEntityTypeCustom: GridEntityType;

  roomListIndex: int;
  gridIndex: int;
  gridCollisionClass?: GridCollisionClass;
  anm2Path?: string;
  defaultAnimation?: string;
}
