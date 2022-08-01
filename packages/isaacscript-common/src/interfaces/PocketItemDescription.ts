import { PocketItemSlot } from "isaac-typescript-definitions";
import { PocketItemType } from "../enums/PocketItemType";

/** This is used by the `getPocketItems` and related helper functions. */
export interface PocketItemDescription {
  slot: PocketItemSlot;
  type: PocketItemType;
  subType: int;
}
