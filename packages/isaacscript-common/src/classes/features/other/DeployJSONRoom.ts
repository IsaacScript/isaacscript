import type { GridEntityXMLType } from "isaac-typescript-definitions";
import {
  EntityCollisionClass,
  EntityGridCollisionClass,
  EntityType,
  GridEntityType,
  PickupVariant,
  PitfallVariant,
  RoomType,
} from "isaac-typescript-definitions";
import { GRID_ENTITY_XML_TYPE_VALUES } from "../../../cachedEnumValues";
import { game } from "../../../core/cachedClasses";
import { Exported } from "../../../decorators";
import { ISCFeature } from "../../../enums/ISCFeature";
import { emptyRoom } from "../../../functions/emptyRoom";
import {
  getEntityIDFromConstituents,
  spawnWithSeed,
} from "../../../functions/entities";
import {
  convertXMLGridEntityType,
  getGridEntities,
  spawnGridEntityWithVariant,
} from "../../../functions/gridEntities";
import { getRandomJSONEntity } from "../../../functions/jsonRoom";
import { log } from "../../../functions/log";
import { isRNG, newRNG } from "../../../functions/rng";
import { gridCoordinatesToWorldPosition } from "../../../functions/roomGrid";
import { setRoomCleared, setRoomUncleared } from "../../../functions/rooms";
import { spawnCollectible } from "../../../functions/spawnCollectible";
import { asCollectibleType, parseIntSafe } from "../../../functions/types";
import { assertDefined } from "../../../functions/utils";
import type { JSONRoom } from "../../../interfaces/JSONRoomsFile";
import { ReadonlySet } from "../../../types/ReadonlySet";
import { Feature } from "../../private/Feature";
import type { PreventGridEntityRespawn } from "./PreventGridEntityRespawn";

const GRID_ENTITY_XML_TYPE_SET = new ReadonlySet<GridEntityXMLType>(
  GRID_ENTITY_XML_TYPE_VALUES,
);

export class DeployJSONRoom extends Feature {
  private readonly preventGridEntityRespawn: PreventGridEntityRespawn;

  /** @internal */
  constructor(preventGridEntityRespawn: PreventGridEntityRespawn) {
    super();

    this.featuresUsed = [ISCFeature.PREVENT_GRID_ENTITY_RESPAWN];

    this.preventGridEntityRespawn = preventGridEntityRespawn;
  }

  private spawnAllEntities(
    jsonRoom: Readonly<JSONRoom>,
    rng: RNG,
    verbose = false,
  ) {
    let shouldUnclearRoom = false;

    for (const jsonSpawn of jsonRoom.spawn) {
      const xString = jsonSpawn.$.x;
      const x = parseIntSafe(xString);
      assertDefined(
        x,
        `Failed to convert the following x coordinate to an integer (for a spawn): ${xString}`,
      );

      const yString = jsonSpawn.$.y;
      const y = parseIntSafe(yString);
      assertDefined(
        y,
        `Failed to convert the following y coordinate to an integer (for a spawn): ${yString}`,
      );

      const jsonEntity = getRandomJSONEntity(jsonSpawn.entity, rng);

      const entityTypeString = jsonEntity.$.type;
      const entityTypeNumber = parseIntSafe(entityTypeString);
      assertDefined(
        entityTypeNumber,
        `Failed to convert the entity type to an integer: ${entityTypeString}`,
      );

      const variantString = jsonEntity.$.variant;
      const variant = parseIntSafe(variantString);
      assertDefined(
        variant,
        `Failed to convert the entity variant to an integer: ${variant}`,
      );

      const subTypeString = jsonEntity.$.subtype;
      const subType = parseIntSafe(subTypeString);
      assertDefined(
        subType,
        `Failed to convert the entity sub-type to an integer: ${subType}`,
      );

      const isGridEntity = GRID_ENTITY_XML_TYPE_SET.has(
        entityTypeNumber as GridEntityXMLType,
      );
      if (isGridEntity) {
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
        const entity = this.spawnNormalEntityForJSONRoom(
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

    // After emptying the room, we manually cleared the room. However, if the room layout contains
    // an battle NPC, then we need to reset the clear state and close the doors again.
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

  private spawnNormalEntityForJSONRoom(
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
      // eslint-disable-next-line @typescript-eslint/no-unsafe-enum-comparison
      variant === PickupVariant.COLLECTIBLE
    ) {
      const collectibleType = asCollectibleType(subType);
      const options = roomType === RoomType.ANGEL;
      entity = spawnCollectible(collectibleType, position, seed, options);
    } else {
      entity = spawnWithSeed(entityType, variant, subType, position, seed);
    }

    // For some reason, Pitfalls do not spawn with the correct collision classes.
    if (
      entityType === EntityType.PITFALL &&
      // eslint-disable-next-line @typescript-eslint/no-unsafe-enum-comparison
      variant === PitfallVariant.PITFALL
    ) {
      entity.EntityCollisionClass = EntityCollisionClass.ENEMIES;
      entity.GridCollisionClass = EntityGridCollisionClass.WALLS;
    }

    return entity;
  }

  /**
   * Helper function to deconstruct a vanilla room and set up a custom room in its place.
   * Specifically, this will clear the current room of all entities and grid entities, and then
   * spawn all of the entries and grid entities in the provided JSON room. For this reason, you must
   * be in the actual room in order to use this function.
   *
   * A JSON room is simply an XML file converted to JSON. You can create JSON rooms by using the
   * Basement Renovator room editor to create an XML file, and then convert it to JSON using the
   * `convert-xml-to-json` tool (e.g. `npx convert-xml-to-json my-rooms.xml`).
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
   * If you want to deploy an unseeded room, you must explicitly pass `undefined` to the `seedOrRNG`
   * parameter.
   *
   * In order to use this function, you must upgrade your mod with `ISCFeature.DEPLOY_JSON_ROOM`.
   *
   * @param jsonRoom The JSON room to deploy.
   * @param seedOrRNG The `Seed` or `RNG` object to use. If an `RNG` object is provided, the
   *                  `RNG.Next` method will be called. If `undefined` is provided, it will default
   *                  to a random seed.
   * @param verbose Optional. If specified, will write entries to the "log.txt" file that describe
   *                what the function is doing. Default is false.
   * @public
   */
  @Exported
  public deployJSONRoom(
    jsonRoom: Readonly<JSONRoom>,
    seedOrRNG: Seed | RNG | undefined,
    verbose = false,
  ): void {
    const rng = isRNG(seedOrRNG) ? seedOrRNG : newRNG(seedOrRNG);

    if (verbose) {
      log("Starting to empty the room of entities and grid entities.");
    }
    emptyRoom();
    if (verbose) {
      log("Finished emptying the room of entities and grid entities.");
    }

    setRoomCleared();

    if (verbose) {
      log("Starting to spawn all of the new entities and grid entities.");
    }
    this.spawnAllEntities(jsonRoom, rng, verbose);
    if (verbose) {
      log("Finished spawning all of the new entities and grid entities.");
    }

    fixPitGraphics();
    this.preventGridEntityRespawn.preventGridEntityRespawn();
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

/**
 * By default, when spawning multiple pits next to each other, the graphics will not "meld"
 * together. Thus, now that all of the entities in the room are spawned, we must iterate over the
 * pits in the room and manually fix their sprites, if necessary.
 */
function fixPitGraphics() {
  const room = game.GetRoom();
  const gridWidth = room.GetGridWidth();
  const pitMap = getPitMap();

  for (const [gridIndex, gridEntity] of pitMap) {
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

function getPitMap(): ReadonlyMap<int, GridEntity> {
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
