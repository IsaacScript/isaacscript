import { CallbackPriority, ModCallback } from "isaac-typescript-definitions";
import { getCallbacks } from "../callbacks";
import { EXPORTED_METHOD_NAMES_KEY } from "../decorators";
import { ISCFeature } from "../enums/ISCFeature";
import { ModCallbackCustom } from "../enums/ModCallbackCustom";
import { getFeatures } from "../features";
import { getElapsedTimeSince, getTime } from "../functions/debugFunctions";
import { isEnumValue } from "../functions/enums";
import { getParentFunctionDescription, log } from "../functions/log";
import {
  getTSTLClassConstructor,
  getTSTLClassName,
} from "../functions/tstlClass";
import { parseIntSafe } from "../functions/types";
import { assertDefined } from "../functions/utils";
import type { AddCallbackParametersCustom } from "../interfaces/private/AddCallbackParametersCustom";
import type { ModUpgradedInterface } from "../interfaces/private/ModUpgradedInterface";
import type { AnyFunction } from "../types/AnyFunction";
import type { FunctionTuple } from "../types/FunctionTuple";
import type { Feature } from "./private/Feature";

/**
 * `isaacscript-common` has many custom callbacks that you can use in your mods. Instead of
 * hijacking the vanilla `Mod` object, we provide a `ModUpgraded` object for you to use, which
 * extends the base class and adds a new method of `AddCallbackCustom`.
 *
 * To upgrade your mod, use the `upgradeMod` helper function.
 *
 * By specifying one or more optional features when upgrading your mod, you will get a version of
 * `ModUpgraded` that has extra methods corresponding to the features that were specified. (This
 * corresponds to the internal-type `ModUpgradedWithFeatures` type, which extends `ModUpgraded`.)
 */
export class ModUpgraded implements Mod {
  // -----------------
  // Vanilla variables
  // -----------------

  public Name: string;

  // ----------------
  // Custom variables
  // ----------------

  /** We store a copy of the original mod object so that we can re-implement its functions. */
  private readonly mod: Mod;

  private readonly debug: boolean;
  private readonly timeThreshold: float | undefined;

  private readonly callbacks;
  private readonly features;

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

  public AddCallback<T extends keyof AddCallbackParameters | string>(
    modCallback: T,
    ...args: T extends keyof AddCallbackParameters
      ? AddCallbackParameters[T]
      : unknown[]
  ): void {
    this.AddPriorityCallback(modCallback, CallbackPriority.DEFAULT, ...args);
  }

  public AddPriorityCallback<T extends keyof AddCallbackParameters | string>(
    modCallback: T,
    priority: CallbackPriority | int,
    ...args: T extends keyof AddCallbackParameters
      ? AddCallbackParameters[T]
      : unknown[]
  ): void {
    if (this.debug) {
      const callback = args[0];
      const optionalArg = args[1];

      const parentFunctionDescription = getParentFunctionDescription();
      const customCallback = type(modCallback) === "string";
      const callbackName = customCallback
        ? `${modCallback} (custom callback)`
        : `ModCallback.${ModCallback[modCallback as ModCallback]}`;
      const signature =
        parentFunctionDescription === undefined
          ? callbackName
          : `${parentFunctionDescription} - ${callbackName}`;

      /**
       * We don't use the "log" helper function here since it will always show the same "unknown"
       * prefix.
       */
      const callbackWithLogger: typeof callback = (
        // @ts-expect-error The compiler is not smart enough to know that the callback args should
        // match the callback.
        ...callbackArgs: Parameters<typeof callback>
      ) => {
        const startTime = getTime();
        Isaac.DebugString(`${signature} - START`);

        // @ts-expect-error The compiler is not smart enough to know that the callback args should
        // match the callback.
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        const returnValue = callback(...callbackArgs);

        const elapsedTime = getElapsedTimeSince(startTime);
        if (
          this.timeThreshold === undefined ||
          this.timeThreshold <= elapsedTime
        ) {
          Isaac.DebugString(`${signature} - END - time: ${elapsedTime}`);
        } else {
          Isaac.DebugString(`${signature} - END`);
        }

        // eslint-disable-next-line @typescript-eslint/no-unsafe-return
        return returnValue;
      };

      const newArgs = [callbackWithLogger, optionalArg];
      // @ts-expect-error The compiler is not smart enough to know that the callback args should
      // match the callback.
      this.mod.AddPriorityCallback(modCallback, priority, ...newArgs);
    } else {
      this.mod.AddPriorityCallback(modCallback, priority, ...args);
    }
  }

  public HasData(): boolean {
    return this.mod.HasData();
  }

  public LoadData(): string {
    return this.mod.LoadData();
  }

  public RemoveCallback<T extends ModCallback>(
    modCallback: T,
    callback: AddCallbackParameters[T][0],
  ): void {
    this.mod.RemoveCallback(modCallback, callback);
  }

  public RemoveData(): void {
    this.mod.RemoveData();
  }

  public SaveData(data: string): void {
    this.mod.SaveData(data);
  }

  // ---------------------
  // Custom public methods
  // ---------------------

  /**
   * Registers a function to be executed when an in-game event happens.
   *
   * This method is specifically for events that are provided by the IsaacScript standard library.
   * For example, the `ModCallbackCustom.POST_BOMB_EXPLODE` event corresponds to when a bomb
   * explodes.
   */
  public AddCallbackCustom<T extends ModCallbackCustom>(
    modCallbackCustom: T,
    ...args: AddCallbackParametersCustom[T]
  ): void {
    this.AddPriorityCallbackCustom(
      modCallbackCustom,
      CallbackPriority.DEFAULT,
      ...args,
    );
  }

  /**
   * The same as the `ModUpgraded.AddCallbackCustom` method, but allows setting a custom priority.
   * By default, callbacks are added with a priority of 0, so this allows you to add early or late
   * callbacks as necessary. See the `CallbackPriority` enum.
   */
  public AddPriorityCallbackCustom<T extends ModCallbackCustom>(
    modCallbackCustom: T,
    priority: CallbackPriority | int,
    ...args: AddCallbackParametersCustom[T]
  ): void {
    const callbackClass = this.callbacks[modCallbackCustom];
    // @ts-expect-error The compiler is not smart enough to figure out that the parameters match.
    // eslint-disable-next-line isaacscript/require-variadic-function-argument
    callbackClass.addSubscriber(priority, ...args);
    this.initFeature(callbackClass);
  }

  /**
   * Unregisters a function that was previously registered with the `AddCallbackCustom` method.
   *
   * This method is specifically for events that are provided by the IsaacScript standard library.
   * For example, the `ModCallbackCustom.POST_BOMB_EXPLODE` event corresponds to when a bomb
   * explodes.
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

      const modCallbackCustom = parseIntSafe(modCallbackCustomString);
      assertDefined(
        modCallbackCustom,
        `Failed to convert the string "${modCallbackCustomString}" representing a "ModCallbackCustom" value to a number.`,
      );

      if (!isEnumValue(modCallbackCustom, ModCallbackCustom)) {
        error(
          `Failed to convert the number ${modCallbackCustom} to a "ModCallbackCustom" value.`,
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

      const iscFeature = parseIntSafe(iscFeatureString);
      assertDefined(
        iscFeature,
        `Failed to convert the string "${iscFeatureString}" representing a "ISCFeature" value to a number.`,
      );

      if (!isEnumValue(iscFeature, ISCFeature)) {
        error(
          `Failed to convert the number ${iscFeature} to a "ISCFeature" value.`,
        );
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
        const [modCallback, callbackFunc, optionalArgs] = callbackTuple;
        // TypeScript is not smart enough to know that the arguments match the function.
        (this.AddPriorityCallback as AnyFunction)(
          modCallback,
          CallbackPriority.IMPORTANT,
          callbackFunc,
          ...(optionalArgs ?? []),
        );
      }
    }

    if (feature.customCallbacksUsed !== undefined) {
      for (const callbackTuple of feature.customCallbacksUsed) {
        const [modCallback, callbackFunc, optionalArgs] = callbackTuple;
        // TypeScript is not smart enough to know that the arguments match the function.
        (this.AddPriorityCallbackCustom as AnyFunction)(
          modCallback,
          CallbackPriority.IMPORTANT,
          callbackFunc,
          ...(optionalArgs ?? []),
        );
      }
    }

    if (feature.v !== undefined) {
      const className = getTSTLClassName(feature);
      assertDefined(className, "Failed to get the name of a feature.");

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
        const [modCallback, callbackFunc] = callbackTuple;
        this.RemoveCallback(modCallback, callbackFunc);
      }
    }

    if (feature.customCallbacksUsed !== undefined) {
      for (const callbackTuple of feature.customCallbacksUsed) {
        const [modCallback, callbackFunc] = callbackTuple;
        this.RemoveCallbackCustom(modCallback, callbackFunc);
      }
    }

    if (feature.v !== undefined) {
      const className = getTSTLClassName(feature);
      assertDefined(className, "Failed to get the name of a feature.");

      const saveDataManagerClass = this.features[ISCFeature.SAVE_DATA_MANAGER];
      saveDataManagerClass.saveDataManagerRemove(className);
    }
  }

  /**
   * Returns the names of the exported class methods from the features that were added. This is
   * called from the "upgradeMod" function, but we want to mark it as private so that end-users
   * don't have access to it.
   */
  private initOptionalFeature(feature: ISCFeature): readonly FunctionTuple[] {
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
function getExportedMethodsFromFeature(
  featureClass: unknown,
): readonly FunctionTuple[] {
  const constructor = getTSTLClassConstructor(featureClass) as Record<
    string,
    unknown
  >;
  const exportedMethodNames = constructor[EXPORTED_METHOD_NAMES_KEY] as
    | string[]
    | undefined;

  if (exportedMethodNames === undefined) {
    return [];
  }

  return exportedMethodNames.map((name) => {
    const featureClassRecord = featureClass as Record<string, AnyFunction>;

    // We cannot split out the method to a separate variable or else the "self" parameter will not
    // be properly passed to the method.
    if (featureClassRecord[name] === undefined) {
      error(`Failed to find a decorated exported method: ${name}`);
    }

    // In order for "this" to work properly in the method, we have to wrap the method invocation in
    // an arrow function.
    const wrappedMethod = (...args: readonly unknown[]) =>
      // We use a non-null assertion since we have already validated that the function exists. (See
      // the above comment.)
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      featureClassRecord[name]!(...args);

    return [name, wrappedMethod];
  });
}
