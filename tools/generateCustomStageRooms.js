"use strict";
/* eslint-disable import/no-relative-packages */
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
exports.__esModule = true;
// Run this script with the following command:
//
// ```sh
// npx ts-node --require "tsconfig-paths/register" --project "tools/tsconfig.json" "tools/generateCustomStageRooms.ts"
// ```
//
// For this script to work properly, `isaac-typescript-definitions` first have to be compiled to
// JavaScript. Thus, run the following commands:
//
// ```sh
// cd ./packages/isaac-typescript-definitions
// npx tsc
// cd ../..
// cp --recursive "./dist/packages/isaac-typescript-definitions" "./node_modules/"
// ```
var isaac_typescript_definitions_1 = require("isaac-typescript-definitions");
var isaacscript_cli_1 = require("isaacscript-cli");
var bitwise_1 = require("../packages/isaacscript-common/src/functions/bitwise");
var doors_1 = require("../packages/isaacscript-common/src/functions/doors");
var roomShape_1 = require("../packages/isaacscript-common/src/functions/roomShape");
var set_1 = require("../packages/isaacscript-common/src/functions/set");
var getEnumValues = isaacscript_cli_1.utils.getEnumValues;
var rooms = [];
/**
 * We need to create an array of rooms like the following:
 *
 * ```xml
 * <room variant="80150" name="1x1" type="2" subtype="0" shape="1" width="13" height="7"
 * difficulty="1" weight="0.0">
 *   <door exists="True" x="-1" y="3"/>
 *   <door exists="True" x="6" y="-1"/>
 *   <door exists="True" x="6" y="7"/>
 *   <door exists="True" x="13" y="3"/>
 * </room>
 * ```
 *
 * - We can repeat room variants between different room types.
 * - The `RoomShape` enum goes from 1 to 12.
 *   - 12 in binary is 1100.
 *   - Thus, we need 4 bits to represent `RoomShape`.
 * - There are 8 possible door slots.
 *   - Thus, we need 8 bits to represent `BitFlags<DoorSlot>`.
 *
 * Thus, the room variant has the following sequence:
 * - 4 bits of `RoomShape` + 8 bits of `BitFlags<DoorSlot>`
 *
 * Even though Basement Renovator does not allow setting variants to values above 16 bits, values
 * with 17 bits work fine in-game.
 */
for (var _i = 0, _a = getEnumValues(isaac_typescript_definitions_1.RoomType); _i < _a.length; _i++) {
    var roomType = _a[_i];
    for (var _b = 0, _c = getEnumValues(isaac_typescript_definitions_1.RoomShape); _b < _c.length; _b++) {
        var roomShape = _c[_b];
        var roomShapeBits = (0, bitwise_1.convertDecimalToBinary)(roomShape);
        var doorSlotsSet = (0, doors_1.getDoorSlotsForRoomShape)(roomShape);
        var doorSlotFlagsSet = new Set();
        for (var _d = 0, _e = doorSlotsSet.values(); _d < _e.length; _d++) {
            var doorSlot = _e[_d];
            var doorSlotFlag = (0, doors_1.doorSlotToDoorSlotFlag)(doorSlot);
            doorSlotFlagsSet.add(doorSlotFlag);
        }
        var doorSlotFlagCombinations = (0, set_1.getSetCombinations)(doorSlotFlagsSet);
        for (var _f = 0, doorSlotFlagCombinations_1 = doorSlotFlagCombinations; _f < doorSlotFlagCombinations_1.length; _f++) {
            var doorSlotFlagCombination = doorSlotFlagCombinations_1[_f];
            var doorSlotFlags = (0, bitwise_1.setToBitFlags)(doorSlotFlagCombination);
            var doorSlotBits = (0, bitwise_1.convertDecimalToBinary)(doorSlotFlags);
            var combinedBits = __spreadArray(__spreadArray([], roomShapeBits, true), doorSlotBits, true);
            var roomVariant = (0, bitwise_1.convertBinaryToDecimal)(combinedBits);
            var name_1 = "Shape: ".concat(roomShape, ", DoorSlotFlags: ").concat(doorSlotFlags);
            var _g = (0, roomShape_1.getRoomShapeLayoutSize)(roomShape), width = _g[0], height = _g[1];
            var room = "\n<room name=\"".concat(name_1, "\" type=\"").concat(roomType, "\" variant=\"").concat(roomVariant, "\" subtype=\"0\" shape=\"").concat(roomShape, "\" width=\"").concat(width, "\" height=\"").concat(height, "\" difficulty=\"1\" weight=\"0.0\">\n      ").trim();
            rooms.push(room);
        }
    }
}
var xml = "\n<?xml version=\"1.0\" ?>\n<rooms>\n".concat(rooms.join("\n"), "\n</rooms>\n  ")
    .trim()
    .concat("\n");
console.log(xml);
