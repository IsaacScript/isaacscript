import {
  TSTL_MAP_BRAND,
  TSTL_OBJECT_WITH_NUMBER_KEYS_BRAND,
  TSTL_SET_BRAND,
  VECTOR_BRAND,
} from "../constants";
import { DEBUG } from "../debug";
import { log } from "./log";
import { isSerializedVector, isVector } from "./util";

export enum SerializationType {
  NONE,
  SERIALIZE,
  DESERIALIZE,
}

/**
 * deepCopy returns a new Lua table, a TypeScriptToLua Map, or a TypeScriptToLua Set that is
 * identical to the provided one. It will recursively copy all of the values so that none of the
 * nested references remain.
 *
 * It will refuse to copy tables that have metatables, since that indicates that it the table is a
 * special object of some kind and cannot be copied in a generically safe way. There are three
 * exceptions, which the function has explicit logic to support:
 *
 * 1. TypeScriptToLua Maps
 * 2. TypeScriptToLua Sets
 * 2. Vectors
 *
 * @param oldObject The Lua table or TypeScriptToLua Map to copy.
 * @param serializationType Has 3 possible values. Can leave TypeScriptToLua objects as-is, or can
 * serialize objects to Lua tables, or can deserialize Lua tables to objects. No serialization by
 * default.
 * @param traversalDescription Used to track the current key that we are operating on.
 */
export function deepCopy(
  oldObject: LuaTable | Map<AnyNotNil, unknown> | Set<AnyNotNil>,
  serializationType = SerializationType.NONE,
  traversalDescription = "",
): LuaTable | Map<AnyNotNil, unknown> | Set<AnyNotNil> {
  const oldObjectType = type(oldObject);
  if (oldObjectType !== "table") {
    error(
      `The deepCopy function was given a ${oldObjectType} instead of a table.`,
    );
  }

  if (DEBUG) {
    let logString = `deepCopy is operating on: ${traversalDescription}`;
    if (serializationType === SerializationType.SERIALIZE) {
      logString += " (serializing)";
    } else if (serializationType === SerializationType.DESERIALIZE) {
      logString += " (deserializing)";
    }
    log(logString);
  }

  const isTSTLMap = oldObject instanceof Map;
  const isTSTLSet = oldObject instanceof Set;

  let hasTSTLMapBrand = false;
  let hasTSTLSetBrand = false;
  if (!isTSTLMap && !isTSTLSet) {
    const oldTable = oldObject as unknown as LuaTable;
    checkMetatable(oldTable, traversalDescription);

    hasTSTLMapBrand = oldTable.has(TSTL_MAP_BRAND);
    hasTSTLSetBrand = oldTable.has(TSTL_SET_BRAND);
  }

  // Instantiate the new object
  let newObject: LuaTable | Map<AnyNotNil, unknown> | Set<AnyNotNil>;
  if (
    (serializationType === SerializationType.NONE &&
      oldObject instanceof Map) ||
    (serializationType === SerializationType.DESERIALIZE && hasTSTLMapBrand)
  ) {
    newObject = new Map();
  } else if (
    (serializationType === SerializationType.NONE &&
      oldObject instanceof Set) ||
    (serializationType === SerializationType.DESERIALIZE && hasTSTLSetBrand)
  ) {
    newObject = new Set();
  } else {
    newObject = new LuaTable();
  }

  // If we are serializing, brand TSTL objects
  if (serializationType === SerializationType.SERIALIZE) {
    const newTable = newObject as LuaTable;
    if (oldObject instanceof Map) {
      newTable.set(TSTL_MAP_BRAND, "");
    } else if (oldObject instanceof Set) {
      newTable.set(TSTL_SET_BRAND, "");
    }
  }

  // Depending on whether we are working on a Lua table or a TypeScriptToLua object,
  // we need to iterate over the object in a specific way
  if (oldObject instanceof Map) {
    for (const [key, value] of oldObject) {
      if (isBrand(key)) {
        continue;
      }

      deepCopyValue(
        oldObject,
        newObject,
        key,
        value,
        traversalDescription,
        serializationType,
      );
    }
  } else if (oldObject instanceof Set) {
    for (const key of oldObject) {
      if (isBrand(key)) {
        continue;
      }

      // For serialization purposes, represent a Set as a table with keys that match the values in
      // the set and values that are an empty string
      const value = "";
      deepCopyValue(
        oldObject,
        newObject,
        key,
        value,
        traversalDescription,
        serializationType,
      );
    }
  } else {
    for (const [key, value] of pairs(oldObject)) {
      if (isBrand(key)) {
        continue;
      }

      deepCopyValue(
        oldObject,
        newObject,
        key,
        value,
        traversalDescription,
        serializationType,
      );
    }
  }

  return newObject;
}

function isBrand(key: AnyNotNil) {
  return (
    key === TSTL_MAP_BRAND ||
    key === TSTL_SET_BRAND ||
    key === TSTL_OBJECT_WITH_NUMBER_KEYS_BRAND
  );
}

function deepCopyValue(
  oldObject: LuaTable | Map<AnyNotNil, unknown> | Set<AnyNotNil>,
  newObject: LuaTable | Map<AnyNotNil, unknown> | Set<AnyNotNil>,
  key: AnyNotNil,
  value: unknown,
  traversalDescription: string,
  serializationType: SerializationType,
) {
  const valueType = type(value);
  validateValue(value, valueType, traversalDescription);

  // First, handle the special case of serializing a value for a TSTL object that uses integer keys
  // These will be converted to JSON as an array, which will insert a bunch of unnecessary "null"
  // entires (e.g. "[null, null, null, 123]" for a TSTL Map with one entry at index 4)
  // To work around this, we simply convert all integer keys to strings
  // We mark the table with a special identifier key so that we can properly deserialize it later
  // This key will be set over and over for every element in the Map, but we have to do it here
  // since we are not able to derive the type of Map keys at runtime
  let convertNumberKeysToString = false;
  const isTSTLObject = oldObject instanceof Map || oldObject instanceof Set;
  const keyType = type(key);
  if (
    serializationType === SerializationType.SERIALIZE &&
    isTSTLObject &&
    keyType === "number"
  ) {
    convertNumberKeysToString = true;

    const newTable = newObject as LuaTable;
    newTable.set(TSTL_OBJECT_WITH_NUMBER_KEYS_BRAND, true);

    if (DEBUG) {
      log("deepCopy is converting a TSTL map with number keys to strings.");
    }
  }

  // Get the value to set on the new object
  let newValue: unknown;
  if (isVector(value)) {
    const vector = value as Vector;
    newValue = copyVector(vector, serializationType);
  } else if (
    isSerializedVector(value) &&
    serializationType === SerializationType.DESERIALIZE
  ) {
    const serializedVector = value as LuaTable;
    newValue = deserializeVector(serializedVector);
  } else if (valueType === "table") {
    const table = value as LuaTable;
    traversalDescription = addTraversalDescription(key, traversalDescription);
    newValue = deepCopy(table, serializationType, traversalDescription);
  } else if (convertNumberKeysToString) {
    newValue = tostring(value);
  } else {
    newValue = value;
  }

  // Set the value on the new object
  // Even though the "set()" invocations below are identical,
  // we must narrow the type for the method to be transpiled correctly
  if (newObject instanceof Map) {
    newObject.set(key, newValue);
  } else if (newObject instanceof Set) {
    newObject.add(key);
  } else {
    newObject.set(key, newValue);
  }
}

function copyVector(vector: Vector, serializationType: SerializationType) {
  if (serializationType === SerializationType.SERIALIZE) {
    // We convert the X and Y values to strings just in case the JSON encoding messes up the float
    // values
    const vectorTable = new LuaTable();
    vectorTable.set("X", tostring(vector.X));
    vectorTable.set("Y", tostring(vector.Y));
    vectorTable.set(VECTOR_BRAND, "");
    return vectorTable;
  }

  const newVector = Vector(vector.X, vector.Y);
  return newVector;
}

export function deserializeVector(vectorTable: LuaTable): Vector {
  const xString = vectorTable.get("X") as string;
  const x = tonumber(xString);
  if (x === undefined) {
    error("Failed to read the X value of a serialized vector.");
  }

  const yString = vectorTable.get("Y") as string;
  const y = tonumber(yString);
  if (y === undefined) {
    error("Failed to read the Y value of a serialized vector.");
  }

  return Vector(x, y);
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
    `The deepCopy function detected that ${tableDescription} has a metatable. Copying tables with metatables is not supported (unless they are TypeScriptToLua Maps).`,
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
