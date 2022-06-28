import { JSONEntity } from "./JSONEntity";

/** Part of `JSONRooms`. */
export interface JSONSpawn {
  $: {
    /** Needs to be converted to an `int`. */
    x: string;

    /** Needs to be converted to an `int`. */
    y: string;
  };

  entity: JSONEntity[];
}
