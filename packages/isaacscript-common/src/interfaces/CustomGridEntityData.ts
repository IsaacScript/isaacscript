import {
  GridCollisionClass,
  GridEntityType,
} from "isaac-typescript-definitions";

export interface CustomGridEntityData {
  gridEntityTypeCustom: GridEntityType;
  roomListIndex: int;
  gridIndex: int;
  anm2Path: string;
  defaultAnimation: string;
  gridCollisionClass: GridCollisionClass;
}
