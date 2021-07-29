export function addFlag(flags: int, flag: int): int {
  return flags | flag; // eslint-disable-line no-bitwise
}

export function hasFlag(flags: int, flag: int): boolean {
  return (flags & flag) === flag; // eslint-disable-line no-bitwise
}

export function removeFlag(flags: int, flag: int): int {
  return flags & ~flag; // eslint-disable-line no-bitwise
}
