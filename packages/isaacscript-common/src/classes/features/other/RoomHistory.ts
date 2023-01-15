import { game } from "../../../core/cachedClasses";
import { Exported } from "../../../decorators";
import { ModCallbackCustom } from "../../../enums/ModCallbackCustom";
import { getLastElement } from "../../../functions/array";
import { getDimension } from "../../../functions/dimensions";
import {
  getRoomGridIndex,
  getRoomListIndex,
  getRoomName,
  getRoomStageID,
  getRoomSubType,
  getRoomVariant,
  getRoomVisitedCount,
} from "../../../functions/roomData";
import { RoomDescription } from "../../../interfaces/RoomDescription";
import { Feature } from "../../private/Feature";

export class RoomHistory extends Feature {
  /** @internal */
  public override v = {
    run: {
      roomHistory: [] as Array<Readonly<RoomDescription>>,
    },
  };

  /** @internal */
  constructor() {
    super();

    this.customCallbacksUsed = [
      [ModCallbackCustom.POST_NEW_ROOM_EARLY, this.postNewRoomEarly],
    ];
  }

  // ModCallbackCustom.POST_NEW_ROOM_EARLY
  private postNewRoomEarly = () => {
    const level = game.GetLevel();
    const stage = level.GetStage();
    const stageType = level.GetStageType();
    const room = game.GetRoom();
    const roomType = room.GetType();
    const seeds = game.GetSeeds();
    const startSeedString = seeds.GetStartSeedString();
    const stageID = getRoomStageID();
    const dimension = getDimension();
    const roomVariant = getRoomVariant();
    const roomSubType = getRoomSubType();
    const roomName = getRoomName();
    const roomGridIndex = getRoomGridIndex();
    const roomListIndex = getRoomListIndex();
    const roomVisitedCount = getRoomVisitedCount();

    const roomDescription: RoomDescription = {
      startSeedString,
      stage,
      stageType,
      stageID,
      dimension,
      roomType,
      roomVariant,
      roomSubType,
      roomName,
      roomGridIndex,
      roomListIndex,
      roomVisitedCount,
    };
    this.v.run.roomHistory.push(roomDescription);
  };

  /**
   * Helper function to get information about all of the rooms that a player has visited thus far on
   * this run.
   *
   * In order to use this function, you must upgrade your mod with `ISCFeature.ROOM_HISTORY`.
   */
  @Exported
  public getRoomHistory(): ReadonlyArray<Readonly<RoomDescription>> {
    return this.v.run.roomHistory;
  }

  /**
   * Helper function to get information about the room that was previously visited.
   *
   * In the special case of only one room having been visited thus far (i.e. the starting room of
   * the run), the starting room will be returned.
   *
   * In order to use this function, you must upgrade your mod with `ISCFeature.ROOM_HISTORY`.
   */
  @Exported
  public getPreviousRoomDescription(): Readonly<RoomDescription> {
    const previousRoomDescription =
      this.v.run.roomHistory[this.v.run.roomHistory.length - 2];
    if (previousRoomDescription !== undefined) {
      return previousRoomDescription;
    }

    const startingRoomDescription = this.v.run.roomHistory[0];
    if (startingRoomDescription !== undefined) {
      return startingRoomDescription;
    }

    error(
      "Failed to find a room description for any rooms thus far on this run.",
    );
  }

  /**
   * Helper function to get information about the most recent room that is stored in the room
   * history array.
   *
   * This is useful in the `POST_ENTITY_REMOVE` callback; see the `isLeavingRoom` function.
   *
   * Note that this function can return undefined in the case where it is called on the first room
   * of the run.
   *
   * In order to use this function, you must upgrade your mod with `ISCFeature.ROOM_HISTORY`.
   */
  @Exported
  public getLatestRoomDescription(): Readonly<RoomDescription> | undefined {
    return getLastElement(this.v.run.roomHistory);
  }

  /**
   * Helper function to detect if the game is in the state where the room index has changed to a new
   * room, but the entities from the previous room are currently in the process of despawning. (At
   * this point, the `POST_NEW_ROOM` callback and the `POST_NEW_ROOM_EARLY` callback will not have
   * fired yet, and there will not be an entry in the room history array for the current room.)
   *
   * This function is intended to be used in the `POST_ENTITY_REMOVE` callback to detect when an
   * entity is despawning.
   *
   * In order to use this function, you must upgrade your mod with `ISCFeature.ROOM_HISTORY`.
   */
  @Exported
  public isLeavingRoom(): boolean {
    const level = game.GetLevel();
    const stage = level.GetStage();
    const stageType = level.GetStageType();
    const seeds = game.GetSeeds();
    const startSeedString = seeds.GetStartSeedString();
    const roomListIndex = getRoomListIndex();
    const roomVisitedCount = getRoomVisitedCount();
    const latestRoomDescription = this.getLatestRoomDescription();

    // Sometimes, this function can be called in situations where entities from the previous run are
    // being despawned. If this is the case, then the room history will currently be empty.
    if (latestRoomDescription === undefined) {
      return false;
    }

    return (
      startSeedString !== latestRoomDescription.startSeedString ||
      stage !== latestRoomDescription.stage ||
      stageType !== latestRoomDescription.stageType ||
      roomListIndex !== latestRoomDescription.roomListIndex ||
      roomVisitedCount !== latestRoomDescription.roomVisitedCount
    );
  }
}
