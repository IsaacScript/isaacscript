import { DefaultMap } from "../classes/DefaultMap";
import { SerializationBrand } from "../enums/private/SerializationBrand";
import { SerializationType } from "../enums/SerializationType";
import { arrayEquals } from "./array";
import { deepCopy } from "./deepCopy";
import { log } from "./log";
import { isDefaultMap, isTSTLMap, isTSTLSet } from "./tstlClass";
import { isNumber, isString, isTable } from "./types";

/**
 * Run the suite of tests that prove that the "deepCopy" helper function works properly.
 *
 * This function is only useful if you are troubleshooting the "deepCopy" function.
 */
export function runDeepCopyTests(): void {
  copiedObjectIsTable();
  copiedObjectHasKeyAndValueString();
  copiedTableHasKeyAndValueNumber();
  copiedTableDoesNotCoerceTypes();
  copiedObjectHasNoReferencesForPrimitivesForward();
  copiedObjectHasNoReferencesForPrimitivesBackward();
  copiedObjectHasNoReferencesForArray();
  copiedObjectHasChildObject();

  copiedMapIsMap();
  copiedMapHasValue();

  copiedSetIsSet();
  copiedSetHasValue();

  copiedMapHasChildMap();
  copiedDefaultMapHasChildDefaultMap();
  copiedDefaultMapHasBrand();

  log("All deep copy tests passed!");
}

function copiedObjectIsTable() {
  const oldObject = {
    abc: "def",
  };
  const newObject = deepCopy(
    oldObject as unknown as LuaMap,
    SerializationType.NONE,
    "copiedObjectIsTable",
  );
  if (!isTable(newObject)) {
    error(`The copied object had a type of: ${typeof newObject}`);
  }
}

function copiedObjectHasKeyAndValueString() {
  const keyToLookFor = "abc";
  const valueToLookFor = "def";
  const oldObject = {
    abc: valueToLookFor,
  };
  const newTable = deepCopy(
    oldObject as unknown as LuaMap,
    SerializationType.NONE,
    "copiedObjectHasKeyAndValueString",
  );
  const newObject = newTable as typeof oldObject;

  const value = newObject[keyToLookFor];
  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
  if (value === undefined) {
    error(`The copied object did not have a key of: ${keyToLookFor}`);
  }

  if (!isString(value)) {
    error(`The copied object had a value type of: ${typeof value}`);
  }
  if (value !== valueToLookFor) {
    error(`The copied object had a value of: ${value}`);
  }
}

function copiedTableHasKeyAndValueNumber() {
  const keyToLookFor = 123;
  const valueToLookFor = 456;
  const oldTable = new LuaMap<AnyNotNil, unknown>();
  oldTable.set(keyToLookFor, valueToLookFor);

  const newObject = deepCopy(
    oldTable,
    SerializationType.NONE,
    "copiedTableHasKeyAndValueNumber",
  );
  const newTable = newObject as LuaMap<AnyNotNil, unknown>;

  const value = newTable.get(keyToLookFor) as number | undefined;
  if (value === undefined) {
    error(`The copied object did not have a key of: ${keyToLookFor}`);
  }

  if (!isNumber(value)) {
    error(`The copied object had a value type of: ${typeof value}`);
  }
  if (value !== valueToLookFor) {
    error(`The copied object had a value of: ${value}`);
  }
}

function copiedTableDoesNotCoerceTypes() {
  const keyToLookFor = 123;
  const valueToLookFor = 456;
  const oldTable = new LuaMap<AnyNotNil, unknown>();
  oldTable.set(keyToLookFor, valueToLookFor);

  const newObject = deepCopy(
    oldTable,
    SerializationType.NONE,
    "copiedTableDoesNotCoerceTypes",
  );
  const newTable = newObject as LuaMap<AnyNotNil, unknown>;

  const keyString = tostring(keyToLookFor);
  const valueString = tostring(valueToLookFor);

  const valueFromString = newTable.get(keyString);
  if (valueFromString !== undefined) {
    error(`The copied object had a string key of: ${keyString}`);
  }

  const value = newTable.get(keyToLookFor);
  if (value === valueString) {
    error(
      `The copied object had a value that incorrectly matched the string of: ${valueString}`,
    );
  }
}

/** In this context, a reference is a pointer. */
function copiedObjectHasNoReferencesForPrimitivesForward() {
  const originalStringValue = "abcdef";
  const originalNumberValue = 123;
  const oldObject = {
    abc: originalStringValue,
    def: originalNumberValue,
  };
  const newTable = deepCopy(
    oldObject as unknown as LuaMap,
    SerializationType.NONE,
    "copiedObjectHasNoReferencesForPrimitivesForward",
  );
  const newObject = newTable as typeof oldObject;

  oldObject.abc = "newValue";
  if (oldObject.abc === newObject.abc) {
    error("The copied object has a string reference going forward.");
  }

  oldObject.def = 456;
  if (oldObject.def === newObject.def) {
    error("The copied object has a number reference going forward.");
  }
}

function copiedObjectHasNoReferencesForPrimitivesBackward() {
  const originalStringValue = "abcdef";
  const originalNumberValue = 123;
  const oldObject = {
    abc: originalStringValue,
    def: originalNumberValue,
  };
  const newTable = deepCopy(
    oldObject as unknown as LuaMap,
    SerializationType.NONE,
    "copiedObjectHasNoReferencesForPrimitivesBackward",
  );
  const newObject = newTable as typeof oldObject;

  newObject.abc = "newValue";
  if (newObject.abc === oldObject.abc) {
    error("The copied object has a string reference going backward.");
  }

  newObject.def = 456;
  if (newObject.def === oldObject.def) {
    error("The copied object has a number reference going backward.");
  }
}

/** In this context, a reference is a pointer. */
function copiedObjectHasNoReferencesForArray() {
  const oldObject = {
    abc: [1, 2, 3],
  };
  const newTable = deepCopy(
    oldObject as unknown as LuaMap,
    SerializationType.NONE,
    "copiedObjectHasNoReferencesForArray",
  );
  const newObject = newTable as typeof oldObject;

  if (oldObject.abc === newObject.abc) {
    error("The copied object has the same point to the child array.");
  }

  if (!arrayEquals(oldObject.abc, newObject.abc)) {
    error("The copied object does not have an equal array.");
  }

  oldObject.abc[0]++;
  if (arrayEquals(oldObject.abc, newObject.abc)) {
    error(
      "The copied object has an equal array after a modification to the old array.",
    );
  }
  oldObject.abc[0]--;

  newObject.abc[0]++;
  if (arrayEquals(oldObject.abc, newObject.abc)) {
    error(
      "The copied object has an equal array after a modification to the new array.",
    );
  }
  newObject.abc[0]--;
}

function copiedObjectHasChildObject() {
  const childObjectIndex = "abc";
  const keyToLookFor = "def";
  const valueToLookFor = "ghi";
  const oldObject = {
    abc: {
      def: valueToLookFor,
    },
  };
  const newTable = deepCopy(
    oldObject as unknown as LuaMap,
    SerializationType.NONE,
    "copiedObjectHasChildObject",
  );
  const newObject = newTable as typeof oldObject;

  const childObject = newObject[childObjectIndex];
  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
  if (childObject === undefined) {
    error(`Failed to find the child object at index: ${childObjectIndex}`);
  }

  if (!isTable(childObject)) {
    error(`The copied child object had a type of: ${typeof childObject}`);
  }

  const value = childObject[keyToLookFor];
  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
  if (value === undefined) {
    error(`The child object did not have a key of: ${keyToLookFor}`);
  }

  if (!isString(value)) {
    error(`The child object value had a type of: ${typeof value}`);
  }
  if (value !== valueToLookFor) {
    error(`The child object value was: ${valueToLookFor}`);
  }
}

function copiedMapIsMap() {
  const keyToLookFor = "abc";
  const valueToLookFor = "def";
  const oldMap = new Map<string, string>();
  oldMap.set(keyToLookFor, valueToLookFor);

  const newObject = deepCopy(oldMap, SerializationType.NONE, "copiedMapIsMap");
  const newMap = newObject as Map<string, string>;

  if (!isTable(newMap)) {
    error(`The copied Map had a type of: ${typeof newMap}`);
  }
  if (!isTSTLMap(newMap)) {
    error("The copied Map was not a Map.");
  }
}

function copiedMapHasValue() {
  const keyToLookFor = "abc";
  const valueToLookFor = "def";
  const oldMap = new Map<string, string>();
  oldMap.set(keyToLookFor, valueToLookFor);

  const newTable = deepCopy(
    oldMap,
    SerializationType.NONE,
    "copiedMapHasValue",
  );
  const newMap = newTable as typeof oldMap;

  const value = newMap.get(keyToLookFor);
  if (value === undefined) {
    error(`The copied Map did not have a key of: ${keyToLookFor}`);
  }
  if (value !== valueToLookFor) {
    error(`The copied Map did not have a value of: ${valueToLookFor}`);
  }
}

function copiedSetIsSet() {
  const valueToLookFor = "abc";
  const oldSet = new Set<string>();
  oldSet.add(valueToLookFor);

  const newTable = deepCopy(oldSet, SerializationType.NONE, "copiedSetIsSet");
  const newSet = newTable as Set<string>;

  if (!isTable(newSet)) {
    error(`The copied Set had a type of: ${typeof newSet}`);
  }
  if (!isTSTLSet(newSet)) {
    error("The copied Set was not a Map.");
  }
}

function copiedSetHasValue() {
  const valueToLookFor = "abc";
  const oldSet = new Set<string>();
  oldSet.add(valueToLookFor);

  const newTable = deepCopy(
    oldSet,
    SerializationType.NONE,
    "copiedSetHasValue",
  );
  const newSet = newTable as Set<string>;

  const hasValue = newSet.has(valueToLookFor);
  if (!hasValue) {
    error(`The copied Set did not have a value of: ${valueToLookFor}`);
  }
}

function copiedMapHasChildMap() {
  const childMapKey = 123;
  const childMapValue = 456;
  const oldChildMap = new Map<number, number>();
  oldChildMap.set(childMapKey, childMapValue);

  const keyToLookFor = "abc";
  const oldMap = new Map<string, Map<number, number>>();
  oldMap.set(keyToLookFor, oldChildMap);

  const newTable = deepCopy(
    oldMap,
    SerializationType.NONE,
    "copiedMapHasChildMap",
  );
  const newMap = newTable as typeof oldMap;

  const newChildMap = newMap.get(keyToLookFor);
  if (newChildMap === undefined) {
    error(`The copied Map did not have a child map at key: ${keyToLookFor}`);
  }

  if (!isTable(newChildMap)) {
    error(`The copied child Map had a type of: ${typeof newChildMap}`);
  }
  if (!isTSTLMap(newChildMap)) {
    error("The copied child Map was not a Map.");
  }

  const value = newChildMap.get(childMapKey);
  if (value === undefined) {
    error(`The copied child Map did not have a key of: ${childMapKey}`);
  }
  if (value !== childMapValue) {
    error(`The copied child Map did not have a value of: ${childMapValue}`);
  }
}

function copiedDefaultMapHasChildDefaultMap() {
  const parentMapKey = "abc";
  const childMapKey1 = 123;
  const childMapKey2 = 456;
  const childMapDefaultValue = 1;
  const childMapCustomValue = 2;
  const oldParentMap = new DefaultMap<string, DefaultMap<number, number>>(
    () => new DefaultMap(childMapDefaultValue),
  );
  const oldChildMap = oldParentMap.getAndSetDefault(parentMapKey);
  oldChildMap.getAndSetDefault(childMapKey1);
  oldChildMap.set(childMapKey2, childMapCustomValue);

  const newTable = deepCopy(
    oldParentMap,
    SerializationType.NONE,
    "copiedDefaultMapHasChildDefaultMap",
  );
  const newParentMap = newTable as typeof oldParentMap;

  const newChildMap = newParentMap.get(parentMapKey);
  if (newChildMap === undefined) {
    error(
      `The copied DefaultMap did not have a child map at key: ${parentMapKey}`,
    );
  }

  if (!isTable(newChildMap)) {
    error(`The copied child DefaultMap had a type of: ${typeof newChildMap}`);
  }
  if (!isDefaultMap(newChildMap)) {
    error("The copied child DefaultMap was not a DefaultMap.");
  }

  const newChildMapValue1 = newChildMap.get(childMapKey1);
  if (newChildMapValue1 === undefined) {
    error(`The copied child DefaultMap did not have a key of: ${childMapKey1}`);
  }
  if (newChildMapValue1 !== childMapDefaultValue) {
    error(
      `The copied child Map did not have a default value of: ${childMapDefaultValue}`,
    );
  }

  const newChildMapValue2 = newChildMap.get(childMapKey2);
  if (newChildMapValue2 === undefined) {
    error(`The copied child DefaultMap did not have a key of: ${childMapKey2}`);
  }
  if (newChildMapValue2 !== childMapCustomValue) {
    error(
      `The copied child Map did not have a custom value of: ${childMapCustomValue}`,
    );
  }
}

function copiedDefaultMapHasBrand() {
  const oldDefaultValue = "foo";
  const oldDefaultMap = new DefaultMap<string, string>(oldDefaultValue);
  const newTable = deepCopy(
    oldDefaultMap,
    SerializationType.SERIALIZE,
    "copiedDefaultMapHasBrand",
  ) as LuaMap<AnyNotNil, unknown>;

  if (!newTable.has(SerializationBrand.DEFAULT_MAP)) {
    error(
      `The copied DefaultMap does not have the brand: ${SerializationBrand.DEFAULT_MAP}`,
    );
  }
}
