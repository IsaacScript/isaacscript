import { inRectangle } from "./math";

/** For `EntityType.EFFECT` (1000), `EffectVariant.DICE_FLOOR` (76) */
export const DICE_FLOOR_TRIGGER_SQUARE_SIZE = 75;

/** Helper function to see if a player is close enough to activate a Dice Room floor. */
export function isCloseEnoughToTriggerDiceFloor(
  player: EntityPlayer,
  diceFloor: EntityEffect,
): boolean {
  // Unlike other entities, the dice floor has a rectangular hit box, not a circular one.
  const topLeft = diceFloor.Position.add(
    Vector(-DICE_FLOOR_TRIGGER_SQUARE_SIZE, -DICE_FLOOR_TRIGGER_SQUARE_SIZE),
  );
  const bottomRight = diceFloor.Position.add(
    Vector(DICE_FLOOR_TRIGGER_SQUARE_SIZE, DICE_FLOOR_TRIGGER_SQUARE_SIZE),
  );

  return inRectangle(player.Position, topLeft, bottomRight);
}
