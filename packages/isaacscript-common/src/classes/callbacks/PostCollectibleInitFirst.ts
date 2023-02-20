import { ModCallback, PickupVariant } from "isaac-typescript-definitions";
import { ModCallbackCustom } from "../../enums/ModCallbackCustom";
import { getCollectibleIndex } from "../../functions/collectibles";
import { shouldFireCollectible } from "../../shouldFire";
import { CollectibleIndex } from "../../types/CollectibleIndex";
import { CustomCallback } from "../private/CustomCallback";

const v = {
  run: {
    seenCollectibles: new Set<CollectibleIndex>(),
  },
};

export class PostCollectibleInitFirst extends CustomCallback<ModCallbackCustom.POST_COLLECTIBLE_INIT_FIRST> {
  public override v = v;

  constructor() {
    super();

    this.callbacksUsed = [
      // 34
      [
        ModCallback.POST_PICKUP_INIT,
        this.postPickupInitCollectible,
        [PickupVariant.COLLECTIBLE],
      ],
    ];
  }

  protected override shouldFire = shouldFireCollectible;

  // ModCallback.POST_PICKUP_INIT (34)
  // PickupVariant.COLLECTIBLE (100)
  private postPickupInitCollectible = (pickup: EntityPickup): void => {
    const collectible = pickup as EntityPickupCollectible;
    const collectibleIndex = getCollectibleIndex(collectible);
    if (v.run.seenCollectibles.has(collectibleIndex)) {
      return;
    }

    v.run.seenCollectibles.add(collectibleIndex);
    this.fire(collectible);
  };
}
