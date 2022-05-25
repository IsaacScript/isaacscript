import { PressurePlateState } from "../enums/collections/gridEntityState";

declare global {
  interface GridEntityPressurePlate extends GridEntity {
    Reward(): void;

    GreedModeRNG: RNG;
    NextGreedAnimation: string;
    State: PressurePlateState;
    TimerPlate: Sprite;
  }
}
