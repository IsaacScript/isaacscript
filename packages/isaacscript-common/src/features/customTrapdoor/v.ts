import { StageTravelState } from "../../enums/StageTravelState";
import { StageTravelEntityDescription } from "../../interfaces/StageTravelEntityDescription";

const v = {
  run: {
    state: StageTravelState.DISABLED,
  },

  room: {
    /** Indexed by grid index. */
    trapdoors: new Map<int, StageTravelEntityDescription>(),
  },
};
export default v;

export function getCustomTrapdoorDescription(
  gridEntity: GridEntity,
): StageTravelEntityDescription | undefined {
  const gridIndex = gridEntity.GetGridIndex();
  return v.room.trapdoors.get(gridIndex);
}
