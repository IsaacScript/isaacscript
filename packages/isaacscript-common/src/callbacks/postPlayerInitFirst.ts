import { ModUpgraded } from "../classes/ModUpgraded";
import { ModCallbackCustom } from "../enums/ModCallbackCustom";
import { getPlayers, isChildPlayer } from "../functions/playerIndex";
import { inGenesisRoom } from "../functions/rooms";
import {
  postPlayerInitFirstFire,
  postPlayerInitFirstHasSubscriptions,
} from "./subscriptions/postPlayerInitFirst";

export function postPlayerInitFirstInit(mod: ModUpgraded): void {
  mod.AddCallbackCustom(
    ModCallbackCustom.POST_NEW_ROOM_REORDERED,
    postNewRoomReordered,
  );
  mod.AddCallbackCustom(
    ModCallbackCustom.POST_PLAYER_INIT_LATE,
    postPlayerInitLate,
  );
}

function hasSubscriptions() {
  return postPlayerInitFirstHasSubscriptions();
}

// ModCallbackCustom.POST_NEW_ROOM_REORDERED
function postNewRoomReordered() {
  if (!hasSubscriptions()) {
    return;
  }

  // When a player uses the Genesis collectible, they will lose all of their collectibles, trinkets,
  // pocket items, and stats, so they will need to be re-initialized like they would be at the
  // beginning of a run. However, in this case, the `POST_PLAYER_INIT_FIRST` callback will not fire,
  // because that only fires once per run. Thus, we explicitly handle this special case.
  if (!inGenesisRoom()) {
    return;
  }

  for (const player of getPlayers()) {
    postPlayerInitFirstFire(player);
  }
}

// ModCallback.POST_PEFFECT_UPDATE (4)
function postPlayerInitLate(player: EntityPlayer) {
  if (!hasSubscriptions()) {
    return;
  }

  // We want to exclude non-real players like the Strawman keeper.
  if (isChildPlayer(player)) {
    return;
  }

  postPlayerInitFirstFire(player);
}
