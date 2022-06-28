import { JSONDoor } from "./JSONDoor";
import { JSONSpawn } from "./JSONSpawn";

/** Part of `JSONRooms`. */
export interface JSONRoom {
  $: {
    /** Needs to be converted to an `int`. */
    difficulty: string;

    /** Needs to be converted to an `int`. */
    height: string;

    name: string;

    /** Needs to be converted to an `int`. */
    shape: string;

    /** Needs to be converted to an `int`. */
    subtype: string;

    /** Needs to be converted to an `int`. */
    type: string;

    /** Needs to be converted to an `int`. */
    variant: string;

    /** Needs to be converted to a `float`. */
    weight: string;

    /** Needs to be converted to an `int`. */
    width: string;
  };

  door: JSONDoor[];
  spawn: JSONSpawn[];
}
