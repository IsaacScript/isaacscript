/**
 * Helper functions that have to do with external programs.
 *
 * @module
 */

import type { CollectibleType } from "isaac-typescript-definitions";
import { getCollectibleName } from "./collectibles";

const REBIRTH_ITEM_TRACKER_REMOVE_COLLECTIBLE_COMMAND =
  "REBIRTH_ITEM_TRACKER_REMOVE_COLLECTIBLE";

const REBIRTH_ITEM_TRACKER_WRITE_TO_FILE_COMMAND =
  "REBIRTH_ITEM_TRACKER_WRITE_TO_FILE";

/**
 * Helper function to let the Rebirth Item Tracker know that it should remove a collectible from its
 * list.
 *
 * The "item tracker" in this function does not refer to the in-game item tracker, but rather to the
 * external Python program.
 *
 * This function is variadic, meaning that you can pass as many collectible types as you want to
 * remove.
 *
 * Note that calling this function is not normally necessary when removing collectibles from
 * players. For example, when you remove a collectible with the `EntityPlayer.RemoveCollectible`
 * method, a message is sent to the log file by the game and the item tracker will automatically
 * remove it. However, in some cases, manually removing collectibles can be useful:
 *
 * - We may be giving the player a "fake" collectible (e.g. 1-Up for the purposes of an extra life)
 *   and do not want the fake collectible to show up on the tracker.
 * - We may be removing a starting active item. Since active items are never removed from the
 *   tracker, we want to tell the item tracker that the player never had a particular active item to
 *   begin with.
 *
 * @see https://github.com/Rchardon/RebirthItemTracker
 */
export function rebirthItemTrackerRemoveCollectible(
  ...collectibleTypes: readonly CollectibleType[]
): void {
  for (const collectibleType of collectibleTypes) {
    // This cannot use the "log" function since the prefix will prevent the Rebirth Item Tracker
    // from recognizing the message.
    const collectibleName = getCollectibleName(collectibleType);
    Isaac.DebugString(
      `${REBIRTH_ITEM_TRACKER_REMOVE_COLLECTIBLE_COMMAND} Removing collectible ${collectibleType} (${collectibleName}) on player 0 (Player)`,
    );
  }
}

/**
 * Helper function to let the Rebirth Item Tracker know that it should write the submitted text
 * string to a file. This is useful for capturing text in programs like Open Broadcaster Software
 * (OBS).
 *
 * The "item tracker" in this function does not refer to the in-game item tracker, but rather to the
 * external Python program.
 *
 * @see https://github.com/Rchardon/RebirthItemTracker
 */
export function rebirthItemTrackerWriteToFile(msg: string): void {
  // This cannot use the "log" function since the prefix will prevent the Rebirth Item Tracker from
  // recognizing the message.
  Isaac.DebugString(`${REBIRTH_ITEM_TRACKER_WRITE_TO_FILE_COMMAND} ${msg}`);
}
