/**
 * deepCopy recursively copies a table so that none of the nested references remain.
 * It will refuse to copy tables that have metatables, since that indicates that it the table is a
 * special object of some kind and cannot be copied in a generically safe way. The one exception is
 * TypeScriptToLua maps, which this function has explicit logic to support.
 *
 * @param oldTable The table to copy.
 * @param convertMapsToTables Whether or not to convert children Map elements to Lua tables. False
 * by default.
 * @param tableName Used to track the current key that we are operating on.
 */
export function deepCopy(
  oldTable: LuaTable,
  convertMapsToTables = false,
  tableName = "unknown" as AnyNotNil,
): LuaTable {
  const oldTableType = type(oldTable);
  if (oldTableType !== "table") {
    error(
      `The deepCopy function was given a ${oldTableType} instead of a table.`,
    );
  }

  if (oldTable instanceof Map) {
    if (convertMapsToTables) {
      return convertMapToTable(oldTable, convertMapsToTables);
    }

    return deepCopyMap(oldTable, convertMapsToTables) as unknown as LuaTable;
  }

  return deepCopyTable(oldTable, tableName, convertMapsToTables);
}

function convertMapToTable(
  oldMap: Map<AnyNotNil, unknown>,
  convertMapsToTables: boolean,
) {
  const newTable = new LuaTable();

  for (const [key, value] of oldMap) {
    const valueType = type(value);
    validateValue(valueType);

    let newValue: unknown;
    if (valueType === "table") {
      newValue = deepCopy(value as LuaTable, convertMapsToTables, key);
    } else {
      newValue = value;
    }

    newTable.set(key, newValue);
  }

  return newTable;
}

function deepCopyMap(
  oldMap: Map<AnyNotNil, unknown>,
  convertMapsToTables: boolean,
) {
  const newMap = new Map();

  for (const [key, value] of oldMap) {
    const valueType = type(value);
    validateValue(valueType);

    let newValue: unknown;
    if (valueType === "table") {
      newValue = deepCopy(value as LuaTable, convertMapsToTables, key);
    } else {
      newValue = value;
    }

    newMap.set(key, newValue);
  }

  return newMap;
}

function deepCopyTable(
  oldTable: LuaTable,
  tableName: AnyNotNil,
  convertMapsToTables: boolean,
) {
  const newTable = new LuaTable();

  checkMetatable(oldTable, tableName);

  for (const [key, value] of pairs(oldTable)) {
    const valueType = type(value);
    validateValue(valueType);

    let newValue: unknown;
    if (valueType === "table") {
      newValue = deepCopy(value, convertMapsToTables, key);
    } else {
      newValue = value;
    }

    newTable.set(key, newValue);
  }

  return newTable;
}

function checkMetatable(oldTable: LuaTable, tableName: AnyNotNil) {
  // Lua tables can have metatables, which make writing a generic deep-cloner impossible
  // All TypeScriptToLua objects use metatables
  const metatable = getmetatable(oldTable);
  if (metatable === null) {
    return;
  }

  const tableNameType = type(tableName);
  const tableDescription =
    tableNameType === "string"
      ? `the "${tableName}" table`
      : "a child element of the table to copy";

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
