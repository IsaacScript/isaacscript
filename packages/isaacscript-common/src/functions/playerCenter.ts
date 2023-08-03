import { Direction } from "isaac-typescript-definitions";
import { game } from "../core/cachedClasses";
import {
  NEW_FLOOR_STARTING_POSITION_GREED_MODE,
  NEW_FLOOR_STARTING_POSITION_NORMAL_MODE,
} from "../core/constants";
import { getPlayerFamiliars } from "./familiars";
import { getCircleDiscretizedPoints } from "./math";
import { getAllPlayers } from "./playerIndex";

/**
 * Helper function to move all of the players to where they would normally go when arriving at a new
 * floor. (In normal mode, this is the center of the room. In Greed Mode, this is below the top
 * door.)
 *
 * If there is more than one player, they will be distributed around the center in a circle.
 *
 * This function emulates what happens in the vanilla game when you travel to a new floor.
 *
 * @param radius Optional. The radius of the circle. Default is 10.
 */
export function movePlayersToCenter(radius: float = 10): void {
  const isGreedMode = game.IsGreedMode();
  const startingPosition = isGreedMode
    ? NEW_FLOOR_STARTING_POSITION_GREED_MODE
    : NEW_FLOOR_STARTING_POSITION_NORMAL_MODE;

  const players = getAllPlayers();
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
    radius,
    players.length,
    1,
    1,
    Direction.LEFT,
  );

  for (const [i, player] of players.entries()) {
    const circlePosition = circlePoints[i];
    if (circlePosition !== undefined) {
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
