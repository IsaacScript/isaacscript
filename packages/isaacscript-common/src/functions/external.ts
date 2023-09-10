/**
 * Helper functions that have to do with external programs.
 *
 * @module
 */

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
