export function hasFlag(flags: int, flag: int): boolean {
  return (flags & flag) === flag; // eslint-disable-line no-bitwise
}
