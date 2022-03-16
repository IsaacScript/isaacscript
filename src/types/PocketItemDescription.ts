import { PocketItemType } from "../enums/PocketItemType";

export interface PocketItemDescription {
  slot: PocketItemSlot;
  type: PocketItemType;
  subType: int;
}
