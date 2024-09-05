import * as jsonLua from "../lib/jsonLua";
import { logError } from "./log";

function tryDecode(this: void, jsonString: string) {
  return jsonLua.decode(jsonString) as LuaMap<AnyNotNil, unknown>;
}

function tryEncode(this: void, luaTable: unknown) {
  return jsonLua.encode(luaTable);
}

/**
 * Converts a JSON string to a Lua table.
 *
 * In most cases, this function will be used for reading data from a "save#.dat" file. If decoding
 * fails, it will return undefined instead of throwing an error. (This allows execution to continue
 * in cases where users have no current save data or have manually removed their existing save
 * data.)
 *
 * Under the hood, this uses a custom JSON parser that was measured to be 11.8 times faster than the
 * vanilla JSON parser.
 */
export function jsonDecode(
  jsonString: string,
): LuaMap<AnyNotNil, unknown> | undefined {
  const [ok, luaTableOrErrMsg] = pcall(tryDecode, jsonString);
  if (!ok) {
    // Instead of throwing an error, continue execution of the callback.
    logError(`Failed to convert the JSON string to a Lua table: ${jsonString}`);
    return undefined;
  }

  return luaTableOrErrMsg;
}

/**
 * Converts a Lua table to a JSON string.
 *
 * In most cases, this function will be used for writing data to a "save#.dat" file. If encoding
 * fails, it will throw an error to prevent writing a blank string or corrupted data to a user's
 * "save#.dat" file.
 *
 * Under the hood, this uses a custom JSON parser that was measured to be 11.8 times faster than the
 * vanilla JSON parser.
 */
export function jsonEncode(luaTable: unknown): string {
  const [ok, jsonStringOrErrMsg] = pcall(tryEncode, luaTable);
  if (!ok) {
    error(`Failed to convert the Lua table to JSON: ${jsonStringOrErrMsg}`);
  }

  return jsonStringOrErrMsg;
}
