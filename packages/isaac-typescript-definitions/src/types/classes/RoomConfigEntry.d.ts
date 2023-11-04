import type { EntityType } from "../../enums/EntityType";

declare global {
  interface RoomConfigEntry extends IsaacAPIClass {
    Subtype: int;
    Type: EntityType;
    Variant: int;
    Weight: int;
  }
}
