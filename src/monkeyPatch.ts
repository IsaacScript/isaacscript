import path from "path";
import { MAIN_LUA } from "./constants";
import * as file from "./file";

const INFORMATIONAL_HEADER = `--[[

This Isaac mod was created with the IsaacScript tool.

The Lua code in this file was automatically generated from higher-level TypeScript code and might be
hard to read. If you want to understand how the code in this mod works, you should read the actual
TypeScript source code directly instead of trying to parse this file. Usually, the link to the
source code can be found in the mod's description on the Steam Workshop. If not, you can ask the mod
author directly if the source code is publicly available.

IsaacScript provides a lot of advantages over using raw Lua. For more information about the tool,
see the official website: https://isaacscript.github.io/

--]]

`;

const MAIN_LUA_REPLACEMENTS = [
  // For TSTL v1.2.X-v1.3.3
  // (fixed with GlassBrick's PR)
  ["WeakMap = __TS__Class()", "WeakMap = WeakMap or __TS__Class()"],
  ["WeakSet = __TS__Class()", "WeakSet = WeakSet or __TS__Class()"],
  ["Map = __TS__Class()", "Map = Map or __TS__Class()"],
  ["Set = __TS__Class()", "Set = Set or __TS__Class()"],
];

export function monkeyPatchMainLua(targetModDirectory: string): void {
  const mainLuaPath = path.join(targetModDirectory, MAIN_LUA);
  const mainLua = file.read(mainLuaPath);

  // mainLua = patchInformationalHeader(mainLua);
  // mainLua = patchGlobalObjects(mainLua);

  file.write(mainLuaPath, mainLua);
}

// Add an informational header for people who happen to be browsing the Lua output
// eslint-disable-next-line @typescript-eslint/no-unused-vars
function patchInformationalHeader(mainLua: string) {
  return INFORMATIONAL_HEADER + mainLua;
}

// Some TSTL objects (such as Map and Set) are written as global variables,
// which can cause multiple mods written with IsaacScript to trample on one another
// Until TSTL has an official fix, monkey patch this
// We also make sure of this function to compose a stock comment header for curious people looking
// at the transpiled Lua code
// eslint-disable-next-line @typescript-eslint/no-unused-vars
function patchGlobalObjects(originalMainLua: string) {
  let mainLua = originalMainLua;

  for (const [findString, replaceString] of MAIN_LUA_REPLACEMENTS) {
    mainLua = mainLua.replace(findString, replaceString);
  }

  return mainLua;
}
