import { DefaultMap } from "../classes/DefaultMap";
import { SerializationBrand } from "../enums/private/SerializationBrand";
import { SerializationType } from "../enums/SerializationType";
import { arrayEquals } from "./array";
import { deepCopy } from "./deepCopy";
import { log } from "./log";

export function deepCopyTests(): void {
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
  const newObject = deepCopy(oldObject as unknown as LuaTable);
  const newObjectType = type(newObject);
  if (newObjectType !== "table") {
    error("The copied object is not a table.");
  }
}

function copiedObjectHasKeyAndValueString() {
  const keyToLookFor = "abc";
  const valueToLookFor = "def";
  const oldObject = {
    abc: valueToLookFor,
  };
  const newTable = deepCopy(oldObject as unknown as LuaTable);
  const newObject = newTable as unknown as typeof oldObject;

  const value = newObject[keyToLookFor];
  if (value === undefined) {
    error(`The copied object did not have a key of: ${keyToLookFor}`);
  }

  const valueType = type(value);
  if (valueType !== "string") {
    error(`The copied object had a value type of: ${valueType}`);
  }
  if (value !== valueToLookFor) {
    error(`The copied object had a value of: ${value}`);
  }
}

function copiedTableHasKeyAndValueNumber() {
  const keyToLookFor = 123;
  const valueToLookFor = 456;
  const oldTable = new LuaTable();
  oldTable.set(keyToLookFor, valueToLookFor);

  const newObject = deepCopy(oldTable);
  const newTable = newObject as LuaTable;

  const value = newTable.get(keyToLookFor) as number | undefined;
  if (value === undefined) {
    error(`The copied object did not have a key of: ${keyToLookFor}`);
  }

  const valueType = type(value);
  if (valueType !== "number") {
    error(`The copied object had a value type of: ${valueType}`);
  }
  if (value !== valueToLookFor) {
    error(`The copied object had a value of: ${value}`);
  }
}

function copiedTableDoesNotCoerceTypes() {
  const keyToLookFor = 123;
  const valueToLookFor = 456;
  const oldTable = new LuaTable();
  oldTable.set(keyToLookFor, valueToLookFor);

  const newObject = deepCopy(oldTable);
  const newTable = newObject as LuaTable;

  const keyString = tostring(keyToLookFor);
  const valueString = tostring(valueToLookFor);

  const valueFromString = newTable.get(keyString) as unknown | undefined;
  if (valueFromString !== undefined) {
    error(`The copied object had a string key of: ${keyString}`);
  }

  const value = newTable.get(keyToLookFor) as string | number;
  if (value === valueString) {
    error(
      `The copied object had a value that incorrectly matched the string of: ${valueString}`,
    );
  }
}

function copiedObjectHasNoReferencesForPrimitivesForward() {
  const originalStringValue = "abcdef";
  const originalNumberValue = 123;
  const oldObject = {
    abc: originalStringValue,
    def: originalNumberValue,
  };
  const newTable = deepCopy(oldObject as unknown as LuaTable);
  const newObject = newTable as unknown as typeof oldObject;

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
  const newTable = deepCopy(oldObject as unknown as LuaTable);
  const newObject = newTable as unknown as typeof oldObject;

  newObject.abc = "newValue";
  if (newObject.abc === oldObject.abc) {
    error("The copied object has a string reference going backward.");
  }

  newObject.def = 456;
  if (newObject.def === oldObject.def) {
    error("The copied object has a number reference going backward.");
  }
}

function copiedObjectHasNoReferencesForArray() {
  const oldObject = {
    abc: [1, 2, 3],
  };
  const newTable = deepCopy(oldObject as unknown as LuaTable);
  const newObject = newTable as unknown as typeof oldObject;

  if (oldObject.abc === newObject.abc) {
    error("The copied object has the same point to the child array.");
  }

  if (!arrayEquals(oldObject.abc, newObject.abc)) {
    error("The copied object does not have an equal array.");
  }

  oldObject.abc[0] += 1;
  if (arrayEquals(oldObject.abc, newObject.abc)) {
    error(
      "The copied object has an equal array after a modification to the old array.",
    );
  }
  oldObject.abc[0] -= 1;

  newObject.abc[0] += 1;
  if (arrayEquals(oldObject.abc, newObject.abc)) {
    error(
      "The copied object has an equal array after a modification to the new array.",
    );
  }
  newObject.abc[0] -= 1;
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
  const newTable = deepCopy(oldObject as unknown as LuaTable);
  const newObject = newTable as unknown as typeof oldObject;

  const childObject = newObject[childObjectIndex];
  if (childObject === undefined) {
    error(`Failed to find the child object at index: ${childObjectIndex}`);
  }

  const childObjectType = type(childObject);
  if (childObjectType !== "table") {
    error("The copied child object was not a table.");
  }

  const value = childObject[keyToLookFor];
  if (value === undefined) {
    error(`The child object did not have a key of: ${keyToLookFor}`);
  }

  const valueType = type(value);
  if (valueType !== "string") {
    error(`The child object value had a type of: ${valueType}`);
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

  const newObject = deepCopy(oldMap);
  const newMap = newObject as Map<string, string>;

  const newMapType = type(newMap);
  if (newMapType !== "table") {
    error("The copied Map was not a table.");
  }
  if (!(newMap instanceof Map)) {
    error("The copied Map was not a Map.");
  }
}

function copiedMapHasValue() {
  const keyToLookFor = "abc";
  const valueToLookFor = "def";
  const oldMap = new Map<string, string>();
  oldMap.set(keyToLookFor, valueToLookFor);

  const newTable = deepCopy(oldMap);
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

  const newTable = deepCopy(oldSet);
  const newSet = newTable as Set<string>;

  const newSetType = type(newSet);
  if (newSetType !== "table") {
    error("The copied Set was not a table.");
  }
  if (!(newSet instanceof Set)) {
    error("The copied Set was not a Map.");
  }
}

function copiedSetHasValue() {
  const valueToLookFor = "abc";
  const oldSet = new Set<string>();
  oldSet.add(valueToLookFor);

  const newTable = deepCopy(oldSet);
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

  const newTable = deepCopy(oldMap);
  const newMap = newTable as typeof oldMap;

  const newChildMap = newMap.get(keyToLookFor);
  if (newChildMap === undefined) {
    error(`The copied Map did not have a child map at key: ${keyToLookFor}`);
  }

  const newChildMapType = type(newChildMap);
  if (newChildMapType !== "table") {
    error(`The copied child Map had a type of: ${newChildMapType}`);
  }
  if (!(newChildMap instanceof Map)) {
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

  const newTable = deepCopy(oldParentMap);
  const newParentMap = newTable as typeof oldParentMap;

  const newChildMap = newParentMap.get(parentMapKey);
  if (newChildMap === undefined) {
    error(
      `The copied DefaultMap did not have a child map at key: ${parentMapKey}`,
    );
  }

  const newChildMapType = type(newChildMap);
  if (newChildMapType !== "table") {
    error(`The copied child DefaultMap had a type of: ${newChildMapType}`);
  }
  if (!(newChildMap instanceof DefaultMap)) {
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
  ) as LuaTable<AnyNotNil, unknown>;

  if (!newTable.has(SerializationBrand.DEFAULT_MAP)) {
    error(
      `The copied DefaultMap does not have the brand: ${SerializationBrand.DEFAULT_MAP}`,
    );
  }
}
