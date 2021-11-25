export interface JSONDoor {
  $: {
    /** Equal to "True" or "False". */
    exists: string;

    /** Needs to be converted to an int. */
    x: string;

    /** Needs to be converted to an int. */
    y: string;
  };
}
