import { ModCallbacksCustom } from "../enums/ModCallbacksCustom";
import { getDebugPrependString } from "../functions/log";
import { CALLBACK_REGISTER_FUNCTIONS } from "../objects/callbackRegisterFunctions";
import { AddCallbackParametersCustom } from "../types/AddCallbackParametersCustom";

/** `isaacscript-common` allows for custom callbacks, so it provides an upgraded Mod object. */
export class ModUpgraded implements Mod {
  // -----------------
  // Vanilla variables
  // -----------------

  Name: string; // The vanilla mod object stores this for some reason

  // ----------------
  // Custom variables
  // ----------------

  /** We store a copy of the original mod object so that we can re-implement its functions. */
  Mod: Mod;

  /** End-users can optionally enable verbose-mode, which helps troubleshoot crashes. */
  Verbose: boolean;

  constructor(mod: Mod, verbose: boolean) {
    this.Name = mod.Name;

    this.Mod = mod;
    this.Verbose = verbose;
  }

  // ---------------
  // Vanilla methods
  // ---------------

  AddCallback<T extends ModCallbacks>(
    modCallbacks: T,
    ...args: AddCallbackParameters[T]
  ): void {
    if (this.Verbose) {
      const callback = args[0] as Function; // eslint-disable-line
      const optionalArg = args[1] as unknown;

      const callbackName = getCallbackName(modCallbacks);
      const debugMsg = getDebugPrependString(callbackName);

      const callbackWithLogger = (...callbackArgs: unknown[]) => {
        Isaac.DebugString(`${debugMsg} - START`);
        const value = callback(...callbackArgs) as unknown;
        Isaac.DebugString(`${debugMsg} - END - ${value}`);
        return value;
      };

      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      this.Mod.AddCallback(modCallbacks, callbackWithLogger, optionalArg);
    } else {
      this.Mod.AddCallback(modCallbacks, ...args);
    }
  }

  HasData(): boolean {
    return this.Mod.HasData();
  }

  LoadData(): string {
    return this.Mod.LoadData();
  }

  RemoveCallback(callbackID: ModCallbacks, callback: () => void): void {
    this.Mod.RemoveCallback(callbackID, callback);
  }

  RemoveData(): void {
    this.Mod.RemoveData();
  }

  SaveData(data: string): void {
    this.Mod.SaveData(data);
  }

  // --------------
  // Custom methods
  // --------------

  // eslint-disable-next-line class-methods-use-this
  AddCallbackCustom<T extends ModCallbacksCustom>(
    modCallbacksCustom: T,
    ...args: AddCallbackParametersCustom[T]
  ): void {
    const callbackRegisterFunction =
      CALLBACK_REGISTER_FUNCTIONS[modCallbacksCustom];
    if (callbackRegisterFunction === undefined) {
      error(
        `Failed to find a callback registration function for custom callback: ${modCallbacksCustom}`,
      );
    }

    // TypeScript 4.5 is unable to resolve these types successfully
    // Remove this hack when TypeScriptToLua upgrades to TypeScript 4.6
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    callbackRegisterFunction(...args);
  }
}

function getCallbackName(callbackID: int) {
  for (const [key, value] of Object.entries(ModCallbacks)) {
    if (value === callbackID) {
      return key;
    }
  }

  return "MC_UNKNOWN";
}
