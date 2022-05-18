import { Dimension } from "../enums/Dimension";
import { DoorSlot } from "../enums/DoorSlot";
import { LevelCurse } from "../enums/flags/LevelCurse";
import { LevelStage } from "../enums/LevelStage";
import { LevelStateFlag } from "../enums/LevelStateFlag";
import { RoomType } from "../enums/RoomType";
import { StageType } from "../enums/StageType";

declare global {
  interface Level {
    AddAngelRoomChance(chance: float): void;

    /**
     * Entries in the "curses.xml" file enumerate from 1 instead of 0. Thus, the `LevelCurse`
     * bitmask for a new curse must be `1 << LevelCurseCustom.FOO - 1`. This value is also the
     * return value of `POST_CURSE_EVAL`.
     */
    AddCurse(levelCurse: LevelCurse | int, showName: boolean): void;

    ApplyBlueMapEffect(): void;
    ApplyCompassEffect(persistent: boolean): void;
    ApplyMapEffect(): void;
    CanOpenChallengeRoom(roomGridIndex: int): boolean;
    CanSpawnDevilRoom(): boolean;
    CanStageHaveCurseOfLabyrinth(levelStage: LevelStage): boolean;

    /**
     * @deprecated This method does not update the "fxlayers" properly. Use the `Game.ChangeRoom`
     *             method instead.
     * @param roomGridIndex The room grid index of the destination room.
     * @param dimension Default is `Dimension.CURRENT`.
     */
    ChangeRoom(fakeArg: never, roomGridIndex: int, dimension?: Dimension): void;

    DisableDevilRoom(): void;
    ForceHorsemanBoss(seed: Seed): boolean;

    /**
     * In non-Greed Mode, returns the same thing as the `Level.GetStage` method. In Greed Mode,
     * returns the adjusted stage similar to what it would be in non-Greed Mode.
     *
     * For example:
     * - On Greed Mode Basement, `GetStage` returns 1, and `GetAbsoluteStage` returns 1.
     * - On Greed Mode Caves, `GetStage` returns 2, and `GetAbsoluteStage` returns 3.
     * - On Greed mode Depths, `GetStage` returns 3, and `GetAbsoluteStage` returns 5.
     */
    GetAbsoluteStage(): LevelStage;

    GetAngelRoomChance(): float;
    GetCanSeeEverything(): boolean;
    GetCurrentRoom(): Room;

    /**
     * Note that this returns a read-only copy of the RoomDescriptor object and writing to any of
     * its properties will fail. If you need to update anything in this object, use the
     * `GetRoomByIdx(currentRoomIndex)` method instead.
     */
    GetCurrentRoomDesc(): ReadonlyRoomDescriptor;

    /** Returns the current room's grid index. */
    GetCurrentRoomIndex(): int;

    // cspell:ignore Maldición oscuridad

    /**
     * Returns the name of the current floor's curse, like "Curse of the Unknown!". If there are two
     * or more curses on the floor, this will only return the name of the curse with the lowest ID.
     * Note that this will return the localized curse name, like "Maldición de oscuridad" for Curse
     * of Darkness in Spanish.
     */
    GetCurseName(): string;

    GetCurses(): LevelCurse | int;
    GetDevilAngelRoomRNG(): RNG;
    GetDungeonPlacementSeed(): Seed;
    GetEnterPosition(): Vector;
    GetHeartPicked(): boolean;
    GetLastBossRoomListIndex(): int;
    GetLastRoomDesc(): ReadonlyRoomDescriptor;

    /**
     * @param levelStage Default value is the current stage.
     * @param stageType Default value is the current stage type.
     * @param curses Default value is the current curses.
     * @param infiniteLevel Default value is the current infinite level setting.
     * @param dyslexia Default value is the current dyslexia setting.
     */
    GetName(
      levelStage?: LevelStage,
      stageType?: StageType,
      curses?: int,
      infiniteLevel?: int,
      dyslexia?: boolean,
    ): string;

    /**
     * Returns the grid index of an unexplored or uncleared room on the floor. Returns -1 if all
     * rooms have been explored and cleared.
     */
    GetNonCompleteRoomIndex(): int;

    /** Returns the probability of getting a Planetarium (in the 0-1 range). */
    GetPlanetariumChance(): float;

    /** Returns the grid index of the previous room. */
    GetPreviousRoomIndex(): int;

    /** Returns a random grid index of the floor. */
    GetRandomRoomIndex(IAmErrorRoom: boolean, seed: Seed): int;

    /**
     * @param roomGridIndex The grid index of the room to get.
     * @param dimension Default is `Dimension.CURRENT`.
     */
    GetRoomByIdx(roomGridIndex: int, dimension?: Dimension): RoomDescriptor;

    GetRoomCount(): int;
    GetRooms(): RoomList;
    GetStage(): LevelStage;
    GetStageType(): StageType;

    /** Returns the grid index of the starting room on the floor. */
    GetStartingRoomIndex(): int;

    GetStateFlag(levelStateFlag: LevelStateFlag): boolean;
    HasBossChallenge(): boolean;
    InitializeDevilAngelRoom(forceAngel: boolean, forceDevil: boolean): void;
    IsAltStage(): boolean;

    /** Returns true if the player is in the Ascent. */
    IsAscent(): boolean;

    IsDevilRoomDisabled(): boolean;
    IsNextStageAvailable(): boolean;

    /** Returns true if the player is in the version of Mausoleum/Gehenna leading to the Ascent. */
    IsPreAscent(): boolean;

    /**
     * Attempts to create a red room door in the given room at the given door slot. Returns true on
     * success.
     */
    MakeRedRoomDoor(roomGridIndex: int, doorSlot: DoorSlot): boolean;

    /**
     * @param roomType
     * @param visited
     * @param rng
     * @param ignoreGroup If set to true, includes rooms that do not have the same group ID as the
     *                    current room. Default is false.
     */
    QueryRoomTypeIndex(
      roomType: RoomType,
      visited: boolean,
      rng: RNG,
      ignoreGroup?: boolean,
    ): int;

    RemoveCompassEffect(): void;

    /**
     * This is currently bugged and maps internally to `Level.RemoveCurse`. The old
     * `Level.RemoveCurses` is not currently accessible.
     */
    RemoveCurses(levelCurse: LevelCurse | int): void;

    SetCanSeeEverything(value: boolean): void;
    SetHeartPicked(): void;

    /**
     * Puts you in the next stage without applying any of the floor changes. You are meant to call
     * `Level.StartStageTransition` after using this function.
     */
    SetNextStage(): void;

    SetRedHeartDamage(): void;
    SetStage(levelStage: LevelStage, stageType: StageType): void;
    SetStateFlag(levelStateFlag: LevelStateFlag, value: boolean): void;

    /**
     * Reveals the entire map except for the Super Secret Room. (This is the same as the World card
     * or Sun card.)
     */
    ShowMap(): void;

    ShowName(sticky: boolean): void;

    /**
     * Uncovers the door on both sides by modifying the saved grid entities for neighboring room.
     */
    UncoverHiddenDoor(currentRoomIdx: int, doorSlot: DoorSlot): void;

    Update(): void;

    /**
     * Call this method to update the mini-map after changing the `DisplayFlags` property of a room.
     */
    UpdateVisibility(): void;

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
