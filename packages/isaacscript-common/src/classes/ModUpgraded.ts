import { ModCallback } from "isaac-typescript-definitions";
import { ModCallbackCustom } from "../enums/ModCallbackCustom";
import { AddCallbackParameterCustom } from "../interfaces/private/AddCallbackParameterCustom";
import { CALLBACK_REGISTER_FUNCTIONS } from "../objects/callbackRegisterFunctions";

/**
 * `isaacscript-common` has many custom callbacks that you can use in your mods. Instead of
 * hijacking the vanilla `Mod` object, we provide a `ModUpgraded` object for you to use, which
 * extends the base class and adds a new method of `AddCallbackCustom`.
 *
 * To upgrade your mod, use the `upgradeMod` helper function.
 */
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

  /**
   * This method does not care about the tertiary argument. Regardless of the conditions of how you
   * registered the callback, it will be removed.
   */
  RemoveCallback<T extends ModCallback>(
    modCallback: T,
    callback: AddCallbackParameter[T][0],
  ): void {
    this.Mod.RemoveCallback(modCallback, callback);
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
    callbackRegisterFunction(...args);
  }
}
