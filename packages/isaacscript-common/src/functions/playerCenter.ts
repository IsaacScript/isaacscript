import { Direction } from "isaac-typescript-definitions";
import { game } from "../cachedClasses";
import { getPlayerFamiliars } from "./familiars";
import { getCircleDiscretizedPoints } from "./math";
import { getPlayers } from "./playerIndex";

const CIRCLE_RADIUS_BETWEEN_PLAYERS = 50;

/**
 * Helper function to move all of the players to the center of the room.
 *
 * This function emulates what happens in the vanilla game when you travel to a new floor.
 */
export function movePlayersToCenter(): void {
  const room = game.GetRoom();
  const centerPos = room.GetCenterPos();

  const players = getPlayers();
  const firstPlayer = players[0];
  if (firstPlayer === undefined) {
    return;
  }

  if (players.length === 1) {
    movePlayerAndTheirFamiliars(firstPlayer, centerPos);
    return;
  }

  // Spread out the players in a circle around the center of the room. (This is what happens in
  // vanilla.)
  const circlePoints = getCircleDiscretizedPoints(
    centerPos,
    CIRCLE_RADIUS_BETWEEN_PLAYERS,
    players.length,
    1,
    1,
    Direction.LEFT,
  );

  for (let i = 0; i < players.length; i++) {
    const player = players[i];
    const position = circlePoints[i];

    if (player !== undefined && position !== undefined) {
      player.Position = position;
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
