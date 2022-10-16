import { ModCallback } from "isaac-typescript-definitions";
import { ModCallbackCustom } from "../enums/ModCallbackCustom";
import {
  getTSTLClassConstructor,
  getTSTLClassName,
} from "../functions/tstlClass";
import { isTable } from "../functions/types";
import { TSTLClassMetatable } from "../interfaces/TSTLClassMetatable";
import { AnyFunction } from "../types/AnyFunction";
import { ModUpgradedBase } from "./ModUpgradedBase";

export const ADD_CALLBACK_ARGS_KEY = "__addCallbackArgs";
export const ADD_CALLBACK_CUSTOM_ARGS_KEY = "__addCallbackCustomArgs";

type ModFeatureConstructor = TSTLClassMetatable["constructor"] & {
  [ADD_CALLBACK_ARGS_KEY]: unknown[] | undefined;
  [ADD_CALLBACK_CUSTOM_ARGS_KEY]: unknown[] | undefined;
};

/**
 * Helper class for mods that wants to represent their individual features as classes. Extend your
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
 */
// eslint-disable-next-line @typescript-eslint/no-extraneous-class
export class ModFeature {
  constructor(mod: ModUpgradedBase) {
    const constructor = getTSTLClassConstructor(this);
    if (constructor === undefined) {
      error("Failed to get the TSTL class constructor for a mod feature.");
    }

    const modFeatureConstructor = constructor as ModFeatureConstructor;
    checkAddDecoratedCallbacks(mod, modFeatureConstructor, this);
    checkAddDecoratedCallbacksCustom(mod, modFeatureConstructor, this);
    checkRegisterSaveDataManager(mod, this);
  }
}

function checkAddDecoratedCallbacks(
  mod: ModUpgradedBase,
  modFeatureConstructor: ModFeatureConstructor,
  modFeature: ModFeature,
) {
  const addCallbackArgs = modFeatureConstructor[ADD_CALLBACK_ARGS_KEY];
  if (addCallbackArgs === undefined) {
    return;
  }

  const tstlClassName = getTSTLClassName(modFeatureConstructor) ?? "Unknown";

  for (const args of addCallbackArgs) {
    const parameters = args as unknown[];
    const modCallback = parameters.shift() as ModCallback | undefined;
    if (modCallback === undefined) {
      error(
        `Failed to get the ModCallback from the parameters for class: ${tstlClassName}`,
      );
    }

    const callback = parameters.shift() as
      | ((this: void, ...callbackArgs: unknown[]) => void)
      | undefined;
    if (callback === undefined) {
      error(
        `Failed to get the callback from the parameters for class: ${tstlClassName}`,
      );
    }

    /**
     * We need to wrap the callback in a new function so that we can explicitly pass the class as
     * the first argument. (Otherwise, the method will not be able to properly access `this`.
     */
    const newCallback = (...callbackArgs: unknown[]) => {
      callback(modFeature, ...callbackArgs);
    };

    // @ts-expect-error The compiler does not know that the arguments match the method.
    mod.AddCallback(modCallback, newCallback, ...parameters);
  }
}

function checkAddDecoratedCallbacksCustom(
  mod: ModUpgradedBase,
  modFeatureConstructor: ModFeatureConstructor,
  modFeature: ModFeature,
) {
  const addCallbackCustomArgs =
    modFeatureConstructor[ADD_CALLBACK_CUSTOM_ARGS_KEY];
  if (addCallbackCustomArgs === undefined) {
    return;
  }

  const tstlClassName = getTSTLClassName(modFeatureConstructor) ?? "Unknown";

  for (const args of addCallbackCustomArgs) {
    const parameters = args as unknown[];
    const modCallbackCustom = parameters.shift() as
      | ModCallbackCustom
      | undefined;
    if (modCallbackCustom === undefined) {
      error(
        `Failed to get the ModCallbackCustom from the parameters for class: ${tstlClassName}`,
      );
    }

    const callback = parameters.shift() as
      | ((this: void, ...callbackArgs: unknown[]) => void)
      | undefined;
    if (callback === undefined) {
      error(
        `Failed to get the callback from the parameters for class: ${tstlClassName}`,
      );
    }

    /**
     * We need to wrap the callback in a new function so that we can explicitly pass the class as
     * the first argument. (Otherwise, the method will not be able to properly access `this`.
     */
    const newCallback = (...callbackArgs: unknown[]) => {
      callback(modFeature, ...callbackArgs);
    };

    // @ts-expect-error The compiler does not know that the arguments match the method.
    mod.AddCallbackCustom(modCallbackCustom, newCallback, ...parameters);
  }
}

function checkRegisterSaveDataManager(
  mod: ModUpgradedBase,
  modFeature: ModFeature,
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
  const { saveDataManager } = mod as unknown as Record<string, unknown>;
  if (saveDataManager === undefined) {
    error(
      'Failed to initialize a mod feature class due to having a "v" object and not having the save data manager initialized. You must pass "ISCFeature.SAVE_DATA_MANAGER" to the "upgradeMod" function.',
    );
  }

  const tstlClassName = getTSTLClassName(modFeature);
  (saveDataManager as AnyFunction)(tstlClassName, v);
}
