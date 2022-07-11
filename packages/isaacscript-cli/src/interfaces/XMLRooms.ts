/**
 * This is the structure of an XML file created by Basement Renovator, once it is parsed by the
 * "fast-xml-parser" library.
 */
export interface XMLRoomsFile {
  "?xml": string;
  rooms: XMLRooms;
}

export interface XMLRooms {
  room: XMLRoom[];
}

export interface XMLRoom {}
