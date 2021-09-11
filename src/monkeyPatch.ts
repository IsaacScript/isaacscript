import * as file from "./file";
import path from "path";
import { MAIN_LUA } from "./constants";

// Some TSTL objects (such as Map and Set) are written as global variables,
// which can cause multiple mods written with IsaacScript to trample on one another
// Until TSTL has an official fix, monkey patch this
export function monkeyPatchMainLua(targetModDirectory: string): void {
  const mainLuaPath = path.join(targetModDirectory, MAIN_LUA);
  let mainLua = file.read(mainLuaPath);

  mainLua = mainLua.replace(
    /WeakMap = \(function\(\)/,
    "WeakMap = WeakMap or (function",
  );
  mainLua = mainLua.replace(
    /WeakSet = \(function\(\)/,
    "WeakSet = WeakSet or (function",
  );
  mainLua = mainLua.replace(/Map = \(function\(\)/, "Map = (function");
  mainLua = mainLua.replace(/Set = \(function\(\)/, "Set = (function");

  file.write(mainLuaPath, mainLua);
}
