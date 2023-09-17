/**
 * Helper functions that have to do with external programs.
 *
 * @module
 */

import type { CollectibleType } from "isaac-typescript-definitions";
import { getCollectibleName } from "./collectibles";

const REBIRTH_ITEM_TRACKER_WRITE_TO_FILE_COMMAND =
  "REBIRTH_ITEM_TRACKER_WRITE_TO_FILE";

/**
 * Helper function to let the Rebirth Item Tracker know that it should write the submitted text
 * string to a file. This is useful for capturing text in programs like Open Broadcaster Software
 * (OBS).
 *
 * The "item tracker" in this function does not refer to the in-game item tracker, but rather to the
 * Python program located at: https://github.com/Rchardon/RebirthItemTracker
 */
export function rebirthItemTrackerWriteToFile(msg: string): void {
  // This cannot use the "log" function since the prefix will prevent the Rebirth Item Tracker from
  // recognizing the message.
  Isaac.DebugString(`${REBIRTH_ITEM_TRACKER_WRITE_TO_FILE_COMMAND} ${msg}`);
}

/**
 * Helper function to put a message in the log.txt file to let the Rebirth Item Tracker know that it
 * should remove an item.
 *
 * The "item tracker" in this function does not refer to the in-game item tracker, but rather to the
 * Python program located at: https://github.com/Rchardon/RebirthItemTracker
 *
 * This function is useful when you need to add a "fake" collectible to a player. Note that calling
 * this function is not necessary when removing items from players. For example, when you remove a
 * collectible with the `EntityPlayer.RemoveCollectible` method, a proper message is sent to the log
 * the item tracker will automatically remove it.
 *
 * This function is variadic, meaning that you can pass as many collectible types as you want to
 * remove.
 */
export function removeCollectibleFromItemTracker(
  ...collectibleTypes: CollectibleType[]
): void {
  for (const collectibleType of collectibleTypes) {
    const collectibleName = getCollectibleName(collectibleType);

    // This cannot use the "log" function since the prefix will prevent the Rebirth Item Tracker
    // from recognizing the message.
    Isaac.DebugString(
      `Removing collectible ${collectibleType} (${collectibleName}) on player 0 (Player)`,
    );
  }
}
