import { LevelStage, StageType } from "isaac-typescript-definitions";
import { DefaultMap } from "../../classes/DefaultMap";
import { StageTravelState } from "../../enums/private/StageTravelState";
import { CustomTrapdoorDescription } from "../../interfaces/private/CustomTrapdoorDescription";

const v = {
  run: {
    state: StageTravelState.NONE,

    /** The render frame that this state was reached. */
    stateRenderFrame: null as int | null,

    destination: null as
      | [stage: LevelStage, stageType: StageType]
      | [customStageName: string, floorNum: int]
      | null,
  },

  level: {
    /** Indexed by room list index and grid index. */
    trapdoors: new DefaultMap<int, Map<int, CustomTrapdoorDescription>>(
      () => new Map(),
    ),
  },
};
export default v;
