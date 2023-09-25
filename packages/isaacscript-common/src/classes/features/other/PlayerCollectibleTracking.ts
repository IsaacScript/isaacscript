import type { CollectibleType } from "isaac-typescript-definitions";
import { Exported } from "../../../decorators";
import { ModCallbackCustom } from "../../../enums/ModCallbackCustom";
import { arrayRemoveInPlace } from "../../../functions/array";
import { isActiveCollectible } from "../../../functions/collectibles";
import { defaultMapGetPlayer } from "../../../functions/playerDataStructures";
import type { PlayerIndex } from "../../../types/PlayerIndex";
import { DefaultMap } from "../../DefaultMap";
import { Feature } from "../../private/Feature";

const v = {
  run: {
    playersCollectibleTypes: new DefaultMap<
      PlayerIndex,
      CollectibleType[],
      [player: EntityPlayer]
    >(() => []),
  },
};

export class PlayerCollectibleTracking extends Feature {
  /** @internal */
  public override v = v;

  /** @internal */
  constructor() {
    super();

    this.customCallbacksUsed = [
      [
        ModCallbackCustom.POST_PLAYER_COLLECTIBLE_ADDED,
        this.postPlayerCollectibleAdded,
      ],
      [
        ModCallbackCustom.POST_PLAYER_COLLECTIBLE_REMOVED,
        this.postPlayerCollectibleRemoved,
      ],
    ];
  }

  // ModCallbackCustom.POST_PLAYER_COLLECTIBLE_ADDED
  private readonly postPlayerCollectibleAdded = (
    player: EntityPlayer,
    collectibleType: CollectibleType,
  ) => {
    const collectibleTypes = defaultMapGetPlayer(
      v.run.playersCollectibleTypes,
      player,
      player,
    );
    collectibleTypes.push(collectibleType);
  };

  // ModCallbackCustom.POST_PLAYER_COLLECTIBLE_REMOVED
  private readonly postPlayerCollectibleRemoved = (
    player: EntityPlayer,
    collectibleType: CollectibleType,
  ) => {
    const collectibleTypes = defaultMapGetPlayer(
      v.run.playersCollectibleTypes,
      player,
      player,
    );
    arrayRemoveInPlace(collectibleTypes, collectibleType);
  };

  /**
   * Helper function to get all of the collectible types that the player has gotten so far on this
   * run, in order.
   *
   * In the case of items given on the first frame of the run or the case where the player rerolls
   * their build in the middle of the run (e.g. with D4), the order of the collectible types will
   * not correspond to the order that the items were actually given to the player. In this case, the
   * order will be from the lowest `CollectibleType` to the highest.
   *
   * Under the hood, this feature works by tracking the number of collectibles that a player has on
   * every frame. Thus, in a situation where a collectible was both added and removed to the player
   * on the same frame, the amount of total collectibles would stay the same, and the collectible
   * types would not be updated. In vanilla, this situation would never happen, but another mod
   * might do this for some reason. (With that said, the next time that a collectible is normally
   * added or removed, it would trigger a re-scan, and the previous changes would be picked up.)
   *
   * In order to use this function, you must upgrade your mod with
   * `ISCFeature.PLAYER_COLLECTIBLE_TRACKING`.
   *
   * @param player The player to get the collectible types for.
   * @param includeActiveCollectibles Optional. If true, will include all active collectibles.
   *                                Default is true.
   */
  @Exported
  public getPlayerCollectibleTypes(
    player: EntityPlayer,
    includeActiveCollectibles = true,
  ): readonly CollectibleType[] {
    const collectibleTypes = defaultMapGetPlayer(
      v.run.playersCollectibleTypes,
      player,
      player,
    );

    if (includeActiveCollectibles) {
      return collectibleTypes;
    }

    return collectibleTypes.filter(
      (collectibleType) => !isActiveCollectible(collectibleType),
    );
  }

  /**
   * Helper function to get the last passive collectible type that the player picked up. In most
   * cases, this will be the passive that would be removed if the player used Clicker.
   *
   * Returns undefined if the player does not have any passive collectibles.
   *
   * In order to use this function, you must upgrade your mod with
   * `ISCFeature.PLAYER_COLLECTIBLE_TRACKING`.
   */
  @Exported
  public getPlayerLastPassiveCollectibleType(
    player: EntityPlayer,
  ): CollectibleType | undefined {
    const collectibleTypes = this.getPlayerCollectibleTypes(player, false);
    return collectibleTypes.at(-1);
  }
}
