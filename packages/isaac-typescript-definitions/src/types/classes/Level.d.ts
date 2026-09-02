import type { Dimension } from "../../enums/Dimension";
import type { DoorSlot } from "../../enums/DoorSlot";
import type { LevelCurse } from "../../enums/flags/LevelCurse";
import type { GridRoom } from "../../enums/GridRoom";
import type { LevelStage } from "../../enums/LevelStage";
import type { LevelStateFlag } from "../../enums/LevelStateFlag";
import type { RoomType } from "../../enums/RoomType";
import type { StageType } from "../../enums/StageType";

declare global {
  interface Level extends IsaacAPIClass {
    readonly AddAngelRoomChance: (chance: float) => void;

    /**
     * Entries in the "curses.xml" file enumerate from 1 instead of 0. Thus, the `LevelCurse`
     * bitmask for a new curse must be `1 << LevelCurseCustom.FOO - 1`. This value is also the
     * return value of `POST_CURSE_EVAL`.
     */
    readonly AddCurse: (levelCurse: LevelCurse, showName: boolean) => void;

    readonly ApplyBlueMapEffect: () => void;
    readonly ApplyCompassEffect: (persistent: boolean) => void;
    readonly ApplyMapEffect: () => void;

    /**
     * Returns whether a Challenge Room door will be open. You must pass this method a valid grid
     * index on the floor. It does not matter if the grid index is actually attached to the
     * Challenge Room. This method will always return false if an invalid or a negative grid index
     * is passed.
     */
    readonly CanOpenChallengeRoom: (roomGridIndex: int | GridRoom) => boolean;

    readonly CanSpawnDevilRoom: () => boolean;
    readonly CanStageHaveCurseOfLabyrinth: (levelStage: LevelStage) => boolean;

    /**
     * @param roomGridIndex The room grid index of the destination room.
     * @param dimension Default is `Dimension.CURRENT`.
     * @deprecated This method does not update the "fxlayers" properly. Use the `Game.ChangeRoom`
     *             method instead.
     */
    readonly ChangeRoom: (roomGridIndex: int | GridRoom, dimension?: Dimension) => void;

    readonly DisableDevilRoom: () => void;
    readonly ForceHorsemanBoss: (seed: Seed) => boolean;

    /**
     * In non-Greed Mode, returns the same thing as the `Level.GetStage` method. In Greed Mode,
     * returns the adjusted stage similar to what it would be in non-Greed Mode.
     *
     * For example:
     * - On Greed Mode Basement, `GetStage` returns 1, and `GetAbsoluteStage` returns 1.
     * - On Greed Mode Caves, `GetStage` returns 2, and `GetAbsoluteStage` returns 3.
     * - On Greed mode Depths, `GetStage` returns 3, and `GetAbsoluteStage` returns 5.
     */
    readonly GetAbsoluteStage: () => LevelStage;

    readonly GetAngelRoomChance: () => float;
    readonly GetCanSeeEverything: () => boolean;
    readonly GetCurrentRoom: () => Room;

    /**
     * Note that this returns a read-only copy of the `RoomDescriptor` object and writing to any of
     * its properties will fail. If you need to update anything in this object, use the
     * `GetRoomByIdx(currentRoomGridIndex)` method or the `getRoomDescriptor` helper function
     * instead.
     */
    readonly GetCurrentRoomDesc: () => Readonly<RoomDescriptor>;

    /** Returns the current room's grid index. */
    readonly GetCurrentRoomIndex: () => int;

    /* eslint-disable complete/require-ascii */
    // cspell:ignore Maldición oscuridad
    /**
     * Returns the name of the current floor's curse, like "Curse of the Unknown!". If there are two
     * or more curses on the floor, this will only return the name of the curse with the lowest ID.
     * Note that this will return the localized curse name, like "Maldición de oscuridad" for Curse
     * of Darkness in Spanish.
     */
    readonly GetCurseName: () => string;
    /* eslint-enable complete/require-ascii */

    readonly GetCurses: () => BitFlags<LevelCurse>;
    readonly GetDevilAngelRoomRNG: () => RNG;
    readonly GetDungeonPlacementSeed: () => Seed;
    readonly GetEnterPosition: () => Vector;
    readonly GetHeartPicked: () => boolean;
    readonly GetLastBossRoomListIndex: () => int;

    /**
     * Note that this returns a read-only copy of the `RoomDescriptor` object and writing to any of
     * its properties will fail. If you need to update anything in this object, use the
     * `GetRoomByIdx(currentRoomGridIndex)` method or the `getRoomDescriptor` helper function
     * instead.
     */
    readonly GetLastRoomDesc: () => Readonly<RoomDescriptor>;

    /**
     * @param levelStage Default value is the current stage.
     * @param stageType Default value is the current stage type.
     * @param curses Default value is the current curses.
     * @param infiniteLevel Default value is the current infinite level setting.
     * @param dyslexia Default value is the current dyslexia setting.
     */
    readonly GetName: (
      levelStage?: LevelStage,
      stageType?: StageType,
      curses?: int,
      infiniteLevel?: int,
      dyslexia?: boolean,
    ) => string;

    /**
     * Returns the grid index of an unexplored or uncleared room on the floor. Returns -1 if all
     * rooms have been explored and cleared.
     */
    readonly GetNonCompleteRoomIndex: () => int;

    /** Returns the probability of getting a Planetarium (in the 0-1 range). */
    readonly GetPlanetariumChance: () => float;

    /** Returns the grid index of the previous room. */
    readonly GetPreviousRoomIndex: () => int;

    /** Returns a random grid index of the floor. */
    readonly GetRandomRoomIndex: (IAmErrorRoom: boolean, seed: Seed) => int;

    /**
     * @param roomGridIndex The grid index of the room to get.
     * @param dimension Default is `Dimension.CURRENT`.
     */
    readonly GetRoomByIdx: (
      roomGridIndex: int | GridRoom,
      dimension?: Dimension,
    ) => RoomDescriptor;

    readonly GetRoomCount: () => int;
    readonly GetRooms: () => RoomList;
    readonly GetStage: () => LevelStage;
    readonly GetStageType: () => StageType;

    /** Returns the grid index of the starting room on the floor. */
    readonly GetStartingRoomIndex: () => int;

    readonly GetStateFlag: (levelStateFlag: LevelStateFlag) => boolean;
    readonly HasBossChallenge: () => boolean;
    readonly InitializeDevilAngelRoom: (
      forceAngel: boolean,
      forceDevil: boolean,
    ) => void;
    readonly IsAltStage: () => boolean;

    /** Returns true if the player is in the Ascent. */
    readonly IsAscent: () => boolean;

    readonly IsDevilRoomDisabled: () => boolean;
    readonly IsNextStageAvailable: () => boolean;

    /** Returns true if the player is in the version of Mausoleum/Gehenna leading to the Ascent. */
    readonly IsPreAscent: () => boolean;

    /**
     * Attempts to create a red room door in the given room at the given door slot. Returns true on
     * success.
     */
    readonly MakeRedRoomDoor: (
      roomGridIndex: int | GridRoom,
      doorSlot: DoorSlot,
    ) => boolean;

    /**
     * @param roomType
     * @param visited
     * @param rng
     * @param ignoreGroup If set to true, includes rooms that do not have the same group ID as the
     *                    current room. Default is false.
     */
    readonly QueryRoomTypeIndex: (
      roomType: RoomType,
      visited: boolean,
      rng: RNG,
      ignoreGroup?: boolean,
    ) => int;

    readonly RemoveCompassEffect: () => void;

    /**
     * This is currently bugged and maps internally to `Level.RemoveCurse`. The old
     * `Level.RemoveCurses` is not currently accessible.
     */
    readonly RemoveCurses: (levelCurse: LevelCurse) => void;

    readonly SetCanSeeEverything: (value: boolean) => void;
    readonly SetHeartPicked: () => void;

    /**
     * Puts you in the next stage without applying any of the floor changes. You are meant to call
     * the `Level.StartStageTransition` method after using this function.
     */
    readonly SetNextStage: () => void;

    readonly SetRedHeartDamage: () => void;
    readonly SetStage: (levelStage: LevelStage, stageType: StageType) => void;
    readonly SetStateFlag: (levelStateFlag: LevelStateFlag, value: boolean) => void;

    /**
     * Reveals the entire map except for the Super Secret Room. (This is the same as the World card
     * or Sun card.)
     */
    readonly ShowMap: () => void;

    /**
     * Displays the streak text near the top of the screen that shows the name of the current level.
     */
    readonly ShowName: (sticky: boolean) => void;

    /**
     * Uncovers the door on both sides by modifying the saved grid entities for neighboring room.
     */
    readonly UncoverHiddenDoor: (currentRoomIdx: int, doorSlot: DoorSlot) => void;

    readonly Update: () => void;

    /**
     * Call this method to update the mini-map after changing the `DisplayFlags` field of a room.
     */
    readonly UpdateVisibility: () => void;

    /** The position that the player will return to if they exit a crawl space. */
    DungeonReturnPosition: Vector;

    /** The grid index that the player will return to if they exit a crawl space. */
    DungeonReturnRoomIndex: int;

    /** The `DoorSlot` that the player entered the room at. */
    EnterDoor: DoorSlot;

    GreedModeWave: int;

    /** The `DoorSlot` that the player left the previous room at. */
    LeaveDoor: DoorSlot;
  }
}
