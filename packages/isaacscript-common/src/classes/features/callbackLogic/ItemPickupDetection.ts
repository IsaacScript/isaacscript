import {
  CollectibleType,
  ItemType,
  ModCallback,
  TrinketType,
} from "isaac-typescript-definitions";
import { defaultMapGetPlayer } from "../../../functions/playerDataStructures";
import { asNumber } from "../../../functions/types";
import {
  newPickingUpItem,
  PickingUpItem,
  resetPickingUpItem,
} from "../../../types/PickingUpItem";
import { PlayerIndex } from "../../../types/PlayerIndex";
import { PostItemPickup } from "../../callbacks/PostItemPickup";
import { PreItemPickup } from "../../callbacks/PreItemPickup";
import { DefaultMap } from "../../DefaultMap";
import { Feature } from "../../private/Feature";

export class ItemPickupDetection extends Feature {
  public override v = {
    run: {
      playersPickingUpItemMap: new DefaultMap<PlayerIndex, PickingUpItem>(() =>
        newPickingUpItem(),
      ),
    },
  };

  private postItemPickup: PostItemPickup;
  private preItemPickup: PreItemPickup;

  constructor(postItemPickup: PostItemPickup, preItemPickup: PreItemPickup) {
    super();

    this.callbacksUsed = [
      [ModCallback.POST_PEFFECT_UPDATE, [this.postPEffectUpdate]], // 4
    ];

    this.postItemPickup = postItemPickup;
    this.preItemPickup = preItemPickup;
  }

  // ModCallback.POST_PEFFECT_UPDATE (4)
  private postPEffectUpdate = (player: EntityPlayer) => {
    const pickingUpItem = defaultMapGetPlayer(
      this.v.run.playersPickingUpItemMap,
      player,
    );

    if (player.IsItemQueueEmpty()) {
      this.queueEmpty(player, pickingUpItem);
      // If a player enters a room with a trinket next to the entrance, the player will pick up the
      // trinket, but it will not become queued (it will be deposited into their inventory
      // immediately). Since we don't know what type of item the player is holding, don't account
      // for this bug.
    } else {
      this.queueNotEmpty(player, pickingUpItem);
    }
  };

  private queueEmpty(player: EntityPlayer, pickingUpItem: PickingUpItem) {
    if (
      pickingUpItem.itemType === ItemType.NULL ||
      asNumber(pickingUpItem.subType) === 0
    ) {
      return;
    }

    this.postItemPickup.fire(player, pickingUpItem);
    resetPickingUpItem(pickingUpItem);
  }

  private queueNotEmpty(player: EntityPlayer, pickingUpItem: PickingUpItem) {
    const queuedItem = player.QueuedItem.Item;
    if (queuedItem === undefined || queuedItem.Type === ItemType.NULL) {
      // This should never happen, since the `EntityPlayer.IsItemQueueEmpty` method returned true.
      return;
    }

    if (
      queuedItem.Type !== pickingUpItem.itemType ||
      queuedItem.ID !== pickingUpItem.subType
    ) {
      // Record which item we are picking up.
      pickingUpItem.itemType = queuedItem.Type;
      pickingUpItem.subType = queuedItem.ID as CollectibleType | TrinketType;

      this.preItemPickup.fire(player, pickingUpItem);
    }
  }
}
