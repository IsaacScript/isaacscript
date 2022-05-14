import { ModCallback } from "isaac-typescript-definitions";
import { ModCallbackCustom } from "../enums/ModCallbackCustom";
import { CALLBACK_REGISTER_FUNCTIONS } from "../objects/callbackRegisterFunctions";
import { AddCallbackParameterCustom } from "../types/AddCallbackParameterCustom";

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

  constructor(mod: Mod) {
    this.Name = mod.Name;

    this.Mod = mod;
  }

  // ---------------
  // Vanilla methods
  // ---------------

  AddCallback<T extends ModCallback>(
    modCallback: T,
    ...args: AddCallbackParameter[T]
  ): void {
    this.Mod.AddCallback(modCallback, ...args);
  }

  HasData(): boolean {
    return this.Mod.HasData();
  }

  LoadData(): string {
    return this.Mod.LoadData();
  }

  RemoveCallback(callbackID: ModCallback, callback: () => void): void {
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
  AddCallbackCustom<T extends ModCallbackCustom>(
    modCallbackCustom: T,
    ...args: AddCallbackParameterCustom[T]
  ): void {
    const callbackRegisterFunction =
      CALLBACK_REGISTER_FUNCTIONS[modCallbackCustom];
    if (callbackRegisterFunction === undefined) {
      error(
        `Failed to find a callback registration function for custom callback: ${modCallbackCustom}`,
      );
    }

    callbackRegisterFunction(...args);
  }
}
