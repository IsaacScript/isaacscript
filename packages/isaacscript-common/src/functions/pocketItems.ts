import type { PocketItemSlot } from "isaac-typescript-definitions";
import {
  ActiveSlot,
  CardType,
  CollectibleType,
  PillColor,
  PlayerType,
} from "isaac-typescript-definitions";
import { POCKET_ITEM_SLOT_VALUES } from "../arrays/cachedEnumValues";
import { PocketItemType } from "../enums/PocketItemType";
import type { PocketItemDescription } from "../interfaces/PocketItemDescription";
import { isCharacter } from "./players";

/**
 * Helper function to get the `PocketItemSlot` that the player's pocket active collectible item is
 * in, if any. Returns undefined if the player does not have a pocket active item.
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

/** Helper item to get the first card that a player is holding in their pocket item slots. */
export function getFirstCard(
  player: EntityPlayer,
): PocketItemDescription | undefined {
  const pocketItems = getPocketItems(player);
  return pocketItems.find(
    (pocketItem) => pocketItem.type === PocketItemType.CARD,
  );
}

/**
 * Helper item to get the first card or pill that a player is holding in their pocket item slots.
 */
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

/** Helper item to get the first pill that a player is holding in their pocket item slots. */
export function getFirstPill(
  player: EntityPlayer,
): PocketItemDescription | undefined {
  const pocketItems = getPocketItems(player);
  return pocketItems.find(
    (pocketItem) => pocketItem.type === PocketItemType.PILL,
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
export function getPocketItems(
  player: EntityPlayer,
): readonly PocketItemDescription[] {
  const pocketItem = player.GetActiveItem(ActiveSlot.POCKET);
  const hasPocketItem = pocketItem !== CollectibleType.NULL;

  const pocketItem2 = player.GetActiveItem(ActiveSlot.POCKET_SINGLE_USE);
  const hasPocketItem2 = pocketItem2 !== CollectibleType.NULL;

  const maxPocketItems = player.GetMaxPocketItems();

  const pocketItems: PocketItemDescription[] = [];
  let pocketItemIdentified = false;
  let pocketItem2Identified = false;
  for (const slot of POCKET_ITEM_SLOT_VALUES) {
    const cardType = player.GetCard(slot);
    const pillColor = player.GetPill(slot);

    if (cardType !== CardType.NULL) {
      pocketItems.push({
        slot,
        type: PocketItemType.CARD,
        subType: cardType,
      });
    } else if (pillColor !== PillColor.NULL) {
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
 * Returns whether the player can hold an additional pocket item, beyond what they are currently
 * carrying. This takes into account items that modify the max number of pocket items, like Starter
 * Deck.
 *
 * If the player is the Tainted Soul, this always returns false, since that character cannot pick up
 * items. (Only Tainted Forgotten can pick up items.)
 */
export function hasOpenPocketItemSlot(player: EntityPlayer): boolean {
  if (isCharacter(player, PlayerType.SOUL_B)) {
    return false;
  }

  const pocketItems = getPocketItems(player);
  return pocketItems.some(
    (pocketItem) => pocketItem.type === PocketItemType.EMPTY,
  );
}

/**
 * Helper function to determine whether the player's "active" pocket item slot is set to their
 * pocket active item.
 */
export function isFirstSlotPocketActiveItem(player: EntityPlayer): boolean {
  const pocketItems = getPocketItems(player);
  const firstPocketItem = pocketItems[0];
  if (firstPocketItem === undefined) {
    return false;
  }

  return firstPocketItem.type === PocketItemType.ACTIVE_ITEM;
}

/** Helper function to see if two sets of pocket item descriptions are identical. */
export function pocketItemsEquals(
  pocketItems1: PocketItemDescription[] | readonly PocketItemDescription[],
  pocketItems2: PocketItemDescription[] | readonly PocketItemDescription[],
): boolean {
  if (pocketItems1.length !== pocketItems2.length) {
    return false;
  }

  // eslint-disable-next-line unicorn/no-for-loop
  for (let i = 0; i < pocketItems1.length; i++) {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const pocketItem1 = pocketItems1[i]!;
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const pocketItem2 = pocketItems2[i]!;

    const keys = Object.keys(pocketItem1) as Array<keyof PocketItemDescription>;
    for (const key of keys) {
      if (pocketItem1[key] !== pocketItem2[key]) {
        return false;
      }
    }
  }

  return true;
}
