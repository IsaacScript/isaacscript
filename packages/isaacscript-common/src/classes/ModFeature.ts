import {
  getTSTLClassConstructor,
  getTSTLClassName,
} from "../functions/tstlClass";
import { isTable } from "../functions/types";
import { TSTLClassMetatable } from "../interfaces/TSTLClassMetatable";
import { AnyFunction } from "../types/AnyFunction";
import { ModUpgraded } from "./ModUpgraded";

export const ADD_CALLBACK_ARGS_KEY = "__addCallbackArgs";
export const ADD_CALLBACK_CUSTOM_ARGS_KEY = "__addCallbackCustomArgs";

type ModFeatureConstructor = TSTLClassMetatable["constructor"] & {
  [ADD_CALLBACK_ARGS_KEY]: unknown[] | undefined;
  [ADD_CALLBACK_CUSTOM_ARGS_KEY]: unknown[] | undefined;
};

/**
 * A helper class for mods that wants to represent their individual features as classes. Extend your
 * mod features from this class in order to enable the `@Callback` and `@CustomCallback` decorators
 * that automatically subscribe to callbacks.
 *
 * For example:
 *
 * ```ts
 * export class MyFeature extends ModFeature {
 *   @Callback(ModCallback.POST_GAME_STARTED)
 *   postGameStarted(isContinued: boolean): void {
 *     Isaac.DebugString(`Callback fired: POST_GAME_STARTED`);
 *   }
 * }
 * ```
 */
// eslint-disable-next-line @typescript-eslint/no-extraneous-class
export class ModFeature {
  constructor(mod: ModUpgraded) {
    const constructor = getTSTLClassConstructor(this);
    if (constructor === undefined) {
      error("Failed to get the TSTL class constructor for a mod feature.");
    }

    const modFeatureConstructor = constructor as ModFeatureConstructor;
    checkAddDecoratedCallbacks(mod, modFeatureConstructor);
    checkAddDecoratedCallbacksCustom(mod, modFeatureConstructor);
    checkRegisterSaveDataManager(mod, this);
  }
}

function checkAddDecoratedCallbacks(
  mod: ModUpgraded,
  modFeatureConstructor: ModFeatureConstructor,
) {
  const addCallbackArgs = modFeatureConstructor[ADD_CALLBACK_ARGS_KEY];
  if (addCallbackArgs === undefined) {
    return;
  }

  for (const args of addCallbackArgs) {
    // @ts-expect-error The compiler does not know that the arguments match the method.
    // eslint-disable-next-line isaacscript/strict-enums
    mod.AddCallback(...args);
  }
}

function checkAddDecoratedCallbacksCustom(
  mod: ModUpgraded,
  modFeatureConstructor: ModFeatureConstructor,
) {
  const addCallbackCustomArgs =
    modFeatureConstructor[ADD_CALLBACK_CUSTOM_ARGS_KEY];
  if (addCallbackCustomArgs === undefined) {
    return;
  }

  for (const args of addCallbackCustomArgs) {
    // @ts-expect-error The compiler does not know that the arguments match the method.
    // eslint-disable-next-line isaacscript/strict-enums
    mod.AddCallbackCustom(...args);
  }
}

function checkRegisterSaveDataManager(
  mod: ModUpgraded,
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
