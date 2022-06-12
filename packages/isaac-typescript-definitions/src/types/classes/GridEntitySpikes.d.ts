import { SpikesOnOffState } from "../../enums/collections/gridEntityState";

declare global {
  interface GridEntitySpikes extends GridEntity {
    /** `State` only applies to on/off spikes. */
    State: SpikesOnOffState;

    Timeout: int;
  }
}
