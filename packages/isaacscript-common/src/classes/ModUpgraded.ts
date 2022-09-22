import { ModCallback } from "isaac-typescript-definitions";
import { ModCallbackCustom } from "../enums/ModCallbackCustom";
import { ModCallbackCustom2 } from "../enums/ModCallbackCustom2";
import { saveDataManager } from "../features/saveDataManager/exports";
import { getTime } from "../functions/debugFunctions";
import { getParentFunctionDescription } from "../functions/log";
import { getTSTLClassName } from "../functions/tstlClass";
import { AddCallbackParametersCustom } from "../interfaces/private/AddCallbackParametersCustom";
import { AddCallbackParametersCustom2 } from "../interfaces/private/AddCallbackParametersCustom2";
import { CALLBACK_REGISTER_FUNCTIONS } from "../objects/callbackRegisterFunctions";
import { PostAmbushFinished } from "./callbacks/PostAmbushFinished";
import { PostAmbushStarted } from "./callbacks/PostAmbushStarted";
import { PostNewRoomEarly } from "./callbacks/PostNewRoomEarly";
import { PostPitRender } from "./callbacks/PostPitRender";
import { PostSpikesRender } from "./callbacks/PostSpikesRender";
import { CustomCallback } from "./private/CustomCallback";

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

  /**
   * The vanilla mod object stores the name of the mod for some reason. (It is never used or
   * referenced. (We match the casing of the vanilla variable.)
   */
  Name: string;

  // ----------------
  // Custom variables
  // ----------------

  /** We store a copy of the original mod object so that we can re-implement its functions. */
  private mod: Mod;

  private debug: boolean;
  private timeThreshold: float | undefined;

  private callbacks: {
    readonly [key in ModCallbackCustom2]: CustomCallback<key>;
  } = {
    [ModCallbackCustom2.POST_AMBUSH_FINISHED]: new PostAmbushFinished(),
    [ModCallbackCustom2.POST_AMBUSH_STARTED]: new PostAmbushStarted(),
    [ModCallbackCustom2.POST_NEW_ROOM_EARLY]: new PostNewRoomEarly(),
    [ModCallbackCustom2.POST_PIT_RENDER]: new PostPitRender(),
    [ModCallbackCustom2.POST_SPIKES_RENDER]: new PostSpikesRender(),
  };

  // -----------
  // Constructor
  // -----------

  constructor(mod: Mod, debug: boolean, timeThreshold?: float) {
    this.Name = mod.Name;
    this.mod = mod;
    this.debug = debug;
    this.timeThreshold = timeThreshold;
  }

  // ---------------
  // Vanilla methods
  // ---------------

  AddCallback<T extends ModCallback>(
    modCallback: T,
    ...args: AddCallbackParameters[T]
  ): void {
    if (this.debug) {
      const callback = args[0];
      const optionalArg = args[1];

      const parentFunctionDescription = getParentFunctionDescription();
      const callbackName = `ModCallback.${ModCallback[modCallback]}`;
      const signature =
        parentFunctionDescription === undefined
          ? callbackName
          : `${parentFunctionDescription} - ${callbackName}`;

      /**
       * We don't use the "log" helper function here since it will always show the same "unknown"
       * prefix.
       */
      const callbackWithLogger: typeof callback = (
        ...callbackArgs: Parameters<typeof callback>
      ) => {
        const startTime = getTime();
        Isaac.DebugString(`${signature} - START`);

        // @ts-expect-error The compiler is not smart enough to know that the callback args should
        // match the callback.
        const returnValue = callback(...callbackArgs);

        const endTime = getTime();
        const elapsedTime = endTime - startTime;
        if (
          this.timeThreshold === undefined ||
          this.timeThreshold <= elapsedTime
        ) {
          Isaac.DebugString(`${signature} - END - time: ${elapsedTime}`);
        } else {
          Isaac.DebugString(`${signature} - END`);
        }

        return returnValue;
      };

      const newArgs = [
        callbackWithLogger,
        optionalArg,
      ] as unknown as AddCallbackParameters[T];
      this.mod.AddCallback(modCallback, ...newArgs);
    } else {
      this.mod.AddCallback(modCallback, ...args);
    }
  }

  HasData(): boolean {
    return this.mod.HasData();
  }

  LoadData(): string {
    return this.mod.LoadData();
  }

  /**
   * This method does not care about the tertiary argument. Regardless of the conditions of how you
   * registered the callback, it will be removed.
   */
  RemoveCallback<T extends ModCallback>(
    modCallback: T,
    callback: AddCallbackParameters[T][0],
  ): void {
    this.mod.RemoveCallback(modCallback, callback);
  }

  RemoveData(): void {
    this.mod.RemoveData();
  }

  SaveData(data: string): void {
    this.mod.SaveData(data);
  }

  // --------------
  // Custom methods
  // --------------

  // eslint-disable-next-line class-methods-use-this
  AddCallbackCustom<T extends ModCallbackCustom>(
    modCallbackCustom: T,
    ...args: AddCallbackParametersCustom[T]
  ): void {
    const callbackRegisterFunction =
      CALLBACK_REGISTER_FUNCTIONS[modCallbackCustom];
    callbackRegisterFunction(...args);
  }

  AddCallbackCustom2<T extends ModCallbackCustom2>(
    modCallbackCustom: T,
    ...args: AddCallbackParametersCustom2[T]
  ): void {
    const callback = this.callbacks[modCallbackCustom];
    callback.add(...args);

    if (callback.initialized) {
      return;
    }
    callback.initialized = true;

    if (callback.otherCallbacksUsed !== undefined) {
      for (const callbackTuple of callback.otherCallbacksUsed) {
        const [modCallback, callbackArgs] = callbackTuple;
        this.AddCallback(modCallback, ...callbackArgs);
      }
    }

    if (callback.otherCustomCallbacksUsed !== undefined) {
      for (const callbackTuple of callback.otherCustomCallbacksUsed) {
        const [modCallback, callbackArgs] = callbackTuple;
        this.AddCallbackCustom(modCallback, ...callbackArgs);
      }
    }

    if (callback.v !== undefined) {
      const callbackName = getTSTLClassName(callback);
      if (callbackName === undefined) {
        error(
          `Failed to get the name of the callback: ModCallbackCustom.${ModCallbackCustom2[modCallbackCustom]} (${modCallbackCustom})`,
        );
      }
      saveDataManager(callbackName, callback.v);
    }

    /*
    if (callback.feature !== undefined) {}
    */
  }

  /**
   * This method does not care about the tertiary argument. Regardless of the conditions of how you
   * registered the callback, it will be removed.
   */
  RemoveCallbackCustom<T extends ModCallbackCustom>(
    modCallback: T,
    callback: AddCallbackParametersCustom[T][0],
  ): void {
    // TODO
    print(this, modCallback, callback);
  }
}
