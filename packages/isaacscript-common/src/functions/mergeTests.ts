import { SerializationType } from "../enums/SerializationType";
import { merge } from "../features/saveDataManager/merge";
import { deepCopy } from "./deepCopy";
import { log } from "./log";
import { isRNG, newRNG } from "./rng";
import { isSerializedIsaacAPIClass } from "./serialization";
import { copyVector, isVector } from "./vector";

export function mergeTests(): void {
  oldTableHasUpdatedValue();
  newTableHasSameValue();
  oldTableHasUpdatedValueFromNull();
  oldTableHasSerializedIsaacAPIClass();

  oldTableHasFilledInterface();
  oldTableHasVector();
  oldTableHasVectorSerialized();
  oldTableHasRNG();
  oldTableHasRNGSerialized();

  log("All merge tests passed!");
}

function oldTableHasUpdatedValue() {
  const key = "foo";
  const oldValue = "bar";
  const newValue = "baz";
  const oldTable = {
    foo: oldValue,
  } as unknown as LuaTable<AnyNotNil, unknown>;
  const newTable = {
    foo: newValue,
  } as unknown as LuaTable<AnyNotNil, unknown>;

  merge(oldTable, newTable, "oldTableHasUpdatedValue");

  const oldTableValue = oldTable.get(key) as string;
  if (oldTableValue !== newValue) {
    error(`The old table does not have a value of: ${newValue}`);
  }
}

function newTableHasSameValue() {
  const key = "foo";
  const oldValue = "bar";
  const newValue = "baz";
  const oldTable = {
    foo: oldValue,
  } as unknown as LuaTable<AnyNotNil, unknown>;
  const newTable = {
    foo: newValue,
  } as unknown as LuaTable<AnyNotNil, unknown>;

  merge(oldTable, newTable, "newTableHasSameValue");

  const newTableValue = newTable.get(key) as string;
  if (newTableValue !== newValue) {
    error(`The new table does not have a value of: ${newValue}`);
  }
}

function oldTableHasUpdatedValueFromNull() {
  const key = "foo";
  const newValue = "baz";
  const oldTable = {
    foo: null as string | null,
  } as unknown as LuaTable<AnyNotNil, unknown>;
  const newTable = {
    foo: newValue,
  } as unknown as LuaTable<AnyNotNil, unknown>;

  merge(oldTable, newTable, "oldTableHasUpdatedValueFromNull");

  const oldTableValue = oldTable.get(key) as string;
  if (oldTableValue !== newValue) {
    error(`The old table does not have a value of: ${newValue}`);
  }
}

function oldTableHasSerializedIsaacAPIClass() {
  const x = 50;
  const y = 60;
  const vector = Vector(x, y);

  const vectorSerialized = copyVector(vector, SerializationType.SERIALIZE);
  if (!isSerializedIsaacAPIClass(vectorSerialized)) {
    error(
      'The "isSerializedIsaacAPIClass" function says that a serialized vector is not serialized.',
    );
  }
}

function oldTableHasFilledInterface() {
  interface Foo {
    bar: string;
  }

  const key = "foo";
  const newValue = "baz";
  const oldTable = {
    foo: null as Foo | null,
  } as unknown as LuaTable<AnyNotNil, unknown>;
  const foo: Foo = {
    bar: newValue,
  };
  const newTable = {
    foo,
  } as unknown as LuaTable<AnyNotNil, unknown>;

  merge(oldTable, newTable, "oldTableHasFilledInterface");

  const oldTableValue = oldTable.get(key) as Foo | undefined;
  if (oldTableValue === undefined) {
    error(`The old table's key of "${key}" was not filled.`);
  }

  if (oldTableValue.bar !== newValue) {
    error('The old table\'s key of "bar" was not filled.');
  }
}

function oldTableHasVector() {
  log("Starting test: oldTableHasVector");

  interface Foo {
    bar: Vector;
  }

  const key = "foo";
  const x = 50;
  const y = 60;
  const newValue = Vector(x, y);
  const oldTable = {
    foo: null as Foo | null,
  } as unknown as LuaTable<AnyNotNil, unknown>;
  const foo: Foo = {
    bar: newValue,
  };
  const newTable = {
    foo,
  } as unknown as LuaTable<AnyNotNil, unknown>;

  merge(oldTable, newTable, "oldTableHasVector");

  const oldTableValue = oldTable.get(key) as Foo | undefined;
  if (oldTableValue === undefined) {
    error(`The old table's key of "${key}" was not filled.`);
  }

  if (oldTableValue.bar.X !== x) {
    error(`The old table's value for "x" does not match: ${x}`);
  }

  if (oldTableValue.bar.Y !== y) {
    error(`The old table's value for "y" does not match: ${y}`);
  }

  if (!isVector(oldTableValue.bar)) {
    error("The old table's value is not a Vector object.");
  }
}

function oldTableHasVectorSerialized() {
  log("Starting test: oldTableHasVectorSerialized");

  interface Foo {
    bar: Vector;
  }

  const key = "foo";
  const x = 50;
  const y = 60;
  const newValue = Vector(x, y);
  const oldTable = {
    foo: null as Foo | null,
  } as unknown as LuaTable<AnyNotNil, unknown>;
  const foo: Foo = {
    bar: newValue,
  };
  const newTable = {
    foo,
  } as unknown as LuaTable<AnyNotNil, unknown>;
  const newTableSerialized = deepCopy(
    newTable,
    SerializationType.SERIALIZE,
  ) as LuaTable<AnyNotNil, unknown>;

  merge(oldTable, newTableSerialized, "oldTableHasVectorSerialized");

  const oldTableValue = oldTable.get(key) as Foo | undefined;
  if (oldTableValue === undefined) {
    error(`The old table's key of "${key}" was not filled.`);
  }

  if (oldTableValue.bar.X !== x) {
    error(`The old table's value for "x" does not match: ${x}`);
  }

  if (oldTableValue.bar.Y !== y) {
    error(`The old table's value for "y" does not match: ${y}`);
  }

  if (!isVector(oldTableValue.bar)) {
    error(
      "The old table's value is not a Vector object (during the serialized test).",
    );
  }
}

function oldTableHasRNG() {
  log("Starting test: oldTableHasRNG");

  interface Foo {
    bar: RNG;
  }

  const key = "foo";
  const seed = 50 as Seed;
  const newValue = newRNG(seed);
  const oldTable = {
    foo: null as Foo | null,
  } as unknown as LuaTable<AnyNotNil, unknown>;
  const foo: Foo = {
    bar: newValue,
  };
  const newTable = {
    foo,
  } as unknown as LuaTable<AnyNotNil, unknown>;

  merge(oldTable, newTable, "oldTableHasRNG");

  const oldTableValue = oldTable.get(key) as Foo | undefined;
  if (oldTableValue === undefined) {
    error(`The old table's key of "${key}" was not filled.`);
  }

  if (!isRNG(oldTableValue.bar)) {
    error("The old table's value is not an RNG object.");
  }

  const newSeed = oldTableValue.bar.GetSeed();
  if (newSeed !== seed) {
    error(`The old table's seed not match: ${seed}`);
  }
}

function oldTableHasRNGSerialized() {
  log("Starting test: oldTableHasRNGSerialized");

  interface Foo {
    bar: RNG;
  }

  const key = "foo";
  const seed = 50 as Seed;
  const newValue = newRNG(seed);
  const oldTable = {
    foo: null as Foo | null,
  } as unknown as LuaTable<AnyNotNil, unknown>;
  const foo: Foo = {
    bar: newValue,
  };
  const newTable = {
    foo,
  } as unknown as LuaTable<AnyNotNil, unknown>;
  const newTableSerialized = deepCopy(
    newTable,
    SerializationType.SERIALIZE,
  ) as LuaTable<AnyNotNil, unknown>;

  merge(oldTable, newTableSerialized, "oldTableHasRNGSerialized");

  const oldTableValue = oldTable.get(key) as Foo | undefined;
  if (oldTableValue === undefined) {
    error(`The old table's key of "${key}" was not filled.`);
  }

  if (!isRNG(oldTableValue.bar)) {
    error(
      "The old table's value is not an RNG object (during the serialized test).",
    );
  }

  const newSeed = oldTableValue.bar.GetSeed();
  if (newSeed !== seed) {
    error(`The old table's seed not match: ${seed}`);
  }
}
