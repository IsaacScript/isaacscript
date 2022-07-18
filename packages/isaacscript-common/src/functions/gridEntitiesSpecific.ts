import {
  DoorVariant,
  GridEntityType,
  PitVariant,
  PoopGridEntityVariant,
  PressurePlateVariant,
  RockVariant,
} from "isaac-typescript-definitions";
import {
  getGridEntities,
  removeGridEntities,
  spawnGridEntityWithVariant,
} from "./gridEntities";

// The `getDoors` function is not located here because doors are collected via the `Room.GetDoor`
// method instead, which is faster.

/**
 * Helper function to get all of the `GridEntityPit` in the room.
 *
 * @param pitVariant Optional. If specified, will only get the pits that match the variant. Default
 *                   is -1, which matches every variant.
 */
export function getPits(pitVariant: PitVariant = -1): GridEntityPit[] {
  const gridEntities = getGridEntities();

  const pits: GridEntityPit[] = [];
  for (const gridEntity of gridEntities) {
    const pit = gridEntity.ToPit();
    if (pit !== undefined) {
      const gridEntityVariant = pit.GetVariant();
      if ((pitVariant as int) === -1 || pitVariant === gridEntityVariant) {
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
  poopVariant: PoopGridEntityVariant = -1,
): GridEntityPoop[] {
  const gridEntities = getGridEntities();

  const poops: GridEntityPoop[] = [];
  for (const gridEntity of gridEntities) {
    const poop = gridEntity.ToPoop();
    if (poop !== undefined) {
      const gridEntityVariant = poop.GetVariant();
      if ((poopVariant as int) === -1 || poopVariant === gridEntityVariant) {
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
  pressurePlateVariant: PressurePlateVariant = -1,
): GridEntityPressurePlate[] {
  const gridEntities = getGridEntities();

  const pressurePlates: GridEntityPressurePlate[] = [];
  for (const gridEntity of gridEntities) {
    const pressurePlate = gridEntity.ToPressurePlate();
    if (pressurePlate !== undefined) {
      const gridEntityVariant = pressurePlate.GetVariant();
      if (
        (pressurePlateVariant as int) === -1 ||
        pressurePlateVariant === gridEntityVariant
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
  const gridEntities = getGridEntities();

  const rocks: GridEntityRock[] = [];
  for (const gridEntity of gridEntities) {
    const rock = gridEntity.ToRock();
    if (rock !== undefined) {
      const gridEntityVariant = rock.GetVariant();
      if (variant === -1 || variant === gridEntityVariant) {
        rocks.push(rock);
      }
    }
  }

  return rocks;
}

/** Helper function to get all of the `GridEntitySpikes` in the room. */
export function getSpikes(variant = -1): GridEntitySpikes[] {
  const gridEntities = getGridEntities();

  const spikes: GridEntitySpikes[] = [];
  for (const gridEntity of gridEntities) {
    const spike = gridEntity.ToSpikes();
    if (spike !== undefined) {
      const gridEntityVariant = spike.GetVariant();
      if (variant === -1 || variant === gridEntityVariant) {
        spikes.push(spike);
      }
    }
  }

  return spikes;
}

/** Helper function to get all of the `GridEntityTNT` in the room. */
export function getTNT(variant = -1): GridEntityTNT[] {
  const gridEntities = getGridEntities();

  const tntArray: GridEntityTNT[] = [];
  for (const gridEntity of gridEntities) {
    const tnt = gridEntity.ToTNT();
    if (tnt !== undefined) {
      const gridEntityVariant = tnt.GetVariant();
      if (variant === -1 || variant === gridEntityVariant) {
        tntArray.push(tnt);
      }
    }
  }

  return tntArray;
}

// The `removeAllDoors` function is not located here because doors are removed via the
// `Room.RemoveDoor` method instead.

/**
 * Helper function to remove all of the `GridEntityPit` in the room.
 *
 * @param pitVariant Optional. If specified, will only remove the pits that match this variant.
 *                   Default is -1, which matches every variant.
 * @param updateRoom Optional. Whether or not to update the room after the pits are removed. Default
 *                   is false. For more information, see the description of the `removeGridEntities`
 *                   helper function.
 * @param cap Optional. If specified, will only remove the given amount of pits.
 * @returns The pits that were removed.
 */
export function removeAllPits(
  pitVariant: PitVariant = -1,
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
 * @param updateRoom Optional. Whether or not to update the room after the poops are removed.
 *                   Default is false. For more information, see the description of the
 *                   `removeGridEntities` helper function.
 * @param cap Optional. If specified, will only remove the given amount of poops.
 * @returns The poops that were removed.
 */
export function removeAllPoops(
  poopVariant: PoopGridEntityVariant = -1,
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
 * @param updateRoom Optional. Whether or not to update the room after the pressure plates are
 *                   removed. Default is false. For more information, see the description of the
 *                   `removeGridEntities` helper function.
 * @param cap Optional. If specified, will only remove the given amount of pressure plates.
 * @returns The pressure plates that were removed.
 */
export function removeAllPressurePlates(
  pressurePlateVariant: PressurePlateVariant = -1,
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
 * @param updateRoom Optional. Whether or not to update the room after the rocks are removed.
 *                   Default is false. For more information, see the description of the
 *                   `removeGridEntities` helper function.
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
 * @param updateRoom Optional. Whether or not to update the room after the spikes are removed.
 *                   Default is false. For more information, see the description of the
 *                   `removeGridEntities` helper function.
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
 * @param updateRoom Optional. Whether or not to update the room after the TNTs are removed. Default
 *                   is false. For more information, see the description of the `removeGridEntities`
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

/** Helper function to spawn a `GridEntityType.DOOR` (16). */
export function spawnDoor(
  gridIndexOrPosition: int | Vector,
): GridEntityDoor | undefined {
  return spawnDoorWithVariant(DoorVariant.UNSPECIFIED, gridIndexOrPosition);
}

/** Helper function to spawn a `GridEntityType.DOOR` (16) with a specific variant. */
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
    return gridEntity;
  }

  const door = gridEntity.ToDoor();
  if (door === undefined) {
    error("Failed to spawn a door.");
  }

  return door;
}

/** Helper function to spawn a `GridEntityType.PIT` (7). */
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
    return gridEntity;
  }

  const pit = gridEntity.ToPit();
  if (pit === undefined) {
    error("Failed to spawn a pit.");
  }

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
    return gridEntity;
  }

  const poop = gridEntity.ToPoop();
  if (poop === undefined) {
    error("Failed to spawn a poop.");
  }

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
    return gridEntity;
  }

  const pressurePlate = gridEntity.ToPressurePlate();
  if (pressurePlate === undefined) {
    error("Failed to spawn a pressure plate.");
  }

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
    return gridEntity;
  }

  const rock = gridEntity.ToRock();
  if (rock === undefined) {
    error("Failed to spawn a rock.");
  }

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
    return gridEntity;
  }

  const spikes = gridEntity.ToSpikes();
  if (spikes === undefined) {
    error("Failed to spawn spikes.");
  }

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
    return gridEntity;
  }

  const tnt = gridEntity.ToTNT();
  if (tnt === undefined) {
    error("Failed to spawn TNT.");
  }

  return tnt;
}
