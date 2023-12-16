/**
 * Helper type to validate that a union of interfaces with a field of `type` that is based on an
 * enum is complete.
 *
 * For example:
 *
 * ```ts
 * enum ObjectiveType {
 *   Foo,
 *   Bar,
 *   Baz,
 * }
 *
 * interface FooObjective {
 *   type: ObjectiveType.Foo;
 *   fooThing: number;
 * }
 *
 * interface BarObjective {
 *   type: ObjectiveType.Bar;
 *   barThing: string;
 * }
 *
 * type Objective = FooObjective | BarObjective;
 * type _Test = CompositionTypeSatisfiesEnum<Objective, ObjectiveType>;
 * ```
 *
 * In this example, `Test` would be flagged by TypeScript because `Objective` does not contain an
 * entry for `BazObjective`.
 */
export type CompositionTypeSatisfiesEnum<
  T extends { type: unknown },
  _Enum extends T["type"],
> = unknown;

// -----
// Tests
// -----

enum ObjectiveType {
  Foo = "Foo",
  Bar = "Bar",
  Baz = "Baz",
}

interface FooObjective {
  type: ObjectiveType.Foo;
  fooThing: number;
}

interface BarObjective {
  type: ObjectiveType.Bar;
  barThing: string;
}

interface BazObjective {
  type: ObjectiveType.Baz;
  bazThing: string;
}

type Objective1 = FooObjective | BarObjective | BazObjective;
type _Test1 = CompositionTypeSatisfiesEnum<Objective1, ObjectiveType>;

type Objective2 = FooObjective | BarObjective;
// @ts-expect-error Missing "Baz".
type _Test2 = CompositionTypeSatisfiesEnum<Objective2, ObjectiveType>;
