import path from "path";
import { MAIN_LUA } from "./constants";
import * as file from "./file";

const mainLuaHeader = `-- This Isaac mod was created with the IsaacScript tool.
-- The Lua code in this file was automatically generated from higher-level TypeScript code and might
-- be hard to read. If you want to understand how the code in this mod works, you should read the
-- actual TypeScript source code directly instead of trying to parse this file. Usually, the link to
-- the source code can be found in the mod's description on the Steam Workshop. If not, you can ask
-- the mod author directly if the source code is publicly available.
-- IsaacScript provides a lot of advantages over using raw Lua. For more information about the tool,
-- see the official website: https://isaacscript.github.io/

`;

// Some TSTL objects (such as Map and Set) are written as global variables,
// which can cause multiple mods written with IsaacScript to trample on one another
// Until TSTL has an official fix, monkey patch this
// We also make sure of this function to compose a stock comment header for curious people looking
// at the transpiled Lua code
export function monkeyPatchMainLua(targetModDirectory: string): void {
  const mainLuaPath = path.join(targetModDirectory, MAIN_LUA);
  let mainLua = file.read(mainLuaPath);

  mainLua = mainLua.replace(
    "WeakMap = (function",
    "WeakMap = WeakMap or (function",
  );
  mainLua = mainLua.replace(
    "WeakSet = (function",
    "WeakSet = WeakSet or (function",
  );
  mainLua = mainLua.replace("Map = (function", "Map = Map or (function");
  mainLua = mainLua.replace("Set = (function", "Set = Set or (function");

  mainLua = mainLuaHeader + mainLua;

  file.write(mainLuaPath, mainLua);
}
