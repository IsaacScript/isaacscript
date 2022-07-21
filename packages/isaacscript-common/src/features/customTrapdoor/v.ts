import { StageTravelState } from "../../enums/private/StageTravelState";
import { CustomTrapdoorDescription } from "../../interfaces/private/CustomTrapdoorDescription";

const v = {
  run: {
    state: StageTravelState.NONE,
  },

  room: {
    /** Indexed by grid index. */
    trapdoors: new Map<int, CustomTrapdoorDescription>(),
  },
};

export function getCustomTrapdoorDescription(
  gridEntity: GridEntity,
): CustomTrapdoorDescription | undefined {
  const gridIndex = gridEntity.GetGridIndex();
  return v.room.trapdoors.get(gridIndex);
}
