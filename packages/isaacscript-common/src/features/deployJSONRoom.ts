// Basement Renovator can create custom rooms that are saved to XML files. These XML files can be
// converted to JSON so that they can be imported by TypeScript code. Then, existing rooms can be
// manually replaced with a custom room by manually removing everything in the room and rebuilding
// it from scratch based on the JSON data.

import {
  ActiveSlot,
  CollectibleType,
  EffectVariant,
  EntityCollisionClass,
  EntityFlag,
  EntityGridCollisionClass,
  EntityType,
  GridEntityType,
  GridEntityXMLType,
  ModCallback,
  PickupVariant,
  PitfallVariant,
  RoomType,
  UseFlag,
} from "isaac-typescript-definitions";
import { DefaultMap } from "../classes/DefaultMap";
import { ModUpgraded } from "../classes/ModUpgraded";
import { game } from "../core/cachedClasses";
import { ModCallbackCustom } from "../enums/ModCallbackCustom";
import { errorIfFeaturesNotInitialized } from "../featuresInitialized";
import { emptyArray } from "../functions/array";
import {
  getEntityIDFromConstituents,
  removeAllMatchingEntities,
  spawn,
  spawnWithSeed,
} from "../functions/entities";
import {
  getNPCs,
  removeAllBombs,
  removeAllPickups,
} from "../functions/entitiesSpecific";
import {
  convertXMLGridEntityType,
  getAllGridIndexes,
  getGridEntities,
  removeAllGridEntitiesExcept,
  removeGridEntity,
  setGridEntityInvisible,
  spawnGridEntityWithVariant,
} from "../functions/gridEntities";
import { getRandomJSONRoom } from "../functions/jsonRoom";
import { log } from "../functions/log";
import { getRandomSeed, isRNG, newRNG } from "../functions/rng";
import { getRoomListIndex } from "../functions/roomData";
import { gridCoordinatesToWorldPosition } from "../functions/roomGrid";
import { setRoomCleared, setRoomUncleared } from "../functions/rooms";
import { spawnCollectible } from "../functions/spawnCollectible";
import { asCollectibleType, asNumber } from "../functions/types";
import { JSONRoom } from "../interfaces/JSONRoomsFile";
import { runNextGameFrame } from "./runInNFrames";
import { saveDataManager } from "./saveDataManager/exports";

interface PersistentEntityDescription {
  gridIndex: int;
  entityType: EntityType;
  variant: int;
  subType: int;
}

const FEATURE_NAME = "deployJSONRoom";

const NPC_TYPES_TO_NOT_REMOVE: ReadonlySet<EntityType> = new Set([
  EntityType.DARK_ESAU,
]);

const PERSISTENT_ENTITY_TYPES: ReadonlySet<EntityType> = new Set([
  EntityType.WALL_HUGGER,
]);

const v = {
  level: {
    deployedRoomListIndexes: new Set<int>(),

    /** Indexed by room list index. */
    roomToPersistentEntitiesMap: new DefaultMap<
      int,
      PersistentEntityDescription[]
    >(() => []),

    /** Indexed by room list index. */
    roomToDecorationGridIndexesMap: new DefaultMap<int, int[]>(() => []),
  },

  room: {
    manuallyUsingShovel: false,
  },
};

/** @internal */
export function deployJSONRoomInit(mod: ModUpgraded): void {
  saveDataManager(FEATURE_NAME, v);

  mod.AddCallback(
    ModCallback.PRE_USE_ITEM,
    preUseItemWeNeedToGoDeeper,
    CollectibleType.WE_NEED_TO_GO_DEEPER,
  ); // 23

  mod.AddCallbackCustom(
    ModCallbackCustom.POST_NEW_ROOM_REORDERED,
    postNewRoomReordered,
  );
}

// ModCallback.PRE_USE_ITEM (23)
// CollectibleType.WE_NEED_TO_GO_DEEPER (84)
function preUseItemWeNeedToGoDeeper(
  _collectibleType: CollectibleType,
  _rng: RNG,
  player: EntityPlayer,
  _useFlags: BitFlags<UseFlag>,
  _activeSlot: ActiveSlot,
  _customVarData: int,
): boolean | undefined {
  if (v.room.manuallyUsingShovel) {
    return undefined;
  }

  const roomListIndex = getRoomListIndex();
  if (!v.level.deployedRoomListIndexes.has(roomListIndex)) {
    return undefined;
  }

  // If the player uses the shovel in a JSON room, then it will always reveal a crawl space. This is
  // because the room is filled with invisible decorations to prevent any grid entities from
  // respawning. In order to restore the normal shovel functionality, we cancel the shovel use,
  // remove all the decorations, wait a frame, manually use the shovel again, and then respawn the
  // decorations. (We can't do it all on this frame because updating the room causes two invocations
  // of the shovel to happen.)
  const decorations = getGridEntities(GridEntityType.DECORATION);
  for (const decoration of decorations) {
    removeGridEntity(decoration, false);
  }

  const playerPtr = EntityPtr(player);
  runNextGameFrame(() => {
    const futureEntity = playerPtr.Ref;
    if (futureEntity === undefined) {
      return;
    }

    const futurePlayer = futureEntity.ToPlayer();
    if (futurePlayer === undefined) {
      return;
    }

    v.room.manuallyUsingShovel = true;
    futurePlayer.UseActiveItem(CollectibleType.WE_NEED_TO_GO_DEEPER);
    v.room.manuallyUsingShovel = false;

    const decorationGridIndexes =
      v.level.roomToDecorationGridIndexesMap.getAndSetDefault(roomListIndex);
    emptyArray(decorationGridIndexes);
    fillRoomWithDecorations();
  });

  // Cancel the original effect.
  return true;
}

// ModCallbackCustom.POST_NEW_ROOM_REORDERED
function postNewRoomReordered() {
  const roomListIndex = getRoomListIndex();

  if (!v.level.deployedRoomListIndexes.has(roomListIndex)) {
    return;
  }

  setDecorationsInvisible();
  respawnPersistentEntities();
}

/**
 * Every time we re-enter a deployed room, the sprites for all of the decorations will come back, so
 * we have to remove them again.
 */
function setDecorationsInvisible() {
  const room = game.GetRoom();
  const roomListIndex = getRoomListIndex();

  const decorationGridIndexes =
    v.level.roomToDecorationGridIndexesMap.getAndSetDefault(roomListIndex);

  for (const gridIndex of decorationGridIndexes) {
    const gridEntity = room.GetGridEntity(gridIndex);
    if (gridEntity !== undefined) {
      // Other grid entities may have spawned, like trapdoors or crawl spaces. Thus, only make
      // decorations invisible.
      const gridEntityType = gridEntity.GetType();
      if (gridEntityType === GridEntityType.DECORATION) {
        setGridEntityInvisible(gridEntity);
      }
    }
  }
}

/** Some entities must be manually respawned every time the player re-enters the room. */
function respawnPersistentEntities() {
  const room = game.GetRoom();
  const roomListIndex = getRoomListIndex();

  const persistentEntities =
    v.level.roomToPersistentEntitiesMap.getAndSetDefault(roomListIndex);

  for (const persistentEntity of persistentEntities) {
    const position = room.GetGridPosition(persistentEntity.gridIndex);
    spawn(
      persistentEntity.entityType,
      persistentEntity.variant,
      persistentEntity.subType,
      position,
    );
  }
}

/**
 * Helper function to deconstruct a vanilla room and set up a custom room in its place.
 * Specifically, this will clear the current room of all entities and grid entities, and then spawn
 * all of the entries and grid entities in the provided JSON room.
 *
 * You can create JSON rooms by using the `convert-xml-to-json` tool (e.g. `npx convert-xml-to-json
 * my-rooms.xml`).
 *
 * This function is meant to be used in the `POST_NEW_ROOM` callback.
 *
 * For example:
 *
 * ```ts
 *
 * import customRooms from "./customRooms.json";
 *
 * export function postNewRoom(): void {
 *   const firstJSONRoom = customRooms.rooms.room[0];
 *   deployJSONRoom(firstJSONRoom);
 * }
 * ```
 *
 * @param jsonRoom The JSON room to deploy. *
 * @param seedOrRNG Optional. The `Seed` or `RNG` object to use. If an `RNG` object is provided, the
 *                  `RNG.Next` method will be called. Default is `getRandomSeed()`.
 * @param verbose Optional. If specified, will write entries to the "log.txt" file that describe
 *                what the function is doing. Default is false.
 */
export function deployJSONRoom(
  jsonRoom: JSONRoom | Readonly<JSONRoom>,
  seedOrRNG: Seed | RNG = getRandomSeed(),
  verbose = false,
): void {
  errorIfFeaturesNotInitialized(FEATURE_NAME);

  const rng = isRNG(seedOrRNG) ? seedOrRNG : newRNG(seedOrRNG);

  if (verbose) {
    log("Starting to empty the room of entities and grid entities.");
  }
  emptyRoom(false);
  if (verbose) {
    log("Finished emptying the room of entities and grid entities.");
  }

  if (verbose) {
    log("Starting to spawn all of the new entities and grid entities.");
  }
  spawnAllEntities(jsonRoom, rng, verbose);
  if (verbose) {
    log("Finished spawning all of the new entities and grid entities.");
  }

  fixPitGraphics();
  fillRoomWithDecorations();
}

/**
 * Helper function to deconstruct a vanilla room and set up a custom room in its place.
 * Specifically, this will clear the current room of all entities and grid entities, and then spawn
 * all of the entries and grid entities in one of the provided JSON rooms.
 *
 * You can create JSON rooms by using the `convert-xml-to-json` tool (e.g. `npx convert-xml-to-json
 * my-rooms.xml`).
 *
 * This function is meant to be used in the `POST_NEW_ROOM` callback.
 *
 * Note that this function does not simply choose a random element in the provided array; it will
 * properly account for each room weight using the algorithm from:
 * https://stackoverflow.com/questions/1761626/weighted-random-numbers
 *
 * For example:
 *
 * ```ts
 * import customRooms from "./customRooms.json";
 *
 * export function postNewRoom(): void {
 *   const jsonRooms = customRooms.rooms.room;
 *   deployRandomJSONRoom(jsonRooms);
 * }
 * ```
 *
 * @param jsonRooms An array of JSON rooms to randomly select from. In practice, this will be
 *                  something like.
 * @param seedOrRNG Optional. The `Seed` or `RNG` object to use. If an `RNG` object is provided, the
 *                  `RNG.Next` method will be called. Default is `getRandomSeed()`.
 * @param verbose Optional. If specified, will write entries to the "log.txt" file that describe
 *                what the function is doing. Default is false.
 */
export function deployRandomJSONRoom(
  jsonRooms: JSONRoom[] | readonly JSONRoom[],
  seedOrRNG: Seed | RNG = getRandomSeed(),
  verbose = false,
): void {
  errorIfFeaturesNotInitialized(FEATURE_NAME);

  const rng = isRNG(seedOrRNG) ? seedOrRNG : newRNG(seedOrRNG);

  const randomJSONRoom = getRandomJSONRoom(jsonRooms, rng, verbose);
  if (verbose) {
    log(
      `Randomly chose JSON room ${randomJSONRoom.$.type}.${randomJSONRoom.$.variant}.${randomJSONRoom.$.subtype} with name: ${randomJSONRoom.$.name}`,
    );
  }

  return deployJSONRoom(randomJSONRoom, rng, verbose);
}

/**
 * Helper function to remove all naturally spawning entities and grid entities from a room. Notably,
 * this will not remove players (1), tears (2), familiars (3), lasers (7), knives (8), projectiles
 * (9), blacklisted NPCs such as Dark Esau, charmed NPCs, friendly NPCs, persistent NPCs, most
 * effects (1000), doors, and walls.
 *
 * @param fillWithDecorations Optional. Set to true to fill every grid tile with an invisible
 *                            decoration, which prevents vanilla entities in the room from
 *                            respawning the next time that the player enters. Default is false.
 */
export function emptyRoom(fillWithDecorations: boolean): void {
  errorIfFeaturesNotInitialized(FEATURE_NAME);

  const roomListIndex = getRoomListIndex();

  v.level.deployedRoomListIndexes.add(roomListIndex);

  removeAllBombs(); // 4
  removeAllPickups(); // 5
  removeAllMatchingEntities(EntityType.SLOT); // 6
  removeSpecificNPCs();
  removeAllMatchingEntities(EntityType.EFFECT, EffectVariant.DEVIL);
  removeAllMatchingEntities(EntityType.EFFECT, EffectVariant.ANGEL);

  removeAllGridEntitiesExcept(
    GridEntityType.WALL, // 15
    GridEntityType.DOOR, // 16
  );

  setRoomCleared();

  if (fillWithDecorations) {
    fillRoomWithDecorations();
  }
}

/**
 * We remove entities in the `POST_NEW_ROOM` callback instead of in the PreRoomEntitySpawn callback
 * so that they will not re-appear when we re-enter the room.
 */
function removeSpecificNPCs() {
  const room = game.GetRoom();

  for (const npc of getNPCs()) {
    if (NPC_TYPES_TO_NOT_REMOVE.has(npc.Type)) {
      continue;
    }

    if (
      npc.HasEntityFlags(EntityFlag.CHARM) ||
      npc.HasEntityFlags(EntityFlag.FRIENDLY) ||
      npc.HasEntityFlags(EntityFlag.PERSISTENT)
    ) {
      continue;
    }

    npc.ClearEntityFlags(EntityFlag.APPEAR);
    npc.Remove();

    // When fire places are removed, they will leave behind a "path" that will prevent future grid
    // entities from being spawned on the same tile. Thus, reset the path for this tile if this is a
    // fire place.
    if (npc.Type === EntityType.FIREPLACE) {
      const gridIndex = room.GetGridIndex(npc.Position);
      room.SetGridPath(gridIndex, 0);
    }
  }
}

/**
 * We removed most normal entities, which should prevent them from respawning when the player
 * re-enters the room. However, this is not the case for grid entities; even if they are removed,
 * they will come back when the player re-enters the room.
 *
 * In order to prevent this from happening, we can spawn a grid entity on every tile that does not
 * already have a grid entity. The natural grid entity to choose for this purpose is a decoration,
 * since it is non-interacting.
 *
 * Another option besides decorations would be to use a pressure plates with a state of 1, which is
 * a state that is normally unused by the game and makes it invisible & persistent. However, pickups
 * will not be able to spawn on pressure plates, which lead to various bugs (e.g. pickups spawning
 * on top of pits). Thus, we use a decoration and remove its sprite to make it invisible.
 *
 * Yet another option is to replace the room data with that of an empty room. However, the room data
 * must exactly match the room type, the room shape, and the doors, so this is not possible to do in
 * a robust way without adding empty rooms to the mod's `content` folder to draw the data from.
 */
function fillRoomWithDecorations() {
  const room = game.GetRoom();
  const roomListIndex = getRoomListIndex();

  const decorationGridIndexes =
    v.level.roomToDecorationGridIndexesMap.getAndSetDefault(roomListIndex);

  for (const gridIndex of getAllGridIndexes()) {
    const existingGridEntity = room.GetGridEntity(gridIndex);
    if (existingGridEntity !== undefined) {
      continue;
    }

    const position = room.GetGridPosition(gridIndex);
    const decoration = Isaac.GridSpawn(GridEntityType.DECORATION, 0, position);

    if (decoration !== undefined) {
      setGridEntityInvisible(decoration);
    }

    decorationGridIndexes.push(gridIndex);
  }
}

function spawnAllEntities(
  jsonRoom: JSONRoom | Readonly<JSONRoom>,
  rng: RNG,
  verbose = false,
) {
  let shouldUnclearRoom = false;

  for (const jsonSpawn of jsonRoom.spawn) {
    const xString = jsonSpawn.$.x;
    const x = tonumber(xString);
    if (x === undefined) {
      error(
        `Failed to convert the following x coordinate to a number (for a spawn): ${xString}`,
      );
    }

    const yString = jsonSpawn.$.y;
    const y = tonumber(yString);
    if (y === undefined) {
      error(
        `Failed to convert the following y coordinate to a number (for a spawn): ${yString}`,
      );
    }

    if (jsonSpawn.entity.length > 1) {
      error("Stacked entities are not implemented for JSON rooms.");
    }

    const firstXMLEntity = jsonSpawn.entity[0];
    if (firstXMLEntity === undefined) {
      error('Failed to get the first JSON entity from an "entity" array.');
    }

    const entityTypeString = firstXMLEntity.$.type;
    const entityTypeNumber = tonumber(entityTypeString);
    if (entityTypeNumber === undefined) {
      error(
        `Failed to convert the entity type to a number: ${entityTypeString}`,
      );
    }

    const variantString = firstXMLEntity.$.variant;
    const variant = tonumber(variantString);
    if (variant === undefined) {
      error(`Failed to convert the entity variant to a number: ${variant}`);
    }

    const subTypeString = firstXMLEntity.$.subtype;
    const subType = tonumber(subTypeString);
    if (subType === undefined) {
      error(`Failed to convert the entity sub-type to a number: ${subType}`);
    }

    // Note that XML entity type 1000 is a rock, not an effect.
    if (entityTypeNumber >= 1000) {
      const gridEntityXMLType = entityTypeNumber as GridEntityXMLType;
      if (verbose) {
        log(
          `Spawning grid entity ${gridEntityXMLType}.${variant} at: (${x}, ${y})`,
        );
      }
      spawnGridEntityForJSONRoom(gridEntityXMLType, variant, x, y);
    } else {
      const entityType = entityTypeNumber as EntityType;
      if (verbose) {
        const entityID = getEntityIDFromConstituents(
          entityType,
          variant,
          subType,
        );
        log(`Spawning normal entity ${entityID} at: (${x}, ${y})`);
      }
      const entity = spawnNormalEntityForJSONRoom(
        entityType,
        variant,
        subType,
        x,
        y,
        rng,
      );
      const npc = entity.ToNPC();
      if (npc !== undefined && npc.CanShutDoors) {
        shouldUnclearRoom = true;
      }
    }
  }

  // After emptying the room, we manually cleared the room. However, if the room layout contains an
  // battle NPC, then we need to reset the clear state and close the doors again.
  if (shouldUnclearRoom) {
    if (verbose) {
      log(
        "Setting the room to be uncleared since there were one or more battle NPCs spawned.",
      );
    }
    setRoomUncleared();
  } else if (verbose) {
    log("Leaving the room cleared since there were no battle NPCs spawned.");
  }
}

function spawnGridEntityForJSONRoom(
  gridEntityXMLType: GridEntityXMLType,
  gridEntityXMLVariant: int,
  x: int,
  y: int,
) {
  const room = game.GetRoom();

  const gridEntityTuple = convertXMLGridEntityType(
    gridEntityXMLType,
    gridEntityXMLVariant,
  );
  if (gridEntityTuple === undefined) {
    return undefined;
  }
  const [gridEntityType, variant] = gridEntityTuple;
  const position = gridCoordinatesToWorldPosition(x, y);
  const gridIndex = room.GetGridIndex(position);

  const gridEntity = spawnGridEntityWithVariant(
    gridEntityType,
    variant,
    gridIndex,
  );
  if (gridEntity === undefined) {
    return gridEntity;
  }

  // Prevent poops from playing an appear animation, since that is not supposed to normally happen
  // when entering a new room.
  if (gridEntityType === GridEntityType.POOP) {
    const sprite = gridEntity.GetSprite();
    sprite.Play("State1", true);
    sprite.SetLastFrame();
  }

  return gridEntity;
}

function spawnNormalEntityForJSONRoom(
  entityType: EntityType,
  variant: int,
  subType: int,
  x: int,
  y: int,
  rng: RNG,
) {
  const room = game.GetRoom();
  const roomType = room.GetType();
  const position = gridCoordinatesToWorldPosition(x, y);
  const seed = rng.Next();

  let entity: Entity;
  if (
    entityType === EntityType.PICKUP &&
    variant === asNumber(PickupVariant.COLLECTIBLE)
  ) {
    const options = roomType === RoomType.ANGEL;
    entity = spawnCollectible(
      asCollectibleType(subType),
      position,
      seed,
      options,
    );
  } else {
    entity = spawnWithSeed(entityType, variant, subType, position, seed);
  }

  // For some reason, Pitfalls do not spawn with the correct collision classes.
  if (
    entityType === EntityType.PITFALL &&
    variant === asNumber(PitfallVariant.PITFALL)
  ) {
    entity.EntityCollisionClass = EntityCollisionClass.ENEMIES;
    entity.GridCollisionClass = EntityGridCollisionClass.WALLS;
  }

  storePersistentEntity(entity);

  return entity;
}

/**
 * Some entities must be manually respawned every time the player re-enters the room. If we just
 * spawned one such entity, then record it for later.
 */
function storePersistentEntity(entity: Entity) {
  if (!PERSISTENT_ENTITY_TYPES.has(entity.Type)) {
    return;
  }

  const room = game.GetRoom();
  const gridIndex = room.GetGridIndex(entity.Position);
  const roomListIndex = getRoomListIndex();

  const persistentEntity: PersistentEntityDescription = {
    gridIndex,
    entityType: entity.Type,
    variant: entity.Variant,
    subType: entity.SubType,
  };

  const persistentEntities =
    v.level.roomToPersistentEntitiesMap.getAndSetDefault(roomListIndex);
  persistentEntities.push(persistentEntity);
}

/**
 * By default, when spawning multiple pits next to each other, the graphics will not "meld"
 * together. Thus, now that all of the entities in the room are spawned, we must iterate over the
 * pits in the room and manually fix their sprites, if necessary.
 */
function fixPitGraphics() {
  const room = game.GetRoom();
  const gridWidth = room.GetGridWidth();
  const pitMap = getPitMap();

  for (const [gridIndex, gridEntity] of pitMap.entries()) {
    const gridIndexLeft = gridIndex - 1;
    const L = pitMap.has(gridIndexLeft);
    const gridIndexRight = gridIndex + 1;
    const R = pitMap.has(gridIndexRight);
    const gridIndexUp = gridIndex - gridWidth;
    const U = pitMap.has(gridIndexUp);
    const gridIndexDown = gridIndex + gridWidth;
    const D = pitMap.has(gridIndexDown);
    const gridIndexUpLeft = gridIndex - gridWidth - 1;
    const UL = pitMap.has(gridIndexUpLeft);
    const gridIndexUpRight = gridIndex - gridWidth + 1;
    const UR = pitMap.has(gridIndexUpRight);
    const gridIndexDownLeft = gridIndex + gridWidth - 1;
    const DL = pitMap.has(gridIndexDownLeft);
    const gridIndexDownRight = gridIndex + gridWidth + 1;
    const DR = pitMap.has(gridIndexDownRight);

    const pitFrame = getPitFrame(L, R, U, D, UL, UR, DL, DR);
    const sprite = gridEntity.GetSprite();
    sprite.SetFrame(pitFrame);
  }
}

function getPitMap() {
  const pitMap = new Map<int, GridEntity>();
  for (const gridEntity of getGridEntities(GridEntityType.PIT)) {
    const gridIndex = gridEntity.GetGridIndex();
    pitMap.set(gridIndex, gridEntity);
  }

  return pitMap;
}

/** The logic in this function is copied from Basement Renovator. */
function getPitFrame(
  L: boolean,
  R: boolean,
  U: boolean,
  D: boolean,
  UL: boolean,
  UR: boolean,
  DL: boolean,
  DR: boolean,
) {
  let F = 0;

  // First, check for bitwise frames. (It works for all combinations of just left/up/right/down.)
  if (L) {
    F |= 1;
  }
  if (U) {
    F |= 2;
  }
  if (R) {
    F |= 4;
  }
  if (D) {
    F |= 8;
  }

  // Then, check for other combinations.
  if (U && L && !UL && !R && !D) {
    F = 17;
  }
  if (U && R && !UR && !L && !D) {
    F = 18;
  }
  if (L && D && !DL && !U && !R) {
    F = 19;
  }
  if (R && D && !DR && !L && !U) {
    F = 20;
  }
  if (L && U && R && D && !UL) {
    F = 21;
  }
  if (L && U && R && D && !UR) {
    F = 22;
  }
  if (U && R && D && !L && !UR) {
    F = 25;
  }
  if (L && U && D && !R && !UL) {
    F = 26;
  }

  if (L && U && R && D && !DL && !DR) {
    F = 24;
  }
  if (L && U && R && D && !UR && !UL) {
    F = 23;
  }
  if (L && U && R && UL && !UR && !D) {
    F = 27;
  }
  if (L && U && R && UR && !UL && !D) {
    F = 28;
  }
  if (L && U && R && !D && !UR && !UL) {
    F = 29;
  }
  if (L && R && D && DL && !U && !DR) {
    F = 30;
  }
  if (L && R && D && DR && !U && !DL) {
    F = 31;
  }
  if (L && R && D && !U && !DL && !DR) {
    F = 32;
  }

  return F;
}
