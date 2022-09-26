import { ModCallback } from "isaac-typescript-definitions";
import { getCallbacks } from "../callbacks";
import { ISCFeature } from "../enums/ISCFeature";
import { ModCallbackCustom } from "../enums/ModCallbackCustom";
import { ModCallbackCustom2 } from "../enums/ModCallbackCustom2";
import { getFeatures } from "../features";
import {
  saveDataManager,
  saveDataManagerRemove,
} from "../features/saveDataManager/exports";
import { getTime } from "../functions/debugFunctions";
import { getParentFunctionDescription } from "../functions/log";
import { getTSTLClassMethods, getTSTLClassName } from "../functions/tstlClass";
import { AddCallbackParametersCustom } from "../interfaces/private/AddCallbackParametersCustom";
import { AddCallbackParametersCustom2 } from "../interfaces/private/AddCallbackParametersCustom2";
import { CALLBACK_REGISTER_FUNCTIONS } from "../objects/callbackRegisterFunctions";
import { FunctionTuple } from "../types/FunctionTuple";
import { Feature } from "./private/Feature";

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
   * referenced.
   */
  public Name: string;

  // ----------------
  // Custom variables
  // ----------------

  /** We store a copy of the original mod object so that we can re-implement its functions. */
  private mod: Mod;

  private debug: boolean;
  private timeThreshold: float | undefined;

  private callbacks;

  // Features must be marked as internal to prevent TypeDoc from complaining.
  /** @internal */
  private features;

  // -----------
  // Constructor
  // -----------

  constructor(mod: Mod, debug: boolean, timeThreshold?: float) {
    this.Name = mod.Name;
    this.mod = mod;
    this.debug = debug;
    this.timeThreshold = timeThreshold;
    this.callbacks = getCallbacks();
    this.features = getFeatures(this.callbacks);
  }

  // ---------------
  // Vanilla methods
  // ---------------

  /**
   * Registers a function to be executed when an in-game event happens. For example, the
   * `ModCallback.POST_UPDATE` event corresponds to being executed once at the end of every game
   * logic frame.
   */
  public AddCallback<T extends ModCallback>(
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

  /** Returns whether or not a corresponding "save#.dat" file exists for the current mod. */
  public HasData(): boolean {
    return this.mod.HasData();
  }

  /**
   * Returns a string containing all of the data inside of the corresponding "save#.dat" file for
   * this mod.
   */
  public LoadData(): string {
    return this.mod.LoadData();
  }

  /**
   * Unregisters a function that was previously registered with the `AddCallback` method.
   *
   * This method does not care about the tertiary argument. In other words, regardless of the
   * conditions of how you registered the callback, it will be removed.
   */
  public RemoveCallback<T extends ModCallback>(
    modCallback: T,
    callback: AddCallbackParameters[T][0],
  ): void {
    this.mod.RemoveCallback(modCallback, callback);
  }

  /** Deletes the corresponding "save#.dat" file for this mod, if it exists. */
  public RemoveData(): void {
    this.mod.RemoveData();
  }

  /**
   * Creates or updates the corresponding "save#.dat" file for this mod with the provided string.
   */
  public SaveData(data: string): void {
    this.mod.SaveData(data);
  }

  // ---------------------
  // Custom public methods
  // ---------------------

  /**
   * Registers a function to be executed when an in-game event happens. This method is specifically
   * for events that are provided by the IsaacScript standard library. For example, the
   * `ModCallbackCustom.POST_BOMB_EXPLODE` event corresponds to when a bomb explodes.
   */
  // eslint-disable-next-line class-methods-use-this
  public AddCallbackCustom<T extends ModCallbackCustom>(
    modCallbackCustom: T,
    ...args: AddCallbackParametersCustom[T]
  ): void {
    const callbackRegisterFunction =
      CALLBACK_REGISTER_FUNCTIONS[modCallbackCustom];
    callbackRegisterFunction(...args);
  }

  /** Adds a callback in the new callback system format. This method is only temporary. */
  public AddCallbackCustom2<T extends ModCallbackCustom2>(
    modCallbackCustom: T,
    ...args: AddCallbackParametersCustom2[T]
  ): void {
    const callbackClass = this.callbacks[modCallbackCustom];
    // @ts-expect-error The compiler is not smart enough to figure out that the parameters match.
    callbackClass.add(...args);
    this.initFeature(callbackClass);
  }

  /**
   * Unregisters a function that was previously registered with the `AddCallbackCustom` method.
   *
   * This method does not care about the tertiary argument. In other words, regardless of the
   * conditions of how you registered the callback, it will be removed.
   */
  public RemoveCallbackCustom<T extends ModCallbackCustom2>(
    modCallbackCustom: T,
    callback: AddCallbackParametersCustom2[T][0],
  ): void {
    const callbackClass = this.callbacks[modCallbackCustom];
    // @ts-expect-error The compiler is not smart enough to figure out that the parameters match.
    callbackClass.remove(callback);
    if (!callbackClass.hasSubscriptions()) {
      this.uninitFeature(callbackClass);
    }
  }

  /**
   * This method should only be used by the `upgradeMod` function. Returns the class methods from
   * the features that were added.
   */
  public initOptionalFeature(feature: ISCFeature): FunctionTuple[] {
    const featureClass = this.features[feature];
    this.initFeature(featureClass);

    return getTSTLClassMethods(featureClass);
  }

  // ----------------------
  // Custom private methods
  // ----------------------

  /** This is used to initialize both custom callbacks and "extra features". */
  private initFeature(feature: Feature): void {
    if (feature.initialized) {
      return;
    }
    feature.initialized = true;

    if (feature.featuresUsed !== undefined) {
      for (const featureUsed of feature.featuresUsed) {
        const featureClass = this.features[featureUsed];
        this.initFeature(featureClass);
      }
    }

    if (feature.callbacksUsed !== undefined) {
      for (const callbackTuple of feature.callbacksUsed) {
        const [modCallback, callbackArgs] = callbackTuple;
        this.AddCallback(modCallback, ...callbackArgs);
      }
    }

    if (feature.customCallbacksUsed !== undefined) {
      for (const callbackTuple of feature.customCallbacksUsed) {
        const [modCallback, callbackArgs] = callbackTuple;
        this.AddCallbackCustom2(modCallback, ...callbackArgs);
      }
    }

    if (feature.v !== undefined) {
      const className = getTSTLClassName(feature);
      if (className === undefined) {
        error("Failed to get the name of a feature.");
      }
      saveDataManager(className, feature.v);
    }
  }

  private uninitFeature(feature: Feature): void {
    if (!feature.initialized) {
      return;
    }
    feature.initialized = false;

    if (feature.featuresUsed !== undefined) {
      for (const featureUsed of feature.featuresUsed) {
        const featureClass = this.features[featureUsed];
        this.uninitFeature(featureClass);
      }
    }

    if (feature.callbacksUsed !== undefined) {
      for (const callbackTuple of feature.callbacksUsed) {
        const [modCallback, callbackArgs] = callbackTuple;
        const callback = callbackArgs[0];
        this.RemoveCallback(modCallback, callback);
      }
    }

    if (feature.customCallbacksUsed !== undefined) {
      for (const callbackTuple of feature.customCallbacksUsed) {
        const [modCallback, callbackArgs] = callbackTuple;
        const callback = callbackArgs[0];
        this.RemoveCallbackCustom(modCallback, callback);
      }
    }

    if (feature.v !== undefined) {
      const className = getTSTLClassName(feature);
      if (className === undefined) {
        error("Failed to get the name of a feature.");
      }
      saveDataManagerRemove(className);
    }
  }
}
