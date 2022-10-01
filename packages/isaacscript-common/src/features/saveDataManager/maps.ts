import { SaveData } from "../../interfaces/SaveData";
import { AnyClass } from "../../types/AnyClass";

/**
 * The save data map is indexed by subscriber name. We use Lua tables instead of TypeScriptToLua
 * Maps for the master map so that we can access the variables via the in-game console when
 * debugging. (TSTL Maps don't expose the map keys as normal keys.)
 */
export const saveDataMap = new LuaMap<string, SaveData>();

/**
 * When mod feature data is initialized, we copy the initial values into a separate map so that we
 * can restore them later on.
 */
export const saveDataDefaultsMap = new LuaMap<string, SaveData>();

/**
 * Each mod feature can optionally provide a function that can control whether or not the save data
 * is written to disk.
 */
export const saveDataConditionalFuncMap = new LuaMap<string, () => boolean>();

/**
 * We backup some save data keys on every new room for the purposes of restoring it when Glowing
 * Hour Glass is used.
 *
 * Note that the save data is backed up in serialized form so that we can use the `merge` function
 * to restore it.
 */
export const saveDataGlowingHourGlassMap = new LuaMap<string, SaveData>();

/**
 * End-users can register their classes with the save data manager for proper serialization when
 * contained in nested maps, sets, and arrays.
 */
export const saveDataManagerUserClasses = new LuaMap<string, AnyClass>();
