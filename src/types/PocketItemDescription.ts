import { PocketItemSlot } from "isaac-typescript-definitions";
import { PocketItemType } from "../enums/PocketItemType";

export interface PocketItemDescription {
  slot: PocketItemSlot;
  type: PocketItemType;
  subType: int;
}
