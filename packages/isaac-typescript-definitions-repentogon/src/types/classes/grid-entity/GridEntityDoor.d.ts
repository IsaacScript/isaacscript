import type { DoorState, DoorVariant } from "isaac-typescript-definitions";

declare global {
  interface GridEntityDoor extends GridEntity {
    /** Returns the door's extra sprite. */
    GetExtraSprite: () => Sprite;

    /** Plays the door's animation. */
    PlayAnimation: () => void;

    PreviousState: DoorState;
    PreviousVariant: DoorVariant;
  }
}
