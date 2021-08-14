import { isVector } from "./util";

/**
 * deepCopy recursively copies a table so that none of the nested references remain.
 *
 * It will refuse to copy tables that have metatables, since that indicates that it the table is a
 * special object of some kind and cannot be copied in a generically safe way.
 *
 * There are two exceptions, which the function has explicit logic to support:
 *
 * 1. TypeScriptToLua maps
 * 2. Vectors
 *
 * @param oldTable The table to copy.
 * @param shouldSerialize Whether or not to convert children Map & Vector elements to Lua tables.
 * False by default.
 * @param traversalDescription Used to track the current key that we are operating on.
 */
export function deepCopy(
  oldTable: LuaTable,
  shouldSerialize = false,
  traversalDescription = "",
): LuaTable {
  const oldTableType = type(oldTable);
  if (oldTableType !== "table") {
    error(
      `The deepCopy function was given a ${oldTableType} instead of a table.`,
    );
  }

  if (oldTable instanceof Map) {
    if (shouldSerialize) {
      return convertMapToTable(oldTable, shouldSerialize, traversalDescription);
    }

    return deepCopyMap(
      oldTable,
      shouldSerialize,
      traversalDescription,
    ) as unknown as LuaTable;
  }

  if (isVector(oldTable)) {
    const oldVector = oldTable as unknown as Vector;

    if (shouldSerialize) {
      // We must convert the X and Y values to strings since floats cannot exist in JSON
      const vectorTable = new LuaTable();
      vectorTable.set("X", tostring(oldVector.X));
      vectorTable.set("Y", tostring(oldVector.Y));
      return vectorTable;
    }

    const newVector = Vector(oldVector.X, oldVector.Y);
    return newVector as unknown as LuaTable;
  }

  return deepCopyTable(oldTable, shouldSerialize, traversalDescription);
}

function convertMapToTable(
  oldMap: Map<AnyNotNil, unknown>,
  shouldSerialize: boolean,
  traversalDescription: string,
) {
  const newTable = new LuaTable();

  for (const [key, value] of oldMap) {
    const valueType = type(value);
    validateValue(valueType);

    let newValue: unknown;
    if (valueType === "table") {
      traversalDescription = addTraversalDescription(key, traversalDescription);
      newValue = deepCopy(
        value as LuaTable,
        shouldSerialize,
        traversalDescription,
      );
    } else {
      newValue = value;
    }

    newTable.set(key, newValue);
  }

  return newTable;
}

function deepCopyMap(
  oldMap: Map<AnyNotNil, unknown>,
  shouldSerialize: boolean,
  traversalDescription: string,
) {
  const newMap = new Map();

  for (const [key, value] of oldMap) {
    const valueType = type(value);
    validateValue(valueType);

    let newValue: unknown;
    if (valueType === "table") {
      traversalDescription = addTraversalDescription(key, traversalDescription);
      newValue = deepCopy(
        value as LuaTable,
        shouldSerialize,
        traversalDescription,
      );
    } else {
      newValue = value;
    }

    newMap.set(key, newValue);
  }

  return newMap;
}

function deepCopyTable(
  oldTable: LuaTable,
  shouldSerialize: boolean,
  traversalDescription: string,
) {
  const newTable = new LuaTable();

  checkMetatable(oldTable, traversalDescription);

  for (const [key, value] of pairs(oldTable)) {
    const valueType = type(value);
    validateValue(valueType);

    let newValue: unknown;
    if (valueType === "table") {
      traversalDescription = addTraversalDescription(key, traversalDescription);
      newValue = deepCopy(value, shouldSerialize, traversalDescription);
    } else {
      newValue = value;
    }

    newTable.set(key, newValue);
  }

  return newTable;
}

function checkMetatable(oldTable: LuaTable, traversalDescription: string) {
  // Lua tables can have metatables, which make writing a generic deep-cloner impossible
  // All TypeScriptToLua objects use metatables
  const metatable = getmetatable(oldTable);
  if (metatable === null) {
    return;
  }

  const tableDescription =
    traversalDescription === ""
      ? "the table to copy"
      : `"${traversalDescription}"`;

  error(
    `The deepCopy function detected that ${tableDescription} has a metatable. Copying tables with metatables is not supported.`,
  );
}

function validateValue(valueType: string) {
  if (
    valueType === "function" ||
    valueType === "nil" ||
    valueType === "thread" ||
    valueType === "userdata"
  ) {
    error(
      `The deepCopy function does not support cloning tables that have elements of type ${valueType} in them.`,
    );
  }
}

export function addTraversalDescription(
  key: AnyNotNil,
  traversalDescription: string,
): string {
  if (traversalDescription !== "") {
    traversalDescription += " --> ";
  }

  traversalDescription += tostring(key);

  return traversalDescription;
}
