import { NullItemID } from "isaac-typescript-definitions";
import { Exported } from "../../../decorators";
import { ISCFeature } from "../../../enums/ISCFeature";
import { Feature } from "../../private/Feature";
import { ModdedElementSets } from "./ModdedElementSets";

const FLYING_NULL_ITEMS = [
  NullItemID.REVERSE_SUN, // 66
  NullItemID.SPIRIT_SHACKLES_SOUL, // 10
  NullItemID.LOST_CURSE, // 112
] as const;

export class FlyingDetection extends Feature {
  private moddedElementSets: ModdedElementSets;

  /** @internal */
  constructor(moddedElementSets: ModdedElementSets) {
    super();

    this.featuresUsed = [ISCFeature.MODDED_ELEMENT_SETS];

    this.moddedElementSets = moddedElementSets;
  }

  /**
   * Helper function to see if the player currently has flying from a temporary effect such as
   * Hanged Man, Bat Wing, and so on.
   *
   * In order to use this function, you must upgrade your mod with `ISCFeature.FLYING_DETECTION`.
   */
  @Exported
  public hasFlyingTemporaryEffect(player: EntityPlayer): boolean {
    const effects = player.GetEffects();

    // - Hanged Man card gives a Transcendence temporary effect.
    // - Pinking Shears gives a Transcendence temporary effect.
    const flyingCollectibles =
      this.moddedElementSets.getFlyingCollectibles(false);
    for (const collectibleType of flyingCollectibles) {
      if (effects.HasCollectibleEffect(collectibleType)) {
        return true;
      }
    }

    const flyingTrinkets = this.moddedElementSets.getFlyingTrinkets();
    for (const trinketType of flyingTrinkets) {
      if (effects.HasTrinketEffect(trinketType)) {
        return true;
      }
    }

    for (const nullItemID of FLYING_NULL_ITEMS) {
      if (effects.HasNullEffect(nullItemID)) {
        return true;
      }
    }

    return false;
  }
}
