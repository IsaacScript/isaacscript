import { ModCallback, PickupVariant } from "isaac-typescript-definitions";
import { ModCallbackCustom2 } from "../../enums/ModCallbackCustom2";
import { getCollectibleIndex } from "../../functions/collectibles";
import { CollectibleIndex } from "../../types/CollectibleIndex";
import { CustomCallbackCollectible } from "./validation/CustomCallbackCollectible";

export class PostCollectibleInitFirst extends CustomCallbackCollectible<ModCallbackCustom2.POST_COLLECTIBLE_INIT_FIRST> {
  public override v = {
    run: {
      seenCollectibles: new Set<CollectibleIndex>(),
    },
  };

  constructor() {
    super();

    this.callbacksUsed = [
      [
        ModCallback.POST_PICKUP_INIT,
        [this.postPickupInitCollectible, PickupVariant.COLLECTIBLE],
      ], // 34
    ];
  }

  // ModCallback.POST_PICKUP_INIT (34)
  // PickupVariant.COLLECTIBLE (100)
  private postPickupInitCollectible = (pickup: EntityPickup): void => {
    const collectible = pickup as EntityPickupCollectible;
    const collectibleIndex = getCollectibleIndex(collectible);
    if (this.v.run.seenCollectibles.has(collectibleIndex)) {
      return;
    }

    this.v.run.seenCollectibles.add(collectibleIndex);
    this.fire(collectible);
  };
}
