/**
 * Matches the `RoomDescriptor.FLAG_*` members of the `RoomDescriptor` class. In IsaacScript, we
 * reimplement this as an enum instead, since it is cleaner.
 */
declare const RoomDescriptorFlagInternal: {
    /**
     * Room is clear, don't spawn enemies when visiting.
     *
     * 1 << 0
     */
    CLEAR: number;
    /**
     * All pressure plates have been triggered in this room. This won't be set if there are no trigger
     * pressure plates in the first place.
     *
     * 1 << 1
     */
    PRESSURE_PLATES_TRIGGERED: number;
    /**
     * A Sacrifice Room has paid out.
     *
     * 1 << 2
     */
    SACRIFICE_DONE: number;
    /**
     * A Challenge Room has finished.
     *
     * 1 << 3
     */
    CHALLENGE_DONE: number;
    /**
     * Load Greed/Krampus instead of the room specified by the type & variant.
     *
     * 1 << 4
     */
    SURPRISE_MINIBOSS: number;
    /**
     * Pits in this room contain water.
     *
     * 1 << 5
     */
    HAS_WATER: number;
    /**
     * Play alternate boss music in this room.
     *
     * 1 << 6
     */
    ALT_BOSS_MUSIC: number;
    /**
     * Don't pay out with a reward when clearing this room. Used for traps that lock the player in the
     * room when triggered.
     *
     * 1 << 7
     */
    NO_REWARD: number;
    /**
     * Was flooded by an item (i.e. Flush).
     *
     * 1 << 8
     */
    FLOODED: number;
    /**
     * Complete darkness.
     *
     * 1 << 9
     */
    PITCH_BLACK: number;
    /**
     * Room spawned by Red Key.
     *
     * 1 << 10
     */
    RED_ROOM: number;
    /**
     * Treasure room transformed by Devil's Crown.
     *
     * 1 << 11
     */
    DEVIL_TREASURE: number;
    /**
     * Use an alternate backdrop. (This is used by some floors such as Dross and Ashpit.)
     *
     * 1 << 12
     */
    USE_ALTERNATE_BACKDROP: number;
    /**
     * The room is covered in cursed mist; the player is temporarily reduced to base items and stats.
     *
     * 1 << 13
     */
    CURSED_MIST: number;
    /**
     * Mama Mega has activated in this room.
     *
     * 1 << 14
     */
    MAMA_MEGA: number;
    /**
     * Don't generate walls (for Beast arena).
     *
     * 1 << 15
     */
    NO_WALLS: number;
    /**
     * Rotgut's heart was killed, immediately play Rotgut's death animation when reentering this room.
     *
     * 1 << 16
     */
    ROTGUT_CLEARED: number;
    /**
     * A portal spawned by Lil Portal now links to this room; don't create more portals that link to
     * it.
     *
     * 1 << 17
     */
    PORTAL_LINKED: number;
    /**
     * If walking into this room through a door, redirect to a Blue Womb room instead. (This is used
     * by Blue Key.)
     *
     * 1 << 18
     */
    BLUE_REDIRECT: number;
};
declare type RoomDescriptorFlagValue = number & {
    readonly __bitFlagBrand: void;
    readonly __roomDescriptorFlagBrand: void;
};
declare type RoomDescriptorFlagType = {
    [K in keyof typeof RoomDescriptorFlagInternal]: RoomDescriptorFlagValue;
};
export declare const RoomDescriptorFlag: RoomDescriptorFlagType;
export declare type RoomDescriptorFlag = RoomDescriptorFlagType[keyof RoomDescriptorFlagType];
export declare const RoomDescriptorFlagZero: BitFlags<RoomDescriptorFlagValue>;
export {};
