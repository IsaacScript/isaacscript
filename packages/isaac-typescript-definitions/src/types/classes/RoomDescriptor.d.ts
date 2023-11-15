import type { DisplayFlag } from "../../enums/flags/DisplayFlag";
import type { RoomDescriptorFlag } from "../../enums/flags/RoomDescriptorFlag";

declare global {
  interface RoomDescriptor extends IsaacAPIClass {
    // AllowedDoors is not implemented.

    AwardSeed: Seed;
    ChallengeDone: boolean;
    Clear: boolean;
    ClearCount: int;
    Data?: RoomConfig;
    DecorationSeed: Seed;
    DeliriumDistance: int;

    /**
     * After modifying this value, you must call the `Level.UpdateVisibility` method for it to take
     * effect.
     */
    DisplayFlags: BitFlags<DisplayFlag>;

    Flags: BitFlags<RoomDescriptorFlag>;

    /**
     * - For a 1x1 room, this is equal to the 1x1 grid index of the room.
     * - For a room bigger than a 1x1 room, this is equal to the top left 1x1 quadrant.
     * - For `RoomShape.LTL` rooms (i.e. rooms that look like a "J"), this is equal to the 1x1
     *   quadrant where the gap in the room is. In other words, it is a 1x1 quadrant that is not
     *   actually contained within the room.
     * - This can also be a special negative value represented by the `GridRoom` enum (for rooms
     *   that are outside of the grid).
     * - Note that this value **is different** than the value returned by the
     *   `Level.GetCurrentRoomIndex` method. (That method returns the 1x1 quadrant that the room was
     *   entered in.)
     * - Data structures that store data per room should use `ListIndex` as a key instead of
     *   `GridIndex`, since the former is unique across different dimensions.
     * - `GridIndex` is bugged for rooms outside of the grid, as demonstrated by pasting the
     *   following into `l print(Game():GetLevel():GetCurrentRoomDesc().GridIndex)` into the
     *   console. (It prints -1 instead of -12.)
     */
    GridIndex: int;

    HasWater: boolean;

    /**
     * The index for this room corresponding to the `RoomList.Get` method. This is equal to the
     * order that the room was created by the floor generation algorithm.
     *
     * Use this as an index for data structures that store data per room, since it is unique across
     * different dimensions.
     */
    ListIndex: int;

    NoReward: boolean;
    OverrideData: RoomConfig;
    PitsCount: int;
    PoopCount: int;
    PressurePlatesTriggered: boolean;
    SacrificeDone: boolean;

    /**
     * - For a 1x1 room, this is equal to the 1x1 grid index of the room.
     * - For a room bigger than a 1x1 room, this is equal to the top left 1x1 quadrant.
     * - For `RoomType.LTL` rooms (i.e. rooms that look like a "J"), this is equal to the top right
     *   1x1 quadrant.
     * - This can also be a special negative value represented by the `GridRoom` enum (for rooms
     *   that are outside of the grid).
     * - Note that this value **is different** than the value returned by the
     *   `Level.GetCurrentRoomIndex` method. (That method returns the 1x1 quadrant that the room was
     *   entered in.)
     * - Data structures that store data per room should use `ListIndex` as a key instead of
     *   `SafeGridIndex`, since the former is unique across different dimensions.
     * - `SafeGridIndex` is bugged for rooms outside of the grid, as demonstrated by pasting the
     *   following into `l print(Game():GetLevel():GetCurrentRoomDesc().SafeGridIndex)` into the
     *   console. (It prints -1 instead of -12.)
     */
    SafeGridIndex: int;

    ShopItemDiscountIdx: int;
    ShopItemIdx: int;
    SpawnSeed: Seed;
    SurpriseMiniboss: boolean;

    /**
     * The number of times that the room has been visited.
     *
     * This will be inaccurate during the period before the `POST_NEW_ROOM` callback has fired (i.e.
     * when entities are initializing and performing their first update). This is because this
     * variable is only incremented immediately before the `POST_NEW_ROOM` callback fires.
     */
    VisitedCount: int;

    /**
     * In the "enums.lua" file, the RoomDescriptor class is extended with many members:
     *
     * - RoomDescriptor.DISPLAY_*
     * - RoomDescriptor.FLAG_*
     *
     * In IsaacScript, these are instead implemented as enums, since it is cleaner. See the
     * `RoomDescriptorDisplayType` and `RoomDescriptorFlag` enums, respectively.
     */
  }
}
