import { RoomShape, RoomType } from "isaac-typescript-definitions";
import { getEnumValues } from "packages/isaacscript-cli/src/utils";

const rooms = "";

for (const roomType of getEnumValues(RoomType)) {
  for (const roomShape of getEnumValues(RoomShape)) {
  }
}

const xml = `
<?xml version="1.0" ?>
<rooms>
${rooms}
</rooms>
`
  .trim()
  .concat("\n");
