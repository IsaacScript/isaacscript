import { ModCallback } from "isaac-typescript-definitions";
import { getCallbacks } from "../callbacks";
import { EXPORTED_METHOD_NAMES_KEY } from "../decorators";
import { ISCFeature } from "../enums/ISCFeature";
import { ModCallbackCustom } from "../enums/ModCallbackCustom";
import { getFeatures } from "../features";
import { getTime } from "../functions/debugFunctions";
import { getParentFunctionDescription, log } from "../functions/log";
import {
  getTSTLClassConstructor,
  getTSTLClassName,
} from "../functions/tstlClass";
import { AddCallbackParametersCustom } from "../interfaces/private/AddCallbackParametersCustom";
import { ModUpgradedInterface } from "../interfaces/private/ModUpgradedInterface";
import { AnyFunction } from "../types/AnyFunction";
import { FunctionTuple } from "../types/FunctionTuple";
import { Feature } from "./private/Feature";

/**
 * `isaacscript-common` has many custom callbacks that you can use in your mods. Instead of
 * hijacking the vanilla `Mod` object, we provide a `ModUpgraded` object for you to use, which
 * extends the base class and adds a new method of `AddCallbackCustom`.
 *
 * To upgrade your mod, use the `upgradeMod` helper function.
 *
 * `ModUpgradedBase` provides the core functionality of the `ModUpgraded` class. (It does not
 * include the methods for the individual ISC features.)
 */
export class ModUpgradedBase implements Mod {
  // -----------------
  // Vanilla variables
  // -----------------

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
    this.features = getFeatures(
      this as unknown as ModUpgradedInterface,
      this.callbacks,
    );
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
  public AddCallbackCustom<T extends ModCallbackCustom>(
    modCallbackCustom: T,
    ...args: AddCallbackParametersCustom[T]
  ): void {
    const callbackClass = this.callbacks[modCallbackCustom];
    // @ts-expect-error The compiler is not smart enough to figure out that the parameters match.
    callbackClass.addSubscriber(...args);
    this.initFeature(callbackClass);
  }

  /**
   * Unregisters a function that was previously registered with the `AddCallbackCustom` method.
   *
   * This method does not care about the tertiary argument. In other words, regardless of the
   * conditions of how you registered the callback, it will be removed.
   */
  public RemoveCallbackCustom<T extends ModCallbackCustom>(
    modCallbackCustom: T,
    callback: AddCallbackParametersCustom[T][0],
  ): void {
    const callbackClass = this.callbacks[modCallbackCustom];
    // @ts-expect-error The compiler is not smart enough to figure out that the parameters match.
    callbackClass.removeSubscriber(callback);
    this.uninitFeature(callbackClass);
  }

  /**
   * Logs every custom callback or extra feature that is currently enabled. Useful for debugging or
   * profiling.
   */
  public logUsedFeatures(): void {
    // Custom callbacks
    for (const [modCallbackCustomString, callbackClass] of Object.entries(
      this.callbacks,
    )) {
      if (callbackClass.numConsumers === 0) {
        continue;
      }

      const modCallbackCustom = tonumber(modCallbackCustomString);
      if (modCallbackCustom === undefined) {
        error(
          "Failed to convert an index on the callbacks object to a number.",
        );
      }

      log(
        `- ModCallbackCustom.${ModCallbackCustom[modCallbackCustom]} (${modCallbackCustom})`,
      );
    }

    // Extra features
    for (const [iscFeatureString, featureClass] of Object.entries(
      this.features,
    )) {
      if (featureClass.numConsumers === 0) {
        continue;
      }

      const iscFeature = tonumber(iscFeatureString);
      if (iscFeature === undefined) {
        error("Failed to convert an index on the features object to a number.");
      }

      log(`- ISCFeature.${ISCFeature[iscFeature]} (${iscFeature})`);
    }
  }

  // ----------------------
  // Custom private methods
  // ----------------------

  /**
   * This is used to initialize both custom callbacks and "extra features".
   *
   * This mirrors the `uninitFeature` method.
   */
  private initFeature(feature: Feature): void {
    feature.numConsumers++;

    if (feature.initialized) {
      return;
    }

    feature.initialized = true;

    if (feature.v !== undefined) {
      if (feature.featuresUsed === undefined) {
        feature.featuresUsed = [];
      }
      if (!feature.featuresUsed.includes(ISCFeature.SAVE_DATA_MANAGER)) {
        feature.featuresUsed.unshift(ISCFeature.SAVE_DATA_MANAGER);
      }
    }

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
        this.AddCallbackCustom(modCallback, ...callbackArgs);
      }
    }

    if (feature.v !== undefined) {
      const className = getTSTLClassName(feature);
      if (className === undefined) {
        error("Failed to get the name of a feature.");
      }
      const saveDataManagerClass = this.features[ISCFeature.SAVE_DATA_MANAGER];
      saveDataManagerClass.saveDataManager(
        className,
        feature.v,
        feature.vConditionalFunc,
      );
    }
  }

  /**
   * This is used to uninitialize both custom callbacks and "extra features".
   *
   * This mirrors the `initFeature` method.
   */
  private uninitFeature(feature: Feature): void {
    if (feature.numConsumers <= 0) {
      const className = getTSTLClassName(feature) ?? "unknown";
      error(
        `Failed to uninit feature "${className}" since it has ${feature.numConsumers} consumers, which should never happen.`,
      );
    }

    if (!feature.initialized) {
      const className = getTSTLClassName(feature) ?? "unknown";
      error(
        `Failed to uninit feature "${className}" since it was not initialized, which should never happen.`,
      );
    }

    feature.numConsumers--;

    if (feature.numConsumers > 0) {
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
      const saveDataManagerClass = this.features[ISCFeature.SAVE_DATA_MANAGER];
      saveDataManagerClass.saveDataManagerRemove(className);
    }
  }

  /**
   * Returns the names of the exported class methods from the features that were added. This is
   * called from the "upgradeMod" function, but we want to mark it as private so that end-users
   * don't have access to it..
   */
  private initOptionalFeature(feature: ISCFeature): FunctionTuple[] {
    const featureClass = this.features[feature];
    this.initFeature(featureClass);

    return getExportedMethodsFromFeature(featureClass);
  }
}

/**
 * In this context, "exported" methods are methods that are annotated with the "@Exported"
 * decorator, which signify that the method should be attached to the `ModUpgraded` class.
 *
 * Exported methods are stored in an internal static array on the class that is created by the
 * decorator.
 */
function getExportedMethodsFromFeature(featureClass: unknown): FunctionTuple[] {
  const constructor = getTSTLClassConstructor(featureClass) as Record<
    string,
    unknown
  >;
  const exportedMethodNames = constructor[EXPORTED_METHOD_NAMES_KEY] as
    | string[]
    | undefined;

  if (exportedMethodNames === undefined) {
    const tstlClassName = getTSTLClassName(featureClass) ?? "Unknown";
    error(
      `Failed to find the exported method names for the class of "${tstlClassName}". This probably means that it does not have any public methods that are tagged with the @Exported decorator. Ensure that this class has at least one export.`,
    );
  }

  return exportedMethodNames.map((name) => {
    const featureClassRecord = featureClass as Record<string, AnyFunction>;
    const method = featureClassRecord[name];
    if (method === undefined) {
      error(`Failed to find a decorated exported method: ${name}`);
    }

    // In order for "this" to work properly in the method, we have to wrap the method invocation in
    // an arrow function.
    const wrappedMethod = (...args: unknown[]) =>
      // We cannot split out the method to a separate variable or else the "self" parameter will not
      // be properly passed to the method.
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      featureClassRecord[name]!(...args);

    return [name, wrappedMethod];
  });
}
