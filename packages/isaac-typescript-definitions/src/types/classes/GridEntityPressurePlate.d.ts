import { PressurePlateState } from "../../enums/collections/gridEntityState";
import { PressurePlateVariant } from "../../enums/collections/gridEntityVariants";

declare global {
  interface GridEntityPressurePlate extends GridEntity {
    GetVariant(): PressurePlateVariant;
    Reward(): void;

    GreedModeRNG: RNG;
    NextGreedAnimation: string;
    State: PressurePlateState;
    TimerPlate: Sprite;
  }
}
