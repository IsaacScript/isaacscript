import type {
  CallbackPriority,
  ModCallback,
} from "isaac-typescript-definitions";
import type { ModCallbackCustom } from "../enums/ModCallbackCustom";
import { isArray } from "../functions/array";
import {
  getTSTLClassConstructor,
  getTSTLClassName,
} from "../functions/tstlClass";
import { isFunction, isInteger, isTable } from "../functions/types";
import { assertDefined } from "../functions/utils";
import type { TSTLClassMetatable } from "../interfaces/TSTLClassMetatable";
import type { AnyFunction } from "../types/AnyFunction";
import type { ModUpgraded } from "./ModUpgraded";

export const MOD_FEATURE_CALLBACKS_KEY = "__callbacks";
export const MOD_FEATURE_CUSTOM_CALLBACKS_KEY = "__customCallbacks";
const WRAPPED_CALLBACK_METHODS_KEY = "__wrappedCallbackMethods";
const WRAPPED_CUSTOM_CALLBACK_METHODS_KEY = "__wrappedCustomCallbacksMethods";

type ModFeatureConstructor = TSTLClassMetatable["constructor"] & {
  [MOD_FEATURE_CALLBACKS_KEY]:
    | [
        modCallback: ModCallback,
        callbackFunc: AnyFunction,
        parameters: unknown[],
      ]
    | undefined;
  [MOD_FEATURE_CUSTOM_CALLBACKS_KEY]:
    | [
        modCallbackCustom: ModCallbackCustom,
        callbackFunc: AnyFunction,
        parameters: unknown[],
      ]
    | undefined;
  [WRAPPED_CALLBACK_METHODS_KEY]: Map<ModCallback, AnyFunction> | undefined;
  [WRAPPED_CUSTOM_CALLBACK_METHODS_KEY]:
    | Map<ModCallbackCustom, AnyFunction>
    | undefined;
};

/**
 * Helper class for mods that want to represent their individual features as classes. Extend your
 * mod features from this class in order to enable the `@Callback` and `@CustomCallback` decorators
 * that automatically subscribe to callbacks.
 *
 * It is recommended that you use the `initModFeatures` helper function to instantiate all of your
 * mod classes (instead of instantiating them yourself). This is so that any attached `v` objects
 * are properly registered with the save data manager; see below.
 *
 * If you are manually instantiating a mod feature yourself, then:
 *
 * - You must pass your upgraded mod as the first argument to the constructor.
 * - In almost all cases, you will want the callback functions to be immediately subscribed after
 *   instantiating the class. However, if this is not the case, you can pass `false` as the optional
 *   second argument to the constructor.
 *
 * If your mod feature has a property called `v`, it will be assumed that these are variables that
 * should be managed by the save data manager. Unfortunately, due to technical limitations with
 * classes, this registration will only occur if you initialize the class with the `initModFeatures`
 * helper function. (This is because the parent class does not have access to the child's properties
 * upon first construction.)
 */
export class ModFeature {
  private readonly mod: ModUpgraded;

  /**
   * An optional method that allows for conditional callback execution. If specified, any class
   * method that is annotated with a `@Callback` or `@CallbackCustom` decorator will only be fired
   * if the executed conditional function returns true.
   *
   * This property is used to easily turn entire mod features on and off (rather than repeating
   * conditional logic and early returning at the beginning of every callback function).
   *
   * Since the specific information for the firing callback is passed as arguments into the
   * conditional method, you can also write logic that would only apply to a specific type of
   * callback.
   *
   * By default, this is set to null, which means that all callback methods will fire
   * unconditionally. Override this property in your class if you need to use it.
   *
   * The function has the following signature:
   *
   * ```ts
   * <T extends boolean>(
   *   vanilla: T, // Whether this is a vanilla or custom callback.
   *   modCallback: T extends true ? ModCallback : ModCallbackCustom,
   *   ...callbackArgs: unknown[] // This would be e.g. `pickup: EntityPickup` for the `POST_PICKUP_INIT` callback.
   * ) => boolean;
   * ```
   */
  protected shouldCallbackMethodsFire:
    | (<T extends boolean>(
        vanilla: T,
        modCallback: T extends true ? ModCallback : ModCallbackCustom,
        ...callbackArgs: unknown[]
      ) => boolean)
    | null = null;

  /**
   * Whether the feature has registered its callbacks yet.
   *
   * This will almost always be equal to true unless you explicitly passed `false` to the second
   * argument of the constructor.
   */
  public initialized = false;

  constructor(mod: ModUpgraded, init = true) {
    this.mod = mod;

    if (init) {
      this.init();
    }
  }

  /**
   * Runs the `Mod.AddCallback` and `ModUpgraded.AddCallbackCustom` methods for all of the decorated
   * callbacks.
   *
   * @param init Optional. Whether to initialize or uninitialize. Default is true.
   */
  public init(init = true): void {
    if (this.initialized === init) {
      return;
    }
    this.initialized = init;

    const constructor = getTSTLClassConstructor(this);
    assertDefined(
      constructor,
      "Failed to get the TSTL class constructor for a mod feature.",
    );

    const tstlClassName = getTSTLClassName(this);
    assertDefined(
      tstlClassName,
      "Failed to get the TSTL class name for a mod feature.",
    );

    initDecoratedCallbacks(this, constructor, tstlClassName, true, init);
    initDecoratedCallbacks(this, constructor, tstlClassName, false, init);
    initSaveDataManager(this, tstlClassName, init);
  }

  /**
   * Runs the `Mod.RemoveCallback` and `ModUpgraded.RemoveCallbackCustom` methods for all of the
   * decorated callbacks.
   *
   * This is just an alias for `ModFeature.init(false)`.
   */
  public uninit(): void {
    this.init(false);
  }
}

function initDecoratedCallbacks(
  modFeature: ModFeature,
  constructor: TSTLClassMetatable["constructor"],
  tstlClassName: string,
  vanilla: boolean,
  init: boolean,
) {
  const modFeatureConstructor = constructor as ModFeatureConstructor;
  const callbackTuplesKey = vanilla
    ? MOD_FEATURE_CALLBACKS_KEY
    : MOD_FEATURE_CUSTOM_CALLBACKS_KEY;
  const callbackTuples = modFeatureConstructor[callbackTuplesKey];
  if (callbackTuples === undefined) {
    return;
  }

  if (!isArray(callbackTuples)) {
    error(
      `Failed to initialize/uninitialize the decorated callbacks on a mod feature since the callback arguments on the key of "${callbackTuplesKey}" was not an array and was instead of type: ${type(
        callbackTuples,
      )}`,
    );
  }

  for (const callbackTuple of callbackTuples) {
    if (!isArray(callbackTuple)) {
      error(
        `Failed to initialize/uninitialize the decorated callbacks on a mod feature since one of the callback arguments on the key of "${callbackTuplesKey}" was not an array and was instead of type: ${type(
          callbackTuple,
        )}`,
      );
    }

    const modCallback = callbackTuple[0];
    if (!isInteger(modCallback)) {
      error(
        `Failed to get the callback number from the callback tuple for class: ${tstlClassName}`,
      );
    }

    const priority = callbackTuple[1];
    if (!isInteger(priority)) {
      error(
        `Failed to get the callback priority from the callback tuple for class: ${tstlClassName}`,
      );
    }

    const callback = callbackTuple[2];
    if (!isFunction(callback)) {
      error(
        `Failed to get the callback function from the callback tuple for class: ${tstlClassName}`,
      );
    }

    const parameters = callbackTuple[3];
    // We must pass false as the second argument to `isArray` since the callback parameters may not
    // necessarily be contiguous. (They might be separated by `undefined` values.)
    if (!isArray(parameters, false)) {
      error(
        `Failed to get the callback parameters from the callback tuple for class: ${tstlClassName}`,
      );
    }

    // eslint-disable-next-line @typescript-eslint/dot-notation, @typescript-eslint/prefer-destructuring
    const mod = modFeature["mod"];

    if (init) {
      addCallback(
        modFeature,
        modFeatureConstructor,
        mod,
        modCallback, // eslint-disable-line isaacscript/strict-enums
        priority,
        callback,
        parameters,
        vanilla,
      );
    } else {
      removeCallback(
        modFeatureConstructor,
        mod,
        modCallback, // eslint-disable-line isaacscript/strict-enums
        vanilla,
      );
    }
  }
}

function addCallback(
  modFeature: ModFeature,
  modFeatureConstructor: ModFeatureConstructor,
  mod: ModUpgraded,
  modCallback: ModCallback | ModCallbackCustom,
  priority: CallbackPriority | int,
  callback: Function, // eslint-disable-line @typescript-eslint/ban-types
  parameters: unknown[],
  vanilla: boolean,
) {
  // We need to wrap the callback in a new function so that we can explicitly pass the class as the
  // first argument. (Otherwise, the method will not be able to properly access `this`.
  const wrappedCallback = (...callbackArgs: unknown[]) => {
    // eslint-disable-next-line @typescript-eslint/dot-notation
    const conditionalFunc = modFeature["shouldCallbackMethodsFire"];
    if (conditionalFunc !== null) {
      const shouldRun = conditionalFunc(vanilla, modCallback, ...callbackArgs);
      if (!shouldRun) {
        return undefined;
      }
    }

    const castedCallback = callback as (
      this: void,
      ...args: unknown[]
    ) => unknown;
    return castedCallback(modFeature, ...callbackArgs);
  };

  // We need to save the wrapped function for later (so we can unregister them).
  if (vanilla) {
    const modCallbackVanilla = modCallback as ModCallback;
    let wrappedMethodsMap = modFeatureConstructor[WRAPPED_CALLBACK_METHODS_KEY];
    if (wrappedMethodsMap === undefined) {
      wrappedMethodsMap = new Map();
      modFeatureConstructor[WRAPPED_CALLBACK_METHODS_KEY] = wrappedMethodsMap;
    }
    wrappedMethodsMap.set(modCallbackVanilla, wrappedCallback);
  } else {
    const modCallbackCustom = modCallback as ModCallbackCustom;
    let wrappedMethodsMap =
      modFeatureConstructor[WRAPPED_CUSTOM_CALLBACK_METHODS_KEY];
    if (wrappedMethodsMap === undefined) {
      wrappedMethodsMap = new Map();
      modFeatureConstructor[WRAPPED_CUSTOM_CALLBACK_METHODS_KEY] =
        wrappedMethodsMap;
    }
    wrappedMethodsMap.set(modCallbackCustom, wrappedCallback);
  }

  if (vanilla) {
    (mod.AddPriorityCallback as AnyFunction)(
      modCallback,
      priority,
      wrappedCallback,
      ...parameters,
    );
  } else {
    (mod.AddPriorityCallbackCustom as AnyFunction)(
      modCallback,
      priority,
      wrappedCallback,
      ...parameters,
    );
  }
}

function removeCallback(
  modFeatureConstructor: ModFeatureConstructor,
  mod: ModUpgraded,
  modCallback: ModCallback | ModCallbackCustom,
  vanilla: boolean,
) {
  if (vanilla) {
    const modCallbackVanilla = modCallback as ModCallback;
    const wrappedMethodsMap =
      modFeatureConstructor[WRAPPED_CALLBACK_METHODS_KEY];
    if (wrappedMethodsMap === undefined) {
      return;
    }

    const wrappedCallback = wrappedMethodsMap.get(modCallbackVanilla);
    (mod.RemoveCallback as AnyFunction)(modCallback, wrappedCallback);
  } else {
    const modCallbackCustom = modCallback as ModCallbackCustom;
    const wrappedMethodsMap =
      modFeatureConstructor[WRAPPED_CUSTOM_CALLBACK_METHODS_KEY];
    if (wrappedMethodsMap === undefined) {
      return;
    }

    const wrappedCallback = wrappedMethodsMap.get(modCallbackCustom);
    (mod.RemoveCallbackCustom as AnyFunction)(modCallback, wrappedCallback);
  }
}

/**
 * This will only work for end-users who are calling the `ModFeature.init` method explicitly. (See
 * the discussion in the `ModFeature` comment.)
 */
function initSaveDataManager(
  modFeature: ModFeature,
  tstlClassName: string,
  init: boolean,
) {
  // Do nothing if this class does not have any variables.
  const { v } = modFeature as unknown as Record<string, unknown>;
  if (v === undefined) {
    return;
  }

  if (!isTable(v)) {
    error(
      'Failed to initialize a mod feature class due to having a "v" property that is not an object. (The "v" property is supposed to be an object that holds the variables for the class, managed by the save data manager.)',
    );
  }

  // Do nothing if we have not enabled the save data manager.
  // eslint-disable-next-line @typescript-eslint/dot-notation
  const mod = modFeature["mod"] as unknown as Record<string, unknown>;
  const saveDataManagerMethodName = init
    ? "saveDataManager"
    : "saveDataManagerRemove";
  const saveDataManagerMethod = mod[saveDataManagerMethodName] as
    | AnyFunction
    | undefined;
  assertDefined(
    saveDataManagerMethod,
    'Failed to initialize a mod feature class due to having a "v" object and not having the save data manager initialized. You must pass "ISCFeature.SAVE_DATA_MANAGER" to the "upgradeMod" function.',
  );

  if (typeof saveDataManagerMethod !== "function") {
    error(
      `The "${saveDataManagerMethodName}" property of the "ModUpgraded" object was not a function.`,
    );
  }

  if (init) {
    saveDataManagerMethod(tstlClassName, v);
  } else {
    saveDataManagerMethod(tstlClassName);
  }
}
