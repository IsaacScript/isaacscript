export function addFlag(flags: int, flag: int): int {
  validateFlags(flags, true);
  return flags | flag; // eslint-disable-line no-bitwise
}

export function addTearFlag(flags: int, tearFlag: TearFlags): int {
  // TearFlags are really represented as BitSet128 objects in Lua,
  // but we describe them as integers in the TypeScript definitions for simplicity
  // Thus, we first have to cast the flags to a BitSet128 before we can do transformations on them
  const oldBitSet128 = flags as unknown as BitSet128;

  // We can't use operator overloading in TypeScript,
  // so we use the convenience functions of the BitSet128 object instead
  const newBitSet128 = oldBitSet128.bor(tearFlag);

  // Cast it back to the original type
  const newFlags = newBitSet128 as unknown as int;

  return newFlags;
}

export function hasFlag(flags: int, flag: int): boolean {
  return (flags & flag) === flag; // eslint-disable-line no-bitwise
}

export function removeFlag(flags: int, flag: int): int {
  validateFlags(flags, true);
  return flags & ~flag; // eslint-disable-line no-bitwise
}

export function removeTearFlag(flags: int, tearFlag: TearFlags): int {
  // TearFlags are really represented as BitSet128 objects in Lua,
  // but we describe them as integers in the TypeScript definitions for simplicity
  // Thus, we first have to cast the flags to a BitSet128 before we can do transformations on them
  const oldBitSet128 = flags as unknown as BitSet128;

  // We can't use operator overloading in TypeScript,
  // so we use the convenience functions of the BitSet128 object instead
  const newBitSet128 = oldBitSet128.band(~tearFlag); // eslint-disable-line no-bitwise

  // Cast it back to the original type
  const newFlags = newBitSet128 as unknown as int;

  return newFlags;
}

function validateFlags(flags: int, adding: boolean) {
  const functionPrefix = adding ? "add" : "remove";

  const flagsType = type(flags);
  if (flagsType === "number") {
    return;
  }

  const metaTable = getmetatable(flags) as Record<string, string>;
  if (metaTable === undefined) {
    error(
      `The ${functionPrefix}Flag function does not support the ${flagsType} type.`,
    );
  }

  const metaTableType = metaTable.__type; // eslint-disable-line no-underscore-dangle
  if (metaTableType === undefined) {
    error(
      `The ${functionPrefix}Flag function does not support the ${flagsType} type.`,
    );
  }

  if (metaTableType === "BitSet128") {
    error(
      `The ${functionPrefix}Flag function does not support TearFlags. Use the "${functionPrefix}TearFlags()" convenience function instead.`,
    );
  }

  error(
    `The ${functionPrefix}Flag function does not support the ${metaTableType} type.`,
  );
}
