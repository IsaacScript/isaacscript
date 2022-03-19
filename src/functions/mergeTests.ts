import { SerializationType } from "../enums/SerializationType";
import { merge } from "../features/saveDataManager/merge";
import { deepCopy } from "./deepCopy";
import { log } from "./log";
import { isVector } from "./vector";

export function mergeTests(): void {
  oldTableHasUpdatedValue();
  newTableHasSameValue();
  oldTableHasUpdatedValueFromNull();
  oldTableHasFilledInterface();
  oldTableHasVector();
  oldTableHasVectorSerialized();

  log("All merge tests passed!");
}

function oldTableHasUpdatedValue() {
  const key = "foo";
  const oldValue = "bar";
  const newValue = "baz";
  const oldTable = {
    foo: oldValue,
  } as unknown as LuaTable;
  const newTable = {
    foo: newValue,
  } as unknown as LuaTable;

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
  } as unknown as LuaTable;
  const newTable = {
    foo: newValue,
  } as unknown as LuaTable;

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
  } as unknown as LuaTable;
  const newTable = {
    foo: newValue,
  } as unknown as LuaTable;

  merge(oldTable, newTable, "oldTableHasUpdatedValueFromNull");

  const oldTableValue = oldTable.get(key) as string;
  if (oldTableValue !== newValue) {
    error(`The old table does not have a value of: ${newValue}`);
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
  } as unknown as LuaTable;
  const foo: Foo = {
    bar: newValue,
  };
  const newTable = {
    foo,
  } as unknown as LuaTable;

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
  interface Foo {
    bar: Vector;
  }

  const key = "foo";
  const x = 50;
  const y = 60;
  const newValue = Vector(x, y);
  const oldTable = {
    foo: null as Foo | null,
  } as unknown as LuaTable;
  const foo: Foo = {
    bar: newValue,
  };
  const newTable = {
    foo,
  } as unknown as LuaTable;

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
  } as unknown as LuaTable;
  const foo: Foo = {
    bar: newValue,
  };
  const newTable = {
    foo,
  } as unknown as LuaTable;
  const newTableSerialized = deepCopy(
    newTable,
    SerializationType.SERIALIZE,
  ) as LuaTable;

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
    error("The old table's value is not a Vector object.");
  }
}
