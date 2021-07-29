export function hasFlag(flags: int, flag: int): boolean {
  return (flags & flag) === flag;
}
