import { ModCallbackCustom2 } from "../../enums/ModCallbackCustom2";
import { AddCallbackParametersCustom2 } from "../../interfaces/private/AddCallbackParametersCustom2";

/**
 * A helper type used to get the matching `ModCallbackCustom` enum values that match the provided
 * callback function signature.
 *
 * "T extends T" is necessary because of distributive conditional types:
 * https://www.typescriptlang.org/docs/handbook/2/conditional-types.html#distributive-conditional-types
 *
 * "extends Parameters<FuncSignature>" is necessary because "() => void" will match "(arg1: number)
 * => void", since in JavaScript, functions ignore extra arguments.
 *
 * "extends ReturnType<FuncSignature>" is necessary because "() => void" will match "() => number".
 */
export type MatchingCallbackCustom<
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  FuncSignature extends (...args: any[]) => unknown,
  T extends ModCallbackCustom2 = ModCallbackCustom2,
> = T extends T
  ? AddCallbackParametersCustom2[T][0] extends FuncSignature
    ? Parameters<
        AddCallbackParametersCustom2[T][0]
      > extends Parameters<FuncSignature>
      ? ReturnType<
          AddCallbackParametersCustom2[T][0]
        > extends ReturnType<FuncSignature>
        ? T
        : never
      : never
    : never
  : never;
