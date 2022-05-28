import { PocketItemSlot } from "isaac-typescript-definitions";
import { PocketItemType } from "../enums/PocketItemType";

/** Used by the `getPocketItems` and related helper functions. */
export interface PocketItemDescription {
  slot: PocketItemSlot;
  type: PocketItemType;
  subType: int;
}
