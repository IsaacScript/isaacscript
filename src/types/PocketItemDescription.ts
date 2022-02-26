import { PocketItemType } from "./PocketItemType";

export interface PocketItemDescription {
  slot: PocketItemSlot;
  type: PocketItemType;
  subType: int;
}
