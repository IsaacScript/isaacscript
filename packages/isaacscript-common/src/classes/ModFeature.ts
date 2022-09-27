import { getTSTLClassConstructor } from "../functions/tstlClass";
import { TSTLClassMetatable } from "../interfaces/TSTLClassMetatable";
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
    addDecoratedCallbacks(mod, modFeatureConstructor);
    addDecoratedCustomCallbacks(mod, modFeatureConstructor);
  }
}

function addDecoratedCallbacks(
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

function addDecoratedCustomCallbacks(
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
