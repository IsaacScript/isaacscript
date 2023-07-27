declare interface CardConfigList extends IsaacAPIClass {
  /** @deprecated This method is bugged and returns useless `userdata`. */
  Get: (idx: int) => LuaUserdata;

  readonly Size: int;
}
