import { CollectibleType } from "isaac-typescript-definitions";
import { Exported } from "../../../decorators";
import { ModCallbackCustom } from "../../../enums/ModCallbackCustom";
import {
  arrayRemoveInPlace,
  copyArray,
  getLastElement,
} from "../../../functions/array";
import { isActiveCollectible } from "../../../functions/collectibles";
import { defaultMapGetPlayer } from "../../../functions/playerDataStructures";
import { PlayerIndex } from "../../../types/PlayerIndex";
import { DefaultMap } from "../../DefaultMap";
import { Feature } from "../../private/Feature";

export class PlayerInventory extends Feature {
  /** @internal */
  public override v = {
    run: {
      playersInventory: new DefaultMap<
        PlayerIndex,
        CollectibleType[],
        [player: EntityPlayer]
      >(() => []),
    },
  };

  /** @internal */
  constructor() {
    super();

    this.customCallbacksUsed = [
      [
        ModCallbackCustom.POST_PLAYER_COLLECTIBLE_ADDED,
        this.postCollectibleAdded,
      ],
      [
        ModCallbackCustom.POST_PLAYER_COLLECTIBLE_REMOVED,
        this.postCollectibleRemoved,
      ],
    ];
  }

  // ModCallbackCustom.POST_PLAYER_COLLECTIBLE_ADDED
  private postCollectibleAdded = (
    player: EntityPlayer,
    collectibleType: CollectibleType,
  ) => {
    const inventory = defaultMapGetPlayer(
      this.v.run.playersInventory,
      player,
      player,
    );
    inventory.push(collectibleType);
  };

  // ModCallbackCustom.POST_PLAYER_COLLECTIBLE_REMOVED
  private postCollectibleRemoved = (
    player: EntityPlayer,
    collectibleType: CollectibleType,
  ) => {
    const inventory = defaultMapGetPlayer(
      this.v.run.playersInventory,
      player,
      player,
    );
    arrayRemoveInPlace(inventory, collectibleType);
  };

  /**
   * Helper function to get all of the collectibles that the player has gotten so far on this run,
   * in order.
   *
   * In the case of inventory initialization or the case where the player rerolls their build in the
   * middle of the run (e.g. with D4), the order of the inventory will not correspond to the order
   * that the items were actually given to the player. In this case, the inventory will be in the
   * order of the lowest `CollectibleType` to the highest.
   *
   * Under the hood, the inventory tracking works by tracking the number of collectibles that a
   * player has on every frame. Thus, in a situation where a collectible was both added and removed
   * to the player on the same frame, the amount of total collectibles would stay the same, and the
   * inventory would not be updated. In vanilla, this situation would never happen, but another mod
   * might do this for some reason. (With that said, the next time that a collectible is normally
   * added or removed, it would trigger a re-scan, and the previous changes would be picked up.)
   *
   * In order to use this function, you must upgrade your mod with `ISCFeature.PLAYER_INVENTORY`.
   *
   * @param player The player to get the inventory for.
   * @param includeActiveCollectibles Optional. If true, will include all active collectibles.
   *                                Default is true.
   */
  @Exported
  public getPlayerInventory(
    player: EntityPlayer,
    includeActiveCollectibles = true,
  ): CollectibleType[] {
    const inventory = defaultMapGetPlayer(
      this.v.run.playersInventory,
      player,
      player,
    );

    if (includeActiveCollectibles) {
      return copyArray(inventory);
    }

    return inventory.filter(
      (collectibleType) => !isActiveCollectible(collectibleType),
    );
  }

  /**
   * Helper function to get the last passive collectible that the player picked up. In most cases,
   * this will be the passive that is removed when the player would use Clicker.
   *
   * Returns undefined if the player does not have any passive collectibles.
   *
   * In order to use this function, you must upgrade your mod with `ISCFeature.PLAYER_INVENTORY`.
   */
  @Exported
  public getPlayerLastPassiveCollectible(
    player: EntityPlayer,
  ): CollectibleType | undefined {
    const inventory = this.getPlayerInventory(player, false);
    return getLastElement(inventory);
  }
}
