import { saveDataManager } from "../features/saveDataManager";
import { getPlayerIndex, PlayerIndex } from "../functions/player";
import PickingUpItem from "../types/PickingUpItem";
import * as postItemPickup from "./subscriptions/postItemPickup";
import * as preItemPickup from "./subscriptions/preItemPickup";

const v = {
  run: {
    pickingUpItem: new LuaTable<PlayerIndex, PickingUpItem>(),
  },
};

export function init(mod: Mod): void {
  saveDataManager("itemPickupCallback", v);

  mod.AddCallback(
    ModCallbacks.MC_POST_PLAYER_INIT,
    postPlayerInitPlayer,
    PlayerVariant.PLAYER, // Co-op babies cannot take items
  ); // 9

  mod.AddCallback(
    ModCallbacks.MC_POST_PLAYER_UPDATE,
    postPlayerUpdatePlayer,
    PlayerVariant.PLAYER, // Co-op babies cannot take items
  ); // 31
}

// ModCallbacks.MC_POST_PLAYER_INIT (9)
// PlayerVariant.PLAYER (0)
function postPlayerInitPlayer(player: EntityPlayer) {
  if (!hasSubscriptions()) {
    return;
  }

  const index = getPlayerIndex(player);
  const pickingUpItem = new PickingUpItem();
  v.run.pickingUpItem.set(index, pickingUpItem);
}

// ModCallbacks.MC_POST_PLAYER_UPDATE (31)
// PlayerVariant.PLAYER (0)
function postPlayerUpdatePlayer(player: EntityPlayer) {
  if (!hasSubscriptions()) {
    return;
  }

  const pickingUpItem = getPickingUpItemForPlayer(player);

  if (player.IsItemQueueEmpty()) {
    queueEmpty(player, pickingUpItem);
  } else {
    queueNotEmpty(player, pickingUpItem);
  }
}

function hasSubscriptions() {
  return preItemPickup.hasSubscriptions() || postItemPickup.hasSubscriptions();
}

function queueEmpty(player: EntityPlayer, pickingUpItem: PickingUpItem) {
  // Check to see if this player was picking something up on the previous frame
  if (pickingUpItem.id !== CollectibleType.COLLECTIBLE_NULL) {
    postItemPickup.fire(player, pickingUpItem);

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

    preItemPickup.fire(player, pickingUpItem);
  }
}

function getPickingUpItemForPlayer(player: EntityPlayer) {
  const index = getPlayerIndex(player);
  const pickingUpItem = v.run.pickingUpItem.get(index);
  if (pickingUpItem === undefined) {
    error(`Failed to get the picking up item for player: ${index}`);
  }

  return pickingUpItem;
}
