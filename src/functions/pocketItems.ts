import { MAX_PLAYER_POCKET_ITEM_SLOTS } from "../constants";
import { PocketItemDescription } from "../types/PocketItemDescription";
import { PocketItemType } from "../types/PocketItemType";

export function getFirstCardOrPill(
  player: EntityPlayer,
): PocketItemDescription | undefined {
  const pocketItems = getPocketItems(player);
  for (const pocketItem of pocketItems) {
    if (
      pocketItem.type === PocketItemType.CARD ||
      pocketItem.type === PocketItemType.PILL
    ) {
      return pocketItem;
    }
  }

  return undefined;
}

/**
 * Use this helper function as a workaround for `EntityPlayer.GetPocketItem()` not working
 * correctly.
 *
 * Note that due to API limitations, there is no way to determine the location of a Dice Bag trinket
 * dice. Furthermore, when the player has a Dice Bag trinket dice and a pocket active at the same
 * time, there is no way to determine the location of the pocket active item. If this function
 * cannot determine the identity of a particular slot, it will mark the type of the slot as
 * `PocketItemType.UNDETERMINABLE`.
 */
export function getPocketItems(player: EntityPlayer): PocketItemDescription[] {
  const pocketItem = player.GetActiveItem(ActiveSlot.SLOT_POCKET);
  const hasPocketItem = pocketItem !== CollectibleType.COLLECTIBLE_NULL;

  const pocketItem2 = player.GetActiveItem(ActiveSlot.SLOT_POCKET2);
  const hasPocketItem2 = pocketItem2 !== CollectibleType.COLLECTIBLE_NULL;

  const maxPocketItems = player.GetMaxPocketItems();

  const pocketItems: PocketItemDescription[] = [];
  let pocketItemIdentified = false;
  let pocketItem2Identified = false;
  for (let slot = 0; slot < MAX_PLAYER_POCKET_ITEM_SLOTS; slot++) {
    const card = player.GetCard(slot as PocketItemSlot);
    const pill = player.GetPill(slot as PocketItemSlot);

    if (card !== Card.CARD_NULL) {
      pocketItems.push({
        type: PocketItemType.CARD,
        id: card,
        slot,
      });
    } else if (pill !== PillColor.PILL_NULL) {
      pocketItems.push({
        type: PocketItemType.PILL,
        id: pill,
        slot,
      });
    } else if (hasPocketItem && !hasPocketItem2 && !pocketItemIdentified) {
      pocketItemIdentified = true;
      pocketItems.push({
        type: PocketItemType.ACTIVE_ITEM,
        id: pocketItem,
        slot,
      });
    } else if (!hasPocketItem && hasPocketItem2 && !pocketItem2Identified) {
      pocketItem2Identified = true;
      pocketItems.push({
        type: PocketItemType.DICE_BAG_DICE,
        id: pocketItem2,
        slot,
      });
    } else if (hasPocketItem && hasPocketItem2) {
      pocketItems.push({
        type: PocketItemType.UNDETERMINABLE,
        id: 0,
        slot,
      });
    } else {
      pocketItems.push({
        type: PocketItemType.EMPTY,
        id: 0,
        slot,
      });
    }

    if (slot + 1 === maxPocketItems) {
      break;
    }
  }

  return pocketItems;
}

/**
 * Returns whether or not the player can hold an additional pocket item, beyond what they are
 * currently carrying. This takes into account items that modify the max number of pocket items,
 * like Starter Deck.
 *
 * If the player is the Tainted Soul, this always returns false, since that character cannot pick up
 * items. (Only Tainted Forgotten can pick up items.)
 */
export function hasOpenPocketItemSlot(player: EntityPlayer): boolean {
  const character = player.GetPlayerType();
  if (character === PlayerType.PLAYER_THESOUL_B) {
    return false;
  }

  const pocketItems = getPocketItems(player);
  for (const pocketItem of pocketItems) {
    if (pocketItem.type === PocketItemType.EMPTY) {
      return true;
    }
  }

  return false;
}
