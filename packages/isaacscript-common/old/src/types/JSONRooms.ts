import { JSONRoom } from "./JSONRoom";

/**
 * Custom rooms are created with the Basement Renovator program, which outputs XML files and STB
 * files. A `JSONRooms` object is simply an XML file converted to JSON. You can convert your XML
 * files using the following command: `npx convert-xml-to-json foo.xml foo.json`
 */
export interface JSONRooms {
  rooms: {
    room: JSONRoom[];
  };
}
