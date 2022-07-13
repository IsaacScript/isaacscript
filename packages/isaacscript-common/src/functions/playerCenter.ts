import { Direction } from "isaac-typescript-definitions";
import { game } from "../cachedClasses";
import { getPlayerFamiliars } from "./familiars";
import { getCircleDiscretizedPoints } from "./math";
import { getPlayers } from "./playerIndex";

/** This is in the center of the room. */
const NORMAL_MODE_NEW_FLOOR_STARTING_POSITION = Vector(320, 280);

/** This is near the top door. */
const GREED_MODE_NEW_FLOOR_STARTING_POSITION = Vector(320, 280);

const CIRCLE_RADIUS_BETWEEN_PLAYERS = 50;

/**
 * Helper function to move all of the players to where they would normally go when arriving at a new
 * floor. (In normal mode, this is the center of the room. In Greed Mode, this is below the top
 * door.)
 *
 * If there is more than one player, they will be distributed around the center in a circle.
 *
 * This function emulates what happens in the vanilla game when you travel to a new floor.
 */
export function movePlayersToCenter(): void {
  const isGreedMode = game.IsGreedMode();
  const startingPosition = isGreedMode
    ? GREED_MODE_NEW_FLOOR_STARTING_POSITION
    : NORMAL_MODE_NEW_FLOOR_STARTING_POSITION;

  const players = getPlayers();
  const firstPlayer = players[0];
  if (firstPlayer === undefined) {
    return;
  }

  // If there is only one player, we can move them exactly to the center of the room.
  if (players.length === 1) {
    movePlayerAndTheirFamiliars(firstPlayer, startingPosition);
    return;
  }

  // If there is more than one player, spread them out in a circle around the center of the room.
  // (This is what happens in vanilla.)
  const circlePoints = getCircleDiscretizedPoints(
    startingPosition,
    CIRCLE_RADIUS_BETWEEN_PLAYERS,
    players.length,
    1,
    1,
    Direction.LEFT,
  );

  for (let i = 0; i < players.length; i++) {
    const player = players[i];
    const circlePosition = circlePoints[i];

    if (player !== undefined && circlePosition !== undefined) {
      player.Position = circlePosition;
    }
  }
}

function movePlayerAndTheirFamiliars(player: EntityPlayer, position: Vector) {
  player.Position = position;

  const familiars = getPlayerFamiliars(player);
  for (const familiar of familiars) {
    familiar.Position = position;
  }
}
