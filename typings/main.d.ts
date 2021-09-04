// Functions and constants from the "resources/scripts/main.lua" file

export {};

/** @noSelf */
declare global {
  function RegisterMod(modName: string, APIVersion: int): Mod;
  function StartDebug(): void;

  const REPENTANCE: boolean | undefined;
}
