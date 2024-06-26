import type {
  CollectibleType,
  TrinketType,
} from "isaac-typescript-definitions";
import { ItemType } from "isaac-typescript-definitions";
import { ModCallbackCustom } from "../../../enums/ModCallbackCustom";
import { defaultMapGetPlayer } from "../../../functions/playerDataStructures";
import { asNumber } from "../../../functions/types";
import type { PickingUpItem } from "../../../types/PickingUpItem";
import {
  newPickingUpItem,
  resetPickingUpItem,
} from "../../../types/PickingUpItem";
import type { PlayerIndex } from "../../../types/PlayerIndex";
import { DefaultMap } from "../../DefaultMap";
import type { PostItemPickup } from "../../callbacks/PostItemPickup";
import type { PreItemPickup } from "../../callbacks/PreItemPickup";
import { Feature } from "../../private/Feature";

const v = {
  run: {
    playersPickingUpItemMap: new DefaultMap<PlayerIndex, PickingUpItem>(() =>
      newPickingUpItem(),
    ),
  },
};

export class ItemPickupDetection extends Feature {
  public override v = v;

  private readonly postItemPickup: PostItemPickup;
  private readonly preItemPickup: PreItemPickup;

  constructor(postItemPickup: PostItemPickup, preItemPickup: PreItemPickup) {
    super();

    this.customCallbacksUsed = [
      [
        ModCallbackCustom.POST_PEFFECT_UPDATE_REORDERED,
        this.postPEffectUpdateReordered,
      ],
    ];

    this.postItemPickup = postItemPickup;
    this.preItemPickup = preItemPickup;
  }

  // ModCallbackCustom.POST_PEFFECT_UPDATE_REORDERED
  private readonly postPEffectUpdateReordered = (player: EntityPlayer) => {
    const pickingUpItem = defaultMapGetPlayer(
      v.run.playersPickingUpItemMap,
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
      // This should never happen, since the `EntityPlayer.IsItemQueueEmpty` method returned false.
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
