import type {
  Dimension,
  DoorSlot,
  LevelStage,
  RoomShape,
  StageType,
} from "isaac-typescript-definitions";
import type { SpecialQuest } from "../../enums/SpecialQuest";

declare global {
  interface Level extends IsaacAPIClass {
    /**
     * Returns whether the provided room config can be successfully placed at the provided grid
     * index using `Level.TryPlaceRoom`.
     *
     * @param roomConfigToPlace
     * @param gridIndex
     * @param dimension Optional. Default is `Dimension.CURRENT`.
     * @param allowMultipleDoors Optional. If true, the room can be placed if it has more than one
     *                           door. Default is true.
     * @param allowSpecialNeighbors Optional. If true, the game will allow the room to connect with
     *                              special rooms. Default is false.
     * @param allowNoNeighbors Optional. If true, the room can be placed anywhere on the map without
     *                         having any neighbors. Default is false.
     */
    CanPlaceRoom: (
      roomConfigToPlace: RoomConfig,
      gridIndex: int,
      dimension?: Dimension,
      allowMultipleDoors?: boolean,
      allowSpecialNeighbors?: boolean,
      allowNoNeighbors?: boolean,
    ) => boolean;

    /**
     * Returns whether the provided room config can be successfully placed as a neighbor of an
     * existing room at the provided door slot using `Level.TryPlaceRoomAtDoor`.
     *
     * @param roomConfigToPlace
     * @param neighborRoomDescriptor
     * @param doorSlot
     * @param allowMultipleDoors Optional. If true, the room can be placed if it has more than one
     *                           door. Default is true.
     * @param allowSpecialNeighbors Optional. If true, the game will allow the room to connect with
     *                              special rooms. Default is false.
     */
    CanPlaceRoomAtDoor: (
      roomConfigToPlace: RoomConfig,
      neighborRoomDescriptor: RoomDescriptor,
      doorSlot: DoorSlot,
      allowMultipleDoors?: boolean,
      allowSpecialNeighbors?: boolean,
    ) => boolean;

    /** Returns whether the Red Door outline can spawn at the specified `DoorSlot`. */
    CanSpawnDoorOutline: (roomIndex: int, doorSlot: DoorSlot) => boolean;

    /**
     * Returns an array of grid indices that are valid locations to place the provided room using
     * `Level.TryPlaceRoom`.
     *
     * @param roomConfigToPlace
     * @param dimension Optional. Default is `Dimension.CURRENT`.
     * @param allowMultipleDoors Optional. If true, the room can be placed if it has more than one
     *                           door. Default is true.
     * @param allowSpecialNeighbors Optional. If true, the game will allow the room to connect with
     *                              special rooms. Default is false.
     */
    FindValidRoomPlacementLocations: (
      roomConfigToPlace: RoomConfig,
      dimension?: Dimension,
      allowMultipleDoors?: boolean,
      allowSpecialNeighbors?: boolean,
    ) => int[];

    /** Returns the current dimension the player is in. */
    GetDimension: () => Dimension;

    /**
     * Returns the level's forced special quest. This can be set through
     * `Level.SetForceSpecialQuest`.
     */
    GetForceSpecialQuest: () => SpecialQuest;

    GetGenerationRNG: () => RNG;

    /** Returns the number of Greed Mode waves cleared without a player taking Red Heart damage. */
    GetGreedWavesClearedWithoutRedHeartDamage: () => int;

    /**
     * Returns the pickups that will be transferred to the next floor by the Myosotis trinket
     * effect.
     */
    GetMyosotisPickups: () => EntitiesSaveStateVector;

    /**
     * Returns a map that maps `DoorSlot` to `RoomDescriptor` for all of the neighbors that a room
     * of the provided room shape would have if placed at the provided grid index.
     *
     * This method does not give any information on if a room would actually fit there, or if the
     * neighbors would allow the connection.
     *
     * If you want to get the neighbors of an existing room, use
     * `RoomDescriptor.GetNeighboringRooms` instead.
     *
     * @param gridIndex
     * @param roomShape
     * @param dimension Optional. Default is `Dimension.CURRENT`.
     */
    GetNeighboringRooms: (
      gridIndex: int,
      roomShape: RoomShape,
      dimension?: Dimension,
    ) => LuaMap<DoorSlot, RoomDescriptor>;

    /** Returns whether the floor has the mineshaft room used for the second Knife Piece puzzle. */
    HasAbandonedMineshaft: () => boolean;

    /** Returns whether the floor has the mirror dimension used for the first Knife Piece puzzle. */
    HasMirrorDimension: () => boolean;

    /**
     * Returns whether the floor has the mysterious door used to enter Mausoleum/Gehenna leading to
     * the Ascent sequence.
     */
    HasPhotoDoor: () => boolean;

    /**
     * Returns whether the specified level and stage combination can be generated in any given run
     * and is not locked behind an achievement.
     */
    IsStageAvailable: (level: LevelStage, stage: StageType) => boolean;

    /**
     * Attempts to place a room.
     *
     * This method does not check if a room placement would be considered valid, nor does it create
     * the doors necessary to connect the new room to its neighbors. If you wish to properly add new
     * rooms to the floor after level generation, use `Level.TryPlaceRoom` instead.
     *
     * Returns whether room placement was successful.
     */
    PlaceRoom: (
      room: LevelGeneratorEntry,
      roomConfig: RoomConfig,
      seed: Seed,
    ) => boolean;

    /**
     * Sets the level's forced special quest on the floor. For this method to work properly, it
     * should be called in `ModCallbackRepentogon.PRE_LEVEL_INIT`.
     */
    SetForceSpecialQuest: (quest: SpecialQuest) => void;

    /** Sets how many Greed Mode waves were cleared without taking Red Heart damage. */
    SetGreedWavesClearedWithoutRedHeartDamage: (waves: int) => void;

    /** Sets the display name of the level. */
    SetName: (name: string) => void;

    /**
     * Tries to place a room corresponding to the provided room config at the provided grid index.
     * Returns a `RoomDescriptor` if room placement was successful. Returns undefined if room
     * placement was unsuccessful.
     *
     * @param roomConfigToPlace
     * @param gridIndex
     * @param dimension Optional. Default is `Dimension.CURRENT`.
     * @param seed Optional. Setting the seed to zero will have the game generate a seed based on
     *             the room's location, shape, and the level's seed. Default is 0.
     * @param allowMultipleDoors Optional. If true, the room can be placed if it has more than one
     *                           door. Default is true.
     * @param allowSpecialNeighbors Optional. If true, the game will allow the room to connect with
     *                              special rooms. Default is false.
     * @param allowNoNeighbors Optional. If true, the room can be placed anywhere on the map without
     *                         having any neighbors. Default is false.
     */
    TryPlaceRoom: (
      roomConfigToPlace: RoomConfig,
      gridIndex: int,
      dimension?: Dimension,
      seed?: Seed,
      allowMultipleDoors?: boolean,
      allowSpecialNeighbors?: boolean,
      allowNoNeighbors?: boolean,
    ) => RoomDescriptor | undefined;

    /**
     * Tries to place a room corresponding to the provided room config at the provided door slot at
     * in existing room. Returns a `RoomDescriptor` if room placement was successful. Returns
     * undefined if room placement was unsuccessful.
     *
     * @param roomConfigToPlace
     * @param neighborRoomDescriptor
     * @param doorSlot
     * @param seed Optional. Setting the seed to zero will have the game generate a seed based on
     *             the room's location, shape, and the level's seed. Default is 0.
     * @param allowMultipleDoors Optional. If true, the room can be placed if it has more than one
     *                           door. Default is true.
     * @param allowSpecialNeighbors Optional. If true, the game will allow the room to connect with
     *                              special rooms. Default is false.
     */
    TryPlaceRoomAtDoor: (
      roomConfigToPlace: RoomConfig,
      neighborRoomDescriptor: RoomDescriptor,
      doorSlot: DoorSlot,
      seed?: Seed,
      allowMultipleDoors?: boolean,
      allowSpecialNeighbors?: boolean,
    ) => RoomDescriptor | undefined;
  }
}
