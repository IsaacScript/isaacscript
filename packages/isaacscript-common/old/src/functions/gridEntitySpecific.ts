import { PressurePlateState } from "isaac-typescript-definitions";
import { game } from "../cachedClasses";
import { getGridEntities } from "./gridEntity";

/** Helper function to get all of the `GridEntityPit` in the room. */
export function getPits(): GridEntityPit[] {
  const gridEntities = getGridEntities();

  const pits: GridEntityPit[] = [];
  for (const gridEntity of gridEntities) {
    const pit = gridEntity.ToPit();
    if (pit !== undefined) {
      pits.push(pit);
    }
  }

  return pits;
}

/** Helper function to get all of the `GridEntityPoop` in the room. */
export function getPoops(): GridEntityPoop[] {
  const gridEntities = getGridEntities();

  const poops: GridEntityPoop[] = [];
  for (const gridEntity of gridEntities) {
    const poop = gridEntity.ToPoop();
    if (poop !== undefined) {
      poops.push(poop);
    }
  }

  return poops;
}

/** Helper function to get all of the `GridEntityPressurePlate` in the room. */
export function getPressurePlates(): GridEntityPressurePlate[] {
  const gridEntities = getGridEntities();

  const pressurePlates: GridEntityPressurePlate[] = [];
  for (const gridEntity of gridEntities) {
    const pressurePlate = gridEntity.ToPressurePlate();
    if (pressurePlate !== undefined) {
      pressurePlates.push(pressurePlate);
    }
  }

  return pressurePlates;
}

/** Helper function to get all of the `GridEntityRock` in the room. */
export function getRocks(): GridEntityRock[] {
  const gridEntities = getGridEntities();

  const rocks: GridEntityRock[] = [];
  for (const gridEntity of gridEntities) {
    const rock = gridEntity.ToRock();
    if (rock !== undefined) {
      rocks.push(rock);
    }
  }

  return rocks;
}

/** Helper function to get all of the `GridEntitySpikes` in the room. */
export function getSpikes(): GridEntitySpikes[] {
  const gridEntities = getGridEntities();

  const spikes: GridEntitySpikes[] = [];
  for (const gridEntity of gridEntities) {
    const spike = gridEntity.ToSpikes();
    if (spike !== undefined) {
      spikes.push(spike);
    }
  }

  return spikes;
}

/** Helper function to get all of the `GridEntityTNT` in the room. */
export function getTNT(): GridEntityTNT[] {
  const gridEntities = getGridEntities();

  const tntArray: GridEntityTNT[] = [];
  for (const gridEntity of gridEntities) {
    const tnt = gridEntity.ToTNT();
    if (tnt !== undefined) {
      tntArray.push(tnt);
    }
  }

  return tntArray;
}

/**
 * Helper function to determine if all of the pressure plates in the current room are pushed.
 * Returns true if there are no pressure plates in the room.
 */
export function isAllPressurePlatesPushed(): boolean {
  const room = game.GetRoom();
  const hasPressurePlates = room.HasTriggerPressurePlates();

  if (!hasPressurePlates) {
    return true;
  }

  const pressurePlates = getPressurePlates();
  return pressurePlates.every(
    (pressurePlate) =>
      pressurePlate.State === PressurePlateState.PRESSURE_PLATE_PRESSED,
  );
}
