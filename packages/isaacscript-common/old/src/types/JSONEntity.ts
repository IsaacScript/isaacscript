export interface JSONEntity {
  $: {
    /** Needs to be converted to an int. */
    type: string;

    /** Needs to be converted to an int. */
    variant: string;

    /** Needs to be converted to an int. */
    subtype: string;

    /** Needs to be converted to a float. */
    weight: string;
  };
}
