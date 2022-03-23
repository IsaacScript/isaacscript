import * as json from "json";
import { logError } from "./log";

function tryDecode(this: void, jsonString: string) {
  return json.decode(jsonString) as LuaTable;
}

function tryEncode(this: void, table: unknown) {
  return json.encode(table);
}

/**
 * Converts a JSON string to a Lua table.
 * In most cases, this function will be used for reading data from a "save#.dat" file.
 * If decoding fails, it will return a blank Lua table instead of throwing an error.
 * (This allows execution to continue in cases where users have no current save data or have
 * manually removed their existing save data.)
 */
export function jsonDecode(jsonString: string): LuaTable {
  const [ok, luaTableOrErrMsg] = pcall(tryDecode, jsonString);
  if (!ok) {
    // Instead of throwing an error, continue execution of the callback
    logError(`Failed to convert the JSON string to a Lua table: ${jsonString}`);
    return new LuaTable();
  }

  return luaTableOrErrMsg;
}

/**
 * Converts a Lua table to a JSON string.
 * In most cases, this function will be used for writing data to a "save#.dat" file.
 * If encoding fails, it will throw an error to prevent writing a blank string or corrupted data to
 * a user's "save#.dat" file.
 */
export function jsonEncode(table: unknown): string {
  const [ok, jsonStringOrErrMsg] = pcall(tryEncode, table);
  if (!ok) {
    error(`Failed to convert the Lua table to JSON: ${jsonStringOrErrMsg}`);
  }

  return jsonStringOrErrMsg;
}
