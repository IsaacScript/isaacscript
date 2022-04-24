import { MAX_PLAYER_POCKET_ITEM_SLOTS } from "../constants";
import { PocketItemType } from "../enums/PocketItemType";
import { PocketItemDescription } from "../types/PocketItemDescription";
import { range } from "./math";
import { isCharacter } from "./player";

/**
 * Helper function to get the `PocketItemSlot` that the player's pocket active item is in, if any.
 * Returns undefined if the player does not have a pocket active item.
 */
export function getActivePocketItemSlot(
  player: EntityPlayer,
): PocketItemSlot | undefined {
  const pocketItems = getPocketItems(player);
  for (const pocketItem of pocketItems) {
    if (pocketItem.type === PocketItemType.ACTIVE_ITEM) {
      return pocketItem.slot;
    }
  }

  return undefined;
}

export function getFirstCardOrPill(
  player: EntityPlayer,
): PocketItemDescription | undefined {
  const pocketItems = getPocketItems(player);
  return pocketItems.find(
    (pocketItem) =>
      pocketItem.type === PocketItemType.CARD ||
      pocketItem.type === PocketItemType.PILL,
  );
}

/**
 * Use this helper function as a workaround for the `EntityPlayer.GetPocketItem` method not working
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
  for (const slot of range(MAX_PLAYER_POCKET_ITEM_SLOTS - 1)) {
    const card = player.GetCard(slot as PocketItemSlot);
    const pillColor = player.GetPill(slot as PocketItemSlot);

    if (card !== Card.CARD_NULL) {
      pocketItems.push({
        slot,
        type: PocketItemType.CARD,
        subType: card,
      });
    } else if (pillColor !== PillColor.PILL_NULL) {
      pocketItems.push({
        slot,
        type: PocketItemType.PILL,
        subType: pillColor,
      });
    } else if (hasPocketItem && !hasPocketItem2 && !pocketItemIdentified) {
      pocketItemIdentified = true;
      pocketItems.push({
        slot,
        type: PocketItemType.ACTIVE_ITEM,
        subType: pocketItem,
      });
    } else if (!hasPocketItem && hasPocketItem2 && !pocketItem2Identified) {
      pocketItem2Identified = true;
      pocketItems.push({
        slot,
        type: PocketItemType.DICE_BAG_DICE,
        subType: pocketItem2,
      });
    } else if (hasPocketItem && hasPocketItem2) {
      pocketItems.push({
        slot,
        type: PocketItemType.UNDETERMINABLE,
        subType: 0,
      });
    } else {
      pocketItems.push({
        slot,
        type: PocketItemType.EMPTY,
        subType: 0,
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
  if (isCharacter(player, PlayerType.PLAYER_THESOUL_B)) {
    return false;
  }

  const pocketItems = getPocketItems(player);
  return pocketItems.some(
    (pocketItem) => pocketItem.type === PocketItemType.EMPTY,
  );
}

/**
 * Helper function to determine whether or not the player's "active" pocket item slot is set to
 * their pocket active item.
 */
export function isFirstSlotPocketActiveItem(player: EntityPlayer): boolean {
  const pocketItems = getPocketItems(player);
  const firstPocketItem = pocketItems[0];
  return firstPocketItem.type === PocketItemType.ACTIVE_ITEM;
}
