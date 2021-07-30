import { getPlayerIndex, getPlayers, PlayerIndex } from "../functions/player";
import { saveDataManager } from "../saveDataManager";
import PickingUpItem from "../types/PickingUpItem";
import { postItemPickup } from "./postItemPickup";
import { preItemPickup } from "./preItemPickup";

const v = {
  run: {
    pickingUpItem: new Map<PlayerIndex, PickingUpItem>(),
  },
};

export function init(mod: Mod): void {
  saveDataManager("itemPickupCallback", v);

  mod.AddCallback(ModCallbacks.MC_POST_UPDATE, postUpdate);
}

// ModCallbacks.MC_POST_UPDATE (1)
function postUpdate() {
  for (const player of getPlayers()) {
    const pickingUpItem = getPickingUpItemForPlayer(player);

    if (player.IsItemQueueEmpty()) {
      queueEmpty(player, pickingUpItem);
    } else {
      queueNotEmpty(player, pickingUpItem);
    }
  }
}

function queueEmpty(player: EntityPlayer, pickingUpItem: PickingUpItem) {
  // Check to see if this player was picking something up on the previous frame
  if (pickingUpItem.id !== CollectibleType.COLLECTIBLE_NULL) {
    postItemPickup(player, pickingUpItem);

    // Reset the held item for this player
    pickingUpItem.id = CollectibleType.COLLECTIBLE_NULL;
    pickingUpItem.type = ItemType.ITEM_NULL;
  }
}

function queueNotEmpty(player: EntityPlayer, pickingUpItem: PickingUpItem) {
  const queuedItem = player.QueuedItem.Item;

  if (queuedItem !== null && queuedItem.ID !== pickingUpItem.id) {
    // Record which item we are picking up
    pickingUpItem.id = queuedItem.ID;
    pickingUpItem.type = queuedItem.Type;

    preItemPickup(player, pickingUpItem);
  }
}

function getPickingUpItemForPlayer(player: EntityPlayer) {
  const index = getPlayerIndex(player);
  let pickingUpItem = v.run.pickingUpItem.get(index);
  if (pickingUpItem === undefined) {
    pickingUpItem = new PickingUpItem();
    v.run.pickingUpItem.set(index, pickingUpItem);
  }

  return pickingUpItem;
}
