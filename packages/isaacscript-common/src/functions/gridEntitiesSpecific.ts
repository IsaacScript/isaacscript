import {
  PitVariant,
  PoopGridEntityVariant,
  PressurePlateVariant,
  RockVariant,
} from "isaac-typescript-definitions";
import { getGridEntities } from "./gridEntities";

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
 * @param rockVariant Optional. If specified, will only get the rocks that match the variant.
 *                    Default is -1, which matches every variant.
 */
export function getRocks(rockVariant: RockVariant = -1): GridEntityRock[] {
  const gridEntities = getGridEntities();

  const rocks: GridEntityRock[] = [];
  for (const gridEntity of gridEntities) {
    const rock = gridEntity.ToRock();
    if (rock !== undefined) {
      const gridEntityVariant = rock.GetVariant() as RockVariant;
      if ((rockVariant as int) === -1 || rockVariant === gridEntityVariant) {
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
