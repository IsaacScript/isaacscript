import type { SpikesOnOffState } from "../../enums/collections/gridEntityStates";

declare global {
  /**
   * Grid entities of type `GridEntityType.SPIKES` (8) and `GridEntityType.SPIKES_ON_OFF` (9) can be
   * converted to this class with the `GridEntity.ToSpikes` method.
   */
  interface GridEntitySpikes extends GridEntity {
    // There is no `GridEntitySpikes.GetVariant` method because there is no corresponding
    // `SpikesVariant`. Furthermore, multiple grid entity types can be `GridEntitySpikes` class.

    /** `State` only applies to on/off spikes. */
    State: SpikesOnOffState;

    Timeout: int;
  }
}
