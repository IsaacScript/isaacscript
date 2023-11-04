import { ModCallbackCustom } from "../../enums/ModCallbackCustom";
import { getPlayers, isChildPlayer } from "../../functions/playerIndex";
import { inGenesisRoom } from "../../functions/rooms";
import { shouldFirePlayer } from "../../shouldFire";
import { CustomCallback } from "../private/CustomCallback";

export class PostPlayerInitFirst extends CustomCallback<ModCallbackCustom.POST_PLAYER_INIT_FIRST> {
  constructor() {
    super();

    this.customCallbacksUsed = [
      [ModCallbackCustom.POST_NEW_ROOM_REORDERED, this.postNewRoomReordered],
      [ModCallbackCustom.POST_PLAYER_INIT_LATE, this.postPlayerInitLate],
    ];
  }

  protected override shouldFire = shouldFirePlayer;

  // ModCallbackCustom.POST_NEW_ROOM_REORDERED
  private readonly postNewRoomReordered = () => {
    // When a player uses the Genesis collectible, they will lose all of their collectibles,
    // trinkets, pocket items, and stats, so they will need to be re-initialized like they would be
    // at the beginning of a run. However, in this case, the `POST_PLAYER_INIT_FIRST` callback will
    // not fire, because that only fires once per run. Thus, we explicitly handle this special case.
    if (!inGenesisRoom()) {
      return;
    }

    for (const player of getPlayers()) {
      this.fire(player);
    }
  };

  // ModCallbackCustom.POST_PLAYER_INIT_LATE
  private readonly postPlayerInitLate = (player: EntityPlayer) => {
    // We want to exclude non-real players like the Strawman keeper.
    if (isChildPlayer(player)) {
      return;
    }

    this.fire(player);
  };
}
