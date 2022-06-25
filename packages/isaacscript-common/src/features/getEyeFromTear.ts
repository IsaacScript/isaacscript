import {
  Direction,
  EntityType,
  ModCallback,
} from "isaac-typescript-definitions";
import { PlayerEye } from "../enums/PlayerEye";
import { ensureAllCases } from "../functions/utils";
import { saveDataManager } from "./saveDataManager/exports";

const INITIAL_TEAR_DISTANCE_FROM_PLAYER = 10;

const v = {
  room: {
    tearToEyeMap: new Map<PtrHash, PlayerEye>(),
  },
};

/** @internal */
export function getEyeFromTearInit(mod: Mod): void {
  saveDataManager("getEyeFromTear", v);

  mod.AddCallback(ModCallback.PRE_ENTITY_SPAWN, preEntitySpawn); // 24
}

// ModCallback.PRE_ENTITY_SPAWN (24)
function preEntitySpawn(
  entityType: EntityType,
  _variant: int,
  _subType: int,
  _position: Vector,
  _velocity: Vector,
  spawner: Entity,
  _initSeed: int,
) {
  if (entityType !== EntityType.TEAR) {
    return;
  }

  Isaac.DebugString(`GETTING HERE - ${spawner}`);

  /*
  if (spawn === undefined) {
    return;
  }

  const player = tear.SpawnerEntity.ToPlayer();
  if (player === undefined) {
    return;
  }

  // The tear will spawn a short distance from the player. Before we compare the tear position,
  // remove the initial displacement so that it will be directly on top of the player.
  const fireDirection = player.GetFireDirection();
  const fireDirectionVector = directionToVector(fireDirection);
  const initialDisplacement = fireDirectionVector.mul(
    INITIAL_TEAR_DISTANCE_FROM_PLAYER,
  );
  const tearPositionWithoutDisplacement =
    tear.Position.sub(initialDisplacement);

  // Account for the player moving, as the tear will spawn equal to where they were standing a frame
  // ago.
  const adjustedPlayerPosition = player.Position.sub(player.Velocity);

  // Based on the difference between the tear position and the player position, calculate whether it
  // came from the left or right eye.
  const positionDifference = tearPositionWithoutDisplacement.sub(
    adjustedPlayerPosition,
  );
  const direction = vectorToDirection(positionDifference);
  const playerEye = getEyeFromDirectionAndFireDirection(
    direction,
    fireDirection,
  );
  if (playerEye === undefined) {
    return;
  }

  const ptrHash = GetPtrHash(tear);
  v.room.tearToEyeMap.set(ptrHash, playerEye);
  */
}

function getEyeFromDirectionAndFireDirection(
  direction: Direction,
  fireDirection: Direction,
): PlayerEye | undefined {
  switch (fireDirection) {
    // -1
    case Direction.NO_DIRECTION: {
      return undefined;
    }

    // 0
    case Direction.LEFT: {
      if (direction === Direction.DOWN) {
        return PlayerEye.LEFT;
      }

      if (direction === Direction.UP) {
        return PlayerEye.RIGHT;
      }

      return undefined;
    }

    // 1
    case Direction.UP: {
      if (direction === Direction.LEFT) {
        return PlayerEye.LEFT;
      }

      if (direction === Direction.RIGHT) {
        return PlayerEye.RIGHT;
      }

      return undefined;
    }

    // 2
    case Direction.RIGHT: {
      if (direction === Direction.UP) {
        return PlayerEye.LEFT;
      }

      if (direction === Direction.DOWN) {
        return PlayerEye.RIGHT;
      }

      return undefined;
    }

    // 3
    case Direction.DOWN: {
      if (direction === Direction.RIGHT) {
        return PlayerEye.LEFT;
      }

      if (direction === Direction.LEFT) {
        return PlayerEye.RIGHT;
      }

      return undefined;
    }

    default: {
      return ensureAllCases(fireDirection);
    }
  }
}

/**
 * Helper function to get the specific eye that the player shot this tear from. Returns undefined if
 * the player did not shoot this tear.
 */
export function getEyeFromTear(tear: EntityTear): PlayerEye | undefined {
  const ptrHash = GetPtrHash(tear);
  return v.room.tearToEyeMap.get(ptrHash);
}
