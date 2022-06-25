import {
  GameStateFlag,
  ModCallback,
  RoomType,
} from "isaac-typescript-definitions";
import { game } from "../cachedClasses";
import { saveDataManager } from "../features/saveDataManager/exports";
import { getRoomVisitedCount } from "../functions/roomData";
import {
  postPickupInitFirstFire,
  postPickupInitFirstHasSubscriptions,
} from "./subscriptions/postPickupInitFirst";

const POST_ASCENT_ROOM_TYPES: ReadonlySet<RoomType> = new Set([
  RoomType.TREASURE,
  RoomType.BOSS,
]);

const v = {
  run: {
    postAscentPickupInitSeeds: new Set<int>(),
  },
};

/** @internal */
export function postPickupInitFirstInit(mod: Mod): void {
  saveDataManager("postPickupInitFirst", v, hasSubscriptions);

  mod.AddCallback(ModCallback.POST_PICKUP_INIT, postPickupInit); // 34
}

function hasSubscriptions() {
  return postPickupInitFirstHasSubscriptions();
}

// ModCallback.POST_PICKUP_INIT (34)
function postPickupInit(pickup: EntityPickup) {
  if (!hasSubscriptions()) {
    return;
  }

  const room = game.GetRoom();
  const roomType = room.GetType();
  const roomFrameCount = room.GetFrameCount();

  // First, keep track of pickups in rooms that could appear again in The Ascent.
  const previouslySeen = v.run.postAscentPickupInitSeeds.has(pickup.InitSeed);
  if (POST_ASCENT_ROOM_TYPES.has(roomType)) {
    v.run.postAscentPickupInitSeeds.add(pickup.InitSeed);
  }

  if (roomFrameCount > 0) {
    postPickupInitFirstFire(pickup);
    return;
  }

  const roomVisitedCount = getRoomVisitedCount();
  if (roomVisitedCount > 0) {
    return;
  }

  // Handle the special case of a post-Ascent Treasure Room or Boss Room.
  const onAscent = game.GetStateFlag(GameStateFlag.BACKWARDS_PATH);
  if (onAscent && POST_ASCENT_ROOM_TYPES.has(roomType) && previouslySeen) {
    return;
  }

  // We are entering a brand-new room.
  postPickupInitFirstFire(pickup);
}
