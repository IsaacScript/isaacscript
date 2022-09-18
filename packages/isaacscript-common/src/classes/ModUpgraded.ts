import { ModCallback } from "isaac-typescript-definitions";
import { ModCallbackCustom } from "../enums/ModCallbackCustom";
import { getTime } from "../functions/benchmark";
import { getParentFunctionDescription } from "../functions/log";
import { AddCallbackParameterCustom } from "../interfaces/private/AddCallbackParameterCustom";
import { CALLBACK_REGISTER_FUNCTIONS } from "../objects/callbackRegisterFunctions";

/**
 * `isaacscript-common` has many custom callbacks that you can use in your mods. Instead of
 * hijacking the vanilla `Mod` object, we provide a `ModUpgraded` object for you to use, which
 * extends the base class and adds a new method of `AddCallbackCustom`. (There is no corresponding
 * `RemoveCallbackCustom`.)
 *
 * To upgrade your mod, use the `upgradeMod` helper function.
 */
export class ModUpgraded implements Mod {
  // -----------------
  // Vanilla variables
  // -----------------

  /**
   * The vanilla mod object stores the name of the mod for some reason. (It is never used or
   * referenced.
   */
  Name: string;

  // ----------------
  // Custom variables
  // ----------------

  /** We store a copy of the original mod object so that we can re-implement its functions. */
  Mod: Mod;

  Debug: boolean;
  TimeThreshold: float | undefined;

  constructor(mod: Mod, debug: boolean, timeThreshold?: float) {
    this.Name = mod.Name;
    this.Mod = mod;
    this.Debug = debug;
    this.TimeThreshold = timeThreshold;
  }

  // ---------------
  // Vanilla methods
  // ---------------

  AddCallback<T extends ModCallback>(
    modCallback: T,
    ...args: AddCallbackParameter[T]
  ): void {
    if (this.Debug) {
      const callback = args[0];
      const optionalArg = args[1];

      const parentFunctionDescription = getParentFunctionDescription();
      const callbackName = `ModCallback.${ModCallback[modCallback]}`;
      const signature =
        parentFunctionDescription === undefined
          ? callbackName
          : `${parentFunctionDescription} - ${callbackName}`;

      /**
       * We don't use the "log" helper function since it will always show the same "unknown" prefix.
       */
      const callbackWithLogger = (...callbackArgs: unknown[]) => {
        const startTime = getTime();
        Isaac.DebugString(`${signature} - START`);

        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        callback(...callbackArgs);

        const endTime = getTime();
        const elapsedTime = endTime - startTime;
        if (
          this.TimeThreshold === undefined ||
          this.TimeThreshold >= elapsedTime
        ) {
          Isaac.DebugString(`${signature} - END - time: ${elapsedTime}`);
        } else {
          Isaac.DebugString(`${signature} - END`);
        }
      };

      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      this.Mod.AddCallback(modCallback, callbackWithLogger, optionalArg);
    } else {
      this.Mod.AddCallback(modCallback, ...args);
    }
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
