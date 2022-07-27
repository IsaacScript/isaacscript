import {
  GridCollisionClass,
  GridEntityType,
} from "isaac-typescript-definitions";

export interface GridEntityCustomData {
  /**
   * This is not a real `GridEntityType`; rather it is an arbitrary integer selected by end-user
   * mods.
   */
  gridEntityTypeCustom: GridEntityType;

  roomListIndex: int;
  gridIndex: int;
  anm2Path: string;
  defaultAnimation?: string;
  gridCollisionClass: GridCollisionClass;
}
