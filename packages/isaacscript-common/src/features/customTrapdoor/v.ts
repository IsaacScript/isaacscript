import { DefaultMap } from "../../classes/DefaultMap";
import { StageTravelState } from "../../enums/private/StageTravelState";
import { CustomTrapdoorDescription } from "../../interfaces/private/CustomTrapdoorDescription";
import { CustomTrapdoorDestination } from "../../interfaces/private/CustomTrapdoorDestination";

const v = {
  run: {
    state: StageTravelState.NONE,

    /** The render frame that this state was reached. */
    stateRenderFrame: null as int | null,

    destination: null as CustomTrapdoorDestination | null,
  },

  level: {
    /** Indexed by room list index and grid index. */
    trapdoors: new DefaultMap<int, Map<int, CustomTrapdoorDescription>>(
      () => new Map(),
    ),
  },
};
export default v;
