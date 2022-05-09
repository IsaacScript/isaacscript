export function deepCloneValue<T>(value: T): T {
  if (isRecord(value)) {
    return deepCloneObject(value);
  }

  if (Array.isArray(value)) {
    return deepCloneArray(value);
  }

  return value;
}

function deepCloneObject<T extends Record<string, unknown>>(object: T): T {
  const keys = Object.keys(object);

  const clonedObject: Record<string, unknown> = {};
  keys.forEach((key) => {
    const value = object[key];
    const clonedValue = deepCloneValue(value);
    clonedObject[key] = clonedValue;
  });

  return clonedObject as T;
}

function deepCloneArray<T extends Array<unknown>>(array: T): T {
  const clonedArray: unknown[] = [];
  array.forEach((element) => {
    const clonedElement = deepCloneValue(element);
    clonedArray.push(clonedElement);
  });

  return clonedArray as T;
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return (
    typeof value === "object" &&
    value !== undefined &&
    value !== null &&
    !Array.isArray(value)
  );
}
