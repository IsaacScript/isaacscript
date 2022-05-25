import { EntityType } from "../enums/EntityType";

declare global {
  interface RoomConfigEntry {
    Subtype: int;
    Type: EntityType;
    Variant: int;
    Weight: int;
  }
}
