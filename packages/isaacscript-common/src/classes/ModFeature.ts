import { ModCallback } from "isaac-typescript-definitions";
import { ModCallbackCustom } from "../enums/ModCallbackCustom";
import { isArray } from "../functions/array";
import { deepCopy } from "../functions/deepCopy";
import {
  getTSTLClassConstructor,
  getTSTLClassName,
} from "../functions/tstlClass";
import { isFunction, isNumber, isTable } from "../functions/types";
import { TSTLClassMetatable } from "../interfaces/TSTLClassMetatable";
import { AnyFunction } from "../types/AnyFunction";
import { ModUpgradedBase } from "./ModUpgradedBase";

export const ADD_CALLBACK_ARGS_KEY = "__addCallbackArgs";
export const ADD_CALLBACK_CUSTOM_ARGS_KEY = "__addCallbackCustomArgs";
const WRAPPED_CALLBACK_METHODS_KEY = "__wrappedCallbackMethods";
const WRAPPED_CUSTOM_CALLBACK_METHODS_KEY = "__wrappedCustomCallbacksMethods";

type ModFeatureConstructor = TSTLClassMetatable["constructor"] & {
  [ADD_CALLBACK_ARGS_KEY]: unknown | undefined;
  [ADD_CALLBACK_CUSTOM_ARGS_KEY]: unknown | undefined;
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
 * If your feature has variables that are managed by the save data manager, put them as a `v` class
 * member and they will automatically be registered with the save data manager when the class is
 * instantiated.
 *
 * For example:
 *
 * ```ts
 * export class MyFeature extends ModFeature {
 *   v = {
 *     run: {
 *       foo: 123,
 *     }
 *   }
 *
 *   @Callback(ModCallback.POST_GAME_STARTED)
 *   postGameStarted(isContinued: boolean): void {
 *     Isaac.DebugString(`Callback fired: POST_GAME_STARTED`);
 *   }
 * }
 * ```
 *
 * When instantiating a feature class, you must pass your upgraded mod as the first argument to the
 * constructor.
 *
 * In almost all cases, you will want the callback functions to be immediately subscribed after
 * instantiating the class. However, if this is not the case, you can pass `false` as the optional
 * second argument to the constructor.
 */

export class ModFeature {
  private mod: ModUpgradedBase;
  private initialized = false;

  constructor(mod: ModUpgradedBase, init = true) {
    this.mod = mod;

    if (init) {
      this.init();
    }
  }

  /**
   * Runs the `Mod.AddCallback` and `ModUpgraded.AddCallbackCustom` methods for all of the decorated
   * callbacks. Additionally, subscribes the `v` object to the save data manager, if present.
   *
   * @param init Optional. Whether to initialize or uninitialize. Default is true.
   */
  public init(init = true): void {
    if (this.initialized === init) {
      return;
    }
    this.initialized = init;

    const constructor = getTSTLClassConstructor(this);
    if (constructor === undefined) {
      error("Failed to get the TSTL class constructor for a mod feature.");
    }

    const tstlClassName = getTSTLClassName(this);
    if (tstlClassName === undefined) {
      error("Failed to get the TSTL class name for a mod feature.");
    }

    initDecoratedCallbacks(this, constructor, tstlClassName, true, init);
    initDecoratedCallbacks(this, constructor, tstlClassName, false, init);
    initSaveDataManager(this, tstlClassName, init);
  }

  /**
   * Runs the `Mod.RemoveCallback` and `ModUpgraded.RemoveCallbackCustom` methods for all of the
   * decorated callbacks. Additionally, unsubscribes the `v` object from the save data manager, if
   * present.
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
  const argsKey = vanilla
    ? ADD_CALLBACK_ARGS_KEY
    : ADD_CALLBACK_CUSTOM_ARGS_KEY;
  const addCallbackArgs = modFeatureConstructor[argsKey];
  if (addCallbackArgs === undefined) {
    return;
  }

  if (!isArray(addCallbackArgs)) {
    error(
      `Failed to initialize/uninitialize the decorated callbacks on a mod feature since the callback arguments on the key of "${argsKey}" was not an array.`,
    );
  }

  for (const args of addCallbackArgs) {
    if (!isArray(args)) {
      error(
        "Failed to initialize/uninitialize the decorated callbacks on a mod feature since one of the callback arguments was not an array.",
      );
    }

    const parameters = deepCopy(args);

    const modCallback = parameters.shift();
    if (!isNumber(modCallback)) {
      error(
        `Failed to get the callback number from the parameters for class: ${tstlClassName}`,
      );
    }

    const callback = parameters.shift();
    if (!isFunction(callback)) {
      error(
        `Failed to get the callback function from the parameters for class: ${tstlClassName}`,
      );
    }

    // eslint-disable-next-line prefer-destructuring, @typescript-eslint/dot-notation
    const mod = modFeature["mod"];

    if (init) {
      addCallback(
        modFeature,
        modFeatureConstructor,
        mod,
        modCallback,
        callback,
        parameters,
        vanilla,
      );
    } else {
      removeCallback(modFeatureConstructor, mod, modCallback, vanilla);
    }
  }
}

function addCallback(
  modFeature: ModFeature,
  modFeatureConstructor: ModFeatureConstructor,
  mod: ModUpgradedBase,
  modCallback: unknown,
  // eslint-disable-next-line @typescript-eslint/ban-types
  callback: Function,
  parameters: unknown[],
  vanilla: boolean,
) {
  // We need to wrap the callback in a new function so that we can explicitly pass the class as the
  // first argument. (Otherwise, the method will not be able to properly access `this`.
  const wrappedCallback = (...callbackArgs: unknown[]) => {
    callback(modFeature, ...callbackArgs);
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
    (mod.AddCallback as AnyFunction)(
      modCallback,
      wrappedCallback,
      ...parameters,
    );
  } else {
    (mod.AddCallbackCustom as AnyFunction)(
      modCallback,
      wrappedCallback,
      ...parameters,
    );
  }
}

function removeCallback(
  modFeatureConstructor: ModFeatureConstructor,
  mod: ModUpgradedBase,
  modCallback: unknown,
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
  const saveDataManagerMethod = mod[saveDataManagerMethodName];
  if (saveDataManagerMethod === undefined) {
    error(
      'Failed to initialize a mod feature class due to having a "v" object and not having the save data manager initialized. You must pass "ISCFeature.SAVE_DATA_MANAGER" to the "upgradeMod" function.',
    );
  }

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
