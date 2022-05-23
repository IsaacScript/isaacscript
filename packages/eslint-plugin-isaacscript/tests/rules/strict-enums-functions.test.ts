import { TSESLint } from "@typescript-eslint/utils";
import { MessageIds, strictEnums } from "../../src/rules/strict-enums";
import { ruleTester } from "../utils";
import { fruitEnumDefinition, vegetableEnumDefinition } from "./strict-enums";

const valid: Array<TSESLint.ValidTestCase<unknown[]>> = [];
const invalid: Array<TSESLint.InvalidTestCase<MessageIds, unknown[]>> = [];

/** A function that takes a number enum. */
const fruitFunctionDefinition = `${fruitEnumDefinition}
function useFruit(fruit: Fruit) {}
`;

valid.push({
  name: "Using a number enum literal on a non-existent function",
  code: `
useFruit(0);
  `,
});

valid.push({
  name: "Using a number enum literal on a function that takes a number enum",
  code: `${fruitFunctionDefinition}
useFruit(Fruit.Apple);
  `,
});

valid.push({
  name: "Using a number enum value on a function that takes a number enum",
  code: `${fruitFunctionDefinition}
declare const fruit: Fruit.Apple;
useFruit(fruit);
  `,
});

invalid.push({
  name: "Using a number literal on a function that takes a number enum",
  code: `${fruitFunctionDefinition}
useFruit(0);
  `,
  errors: [{ messageId: "mismatchedFunctionArgument" }],
});

valid.push({
  name: "Using a matching number enum literal on a function that takes an enum literal",
  code: `${fruitEnumDefinition}
function useFruit(fruit: Fruit.Apple) {}
useFruit(Fruit.Apple);
  `,
});

/**
 * The TypeScript compiler will correctly handle this case, so the lint rule does not need to care.
 */
valid.push({
  name: "Using a non-matching number enum literal on a function that takes an enum literal",
  code: `${fruitEnumDefinition}
function useFruit(fruit: Fruit.Apple) {}
useFruit(Fruit.Banana);
  `,
});

valid.push({
  name: "Using a matching number enum value on a function that takes an enum literal",
  code: `${fruitEnumDefinition}
function useFruit(fruit: Fruit.Apple) {}
declare const fruit: Fruit.Apple;
useFruit(fruit);
  `,
});

/**
 * The TypeScript compiler will correctly handle this case, so the lint rule does not need to care.
 */
valid.push({
  name: "Using a non-matching number enum value on a function that takes an enum literal",
  code: `${fruitEnumDefinition}
function useFruit(fruit: Fruit.Apple) {}
declare const fruit: Fruit.Banana;
useFruit(fruit);
  `,
});

invalid.push({
  name: "Using a number literal on a function that takes an enum literal",
  code: `${fruitEnumDefinition}
function useFruit(fruit: Fruit.Apple) {}
useFruit(0);
  `,
  errors: [{ messageId: "mismatchedFunctionArgument" }],
});

valid.push({
  name: "Using a number enum literal on a function that takes a number enum with a default argument",
  code: `${fruitEnumDefinition}
function useFruit(fruit = Fruit.Apple) {}
useFruit(Fruit.Apple);
  `,
});

valid.push({
  name: "Using a number enum value on a function that takes a number enum with a default argument",
  code: `${fruitEnumDefinition}
function useFruit(fruit = Fruit.Apple) {}
const fruit = Fruit.Apple;
useFruit(fruit);
  `,
});

invalid.push({
  name: "Using a number literal on a function that takes a number enum with a default argument",
  code: `${fruitEnumDefinition}
function useFruit(fruit = Fruit.Apple) {}
useFruit(0);
  `,
  errors: [{ messageId: "mismatchedFunctionArgument" }],
});

valid.push({
  name: "Using a number enum literal on a function that takes a number enum literal with a default argument",
  code: `${fruitEnumDefinition}
function useFruit(fruit: Fruit.Apple = Fruit.Apple) {}
useFruit(Fruit.Apple);
  `,
});

valid.push({
  name: "Using a number enum value on a function that takes a number enum literal with a default argument",
  code: `${fruitEnumDefinition}
function useFruit(fruit: Fruit.Apple = Fruit.Apple) {}
const fruit = Fruit.Apple;
useFruit(fruit);
  `,
});

invalid.push({
  name: "Using a number literal on a function that takes a number enum literal with a default argument",
  code: `${fruitEnumDefinition}
function useFruit(fruit: Fruit.Apple = Fruit.Apple) {}
useFruit(0);
  `,
  errors: [{ messageId: "mismatchedFunctionArgument" }],
});

valid.push({
  name: "Using a number enum literal on a function that takes a number enum | null",
  code: `${fruitEnumDefinition}
function useFruit(fruit: Fruit | null) {}
useFruit(Fruit.Apple);
  `,
});

valid.push({
  name: "Using a number enum value on a function that takes a number enum | null",
  code: `${fruitEnumDefinition}
function useFruit(fruit: Fruit | null) {}
const fruit = Fruit.Apple;
useFruit(fruit);
  `,
});

valid.push({
  name: "Using a null literal on a function that takes a number enum | null",
  code: `${fruitEnumDefinition}
function useFruit(fruit: Fruit | null) {}
useFruit(null);
  `,
});

valid.push({
  name: "Using a null value on a function that takes a number enum | null",
  code: `${fruitEnumDefinition}
function useFruit(fruit: Fruit | null) {}
const fruit = null;
useFruit(fruit);
  `,
});

invalid.push({
  name: "Using a number literal on a function that takes a number enum | null",
  code: `${fruitEnumDefinition}
function useFruit(fruit: Fruit | null) {}
useFruit(0);
  `,
  errors: [{ messageId: "mismatchedFunctionArgument" }],
});

valid.push({
  name: "Using a number enum literal on a function that takes a number enum | null with a default argument",
  code: `${fruitEnumDefinition}
function useFruit(fruit: Fruit | null = Fruit.Apple) {}
useFruit(Fruit.Apple);
  `,
});

valid.push({
  name: "Using a number enum value on a function that takes a number enum | null with a default argument",
  code: `${fruitEnumDefinition}
function useFruit(fruit: Fruit | null = Fruit.Apple) {}
const fruit = Fruit.Apple;
useFruit(fruit);
  `,
});

valid.push({
  name: "Using a null literal on a function that takes a number enum | null with a default argument",
  code: `${fruitEnumDefinition}
function useFruit(fruit: Fruit | null = Fruit.Apple) {}
useFruit(null);
  `,
});

valid.push({
  name: "Using a null value on a function that takes a number enum | null with a default argument",
  code: `${fruitEnumDefinition}
function useFruit(fruit: Fruit | null = Fruit.Apple) {}
const fruit = null;
useFruit(fruit);
  `,
});

invalid.push({
  name: "Using a number literal on a function that takes a number enum | null with a default argument",
  code: `${fruitEnumDefinition}
function useFruit(fruit: Fruit | null = Fruit.Apple) {}
useFruit(0);
  `,
  errors: [{ messageId: "mismatchedFunctionArgument" }],
});

valid.push({
  name: "Using a number enum literal on a function that takes a number enum literal | null",
  code: `${fruitEnumDefinition}
function useFruit(fruit: Fruit.Apple | null) {}
useFruit(Fruit.Apple);
  `,
});

valid.push({
  name: "Using a number enum value on a function that takes a number enum literal | null",
  code: `${fruitEnumDefinition}
function useFruit(fruit: Fruit.Apple | null) {}
const fruit = Fruit.Apple;
useFruit(fruit);
  `,
});

valid.push({
  name: "Using a null literal on a function that takes a number enum literal | null",
  code: `${fruitEnumDefinition}
function useFruit(fruit: Fruit.Apple | null) {}
useFruit(null);
  `,
});

valid.push({
  name: "Using a null value on a function that takes a number enum literal | null",
  code: `${fruitEnumDefinition}
function useFruit(fruit: Fruit.Apple | null) {}
const fruit = null;
useFruit(fruit);
  `,
});

invalid.push({
  name: "Using a number literal on a function that takes a number enum literal | null",
  code: `${fruitEnumDefinition}
function useFruit(fruit: Fruit.Apple | null) {}
useFruit(0);
  `,
  errors: [{ messageId: "mismatchedFunctionArgument" }],
});

valid.push({
  name: "Using a number enum literal on a function that takes a number enum literal | null with a default argument",
  code: `${fruitEnumDefinition}
function useFruit(fruit: Fruit.Apple | null = Fruit.Apple) {}
useFruit(Fruit.Apple);
  `,
});

valid.push({
  name: "Using a number enum value on a function that takes a number enum literal | null with a default argument",
  code: `${fruitEnumDefinition}
function useFruit(fruit: Fruit.Apple | null = Fruit.Apple) {}
const fruit = Fruit.Apple;
useFruit(fruit);
  `,
});

valid.push({
  name: "Using a null literal on a function that takes a number enum literal | null with a default argument",
  code: `${fruitEnumDefinition}
function useFruit(fruit: Fruit.Apple | null = Fruit.Apple) {}
useFruit(null);
  `,
});

valid.push({
  name: "Using a null value on a function that takes a number enum literal | null with a default argument",
  code: `${fruitEnumDefinition}
function useFruit(fruit: Fruit.Apple | null = Fruit.Apple) {}
const fruit = null;
useFruit(fruit);
  `,
});

invalid.push({
  name: "Using a number literal on a function that takes a number enum literal | null with a default argument",
  code: `${fruitEnumDefinition}
function useFruit(fruit: Fruit.Apple | null = Fruit.Apple) {}
useFruit(0);
  `,
  errors: [{ messageId: "mismatchedFunctionArgument" }],
});

valid.push({
  name: "Using a number enum literal on a function that takes a number enum literal | number enum literal | null",
  code: `${fruitEnumDefinition}
function useFruit(fruit: Fruit.Apple | Fruit.Banana | null) {}
useFruit(Fruit.Apple);
  `,
});

valid.push({
  name: "Using a number enum value on a function that takes a number enum literal | number enum literal | null",
  code: `${fruitEnumDefinition}
function useFruit(fruit: Fruit.Apple | Fruit.Banana | null) {}
const fruit = Fruit.Apple;
useFruit(fruit);
  `,
});

valid.push({
  name: "Using a null literal on a function that takes a number enum literal | number enum literal | null",
  code: `${fruitEnumDefinition}
function useFruit(fruit: Fruit.Apple | Fruit.Banana | null) {}
useFruit(null);
  `,
});

valid.push({
  name: "Using a null value on a function that takes a number enum literal | number enum literal | null",
  code: `${fruitEnumDefinition}
function useFruit(fruit: Fruit.Apple | Fruit.Banana | null) {}
const fruit = null;
useFruit(fruit);
  `,
});

invalid.push({
  name: "Using a number literal on a function that takes a number enum literal | number enum literal | null",
  code: `${fruitEnumDefinition}
function useFruit(fruit: Fruit.Apple | Fruit.Banana | null) {}
useFruit(0);
  `,
  errors: [{ messageId: "mismatchedFunctionArgument" }],
});

valid.push({
  name: "Using an enum from a composition type on a function that takes a number enum",
  code: `${fruitEnumDefinition}
interface BaseNode {
  type: Fruit;
}

interface AppleNode extends BaseNode {
  type: Fruit.Apple;
  apple: number;
}

interface BananaNode extends BaseNode {
  type: Fruit.Apple;
  banana: Number;
}

type Node = AppleNode | BananaNode;

const fruitNodesSet = new Set([
  Fruit.Apple,
  Fruit.Banana,
]);

const appleNode: AppleNode = {
  type: Fruit.Apple,
  apple: 1,
};

fruitNodesSet.has(appleNode.type);
  `,
});

valid.push({
  name: "Using an enum number literal in a Set method",
  code: `${fruitEnumDefinition}
const fruitSet = new Set([
  Fruit.Apple,
  Fruit.Banana,
]);

fruitSet.has(Fruit.Apple);
  `,
});

invalid.push({
  name: "Using a number literal in a Set method",
  code: `${fruitEnumDefinition}
const fruitSet = new Set([
  Fruit.Apple,
  Fruit.Banana,
]);

fruitSet.has(0);
  `,
  errors: [{ messageId: "mismatchedFunctionArgument" }],
});

valid.push({
  name: "Using a partial union type on a function that takes a number enum",
  code: `${fruitFunctionDefinition}
declare const fruitUnion: Fruit.Apple | Fruit.Banana;
useFruit(fruitUnion);
`,
});

valid.push({
  name: "Using a partial union type on a function that takes a partial union",
  code: `${fruitEnumDefinition}
function useFruit(fruit: Fruit.Apple | Fruit.Banana) {}
declare const fruitUnion: Fruit.Apple | Fruit.Banana;
useFruit(fruitUnion);
`,
});

invalid.push({
  name: "Using a number literal on a function that takes a partial union",
  code: `${fruitEnumDefinition}
function useFruit(fruit: Fruit.Apple | Fruit.Banana) {}
useFruit(0);
    `,
  errors: [{ messageId: "mismatchedFunctionArgument" }],
});

valid.push({
  name: "Using a full enum union on a function that takes a number enum",
  code: `${fruitFunctionDefinition}
declare const fruitUnion: Fruit.Apple | Fruit.Banana | Fruit.Pear;
useFruit(fruitUnion);
`,
});

valid.push({
  name: "Using a full enum union on a function that takes a full enum union",
  code: `${fruitEnumDefinition}
function useFruit(fruit: Fruit.Apple | Fruit.Banana | Fruit.Pear) {}
declare const fruitUnion: Fruit.Apple | Fruit.Banana | Fruit.Pear;
useFruit(fruitUnion);
`,
});

invalid.push({
  name: "Using a number literal on a function that takes a full enum union",
  code: `${fruitEnumDefinition}
function useFruit(fruit: Fruit.Apple | Fruit.Banana | Fruit.Pear) {}
useFruit(0);
    `,
  errors: [{ messageId: "mismatchedFunctionArgument" }],
});

valid.push({
  name: "Using a partial enum union on a function that takes a number enum (from a type narrowing switch statement)",
  code: `${fruitFunctionDefinition}
declare const fruit: Fruit;
switch (fruit) {
  case Fruit.Apple:
  case Fruit.Banana: {
    useFruit(fruit);
  }
}
`,
});

valid.push({
  name: "Using a number enum on a function that takes an extension type",
  code: `${fruitEnumDefinition}
function useFruit<FruitType extends number>(fruitType: FruitType) {}
useFruit(Fruit.Apple);
`,
});

valid.push({
  name: "Using a number literal on a function that takes an extension type",
  code: `${fruitEnumDefinition}
function useFruit<FruitType extends number>(fruitType: FruitType) {}
useFruit(0);
`,
});

valid.push({
  name: "Using a number enum on a function that takes an enum extension type",
  code: `${fruitEnumDefinition}
function useFruit<FruitType extends Fruit>(fruitType: FruitType) {}
useFruit(Fruit.Apple);
`,
});

invalid.push({
  name: "Using a number literal on a function that takes an enum extension type",
  code: `${fruitEnumDefinition}
function useFruit<FruitType extends Fruit>(fruitType: FruitType) {}
useFruit(0);
`,
  errors: [{ messageId: "mismatchedFunctionArgument" }],
});

valid.push({
  name: "Using a number enum on a function that takes an enum extension type",
  code: `${fruitEnumDefinition}
class FruitClass<FruitType extends Fruit> {
  constructor(type: FruitType) {}
  useFruit(type: FruitType) {}
}
const fruitClass = new FruitClass(Fruit.Apple);
fruitClass.useFruit(Fruit.Apple);
`,
});

invalid.push({
  name: "Using a number literal on a function that takes an enum extension type",
  code: `${fruitEnumDefinition}
class FruitClass<FruitType extends Fruit> {
  constructor(type: FruitType) {}
  useFruit(type: FruitType) {}
}
const fruitClass = new FruitClass(0);
fruitClass.useFruit(0);
  `,
  errors: [
    { messageId: "mismatchedFunctionArgument" },
    { messageId: "mismatchedFunctionArgument" },
  ],
});

valid.push({
  name: "Using a number array on a function that takes a number array",
  code: `${fruitEnumDefinition}
function useNumbers(numberArray: number[]) {}
useNumbers([0, 1]);
  `,
});

valid.push({
  name: "Using a number enum array on a function that takes a number enum array",
  code: `${fruitEnumDefinition}
function useFruit(fruitArray: Fruit[]) {}
useFruit([Fruit.Apple, Fruit.Banana]);
  `,
});

invalid.push({
  name: "Using a number array on a function that takes a number enum array",
  code: `${fruitEnumDefinition}
function useFruit(fruitArray: Fruit[]) {}
useFruit([0, 1]);
  `,
  errors: [{ messageId: "mismatchedFunctionArgument" }],
});

invalid.push({
  name: "Using a mixed array on a function that takes a number enum array",
  code: `${fruitEnumDefinition}
function useFruit(fruitArray: Fruit[]) {}
useFruit([Fruit.Apple, 1]);
  `,
  errors: [{ messageId: "mismatchedFunctionArgument" }],
});

valid.push({
  name: "Using a number literal on a function that takes a number",
  code: `
function useNumber(num: number) {}
useNumber(0);
  `,
});

valid.push({
  name: "Using a number enum literal on a function that takes a number",
  code: `${fruitEnumDefinition}
function useNumber(num: number) {}
useNumber(Fruit.Apple);
  `,
});

valid.push({
  name: "Using a string literal on a function that takes a string",
  code: `${vegetableEnumDefinition}
function useString(str: string) {}
useString('lettuce');
  `,
});

valid.push({
  name: "Using a string enum literal on a function that takes a string",
  code: `${vegetableEnumDefinition}
function useString(str: string) {}
useString(Vegetable.Lettuce);
  `,
});

valid.push({
  name: "Using a number literal on a function that takes any",
  code: `
function useAnything(something: any) {}
useAnything(0);
  `,
});

valid.push({
  name: "Using a number enum literal on a function that takes any",
  code: `${fruitEnumDefinition}
function useAnything(something: any) {}
useAnything(Fruit.Apple);
  `,
});

valid.push({
  name: "Using a number literal on a function that takes unknown",
  code: `
function useUnknown(something: unknown) {}
useUnknown(0);
  `,
});

valid.push({
  name: "Using a number enum literal on a function that takes unknown",
  code: `${fruitEnumDefinition}
function useUnknown(something: unknown) {}
useUnknown(Fruit.Apple);
  `,
});

invalid.push({
  name: "Using a number literal on a function that takes enum | enum array",
  code: `${fruitEnumDefinition}
function useFruit(fruitOrFruitArray: Fruit | Fruit[]) {}
useFruit(0);
  `,
  errors: [{ messageId: "mismatchedFunctionArgument" }],
});

valid.push({
  name: "Using a number enum literal on a function that takes enum | enum array",
  code: `${fruitEnumDefinition}
function useFruit(fruitOrFruitArray: Fruit | Fruit[]) {}
useFruit(Fruit.Apple);
  `,
});

valid.push({
  name: "Using a number enum array on a function that takes enum | enum array",
  code: `${fruitEnumDefinition}
function useFruit(fruitOrFruitArray: Fruit | Fruit[]) {}
useFruit([Fruit.Apple, Fruit.Banana]);
  `,
});

valid.push({
  name: "Using a enum | enum array union on a function that takes enum | enum array",
  code: `${fruitEnumDefinition}
function useFruit(fruitOrFruitArray: Fruit | Fruit[]) {}
declare const fruit: Fruit | Fruit[];
useFruit(fruit);
  `,
});

invalid.push({
  name: "Using a number array on a function that takes enum | enum array",
  code: `${fruitEnumDefinition}
function useFruit(fruitOrFruitArray: Fruit | Fruit[]) {}
useFruit([0, 1]);
  `,
  errors: [{ messageId: "mismatchedFunctionArgument" }],
});

valid.push({
  name: "Using a number on a function that takes number | enum array",
  code: `${fruitEnumDefinition}
function useFruit(fruitOrFruitArray: number | Fruit[]) {}
useFruit(0);
  `,
});

valid.push({
  name: "Using an enum array on a function that takes number | enum array",
  code: `${fruitEnumDefinition}
function useFruit(fruitOrFruitArray: number | Fruit[]) {}
useFruit([Fruit.Apple, Fruit.Banana]);
  `,
});

invalid.push({
  name: "Using a number array on a function that takes number | enum array",
  code: `${fruitEnumDefinition}
function useFruit(fruitOrFruitArray: number | Fruit[]) {}
useFruit([0, 1]);
  `,
  errors: [{ messageId: "mismatchedFunctionArgument" }],
});

invalid.push({
  name: "Using a number literal on a variadic function",
  code: `${fruitEnumDefinition}
function useFruit(...fruits: Fruit[]) {}
useFruit(0);
  `,
  errors: [{ messageId: "mismatchedFunctionArgument" }],
});

valid.push({
  name: "Using a number enum literal on a variadic function",
  code: `${fruitEnumDefinition}
function useFruit(...fruits: Fruit[]) {}
useFruit(Fruit.Apple);
useFruit(Fruit.Apple, Fruit.Banana);
  `,
});

invalid.push({
  name: "Using a number enum literal and a number literal on a variadic function",
  code: `${fruitEnumDefinition}
function useFruit(...fruits: Fruit[]) {}
useFruit(Fruit.Apple, 0);
  `,
  errors: [{ messageId: "mismatchedFunctionArgument" }],
});

valid.push({
  name: "Using a number enum literal on a generic function with a default generic type that is unspecified as any",
  code: `${fruitEnumDefinition}
function toEqual<E = any>(expected: E): void {}
toEqual(Fruit.Apple);
    `,
});

valid.push({
  name: "Using a number enum literal on a generic function with a default generic type that is unspecified as a number enum",
  code: `${fruitEnumDefinition}
function toEqual<E = Fruit>(expected: E): void {}
toEqual(Fruit.Apple);
    `,
});

valid.push({
  name: "Using a number enum literal on a generic function with a default generic type that is specified as any",
  code: `${fruitEnumDefinition}
function toEqual<E = any>(expected: E): void {}
toEqual<any>(Fruit.Apple);
    `,
});

valid.push({
  name: "Using a number enum literal on a generic function with a default generic type that is specified as a number enum",
  code: `${fruitEnumDefinition}
function toEqual<E = any>(expected: E): void {}
toEqual<Fruit>(Fruit.Apple);
    `,
});

invalid.push({
  name: "Using a number literal on a generic function with a default generic type that is specified as a number enum",
  code: `${fruitEnumDefinition}
function toEqual<E = any>(expected: E): void {}
toEqual<Fruit>(0);
    `,
  errors: [{ messageId: "mismatchedFunctionArgument" }],
});

valid.push({
  name: "Using a number enum literal on a generic function with a default generic type that is unspecified as any + extra arg",
  code: `${fruitEnumDefinition}
function toEqual<E = any>(arg1: number, expected: E): void {}
toEqual(0, Fruit.Apple);
    `,
});

valid.push({
  name: "Using a number enum literal on a generic function with a default generic type that is unspecified as a number enum + extra arg",
  code: `${fruitEnumDefinition}
function toEqual<E = Fruit>(arg1: number, expected: E): void {}
toEqual(0, Fruit.Apple);
    `,
});

valid.push({
  name: "Using a number enum literal on a generic function with a default generic type that is specified as any + extra arg",
  code: `${fruitEnumDefinition}
function toEqual<E = any>(arg1: number, expected: E): void {}
toEqual<any>(0, Fruit.Apple);
    `,
});

valid.push({
  name: "Using a number enum literal on a generic function with a default generic type that is specified as a number enum + extra arg",
  code: `${fruitEnumDefinition}
function toEqual<E = any>(arg1: number, expected: E): void {}
toEqual<Fruit>(0, Fruit.Apple);
    `,
});

invalid.push({
  name: "Using a number literal on a generic function with a default generic type that is specified as a number enum + extra arg",
  code: `${fruitEnumDefinition}
function toEqual<E = any>(arg1: number, expected: E): void {}
toEqual<Fruit>(0, 0);
    `,
  errors: [{ messageId: "mismatchedFunctionArgument" }],
});

valid.push({
  name: "Using JSON.stringify",
  code: `
JSON.stringify(
  {},
  (_, value: unknown) => value ?? undefined,
  2,
);
        `,
});

valid.push({
  name: "Using flatten",
  code: `
function flatten<T>(arr: T[][]): T[] {
  return arr.reduce((acc, a) => acc.concat(a), []);
}
        `,
});

valid.push({
  name: "Using a number literal in a function that takes a number literal",
  code: `${fruitEnumDefinition}
function useFruit(fruit: Fruit | -1) {}
useFruit(-1);
        `,
});

// It looks like it isn't possible for the rule to be smart enough to handle this.
invalid.push({
  name: "Using a default map",
  code: `${fruitEnumDefinition}

type FactoryFunction<V, A extends unknown[]> = (...extraArgs: A) => V;
type FirstArg<K, V, A extends unknown[]> =
  | Iterable<[K, V]>
  | V
  | FactoryFunction<V, A>;
type SecondArg<V, A extends unknown[]> = V | FactoryFunction<V, A>;

interface ParsedArgs<K, V, A extends unknown[]> {
  iterable: Iterable<[K, V]> | undefined;
  defaultValue: V | undefined;
  defaultValueFactory: FactoryFunction<V, A> | undefined;
}

export class DefaultMap<K, V, A extends unknown[] = []> extends Map<K, V> {
  private defaultValue: V | undefined;
  private defaultValueFactory: FactoryFunction<V, A> | undefined;

  constructor(
    iterableOrDefaultValueOrDefaultValueFactory: FirstArg<K, V, A>,
    defaultValueOrDefaultValueFactory?: SecondArg<V, A>,
  ) {
    const { iterable, defaultValue, defaultValueFactory } = parseArguments(
      iterableOrDefaultValueOrDefaultValueFactory,
      defaultValueOrDefaultValueFactory,
    );

    if (defaultValue === undefined && defaultValueFactory === undefined) {
      throw new Error(
        "A DefaultMap must be instantiated with either a default value or a function that returns a default value.",
      );
    }

    if (iterable === undefined) {
      super();
    } else {
      super(iterable);
    }

    this.defaultValue = defaultValue;
    this.defaultValueFactory = defaultValueFactory;
  }

  getAndSetDefault(key: K, ...extraArgs: A): V {
    const value = this.get(key);
    if (value !== undefined) {
      return value;
    }

    const defaultValue = this.getDefaultValue(...extraArgs);
    this.set(key, defaultValue);
    return defaultValue;
  }

  getDefaultValue(...extraArgs: A): V {
    if (this.defaultValue !== undefined) {
      return this.defaultValue;
    }

    if (this.defaultValueFactory !== undefined) {
      return this.defaultValueFactory(...extraArgs);
    }

    throw new Error("A DefaultMap was incorrectly instantiated.");
  }

  getConstructorArg(): V | FactoryFunction<V, A> {
    if (this.defaultValue !== undefined) {
      return this.defaultValue;
    }

    if (this.defaultValueFactory !== undefined) {
      return this.defaultValueFactory;
    }

    throw new Error("A DefaultMap was incorrectly instantiated.");
  }
}

function parseArguments<K, V, A extends unknown[]>(
  firstArg: FirstArg<K, V, A>,
  secondArg?: SecondArg<V, A>,
): ParsedArgs<K, V, A> {
  return secondArg === undefined
    ? parseArgumentsOne(firstArg)
    : parseArgumentsTwo(firstArg, secondArg);
}

function parseArgumentsOne<K, V, A extends unknown[]>(
  firstArg: FirstArg<K, V, A>,
): ParsedArgs<K, V, A> {
  const arg = firstArg as SecondArg<V, A>;
  const { defaultValue, defaultValueFactory } =
    parseDefaultValueOrDefaultValueFactory(arg);
  return {
    iterable: undefined,
    defaultValue,
    defaultValueFactory,
  };
}

function parseArgumentsTwo<K, V, A extends unknown[]>(
  firstArg: FirstArg<K, V, A>,
  secondArg: SecondArg<V, A>,
): ParsedArgs<K, V, A> {
  if (!Array.isArray(firstArg)) {
    throw new Error(
      "A DefaultMap constructor with two arguments must have the first argument be the initializer list.",
    );
  }

  const { defaultValue, defaultValueFactory } =
    parseDefaultValueOrDefaultValueFactory(secondArg);
  return {
    iterable: firstArg as Iterable<[K, V]>,
    defaultValue,
    defaultValueFactory,
  };
}

function parseDefaultValueOrDefaultValueFactory<V, A extends unknown[]>(
  arg: SecondArg<V, A>,
): {
  defaultValue: V | undefined;
  defaultValueFactory: FactoryFunction<V, A> | undefined;
} {
  if (typeof arg === "function") {
    return {
      defaultValue: undefined,
      defaultValueFactory: arg as FactoryFunction<V, A>,
    };
  }

  if (
    typeof arg === "boolean" ||
    typeof arg === "number" ||
    typeof arg === "string"
  ) {
    return {
      defaultValue: arg as V,
      defaultValueFactory: undefined,
    };
  }

  throw new Error(
    \`A DefaultMap was instantiated with an unknown type of: \${typeof arg}\`,
  );
}

const myDefaultMap = new DefaultMap<Fruit, Fruit, [Fruit]>(
  (fruit: Fruit) => fruit,
);
      `,
  errors: [{ messageId: "mismatchedFunctionArgument" }],
});

valid.push({
  name: "Using a function with this void and 2 arguments",
  code: `${fruitEnumDefinition}
function foo(this: void, arg1: Fruit, arg2: number) {}
foo(Fruit.Apple, 123);
  `,
});

valid.push({
  name: "Using a function with this void and 3 arguments",
  code: `${fruitEnumDefinition}
function foo(this: void, arg1: Fruit, arg2: number, arg3: number) {}
foo(Fruit.Apple, 123, 456);
  `,
});

ruleTester.run("strict-enums-functions", strictEnums, {
  valid,
  invalid,
});
