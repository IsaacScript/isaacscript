import { log } from "./log";
import { isVector } from "./util";

const DEBUG = false;

/**
 * deepCopy returns a new Lua table or a TypeScriptToLua Map that is identical to the provided one.
 * It will recursively copy all of the values so that none of the nested references remain.
 *
 * It will refuse to copy tables that have metatables, since that indicates that it the table is a
 * special object of some kind and cannot be copied in a generically safe way.
 *
 * There are two exceptions, which the function has explicit logic to support:
 *
 * 1. TypeScriptToLua maps
 * 2. Vectors
 *
 * @param oldObject The Lua table or TypeScriptToLua Map to copy.
 * @param shouldSerialize Whether or not to convert children Map & Vector elements to Lua tables.
 * False by default. Set to true when preparing data to be encoded as JSON and saved to disk.
 * @param traversalDescription Used to track the current key that we are operating on.
 */
export function deepCopy(
  oldObject: LuaTable | Map<AnyNotNil, unknown>,
  shouldSerialize = false,
  traversalDescription = "",
): LuaTable | Map<AnyNotNil, unknown> {
  const oldObjectType = type(oldObject);
  if (oldObjectType !== "table") {
    error(
      `The deepCopy function was given a ${oldObjectType} instead of a table.`,
    );
  }

  if (DEBUG) {
    log(`deepCopy is operating on: ${traversalDescription}`);
  }

  if (!(oldObject instanceof Map)) {
    checkMetatable(oldObject, traversalDescription);
  }

  let newObject: LuaTable | Map<AnyNotNil, unknown>;
  if (oldObject instanceof Map && !shouldSerialize) {
    newObject = new Map();
  } else {
    newObject = new LuaTable();
  }

  // Depending on whether we are working on a TypeScriptToLua Map or a Lua table,
  // we need to iterate over the object in a specific way
  if (oldObject instanceof Map) {
    for (const [key, value] of oldObject) {
      deepCopyValue(
        newObject,
        key,
        value,
        traversalDescription,
        shouldSerialize,
      );
    }
  } else {
    for (const [key, value] of pairs(oldObject)) {
      deepCopyValue(
        newObject,
        key,
        value,
        traversalDescription,
        shouldSerialize,
      );
    }
  }

  return newObject;
}

function deepCopyValue(
  newObject: LuaTable | Map<AnyNotNil, unknown>,
  key: AnyNotNil,
  value: unknown,
  traversalDescription: string,
  shouldSerialize: boolean,
) {
  const valueType = type(value);
  validateValue(value, valueType, traversalDescription);

  let newValue: unknown;
  if (isVector(value)) {
    const vector = value as Vector;
    newValue = copyVector(vector, shouldSerialize);
  } else if (valueType === "table") {
    const table = value as LuaTable;
    traversalDescription = addTraversalDescription(key, traversalDescription);
    newValue = deepCopy(table, shouldSerialize, traversalDescription);
  } else {
    newValue = value;
  }

  // Even though the "set()" invocations below are identical,
  // we must narrow the type for the method to work correctly
  if (newObject instanceof Map) {
    newObject.set(key, newValue);
  } else {
    newObject.set(key, newValue);
  }
}

function copyVector(vector: Vector, shouldSerialize: boolean) {
  if (shouldSerialize) {
    // We convert the X and Y values to strings just in case the JSON encoding messes up the float
    // values
    const vectorTable = new LuaTable();
    vectorTable.set("X", tostring(vector.X));
    vectorTable.set("Y", tostring(vector.Y));
    return vectorTable;
  }

  const newVector = Vector(vector.X, vector.Y);
  return newVector;
}

function checkMetatable(table: LuaTable, traversalDescription: string) {
  // Lua tables can have metatables, which make writing a generic deep-cloner impossible
  // All TypeScriptToLua objects use metatables
  const metatable = getmetatable(table);
  if (metatable === null) {
    return;
  }

  const tableDescription =
    traversalDescription === ""
      ? "the table to copy"
      : `"${traversalDescription}"`;

  error(
    `The deepCopy function detected that "${tableDescription}" has a metatable. Copying tables with metatables is not supported (unless they are TypeScriptToLua Maps).`,
  );
}

function validateValue(
  value: unknown,
  valueType: string,
  traversalDescription: string,
) {
  if (isVector(value)) {
    return;
  }

  if (
    valueType === "function" ||
    valueType === "nil" ||
    valueType === "thread" ||
    valueType === "userdata"
  ) {
    error(
      `The deepCopy function detected that "${traversalDescription}" is type ${valueType}, which is not supported.`,
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
