import {
  CardType,
  CollectibleType,
  ModCallback,
  PickupVariant,
} from "isaac-typescript-definitions";
import { Exported } from "../../../decorators";
import { ISCFeature } from "../../../enums/ISCFeature";
import { ModCallbackCustom } from "../../../enums/ModCallbackCustom";
import { setCollectibleSubType } from "../../../functions/collectibles";
import { getEntityID } from "../../../functions/entities";
import { getCollectibles } from "../../../functions/pickupsSpecific";
import { isCollectible } from "../../../functions/pickupVariants";
import { asCollectibleType } from "../../../functions/types";
import { PickupIndex } from "../../../types/PickupIndex";
import { Feature } from "../../private/Feature";
import { PickupIndexCreation } from "./PickupIndexCreation";

const v = {
  run: {
    trackedCollectibles: new Map<PickupIndex, CollectibleType>(),
  },
};

export class PreventCollectibleRotation extends Feature {
  /** @internal */
  public override v = v;

  private pickupIndexCreation: PickupIndexCreation;

  /** @internal */
  constructor(pickupIndexCreation: PickupIndexCreation) {
    super();

    this.featuresUsed = [ISCFeature.PICKUP_INDEX_CREATION];

    this.callbacksUsed = [
      // 5
      [
        ModCallback.POST_USE_CARD,
        this.useCardSoulOfIsaac,
        [CardType.SOUL_ISAAC],
      ],
    ];

    this.customCallbacksUsed = [
      [ModCallbackCustom.POST_PICKUP_CHANGED, this.postPickupChanged],
    ];

    this.pickupIndexCreation = pickupIndexCreation;
  }

  /**
   * Soul of Isaac causes items to flip. We assume that the player deliberately wants to roll a
   * quest item, so we delete all tracked items in the current room.
   */
  // ModCallback.POST_USE_CARD (5)
  // Card.SOUL_ISAAC (81)
  private useCardSoulOfIsaac = () => {
    const collectibles = getCollectibles();
    for (const collectible of collectibles) {
      const pickupIndex = this.pickupIndexCreation.getPickupIndex(collectible);
      v.run.trackedCollectibles.delete(pickupIndex);
    }
  };

  // ModCallbackCustom.POST_PICKUP_CHANGED
  private postPickupChanged = (
    pickup: EntityPickup,
    oldVariant: PickupVariant,
    _oldSubType: int,
    newVariant: PickupVariant,
    newSubType: int,
  ) => {
    // We only care about collectibles rotating.
    if (
      oldVariant !== PickupVariant.COLLECTIBLE ||
      newVariant !== PickupVariant.COLLECTIBLE
    ) {
      return;
    }

    // Ignore empty pedestals (i.e. collectibles that have already been taken by the player).
    if (asCollectibleType(newSubType) === CollectibleType.NULL) {
      return;
    }

    const pickupIndex = this.pickupIndexCreation.getPickupIndex(pickup);
    const trackedCollectibleType = v.run.trackedCollectibles.get(pickupIndex);
    if (trackedCollectibleType === undefined) {
      return;
    }

    if (trackedCollectibleType !== asCollectibleType(newSubType)) {
      // This collectible has rotated, so restore it back to the way it was.
      setCollectibleSubType(pickup, trackedCollectibleType);
    }
  };

  /**
   * Helper function to prevent a collectible from being affected by Tainted Isaac's rotation
   * mechanic. (This mechanic also happens from Glitched Crown and Binge Eater.) This is useful
   * because quest items that are manually spawned by mods will be automatically be affected by this
   * mechanic.
   *
   * It is required to pass the intended collectible type to this function since it is possible for
   * collectibles to rotate on the first frame that they are spawned.
   *
   * In order to use this function, you must upgrade your mod with
   * `ISCFeature.PREVENT_COLLECTIBLE_ROTATION`.
   */
  @Exported
  public preventCollectibleRotation(
    collectible: EntityPickup,
    collectibleType: CollectibleType,
  ): void {
    if (!isCollectible(collectible)) {
      const entityID = getEntityID(collectible);
      error(
        `The "preventCollectibleRotate" function was given a non-collectible: ${entityID}`,
      );
    }

    const pickupIndex = this.pickupIndexCreation.getPickupIndex(collectible);
    v.run.trackedCollectibles.set(pickupIndex, collectibleType);

    // The item might have already shifted on the first frame that it spawns, so change it back if
    // necessary.
    if (collectible.SubType !== collectibleType) {
      setCollectibleSubType(collectible, collectibleType);
    }
  }
}
