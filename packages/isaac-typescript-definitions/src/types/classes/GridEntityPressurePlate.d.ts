import type { PressurePlateState } from "../../enums/collections/gridEntityStates";
import type { PressurePlateVariant } from "../../enums/collections/gridEntityVariants";

declare global {
  /**
   * Grid entities of type `GridEntityType.PRESSURE_PLATE` (20) can be converted to this class with
   * the `GridEntity.ToPressurePlate` method.
   */
  interface GridEntityPressurePlate extends GridEntity {
    GetVariant: () => PressurePlateVariant;
    Reward: () => void;

    GreedModeRNG: RNG;
    NextGreedAnimation: string;
    State: PressurePlateState;
    TimerPlate: Sprite;
  }
}
