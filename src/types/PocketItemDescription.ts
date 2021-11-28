import { PocketItemType } from "./PocketItemType";

export interface PocketItemDescription {
  type: PocketItemType;
  id: int;
  slot: PocketItemSlot;
}
