// Functions from the "resources/scripts/main.lua" file

import Mod from "./Mod";

/** @noSelf */
declare global {
  function RegisterMod(modName: string, APIVersion: int): Mod;
  function StartDebug(): void;
}
