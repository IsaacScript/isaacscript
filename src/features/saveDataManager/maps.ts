/* eslint-disable sort-exports/sort-exports */

import { SaveData } from "../../types/private/SaveData";

// The save data map is indexed by subscriber name
// We use Lua tables instead of TypeScriptToLua Maps for the master map so that we can access the
// variables via the in-game console when debugging
// (TSTL Maps don't expose the map keys as normal keys)
export const saveDataMap = new LuaTable<string, SaveData>();
export const saveDataDefaultsMap = new LuaTable<string, SaveData>();
export const saveDataConditionalFuncMap = new Map<string, () => boolean>();
