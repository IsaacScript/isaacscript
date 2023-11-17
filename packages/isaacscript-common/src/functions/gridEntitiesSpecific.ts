import type { TrapdoorVariant } from "isaac-typescript-definitions";
import {
  CrawlSpaceVariant,
  DoorVariant,
  GridEntityType,
  PitVariant,
  PoopGridEntityVariant,
  PressurePlateVariant,
  RockVariant,
} from "isaac-typescript-definitions";
import {
  getGridEntities,
  getMatchingGridEntities,
  removeGridEntities,
  spawnGridEntityWithVariant,
} from "./gridEntities";
import { assertDefined } from "./utils";

/**
 * Helper function to get all of the grid entities of type `GridEntityType.CRAWL_SPACE` (18) in the
 * room.
 *
 * @param crawlSpaceVariant Optional. If specified, will only get the crawl spaces that match the
 *                          variant. Default is -1, which matches every variant.
 */
export function getCrawlSpaces(
  crawlSpaceVariant: CrawlSpaceVariant | -1 = -1,
): GridEntity[] {
  if (crawlSpaceVariant === -1) {
    return getGridEntities(GridEntityType.CRAWL_SPACE);
  }

  return getMatchingGridEntities(GridEntityType.CRAWL_SPACE, crawlSpaceVariant);
}

// The `getDoors` function is not located here because doors are collected via the `Room.GetDoor`
// method instead, which is faster.

/**
 * Helper function to get all of the `GridEntityPit` in the room.
 *
 * @param pitVariant Optional. If specified, will only get the pits that match the variant. Default
 *                   is -1, which matches every variant.
 */
export function getPits(pitVariant: PitVariant | -1 = -1): GridEntityPit[] {
  const pits: GridEntityPit[] = [];
  for (const gridEntity of getGridEntities()) {
    const pit = gridEntity.ToPit();
    if (pit !== undefined) {
      const thisPitVariant = pit.GetVariant();
      if (pitVariant === -1 || pitVariant === thisPitVariant) {
        pits.push(pit);
      }
    }
  }

  return pits;
}

/**
 * Helper function to get all of the `GridEntityPoop` in the room.
 *
 * @param poopVariant Optional. If specified, will only get the poops that match the variant.
 *                    Default is -1, which matches every variant.
 */
export function getPoops(
  poopVariant: PoopGridEntityVariant | -1 = -1,
): GridEntityPoop[] {
  const poops: GridEntityPoop[] = [];
  for (const gridEntity of getGridEntities()) {
    const poop = gridEntity.ToPoop();
    if (poop !== undefined) {
      const thisPoopVariant = poop.GetVariant();
      if (poopVariant === -1 || poopVariant === thisPoopVariant) {
        poops.push(poop);
      }
    }
  }

  return poops;
}

/**
 * Helper function to get all of the `GridEntityPressurePlate` in the room.
 *
 * @param pressurePlateVariant Optional. If specified, will only get the pressure plates that match
 *                             the variant. Default is -1, which matches every variant.
 */
export function getPressurePlates(
  pressurePlateVariant: PressurePlateVariant | -1 = -1,
): GridEntityPressurePlate[] {
  const pressurePlates: GridEntityPressurePlate[] = [];
  for (const gridEntity of getGridEntities()) {
    const pressurePlate = gridEntity.ToPressurePlate();
    if (pressurePlate !== undefined) {
      const thisPressurePlateVariant = pressurePlate.GetVariant();
      if (
        pressurePlateVariant === -1 ||
        pressurePlateVariant === thisPressurePlateVariant
      ) {
        pressurePlates.push(pressurePlate);
      }
    }
  }

  return pressurePlates;
}

/**
 * Helper function to get all of the `GridEntityRock` in the room.
 *
 * @param variant Optional. If specified, will only get the rocks that match the variant. Default is
 *                -1, which matches every variant. Note that this is not the same thing as the
 *                `RockVariant` enum, since that only applies to `GridEntityType.ROCK`, and other
 *                types of grid entities can be the `GridEntityRock` class.
 */
export function getRocks(variant = -1): GridEntityRock[] {
  const rocks: GridEntityRock[] = [];
  for (const gridEntity of getGridEntities()) {
    const rock = gridEntity.ToRock();
    if (rock !== undefined) {
      const thisVariant = rock.GetVariant();
      if (variant === -1 || variant === thisVariant) {
        rocks.push(rock);
      }
    }
  }

  return rocks;
}

/** Helper function to get all of the `GridEntitySpikes` in the room. */
export function getSpikes(variant = -1): GridEntitySpikes[] {
  const spikes: GridEntitySpikes[] = [];
  for (const gridEntity of getGridEntities()) {
    const spike = gridEntity.ToSpikes();
    if (spike !== undefined) {
      const thisVariant = spike.GetVariant();
      if (variant === -1 || variant === thisVariant) {
        spikes.push(spike);
      }
    }
  }

  return spikes;
}

/** Helper function to get all of the `GridEntityTNT` in the room. */
export function getTNT(variant = -1): GridEntityTNT[] {
  const tntArray: GridEntityTNT[] = [];
  for (const gridEntity of getGridEntities()) {
    const tnt = gridEntity.ToTNT();
    if (tnt !== undefined) {
      const thisVariant = tnt.GetVariant();
      if (variant === -1 || variant === thisVariant) {
        tntArray.push(tnt);
      }
    }
  }

  return tntArray;
}

/**
 * Helper function to get all of the grid entities of type `GridEntityType.TELEPORTER` (23) in the
 * room.
 *
 * @param variant Optional. If specified, will only get the teleporters that match the variant.
 *                Default is -1, which matches every variant.
 */
export function getTeleporters(variant = -1): GridEntity[] {
  if (variant === -1) {
    return getGridEntities(GridEntityType.TELEPORTER);
  }

  return getMatchingGridEntities(GridEntityType.TELEPORTER, variant);
}

/**
 * Helper function to get all of the grid entities of type `GridEntityType.TRAPDOOR` (17) in the
 * room. Specify a specific trapdoor variant to select only trapdoors of that variant.
 *
 * @param trapdoorVariant Optional. If specified, will only get the trapdoors that match the
 *                        variant. Default is -1, which matches every variant.
 */
export function getTrapdoors(
  trapdoorVariant: TrapdoorVariant | -1 = -1,
): GridEntity[] {
  if (trapdoorVariant === -1) {
    return getGridEntities(GridEntityType.TRAPDOOR);
  }

  return getMatchingGridEntities(GridEntityType.TRAPDOOR, trapdoorVariant);
}

/**
 * Helper function to remove all of the `GridEntityType.CRAWL_SPACE` (18) in the room.
 *
 * @param crawlSpaceVariant Optional. If specified, will only remove the crawl spaces that match
 *                          this variant. Default is -1, which matches every variant.
 * @param updateRoom Optional. Whether to update the room after the crawl spaces are removed.
 *                   Default is false. For more information, see the description of the
 *                   `removeGridEntities` helper function.
 * @param cap Optional. If specified, will only remove the given amount of crawl spaces.
 * @returns The crawl spaces that were removed.
 */
export function removeAllCrawlSpaces(
  crawlSpaceVariant: CrawlSpaceVariant | -1 = -1,
  updateRoom = false,
  cap?: int,
): GridEntity[] {
  const crawlSpaces = getCrawlSpaces(crawlSpaceVariant);
  return removeGridEntities(crawlSpaces, updateRoom, cap);
}

// The `removeAllDoors` function is not located here because doors are removed via the
// `Room.RemoveDoor` method instead.

/**
 * Helper function to remove all of the `GridEntityPit` in the room.
 *
 * @param pitVariant Optional. If specified, will only remove the pits that match this variant.
 *                   Default is -1, which matches every variant.
 * @param updateRoom Optional. Whether to update the room after the pits are removed. Default is
 *                   false. For more information, see the description of the `removeGridEntities`
 *                   helper function.
 * @param cap Optional. If specified, will only remove the given amount of pits.
 * @returns The pits that were removed.
 */
export function removeAllPits(
  pitVariant: PitVariant | -1 = -1,
  updateRoom = false,
  cap?: int,
): GridEntityPit[] {
  const pits = getPits(pitVariant);
  return removeGridEntities(pits, updateRoom, cap);
}

/**
 * Helper function to remove all of the `GridEntityPoop` in the room.
 *
 * Note that poops can either be an entity or a grid entity, depending on the situation. This
 * function will only remove the grid entity poops.
 *
 * @param poopVariant Optional. If specified, will only remove the poops that match this variant.
 *                    Default is -1, which matches every variant.
 * @param updateRoom Optional. Whether to update the room after the poops are removed. Default is
 *                   false. For more information, see the description of the `removeGridEntities`
 *                   helper function.
 * @param cap Optional. If specified, will only remove the given amount of poops.
 * @returns The poops that were removed.
 */
export function removeAllPoops(
  poopVariant: PoopGridEntityVariant | -1 = -1,
  updateRoom = false,
  cap?: int,
): GridEntityPoop[] {
  const poops = getPoops(poopVariant);
  return removeGridEntities(poops, updateRoom, cap);
}

/**
 * Helper function to remove all of the `GridEntityPressurePlate` in the room.
 *
 * @param pressurePlateVariant Optional. If specified, will only remove the pressure plates that
 *                             match this variant. Default is -1, which matches every variant.
 * @param updateRoom Optional. Whether to update the room after the pressure plates are removed.
 *                   Default is false. For more information, see the description of the
 *                   `removeGridEntities` helper function.
 * @param cap Optional. If specified, will only remove the given amount of pressure plates.
 * @returns The pressure plates that were removed.
 */
export function removeAllPressurePlates(
  pressurePlateVariant: PressurePlateVariant | -1 = -1,
  updateRoom = false,
  cap?: int,
): GridEntityPressurePlate[] {
  const pressurePlates = getPressurePlates(pressurePlateVariant);
  return removeGridEntities(pressurePlates, updateRoom, cap);
}

/**
 * Helper function to remove all of the `GridEntityRock` in the room.
 *
 * @param variant Optional. If specified, will only remove the rocks that match this variant.
 *                Default is -1, which matches every variant. Note that this is not the same thing
 *                as the `RockVariant` enum, since that only applies to `GridEntityType.ROCK`, and
 *                other types of grid entities can be the `GridEntityRock` class.
 * @param updateRoom Optional. Whether to update the room after the rocks are removed. Default is
 *                   false. For more information, see the description of the `removeGridEntities`
 *                   helper function.
 * @param cap Optional. If specified, will only remove the given amount of rocks.
 * @returns The rocks that were removed.
 */
export function removeAllRocks(
  variant = -1,
  updateRoom = false,
  cap?: int,
): GridEntityRock[] {
  const rocks = getRocks(variant);
  return removeGridEntities(rocks, updateRoom, cap);
}

/**
 * Helper function to remove all of the `GridEntitySpikes` in the room.
 *
 * @param variant Optional. If specified, will only remove the spikes that match this variant.
 *                Default is -1, which matches every variant.
 * @param updateRoom Optional. Whether to update the room after the spikes are removed. Default is
 *                   false. For more information, see the description of the `removeGridEntities`
 *                   helper function.
 * @param cap Optional. If specified, will only remove the given amount of spikes.
 * @returns The spikes that were removed.
 */
export function removeAllSpikes(
  variant = -1,
  updateRoom = false,
  cap?: int,
): GridEntitySpikes[] {
  const spikes = getSpikes(variant);
  return removeGridEntities(spikes, updateRoom, cap);
}

/**
 * Helper function to remove all of the `GridEntityTNT` in the room.
 *
 * @param variant Optional. If specified, will only remove the TNTs that match this variant. Default
 *                is -1, which matches every variant.
 * @param updateRoom Optional. Whether to update the room after the TNTs are removed. Default is
 *                   false. For more information, see the description of the `removeGridEntities`
 *                   helper function.
 * @param cap Optional. If specified, will only remove the given amount of TNTs.
 * @returns The TNTs that were removed.
 */
export function removeAllTNT(
  variant = -1,
  updateRoom = false,
  cap?: int,
): GridEntityTNT[] {
  const tnt = getTNT(variant);
  return removeGridEntities(tnt, updateRoom, cap);
}

/**
 * Helper function to remove all of the `GridEntityType.TELEPORTER` (23) in the room.
 *
 * @param variant Optional. If specified, will only remove the teleporters that match this variant.
 *                Default is -1, which matches every variant.
 * @param updateRoom Optional. Whether to update the room after the teleporters are removed. Default
 *                   is false. For more information, see the description of the `removeGridEntities`
 *                   helper function.
 * @param cap Optional. If specified, will only remove the given amount of teleporters.
 * @returns The teleporters that were removed.
 */
export function removeAllTeleporters(
  variant = -1,
  updateRoom = false,
  cap?: int,
): GridEntity[] {
  const teleporters = getTeleporters(variant);
  return removeGridEntities(teleporters, updateRoom, cap);
}

/**
 * Helper function to remove all of the `GridEntityType.TRAPDOOR` (17) in the room.
 *
 * @param trapdoorVariant Optional. If specified, will only remove the trapdoors that match this
 *                        variant. Default is -1, which matches every variant.
 * @param updateRoom Optional. Whether to update the room after the trapdoors are removed. Default
 *                   is false. For more information, see the description of the `removeGridEntities`
 *                   helper function.
 * @param cap Optional. If specified, will only remove the given amount of trapdoors.
 * @returns The trapdoors that were removed.
 */
export function removeAllTrapdoors(
  trapdoorVariant: TrapdoorVariant | -1 = -1,
  updateRoom = false,
  cap?: int,
): GridEntity[] {
  const trapdoors = getTrapdoors(trapdoorVariant);
  return removeGridEntities(trapdoors, updateRoom, cap);
}

/** Helper function to spawn a `GridEntityType.CRAWL_SPACE` (18). */
export function spawnCrawlSpace(
  gridIndexOrPosition: int | Vector,
): GridEntity | undefined {
  return spawnCrawlSpaceWithVariant(
    CrawlSpaceVariant.NORMAL,
    gridIndexOrPosition,
  );
}

/** Helper function to spawn a `GridEntityType.CRAWL_SPACE` (18) with a specific variant. */
export function spawnCrawlSpaceWithVariant(
  crawlSpaceVariant: CrawlSpaceVariant,
  gridIndexOrPosition: int | Vector,
): GridEntity | undefined {
  return spawnGridEntityWithVariant(
    GridEntityType.CRAWL_SPACE,
    crawlSpaceVariant,
    gridIndexOrPosition,
  );
}

/** Helper function to spawn a `GridEntityType.PIT` (7) with a specific variant. */
export function spawnDoor(
  gridIndexOrPosition: int | Vector,
): GridEntityDoor | undefined {
  return spawnDoorWithVariant(DoorVariant.UNSPECIFIED, gridIndexOrPosition);
}

/** Helper function to spawn a `GridEntityType.DOOR` (16). */
export function spawnDoorWithVariant(
  doorVariant: DoorVariant,
  gridIndexOrPosition: int | Vector,
): GridEntityDoor | undefined {
  const gridEntity = spawnGridEntityWithVariant(
    GridEntityType.DOOR,
    doorVariant,
    gridIndexOrPosition,
  );
  if (gridEntity === undefined) {
    return undefined;
  }

  const door = gridEntity.ToDoor();
  assertDefined(door, "Failed to spawn a door.");

  return door;
}

/** Helper function to spawn a `GridEntityType.DOOR` (16) with a specific variant. */
export function spawnPit(
  gridIndexOrPosition: int | Vector,
): GridEntityPit | undefined {
  return spawnPitWithVariant(PitVariant.NORMAL, gridIndexOrPosition);
}

/** Helper function to spawn a `GridEntityType.PIT` (7) with a specific variant. */
export function spawnPitWithVariant(
  pitVariant: PitVariant,
  gridIndexOrPosition: int | Vector,
): GridEntityPit | undefined {
  const gridEntity = spawnGridEntityWithVariant(
    GridEntityType.PIT,
    pitVariant,
    gridIndexOrPosition,
  );
  if (gridEntity === undefined) {
    return undefined;
  }

  const pit = gridEntity.ToPit();
  assertDefined(pit, "Failed to spawn a pit.");

  return pit;
}

/** Helper function to spawn a `GridEntityType.POOP` (14). */
export function spawnPoop(
  gridIndexOrPosition: int | Vector,
): GridEntityPoop | undefined {
  return spawnPoopWithVariant(
    PoopGridEntityVariant.NORMAL,
    gridIndexOrPosition,
  );
}

/** Helper function to spawn a `GridEntityType.POOP` (14) with a specific variant. */
export function spawnPoopWithVariant(
  poopVariant: PoopGridEntityVariant,
  gridIndexOrPosition: int | Vector,
): GridEntityPoop | undefined {
  const gridEntity = spawnGridEntityWithVariant(
    GridEntityType.POOP,
    poopVariant,
    gridIndexOrPosition,
  );
  if (gridEntity === undefined) {
    return undefined;
  }

  const poop = gridEntity.ToPoop();
  assertDefined(poop, "Failed to spawn a poop.");

  return poop;
}

/** Helper function to spawn a `GridEntityType.PRESSURE_PLATE` (20). */
export function spawnPressurePlate(
  gridIndexOrPosition: int | Vector,
): GridEntityPressurePlate | undefined {
  return spawnPressurePlateWithVariant(
    PressurePlateVariant.PRESSURE_PLATE,
    gridIndexOrPosition,
  );
}

/** Helper function to spawn a `GridEntityType.PRESSURE_PLATE` (20) with a specific variant. */
export function spawnPressurePlateWithVariant(
  pressurePlateVariant: PressurePlateVariant,
  gridIndexOrPosition: int | Vector,
): GridEntityPressurePlate | undefined {
  const gridEntity = spawnGridEntityWithVariant(
    GridEntityType.PRESSURE_PLATE,
    pressurePlateVariant,
    gridIndexOrPosition,
  );
  if (gridEntity === undefined) {
    return undefined;
  }

  const pressurePlate = gridEntity.ToPressurePlate();
  assertDefined(pressurePlate, "Failed to spawn a pressure plate.");

  return pressurePlate;
}

/** Helper function to spawn a `GridEntityType.ROCK` (2). */
export function spawnRock(
  gridIndexOrPosition: int | Vector,
): GridEntityRock | undefined {
  return spawnRockWithVariant(RockVariant.NORMAL, gridIndexOrPosition);
}

/** Helper function to spawn a `GridEntityType.ROCK` (2) with a specific variant. */
export function spawnRockWithVariant(
  rockVariant: RockVariant,
  gridIndexOrPosition: int | Vector,
): GridEntityRock | undefined {
  const gridEntity = spawnGridEntityWithVariant(
    GridEntityType.ROCK,
    rockVariant,
    gridIndexOrPosition,
  );
  if (gridEntity === undefined) {
    return undefined;
  }

  const rock = gridEntity.ToRock();
  assertDefined(rock, "Failed to spawn a rock.");

  return rock;
}

/** Helper function to spawn a `GridEntityType.SPIKES` (8). */
export function spawnSpikes(
  gridIndexOrPosition: int | Vector,
): GridEntitySpikes | undefined {
  return spawnSpikesWithVariant(0, gridIndexOrPosition);
}

/** Helper function to spawn a `GridEntityType.SPIKES` (8) with a specific variant. */
export function spawnSpikesWithVariant(
  variant: int,
  gridIndexOrPosition: int | Vector,
): GridEntitySpikes | undefined {
  const gridEntity = spawnGridEntityWithVariant(
    GridEntityType.SPIKES,
    variant,
    gridIndexOrPosition,
  );
  if (gridEntity === undefined) {
    return undefined;
  }

  const spikes = gridEntity.ToSpikes();
  assertDefined(spikes, "Failed to spawn spikes.");

  return spikes;
}

/** Helper function to spawn a `GridEntityType.TNT` (12). */
export function spawnTNT(
  gridIndexOrPosition: int | Vector,
): GridEntityTNT | undefined {
  return spawnTNTWithVariant(0, gridIndexOrPosition);
}

/** Helper function to spawn a `GridEntityType.TNT` (12) with a specific variant. */
export function spawnTNTWithVariant(
  variant: int,
  gridIndexOrPosition: int | Vector,
): GridEntityTNT | undefined {
  const gridEntity = spawnGridEntityWithVariant(
    GridEntityType.TNT,
    variant,
    gridIndexOrPosition,
  );
  if (gridEntity === undefined) {
    return undefined;
  }

  const tnt = gridEntity.ToTNT();
  assertDefined(tnt, "Failed to spawn TNT.");

  return tnt;
}

/** Helper function to spawn a `GridEntityType.TELEPORTER` (23). */
export function spawnTeleporter(
  gridIndexOrPosition: int | Vector,
): GridEntity | undefined {
  return spawnTeleporterWithVariant(0, gridIndexOrPosition);
}

/** Helper function to spawn a `GridEntityType.TELEPORTER` (23) with a specific variant. */
export function spawnTeleporterWithVariant(
  variant: int,
  gridIndexOrPosition: int | Vector,
): GridEntity | undefined {
  return spawnGridEntityWithVariant(
    GridEntityType.TELEPORTER,
    variant,
    gridIndexOrPosition,
  );
}

/** Helper function to spawn a `GridEntityType.TRAPDOOR` (17). */
export function spawnTrapdoor(
  gridIndexOrPosition: int | Vector,
): GridEntity | undefined {
  return spawnCrawlSpaceWithVariant(
    CrawlSpaceVariant.NORMAL,
    gridIndexOrPosition,
  );
}

/** Helper function to spawn a `GridEntityType.TRAPDOOR` (17) with a specific variant. */
export function spawnTrapdoorWithVariant(
  trapdoorVariant: TrapdoorVariant,
  gridIndexOrPosition: int | Vector,
): GridEntity | undefined {
  return spawnGridEntityWithVariant(
    GridEntityType.TRAPDOOR,
    trapdoorVariant,
    gridIndexOrPosition,
  );
}
