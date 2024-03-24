import type { DoorState, DoorVariant } from "isaac-typescript-definitions";

declare global {
  interface GridEntityDoor extends GridEntity {
    GetExtraSprite: () => Sprite;

    PreviousState: DoorState;
    PreviousVariant: DoorVariant;
  }
}
