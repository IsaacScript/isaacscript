import {
  CardType,
  CollectibleType,
  ModCallback,
  PickupVariant,
} from "isaac-typescript-definitions";
import { game } from "../../../core/cachedClasses";
import { Exported } from "../../../decorators";
import { setCollectibleSubType } from "../../../functions/collectibles";
import { getEntityID } from "../../../functions/entities";
import { isCollectible } from "../../../functions/pickupVariants";
import { Feature } from "../../private/Feature";

export class PreventCollectibleRotation extends Feature {
  /** @internal */
  public override v = {
    room: {
      /**
       * Index is a string containing the grid index and the InitSeed of the collectible.
       * (e.g. "12,1123579202")
       *
       * (We cannot simply use the InitSeed of the collectible because Diplopia can cause multiple
       * collectibles in the room to have the same InitSeed. However, no two collectibles should
       * ever be on the same grid index.)
       *
       * (We cannot use PtrHash as an index because that stays the same when the item is rolled.)
       */
      trackedCollectibles: new Map<string, CollectibleType>(),
    },
  };

  /** @internal */
  constructor() {
    super();

    this.callbacksUsed = [
      // 5
      [
        ModCallback.POST_USE_CARD,
        this.useCardSoulOfIsaac,
        [CardType.SOUL_ISAAC],
      ],

      // 35
      [
        ModCallback.POST_PICKUP_UPDATE,
        this.postPickupUpdateCollectible,
        [PickupVariant.COLLECTIBLE],
      ],
    ];
  }

  // ModCallback.POST_USE_CARD (5)
  // Card.SOUL_ISAAC (81)
  private useCardSoulOfIsaac = () => {
    // Soul of Isaac causes items to flip. Delete all tracked items (assuming that the player
    // deliberately wants to roll a quest item).
    this.v.room.trackedCollectibles.clear();
  };

  // ModCallback.POST_PICKUP_UPDATE (35)
  // PickupVariant.COLLECTIBLE (100)
  private postPickupUpdateCollectible = (pickup: EntityPickup) => {
    const collectible = pickup as EntityPickupCollectible;

    this.checkCollectibleRotated(collectible);
  };

  private checkCollectibleRotated(collectible: EntityPickupCollectible) {
    // Ignore empty pedestals (i.e. items that have already been taken by the player).
    if (collectible.SubType === CollectibleType.NULL) {
      return;
    }

    const index = getMapIndex(collectible);
    const trackedCollectibleType = this.v.room.trackedCollectibles.get(index);
    if (
      trackedCollectibleType !== undefined &&
      collectible.SubType !== trackedCollectibleType
    ) {
      // This item has switched, so restore it back to the way it was.
      setCollectibleSubType(collectible, trackedCollectibleType);
    }
  }

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

    const index = getMapIndex(collectible);
    this.v.room.trackedCollectibles.set(index, collectibleType);

    // The item might have already shifted on the first frame that it spawns, so change it back if
    // necessary.
    this.checkCollectibleRotated(collectible);
  }
}

function getMapIndex(collectible: EntityPickup) {
  const room = game.GetRoom();
  const gridIndex = room.GetGridIndex(collectible.Position);
  return `${gridIndex},${collectible.InitSeed}`;
}
