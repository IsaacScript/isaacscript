import type { Config } from "./Config.js";

/** This should match the validation in the `validateMandatoryConfigFields` function. */
export interface ValidatedConfig extends Config {
  modsDirectory: string;
  saveSlot: number;
}
