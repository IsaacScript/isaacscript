// This file is copied from the "isaacscript-common" package.

/**
 * Custom rooms are created with the Basement Renovator program, which outputs XML files and STB
 * files. A `JSONRoomsFile` object is simply an XML file converted to JSON. (It is useful to have
 * the room data in JSON format so that it can be directly consumed by TypeScript programs.)
 *
 * You can convert your XML files using the following command:
 *
 * ```sh
 * npx convert-xml-to-json foo.xml foo.json
 * ```
 */
export interface JSONRoomsFile {
  rooms: JSONRooms;
}

export interface JSONRooms {
  room: JSONRoom[];
}

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

/** Part of `JSONRooms`. */
export interface JSONEntity {
  $: {
    /** Needs to be converted to an `int`. */
    type: string;

    /** Needs to be converted to an `int`. */
    variant: string;

    /** Needs to be converted to an `int`. */
    subtype: string;

    /** Needs to be converted to a `float`. */
    weight: string;
  };
}
