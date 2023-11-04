import { SlotVariant } from "isaac-typescript-definitions";
import { VectorZero } from "../../../core/constants";
import { Exported } from "../../../decorators";
import { ModCallbackCustom } from "../../../enums/ModCallbackCustom";
import { spawnSlot } from "../../../functions/entitiesSpecific";
import { Feature } from "../../private/Feature";

const v = {
  run: {
    canRunUnlockAchievements: true,
  },
};

export class UnlockAchievementsDetection extends Feature {
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
    ];
  }

  // ModCallbackCustom.POST_GAME_STARTED_REORDERED
  private readonly postGameStartedReordered = () => {
    const greedDonationMachine = spawnSlot(
      SlotVariant.GREED_DONATION_MACHINE,
      0,
      VectorZero,
    );
    v.run.canRunUnlockAchievements = greedDonationMachine.Exists();
    greedDonationMachine.Remove();
  };

  /**
   * Helper function to see if the current run can unlock achievements. For example, if playing on a
   * set seed or in a victory lap, achievements are disabled.
   *
   * Under the hood, this is determined by spawning a Greed Donation Machine at the beginning of the
   * run and then seeing if it exists before removing it. (The results are cached for the entire
   * run.)
   *
   * In order to use this function, you must upgrade your mod with
   * `ISCFeature.UNLOCK_ACHIEVEMENTS_DETECTION`.
   */
  @Exported
  public canRunUnlockAchievements(): boolean {
    return v.run.canRunUnlockAchievements;
  }
}
