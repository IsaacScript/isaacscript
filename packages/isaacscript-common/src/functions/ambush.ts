import { RoomType } from "isaac-typescript-definitions";
import { game } from "../core/cachedClasses";
import { AmbushType } from "../enums/AmbushType";

/**
 * Helper function to get the corresponding ambush type for the current room. Returns undefined if
 * the current room does not correspond to any particular ambush type.
 */
export function getAmbushType(): AmbushType | undefined {
  const room = game.GetRoom();
  const roomType = room.GetType();

  switch (roomType) {
    case RoomType.BOSS_RUSH: {
      return AmbushType.BOSS_RUSH;
    }

    case RoomType.CHALLENGE: {
      return AmbushType.CHALLENGE_ROOM;
    }

    default: {
      return undefined;
    }
  }
}

/**
 * Custom grid entities are built on top of real grid entities. You can use any existing grid entity
 * type as a base. For example, if you want to create a custom rock that would be breakable like a
 * normal rock, then you should specify
 *
 * This is an IsaacScript feature because the vanilla game does not support any custom grid
 * entities.
 */
export function zzz(): void {}
