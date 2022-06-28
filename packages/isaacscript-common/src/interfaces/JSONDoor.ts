/** Part of `JSONRooms`. */
export interface JSONDoor {
  $: {
    /** Equal to "True" or "False". Needs to be converted to an `boolean`. */
    exists: string;

    /** Needs to be converted to an `int`. */
    x: string;

    /** Needs to be converted to an `int`. */
    y: string;
  };
}
