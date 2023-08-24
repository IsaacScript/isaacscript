import { DefaultMap } from "../classes/DefaultMap";
import { SerializationType } from "../enums/SerializationType";
import { deepCopy } from "./deepCopy";
import { logAndPrint } from "./log";
import { merge } from "./merge";
import { isRNG, newRNG } from "./rng";
import { isSerializedIsaacAPIClass } from "./serialization";
import { isVector, serializeVector } from "./vector";

/**
 * Run the suite of tests that prove that the "merge" function works properly.
 *
 * This function is only useful if you are troubleshooting the save data manager.
 */
export function runMergeTests(): void {
  oldTableHasUpdatedValue();
  newTableHasSameValue();
  oldTableHasUpdatedValueFromNull();
  oldTableHasSerializedIsaacAPIClass();

  oldTableHasFilledChildTable();
  oldTableHasFilledMap();
  oldTableHasFilledDefaultMap();

  oldTableHasVector();
  oldTableHasVectorSerialized();
  oldTableHasRNG();
  oldTableHasRNGSerialized();

  const successText = "All merge tests passed!";
  logAndPrint(successText);
}

function oldTableHasUpdatedValue() {
  const key = "foo";
  const oldValue = "bar";
  const newValue = "baz";
  const oldTable = {
    foo: oldValue,
  } as unknown as LuaMap<AnyNotNil, unknown>;
  const newTable = {
    foo: newValue,
  } as unknown as LuaMap<AnyNotNil, unknown>;

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
  } as unknown as LuaMap<AnyNotNil, unknown>;
  const newTable = {
    foo: newValue,
  } as unknown as LuaMap<AnyNotNil, unknown>;

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
  } as unknown as LuaMap<AnyNotNil, unknown>;
  const newTable = {
    foo: newValue,
  } as unknown as LuaMap<AnyNotNil, unknown>;

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

  const vectorSerialized = serializeVector(vector);
  if (!isSerializedIsaacAPIClass(vectorSerialized)) {
    error(
      'The "isSerializedIsaacAPIClass" function says that a serialized vector is not serialized.',
    );
  }
}

function oldTableHasFilledChildTable() {
  interface Foo {
    bar: string;
  }

  const key = "foo";
  const newValue = "baz";
  const oldTable = {
    foo: null as Foo | null,
  } as unknown as LuaMap<AnyNotNil, unknown>;
  const foo: Foo = {
    bar: newValue,
  };
  const newTable = {
    foo,
  } as unknown as LuaMap<AnyNotNil, unknown>;

  merge(oldTable, newTable, "oldTableHasFilledChildTable");

  const oldTableValue = oldTable.get(key) as Foo | undefined;
  if (oldTableValue === undefined) {
    error(`The old table's key of "${key}" was not filled.`);
  }

  if (oldTableValue.bar !== newValue) {
    error('The old table\'s key of "bar" was not filled.');
  }
}

function oldTableHasFilledMap() {
  const fakeV = {
    run: {
      myMap: new Map<string, string>(),
    },
  };

  const saveData = {
    run: {
      myMap: new Map<string, string>([
        ["foo1", "bar1"],
        ["foo2", "bar2"],
        ["foo3", "bar3"],
      ]),
    },
  };
  const serializedSaveData = deepCopy(saveData, SerializationType.SERIALIZE);

  merge(
    fakeV as unknown as LuaMap,
    serializedSaveData as LuaMap,
    "oldTableHasFilledMap",
  );

  const expectedSize = 3;
  if (fakeV.run.myMap.size !== expectedSize) {
    error(
      `The size of the merged map was equal to ${fakeV.run.myMap.size}, but it should be equal to: ${expectedSize}`,
    );
  }

  {
    const key = "foo1";
    const expectedValue = "bar1";

    const value = fakeV.run.myMap.get(key);
    if (value !== expectedValue) {
      error(
        `The old table's map key of "${key}" was not equal to "${expectedValue}" and was instead equal to: ${value}`,
      );
    }
  }

  {
    const key = "foo2";
    const expectedValue = "bar2";

    const value = fakeV.run.myMap.get(key);
    if (value !== expectedValue) {
      error(
        `The old table's map key of "${key}" was not equal to "${expectedValue}" and was instead equal to: ${value}`,
      );
    }
  }

  {
    const key = "foo3";
    const expectedValue = "bar3";

    const value = fakeV.run.myMap.get(key);
    if (value !== expectedValue) {
      error(
        `The old table's map key of "${key}" was not equal to "${expectedValue}" and was instead equal to: ${value}`,
      );
    }
  }
}

function oldTableHasFilledDefaultMap() {
  const fakeV = {
    run: {
      myDefaultMap: new DefaultMap<string, string>("default"),
    },
  };

  const saveData = {
    run: {
      myDefaultMap: new DefaultMap<string, string>("default", [
        ["foo1", "bar1"],
        ["foo2", "bar2"],
        ["foo3", "bar3"],
      ]),
    },
  };
  const serializedSaveData = deepCopy(saveData, SerializationType.SERIALIZE);

  merge(
    fakeV as unknown as LuaMap,
    serializedSaveData as LuaMap,
    "oldTableHasFilledDefaultMap",
  );

  const expectedSize = 3;
  if (fakeV.run.myDefaultMap.size !== expectedSize) {
    error(
      `The size of the merged default map was equal to ${fakeV.run.myDefaultMap.size}, but it should be equal to: ${expectedSize}`,
    );
  }

  {
    const key = "foo1";
    const expectedValue = "bar1";

    const value = fakeV.run.myDefaultMap.get(key);
    if (value !== expectedValue) {
      error(
        `The old table's default map key of "${key}" was not equal to "${expectedValue}" and was instead equal to: ${value}`,
      );
    }
  }

  {
    const key = "foo2";
    const expectedValue = "bar2";

    const value = fakeV.run.myDefaultMap.get(key);
    if (value !== expectedValue) {
      error(
        `The old table's default map key of "${key}" was not equal to "${expectedValue}" and was instead equal to: ${value}`,
      );
    }
  }

  {
    const key = "foo3";
    const expectedValue = "bar3";

    const value = fakeV.run.myDefaultMap.get(key);
    if (value !== expectedValue) {
      error(
        `The old table's default map key of "${key}" was not equal to "${expectedValue}" and was instead equal to: ${value}`,
      );
    }
  }
}

function oldTableHasVector() {
  interface Foo {
    bar: Vector;
  }

  const key = "foo";
  const x = 50;
  const y = 60;
  const newValue = Vector(x, y);
  const oldTable = {
    foo: null as Foo | null,
  } as unknown as LuaMap<AnyNotNil, unknown>;
  const foo: Foo = {
    bar: newValue,
  };
  const newTable = {
    foo,
  } as unknown as LuaMap<AnyNotNil, unknown>;

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
  interface Foo {
    bar: Vector;
  }

  const key = "foo";
  const x = 50;
  const y = 60;
  const newValue = Vector(x, y);
  const oldTable = {
    foo: null as Foo | null,
  } as unknown as LuaMap<AnyNotNil, unknown>;
  const foo: Foo = {
    bar: newValue,
  };
  const newTable = {
    foo,
  } as unknown as LuaMap<AnyNotNil, unknown>;
  const newTableSerialized = deepCopy(
    newTable,
    SerializationType.SERIALIZE,
    "oldTableHasVectorSerialized",
  ) as LuaMap<AnyNotNil, unknown>;

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
  interface Foo {
    bar: RNG;
  }

  const key = "foo";
  const seed = 50 as Seed;
  const newValue = newRNG(seed);
  const oldTable = {
    foo: null as Foo | null,
  } as unknown as LuaMap<AnyNotNil, unknown>;
  const foo: Foo = {
    bar: newValue,
  };
  const newTable = {
    foo,
  } as unknown as LuaMap<AnyNotNil, unknown>;

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
  interface Foo {
    bar: RNG;
  }

  const key = "foo";
  const seed = 50 as Seed;
  const newValue = newRNG(seed);
  const oldTable = {
    foo: null as Foo | null,
  } as unknown as LuaMap<AnyNotNil, unknown>;
  const foo: Foo = {
    bar: newValue,
  };
  const newTable = {
    foo,
  } as unknown as LuaMap<AnyNotNil, unknown>;
  const newTableSerialized = deepCopy(
    newTable,
    SerializationType.SERIALIZE,
    "oldTableHasRNGSerialized",
  ) as LuaMap<AnyNotNil, unknown>;

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
