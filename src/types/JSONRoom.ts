import { JSONDoor } from "./JSONDoor";
import { JSONSpawn } from "./JSONSpawn";

/**
 * Custom rooms are created with the Basement Renovator program, which outputs XML files and STB
 * files. A `JSONRoom` is simply an XML room converted to JSON. You can convert your XML files using
 * the following command: `npx convert-xml-to-json foo.xml foo.json`
 */
export interface JSONRoom {
  $: {
    /** Needs to be converted to an int. */
    difficulty: string;

    /** Needs to be converted to an int. */
    height: string;

    name: string;

    /** Needs to be converted to an int. */
    shape: string;

    /** Needs to be converted to an int. */
    subtype: string;

    /** Needs to be converted to an int. */
    type: string;

    /** Needs to be converted to an int. */
    variant: string;

    /** Needs to be converted to a float. */
    weight: string;

    /** Needs to be converted to an int. */
    width: string;
  };

  door: JSONDoor[];
  spawn: JSONSpawn[];
}
