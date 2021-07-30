import * as tableUtils from "./tableUtils";
import SaveData from "./types/SaveData";

/** Indexed by subscriber name. */
const saveDataMap = new Map<string, SaveData>();

/** Indexed by subscriber name. */
const saveDataDefaultsMap = new Map<string, SaveData>();

export function init(mod: Mod): void {
  mod.AddCallback(ModCallbacks.MC_POST_GAME_STARTED, postGameStarted); // 15
  mod.AddCallback(ModCallbacks.MC_POST_NEW_LEVEL, postNewLevel); // 18
  mod.AddCallback(ModCallbacks.MC_POST_NEW_ROOM, postNewRoom); // 19
}

export function register(key: string, saveData: SaveData): void {
  if (saveDataMap.has(key)) {
    error(
      `The save data manager is already managing save data for a key of: ${key}`,
    );
  }

  // Add the new save data to the map
  saveDataMap.set(key, saveData);

  // Also, make a copy of the initial save data so that we can use it to restore the default values
  // later on
  const saveDataTable = saveData as LuaTable;
  const saveDataTableCopy = tableUtils.copy(saveDataTable);
  const saveDataCopy = saveDataTableCopy as unknown as SaveData;
  saveDataDefaultsMap.set(key, saveDataCopy);
}

// ModCallbacks.MC_POST_GAME_STARTED (15)
function postGameStarted() {
  restoreDefaults("run");
}

// ModCallbacks.MC_POST_NEW_LEVEL (18)
function postNewLevel() {
  restoreDefaults("level");
}

// ModCallbacks.MC_POST_NEW_ROOM (19)
function postNewRoom() {
  restoreDefaults("room");
}

function restoreDefaults(childTableName: keyof SaveData) {
  for (const [key, saveData] of saveDataMap.entries()) {
    const childTable = saveData[childTableName];
    if (childTable === undefined) {
      // This feature does not happen to store any variables on this particular child table
      continue;
    }

    // Get the default values for this feature
    const saveDataDefaults = saveDataDefaultsMap.get(key);
    if (saveDataDefaults === undefined) {
      error(`Failed to find the default copy of the save data for key: ${key}`);
    }

    // Get the default values for the specific sub-table of this feature
    const childTableDefaults = saveDataDefaults[childTableName];
    if (childTableDefaults === undefined) {
      error(
        `Failed to find the default copy of the child table "${childTableName}" for key: ${key}`,
      );
    }

    // Make a new copy of the default child table
    const childTableDefaultsTable = childTableDefaults as unknown as LuaTable;
    const childTableDefaultsTableCopy = tableUtils.copy(
      childTableDefaultsTable,
    );
    const childTableDefaultsCopy =
      childTableDefaultsTableCopy as unknown as Record<string, unknown>;

    // Blow away the existing child table with all default values
    saveData[childTableName] = childTableDefaultsCopy;
  }
}

// TODO interaction with "save#.dat"
// TODO convert Maps to LuaTables
