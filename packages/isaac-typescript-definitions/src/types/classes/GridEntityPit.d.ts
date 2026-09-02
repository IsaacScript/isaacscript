import type { PitState } from "../../enums/collections/gridEntityStates";
import type { PitVariant } from "../../enums/collections/gridEntityVariants";

declare global {
  /**
   * Grid entities of type `GridEntityType.PIT` (7) can be converted to this class with the
   * `GridEntity.ToPit` method.
   */
  interface GridEntityPit extends GridEntity {
    readonly GetVariant: () => PitVariant;
    readonly MakeBridge: (bridgeSource?: GridEntity) => void;
    readonly SetLadder: (value: boolean) => void;
    readonly UpdateCollision: () => void;

    HasLadder: boolean;
    State: PitState;
  }
}
