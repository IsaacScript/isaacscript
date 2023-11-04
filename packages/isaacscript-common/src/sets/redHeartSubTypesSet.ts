import { HeartSubType } from "isaac-typescript-definitions";
import { ReadonlySet } from "../types/ReadonlySet";

export const RED_HEART_SUB_TYPES_SET = new ReadonlySet<HeartSubType>([
  HeartSubType.FULL, // 1
  HeartSubType.HALF, // 2
  HeartSubType.DOUBLE_PACK, // 5
]);
