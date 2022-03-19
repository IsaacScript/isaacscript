import { merge } from "../features/saveDataManager/merge";
import { log } from "./log";

export function mergeTests(): void {
  oldTableHasUpdatedValue();
  newTableHasSameValue();
  oldTableHasUpdatedValueFromNull();
  oldTableHasFilledInterface();

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
