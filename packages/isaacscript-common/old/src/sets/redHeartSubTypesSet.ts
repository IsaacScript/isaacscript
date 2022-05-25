import { HeartSubType } from "isaac-typescript-definitions";

export const RED_HEART_SUB_TYPES_SET: ReadonlySet<HeartSubType> = new Set([
  HeartSubType.FULL, // 1
  HeartSubType.HALF, // 2
  HeartSubType.DOUBLE_PACK, // 5
]);
