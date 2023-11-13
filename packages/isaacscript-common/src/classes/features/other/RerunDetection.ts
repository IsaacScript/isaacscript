import { Exported } from "../../../decorators";
import { ModCallbackCustom } from "../../../enums/ModCallbackCustom";
import { inStartingRoom } from "../../../functions/rooms";
import { onFirstFloor } from "../../../functions/stage";
import { Feature } from "../../private/Feature";

const v = {
  run: {
    pastFirstFloor: false,
    onRerun: false,
  },
};

export class RerunDetection extends Feature {
  /** @internal */
  public override v = v;

  /** @internal */
  constructor() {
    super();

    this.customCallbacksUsed = [
      [
        ModCallbackCustom.POST_GAME_STARTED_REORDERED,
        this.postGameStartedReordered,
      ],
      [ModCallbackCustom.POST_NEW_LEVEL_REORDERED, this.postNewLevelReordered],
    ];
  }

  // ModCallbackCustom.POST_GAME_STARTED_REORDERED
  private readonly postGameStartedReordered = (isContinued: boolean) => {
    if (
      isContinued &&
      onFirstFloor() &&
      inStartingRoom() &&
      v.run.pastFirstFloor
    ) {
      v.run.onRerun = true;
    }
  };

  // ModCallbackCustom.POST_NEW_LEVEL_REORDERED
  private readonly postNewLevelReordered = () => {
    if (!onFirstFloor()) {
      v.run.pastFirstFloor = true;
    }
  };

  /**
   * Helper function to detect if the current run was starting using the "Rerun" option from the
   * main menu.
   *
   * Under the hood, this assumes that any run that is past the first floor and continues in the
   * starting room of the run is a rerun.
   *
   * In order to use this function, you must upgrade your mod with `ISCFeature.RERUN_DETECTION`.
   *
   * @public
   */
  @Exported
  public onRerun(): boolean {
    return v.run.onRerun;
  }
}
