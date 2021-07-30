/** copy recursively copies a table so that none of the nested references remain. */
export function copy(table: LuaTable): void {
  const newTable = new LuaTable();
  for (const [key, value] of pairs(table)) {
    const valueType = type(value);

    let newValue: unknown;
    if (valueType === "table") {
      // Recursively handle child tables
      newValue = copy(value as LuaTable);
    } else {
      // Base case - copy the value
      newValue = value;
    }

    newTable.set(key, newValue);
  }
}

/**
 * merge takes the values from a new table and merges them into an old table.
 * It will only copy over values that are present in the old table.
 * In other words, it will ignore extraneous values in the new table.
 * (This is useful when loading out-of-date save data from the "save#.dat" file.)
 */
export function merge(oldTable: LuaTable, newTable: LuaTable): void {
  if (type(oldTable) !== "table" || type(newTable) !== "table") {
    error("merge is comparing a value that is not a table.");
  }

  // Go through the old table, merging every found value
  for (const [key, oldValue] of pairs(oldTable)) {
    const newValue = newTable.get(key) as unknown;
    const oldType = type(oldValue);
    const newType = type(newValue);

    // Do nothing if a property on the incoming table either does not exist or is a mismatched type
    if (oldType !== newType) {
      continue;
    }

    // Recursively handle sub-tables
    if (oldType === "table") {
      merge(oldValue, newValue as LuaTable);
      continue;
    }

    // Base case - copy the value
    oldTable.set(key, newValue);
  }

  // We also need to iterate through the new table in case it is:
  // 1) an "array" (i.e. indexed by "1", "2", and so on)
  // 2) a key-value object indexed by a number coerced to a string (i.e. indexed by "2182363682")
  // In both of these cases, we always want to copy the values,
  // since they indicate state data that will be independent of mod version
  for (const [key, newValue] of pairs(newTable)) {
    const num = tonumber(key);
    if (num !== undefined) {
      oldTable.set(key, newValue);
    }
  }
}
