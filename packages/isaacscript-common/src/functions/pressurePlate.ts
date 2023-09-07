import {
  PressurePlateState,
  PressurePlateVariant,
} from "isaac-typescript-definitions";
import { game } from "../core/cachedClasses";
import { getPressurePlates } from "./gridEntitiesSpecific";

/**
 * Helper function to check if all of the pressure plates in the room are pushed.
 *
 * In this context, "pressure plates" refers to the grid entities that you have to press down in
 * order for the room to be cleared. This function ignores other types of pressure plates, such as
 * the ones that you press to get a reward, the ones that you press to start a Greed Mode wave, and
 * so on.
 *
 * Returns true if there are no pressure plates in the room.
 */
export function isAllPressurePlatesPushed(): boolean {
  const room = game.GetRoom();
  const hasPressurePlates = room.HasTriggerPressurePlates();

  if (!hasPressurePlates) {
    return true;
  }

  const pressurePlates = getPressurePlates(PressurePlateVariant.PRESSURE_PLATE);
  return pressurePlates.every(
    (pressurePlate) =>
      pressurePlate.State === PressurePlateState.PRESSURE_PLATE_PRESSED,
  );
}
